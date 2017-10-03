function toast(content, pos='bottom-center', color='darkcyan') {
  const id = uid()
  const [y, x] = pos.split('-')

  const FONT_SIZE = content.length > 98 ? 'font-size:12.5px;' : 'font-size: inherit;'

  const STYLE = oneLine`
    background-color: ${color};
    ${y === 'bottom' ? `${y}:-${pageYOffset|0}px` : `${y}:${pageYOffset|0}px`};
    ${x === 'center' ? 'left: 50%; margin-left: -125px': `${x}: ${pageXOffset}px; margin-${x}: 1rem`};
  `
  const toastElement = oneLine`
    <div id = "${id}" class="toast" style="${STYLE}">
      <div style=${FONT_SIZE}>${content}</div>
      <div onclick="this.parentNode.remove()" class="remove-toast"><span>X</span></div>
    </div>
  `
  insertAsFirstChild(toastElement)
  let toastDomNode = byId(id)

  RAF(() => toastDomNode.classList.add(`slide-in-${y}`))
  setTimeout(() => RAF(() => toastDomNode.classList.add(`slide-out`)), 4000)
  setTimeout(() => toastDomNode.remove(), 5000)
}
