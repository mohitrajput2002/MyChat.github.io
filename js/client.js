const socket = io("http://localhost:8000");

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

var audio = new Audio("ting.mp3");

const append = (message, position) => {
  const messageElement = document.createElement('DIV');
  messageElement.innerHTML = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if (position == "left") {
    audio.play();
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`YOU : ${message}`, "right");
  socket.emit('send', message);
  messageInput.value = "";
});

const hh = prompt("Enter your name to join MyChat");
socket.emit("new-user-joined", hh);

socket.on("user-joined", (hh) => {
  append(`${hh} joined the chat`, "right");
});

socket.on("receive", (data) => {
  append(`${data.hh}: ${data.message} `, "left");
});

socket.on("left", (hh) => {
  append(`${hh} left the chat`, "left");
});
