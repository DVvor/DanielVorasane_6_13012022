/* eslint-disable no-undef */
function openDropdown () {
  selected.style.borderRadius = '5px 5px 0px 0px'
  selectThree.style.borderRadius = '0px 0px 5px 5px'

  selectTwo.style.display = 'block'
  selectThree.style.display = 'block'

  arrow.classList.replace('fa-angle-up', 'fa-angle-down')

  listbox.setAttribute('aria-expanded', 'true')
  selected.setAttribute('tabindex', '0')
  selectTwo.setAttribute('tabindex', '0')
  selectThree.setAttribute('tabindex', '0')

  document.getElementById('logo-link').setAttribute('tabindex', '-1')
  listbox.setAttribute('tabindex', '-1')
  document.querySelectorAll('.media-image').forEach(elem => elem.setAttribute('tabindex', '-1'))
  document.querySelectorAll('.fa-heart').forEach(elem => elem.setAttribute('tabindex', '-1'))
  btnContactButton.setAttribute('tabindex', '-1')

  document.addEventListener('click', closeDropdown)
  document.addEventListener('keydown', closeDropdown)

  document.querySelector('.contact_button').removeAttribute('onclick')

  document.querySelectorAll('.media-image').forEach(item => {
    item.removeEventListener('click', lightbox)
  })

  document.querySelectorAll('.fa-heart').forEach(item => {
    item.removeEventListener('click', addLikeUpdate)
  })

  document.getElementById('logo-link').setAttribute('href', '#')
}
listbox.addEventListener('click', openDropdown)

function closeDropdown (event) {
  const arrowUp = document.querySelector('.fa-angle-up')
  const arrowDown = document.querySelector('.fa-angle-down')

  if ((event.type === 'click' && event.target !== selected && event.target !== arrowDown && event.target !== arrowUp) ||
  (event.type === 'keydown' && event.key === 'Escape')) {
    selectTwo.style.display = 'none'
    selectThree.style.display = 'none'
    selected.style.borderRadius = '5px'

    listbox.setAttribute('aria-expanded', 'false')
    logoLink.setAttribute('tabindex', '0')
    listbox.setAttribute('tabindex', '0')
    selected.setAttribute('tabindex', '-1')
    document.querySelectorAll('.media-image').forEach(elem => elem.setAttribute('tabindex', '0'))
    document.querySelectorAll('.fa-heart').forEach(elem => elem.setAttribute('tabindex', '0'))
    btnContactButton.setAttribute('tabindex', '0')

    document.querySelector('.contact_button').setAttribute('onclick', 'displayModal()')
    // document.querySelector('.contact_button').removeAttribute('onclick')

    document.removeEventListener('click', closeDropdown)
    document.removeEventListener('keydown', closeDropdown)

    document.querySelectorAll('.media-image').forEach(item => {
      item.addEventListener('click', lightbox)
    })

    document.querySelectorAll('.fa-heart').forEach(item => {
      item.addEventListener('click', addLikeUpdate)
    })

    document.getElementById('logo-link').setAttribute('href', 'index.html')
  }
}

/* Sort medias by  */
function sortmedia () {
  const { name } = dataPhotographer
  const mediaSection = document.querySelector('.medias-section')

  if (selected.textContent === 'Popularité') {
    mediasPhotographer.sort((a, b) => a.likes - b.likes)
  }
  if (selected.textContent === 'Date') {
    mediasPhotographer.sort((a, b) => a.date.localeCompare(b.date))
  }
  if (selected.textContent === 'Titre') {
    mediasPhotographer.sort((a, b) => a.title.localeCompare(b.title))
  }

  mediaSection.innerHTML = ''

  mediasPhotographer.forEach(media => {
    const mediasPhotographer = mediaFactory(media, name)
    const mediaCard = mediasPhotographer.getMediaCardDOM()
    mediaSection.appendChild(mediaCard)
  })

  main.appendChild(mediaSection)

  document.querySelectorAll('.card-media').forEach(item => {
    item.addEventListener('click', lightbox)
  })
}

function chooseSelect (event) {
  const valeurEvent = event.target.textContent

  if (valeurEvent === 'Popularité') {
    selected.textContent = 'Popularité'
    selectTwo.textContent = 'Date'
    selectThree.textContent = 'Titre'
  } else if (valeurEvent === 'Date') {
    selected.textContent = 'Date'
    selectTwo.textContent = 'Popularité'
    selectThree.textContent = 'Titre'
  } else if (valeurEvent === 'Titre') {
    selected.textContent = 'Titre'
    selectTwo.textContent = 'Popularité'
    selectThree.textContent = 'Date'
  }
  selectTwo.style.display = 'none'
  selectThree.style.display = 'none'

  selected.removeAttribute('tabindex', '0')
  selectTwo.removeAttribute('tabindex', '0')
  selectThree.removeAttribute('tabindex', '0')

  logoLink.setAttribute('tabindex', '0')
  btnContactButton.setAttribute('tabindex', '0')
  listbox.setAttribute('tabindex', '0')

  selected.style.borderRadius = '5px'
  const arrowUp = document.createElement('i')
  arrowUp.classList.add('arrow', 'fas', 'fa-angle-up')
  selected.appendChild(arrowUp)

  sortmedia()
}
selectTwo.addEventListener('click', chooseSelect)
selectThree.addEventListener('click', chooseSelect)
