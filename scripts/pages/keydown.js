/* eslint-disable no-undef */
/* Focus accessibilty */
// click event according to condition

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    if (event.target.className === 'media-image') {
      lightbox(event)
    }
    if (event.target.className.includes('icone-close-lightbox')) {
      closeLightbox()
    }
    if (event.target.className === 'fas fa-chevron-right') {
      nextmedia()
    }
    if (event.target.className === 'fas fa-chevron-left') {
      previousmedia()
    }
    if (event.target.className === 'fas fa-heart') {
      addLikeUpdate(event)
    }
    if (event.target.className === 'dropdown') {
      openDropdown(event)
    }
    if (event.target.className.includes('select')) {
      chooseSelect(event)
    }
    // close modal
    if (event.target.className === 'close') {
      closeModal()
    }
    // button close message sent
    if (event.target.className === 'btnclose') {
      closeModalMessageSent()
    }
  }

  if (event.key === 'Escape') {
    closeModal()
    closeLightbox()
  }
  if (event.key === 'ArrowRight') {
    nextmedia()
  }
  if (event.key === 'ArrowLeft') {
    previousmedia()
  }
})
// eslint-disable-next-line eol-last
