function msgsSides() {
  const msgs = document.getElementsByClassName('msgs');
  const user_name = document.getElementsByClassName('user_name');
  const sides = document.getElementsByClassName('img_reverse');
  const userName = findCookie('user_name');

  for (let i = 0; i < msgs.length; i++) {
    if (user_name[i].textContent.replace(/\s+/g, ' ').trim().split(':')[0] == userName) {
      msgs[i].classList.add('justify-content-end');
      sides[i].classList.add('flex-row-reverse');
      
    } else {
      msgs[i].classList.add('justify-content-start');
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

function createMessage(side, data, who_created, time_created, user_avatar, img_reverse) {
  const changeMsgs = document.getElementById('change_msgs');
  const paragraph = document.createElement('p');
  const innerData = 
`
<div class="msgs m-3 rounded-3 d-flex ${side}">
  <div class="row bg-success text-light p-1 mb-1 rounded-3 d-flex align-items-center ${img_reverse} img_reverse">
    <div class="col-auto">
      <img src="/images/usersAvatars/${user_avatar}" class="rounded-circle users_avatar_in_msg" alt="users_avatar">
    </div>
    <div class="col-auto">
      <span class="user_name visually-hidden">${who_created}</span>

      <div>
        ${data}
      </div>
      <div>
        <span class="small">${time_created}</span>
      </div>
    </div>
  </div>
</div>`

  paragraph.innerHTML = innerData;
  changeMsgs.append(paragraph);
};

function scrollToTop() {
  const msgs_list = document.getElementById("msgs_list");
  msgs_list.scrollTop = msgs_list.scrollHeight;
}

export { msgsSides, findCookie, createMessage, scrollToTop };