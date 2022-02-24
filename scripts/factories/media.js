/**
 * media factory create each media card
 * @param {objectElement} media
 * @param {string} photographerName
*/

function mediaFactory(media, photographerName) {
    const {title, image,video, likes } = media;
    const picture = `assets/SamplePhotos/${photographerName}/${image || video}`;
    let totalLike = likes;


    function getMediaCardDOM() {
        const cardmedia = document.createElement("div");
        cardmedia.classList.add('card-media');
        cardmedia.setAttribute("tabindex", "0");
        
        const cardmediatitle = document.createElement('div');
        cardmediatitle.classList.add('card-media-title');
        
        const h2 = document.createElement('h2');
        h2.textContent = title;

        const counterlikes = document.createElement('div');
        counterlikes.classList.add('counterlikes');

        const nbLikes = document.createElement('p');
        nbLikes.classList.add('nblikes');
        nbLikes.textContent = likes;

        const heart = document.createElement('i');
        heart.classList.add('fas','fa-heart');
        heart.setAttribute("aria-label", "likes");

// Choose type of media if its image or video
        if ('image' in media ) {
            const img = document.createElement('img');
            img.setAttribute("src", picture);
            img.setAttribute("alt", title)
            img.setAttribute("role", "image link")
            

            cardmedia.appendChild(img);
        } else if( 'video' in media) {
            const video = document.createElement('video');
            video.setAttribute("controls", "controls");
            video.setAttribute("src", picture);
            video.setAttribute("alt", title)
            video.setAttribute("role", "video link")

            cardmedia.appendChild(video);
        }
        


// add like when click on icon
// counter likes on each media   

        
    function addLikeUpdate(){
        totalLike += 1; 
        nbLikes.textContent = totalLike;
        
        const sumLikescurrent = document.querySelector(".sum-likes");
        sumLikescurrent.textContent = parseInt(sumLikescurrent.textContent) + 1;

    } 
    heart.addEventListener("click", addLikeUpdate);

    cardmedia.appendChild(cardmediatitle);
    cardmediatitle.appendChild(h2);
    cardmediatitle.appendChild(counterlikes);
    counterlikes.appendChild(nbLikes);
    counterlikes.appendChild(heart);

        return (cardmedia);
    }

    return { getMediaCardDOM }
}




