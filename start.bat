start "Tailwind" cmd /k "npx tailwindcss -i static/css/input.css -o static/css/style.css --watch"
call venv\Scripts\activate
uvicorn main:app --reload
call venv\Scripts\activate
uvicorn main:app --reload