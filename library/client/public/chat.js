var socket = io();

const btnSend = document.querySelector('#send');

btnSend.addEventListener('click', () => {
    const input = document.querySelector('#input');
    socket.emit('chat message', input.value);
});

socket.on('chat message', (message) => {
    const messageBox = document.querySelector('.chat-message-box');
    messageBox.innerHTML += `<div class="chat-message">${message}</div>`;
});

socket.on('server message', (message) => {
    const messageBox = document.querySelector('.chat-message-box');
    messageBox.innerHTML += `<div class="chat-message">${message}</div>`;
});