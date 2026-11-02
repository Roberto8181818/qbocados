# Genera los assets de marca rasterizados (OG image y apple-touch-icon).
# Uso: powershell -ExecutionPolicy Bypass -File scripts/generate-brand-assets.ps1
# Nota: el script se mantiene en ASCII puro para que Windows PowerShell 5.1
# lo interprete igual que PowerShell 7. Los acentos y el punto medio se
# construyen con [char] para no depender de la codificacion del archivo.
param(
  [string]$OutputDir = (Join-Path $PSScriptRoot "..\public")
)

Add-Type -AssemblyName System.Drawing

function New-Brush([string]$hex) {
  return New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml($hex))
}
function New-Pen([string]$hex, [float]$width) {
  return New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml($hex)), $width
}

$output = [System.IO.Path]::GetFullPath($OutputDir)
if (-not (Test-Path $output)) {
  New-Item -ItemType Directory -Path $output | Out-Null
}

$red = "#c43a26"
$cream = "#f3f0e5"
$creamSoft = "#fbf6ea"
$ink = "#3e3325"
$muted = "#6f6555"
$gold = "#a97d3f"
$goldSoft = "#d8bd8b"

$dot = [char]0x00B7
$uAcute = [char]0x00FA

$redBrush = New-Brush $red
$creamSoftBrush = New-Brush $creamSoft
$inkBrush = New-Brush $ink
$mutedBrush = New-Brush $muted
$goldBrush = New-Brush $gold
$goldPen = New-Pen $gold 2
$basePen = New-Pen "#85602d" 6

# ---------- Open Graph 1200 x 630 ----------
$bmp = New-Object System.Drawing.Bitmap 1200, 630
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.Clear([System.Drawing.ColorTranslator]::FromHtml($cream))

$g.FillRectangle($redBrush, 840, 0, 360, 630)
$g.FillEllipse($creamSoftBrush, 868, 160, 304, 304)

$empanada = New-Object System.Drawing.Drawing2D.GraphicsPath
$empanada.AddArc(900, 255, 240, 160, 180, 180)
$empanada.AddLine(1140, 335, 900, 335)
$empanada.CloseFigure()
$g.FillPath($redBrush, $empanada)

$crimpPen = New-Pen $goldSoft 4
$crimpPen.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dot
$g.DrawArc($crimpPen, 922, 275, 196, 120, 180, 180)
$g.DrawLine($basePen, 900, 335, 1140, 335)
$g.FillEllipse($goldBrush, 1138, 192, 12, 12)

$wordmarkFont = New-Object System.Drawing.Font("Segoe UI", 32, [System.Drawing.FontStyle]::Bold)
$eyebrowFont = New-Object System.Drawing.Font("Segoe UI", 14, [System.Drawing.FontStyle]::Bold)
$headlineFont = New-Object System.Drawing.Font("Georgia", 58, [System.Drawing.FontStyle]::Bold)
$bottomFont = New-Object System.Drawing.Font("Segoe UI", 18, [System.Drawing.FontStyle]::Regular)

$g.DrawString("QBOCADOS", $wordmarkFont, $redBrush, 70, 62)
$g.DrawString("PASABOCAS CONGELADAS $dot POR ENCARGO", $eyebrowFont, $goldBrush, 72, 122)
$g.DrawString("El sabor de casa,", $headlineFont, $inkBrush, 68, 190)
$g.DrawString("listo cuando", $headlineFont, $inkBrush, 68, 270)
$g.DrawString("t$($uAcute) quieras.", $headlineFont, $redBrush, 68, 350)
$g.DrawLine($goldPen, 72, 486, 700, 486)
$g.DrawString("Precios en COP $dot Pedidos por WhatsApp", $bottomFont, $mutedBrush, 72, 514)
$g.DrawString("qbocados.com", $bottomFont, $goldBrush, 72, 548)
$g.FillRectangle($redBrush, 0, 612, 840, 18)

$bmp.Save((Join-Path $output "og-image.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()

# ---------- Apple touch icon 180 x 180 ----------
$icon = New-Object System.Drawing.Bitmap 180, 180
$ig = [System.Drawing.Graphics]::FromImage($icon)
$ig.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$ig.Clear([System.Drawing.ColorTranslator]::FromHtml($red))

$iconPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$iconPath.AddArc(34, 66, 112, 74, 180, 180)
$iconPath.AddLine(146, 103, 34, 103)
$iconPath.CloseFigure()
$ig.FillPath($creamSoftBrush, $iconPath)

$iconCrimp = New-Pen $red 3
$iconCrimp.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dot
$ig.DrawArc($iconCrimp, 47, 77, 86, 52, 180, 180)
$ig.DrawLine((New-Pen "#85602d" 4), 34, 103, 146, 103)
$ig.FillEllipse($goldBrush, 142, 42, 8, 8)

$icon.Save((Join-Path $output "apple-touch-icon.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$ig.Dispose()
$icon.Dispose()

Write-Host "Assets generados en $output"
