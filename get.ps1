# [INICIO_COMENTARIO] ----- ARQUIVO: get.ps1 (Launcher) ----- [FIM_COMENTARIO]
$ErrorActionPreference = "Stop"

# Link corrigido para a pasta 'Versão Tudo-em-Um-KL' (com codificação para acentos)
$TargetUrl = "https://alfa-info.vercel.app/MAS/v2/MAS_AIO.cmd"

# Local temporário para salvar
$File = "$env:TEMP\MAS_AIO.cmd"

# Baixa o ativador real
Write-Host "Baixando Alfa Ativador..." -ForegroundColor Green
Invoke-WebRequest -Uri $TargetUrl -OutFile $File

# Executa
Write-Host "Iniciando..." -ForegroundColor Green
Start-Process $File -Wait
# [INICIO_COMENTARIO] ----- FIM DO ARQUIVO ----- [FIM_COMENTARIO]
