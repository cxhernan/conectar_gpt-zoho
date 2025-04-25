// netlify-python-test/netlify/functions/hello.js

// Netlify Functions en JavaScript usan un manejador (handler) asíncrono.
// Recibe un objeto 'event' (con detalles de la petición) y un objeto 'context'.
exports.handler = async function(event, context) {
  console.log("Hello function executed!"); // Esto aparecerá en los logs de Netlify

  // Puedes acceder a detalles de la petición si los necesitas (método, path, headers, body, etc.)
  // console.log("Event:", event);

  // Las funciones JavaScript devuelven un objeto con statusCode, headers y body (como string).
  return {
    statusCode: 200, // 200 indica éxito
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ "message": "¡Hola desde la función Netlify JavaScript de prueba!" }) // El body debe ser un string
  };
}