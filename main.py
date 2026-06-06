from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

# Creamos la aplicación
app = FastAPI()

# Le decimos a FastAPI que sirva todo lo que haya en /static
# cuando alguien visite nuestra web
app.mount("/", StaticFiles(directory="static", html=True), name="static")