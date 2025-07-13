const socket = io();
const editor = document.getElementById('editor');
const userListDiv = document.getElementById('userList');

editor.addEventListener('input', () => {
  socket.emit('edit', editor.value);
});

socket.on('update', (data) => {
  editor.value = data;
});

socket.on('loadDocument', (data) => {
  editor.value = data;
});

socket.on('userList', (users) => {
  userListDiv.innerHTML = users.join(', ');
});
