›Proyecto de una calculadora para la clase Devops 2026-2

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
