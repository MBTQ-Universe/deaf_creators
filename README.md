# Deaf Creator Platform (Multi-Tenants)

A modern client-server SPA platform for deaf creators to share videos, collaborate, and utilize AI-powered tools.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/pinksync/v0-deaf-creators)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/hYqkr5q5UaL)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue?style=for-the-badge&logo=github)](https://mbtq-universe.github.io/deaf_creators/)

## Overview

This platform provides a comprehensive solution for deaf creators to:
- Upload and manage video content with drag-and-drop functionality
- Stream videos with HTML5 and Video.js player
- Receive real-time updates via WebSocket connections
- Request AI model processing (transcription, sign language recognition, etc.)
- Discover and interact with content from other creators

## Features

### Client Side (SPA)
- ✅ Static HTML/JS/CSS/TypeScript-based SPA for GitHub Pages
- ✅ Video playback with Video.js (HTML5 video library)
- ✅ Dynamic video fetching from backend APIs
- ✅ Client-side routing with Next.js App Router
- ✅ Enhanced drag-and-drop video upload with validation
- ✅ AI model processing request interface

### Server Side Integration
- ✅ RESTful API for video management and metadata
- ✅ WebSocket integration for real-time updates
- ✅ Creator task assignment and AI model selection
- ✅ Video content serving via Mux CDN

### Networking
- ✅ WebSocket real-time communication (Socket.IO)
- ✅ RESTful services for metadata fetching
- ✅ HTTP/2 support for API endpoints

## Architecture

```
┌─────────────────┐     WebSocket      ┌──────────────────┐
│   Client SPA    │◄──────────────────►│  WebSocket Server│
│  (GitHub Pages) │                    │   (Socket.IO)    │
└────────┬────────┘                    └──────────────────┘
         │                                      │
         │ REST API                             │
         ▼                                      ▼
┌─────────────────┐                    ┌──────────────────┐
│   API Server    │◄───────────────────│   Database       │
│  (HTTP/2)       │                    │ (PostgreSQL)     │
└────────┬────────┘                    └──────────────────┘
         │
         ▼
┌─────────────────┐
│  Video Storage  │
│   (Mux CDN)     │
└─────────────────┘
```

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Access at http://localhost:3000

### Build for Production

```bash
npm run build
```

Static files will be generated in the `out` directory.

### Deploy to GitHub Pages

Push to the `main` branch to trigger automatic deployment:

```bash
git push origin main
```

## Documentation

- [Backend Server Infrastructure](docs/BACKEND_SERVER.md) - API endpoints, WebSocket protocol, and deployment guide
- [Deployment Guide](docs/DEPLOYMENT.md) - GitHub Pages setup and configuration

## Technology Stack

### Frontend
- **Framework:** Next.js 15 with App Router
- **UI Library:** React 19
- **Styling:** Tailwind CSS
- **Video Player:** Video.js
- **Real-time:** Socket.IO Client
- **State Management:** React Hooks

### Backend (Required - See Documentation)
- **API Server:** Node.js/Express or Python/FastAPI
- **WebSocket:** Socket.IO
- **Database:** PostgreSQL or MongoDB
- **Caching:** Redis
- **Video Processing:** Mux

## Project Structure

```
deaf_creators/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── videos/            # Video pages
│   └── upload/            # Upload page
├── components/            # React components
│   ├── video-player.tsx   # Video.js player
│   ├── enhanced-video-library.tsx
│   ├── enhanced-video-uploader.tsx
│   └── ui/                # UI components
├── lib/                   # Utility libraries
│   ├── api.ts            # API service layer
│   ├── websocket.ts      # WebSocket service
│   └── mux.ts            # Mux integration
├── docs/                  # Documentation
├── public/               # Static assets
└── .github/workflows/    # CI/CD workflows
```

## Key Components

### Video Player (`components/video-player.tsx`)
- HTML5 video with Video.js
- HLS streaming support
- Responsive and accessible
- Custom event handlers

### API Service (`lib/api.ts`)
- Centralized API client
- Video CRUD operations
- Task management
- AI processing requests

### WebSocket Service (`lib/websocket.ts`)
- Real-time video updates
- Upload progress tracking
- Task status notifications
- AI processing events

### Enhanced Video Uploader (`components/enhanced-video-uploader.tsx`)
- Drag-and-drop interface
- File validation (type, size)
- Progress tracking
- AI model integration

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://api.deafcreators.mbtquniverse.com
NEXT_PUBLIC_WS_URL=wss://ws.deafcreators.mbtquniverse.com
NEXT_PUBLIC_MUX_ENV_KEY=your-mux-env-key
MUX_TOKEN_ID=your-mux-token-id
MUX_TOKEN_SECRET=your-mux-token-secret
FLASK_API_URL=http://localhost:5000
API_SECRET_KEY=your-api-secret
```

## Deployment

### GitHub Pages
- Automatic deployment via GitHub Actions
- Static export with Next.js
- CDN distribution
- See [Deployment Guide](docs/DEPLOYMENT.md)

### Vercel (Alternative)
- One-click deployment from GitHub
- Automatic previews for PRs
- Edge network

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is part of the MBTQ Universe platform.

## Support

For issues and questions:
- GitHub Issues: https://github.com/MBTQ-Universe/deaf_creators/issues
- Documentation: https://docs.deafcreators.mbtquniverse.com
