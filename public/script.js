// Initialize connection to the Socket.io server
const socket = io();

const form = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const usernameInput = document.getElementById('username');
const messagesContainer = document.getElementById('messages');

// When form is submitted, send message to server
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const data = {
    username: usernameInput.value,
    text: messageInput.value
  };
  
  // Emit the message to the server
  socket.emit('chat message', data);
  
  // Clear the input field and keep focus on it
  messageInput.value = '';
  messageInput.focus();
});

// Listen for incoming messages from the server
socket.on('chat message', (data) => {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', 'received');
  
  messageElement.innerHTML = `<strong>${data.username}</strong> ${data.text}`;
  
  messagesContainer.appendChild(messageElement);
  
  // Auto-scroll to the bottom of the chat box
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});