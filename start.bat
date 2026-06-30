@echo off
title Servidor FastAPI - Portfolio

REM Esto hace que el .bat siempre use la carpeta donde esta guardado el archivo,
REM sin importar desde donde lo ejecutes ni si mueves la carpeta del proyecto.
cd /d "%~dp0"

echo ==========================================
echo  Carpeta del proyecto: %cd%
echo ==========================================
echo.

REM Comprueba que existe el entorno virtual antes de intentar activarlo
if not exist "venv\Scripts\activate.bat" (
    echo [ERROR] No se encontro el entorno virtual en venv\Scripts\activate.bat
    echo Asegurate de que este .bat esta en la misma carpeta que main.py
    pause
    exit /b
)

call venv\Scripts\activate.bat

echo.
echo Entorno virtual activado correctamente.
echo Iniciando servidor FastAPI en http://localhost:8000
echo.

uvicorn main:app --reload

REM Si el servidor se cierra o falla, deja la ventana abierta para poder leer el error
pause