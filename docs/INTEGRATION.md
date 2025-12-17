# Integration Guide

This guide explains how to integrate the frontend SPA with your backend server.

## Overview

The Deaf Creators Platform uses a client-server architecture where:
- **Frontend (SPA)**: Static React/Next.js application deployed on GitHub Pages
- **Backend**: Node.js/Python server providing REST API and WebSocket services

## Frontend Configuration

### Environment Variables

Create a `.env.local` file (not committed to Git):

```env
# Backend API URL
NEXT_PUBLIC_API_URL=https://api.deafcreators.mbtquniverse.com

# WebSocket Server URL
NEXT_PUBLIC_WS_URL=wss://ws.deafcreators.mbtquniverse.com

# Mux Configuration (if using Mux for video)
NEXT_PUBLIC_MUX_ENV_KEY=your-mux-env-key
```

### API Service Usage

The frontend uses `lib/api.ts` for all backend communication:

```typescript
import { apiService } from '@/lib/api'

// Fetch videos
const videos = await apiService.getVideos({ page: 1, limit: 10 })

// Create video
const video = await apiService.createVideo({
  title: "My Video",
  description: "Description",
  category: "vlog",
  isPublic: true,
  tags: ["tag1", "tag2"],
  assetId: "mux-asset-id"
})

// Request AI processing
const task = await apiService.requestAIProcessing({
  videoId: "video-123",
  modelType: "transcription"
})
```

### WebSocket Service Usage

The frontend uses `lib/websocket.ts` for real-time updates:

```typescript
import { websocketService } from '@/lib/websocket'

// Connect to WebSocket server
await websocketService.connect(
  'wss://ws.deafcreators.mbtquniverse.com',
  authToken
)

// Subscribe to upload progress
websocketService.onUploadProgress((data) => {
  console.log(`Upload progress: ${data.progress}%`)
})

// Subscribe to video updates
websocketService.onVideoCreated((video) => {
  console.log('New video:', video.title)
})

// Request AI processing
websocketService.requestAIProcessing('video-123', 'transcription')
```

## Backend Requirements

### CORS Configuration

Your backend must allow requests from GitHub Pages:

```javascript
// Express.js example
const cors = require('cors')

app.use(cors({
  origin: [
    'https://mbtq-universe.github.io',
    'http://localhost:3000' // For development
  ],
  credentials: true
}))
```

### Authentication

The frontend sends JWT tokens in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

Your backend should validate these tokens and extract user information.

### API Endpoints

Implement these required endpoints:

#### Videos
- `GET /api/videos` - List videos
- `GET /api/videos/:id` - Get video details
- `POST /api/videos` - Create video
- `PATCH /api/videos/:id` - Update video
- `DELETE /api/videos/:id` - Delete video
- `POST /api/videos/:id/views` - Increment view count

#### Tasks
- `GET /api/tasks` - List tasks
- `GET /api/tasks/:id` - Get task details
- `POST /api/tasks/:id/cancel` - Cancel task

#### AI Processing
- `POST /api/ai/process` - Request AI processing
- `GET /api/ai/models` - List available models
- `GET /api/ai/tasks/:taskId/result` - Get processing result

### WebSocket Events

Implement these WebSocket events:

#### Server → Client
- `video:upload:progress` - Upload progress updates
- `video:created` - New video notification
- `video:updated` - Video update notification
- `task:updated` - Task status update
- `ai:processing:complete` - AI processing complete

#### Client → Server
- `video:subscribe` - Subscribe to video updates
- `ai:process:request` - Request AI processing

## Development Workflow

### 1. Local Development

Run both frontend and backend:

```bash
# Terminal 1: Frontend
cd deaf_creators
npm run dev

# Terminal 2: Backend
cd backend
npm start
```

### 2. Testing API Integration

Use the browser console to test API calls:

```javascript
// In browser console
const api = window.__NEXT_DATA__.props.pageProps.apiService

// Test API
await api.getVideos()
```

### 3. Testing WebSocket

```javascript
// In browser console
const ws = window.__NEXT_DATA__.props.pageProps.websocketService

// Connect
await ws.connect('ws://localhost:3001', 'your-token')

// Subscribe to events
ws.onVideoCreated((video) => console.log('New video:', video))
```

## Deployment

### Frontend (GitHub Pages)

1. Push to main branch
2. GitHub Actions automatically builds and deploys
3. Site available at: https://mbtq-universe.github.io/deaf_creators/

### Backend

Deploy your backend to:
- AWS EC2/ECS
- Heroku
- DigitalOcean
- Google Cloud

Ensure:
- HTTPS enabled
- CORS configured
- WebSocket support enabled
- Environment variables set

## Troubleshooting

### CORS Errors

If you see CORS errors in console:
1. Check backend CORS configuration
2. Ensure GitHub Pages domain is whitelisted
3. Verify credentials: true is set

### WebSocket Connection Fails

1. Check WebSocket URL in environment variables
2. Verify backend WebSocket server is running
3. Check for firewall/proxy blocking WebSocket
4. Try polling transport as fallback

### API Calls Fail

1. Check API URL in environment variables
2. Verify authentication token is valid
3. Check network tab for error details
4. Verify backend is accessible

## Security Best Practices

1. **Never commit secrets**: Use environment variables
2. **Validate tokens**: Always verify JWT tokens on backend
3. **Rate limiting**: Implement rate limiting on backend
4. **Input validation**: Sanitize all user inputs
5. **HTTPS only**: Use HTTPS for all API calls

## Monitoring

### Frontend Monitoring

Use browser console and Network tab to monitor:
- API calls
- WebSocket connections
- Errors and warnings

### Backend Monitoring

Monitor:
- API response times
- WebSocket connections
- Error rates
- Resource usage

## Support

For integration issues:
1. Check documentation
2. Review error logs
3. Test with curl/Postman
4. Contact development team

See also:
- [Backend Server Documentation](BACKEND_SERVER.md)
- [Deployment Guide](DEPLOYMENT.md)
