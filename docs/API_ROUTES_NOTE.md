# API Routes Migration Note

## Important: API Routes Removed for GitHub Pages

The Next.js API routes (`app/api/*`) have been removed from this repository because they are not compatible with static export for GitHub Pages deployment.

## Why API Routes Were Removed

Next.js API routes require a Node.js server runtime and cannot be exported as static files. Since this application is deployed to GitHub Pages (which only serves static files), the API routes have been removed.

## Alternative Solution

Instead of Next.js API routes, this application now:

1. **Communicates directly with a separate backend server** via:
   - RESTful API calls (using `lib/api.ts`)
   - WebSocket connections (using `lib/websocket.ts`)

2. **Backend server must be deployed separately** to:
   - AWS, Heroku, DigitalOcean, Google Cloud, etc.
   - Any platform that supports Node.js/Python servers

## Previous API Routes

The following routes were removed and should be implemented in your backend server:

### Video Management
- `POST /api/videos` → Backend: `POST /api/videos`
- `GET /api/videos` → Backend: `GET /api/videos`
- `GET /api/videos/[id]` → Backend: `GET /api/videos/:id`
- `PUT /api/videos/[id]` → Backend: `PUT /api/videos/:id`
- `DELETE /api/videos/[id]` → Backend: `DELETE /api/videos/:id`

### MUX Integration
- `POST /api/mux/upload` → Backend: `POST /api/mux/upload`
- `POST /api/mux/webhook` → Backend: `POST /api/mux/webhook`

### Authentication
- `POST /api/auth` → Backend: `POST /api/auth/login`

## Implementation Guide

See the following documentation for implementing these endpoints:

1. **[Backend Server Documentation](BACKEND_SERVER.md)** - Complete API specifications
2. **[Integration Guide](INTEGRATION.md)** - How to connect frontend to backend
3. **[Deployment Guide](DEPLOYMENT.md)** - Deployment instructions

## Example Backend Implementation

Here's a quick example of implementing the video routes in Express.js:

```javascript
const express = require('express')
const app = express()

// Create video
app.post('/api/videos', async (req, res) => {
  const { title, description, category, isPublic, tags, assetId } = req.body
  
  // Save to database
  const video = await db.videos.create({
    title,
    description,
    category,
    isPublic,
    tags,
    assetId,
    userId: req.user.id
  })
  
  res.json(video)
})

// Get videos
app.get('/api/videos', async (req, res) => {
  const videos = await db.videos.findAll()
  res.json({ videos, total: videos.length })
})

// Get single video
app.get('/api/videos/:id', async (req, res) => {
  const video = await db.videos.findById(req.params.id)
  res.json(video)
})

app.listen(3001, () => {
  console.log('Backend API running on port 3001')
})
```

## For Development

During local development, you can:

1. Run a local backend server
2. Point `NEXT_PUBLIC_API_URL` to `http://localhost:3001`
3. Use `npm run dev` for the frontend
4. Frontend will communicate with your local backend

```bash
# Terminal 1: Backend
cd backend && npm start

# Terminal 2: Frontend
cd deaf_creators && npm run dev
```

## Migration Checklist

- [ ] Deploy backend server with API endpoints
- [ ] Configure CORS on backend to allow GitHub Pages domain
- [ ] Update frontend environment variables with backend URLs
- [ ] Test API integration
- [ ] Test WebSocket connections
- [ ] Deploy frontend to GitHub Pages

For more details, see the complete documentation in the `docs/` directory.
