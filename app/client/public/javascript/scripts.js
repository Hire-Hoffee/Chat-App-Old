function msgsSides() {
  const msgs = document.getElementsByClassName('msgs');
  const user_name = document.getElementsByClassName('user_name');
  const userName = findCookie('user_name');

  for (let i = 0; i < msgs.length; i++) {
    if (user_name[i].textContent.replace(/\s+/g, ' ').trim().split(':')[0] == userName) {
      msgs[i].classList.add('align-items-end');
    } else {
      msgs[i].classList.add('align-items-start');
    }
  }
};

function findCookie(cookieKey) {
  const arr = [];
  let cookieValue = '';
  document.cookie.split('; ').forEach((item) => {
    arr.push(item.split('='));
  })
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].includes(cookieKey)) {
      cookieValue = arr[i][1];
      return cookieValue;
    }
  }
};

function createMessage(side, data, who_created, time_created, user_avatar) {
  const changeMsgs = document.getElementById('change_msgs');
  const paragraph = document.createElement('p');
  const innerData = 
`
<div class="msgs p-2 m-4 rounded-3 d-flex flex-column ${side}">
  <div class="row bg-dark text-success p-1 mb-1 rounded-3">
    <div class="col-auto">
      <img src="/images/usersAvatars/${user_avatar}" class="rounded-circle users_avatar_in_msg" alt="users_avatar">
    </div>
    <div class="col-auto">
      <strong class="user_name">${who_created}</strong>
    </div>
  </div>

  <div class="row position-relative bg-success text-light p-1 pb-3 mb-1 rounded-3 chat_msg">
    <div class="position-absolute bottom-0 mb-1 small text-end">
      ${time_created}
    </div>
    <div class="col-auto">
      <p>${data}</p>
    </div>
  </div>
</div>
`

  paragraph.innerHTML = innerData;
  changeMsgs.append(paragraph);
};

export { msgsSides, findCookie, createMessage };