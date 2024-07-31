import { SOCKET_MESSAGE_TYPES } from "./GLOBAL_CONSTANTS.js";
import {
  CreateRoomFunction,
  getRandomArbitrary,
  onUserLogin,
  joinRoomFunction,
  startBingo,
} from "./bingo.js";
const socket = io();

const messageform = document.getElementById("messageform");
const input = document.getElementById("input");

const messages = document.getElementById("messages");
const nextNumberButton = document.getElementById("nextnumber");

const { CHAT_MESSAGE } = SOCKET_MESSAGE_TYPES;

const joinRoomForm = document.getElementById("joinRoomForm");
const nickNameForm = document.getElementById("nickNameForm");
const createRoomForm = document.getElementById("createRoomForm");

nickNameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  onUserLogin();
  return false;
});

createRoomForm.addEventListener("submit", (e) => {
  CreateRoomFunction(e);
});

// joinRoomButton.addEventListener('click',(e)=>{
//     joinRoomFunction(e)
// })

joinRoomForm.addEventListener("submit", (e) => {
  joinRoomFunction(e);
});

nextNumberButton.addEventListener("click", (e) => {
  document.getElementById("printrandomnum").innerHTML = getRandomArbitrary(
    1,
    25
  );
});

messageform.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit(
      CHAT_MESSAGE.label,
      CHAT_MESSAGE.toStr(window.nick, input.value)
    );
    input.value = "";
  }
});

socket.on(CHAT_MESSAGE.label, (msg) => {
  const item = document.createElement("li");
  const messageData = CHAT_MESSAGE.fromStr(msg);

  item.textContent = `${messageData.username}: ${messageData.message}`;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
