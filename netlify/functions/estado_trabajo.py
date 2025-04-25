def handler(event, context):
    """
    Una función de prueba simple para Netlify.
    """
    print("Hello function executed!") # Esto aparecerá en los logs de Netlify

    return {
        "statusCode": 200,
        "headers": { "Content-Type": "application/json" },
        "body": json.dumps({ "message": "¡Hola desde la función Netlify Python de prueba!" })
    }

