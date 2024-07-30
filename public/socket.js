import {SOCKET_MESSAGE_TYPES} from "./GLOBAL_CONSTANTS.js";
import {CreateRoomFunction, getRandomArbitrary, joinRoomFunction, startBingo} from "./bingo.js";
const socket = io();

const messageform = document.getElementById('messageform');
const loginform = document.getElementById('loginform')
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const createRoomButton=document.getElementById('createRoom');
const joinRoomButton=document.getElementById('joinRoom');
const nextNumberButton=document.getElementById('nextnumber');

const {CHAT_MESSAGE} = SOCKET_MESSAGE_TYPES;

createRoomButton.addEventListener('click',(e)=>{
    CreateRoomFunction(e)
})

joinRoomButton.addEventListener('click',(e)=>{
    joinRoomFunction(e)
})


loginform.addEventListener('submit',(e)=>{
    joinRoomFunction(e)
})

nextNumberButton.addEventListener('click',(e)=>{
    document.getElementById('printrandomnum').innerHTML=getRandomArbitrary(1,25);
})

messageform.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit(CHAT_MESSAGE.label, CHAT_MESSAGE.toStr(window.nick, input.value));
        input.value = '';
    }
});

socket.on(CHAT_MESSAGE.label, (msg) => {
    const item = document.createElement('li');
    const messageData = CHAT_MESSAGE.fromStr(msg);


    item.textContent = `${messageData.username}: ${messageData.message}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});