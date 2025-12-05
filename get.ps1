# [INICIO_COMENTARIO] ----- ARQUIVO: get.ps1 (Launcher) ----- [FIM_COMENTARIO]
$ErrorActionPreference = "Stop"
# 1. Defina a URL do seu arquivo principal (O CMD ou ZIP que você baixou)
# Se estiver na raiz do repo, a URL será algo como:
$TargetUrl = "https://alfa-info.vercel.app/MAS/All-In-One-Version/MAS_AIO.cmd" 
# (VERIFIQUE O CAMINHO EXATO DA PASTA ONDE VOCÊ COLOCOU O ARQUIVO NO GITHUB)

# 2. Cria um nome temporário
$File = "$env:TEMP\MAS_AIO.cmd"

# 3. Baixa o ativador real
Write-Host "Baixando Alfa Ativador..." -ForegroundColor Green
Invoke-WebRequest -Uri $TargetUrl -OutFile $File

# 4. Executa
Write-Host "Iniciando..." -ForegroundColor Green
Start-Process $File -Wait
# [INICIO_COMENTARIO] ----- FIM DO ARQUIVO ----- [FIM_COMENTARIO]