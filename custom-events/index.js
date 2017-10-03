const nodes = {
  button: byId('button'),
  div : byId('div'),
  span: byId('span'),
  main: byClass('orange')
}

const args = ['HELLO', { detail: { a: 'DIV', b: 'SPAN', c: 'MAIN' } } ]
nodes.button.addEventListener('click', () => dispatch(...args))

function HELLO(e) {
  const  { div, span, main } = nodes

  div.textContent = e.detail.a
  div.style.color = 'red'
  div.style.border = 'thin solid red'

  span.textContent = e.detail.b
  span.addClass('orange', 'border-blue', 'right')
  // span.className = 'orange blue-border right'

  main.textContent = e.detail.c
  main.removeClasses('orange', 'border-blue')
  main.addClass('green', 'bold')

  removeEventListener('HELLO', HELLO)
}

addEventListener('HELLO', HELLO, false)
