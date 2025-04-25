# netlify/functions/mi_webhook.py
#PRUEBA 4
import json
import base64 # Probablemente no necesario para GET body, pero útil si esperas POST también

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

def handler(event, context):
    """
    Función que se activa con la petición HTTP (puede ser GET, POST, etc.).
    'event' contiene los detalles de la petición HTTP.
    'context' contiene información del entorno de ejecución.
    """

    print(f"Petición recibida (método: {event.get('httpMethod')})") # Ver en logs

    # --- Lógica para recibir parámetros GET ---
    # event['queryStringParameters'] es un diccionario con los parámetros de la URL
    query_params = event.get('queryStringParameters')

    parametros_recibidos = {}
    if query_params:
        print("Parámetros GET recibidos:", query_params) # Ver en logs
        # Puedes acceder a un parámetro específico por su nombre:
        ticket = query_params.get('ticket')
        info_ticket=get_info_ticket(ticket)

    # --- Lógica para recibir cuerpo POST (si también esperas POST webhooks) ---
    # (Mantén esta parte si tu función recibe ambos tipos de peticiones)
    # ... código para leer event['body'] y decodificar si es necesario ...
    # ... procesar json.loads() si aplica ...
    # ... almacenar o usar los datos del body ...
    # Nota: Una petición GET *puede* tener cuerpo, pero es muy inusual y no recomendado.
    # Los parámetros se envían en la URL para GET.

    # --- Fin de tu lógica de procesamiento ---

    # Prepara la respuesta
    response_body = {
        "message": "Petición recibida!",
        "method": event.get('httpMethod'),
        "received_query_params": info_ticket, # Incluir los parámetros recibidos
        # "received_body": webhook_data # Incluir datos del body si también procesas POST
    }

    return {
        "statusCode": 200, # 200 indica éxito
        "headers": { "Content-Type": "application/json" },
        "body": json.dumps(response_body)
    }

    # ... (manejo de errores - similar al ejemplo anterior) ...



