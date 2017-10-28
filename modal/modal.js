const state = {
  modalOpen: false
}

function toggleModal() {
  const modalContainer = byClass('modalContainer')
  const modal = byClass('modal')
  modalContainer.style.display = state.modalOpen ? 'none' : 'block'
  modal.style.display = state.modalOpen ? 'none' : 'block'
  state.modalOpen = !state.modalOpen
}