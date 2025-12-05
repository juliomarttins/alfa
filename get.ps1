
$ErrorActionPreference = "Stop"

$TargetUrl = "https://alfa-info.vercel.app/MAS/Vers%C3%A3o%20Tudo-em-Um-KL/MAS_AIO.cmd"



$File = "$env:TEMP\MAS_AIO.cmd"


Write-Host "Baixando Alfa Ativador..." -ForegroundColor Green
Invoke-WebRequest -Uri $TargetUrl -OutFile $File


Write-Host "Iniciando..." -ForegroundColor Green
Start-Process $File -Wait

