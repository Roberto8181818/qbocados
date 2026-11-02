# Genera los assets de marca y el cartel del hero.
# Uso: powershell -ExecutionPolicy Bypass -File scripts/generate-brand-assets.ps1
#
# El script se mantiene en ASCII puro para que Windows PowerShell 5.1 lo
# interprete igual que PowerShell 7. Los acentos y el punto medio se
# construyen con [char] cuando hacen falta.
param(
  [string]$OutputDir = (Join-Path $PSScriptRoot "..\public"),
  [string]$LogoSource = (Join-Path $PSScriptRoot "..\references\logo.png"),
  [string]$CartelSource = (Join-Path $PSScriptRoot "..\references\cartel.png")
)

$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

function New-Brush([string]$hex) {
  return New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml($hex))
}
function New-Pen([string]$hex, [float]$width) {
  return New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml($hex)), $width
}

function Get-AlphaBounds([System.Drawing.Bitmap]$bmp) {
  $rect = [System.Drawing.Rectangle]::new(0, 0, $bmp.Width, $bmp.Height)
  $data = $bmp.LockBits(
    $rect,
    [System.Drawing.Imaging.ImageLockMode]::ReadOnly,
    [System.Drawing.Imaging.PixelFormat]::Format32bppArgb
  )
  try {
    $bytes = [byte[]]::new($data.Stride * $data.Height)
    [System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $bytes.Length)
    $minX = $bmp.Width
    $minY = $bmp.Height
    $maxX = -1
    $maxY = -1
    for ($y = 0; $y -lt $bmp.Height; $y++) {
      $row = $y * $data.Stride
      for ($x = 0; $x -lt $bmp.Width; $x++) {
        if ($bytes[$row + ($x * 4) + 3] -gt 8) {
          if ($x -lt $minX) { $minX = $x }
          if ($x -gt $maxX) { $maxX = $x }
          if ($y -lt $minY) { $minY = $y }
          if ($y -gt $maxY) { $maxY = $y }
        }
      }
    }
    if ($maxX -lt 0) { throw "El logo no contiene pixeles visibles." }
    return [System.Drawing.Rectangle]::new($minX, $minY, ($maxX - $minX + 1), ($maxY - $minY + 1))
  } finally {
    $bmp.UnlockBits($data)
  }
}

function Resize-Image([System.Drawing.Image]$source, [int]$width, [int]$height) {
  $target = [System.Drawing.Bitmap]::new($width, $height)
  $graphics = [System.Drawing.Graphics]::FromImage($target)
  try {
    $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.DrawImage($source, [System.Drawing.Rectangle]::new(0, 0, $width, $height))
  } finally {
    $graphics.Dispose()
  }
  return $target
}

$output = [System.IO.Path]::GetFullPath($OutputDir)
if (-not (Test-Path $output)) {
  New-Item -ItemType Directory -Path $output | Out-Null
}

$sourcePath = [System.IO.Path]::GetFullPath($LogoSource)
if (-not (Test-Path $sourcePath)) {
  throw "No se encontro el logo de origen: $sourcePath"
}

$brand = "#b0441a"
$brandDeep = "#943614"
$cream = "#f7f0e1"
$creamSoft = "#fcf7ec"
$ink = "#382617"
$muted = "#75614b"
$gold = "#8a5a18"
$goldSoft = "#e6c98f"
$amber = "#d99a2b"
$amberDeep = "#b57518"
$baseBrown = "#7a4a16"

$dot = [char]0x00B7
$uAcute = [char]0x00FA

$source = [System.Drawing.Bitmap]::FromFile($sourcePath)

