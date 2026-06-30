from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import resend
import os
import json
from dotenv import load_dotenv
from supabase import create_client
from pywebpush import webpush, WebPushException
import httpx
import stripe

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"), override=True)
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
supabase = create_client(supabase_url, supabase_key)

resend.api_key = os.getenv("RESEND_API_KEY")

VAPID_PRIVATE_KEY = os.getenv("VAPID_PRIVATE_KEY")
VAPID_PUBLIC_KEY = os.getenv("VAPID_PUBLIC_KEY")
VAPID_EMAIL = os.getenv("VAPID_EMAIL")

app = FastAPI()

class ContactForm(BaseModel):
    name: str
    email: str
    message: str

class ComentarioForm(BaseModel):
    estado_id: int
    texto: str
    autor: str = 'Anónimo'
    es_anonimo: bool = True
    user_id: str = None

class EstadoForm(BaseModel):
    haciendo: str
    estado_animo: str
    escuchando: str = ''
    en_mi_cabeza: str = ''
    objetivo: str = ''
    ubicacion: str = ''

class SuscripcionForm(BaseModel):
    endpoint: str
    p256dh: str
    auth: str
    user_id: str = None

@app.post("/api/contact")
async def contact(form: ContactForm):
    resend.Emails.send({
        "from": "Portfolio <onboarding@resend.dev>",
        "to": "ibcruzismael@gmail.com",
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

@app.get("/api/estado")
async def get_estado():
    resultado = supabase.table("estados").select("*").order("creado_en", desc=True).limit(1).execute()
    if resultado.data:
        return {"ok": True, "estado": resultado.data[0]}
    else:
        return {"ok": False, "estado": None}

@app.get("/api/estados")
async def get_estados():
    resultado = supabase.table("estados").select("*").order("creado_en", desc=True).execute()
    return {"ok": True, "estados": resultado.data}

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

    try:
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

    try:
        respuesta = supabase.auth.admin.list_users()
        usuarios = respuesta.users if hasattr(respuesta, 'users') else respuesta
        print(f"Usuarios encontrados: {len(usuarios)}")
        for usuario in usuarios:
            print(f"Enviando email a: {usuario.email}")
            if usuario.email:
                resend.Emails.send({
                    "from": "Ismael Cruz <ismael@cruzismael.es>",
                    "to": usuario.email,
                    "subject": "✨ Nuevo estado de Ismael",
                    "html": f"""
                        <div style="font-family:sans-serif; max-width:500px; margin:0 auto; padding:24px; background:#0f0f1a; color:#e2e8f0; border-radius:12px;">
                            <h2 style="color:#a855f7; margin:0 0 16px;">Hay un nuevo estado 👋</h2>
                            <p style="color:#94a3b8; margin:0 0 8px;">Ismael acaba de publicar algo nuevo:</p>
                            <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(168,85,247,0.3); border-radius:8px; padding:16px; margin:16px 0;">
                                <p style="margin:0 0 8px;"><strong>Haciendo:</strong> {form.haciendo}</p>
                                <p style="margin:0 0 8px;"><strong>Estado:</strong> {form.estado_animo}</p>
                                {f'<p style="margin:0;"><strong>En mi cabeza:</strong> {form.en_mi_cabeza}</p>' if form.en_mi_cabeza else ''}
                            </div>
                            <a href="https://cruzismael.es/#ahora" style="display:inline-block; padding:12px 24px; background:#6366f1; color:white; border-radius:8px; text-decoration:none; font-weight:500;">Ver estado completo →</a>
                        </div>
                    """
                })
    except Exception as e:
        print(f"Error enviando emails: {e}")

    if resultado.data:
        return {"ok": True, "estado": resultado.data[0]}
    else:
        return {"ok": False}

@app.get("/api/comentarios/{estado_id}")
async def get_comentarios(estado_id: int):
    resultado = supabase.table("comentarios").select("*").eq("estado_id", estado_id).order("creado_en", desc=False).execute()
    return {"ok": True, "comentarios": resultado.data}

@app.post("/api/comentarios")
async def crear_comentario(form: ComentarioForm):
    resultado = supabase.table("comentarios").insert({
        "estado_id": form.estado_id,
        "texto": form.texto,
        "autor": form.autor,
        "es_anonimo": form.es_anonimo,
        "user_id": form.user_id
    }).execute()
    if resultado.data:
        return {"ok": True, "comentario": resultado.data[0]}
    else:
        return {"ok": False}

@app.get("/api/reacciones/{estado_id}")
async def get_reacciones(estado_id: int):
    resultado = supabase.table("reacciones").select("tipo").eq("estado_id", estado_id).execute()
    conteo = {"❤️": 0, "🔥": 0, "👏": 0, "sonrisa": 0, "triste": 0}
    for r in resultado.data:
        if r["tipo"] in conteo:
            conteo[r["tipo"]] += 1
    return {"ok": True, "reacciones": conteo}

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

@app.post("/api/push/suscribir")
async def suscribir(form: SuscripcionForm):
    supabase.table("suscripciones_push").upsert({
        "endpoint": form.endpoint,
        "p256dh": form.p256dh,
        "auth": form.auth,
        "user_id": form.user_id
    }, on_conflict="endpoint").execute()
    return {"ok": True}

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
                data=json.dumps(data),
                vapid_private_key=VAPID_PRIVATE_KEY,
                vapid_claims={"sub": f"mailto:{VAPID_EMAIL}"}
            )
        except WebPushException as e:
            errores.append(str(e))
    return {"ok": True, "errores": errores}

#Salud
@app.post("/api/health")
async def recibir_health(data: dict):
    try:
        metrics = data.get("data", {}).get("metrics", [])
        
        # Organizar datos por fecha
        por_fecha = {}
        
        for metric in metrics:
            nombre = metric.get("name")
            for entrada in metric.get("data", []):
                fecha = entrada.get("date", "")[:10]
                if fecha not in por_fecha:
                    por_fecha[fecha] = {}
                
                if nombre == "step_count":
                    por_fecha[fecha]["pasos"] = int(entrada.get("qty", 0))
                elif nombre == "heart_rate":
                    por_fecha[fecha]["frecuencia_cardiaca_avg"] = entrada.get("Avg")
                    por_fecha[fecha]["frecuencia_cardiaca_min"] = entrada.get("Min")
                    por_fecha[fecha]["frecuencia_cardiaca_max"] = entrada.get("Max")
                elif nombre == "resting_heart_rate":
                    por_fecha[fecha]["frecuencia_cardiaca_reposo"] = entrada.get("qty")
                elif nombre == "blood_oxygen_saturation":
                    por_fecha[fecha]["oxigeno_sangre"] = entrada.get("qty")
                elif nombre == "apple_exercise_time":
                    por_fecha[fecha]["tiempo_ejercicio"] = entrada.get("qty")
                elif nombre == "apple_stand_time":
                    por_fecha[fecha]["tiempo_pie"] = entrada.get("qty")
                elif nombre == "time_in_daylight":
                    por_fecha[fecha]["tiempo_sol"] = entrada.get("qty")
                elif nombre == "sleep_analysis":
                    por_fecha[fecha]["sueno_total"] = entrada.get("totalSleep")
                    por_fecha[fecha]["sueno_rem"] = entrada.get("rem")
                    por_fecha[fecha]["sueno_profundo"] = entrada.get("deep")
                    por_fecha[fecha]["sueno_core"] = entrada.get("core")

        # Guardar en Supabase
        for fecha, valores in por_fecha.items():
            valores["fecha"] = fecha
            supabase.table("health_data").upsert(valores, on_conflict="fecha").execute()

        return {"ok": True, "fechas": list(por_fecha.keys())}
    except Exception as e:
        return {"ok": False, "error": str(e)}
    
    #Luna

@app.get("/api/luna")
async def get_luna():
    from datetime import datetime
    ahora = datetime.now()
    fecha = ahora.strftime("%Y-%m-%dT%H:00")
    try:
        async with httpx.AsyncClient() as client:
            res = await client.get(f"https://svs.gsfc.nasa.gov/api/dialamoon/{fecha}")
            return res.json()
    except Exception as e:
        return {"error": str(e)}
    
# ---------- Lectura Bíblica ----------

FECHA_INICIO_BIBLIA = "2026-06-30"
CAPITULOS_POR_DIA = 7
TOTAL_CAPITULOS = 1189

def calcular_dia_actual():
    from datetime import datetime
    inicio = datetime.strptime(FECHA_INICIO_BIBLIA, "%Y-%m-%d")
    hoy = datetime.now()
    dias_transcurridos = (hoy - inicio).days
    if dias_transcurridos < 0:
        return 0
    return dias_transcurridos

@app.get("/api/biblia/hoy")
async def lectura_de_hoy():
    dia = calcular_dia_actual()
    orden_inicio = dia * CAPITULOS_POR_DIA + 1
    orden_fin = min(orden_inicio + CAPITULOS_POR_DIA - 1, TOTAL_CAPITULOS)

    if orden_inicio > TOTAL_CAPITULOS:
        return {"ok": True, "completado": True, "capitulos": []}

    rango = supabase.table("orden_biblia") \
        .select("libro, capitulo, orden") \
        .gte("orden", orden_inicio) \
        .lte("orden", orden_fin) \
        .order("orden") \
        .execute()

    capitulos = []
    for item in rango.data:
        capitulo_data = await obtener_o_descargar_capitulo(item["libro"], item["capitulo"], item["orden"])
        capitulos.append(capitulo_data)

    return {"ok": True, "completado": False, "dia": dia + 1, "capitulos": capitulos}



NUMERO_LIBRO = {
    "Génesis": 1, "Éxodo": 2, "Levítico": 3, "Números": 4, "Deuteronomio": 5,
    "Josué": 6, "Jueces": 7, "Rut": 8, "1 Samuel": 9, "2 Samuel": 10,
    "1 Reyes": 11, "2 Reyes": 12, "1 Crónicas": 13, "2 Crónicas": 14, "Esdras": 15,
    "Nehemías": 16, "Ester": 17, "Job": 18, "Salmos": 19, "Proverbios": 20,
    "Eclesiastés": 21, "Cantares": 22, "Isaías": 23, "Jeremías": 24, "Lamentaciones": 25,
    "Ezequiel": 26, "Daniel": 27, "Oseas": 28, "Joel": 29, "Amós": 30,
    "Abdías": 31, "Jonás": 32, "Miqueas": 33, "Nahúm": 34, "Habacuc": 35,
    "Sofonías": 36, "Hageo": 37, "Zacarías": 38, "Malaquías": 39,
    "Mateo": 40, "Marcos": 41, "Lucas": 42, "Juan": 43, "Hechos": 44,
    "Romanos": 45, "1 Corintios": 46, "2 Corintios": 47, "Gálatas": 48, "Efesios": 49,
    "Filipenses": 50, "Colosenses": 51, "1 Tesalonicenses": 52, "2 Tesalonicenses": 53,
    "1 Timoteo": 54, "2 Timoteo": 55, "Tito": 56, "Filemón": 57, "Hebreos": 58,
    "Santiago": 59, "1 Pedro": 60, "2 Pedro": 61, "1 Juan": 62, "2 Juan": 63,
    "3 Juan": 64, "Judas": 65, "Apocalipsis": 66
}

async def obtener_o_descargar_capitulo(libro: str, capitulo: int, orden: int):
    existente = supabase.table("lectura_biblica") \
        .select("*") \
        .eq("libro", libro) \
        .eq("capitulo", capitulo) \
        .execute()

    if existente.data:
        return existente.data[0]

    numero_libro = NUMERO_LIBRO.get(libro)
    url = f"https://api.getbible.net/v2/sse/{numero_libro}/{capitulo}.json"

    async with httpx.AsyncClient(timeout=15.0) as client:
        res = await client.get(url)
        data = res.json()

    versiculos = data.get("verses", [])
    texto = "\n".join(v["text"].strip() for v in versiculos)

    nuevo = supabase.table("lectura_biblica").insert({
        "libro": libro,
        "capitulo": capitulo,
        "texto": texto,
        "orden": orden
    }).execute()

    return nuevo.data[0]


@app.get("/api/biblia/progreso")
async def progreso_biblia():
    leidos = supabase.table("lectura_biblica").select("id", count="exact").execute()
    total_leidos = leidos.count or 0
    porcentaje = round((total_leidos / TOTAL_CAPITULOS) * 100, 1)
    return {
        "ok": True,
        "leidos": total_leidos,
        "total": TOTAL_CAPITULOS,
        "porcentaje": porcentaje
    }
    


@app.get("/api/biblia/libro/{libro}")
async def capitulos_de_libro(libro: str):
    resultado = supabase.table("lectura_biblica") \
        .select("*") \
        .eq("libro", libro) \
        .order("capitulo") \
        .execute()
    return {"ok": True, "capitulos": resultado.data}

@app.get("/api/biblia/resumen-libros")
async def resumen_libros():
    todos = supabase.table("orden_biblia") \
        .select("libro, capitulo, orden") \
        .order("orden") \
        .execute()

    leidos = supabase.table("lectura_biblica") \
        .select("libro, capitulo") \
        .execute()

    leidos_set = {(item["libro"], item["capitulo"]) for item in leidos.data}

    libros = {}
    for item in todos.data:
        libro = item["libro"]
        if libro not in libros:
            libros[libro] = {"libro": libro, "total_capitulos": 0, "leidos": 0, "orden_inicio": item["orden"]}
        libros[libro]["total_capitulos"] += 1
        if (libro, item["capitulo"]) in leidos_set:
            libros[libro]["leidos"] += 1

    lista_libros = sorted(libros.values(), key=lambda x: x["orden_inicio"])

    return {"ok": True, "libros": lista_libros}
    
#Stripe
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
STRIPE_PRICE_ID = os.getenv("STRIPE_PRICE_ID")
STRIPE_PUBLISHABLE_KEY = os.getenv("STRIPE_PUBLISHABLE_KEY")
print(f"STRIPE_PUBLISHABLE_KEY: {STRIPE_PUBLISHABLE_KEY}")

@app.get("/api/stripe/config")
async def stripe_config():
    return {"publishableKey": STRIPE_PUBLISHABLE_KEY}

@app.post("/api/stripe/create-subscription")
async def create_subscription(data: dict):
    try:
       # Crear cliente en Stripe
        customer = stripe.Customer.create(email=data["email"])
        
        # Crear suscripción con pago pendiente
        subscription = stripe.Subscription.create(
            customer=customer.id,
            items=[{"price": STRIPE_PRICE_ID}],
            payment_behavior="default_incomplete",
            payment_settings={"save_default_payment_method": "on_subscription"},
            # CAMBIO: Usamos confirmation_secret en lugar de payment_intent
            expand=["latest_invoice.confirmation_secret"]
        )
        
        return {
            "subscriptionId": subscription.id,
            # CAMBIO: Accedemos al client_secret a través de confirmation_secret
            "clientSecret": subscription.latest_invoice.confirmation_secret.client_secret
        }
    except Exception as e:
        return {"error": str(e)}

@app.post("/api/stripe/webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")
    webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET")
    
    try:
        event = stripe.Webhook.construct_event(payload, sig_header, webhook_secret)
        if event["type"] == "customer.subscription.created":
            print(f"Nueva suscripción: {event['data']['object']['id']}")
        elif event["type"] == "invoice.payment_succeeded":
            print(f"Pago recibido: {event['data']['object']['id']}")
    except Exception as e:
        return {"error": str(e)}
    
    return {"ok": True}

app.mount("/", StaticFiles(directory="static", html=True), name="static")