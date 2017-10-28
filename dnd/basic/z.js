const clock = document.getElementById('clock')
const icon = new Image()
// icon.src = 'clock-icon.png'
icon.src = 'OutlineCollapse.png'

displayTime()
function displayTime() {
  clock.textContent = date()
  clock.href = date()
  setTimeout(displayTime, 60000)
}

function date() {
  const now = new Date()
  return now.toLocaleString('en-us', { hour: '2-digit', minute: '2-digit' })
}

clock.draggable = true
clock.ondragstart = e => {
  e.dataTransfer.setData('Text', `${date()}\n`)
  e.dataTransfer.setDragImage(icon, 0, 0)
}

