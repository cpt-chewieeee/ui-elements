/* eslint-disable */
const distinctIngredients = {}
const filterRecipe = {}
const dishes = {}

function createHtml(data) {
 const list = data.map((val, i) => `<div class="m-a-1" id=${i} data-dish=${val.name.replace(/\s/g, '')}>
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
    if (i === arr.length - 1)
      listItems += `<span class='p-a-sm'>${item}</span></div></div>`
    else
      listItems += `<span class='p-a-sm'>${item},</span>`
  })
  return listItems
}

function isChecked(checked, idx) {
  checked ? updateStore(idx) : updateStore(idx, true)
  updateGroceryList(checked, idx)
}

function updateGroceryList(bool, i) {
  for (const item of recipes[i].ingredients) {
    if (bool) distinctIngredients[item] = i
    else delete distinctIngredients[item]
  }
  let ingredientListHTML = ''
  Object
  .keys(distinctIngredients)
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
//
// function onSearch(e) {
//   const re = new RegExp(e.target.value, 'i')
//   Array.from(byClass('m-a-1', true)).forEach(val => val.style.display = 'none')
//   console.log(re)
//   Object
//     .keys(filterRecipe)
//     .filter(val => re.test(val))
//     .forEach(i => filterRecipe[i].forEach(node => byId(node).style.display = 'block'))
//
//   console.log(filterRecipe)
//   // console.log(filterRecipe)
// }
//
function onSearch(e) {
  const re = new RegExp(e.target.value, 'i')
  console.log(re)
  let  dishNodes= Array.from(byQuery('div[data-dish]',true))
  console.log(dishNodes)
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
  console.log( 'search Recipes', filterRecipe)
  console.log( 'dishes', dishes)
}

function init() {
  if (localStore.get('checked') === null) {
    localStore.set('checked', {})
  }
  searchRecipes(recipes)
  createHtml(recipes)
  byId('search').addEventListener('keyup', onSearch)
}
document.addEventListener('DOMContentLoaded', () => {
  // window.monitor(init)
  init()
})
