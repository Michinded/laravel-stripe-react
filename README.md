# 🚀 Laravel + React + Stripe Starter Kit

> A modern, full-stack starter kit featuring Laravel 12, React 19, Inertia.js, and Stripe integration. Perfect for building SaaS applications, subscription services, or any project requiring payments.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Laravel](https://img.shields.io/badge/Laravel-12.x-red.svg)](https://laravel.com)
[![React](https://img.shields.io/badge/React-19.x-blue.svg)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://typescriptjs.org)

## 📋 Table of Contents
- [Important](#-important)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Configuration](#-configuration)
- [Stripe Setup](#-stripe-setup)
- [Development](#-development)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

## ⚠️ Important
This project is a **starter kit** and is not intended for production use without further customization. It provides a solid foundation for building modern web applications with Laravel and React, but you should review and enhance security, performance, and functionality before deploying to production.
### 🤖 AI-Assisted Development Note

This project was partially developed with the assistance of Claude Sonnet 4 AI. While this enhances development efficiency, developers should:

- Thoroughly review all generated code
- Test all functionality extensively
- Update dependencies as needed
- Verify security implementations
- Customize features for specific use cases

### ⭐ Support This Project

If you find this starter kit useful:

- Star the repository
- Share with your network
- Submit improvements via PRs
- Let us know how you're using it!


## ✨ Features

- 🎨 **Modern UI/UX** - Built with Tailwind CSS and Radix UI components
- 🔐 **Authentication** - Complete auth system with email verification
- 💳 **Stripe Integration** - Laravel Cashier for subscriptions and payments
- 🌐 **Inertia.js** - SPA experience without API complexity
- 📱 **Responsive Design** - Mobile-first approach
- 🌙 **Dark Mode** - Built-in theme switching
- 🧪 **Testing** - Pest testing framework included
- ⚡ **Type Safety** - Full TypeScript support
- 🔄 **Hot Reload** - Vite for instant development feedback

## 🛠 Tech Stack

### Backend
- **Laravel 12** - PHP framework
- **Laravel Cashier** - Stripe integration
- **Inertia.js** - Server-side rendering
- **SQLite** - Default database (easily changeable)

### Frontend  
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Radix UI** - Accessible components
- **Vite** - Build tool

### Tools & Testing
- **Pest** - Testing framework
- **Laravel Pint** - Code formatting
- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting

## 📋 Prerequisites

Before you begin, ensure you have:

- **PHP 8.2+** with extensions: sqlite3, openssl, mbstring, tokenizer, xml
- **Node.js 18+** and npm
- **Composer** - PHP dependency manager
- **Stripe Account** - For payment processing

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Michinded/laravel-stripe-react.git
cd laravel-stripe-react
```

### 2. Install Dependencies

```bash
# Install PHP dependencies
composer install

# Install Node.js dependencies
npm install
```

### 3. Environment Setup

```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Create SQLite database or configure your database
touch database/database.sqlite

# Run migrations
php artisan migrate
```

### 4. Configure Environment

Edit your `.env` file with the following configurations:

```env
# Basic App Configuration
APP_NAME="Your App Name"
APP_URL=http://localhost:8000

# Localization (optional)
APP_LOCALE=en
APP_FALLBACK_LOCALE=en

# Database (SQLite is default, change if needed)
DB_CONNECTION=sqlite

# Stripe Configuration (required)
STRIPE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### 5. Start Development

```bash
# Start all development services (Laravel, Vite, Queue, Logs)
composer dev

# Or start individually:
# php artisan serve          # Laravel server
# npm run dev                # Vite development server
# php artisan queue:work     # Background jobs
```

Visit [http://localhost:8000](http://localhost:8000) to see your application!

## ⚙️ Configuration

### Language Configuration

The app supports internationalization. Update these variables in `.env`:

```env
APP_LOCALE=es           # Spanish
APP_FALLBACK_LOCALE=en  # English fallback
APP_FAKER_LOCALE=es_ES  # Spanish fake data
```

### Database Configuration

By default, the project uses SQLite. To use MySQL/PostgreSQL:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

## 💳 Stripe Setup

### 1. Get Stripe Keys

1. Create a [Stripe account](https://stripe.com)
2. Go to **Developers → API Keys**
3. Copy your **Publishable key** and **Secret key**

### 2. Configure Webhooks

1. Go to **Developers → Webhooks** in Stripe
2. Add endpoint: `https://yourdomain.com/stripe/webhook`
3. Select events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Copy the **Webhook Secret**

### 3. Update Environment

```env
STRIPE_KEY=pk_test_xxxxxxxxxxxxx
STRIPE_SECRET=sk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

### 4. Create Products in Stripe

Create your subscription plans in the Stripe Dashboard or via API.

## 🔧 Development

### Available Scripts

#### Composer Scripts
```bash
composer dev        # Start all development services
```

#### NPM Scripts
```bash
npm run dev         # Start Vite development server
npm run build       # Build for production
npm run build:ssr   # Build with SSR support
npm run lint        # Run ESLint
npm run format      # Format code with Prettier
npm run types       # Check TypeScript types
```

### Code Quality

```bash
# PHP code formatting
./vendor/bin/pint

# JavaScript/TypeScript linting
npm run lint

# Type checking
npm run types
```

## 🚀 Deployment

### Production Build

```bash
# Install dependencies
composer install --optimize-autoloader --no-dev
npm ci

# Build assets
npm run build

# Optimize Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Environment Variables

Ensure these are set in production:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

# Use production Stripe keys
STRIPE_KEY=pk_live_xxxxxxxxxxxxx
STRIPE_SECRET=sk_live_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

## 📁 Project Structure

```
├── app/
│   ├── Http/Controllers/       # Laravel controllers
│   ├── Models/                 # Eloquent models
│   └── Providers/              # Service providers
├── database/
│   ├── migrations/             # Database migrations
│   └── seeders/               # Database seeders
├── resources/
│   ├── js/
│   │   ├── components/        # React components
│   │   ├── pages/            # Inertia.js pages
│   │   ├── layouts/          # Page layouts
│   │   └── types/            # TypeScript definitions
│   └── css/                  # Stylesheets
├── routes/
│   ├── web.php              # Web routes
│   ├── auth.php             # Authentication routes
│   └── settings.php         # Settings routes
└── tests/                   # Pest tests
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Use meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Laravel](https://laravel.com) - The PHP framework
- [React](https://reactjs.org) - The JavaScript library
- [Inertia.js](https://inertiajs.com) - The modern monolith
- [Stripe](https://stripe.com) - Payment processing
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [Radix UI](https://radix-ui.com) - Accessible components

---

**Created with ❤️ by [Michinded](https://github.com/michinded)**

*This starter kit is perfect for building modern SaaS applications with Laravel and React. Feel free to customize it for your needs!*