/**
 * media factory create each media card
 * @param {objectElement} media
 * @param {string} photographerName
*/

// eslint-disable-next-line no-unused-vars
function mediaFactory (media, photographerName) {
  const { title, image, video, likes } = media
  const picture = `assets/SamplePhotos/${photographerName}/${image || video}`
  //   let totalLike = likes

  function getMediaCardDOM () {
    const cardmedia = document.createElement('div')
    cardmedia.classList.add('card-media')

    const cardmediatitle = document.createElement('div')
    cardmediatitle.classList.add('card-media-title')

    const h2 = document.createElement('h2')
    h2.textContent = title

    const counterlikes = document.createElement('div')
    counterlikes.classList.add('counterlikes')

    const nbLikes = document.createElement('p')
    nbLikes.classList.add('nblikes')
    nbLikes.textContent = likes

    const heart = document.createElement('i')
    heart.classList.add('fas', 'fa-heart')
    heart.setAttribute('aria-label', 'likes')
    heart.setAttribute('tabindex', '0')

    // Choose type of media if its image or video
    if ('image' in media) {
      const img = document.createElement('img')
      img.setAttribute('src', picture)
      img.setAttribute('alt', title)
      img.setAttribute('role', 'image link')
      img.classList.add('media-image')
      img.setAttribute('tabindex', '0')

      cardmedia.appendChild(img)
    } else if ('video' in media) {
      const video = document.createElement('video')
      video.setAttribute('src', picture)
      video.setAttribute('alt', title)
      video.setAttribute('role', 'video link')
      video.classList.add('media-image')
      video.setAttribute('tabindex', '0')

      cardmedia.appendChild(video)
    }

    cardmedia.appendChild(cardmediatitle)
    cardmediatitle.appendChild(h2)
    cardmediatitle.appendChild(counterlikes)
    counterlikes.appendChild(nbLikes)
    counterlikes.appendChild(heart)

    return (cardmedia)
  }

  return { getMediaCardDOM }
}
