# Dentro de tu función handler(event, context):
import json
import base64
# ... (resto del código de la función)

def get_info_ticket(ticket):
    # URL del endpoint
    url = "https://www.zohoapis.com/crm/v7/functions/crear_cliente_en_contifico/actions/execute"
    params = {
        "auth_type": "apikey",
        "zapikey": "1003.f873d1f1ffb10152e4cf04a6ebc3310b.710aaa297729d353ebd55d1c77e5056c",
        "ticket": 90
    }

    # Realizar la petición GET
    response = requests.get(url, params=params)

    # Imprimir el código de estado y la respuesta
    print(f"Status Code: {response.status_code}")
    print("Response JSON:")
    try:
        return response.json()
    except ValueError:
        return response.text


try:
# 1. Acceder al cuerpo
body = event.get('body', '')
    # 2. Verificar y decodificar Base64 si es necesario
if event.get('isBase64Encoded', False):
    body = base64.b64decode(body).decode('utf-8')
    # 3. Procesar el cuerpo (ejemplo si es JSON)
webhook_data = {}
if body:
    try:
        webhook_data = json.loads(body)
        print("Datos JSON recibidos:", webhook_data) # Verás esto en los logs de Netlify
        # Ahora puedes usar el diccionario 'webhook_data'
        # Por ejemplo: nombre = webhook_data.get('nombre_parametro')
        ticket = webhook_data.get('ticket')
        info_ticket=get_info_ticket(ticket)
        # Y hacer algo con 'nombre'
        # ... tu lógica aquí ...
        except json.JSONDecodeError:
        print("Cuerpo no es JSON válido:", body)
        webhook_data = {"raw_body": body} # Manejar caso donde no es JSON
    # ... (resto de la lógica y la respuesta)
    response = {
    "statusCode": 200,
    "headers": { "Content-Type": "application/json" },
    "body": json.dumps({
        "message": "Webhook procesado",
        "received_data": info_ticket # Puedes devolver los datos recibidos para confirmación
    })
}
return response
except Exception as e:
# ... (manejo de errores)
pass # Implementa tu manejo de errores real aquí


