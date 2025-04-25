// netlify/functions/get_ticket.js

// Netlify Functions usan un manejador (handler) asíncrono.
// Recibe un objeto 'event' (con detalles de la petición) y un objeto 'context'.
exports.handler = async function(event, context) {
  console.log("Function executed!"); // Esto aparecerá en los logs de Netlify

  // --- Extraer parámetros de la query string ---
  // event.queryStringParameters contiene un objeto con los parámetros (ej: { ticket: '500' })
  // Usamos ?? {} para asegurar que queryParams sea un objeto vacío si no hay parámetros
  const queryParams = event.queryStringParameters ?? {};

  // Extraer el valor del parámetro 'ticket'
  // Usamos ?. para evitar errores si queryParams es null o undefined, y ?? para dar un valor por defecto si 'ticket' no existe
  const ticketId = queryParams.ticket ?? 'No especificado';

  console.log("Parámetro 'ticket' recibido:", ticketId); // Ver en logs

  // Puedes acceder a otros parámetros si los hubiera
  // const otroParam = queryParams.otroNombre;

  // --- Lógica de tu función ---
  // Aquí podrías usar el ticketId para buscar información, etc.
  // Por ahora, simplemente lo devolveremos en la respuesta.

  // --- Fin de tu lógica ---

  // Las funciones JavaScript devuelven un objeto con statusCode, headers y body (como string).
  return {
    statusCode: 200, // 200 indica éxito
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: "¡Petición recibida y parámetro extraído!",
      received_ticket_id: ticketId // Devolvemos el valor del ticket que extrajimos
      // Puedes añadir más datos aquí si tu lógica los genera
    })
  };
}