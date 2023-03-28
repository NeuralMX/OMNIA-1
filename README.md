# OMNIA-1

OMNIA-1 es un proyecto de código abierto que proporciona una API para gestionar un sistema de computación distribuida. Este sistema permite a los usuarios aprovechar el poder de múltiples nodos en la red para ejecutar tareas de manera eficiente y segura. La API está escrita en TypeScript utilizando ExpressJS y Prisma para la gestión de bases de datos.

## Características principales

- **Gestión de nodos de la red**: La API permite registrar, actualizar y eliminar nodos en la red.
- **Gestión de tareas**: Los usuarios pueden enviar tareas a la red para ser ejecutadas por los nodos disponibles.
- **Autenticación y validación de nodos**: La API utiliza sistemas de autenticación y validación para garantizar que solo los nodos autorizados participen en la red.
- **Seguridad**: La API utiliza encriptación y técnicas de seguridad avanzadas para proteger la integridad y la privacidad de los datos.

## Arquitectura del proyecto

La arquitectura del proyecto OMNIA-1 se basa en una estructura modular y escalable que facilita la implementación y el mantenimiento del sistema. A continuación se presenta una descripción detallada de la arquitectura:

### Componentes principales

- **API REST**: La API REST se construye utilizando ExpressJS, un popular framework para Node.js que facilita el desarrollo de aplicaciones web y API.
- **Base de datos**: Prisma es utilizado como ORM (Object Relational Mapper) para gestionar la base de datos. Prisma facilita las operaciones de base de datos y se integra fácilmente con TypeScript.
- **Autenticación y autorización**: JSON Web Tokens (JWT) se utilizan para autenticar y autorizar nodos y usuarios en el sistema.
- **Middleware de seguridad**: Se implementan middleware de seguridad como CORS, Helmet y rate limiting para proteger la API de ataques comunes.
- **Gestión de errores**: La API utiliza un enfoque centralizado para manejar errores y proporcionar respuestas coherentes a los usuarios.

### Estructura del proyecto
*   src/
    *   config/
        *   prisma.ts
        *   security.ts
    *   controllers/
        *   nodeController.ts
        *   taskController.ts
    *   middleware/
        *   errorHandler.ts
        *   auth.ts
    *   models/
        *   node.ts
        *   task.ts
    *   routes/
        *   nodeRoutes.ts
        *   taskRoutes.ts
    *   types/
        *   custom.d.ts
    *   utils/
        *   authUtils.ts
    *   app.ts
    *   server.ts
*   prisma/
    *   schema.prisma
*   .env
*   package.json
*   tsconfig.json
*   README.md

### Flujo de trabajo

1. Los usuarios y nodos se autentican utilizando JWT y la API proporciona tokens de acceso.
2. Los usuarios y nodos envían solicitudes a la API utilizando los tokens de acceso proporcionados.
3. La API procesa las solicitudes, interactúa con la base de datos a través de Prisma y devuelve las respuestas adecuadas.
4. Se utilizan middleware de seguridad y gestión de errores para proteger la API y proporcionar una experiencia de usuario consistente.

## Patrones de diseño

OMNIA-1 utiliza patrones de diseño comunes para estructurar y organizar el código. Estos patrones incluyen:

- **Modelo-Vista-Controlador (MVC)**: El proyecto sigue el patrón MVC para separar las preocupaciones de la lógica de la aplicación, facilitando la mantenibilidad y escalabilidad del sistema.
- **Inyección de dependencias**: Se utiliza la inyección de dependencias para mejorar la modularidad y la capacidad de prueba del proyecto.
- **Singleton**: El patrón Singleton se aplica en ciertos componentes, como la configuración de la base de datos, para garantizar que solo exista una única instancia en toda la aplicación.

## Requisitos previos

Antes de comenzar a utilizar OMNIA-1, asegúrese de tener instalado lo siguiente:

- Node.js (versión 14.0 o superior)
- npm (versión 6.0 o superior)
- Prisma CLI (versión 3.0 o superior)

## Instalación

Para instalar y configurar el proyecto OMNIA-1, siga estos pasos:

1. Clone el repositorio en su máquina local:

git clone https://github.com/user/omnia-1.git

2. Instale las dependencias del proyecto:
cd OMNIA-1
npm install

3. Configure las variables de entorno en el archivo `.env`. Asegúrese de proporcionar los valores adecuados para la base de datos y las claves JWT.

4. Ejecute las migraciones de Prisma para configurar la base de datos:
npx prisma migrate dev

5. Inicie el servidor de desarrollo:
npm run dev

El servidor de desarrollo se iniciará en el puerto especificado en el archivo `.env`. Ahora puede comenzar a utilizar la API de OMNIA-1.

# Documentación de la API
- [Nodes](./docs/api/nodes.md)
- [Tasks](./docs/api/tasks.md)

## Contribuir

Agradecemos sus contribuciones al proyecto OMNIA-1. Por favor, consulte nuestra [guía de contribución](./CONTRIBUTING.md) para obtener información sobre cómo contribuir al proyecto.

## Licencia

OMNIA-1 está licenciado bajo la [Licencia MIT](./LICENSE).
