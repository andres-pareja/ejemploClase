const SIMBOLOS = {
  suma: '+',
  resta: '−',
  multiplicacion: '×',
  division: '÷',
};

const displayActual = document.getElementById('display-actual');
const displayHistorial = document.getElementById('display-historial');
const mensajeError = document.getElementById('mensaje-error');
const estadoApi = document.getElementById('estado-api');

let entradaActual = '0';
let valorAnterior = null;
let operacionPendiente = null;
let esperandoNuevoValor = false;

function actualizarPantalla() {
  displayActual.textContent = entradaActual;
  displayHistorial.textContent =
    valorAnterior !== null && operacionPendiente
      ? `${valorAnterior} ${SIMBOLOS[operacionPendiente]}`
      : '';
}

function mostrarError(texto) {
  mensajeError.textContent = texto;
}

function limpiarTodo() {
  entradaActual = '0';
  valorAnterior = null;
  operacionPendiente = null;
  esperandoNuevoValor = false;
  mostrarError('');
  actualizarPantalla();
}

function ingresarNumero(digito) {
  mostrarError('');
  if (esperandoNuevoValor) {
    entradaActual = digito === '.' ? '0.' : digito;
    esperandoNuevoValor = false;
    actualizarPantalla();
    return;
  }

  if (digito === '.' && entradaActual.includes('.')) return;
  entradaActual = entradaActual === '0' && digito !== '.' ? digito : entradaActual + digito;
  actualizarPantalla();
}

function borrarUltimo() {
  if (esperandoNuevoValor) return;
  entradaActual = entradaActual.length > 1 ? entradaActual.slice(0, -1) : '0';
  actualizarPantalla();
}

function aplicarPorcentaje() {
  entradaActual = String(parseFloat(entradaActual) / 100);
  actualizarPantalla();
}

async function llamarApiCalcular(operacion, a, b) {
  const respuesta = await fetch('/api/calcular', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ operacion, a, b }),
  });

  const datos = await respuesta.json();
  if (!respuesta.ok) {
    throw new Error(datos.error || 'Error en el cálculo');
  }
  return datos.resultado;
}

async function seleccionarOperacion(operacion) {
  mostrarError('');

  if (operacionPendiente && !esperandoNuevoValor) {
    await calcularResultado();
  }

  valorAnterior = entradaActual;
  operacionPendiente = operacion;
  esperandoNuevoValor = true;
  actualizarPantalla();
}

async function calcularResultado() {
  if (operacionPendiente === null || valorAnterior === null) return;

  try {
    const resultado = await llamarApiCalcular(
      operacionPendiente,
      parseFloat(valorAnterior),
      parseFloat(entradaActual)
    );
    entradaActual = String(resultado);
    valorAnterior = null;
    operacionPendiente = null;
    esperandoNuevoValor = true;
    actualizarPantalla();
  } catch (error) {
    mostrarError(error.message);
  }
}

document.querySelectorAll('[data-numero]').forEach((boton) => {
  boton.addEventListener('click', () => ingresarNumero(boton.dataset.numero));
});

document.querySelectorAll('[data-operacion]').forEach((boton) => {
  boton.addEventListener('click', () => seleccionarOperacion(boton.dataset.operacion));
});

document.querySelector('[data-accion="limpiar"]').addEventListener('click', limpiarTodo);
document.querySelector('[data-accion="borrar"]').addEventListener('click', borrarUltimo);
document.querySelector('[data-accion="porcentaje"]').addEventListener('click', aplicarPorcentaje);
document.querySelector('[data-accion="igual"]').addEventListener('click', calcularResultado);

document.addEventListener('keydown', (evento) => {
  const { key } = evento;
  if (/^[0-9.]$/.test(key)) ingresarNumero(key);
  else if (key === 'Enter' || key === '=') calcularResultado();
  else if (key === 'Backspace') borrarUltimo();
  else if (key === 'Escape') limpiarTodo();
  else if (key === '+') seleccionarOperacion('suma');
  else if (key === '-') seleccionarOperacion('resta');
  else if (key === '*') seleccionarOperacion('multiplicacion');
  else if (key === '/') {
    evento.preventDefault();
    seleccionarOperacion('division');
  }
});

async function verificarApi() {
  try {
    await llamarApiCalcular('suma', 1, 1);
    estadoApi.textContent = 'en línea';
    estadoApi.className = 'ok';
  } catch (error) {
    estadoApi.textContent = 'sin conexión';
    estadoApi.className = 'error';
  }
}

actualizarPantalla();
verificarApi();
