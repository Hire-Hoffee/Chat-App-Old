import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
import { msgsSides, findCookie, createMessage } from './scripts.js';
const socket = io();

const chatForm = document.getElementById('chat_form');
const inputMessage = document.getElementById('input_message');
const chatLinks = document.getElementsByClassName('p_chat_link');

const userName = findCookie('user_name');
const userAvatar = findCookie('user_avatar');
const chatRooms = [];

for (let i = 0; i < chatLinks.length; i++) {
  const chatRoom = [chatLinks[i].textContent.replace(/\s+/g, ' ').trim(), userName].sort().join('_');
  chatRooms.push(chatRoom);
}
console.log(chatRooms);

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const roomWith = new URLSearchParams(document.location.search).get('room_with');
  const userName = findCookie('user_name');
  const chatRoom = [roomWith, userName].sort().join('_');
  const time_created = new Date(Date.now()).toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});

  if (inputMessage.value) {
    createMessage('align-items-end', inputMessage.value, userName, time_created, userAvatar);
    const saveMsg = {
      message_data: inputMessage.value,
      room: { who_created: userName, who_created_avatar: userName, send_to: roomWith, room_name: chatRoom }
    }
    socket.emit('send_msg:client', saveMsg, chatRoom);
    inputMessage.value = '';
  }
});


socket.on('connect', () => {
  console.log(`${socket.id} connected`);
  socket.emit('join_room', chatRooms);
});

socket.on('send_msg:server', (data) => {
  const roomWith = new URLSearchParams(document.location.search).get('room_with');
  const userName = findCookie('user_name');
  const chatRoom = [roomWith, userName].sort().join('_');
  const time_created = new Date(Date.now()).toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
  
  if (data.room.room_name == chatRoom) {
    createMessage('align-items-start', data.message_data, data.room.who_created, time_created, data.room.who_created_avatar);
  }
});

msgsSides();