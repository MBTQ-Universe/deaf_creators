# Backend Server Infrastructure Documentation

This document describes the TCP/IP-based backend server infrastructure requirements for the Deaf Creators Platform.

## Architecture Overview

The backend consists of:
1. RESTful API Server (HTTP/2)
2. WebSocket Server (Real-time communication)
3. Video Processing Service (AI model integration)  
4. Content Delivery Network (Video streaming)

## API Endpoints

### Video Management
- GET /api/videos - List videos
- GET /api/videos/:id - Get single video
- POST /api/videos - Create video
- PATCH /api/videos/:id - Update video
- DELETE /api/videos/:id - Delete video

### Creator Tasks
- GET /api/tasks - List tasks
- GET /api/tasks/:id - Get task
- POST /api/tasks/:id/cancel - Cancel task

### AI Processing
- POST /api/ai/process - Request AI processing
- GET /api/ai/models - List available AI models
- GET /api/ai/tasks/:taskId/result - Get task result

## WebSocket Events

### Client → Server
- video:subscribe - Subscribe to video updates
- video:unsubscribe - Unsubscribe from updates
- ai:process:request - Request AI processing

### Server → Client
- video:upload:progress - Upload progress updates
- video:created - New video created
- task:updated - Task status updated
- ai:processing:complete - AI processing done

## Environment Variables

```env
PORT=3001
NODE_ENV=production
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=your-secret
MUX_TOKEN_ID=your-mux-id
MUX_TOKEN_SECRET=your-mux-secret
WS_PORT=3001
```

See complete documentation in this file.
