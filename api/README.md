# OMNIA-1 API
REST API escrita en TypeScript usando Prisma como ORM

## Instalación
- Clona el proyecto
- Instala la dependencias con > npm install
- Copia el contenido el archivo **.env.example** y pégalo en un nuevo archivo llamado **.env** situado en la carpeta raíz de la API
TODO: Agregar las instrucciones faltantes para levantar el proyecto

## Como interactuar con el proyecto
- Una vez que tengas el proyecto y la base de datos lista necesitas crear un Token maestro con el role "admin" en la base de datos, puedes ayudarte de Prisma Studio ejecutando > npx prisma studio
- También puedes utilizar el comando > npm run prism:seed para generar datos de prueba en la base de datos
- Ahora que tienes tu token, recuerda que el atributo **hash** del modelo Token lo usamos para autenticar todas las peticiones, la API autoriza las peticiones en base al rol que tiene asignado el token y por medio de un JWT que puedes obtener haciendo una petición POST a la url /api/auth/login
- Una vez que tengas el JWT, puedes mandarlo en el header **Authorization: Bearer AQUI_TU_JWT**