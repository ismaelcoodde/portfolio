from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import resend
import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv(dotenv_path=".env", override=True)

# Conectamos con Supabase usando las variables del .env
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
supabase = create_client(supabase_url, supabase_key)


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

# Endpoint para obtener el estado más reciente
@app.get("/api/estado")
async def get_estado():
    resultado = supabase.table("estados").select("*").order("creado_en", desc=True).limit(1).execute()
    
    if resultado.data:
        return {"ok": True, "estado": resultado.data[0]}
    else:
        return {"ok": False, "estado": None}



# Endpoint para obtener los comentarios de un estado
@app.get("/api/comentarios/{estado_id}")
async def get_comentarios(estado_id: int):
    resultado = supabase.table("comentarios").select("*").eq("estado_id", estado_id).order("creado_en", desc=False).execute()
    return {"ok": True, "comentarios": resultado.data}

# Modelo para recibir un comentario nuevo
class ComentarioForm(BaseModel):
    estado_id: int
    texto: str
    autor: str = 'Anónimo'
    es_anonimo: bool = True

# Endpoint para crear un comentario nuevo
@app.post("/api/comentarios")
async def crear_comentario(form: ComentarioForm):
    resultado = supabase.table("comentarios").insert({
        "estado_id": form.estado_id,
        "texto": form.texto,
        "autor": form.autor,
        "es_anonimo": form.es_anonimo
    }).execute()

    if resultado.data:
        return {"ok": True, "comentario": resultado.data[0]}
    else:
        return {"ok": False}
    

 # Modelo para recibir un estado nuevo
class EstadoForm(BaseModel):
    haciendo: str
    estado_animo: str
    escuchando: str = ''
    en_mi_cabeza: str = ''
    objetivo: str = ''
    ubicacion: str = ''

# Endpoint para crear un estado nuevo
@app.post("/api/estado")
async def crear_estado(form: EstadoForm):
    resultado = supabase.table("estados").insert({
        "haciendo": form.haciendo,
        "estado_animo": form.estado_animo,
        "escuchando": form.escuchando,
        "en_mi_cabeza": form.en_mi_cabeza,
        "objetivo": form.objetivo,
        "ubicacion": form.ubicacion
    }).execute()

    # Enviamos notificación push a todos los suscritos
    try:
        import json
        suscripciones = supabase.table("suscripciones_push").select("*").execute()
        for sub in suscripciones.data:
            try:
                webpush(
                    subscription_info={
                        "endpoint": sub["endpoint"],
                        "keys": {
                            "p256dh": sub["p256dh"],
                            "auth": sub["auth"]
                        }
                    },
                    data=json.dumps({
                        "title": "Ismael Cruz",
                        "body": f"Nuevo estado: {form.haciendo or form.estado_animo}",
                        "url": "/#ahora"
                    }),
                    vapid_private_key=VAPID_PRIVATE_KEY,
                    vapid_claims={"sub": f"mailto:{VAPID_EMAIL}"}
                )
            except Exception:
                pass
    except Exception:
        pass

    if resultado.data:
        return {"ok": True, "estado": resultado.data[0]}
    else:
        return {"ok": False}  
    
    # Endpoint para obtener las reacciones de un estado
@app.get("/api/reacciones/{estado_id}")
async def get_reacciones(estado_id: int):
    resultado = supabase.table("reacciones").select("tipo").eq("estado_id", estado_id).execute()
    
    conteo = {"❤️": 0, "🔥": 0, "👏": 0, "sonrisa": 0, "triste": 0}
    for r in resultado.data:
        if r["tipo"] in conteo:
            conteo[r["tipo"]] += 1
    
    return {"ok": True, "reacciones": conteo}

# Endpoint para añadir una reacción
@app.post("/api/reacciones")
async def crear_reaccion(data: dict):
    resultado = supabase.table("reacciones").insert({
        "estado_id": data["estado_id"],
        "tipo": data["tipo"]
    }).execute()

    if resultado.data:
        return {"ok": True}
    else:
        return {"ok": False}
    
    # Endpoint para obtener todos los estados anteriores
@app.get("/api/estados")
async def get_estados():
    resultado = supabase.table("estados").select("*").order("creado_en", desc=True).execute()
    return {"ok": True, "estados": resultado.data}

#Notificaciones
from pywebpush import webpush, WebPushException

VAPID_PRIVATE_KEY = os.getenv("VAPID_PRIVATE_KEY")
VAPID_PUBLIC_KEY = os.getenv("VAPID_PUBLIC_KEY")
VAPID_EMAIL = os.getenv("VAPID_EMAIL")

# Modelo para guardar suscripción
class SuscripcionForm(BaseModel):
    endpoint: str
    p256dh: str
    auth: str
    user_id: str = None

# Guardar suscripción push
@app.post("/api/push/suscribir")
async def suscribir(form: SuscripcionForm):
    resultado = supabase.table("suscripciones_push").upsert({
        "endpoint": form.endpoint,
        "p256dh": form.p256dh,
        "auth": form.auth,
        "user_id": form.user_id
    }, on_conflict="endpoint").execute()
    return {"ok": True}

# Enviar notificación a todos los suscritos
@app.post("/api/push/enviar")
async def enviar_push(data: dict):
    suscripciones = supabase.table("suscripciones_push").select("*").execute()
    
    errores = []
    for sub in suscripciones.data:
        try:
            webpush(
                subscription_info={
                    "endpoint": sub["endpoint"],
                    "keys": {
                        "p256dh": sub["p256dh"],
                        "auth": sub["auth"]
                    }
                },
                data=str(data),
                vapid_private_key=VAPID_PRIVATE_KEY,
                vapid_claims={"sub": f"mailto:{VAPID_EMAIL}"}
            )
        except WebPushException as e:
            errores.append(str(e))
    
    return {"ok": True, "errores": errores}

app.mount("/", StaticFiles(directory="static", html=True), name="static")    