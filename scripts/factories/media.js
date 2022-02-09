/**
 * media factory create each media card
 * @param {objectElement} media
 * @param {string} photographerName
*/

function mediaFactory(media, photographerName) {
    const {title, image,video, likes } = media;
    const picture = `assets/SamplePhotos/${photographerName}/${image || video}`;

    function getMediaCardDOM() {
        const cardmedia = document.createElement("div");
        cardmedia.classList.add('card-media');
        
        const cardmediatitle = document.createElement('div');
        cardmediatitle.classList.add('card-media-title');
        
        const h2 = document.createElement('h2');
        h2.textContent = title;

        const nbLikes = document.createElement('p');
        nbLikes.classList.add('nblikes');
        nbLikes.textContent = likes;

        if ('image' in media ) {
            const img = document.createElement('img');
            img.setAttribute("src", picture);
            cardmedia.appendChild(img);
        } else if( 'video' in media) {
            const video = document.createElement('video');
            video.setAttribute("controls", "controls");
            video.setAttribute("src", picture);
            cardmedia.appendChild(video);
        }
        

        cardmedia.appendChild(cardmediatitle);
        cardmediatitle.appendChild(h2);
        cardmediatitle.appendChild(nbLikes);
        
        return (cardmedia);
    }


    
    return { getMediaCardDOM }
}




