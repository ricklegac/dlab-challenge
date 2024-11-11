### VIDEO PRESENTACION
[Link Drive](https://drive.google.com/drive/folders/19SxSaZsS9mxz7SeIjnnV_LdrNeV-vXm6?usp=sharing)
## Tecnologías Utilizadas

- [React.js](https://react.dev/learn): Una biblioteca de JavaScript para construir interfaces de usuario.
- [Font Awesome](https://fontawesome.com/docs): Biblioteca de iconos escalables utilizada para mejorar la interfaz visual.
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API): Interfaz de JavaScript para realizar peticiones HTTP a servidores de manera asíncrona.

## Funcionalidades Principales
Visualización de listas de empleados y recibos.
Filtrado y ordenamiento de datos.
Visualización y descarga de archivos PDF de recibos.
Sistema de autenticación mediante token.

## Configuración del Proyecto
### Instalación

Clona este repositorio usando el siguiente comando:

```bash
https://github.com/ricklegac/dlab-challenge.git

```
### Instalación de dependencias

Instala las dependencias del proyecto ejecutando el siguiente comando:

```bash
npm install

```
### Ejecuta el proyecto

```bash
npm start

```
# API Utilizada

Este proyecto se conecta a una API externa para obtener datos de empleados y recibos. Las peticiones se realizan a través de la base URL:

```arduino
https://api.schneck.dlab.software/api/
```
## Endpoints Utilizados
A continuación, se detallan los endpoints utilizados en este proyecto, junto con ejemplos de sus peticiones.

### 1. Autenticación
Endpoint: `/users/demo_login/`
Método: `POST`
Descripción: Permite iniciar sesión en la aplicación y obtener un token de autenticación.
Ejemplo de Uso:
```bash
#POST https://api.schneck.dlab.software/api/users/demo_login/
{
    "username": "tu_usuario",
    "password": "tu_contraseña"
}

```
### 2. Listado de Empleados
Endpoint: `/users/`
Método: `GET`
Descripción: Devuelve una lista de empleados con información detallada.
Ejemplo de Petición:
```bash
# GET https://api.schneck.dlab.software/api/users/
Authorization: Token {token}
```
### 3. Listado de Recibos
Endpoint: `/receipts/`
Método: `GET`
Descripción: Devuelve una lista de recibos para los empleados, que puede ser filtrada y ordenada.
Parámetros de Consulta:

`year`: Año del recibo.
`month`: Mes del recibo (valor numérico de 1 a 12).
`type`: Tipo de recibo.
`isSended`: Estado de envío (true o false).
`isReaded`: Estado de lectura (true o false).
Ejemplo de Petición:
```bash
# GET https://api.schneck.dlab.software/api/receipts/?year=2024
Authorization: Token {token}
```
### 4. Ver Archivo PDF de un Recibo
Endpoint: `/receipts/{id}/file`
Método: `GET`
Descripción: Devuelve un enlace al archivo PDF de un recibo específico.
Ejemplo de Petición:
```bash
# GET https://api.schneck.dlab.software/api/receipts/1978/file
Authorization: Token {token}
```

# Ejecución y Uso
1. Clona y configura el proyecto según las instrucciones anteriores.
2. Inicia sesión para obtener un token de acceso.
3. Navega entre las secciones de empleados y recibos, aplicando filtros y ordenamientos según sea necesario.
4. Al hacer clic en una fila de recibo, se abrirá un modal para ver el archivo PDF del recibo, con opciones para descargar y abrir en una nueva ventana.