# ---------- Logo horizontal optimizado ----------
$bounds = Get-AlphaBounds $source
$logoCrop = $source.Clone($bounds, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$logoWidth = 480
$logoHeight = [int][math]::Round($logoWidth * $bounds.Height / $bounds.Width)
$logo = Resize-Image $logoCrop $logoWidth $logoHeight
$logo.Save((Join-Path $output "logo.png"), [System.Drawing.Imaging.ImageFormat]::Png)

# ---------- Marca cuadrada (Q + gorro) ----------
$markRegion = [System.Drawing.Rectangle]::new(0, 0, [math]::Min(281, $source.Width), [math]::Min(330, $source.Height))
$markRegionBitmap = $source.Clone($markRegion, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$markBounds = Get-AlphaBounds $markRegionBitmap
$mark = $markRegionBitmap.Clone($markBounds, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# El wordmark incluye un pequeno punto decorativo junto a la Q. Se elimina
# del icono cuadrado recorriendo el componente conectado que lo forma.
$maskRect = [System.Drawing.Rectangle]::new(0, 0, $mark.Width, $mark.Height)
$maskData = $mark.LockBits(
  $maskRect,
  [System.Drawing.Imaging.ImageLockMode]::ReadWrite,
  [System.Drawing.Imaging.PixelFormat]::Format32bppArgb
)
try {
  $maskBytes = [byte[]]::new($maskData.Stride * $mark.Height)
  [System.Runtime.InteropServices.Marshal]::Copy($maskData.Scan0, $maskBytes, 0, $maskBytes.Length)

  # Punto de semilla sobre el centro del punto decorativo del wordmark.
  $seedX = 260 - $markBounds.X
  $seedY = 110 - $markBounds.Y
  if (
    $seedX -lt 0 -or $seedX -ge $mark.Width -or
    $seedY -lt 0 -or $seedY -ge $mark.Height -or
    $maskBytes[($seedY * $maskData.Stride) + ($seedX * 4) + 3] -le 8
  ) {
    $seedX = -1
  }

  if ($seedX -ge 0) {
    $queue = New-Object System.Collections.Queue
    $queue.Enqueue([int]($seedY * $mark.Width + $seedX))
    while ($queue.Count -gt 0) {
      $position = [int]$queue.Dequeue()
      $x = $position % $mark.Width
      $y = [int][math]::Floor($position / $mark.Width)
      $index = $y * $maskData.Stride + ($x * 4)
      if ($maskBytes[$index + 3] -le 8) { continue }

      $maskBytes[$index] = 0
      $maskBytes[$index + 1] = 0
      $maskBytes[$index + 2] = 0
      $maskBytes[$index + 3] = 0

      if ($x -gt 0) { $queue.Enqueue([int]($position - 1)) }
      if ($x -lt $mark.Width - 1) { $queue.Enqueue([int]($position + 1)) }
      if ($y -gt 0) { $queue.Enqueue([int]($position - $mark.Width)) }
      if ($y -lt $mark.Height - 1) { $queue.Enqueue([int]($position + $mark.Width)) }
    }
  }

  [System.Runtime.InteropServices.Marshal]::Copy($maskBytes, 0, $maskData.Scan0, $maskBytes.Length)
} finally {
  $mark.UnlockBits($maskData)
}

$iconSize = 512
$icon = [System.Drawing.Bitmap]::new($iconSize, $iconSize)
$iconGraphics = [System.Drawing.Graphics]::FromImage($icon)
$iconGraphics.Clear([System.Drawing.ColorTranslator]::FromHtml($cream))
$iconGraphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceOver
$iconGraphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$iconGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$iconGraphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$iconGraphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

$contentBox = 380
$scale = [math]::Min($contentBox / $mark.Width, $contentBox / $mark.Height)
$drawWidth = [int][math]::Round($mark.Width * $scale)
$drawHeight = [int][math]::Round($mark.Height * $scale)
$drawX = [int](($iconSize - $drawWidth) / 2)
$drawY = [int](($iconSize - $drawHeight) / 2)
$iconGraphics.DrawImage($mark, [System.Drawing.Rectangle]::new($drawX, $drawY, $drawWidth, $drawHeight))
$iconGraphics.Dispose()
$icon.Save((Join-Path $output "logo-mark.png"), [System.Drawing.Imaging.ImageFormat]::Png)

$apple = Resize-Image $icon 180 180
$apple.Save((Join-Path $output "apple-touch-icon.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$apple.Dispose()

$favicon192 = Resize-Image $icon 192 192
$favicon192.Save((Join-Path $output "favicon-192.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$favicon192.Dispose()

$favicon32 = Resize-Image $icon 32 32
$favicon32.Save((Join-Path $output "favicon-32.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$favicon32.Dispose()

$favicon64 = Resize-Image $icon 64 64
$faviconStream = New-Object System.IO.MemoryStream
$favicon64.Save($faviconStream, [System.Drawing.Imaging.ImageFormat]::Png)
$faviconBase64 = [Convert]::ToBase64String($faviconStream.ToArray())
$faviconStream.Dispose()
$favicon64.Dispose()
$faviconSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="QBocados"><image width="64" height="64" href="data:image/png;base64,' + $faviconBase64 + '"/></svg>'
[System.IO.File]::WriteAllText((Join-Path $output "favicon.svg"), $faviconSvg, [System.Text.UTF8Encoding]::new($false))

# ---------- Open Graph 1200 x 630 ----------
$og = [System.Drawing.Bitmap]::new(1200, 630)
$g = [System.Drawing.Graphics]::FromImage($og)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.Clear([System.Drawing.ColorTranslator]::FromHtml($cream))

$brandBrush = New-Brush $brand
$creamSoftBrush = New-Brush $creamSoft
$inkBrush = New-Brush $ink
$mutedBrush = New-Brush $muted
$goldBrush = New-Brush $gold
$amberBrush = New-Brush $amber
$amberDeepBrush = New-Brush $amberDeep
$goldPen = New-Pen $gold 2
$basePen = New-Pen $baseBrown 6

$g.FillRectangle($brandBrush, 840, 0, 360, 630)
$g.FillEllipse($creamSoftBrush, 868, 160, 304, 304)

$empanada = New-Object System.Drawing.Drawing2D.GraphicsPath
$empanada.AddArc(900, 255, 240, 160, 180, 180)
$empanada.AddLine(1140, 335, 900, 335)
$empanada.CloseFigure()
$g.FillPath($amberBrush, $empanada)

$crimpPen = New-Pen $goldSoft 4
$crimpPen.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dot
$g.DrawArc($crimpPen, 922, 275, 196, 120, 180, 180)
$g.DrawLine($basePen, 900, 335, 1140, 335)
$g.FillEllipse($amberDeepBrush, 1138, 192, 12, 12)

$logoDrawWidth = 400
$logoDrawHeight = [int][math]::Round($logoDrawWidth * $logo.Height / $logo.Width)
$g.DrawImage($logo, [System.Drawing.Rectangle]::new(70, 56, $logoDrawWidth, $logoDrawHeight))

$eyebrowFont = New-Object System.Drawing.Font("Segoe UI", 14, [System.Drawing.FontStyle]::Bold)
$headlineFont = New-Object System.Drawing.Font("Georgia", 56, [System.Drawing.FontStyle]::Bold)
$bottomFont = New-Object System.Drawing.Font("Segoe UI", 18, [System.Drawing.FontStyle]::Regular)

$g.DrawString("PASABOCAS CONGELADAS $dot POR ENCARGO", $eyebrowFont, $goldBrush, 72, 200)
$g.DrawString("El sabor de casa,", $headlineFont, $inkBrush, 68, 240)
$g.DrawString("listo cuando", $headlineFont, $inkBrush, 68, 316)
$g.DrawString("t$($uAcute) quieras.", $headlineFont, $brandBrush, 68, 392)
$g.DrawLine($goldPen, 72, 486, 700, 486)
$g.DrawString("Precios en COP $dot Pedidos por WhatsApp", $bottomFont, $mutedBrush, 72, 514)
$g.DrawString("qbocados.com", $bottomFont, $goldBrush, 72, 548)
$g.FillRectangle($brandBrush, 0, 612, 840, 18)

$og.Save((Join-Path $output "og-image.png"), [System.Drawing.Imaging.ImageFormat]::Png)

# ---------- Cartel del hero ----------
$cartelPath = [System.IO.Path]::GetFullPath($CartelSource)
$cartelWidth = 1000
$cartelHeight = 0
if (Test-Path $cartelPath) {
  $cartel = [System.Drawing.Bitmap]::FromFile($cartelPath)
  $cartelHeight = [int][math]::Round($cartel.Height * $cartelWidth / $cartel.Width)
  $cartelArt = Resize-Image $cartel $cartelWidth $cartelHeight
  $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
  $jpegParams = [System.Drawing.Imaging.EncoderParameters]::new(1)
  $jpegParams.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new(
    [System.Drawing.Imaging.Encoder]::Quality,
    [long]90
  )
  $cartelArt.Save((Join-Path $output "hero-cartel.jpg"), $jpegCodec, $jpegParams)
  $jpegParams.Dispose()
  $cartelArt.Dispose()
  $cartel.Dispose()
} else {
  Write-Warning "No se encontro el cartel del hero: $cartelPath"
}

# ---------- Limpieza ----------
$g.Dispose()
$og.Dispose()
$brandBrush.Dispose()
$creamSoftBrush.Dispose()
$inkBrush.Dispose()
$mutedBrush.Dispose()
$goldBrush.Dispose()
$amberBrush.Dispose()
$amberDeepBrush.Dispose()
$goldPen.Dispose()
$basePen.Dispose()
$crimpPen.Dispose()
$eyebrowFont.Dispose()
$headlineFont.Dispose()
$bottomFont.Dispose()
$empanada.Dispose()
$icon.Dispose()
$mark.Dispose()
$markRegionBitmap.Dispose()
$logo.Dispose()
$logoCrop.Dispose()
$source.Dispose()

Write-Host "Assets generados en $output"
Write-Host "logo.png: $logoWidth x $logoHeight"
Write-Host "logo-mark.png: $iconSize x $iconSize"
Write-Host "hero-cartel.jpg: $cartelWidth x $cartelHeight"
