const editable = byClass('editable', true)
const draggable = byClass('dnd', true)

for (const i of draggable) makeDragAndDroppable(i)

for (const i of editable) {
  i.addEventListener('dragend', removeTilts)
  i.addEventListener('dragstart', makeItTilt)
  i.addEventListener('dblclick', makeEditable)
  i.addEventListener('keydown', makeUnEditable)
}

function removeTilts (e) {
  var elements = document.getElementsByClassName('tilted')[0]
  elements.parentNode.removeChild(elements)
}

function makeItTilt (e) {
  var { textContent } = this
  var clone = this.cloneNode()

  clone.className = this.className + ' tilted'
  var wrapper = document.createElement('div')

  wrapper.innerText = textContent
  wrapper.style.transform = 'rotate(20deg)'
  wrapper.style.backgroundColor = '#ffffff'

  clone.appendChild(wrapper)
  document.body.appendChild(clone);
  e.dataTransfer.setDragImage(clone, 10, 20);
}

function makeEditable(e) {
  e.target.contentEditable = true
  e.target.style.background = '#ffffff'
  e.target.style.textAlign = 'left'
  e.target.focus()
}

function makeUnEditable(e) {
  if (e.keyCode === 13) {
    e.target.contentEditable = false
    e.target.style = ''
  }
}

function makeDragAndDroppable(list) {
  const { className } = list
  let entered = 0

  list.ondragenter = e => {
    entered++
    if (entered) {
      return list.className = `${className} droppable`
    }
    return false
  }
  list.ondragover = e => false
  list.ondragleave = e => {
    entered--
    if (!entered) {
      list.className = className
      entered = 0
    }
    return false
  }

  list.ondrop = e => {
    const item = document.createElement('li')
    item.draggable = true
    item.addEventListener('dragstart', makeItTilt)
    item.addEventListener('dragend', removeTilts)
    item.addEventListener('dblclick', makeEditable)
    item.addEventListener('keydown', makeUnEditable)
    item.className = 'item editable'
    item.textContent = e.dataTransfer.getData('Text')
    list.appendChild(item)
    list.className = className
    entered = 0
    return false
  }

  const items = list.getElementsByTagName('li')
  for (let i = 0; i < items.length; i++)
    items[i].draggable = true

  list.ondragstart = e => {
    if (e.target.tagName !== 'LI') return false
    e.dataTransfer.setData('Text', e.target.textContent)
    e.dataTransfer.effectAllowed = 'copyMove'
  }

  list.ondragend = e => {
    if (e.dataTransfer.dropEffect === 'move')
      e.target.parentNode.removeChild(e.target)
  }
}

