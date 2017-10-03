const storeHeading = localStorage.getItem('heading')
const heading = document.querySelector('.heading')
heading.textContent = storeHeading ? storeHeading : 'function hi () { console.log("hi") }'

const storeContent = localStorage.getItem('content')
const content = document.querySelector('.content')
content.textContent = storeContent ? storeContent : 'Content body';

setInterval(() =>  {
  localStorage['heading'] = heading.textContent
  localStorage['content'] = content.textContent
  console.log(localStorage.getItem('heading'))
  console.log(localStorage.getItem('content'))
}, 10000);


