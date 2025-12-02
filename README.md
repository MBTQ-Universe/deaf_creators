# Deaf Creator Platform (Multi-Tenants)

A comprehensive platform for deaf content creators featuring video processing, creator payments, community features, and WCAG-compliant accessibility.

[![CI/CD Pipeline](https://github.com/MBTQ-Universe/deaf_creators/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/MBTQ-Universe/deaf_creators/actions/workflows/ci-cd.yml)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/pinksync/v0-deaf-creators)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/hYqkr5q5UaL)

## Overview

DeafCreator is a platform designed specifically for deaf content creators, providing tools for video management, earnings tracking, community building, and seamless integration with ASL (American Sign Language) content.

### Key Features

- **Video Processing Engine**: Multi-channel video processing with FFMPEG, AI-powered tagging, and multiple output formats
- **Creator Payments**: Transparent royalty calculations, Stripe/PayPal integration, and detailed earnings breakdown
- **Request Matching**: Match content requests with available videos or assign creators to tasks
- **AI Vision Models**: Content moderation, scene recognition, and quality control
- **Accessibility First**: WCAG-compliant design with ASL support

## Repository Structure

### Core Components

| Component | Description |
|-----------|-------------|
| `/app` | Next.js 15 application routes and API endpoints |
| `/components` | Reusable React components |
| `/lib` | Utility functions and service integrations |
| `/types` | TypeScript type definitions |
| `/.github/workflows` | GitHub Actions CI/CD pipelines |

### API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/health` | Health check for container orchestration |
| `/api/videos` | Video CRUD operations |
| `/api/mux/upload` | Direct video upload via Mux |
| `/api/mux/webhook` | Mux webhook handler |
| `/api/payments` | Creator earnings and payout management |
| `/api/video-processing` | Video processing job management |
| `/api/request-matching` | Content/creator matching system |
| `/api/auth` | Authentication endpoints |

## Deployment

### Platform Agnostic Deployment

This project supports multiple deployment options:

#### Docker Deployment

```bash
# Build the Docker image
docker build -t deaf-creator-platform .

# Run with docker-compose
docker-compose up -d
```

#### Vercel Deployment

The project is automatically deployed to Vercel on push to main:
- **Production**: [https://vercel.com/pinksync/v0-deaf-creators](https://vercel.com/pinksync/v0-deaf-creators)

#### Kubernetes Deployment

```bash
# Apply Kubernetes manifests (create your own based on docker-compose.yml)
kubectl apply -f k8s/
```

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Backend API
FLASK_API_URL=http://localhost:5000
API_SECRET_KEY=your-secret-key

# Video Processing (Mux)
MUX_TOKEN_ID=your-mux-token-id
MUX_TOKEN_SECRET=your-mux-token-secret
MUX_WEBHOOK_SECRET=your-mux-webhook-secret

# Payments (Stripe/PayPal)
STRIPE_SECRET_KEY=your-stripe-secret-key
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/deaf_creator_db
POSTGRES_USER=deaf_creator
POSTGRES_PASSWORD=changeme
POSTGRES_DB=deaf_creator_db
```

## Development

### Prerequisites

- Node.js >= 18.0.0
- npm or pnpm
- Docker (optional, for containerized development)

### Getting Started

```bash
# Install dependencies
npm install --legacy-peer-deps

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Project Structure

```
deaf_creators/
├── app/                    # Next.js 15 App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication
│   │   ├── health/        # Health checks
│   │   ├── mux/           # Video upload/webhooks
│   │   ├── payments/      # Payment processing
│   │   ├── request-matching/  # Content matching
│   │   ├── video-processing/  # Video jobs
│   │   └── videos/        # Video CRUD
│   ├── creators/          # Creator profiles
│   ├── subscription/      # Subscription management
│   └── ...               # Other pages
├── components/            # React components
├── lib/                   # Utilities and services
├── types/                 # TypeScript types
├── .github/
│   └── workflows/         # GitHub Actions
│       ├── ci-cd.yml     # Main CI/CD pipeline
│       ├── creator-payments.yml  # Payment automation
│       └── video-processing.yml  # Video processing
├── docker-compose.yml     # Container orchestration
├── Dockerfile            # Container build
└── package.json
```

## GitHub Actions Workflows

### CI/CD Pipeline (`ci-cd.yml`)

- Lint and type check
- Build application
- Build and push Docker images
- Security scanning
- Deploy to staging/production

### Video Processing (`video-processing.yml`)

- Manual trigger for video processing jobs
- Supports transcode, thumbnail, analyze operations
- Generates accessibility captions

### Creator Payments (`creator-payments.yml`)

- Monthly automated royalty payments (1st of each month)
- Manual trigger for specific payment types
- Generates audit reports and notifications

## Security Practices

- **Private Repositories**: Sensitive projects are private
- **Branch Protection**: Code reviews required for merges
- **Secrets Management**: GitHub Actions secrets for API keys
- **Signed Commits**: Required for all contributors
- **Security Scanning**: Trivy and npm audit in CI pipeline

## Accessibility & Inclusivity

- **WCAG Compliant**: Follows Web Content Accessibility Guidelines
- **ASL Support**: Built-in support for American Sign Language content
- **High Contrast**: Dark mode and accessible color schemes
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: ARIA labels and semantic HTML

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary to MBTQ Universe.

## Support

For support, please contact the development team or open an issue in this repository.
