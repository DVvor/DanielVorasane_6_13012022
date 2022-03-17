/* eslint-disable no-undef */
/* create lightbox */

// eslint-disable-next-line no-unused-vars
function lightbox (event) {
  const content = document.createElement('div')
  content.classList.add('lightbox')
  content.setAttribute('role', 'dialog')

  currentSource = event.target.getAttribute('src')
  const currentMediaIndex = mediasPhotographer.findIndex(media => currentSource.includes(media.image || media.video))
  const mediaToDisplay = mediasPhotographer[currentMediaIndex]
  const hasVideoProperty = Object.prototype.hasOwnProperty.call(mediaToDisplay, 'video')
  const hasImageProperty = Object.prototype.hasOwnProperty.call(mediaToDisplay, 'image')

  if (hasVideoProperty === true) {
    const mediaLargeSize = document.createElement('video')
    mediaLargeSize.classList.add('media-large')
    mediaLargeSize.setAttribute('src', currentSource)
    mediaLargeSize.setAttribute('aria-label', 'video close-up view')
    mediaLargeSize.setAttribute('role', 'video')
    mediaLargeSize.setAttribute('controls', 'controls')
    mediaLargeSize.setAttribute('title', mediaToDisplay.title)
    content.appendChild(mediaLargeSize)
  } else if (hasImageProperty === true) {
    const mediaLargeSize = document.createElement('img')
    mediaLargeSize.classList.add('media-large')
    mediaLargeSize.setAttribute('role', 'img')
    mediaLargeSize.setAttribute('src', currentSource)
    mediaLargeSize.setAttribute('title', mediaToDisplay.title)
    mediaLargeSize.setAttribute('aria-label', 'image close-up view')
    content.appendChild(mediaLargeSize)
  }

  const title = document.createElement('p')
  title.classList.add('title')
  title.textContent = mediaToDisplay.title

  const iconeClose = document.createElement('i')
  iconeClose.classList.add('fas', 'fa-times')
  iconeClose.classList.add('icone-close-lightbox')
  iconeClose.setAttribute('tabindex', '0')
  iconeClose.setAttribute('aria-label', 'close')
  iconeClose.setAttribute('role', 'close dialog')

  iconeClose.addEventListener('click', closeLightbox)

  const previous = document.createElement('i')
  previous.classList.add('fas', 'fa-chevron-left')
  previous.setAttribute('tabindex', '0')
  previous.setAttribute('aria-label', 'previous media')
  previous.setAttribute('role', 'link')

  previous.addEventListener('click', previousmedia)

  const next = document.createElement('i')
  next.classList.add('fas', 'fa-chevron-right')
  next.setAttribute('tabindex', '0')
  next.setAttribute('aria-label', 'next media')
  next.setAttribute('role', 'link')

  next.addEventListener('click', nextmedia)

  main.appendChild(content)
  content.appendChild(title)
  content.appendChild(next)
  content.appendChild(previous)
  content.appendChild(iconeClose)

  main.setAttribute('aria-hidden', 'false')
  listbox.setAttribute('tabindex', '-1')
  btnContactButton.setAttribute('tabindex', '-1')
  logoLink.setAttribute('tabindex', '-1')
  document.querySelectorAll('.media-image').forEach(elem => elem.setAttribute('tabindex', '-1'))
  document.querySelectorAll('.fa-heart').forEach(elem => elem.setAttribute('tabindex', '-1'))
}

function closeLightbox () {
  const content = document.querySelector('.lightbox')

  if (main.contains(content)) {
    main.removeChild(content)
  }

  main.setAttribute('aria-hidden', 'true')
  listbox.setAttribute('tabindex', '0')
  selected.removeAttribute('tabindex')
  btnContactButton.setAttribute('tabindex', '0')
  logoLink.setAttribute('tabindex', '0')
  document.querySelectorAll('.media-image').forEach(elem => elem.setAttribute('tabindex', '0'))
  document.querySelectorAll('.fa-heart').forEach(elem => elem.setAttribute('tabindex', '0'))
}

