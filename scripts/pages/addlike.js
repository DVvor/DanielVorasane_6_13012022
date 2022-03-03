// add like when click on icon
// counter likes on each media   
function addLikeUpdate(event){
    let mediaLike = event.target.parentNode.querySelector(".nblikes");
    let totalLike = document.querySelector(".sum-likes");

    mediaLike.textContent = parseInt(mediaLike.textContent) + 1;
    totalLike.textContent = parseInt(totalLike.textContent) + 1;

} 