import requests

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



