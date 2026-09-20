›Proyecto de una calculadora para la clase Devops 2026-2
Nuevo Cambio 

Respuestas Taller:

init: este comando es para iniciar la aplicacion git en la carpeta que se ha creado.

add: es para que se incluyan los cambios que quiero en el proximo commit.

commit: Es para decir hasta donde llego un cambio, como cuando uno hace un archivo word o excel y a medida que va cambiando, el titulo se modifica a entrega 1, entrega 2, entrega 3. Es el mismo documento pero con actualizaciones.

push: Es para subir los cambios al repositorio remoto

status: Es como hacer un diagnostico de lo que hay. 

diff: Muestra lo que se modifico respecto a la ultima versión

log: muestra las versiones que hay.

# Calculadora Pixel

Calculadora web con interfaz pixel art y tema oscuro. El frontend (HTML/CSS/JS) consume una API REST en Node.js/Express que resuelve las operaciones elementales (suma, resta, multiplicación, división).

## Estructura

- `server/` — API REST en Express (`server.js`, lógica en `operations.js`).
- `public/` — Frontend estático (HTML, CSS pixel art, JS) servido por el mismo servidor.

## Cómo ejecutar

```bash
cd server
npm install
npm start
```

Luego abre `http://localhost:3000` en el navegador.

## API

`POST /api/calcular`

Body JSON:

```json
{ "operacion": "suma", "a": 5, "b": 3 }
```

`operacion` acepta: `suma`, `resta`, `multiplicacion`, `division`.

Respuesta:

```json
{ "resultado": 8 }
```