function nextmedia () {
  const content = document.querySelector('.lightbox')
  const mediaLargeSize = document.querySelector('.media-large')
  const mediaLargeSizeSrc = mediaLargeSize.src
  const title = document.querySelector('.title')

  currentMediaIndex = mediasPhotographer.findIndex(media => mediaLargeSizeSrc.includes(media.image || media.video))
  // add index +1
  currentMediaIndex++

  // If last index, return to first index
  if (currentMediaIndex === mediasPhotographer.length) {
    currentMediaIndex = 0
  }

  const nextMediaToDisplay = mediasPhotographer[currentMediaIndex]

  content.removeChild(title)
  content.removeChild(mediaLargeSize)

  const source = `assets/SamplePhotos/${photographerName}/${nextMediaToDisplay.image || nextMediaToDisplay.video}`
  const hasVideoProperty = Object.prototype.hasOwnProperty.call(nextMediaToDisplay, 'video')
  const hasImageProperty = Object.prototype.hasOwnProperty.call(nextMediaToDisplay, 'image')

  if (hasVideoProperty === true) {
    const mediaLargeSize = document.createElement('video')
    mediaLargeSize.classList.add('media-large')
    mediaLargeSize.setAttribute('aria-label', 'video close-up view')
    mediaLargeSize.setAttribute('role', 'video')
    mediaLargeSize.setAttribute('src', source)
    mediaLargeSize.setAttribute('controls', 'controls')
    content.appendChild(mediaLargeSize)
  } else if (hasImageProperty === true) {
    const mediaLargeSize = document.createElement('img')
    mediaLargeSize.classList.add('media-large')
    mediaLargeSize.setAttribute('role', 'img')
    mediaLargeSize.setAttribute('aria-label', 'image close-up view')
    mediaLargeSize.setAttribute('src', source)
    content.appendChild(mediaLargeSize)
  }

  const nextMediaTitle = document.createElement('p')
  nextMediaTitle.classList.add('title')
  nextMediaTitle.textContent = nextMediaToDisplay.title
  content.appendChild(nextMediaTitle)
}

function previousmedia () {
  const content = document.querySelector('.lightbox')
  const mediaLargeSize = document.querySelector('.media-large')
  const mediaLargeSizeSrc = mediaLargeSize.src
  const title = document.querySelector('.title')

  let currentMediaIndex = mediasPhotographer.findIndex(media => mediaLargeSizeSrc.includes(media.image || media.video))

  currentMediaIndex -= 1
  if (currentMediaIndex < 0) {
    currentMediaIndex = mediasPhotographer.length - 1
  }

  const previousMediaToDisplay = mediasPhotographer[currentMediaIndex]

  content.removeChild(title)
  content.removeChild(mediaLargeSize)

  const source = `assets/SamplePhotos/${photographerName}/${previousMediaToDisplay.image || previousMediaToDisplay.video}`
  const hasVideoProperty = Object.prototype.hasOwnProperty.call(previousMediaToDisplay, 'video')
  const hasImageProperty = Object.prototype.hasOwnProperty.call(previousMediaToDisplay, 'image')

  if (hasVideoProperty === true) {
    const mediaLargeSize = document.createElement('video')
    mediaLargeSize.classList.add('media-large')
    mediaLargeSize.setAttribute('aria-label', 'video close-up view')
    mediaLargeSize.setAttribute('role', 'video')
    mediaLargeSize.setAttribute('src', source)
    mediaLargeSize.setAttribute('controls', 'controls')
    content.appendChild(mediaLargeSize)
  } else if (hasImageProperty === true) {
    const mediaLargeSize = document.createElement('img')
    mediaLargeSize.classList.add('media-large')
    mediaLargeSize.setAttribute('role', 'img')
    mediaLargeSize.setAttribute('aria-label', 'image close-up view')
    mediaLargeSize.setAttribute('src', source)
    content.appendChild(mediaLargeSize)
  }

  const nextMediaTitle = document.createElement('p')
  nextMediaTitle.classList.add('title')
  nextMediaTitle.textContent = previousMediaToDisplay.title
  content.appendChild(nextMediaTitle)
// eslint-disable-next-line eol-last
}