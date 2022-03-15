// add like when click on icon
// counter likes on each media
// eslint-disable-next-line no-unused-vars
function addLikeUpdate (event) {
  const mediaLike = event.target.parentNode.querySelector('.nblikes')
  const totalLike = document.querySelector('.sum-likes')

  mediaLike.textContent = parseInt(mediaLike.textContent) + 1
  totalLike.textContent = parseInt(totalLike.textContent) + 1
// eslint-disable-next-line eol-last
}