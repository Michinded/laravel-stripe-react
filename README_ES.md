# 🚀 Kit de Inicio Laravel + React + Stripe

> Un kit de inicio moderno y completo que incluye Laravel 12, React 19, Inertia.js e integración con Stripe. Perfecto para construir aplicaciones SaaS, servicios de suscripción o cualquier proyecto que requiera pagos.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Laravel](https://img.shields.io/badge/Laravel-12.x-red.svg)](https://laravel.com)
[![React](https://img.shields.io/badge/React-19.x-blue.svg)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://typescriptjs.org)

## 📋 Tabla de Contenidos
- [Importante](#-importante)
- [Características](#-características)
- [Stack Tecnológico](#-stack-tecnológico)
- [Requisitos Previos](#-requisitos-previos)
- [Inicio Rápido](#-inicio-rápido)
- [Configuración](#-configuración)
- [Configuración de Stripe](#-configuración-de-stripe)
- [Desarrollo](#-desarrollo)
- [Despliegue](#-despliegue)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

## ⚠️ Importante
Este proyecto es un **kit de inicio** y no está destinado para uso en producción sin mayor personalización. Proporciona una base sólida para construir aplicaciones web modernas con Laravel y React, pero debes revisar y mejorar la seguridad, rendimiento y funcionalidad antes de desplegar a producción.

### 🤖 Nota sobre Desarrollo Asistido por IA

Este proyecto fue desarrollado parcialmente con la asistencia de Claude Sonnet 4 IA. Si bien esto mejora la eficiencia del desarrollo, los desarrolladores deben:

- Revisar minuciosamente todo el código generado
- Probar toda la funcionalidad extensivamente
- Actualizar las dependencias según sea necesario
- Verificar las implementaciones de seguridad
- Personalizar las características para casos de uso específicos

### ⭐ Apoya Este Proyecto

Si encuentras útil este kit de inicio:

- Dale estrella al repositorio
- Compártelo con tu red
- Envía mejoras a través de PRs
- ¡Déjanos saber cómo lo estás usando!

## ✨ Características

- 🎨 **UI/UX Moderno** - Construido con Tailwind CSS y componentes Radix UI
- 🔐 **Autenticación** - Sistema de autenticación completo con verificación de email
- 💳 **Integración con Stripe** - Laravel Cashier para suscripciones y pagos
- 🌐 **Inertia.js** - Experiencia SPA sin complejidad de API
- 📱 **Diseño Responsivo** - Enfoque mobile-first
- 🌙 **Modo Oscuro** - Cambio de tema integrado
- 🧪 **Testing** - Framework de testing Pest incluido
- ⚡ **Seguridad de Tipos** - Soporte completo de TypeScript
- 🔄 **Hot Reload** - Vite para retroalimentación instantánea en desarrollo

## 🛠 Stack Tecnológico

### Backend
- **Laravel 12** - Framework PHP
- **Laravel Cashier** - Integración con Stripe
- **Inertia.js** - Renderizado del lado del servidor
- **SQLite** - Base de datos por defecto (fácilmente cambiable)

### Frontend  
- **React 19** - Librería de UI
- **TypeScript** - Seguridad de tipos
- **Tailwind CSS** - CSS utility-first
- **Radix UI** - Componentes accesibles
- **Vite** - Herramienta de construcción

### Herramientas y Testing
- **Pest** - Framework de testing
- **Laravel Pint** - Formateo de código
- **ESLint** - Linting de JavaScript/TypeScript
- **Prettier** - Formateo de código

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener:

- **PHP 8.2+** con extensiones: sqlite3, openssl, mbstring, tokenizer, xml
- **Node.js 18+** y npm
- **Composer** - Gestor de dependencias PHP
- **Cuenta de Stripe** - Para procesamiento de pagos

## 🚀 Inicio Rápido

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Michinded/laravel-stripe-react.git
cd laravel-stripe-react
```

### 2. Instalar Dependencias

```bash
# Instalar dependencias PHP
composer install

# Instalar dependencias Node.js
npm install
```

### 3. Configuración del Entorno

```bash
# Copiar archivo de entorno
cp .env.example .env

# Generar clave de aplicación
php artisan key:generate

# Crear base de datos SQLite o configurar tu base de datos
touch database/database.sqlite

# Ejecutar migraciones
php artisan migrate
```

### 4. Configurar Entorno

Edita tu archivo `.env` con las siguientes configuraciones:

```env
# Configuración Básica de la App
APP_NAME="Nombre de tu App"
APP_URL=http://localhost:8000

# Localización (opcional)
APP_LOCALE=es
APP_FALLBACK_LOCALE=en

# Base de datos (SQLite es por defecto, cambiar si es necesario)
DB_CONNECTION=sqlite

# Configuración de Stripe (requerida)
STRIPE_KEY=pk_test_tu_clave_publica_stripe
STRIPE_SECRET=sk_test_tu_clave_secreta_stripe
STRIPE_WEBHOOK_SECRET=whsec_tu_secreto_webhook
```

### 5. Iniciar Desarrollo

```bash
# Iniciar todos los servicios de desarrollo (Laravel, Vite, Queue, Logs)
composer dev

# O iniciar individualmente:
# php artisan serve          # Servidor Laravel
# npm run dev                # Servidor de desarrollo Vite
# php artisan queue:work     # Trabajos en segundo plano
```

¡Visita [http://localhost:8000](http://localhost:8000) para ver tu aplicación!

## ⚙️ Configuración

### Configuración de Idioma

La app soporta internacionalización. Actualiza estas variables en `.env`:

```env
APP_LOCALE=es           # Español
APP_FALLBACK_LOCALE=en  # Inglés de respaldo
APP_FAKER_LOCALE=es_ES  # Datos falsos en español
```

### Configuración de Base de Datos

Por defecto, el proyecto usa SQLite. Para usar MySQL/PostgreSQL:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=tu_base_datos
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
```

## 💳 Configuración de Stripe

### 1. Obtener Claves de Stripe

1. Crear una [cuenta de Stripe](https://stripe.com)
2. Ir a **Developers → API Keys**
3. Copiar tu **Clave Pública** y **Clave Secreta**

### 2. Configurar Webhooks

1. Ir a **Developers → Webhooks** en Stripe
2. Agregar endpoint: `https://tudominio.com/stripe/webhook`
3. Seleccionar eventos:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Copiar el **Secreto del Webhook**

### 3. Actualizar Entorno

```env
STRIPE_KEY=pk_test_xxxxxxxxxxxxx
STRIPE_SECRET=sk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

### 4. Crear Productos en Stripe

Crea tus planes de suscripción en el Dashboard de Stripe o vía API.

## 🔧 Desarrollo

### Scripts Disponibles

#### Scripts de Composer
```bash
composer dev        # Iniciar todos los servicios de desarrollo
```

#### Scripts de NPM
```bash
npm run dev         # Iniciar servidor de desarrollo Vite
npm run build       # Construir para producción
npm run build:ssr   # Construir con soporte SSR
npm run lint        # Ejecutar ESLint
npm run format      # Formatear código con Prettier
npm run types       # Verificar tipos TypeScript
```

### Calidad de Código

```bash
# Formateo de código PHP
./vendor/bin/pint

# Linting de JavaScript/TypeScript
npm run lint

# Verificación de tipos
npm run types
```

## 🚀 Despliegue

### Construcción para Producción

```bash
# Instalar dependencias
composer install --optimize-autoloader --no-dev
npm ci

# Construir assets
npm run build

# Optimizar Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Variables de Entorno

Asegúrate de que estas estén configuradas en producción:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://tudominio.com

# Usar claves de Stripe de producción
STRIPE_KEY=pk_live_xxxxxxxxxxxxx
STRIPE_SECRET=sk_live_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

## 📁 Estructura del Proyecto

```
├── app/
│   ├── Http/Controllers/       # Controladores Laravel
│   ├── Models/                 # Modelos Eloquent
│   └── Providers/              # Proveedores de servicios
├── database/
│   ├── migrations/             # Migraciones de base de datos
│   └── seeders/               # Seeders de base de datos
├── resources/
│   ├── js/
│   │   ├── components/        # Componentes React
│   │   ├── pages/            # Páginas Inertia.js
│   │   ├── layouts/          # Layouts de página
│   │   └── types/            # Definiciones TypeScript
│   └── css/                  # Hojas de estilo
├── routes/
│   ├── web.php              # Rutas web
│   ├── auth.php             # Rutas de autenticación
│   └── settings.php         # Rutas de configuración
└── tests/                   # Tests Pest
```

## 🤝 Contribuir

1. Hacer fork del repositorio
2. Crear tu rama de característica (`git checkout -b feature/caracteristica-increible`)
3. Confirmar tus cambios (`git commit -m 'Agregar característica increíble'`)
4. Subir a la rama (`git push origin feature/caracteristica-increible`)
5. Abrir un Pull Request

### Pautas de Desarrollo

- Seguir el estilo de código y convenciones existentes
- Agregar tests para nuevas características
- Actualizar documentación según sea necesario
- Usar mensajes de commit significativos

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Reconocimientos

- [Laravel](https://laravel.com) - El framework PHP
- [React](https://reactjs.org) - La librería JavaScript
- [Inertia.js](https://inertiajs.com) - El monolito moderno
- [Stripe](https://stripe.com) - Procesamiento de pagos
- [Tailwind CSS](https://tailwindcss.com) - CSS utility-first
- [Radix UI](https://radix-ui.com) - Componentes accesibles

---

**Creado con ❤️ por [Michinded](https://github.com/michinded)**

*¡Este kit de inicio es perfecto para construir aplicaciones SaaS modernas con Laravel y React. Siéntete libre de personalizarlo para tus necesidades!*