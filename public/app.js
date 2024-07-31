import {
  SOCKET_MESSAGE_TYPES,
  USERNAME_COOKIE_KEY,
} from "./GLOBAL_CONSTANTS.js";
import {
  CreateRoomFunction,
  getRandomArbitrary,
  onUserLogin,
  joinRoomFunction,
  startBingo,
  ifRoomExists,
} from "./bingo.js";

function init() {
  const nick = window.Cookies.get(USERNAME_COOKIE_KEY);

  if (nick) {
    onUserLogin(nick);
    ifRoomExists();
  }

  // ifRoomExists();
}

init();

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

  const inputfield = document.getElementById("NickName");
  let nick = inputfield.value.trim();
  if (nick === "") {
    document.getElementById("incaseError").innerHTML = "Please enter a name";
    return;
  }

  window.Cookies.set(USERNAME_COOKIE_KEY, nick);
  onUserLogin(nick);

  return false;
});

createRoomForm.addEventListener("submit", (e) => {
  e.preventDefault();
  CreateRoomFunction();
});

// joinRoomButton.addEventListener('click',(e)=>{
//     joinRoomFunction(e)
// })

joinRoomForm.addEventListener("submit", (e) => {
  e.preventDefault();

  joinRoomFunction();
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
