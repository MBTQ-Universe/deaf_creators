# Deployment Guide for GitHub Pages

This guide explains how to deploy the Deaf Creators Platform to GitHub Pages.

## GitHub Pages Configuration

The application is configured for static export using Next.js:

1. **next.config.mjs** - Configured with `output: 'export'` and `basePath`
2. **.github/workflows/deploy.yml** - Automated deployment workflow
3. **public/.nojekyll** - Prevents Jekyll processing

## Deployment Steps

### Automatic Deployment

Push to the `main` branch to trigger automatic deployment:

```bash
git push origin main
```

The GitHub Actions workflow will:
1. Checkout code
2. Install dependencies
3. Build static files
4. Deploy to GitHub Pages

### Manual Deployment

To build locally for testing:

```bash
npm run build
```

The static files will be in the `out` directory.

### Viewing the Deployed Site

After deployment, visit:
https://mbtq-universe.github.io/deaf_creators/

## Environment Variables

Set these in GitHub repository settings (Settings → Secrets and variables → Actions):

- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_WS_URL` - WebSocket server URL
- `NEXT_PUBLIC_MUX_ENV_KEY` - Mux environment key (if needed)

## Troubleshooting

### Build Failures

Check GitHub Actions logs:
1. Go to repository → Actions tab
2. Click on failed workflow
3. Review build logs

### 404 Errors

Ensure `basePath` in next.config.mjs matches repository name:
```javascript
basePath: '/deaf_creators'
```

### Asset Loading Issues

All paths should be relative or use the basePath:
```javascript
// Correct
<img src="/deaf_creators/image.png" />

// Or using Next.js Link
import Link from 'next/link'
<Link href="/about">About</Link>
```

## Local Development

Run locally with:

```bash
npm run dev
```

Access at http://localhost:3000

## Production Build Test

Test production build locally:

```bash
npm run build
npx serve out
```

Access at http://localhost:3000
