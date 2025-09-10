import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaDesktop, FaCopy } from 'react-icons/fa'

export default function VideoChat({ onBack }) {
  const [roomId, setRoomId] = useState('')
  const [userName, setUserName] = useState('')
  const [isInRoom, setIsInRoom] = useState(false)
  const [participants, setParticipants] = useState([])
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [localStream, setLocalStream] = useState(null)

  const localVideoRef = useRef(null)
  const remoteVideosRef = useRef([])
  const socketRef = useRef(null)
  const peerConnectionsRef = useRef(new Map())

  // WebRTC configuration
  const rtcConfiguration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      // Add TURN servers here
    ]
  }

  useEffect(() => {
    // Initialize socket connection when component mounts
    // This will be implemented when backend is ready
    return () => {
      // Cleanup
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
      peerConnectionsRef.current.forEach(pc => pc.close())
    }
  }, [])

  useEffect(() => {
    if (isInRoom && !localStream) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          setLocalStream(stream)
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream
          }
        })
        .catch(err => console.error('Error accessing media devices:', err))
    }

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop())
      }
    }
  }, [isInRoom, localStream])

  const createRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 15)
    setRoomId(newRoomId)
    setIsInRoom(true)
    // TODO: Emit create room event to backend
  }

  const joinRoom = () => {
    if (roomId && userName) {
      setIsInRoom(true)
      // TODO: Emit join room event to backend
    }
  }

  const leaveRoom = () => {
    setIsInRoom(false)
    setRoomId('')
    setParticipants([])
    setMessages([])
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop())
      setLocalStream(null)
    }
    // TODO: Emit leave room event to backend
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        user: userName,
        text: newMessage,
        timestamp: new Date().toLocaleTimeString()
      }
      setMessages(prev => [...prev, message])
      setNewMessage('')
      // TODO: Emit message to backend
    }
  }

  const toggleMute = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = isMuted
        setIsMuted(!isMuted)
      }
    }
  }

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = isVideoOff
        setIsVideoOff(!isVideoOff)
      }
    }
  }

  const toggleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true })
        const screenVideoTrack = screenStream.getVideoTracks()[0]

        if (localStream) {
          const videoTrack = localStream.getVideoTracks()[0]
          if (videoTrack) {
            localStream.removeTrack(videoTrack)
            videoTrack.stop()
          }
          localStream.addTrack(screenVideoTrack)

          screenVideoTrack.onended = () => {
            // When screen sharing ends, switch back to camera
            navigator.mediaDevices.getUserMedia({ video: true })
              .then(cameraStream => {
                const cameraVideoTrack = cameraStream.getVideoTracks()[0]
                localStream.removeTrack(screenVideoTrack)
                localStream.addTrack(cameraVideoTrack)
                setIsScreenSharing(false)
              })
              .catch(err => console.error('Error switching back to camera:', err))
          }
        }

        setIsScreenSharing(true)
      } catch (err) {
        console.error('Error starting screen share:', err)
      }
    } else {
      // Stop screen sharing and switch back to camera
      if (localStream) {
        const screenTrack = localStream.getVideoTracks().find(track => track.label.includes('screen'))
        if (screenTrack) {
          screenTrack.stop()
          navigator.mediaDevices.getUserMedia({ video: true })
            .then(cameraStream => {
              const cameraVideoTrack = cameraStream.getVideoTracks()[0]
              localStream.removeTrack(screenTrack)
              localStream.addTrack(cameraVideoTrack)
              setIsScreenSharing(false)
            })
            .catch(err => console.error('Error switching back to camera:', err))
        }
      }
    }
  }

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId)
      .then(() => alert('Room ID copied to clipboard!'))
      .catch(err => console.error('Failed to copy room ID:', err))
  }

  if (!isInRoom) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <motion.div
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white text-center mb-8">Video Chat</h1>

          <div className="space-y-6">
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">Your Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 outline-none border border-white/20 focus:border-purple-400 transition-colors"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">Room ID</label>
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 outline-none border border-white/20 focus:border-purple-400 transition-colors"
                placeholder="Enter room ID or create new"
              />
            </div>

            <div className="flex gap-3">
              <motion.button
                onClick={createRoom}
                className="flex-1 btn btn-primary py-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!userName}
              >
                Create Room
              </motion.button>
              <motion.button
                onClick={joinRoom}
                className="flex-1 btn btn-secondary py-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!roomId || !userName}
              >
                Join Room
              </motion.button>
            </div>
          </div>

          <motion.button
            onClick={onBack}
            className="mt-6 w-full btn btn-ghost py-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Back to Portfolio
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-white">Room: {roomId}</h2>
            <motion.button
              onClick={copyRoomId}
              className="p-1 rounded text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Copy Room ID"
            >
              <FaCopy size={16} />
            </motion.button>
          </div>
          <p className="text-white/70 text-sm">{participants.length + 1} participants</p>
        </div>
        <motion.button
          onClick={leaveRoom}
          className="btn btn-danger px-4 py-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Leave Room
        </motion.button>
      </div>

      <div className="flex-1 flex">
        {/* Video Area */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
            {/* Local Video */}
            <motion.div
              className="bg-black/20 rounded-lg overflow-hidden aspect-video"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <video
                ref={localVideoRef}
                autoPlay
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                You ({userName})
              </div>
            </motion.div>

            {/* Remote Videos */}
            {participants.map((participant, index) => (
              <motion.div
                key={participant.id}
                className="bg-black/20 rounded-lg overflow-hidden aspect-video"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <video
                  ref={el => remoteVideosRef.current[index] = el}
                  autoPlay
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  {participant.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat Sidebar */}
        <div className="w-80 bg-white/5 backdrop-blur-lg border-l border-white/10 flex flex-col">
          {/* Controls */}
          <div className="p-4 border-b border-white/10">
            <div className="flex gap-2 justify-center">
              <motion.button
                onClick={toggleMute}
                className={`p-3 rounded-full ${isMuted ? 'bg-red-500' : 'bg-white/10'} text-white`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMuted ? <FaMicrophoneSlash size={20} /> : <FaMicrophone size={20} />}
              </motion.button>
              <motion.button
                onClick={toggleVideo}
                className={`p-3 rounded-full ${isVideoOff ? 'bg-red-500' : 'bg-white/10'} text-white`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isVideoOff ? <FaVideoSlash size={20} /> : <FaVideo size={20} />}
              </motion.button>
              <motion.button
                onClick={toggleScreenShare}
                className={`p-3 rounded-full ${isScreenSharing ? 'bg-green-500' : 'bg-white/10'} text-white`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDesktop size={20} />
              </motion.button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className="bg-white/10 rounded-lg p-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-white text-sm">{message.user}</span>
                  <span className="text-white/50 text-xs">{message.timestamp}</span>
                </div>
                <p className="text-white/90 text-sm">{message.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 px-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 outline-none border border-white/20 focus:border-purple-400 transition-colors"
                placeholder="Type a message..."
              />
              <motion.button
                onClick={sendMessage}
                className="btn btn-primary px-4 py-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!newMessage.trim()}
              >
                Send
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
