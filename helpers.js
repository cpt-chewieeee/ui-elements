const RAF = window.requestAnimationFrame
const { random } = Math
const { insertAdjacentHTML } = document.body

const UID_TEMPLATE = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
const uid = () => UID_TEMPLATE.replace(/[xy]/g, char => (
  char == 'x'
    ? random() * 16 | 0
    : random() * 16 | 0 & 0x3 | 0x8).toString(16)
)

const oneLine = (str, ...tmpl) => tmpl
  .reduce((prev, curr, i) => prev + curr + str[i + 1], str[0])
  .replace(/(\s+)/g, ' ')

function byQuery(tag, all = false) {
  return all === false
    ? document.querySelector(tag)
    : document.querySelectorAll(tag)
}

function byClass(tag, all = false) {
  return all === false
    ? document.getElementsByClassName(tag)[0]
    : document.getElementsByClassName(tag)
}

function byTag(tag, all = false) {
  return all === false
    ? document.getElementsByTagName(tag)[0]
    : document.getElementsByTagName(tag)
}

const byId = tag => document.getElementById(tag)

const localStore = {
  get(key) { return JSON.parse(localStorage.getItem(key)) },
  set(key, store) { return localStorage.setItem(key, JSON.stringify(store)) }
}

const insertAsFirstChild = (html, el=document.body) => el.insertAdjacentHTML('afterbegin', html)
const insertAsLastChild = (html, el=document.body) => el.insertAdjacentHTML('beforeend', html)
const insertBeforeEl = (html, el=document.body) => el.insertAdjacentHTML('beforebegin', html)
const insertAfterEl = (html, el=document.body) => el.insertAdjacentHTML('afterend', html)

const scrollbarPosition = () => ({
  x: window.pageXOffset,
  y: window.pageYOffset
})

const windowSize = () => ({
  w: window.innerWidth,
  h: window.innerHeight
})

function getElPosition(el) {
  const box = el.getBoundingClientRect()
  return {
    x: (box.left|0) + window.pageXOffset,
    y: (box.top|0)  + window.pageYOffset,
    w: box.width|0,
    h: box.height|0
  }
}

const dispatch = (evt, obj = null) => obj
  ? dispatchEvent(new CustomEvent(evt, obj))
  : dispatchEvent(new CustomEvent(evt))

Element.prototype.addClass = function(className, ...args) {
  this.className = `${this.className} ${className}`
  if (args.length) {
    args.forEach(val => this.className += ` ${val}`)
  }
  console.log(this.className)
}

Element.prototype.removeClass = function(className) {
  if (!this.classList.length) return
  let preservedClasses = ''

  for (let val of this.classList)
    if (val != className)
      preservedClasses += preservedClasses.length ? ` ${val}` : val

  this.className = preservedClasses
}

Element.prototype.removeClasses = function(...classNames) {
  if (!this.classList.length) return

  let preservedClasses = ''
  for (let val of this.classList)
    if (!classNames.includes(val))
      preservedClasses += preservedClasses.length ? ` ${val}` : val

  this.className = preservedClasses

}
