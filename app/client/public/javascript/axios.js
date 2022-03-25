import { msgsSides } from './scripts.js';

(function () {

  const chatLinks = document.getElementsByClassName('a_chat_link');
  for (let i = 0; i < chatLinks.length; i++) {
    chatLinks[i].addEventListener('click', (e) => fetchHandler(e, chatLinks[i].href));
  }

  async function fetchHandler(e, url) {
    e.preventDefault();

    const response = await fetch(url);
    const result = await response.text();
    
    history.pushState(null, null, url);
    const data = result.split('<span id="change_msgs">')[1].split('</span>')[0];
    const innerBlock = document.getElementById('change_msgs');
    
    if (data.trim() == '') {
      innerBlock.innerHTML = '';
      innerBlock.innerHTML = `<div class="container d-flex  justify-content-center">
      <div class="bg-success rounded-3 p-3 mt-5">
        <strong>Нет сообщений</strong>
      </div>
    </div>`;
    } else {
      innerBlock.innerHTML = '';
      innerBlock.innerHTML = data;
    }

    msgsSides();

  }

})();
