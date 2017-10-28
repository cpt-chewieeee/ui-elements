/* eslint-disable */
const distinctIngredients = {}
const filterRecipe = {}
const dishes = {}

function createHtml(data) {
 const list = data.map((val, i) =>
  `<div class="m-a-1" id=${i} data-dish=${val.name.replace(/\s/g, '')}>
      <input type="checkbox" onchange="isChecked(this.checked, ${i})">
      <strong>${val.name}</strong>
      <div>Type: ${val.type}</div>
      <div>Time: ${val.cook_time}</div>
      <div>Ingredients: ${ createSpanElements(val.ingredients)}`
  ).join('')

  byId('list').insertAdjacentHTML('beforeend', list)
  recheckFromStore()
}

function createSpanElements(arr) {
  let listItems = ''
  arr.forEach((item, i) => {
    listItems += i === arr.length - 1
      ? listItems += `<span class='p-a-sm'>${item}</span></div></div>`
      : listItems += `<span class='p-a-sm'>${item},</span>`
  })
  return listItems
}

function isChecked(checked, idx) {
  checked ? updateStore(idx) : updateStore(idx, true)
  updateGroceryList(checked, idx)
}

function updateGroceryList(bool, i) {
  for (const item of recipes[i].ingredients)
    bool
      ? distinctIngredients[item] = i
      : delete distinctIngredients[item]

  let ingredientListHTML = ''
  Object.keys(distinctIngredients)
    .sort()
    .forEach(val => ingredientListHTML += `<li>${val}</li>`)
  byId('grocery-list').innerHTML = ingredientListHTML
}

function updateStore(i, remove = false) {
  const store = localStore.get('checked')
  if (remove) delete store[i]
  else store[i] = true
  localStore.set('checked', store)
}

function recheckFromStore() {
  const recheck = Object.keys(localStore.get('checked'))
  if (!recheck.length) return
  recheck.forEach((val) => {
    byId(val).firstElementChild.checked = true
    updateGroceryList(true, val)
  })
}

function onSearch(e) {
  const re = new RegExp(e.target.value, 'i')
  let  dishNodes= Array.from(byQuery('div[data-dish]',true))
  dishNodes.forEach((val,i) => {
    dishNodes[i].style.display =
    re.test(val.dataset.dish) ? 'block' : 'none'
  })
}

function searchRecipes(data) {
  data.forEach((val, i) => val.ingredients.forEach(item => {
    if (!filterRecipe.hasOwnProperty(item)) filterRecipe[item] = []
    filterRecipe[item].push(i)
    dishes[val.name] = val
  }))
}

function init() {
  if (localStore.get('checked') === null) localStore.set('checked', {})
  searchRecipes(recipes)
  createHtml(recipes)
  byId('search').addEventListener('keyup', onSearch)
}

document.addEventListener('DOMContentLoaded', () => init())
