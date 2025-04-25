async function getInfoTicket(num_ticket) {
    // **SEGURIDAD: No pongas claves API directamente en el código.**
    // Accede a la variable de entorno configurada en Netlify.
    const zapikey = "1003.f873d1f1ffb10152e4cf04a6ebc3310b.710aaa297729d353ebd55d1c77e5056c";

    // Si la variable de entorno no está configurada, lanza un error
    if (!zapikey) {
         console.error("getInfoTicket: ZOHO_ZAPIKEY environment variable not set!");
         // Es mejor lanzar un error aquí que la función que llama pueda capturar
         throw new Error("ZAPIKEY environment variable not set.");
    }

    // URL del endpoint base
    const baseUrl = "https://www.zohoapis.com/crm/v7/functions/crear_cliente_en_contifico/actions/execute";

    // Construir los parámetros de la query string para la petición a Zoho
    const params = new URLSearchParams({
        auth_type: "apikey",
        zapikey: zapikey,
        num_ticket: num_ticket // Usamos el ticket que se le pasa como argumento a esta función
    });

    const zohoUrl = `${baseUrl}?${params.toString()}`;

    console.log("getInfoTicket: Fetching URL:", zohoUrl); // ¡Cuidado al loguear URLs con claves!

    // Realizar la petición GET
    try {
        const response = await fetch(zohoUrl, {
            method: 'GET'
        });

        console.log(`getInfoTicket: Status Code from Zoho: ${response.status}`);

        // Manejar la respuesta
        let responseData;
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
             try {
                 responseData = await response.json();
                 console.log("getInfoTicket: Response JSON from Zoho:", responseData);
             } catch (e) {
                 console.warn("getInfoTicket: Failed to parse Zoho response as JSON, getting as text:", e);
                 responseData = await response.text();
                 // Puedes añadir una bandera para indicar que no fue JSON si es necesario
                 // responseData = { raw_text: responseData, was_json: false };
                 console.log("getInfoTicket: Response Text from Zoho:", responseData);
             }
        } else {
            responseData = await response.text();
            console.log("getInfoTicket: Response Text from Zoho:", responseData);
        }

        // Retornar los datos obtenidos (no la respuesta HTTP completa de la Netlify Function)
        return {
            status: response.status, // Puedes incluir el status si es relevante para quien la llama
            body: responseData // Los datos parseados (JSON o texto)
        };

    } catch (error) {
        console.error("getInfoTicket: Error during fetch to Zoho:", error);
        // Relanzar el error o retornar un objeto de error
        throw new Error(`Error fetching Zoho info: ${error.message}`);
    }
}


exports.handler = async function(event, context) {
  console.log("Function executed!"); // Esto aparecerá en los logs de Netlify
  const queryParams = event.queryStringParameters ?? {};
  const num_ticket = queryParams.num_ticket ?? 'No especificado';
  const zohoInfo = getInfoTicket(num_ticket);
  const statusCodeToReturn = zohoInfo.status && zohoInfo.status >= 200 && zohoInfo.status < 300 ? 200 : 500;
  console.log("Parámetro 'ticket' recibido:", zohoInfo); // Ver en logs
  return {
    statusCode: 200, // 200 indica éxito
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: "¡Petición recibida y parámetro extraído!",
      num_ticket: num_ticket, 
      resp_zoho: zohoInfo
    })
  };
}