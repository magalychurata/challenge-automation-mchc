# QA API Automation

Proyecto de automatización de pruebas API desarrollado con Playwright y TypeScript.

## 1. Tecnologías

- Node.js
- TypeScript
- Playwright Test
- XLSX
- Dotenv

## 2. Requisitos previos

Instalar:

- Node.js LTS
- npm
- Git

Verificar instalación:

```bash
node --version
npm --version
git --version
```

## 3. Instalación del proyecto

Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
```

Ingresar al proyecto:

```bash
cd qa-api-automation
```

Instalar dependencias:

```bash
npm install
```

Instalar Playwright:

```bash
npx playwright install
```

## 4. Configuración de ambientes

Crear un archivo `.env` en la raíz del proyecto.

Configurar:

```dotenv
TEST_ENV=QA
SECRET_QA=CLAVE_QA
SECRET_CERT=CLAVE_CERT
```

No compartir el archivo `.env`.

Los secretos se administran mediante variables de ambiente.

## 5. Datos de prueba

Colocar el archivo original:

`Datos-pruebas.xlsx`

Dentro de:

`data/`

El proyecto lee directamente el archivo XLSX durante la ejecución.

## 6. Ejecutar las pruebas

Ejecutar todos los tests en QA:

```bash
npm run test:qa
```

Ejecutar todos los tests en CERT:

```bash
npm run test:cert
```

Ejecutar pruebas Pokémon:

```bash
npm run test:pokemon
```

Ejecutar pruebas POST:

```bash
npm run test:posts
```

## 7. Reporte HTML

Generar el reporte ejecutando los tests.

Abrir el reporte:

```bash
npm run report
```

## 8. Evidencias

Playwright genera información de ejecución en:

- playwright-report/
- test-results/

Se almacenan reportes HTML, trazas de fallos y attachments de respuestas API.

## 9. Características implementadas

- Múltiples ambientes QA y CERT.
- Gestión de secretos mediante variables de entorno.
- Hash SHA-256.
- Fixtures personalizados automáticos.
- Lectura directa de Excel.
- Tests API GET Pokémon.
- Tests API POST JSONPlaceholder.
- Assertions.
- Medición de tiempos de respuesta.
- Registro de fecha y hora.
- Reportes HTML.
- Evidencias para debugging.

## 10 Ejecutar proyecto

- Automatizacion API
Paso 1: Ubicarse en la carpeta raiz challenge-automation-mchc

Paso 2: Ejecutar la automatizacion con el siguiente comando

npx playwright test tests/pokemon.spec.ts

Paso 3: Para ver el report ejecutar el comando
npm run report

- Automatizacion WEB

Paso 1: Ubicarse en la carpeta raiz

Paso 2: Ejecutar la automatizacion con el siguiente comando:

npx playwright test tests/pokemon-web.spec.ts
