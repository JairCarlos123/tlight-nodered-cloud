# TLIGHT en Node-RED / Render

Panel reutilizado del flujo local del proyecto. Recibe datos reales por HTTPS;
no se conecta directamente por Modbus al ordenador ni ejecuta el modelo ML.

## Render

- Runtime: Node; Node 22 definido en package.json.
- Build: `npm ci`
- Start: `npm start`
- Root directory: vacio.
- Variables: `ADMIN_USER=admin`, `ADMIN_PASSWORD` (secreto elegido por el usuario,
  minimo 16 caracteres), `NODE_RED_CREDENTIAL_SECRET` (otro secreto largo).
- Editor: `/red` (login). Panel: `/dashboard` (autenticacion HTTP Basic con el
  mismo usuario y contrasena). No incluir secretos en Git ni en capturas.

El servicio se niega a arrancar sin contrasena. Render proporciona HTTPS.
En el plan gratuito los cambios hechos en el editor se pierden tras reinicios
o despliegues: exportar y actualizar flows.json en Git para conservarlos.

## Datos

POST `/api/tlight`, autenticacion HTTP Basic, JSON:

```
{"kind":"luces","values":[true,false,false,false,true]}
{"kind":"contadores","values":[0,0,3,0,0]}
{"kind":"controles","values":[false,false,true]}
```

Orden luces: p_red,p_green,v_red,v_yel,v_green.
Orden contadores: C1,C2,C3,C4,C5. Controles: p_right,p_left,start.
Cada lectura es independiente; no representa una captura atomica de 13 variables.
El panel conserva el ultimo valor recibido; no demuestra que el PLC siga conectado.
Los valores y el contexto se guardan solo en memoria.

El puente local se prepara por separado en original-runtime/bridge-render.json.
El PC y los contenedores locales deben seguir encendidos para enviar datos.
