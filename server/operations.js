const OPERATIONS = new Set(['suma', 'resta', 'multiplicacion', 'division']);

function calcular(operacion, a, b) {
  if (!OPERATIONS.has(operacion)) {
    throw new Error(`Operación no soportada: ${operacion}`);
  }
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new Error('Los operandos "a" y "b" deben ser números válidos');
  }

  switch (operacion) {
    case 'suma':
      return a + b;
    case 'resta':
      return a - b;
    case 'multiplicacion':
      return a * b;
    case 'division':
      if (b === 0) {
        throw new Error('No se puede dividir entre cero');
      }
      return a / b;
    default:
      throw new Error(`Operación no soportada: ${operacion}`);
  }
}

module.exports = { calcular, OPERATIONS };
