from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import resend
import os
from dotenv import load_dotenv


# Carga las variables del archivo .env
load_dotenv()

# Configura Resend con tu API key
resend.api_key = os.getenv("RESEND_API_KEY")

# Creamos la aplicación
app = FastAPI()

# Pydantic define exactamente qué datos esperamos recibir
# Si falta algún campo o tiene el tipo incorrecto, FastAPI rechaza la petición
class ContactForm(BaseModel):
    name: str
    email: str
    message: str

# @app.post crea un endpoint que escucha peticiones POST en /api/contact
@app.post("/api/contact")
async def contact(form: ContactForm):
    
    resend.Emails.send({
        "from": "Portfolio <onboarding@resend.dev>",
        "to": "ibcruzismael@gmail.com",        # ← pon tu email aquí
        "subject": f"Nuevo mensaje de {form.name}",
        "html": f"""
            <h2>Nuevo mensaje desde tu portfolio</h2>
            <p><strong>Nombre:</strong> {form.name}</p>
            <p><strong>Email:</strong> {form.email}</p>
            <p><strong>Mensaje:</strong></p>
            <p>{form.message}</p>
        """
    })
    
    return {"ok": True, "message": "Mensaje enviado"}

app.mount("/", StaticFiles(directory="static", html=True), name="static")