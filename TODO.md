# TODO: Real-Time Video Calling and Chat Web App

## Phase 1: Project Setup and Structure
- [x] Update content/projects.json with Video Calling & Chat app entry
- [x] Create new view 'video-chat' in App.jsx
- [x] Create src/pages/VideoChat.jsx component
- [x] Update routing to handle /video-chat route
- [x] Test basic integration (dev server runs without errors)

## Phase 2: Backend Setup
- [ ] Create backend directory structure (server/, models/, routes/, etc.)
- [ ] Set up Node.js + Express server
- [ ] Install dependencies: express, socket.io, mongoose, jsonwebtoken, bcryptjs, cors
- [ ] Create MongoDB models: User, Room, Chat
- [ ] Implement JWT authentication with guest mode
- [ ] Set up Socket.IO for signaling and chat
- [ ] Create room management API (create, join, leave, delete)
- [ ] Implement chat history storage

## Phase 3: Frontend Components
- [ ] Create VideoChat homepage (Create Room, Join Room buttons)
- [ ] Create Room page with video grid (up to 10 participants)
- [ ] Implement WebRTC peer-to-peer video/audio connections
- [ ] Add mute/unmute, video toggle, screen share controls
- [ ] Create chat sidebar with real-time messages
- [ ] Add room controls (leave room)
- [ ] Implement responsive design for mobile/tablet

## Phase 4: Integration and Features
- [ ] Connect frontend to backend via Socket.IO
- [ ] Implement room creation and sharing (/room/:id)
- [ ] Add room rules (max 10 users, auto-delete when empty)
- [ ] Add authentication UI (login form, guest mode)
- [ ] Implement notifications (join/leave, raise hand - optional)
- [ ] Add moderator controls (kick user, lock room - optional)

## Phase 5: Deployment and Testing
- [ ] Configure STUN/TURN servers
- [ ] Test locally with multiple browser tabs
- [ ] Deploy backend to Render/AWS/Heroku
- [ ] Deploy frontend to Netlify/Vercel
- [ ] Update GitHub repository with commits
- [ ] Create pull request for deployment

## Phase 6: Polish and Extras
- [ ] Ensure UI matches portfolio styles (colors, fonts, buttons)
- [ ] Add animations and micro-interactions
- [ ] Optimize performance and error handling
- [ ] Add loading states and error messages
- [ ] Test cross-browser compatibility
