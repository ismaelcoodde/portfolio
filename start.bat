@echo off
start "Servidor FastAPI" cmd /k "cd /d %~dp0 && venv\Scripts\activate && uvicorn main:app --reload"
start "Tailwind Watch" cmd /k "cd /d %~dp0 && npx @tailwindcss/cli -i static/css/input.css -o static/css/style.css --watch"
start "Browser Sync" cmd /k "cd /d %~dp0 && timeout 5 && npx browser-sync start --proxy localhost:8000 --files static --reload-delay 500 --open"