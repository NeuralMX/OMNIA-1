# OMNIA-1 Worker Client

En éste repo puedes encontrar el código que utilizan los nodos para conectarse a la red de OMNIA-1.
El cliente se puede encargar de autenticarse, enviar información del nodo, escuchar por tareas, ejecutarlas y reportar estados de dichas tareas.

Por el momento el worker-client consta de una aplicación para la terminal (CLI) escrita en Python con la que puedes interactuar con el sistema a través de gRPC y peticiones HTTP a una API REST

#### Requerimientos

- Python 3.10 o superior

#### Como levantar el proyecto

- Instala las dependencias con

```bash
pip install -r requirements.txt
```

- Ejecuta el proyecto con

```bash
python main.py
```
