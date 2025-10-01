@echo off
echo ========================================
echo    THE ORIGINALS PETS - Copiar Imagen
echo ========================================
echo.
echo Buscando imagen de WhatsApp...
echo.

REM Buscar la imagen en diferentes ubicaciones comunes
set "imagen_encontrada="

REM Buscar en Descargas
if exist "%USERPROFILE%\Downloads\WhatsApp Image 2025-09-26 at 7.07.24 PM.jpg" (
    set "imagen_encontrada=%USERPROFILE%\Downloads\WhatsApp Image 2025-09-26 at 7.07.24 PM.jpg"
    echo ✓ Imagen encontrada en Descargas
)

REM Buscar en Escritorio
if exist "%USERPROFILE%\Desktop\WhatsApp Image 2025-09-26 at 7.07.24 PM.jpg" (
    set "imagen_encontrada=%USERPROFILE%\Desktop\WhatsApp Image 2025-09-26 at 7.07.24 PM.jpg"
    echo ✓ Imagen encontrada en Escritorio
)

REM Buscar en la carpeta actual
if exist "WhatsApp Image 2025-09-26 at 7.07.24 PM.jpg" (
    set "imagen_encontrada=WhatsApp Image 2025-09-26 at 7.07.24 PM.jpg"
    echo ✓ Imagen encontrada en la carpeta actual
)

if "%imagen_encontrada%"=="" (
    echo ❌ No se encontró la imagen "WhatsApp Image 2025-09-26 at 7.07.24 PM.jpg"
    echo.
    echo Por favor:
    echo 1. Asegúrate de que la imagen esté en una de estas ubicaciones:
    echo    - Descargas
    echo    - Escritorio  
    echo    - Esta carpeta del proyecto
    echo.
    echo 2. O copia manualmente la imagen a: img\WhatsApp Image 2025-09-26 at 7.07.24 PM.jpg
    echo.
    pause
    exit /b 1
)

echo.
echo Copiando imagen a la carpeta img...
copy "%imagen_encontrada%" "img\WhatsApp Image 2025-09-26 at 7.07.24 PM.jpg"

if %errorlevel%==0 (
    echo ✓ ¡Imagen copiada exitosamente!
    echo.
    echo La página web ahora mostrará tu foto de perfil.
    echo Abre index.html en tu navegador para ver el resultado.
) else (
    echo ❌ Error al copiar la imagen
)

echo.
pause

