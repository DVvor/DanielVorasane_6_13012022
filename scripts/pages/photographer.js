//Mettre le code JavaScript lié à la page photographer.html
const photographerId = getParameterId();
const mainPagePhotographer = document.querySelector(".photograph-header")
const main = document.querySelector("main");
const select = document.querySelector("#selector");

const mediasection = document.createElement("div");
    mediasection.classList.add('medias-section');

let mediasPhotographer = [];
let dataPhotographer = [];
let photographerName = "";

// Find param id in URL
function getParameterId() { 
    const searchParams = new URLSearchParams(location.search);
    const paramsId = searchParams.get('id');

       return (paramsId);
} 


/* Find datas of photographer in Json file */
async function getPhotographers() {
    const dataPhotographers = await fetch("data/photographers.json")
        .then(function(result) {
            if (result.ok) {
                return result.json();
                }
            })
        // .then(function(value) {
        //     console.log(value);
        // })
        .catch(function(error) {  
            console.log(error);  
        });

    return (dataPhotographers.photographers)
} 


/* Find photographer by id in Json file */
async function photographerfound() {
    const photographers = await getPhotographers()
    const findPhotographerById = photographers.find(photographer => photographer.id == photographerId);
    
    return findPhotographerById;
}  

/* Find all medias of a photographer in json file */
async function getMedia() {
    const mediaPhotographers = await fetch("data/photographers.json")
        .then(function(result) {
            if (result.ok) {
                return result.json();
                }
            })
        // .then(function(value) {
        //     console.log(value);
        // })
        .catch(function(error) {  
            console.log(error);  
        });

    return (mediaPhotographers.media)
} 

/* Find medias of a photographer by id */
async function mediasPhotographerFound() {
    const medias = await getMedia()
    // const photographerId = getParameterId();
    const mediasPhotographerById = medias.filter(medias => medias.photographerId == photographerId);

    return mediasPhotographerById;
    
    
}  


/* Display datas of photographer in header and boxlikes */
async function displayDataPhotographer() {
    dataPhotographer = await photographerfound();
    photographerName = dataPhotographer.name;

    // console.log(dataPhotographer)

    const photographerData = photographerFactory(dataPhotographer);
    const userCardDOM = photographerData.getDataPhotographer();

    mainPagePhotographer.appendChild(userCardDOM.article);
    mainPagePhotographer.appendChild(userCardDOM.img);

/* display price(tjm) in box total like */
    const {price} = dataPhotographer;

    const tjm = document.querySelector(".tjm");
    tjm.textContent = `${price}€/jour`;    

}

/* Display medias of photographer  */
async function mediadisplay() {
    
    // const dataPhotographer = await photographerfound();
    mediasPhotographer = await mediasPhotographerFound();

    /* sort by popularity default */
    mediasPhotographer.sort((a,b) => a.likes - b.likes);

    mediasPhotographer.forEach(media => {
        const mediasPhotographer = mediaFactory(media, photographerName);
        const mediaCardDom = mediasPhotographer.getMediaCardDOM();
        mediasection.appendChild(mediaCardDom);
    } );

    /* display sum of likes  */
    const sumLikes = mediasPhotographer.map(media => media.likes).reduce((prev, curr) => prev + curr, 0);
    const displaysumLikes = document.querySelector(".sum-likes");
    displaysumLikes.textContent = sumLikes;


    main.appendChild(mediasection);

    document.querySelectorAll('.card-media').forEach(item => {
        item.addEventListener('click', lightbox)
    })

}


function init() {
    displayDataPhotographer();
    mediadisplay();

};

init(); 

/* Sort medias by  */
async function sortmedia() {
    // const dataPhotographer = await photographerfound();
    // const mediasPhotographer = await mediasPhotographerFound();
    const {name} = dataPhotographer;
    const mediaSection = document.querySelector(".medias-section");


    if (select.value == "popularite") {
        mediasPhotographer.sort((a,b) => a.likes - b.likes);
    }
    if (select.value == "date") {
        mediasPhotographer.sort((a, b) => a.date.localeCompare(b.date));
    }
    if (select.value == "titre") {
        mediasPhotographer.sort((a, b) => a.title.localeCompare(b.title));
    }

    mediaSection.innerHTML = "";

    mediasPhotographer.forEach(media => {
        const mediasPhotographer = mediaFactory(media, name);
        const mediaCardDom = mediasPhotographer.getMediaCardDOM();
        mediaSection.appendChild(mediaCardDom);
    } );

    main.appendChild(mediaSection);

    document.querySelectorAll('.card-media').forEach(item => {
        item.addEventListener('click', lightbox)
    })


}
select.addEventListener("change", sortmedia);


/* create lightbox */
function lightbox(event){

    const content = document.createElement("div");
        content.classList.add('lightbox');
    
    currentSource = event.target.getAttribute('src')
    // const currentMedia = mediasPhotographer.filter(media => currentSource.includes(media.image || media.video ));
    let currentMediaIndex = mediasPhotographer.findIndex(media => currentSource.includes(media.image || media.video ));

    let mediaToDisplay = mediasPhotographer[currentMediaIndex]
    
    if (mediaToDisplay.hasOwnProperty('video')) {
        const mediaLargeSize = document.createElement("video");
        mediaLargeSize.classList.add('media-large');
        mediaLargeSize.setAttribute("src", currentSource);
        mediaLargeSize.setAttribute("controls", 'controls');
        content.appendChild(mediaLargeSize);
    } else if (mediaToDisplay.hasOwnProperty('image')) {
        const mediaLargeSize = document.createElement("img");
        mediaLargeSize.classList.add('media-large');
        mediaLargeSize.setAttribute("src", currentSource);
        content.appendChild(mediaLargeSize);
    }

    const title = document.createElement("p");
        title.classList.add('title');
        title.textContent = mediaToDisplay.title;

    const iconeClose = document.createElement("i");
        iconeClose.classList.add('fas','fa-times');
        iconeClose.classList.add('icone-close-lightbox');
        iconeClose.addEventListener("click", closeLightbox);

    
    const previous = document.createElement("i");
        previous.classList.add('fas','fa-chevron-left');
        previous.addEventListener("click", previousmedia);

    const next = document.createElement("i");
        next.classList.add('fas','fa-chevron-right');
        next.addEventListener("click", nextmedia);

    function nextmedia() {
        currentMediaIndex += 1
        if (currentMediaIndex == mediasPhotographer.length) {
            currentMediaIndex = 0;
        }
        console.log(mediasPhotographer.length,currentMediaIndex)

        let nextMediaToDisplay = mediasPhotographer[currentMediaIndex]


        const mediaLargeSize = document.querySelector('.media-large')
        const oldTitle = document.querySelector('.title')

        content.removeChild(oldTitle)
        content.removeChild(mediaLargeSize)

        const source = `assets/SamplePhotos/${photographerName}/${nextMediaToDisplay.image || nextMediaToDisplay.video}`;

        console.log(nextMediaToDisplay)
        if (nextMediaToDisplay.hasOwnProperty('video')) {
            const mediaLargeSize = document.createElement("video");
            mediaLargeSize.classList.add('media-large');
            mediaLargeSize.setAttribute("src", source);
            mediaLargeSize.setAttribute("controls", 'controls');
            content.appendChild(mediaLargeSize);
        } else if (nextMediaToDisplay.hasOwnProperty('image')) {
            const mediaLargeSize = document.createElement("img");
            mediaLargeSize.classList.add('media-large');
            mediaLargeSize.setAttribute("src", source);
            content.appendChild(mediaLargeSize);
        }

        const nextMediaTitle = document.createElement("p");
        nextMediaTitle.classList.add('title');
        nextMediaTitle.textContent = nextMediaToDisplay.title;
        content.appendChild(nextMediaTitle);
    }

    function previousmedia() {
        currentMediaIndex -= 1
        if (currentMediaIndex < 0) {
            currentMediaIndex = mediasPhotographer.length - 1;
        }
        console.log(mediasPhotographer.length,currentMediaIndex)

        let previousMediaToDisplay = mediasPhotographer[currentMediaIndex]


        const mediaLargeSize = document.querySelector('.media-large')
        const oldTitle = document.querySelector('.title')

        content.removeChild(oldTitle)
        content.removeChild(mediaLargeSize)

        const source = `assets/SamplePhotos/${photographerName}/${previousMediaToDisplay.image || previousMediaToDisplay.video}`;

        console.log(previousMediaToDisplay)
        if (previousMediaToDisplay.hasOwnProperty('video')) {
            const mediaLargeSize = document.createElement("video");
            mediaLargeSize.classList.add('media-large');
            mediaLargeSize.setAttribute("src", source);
            mediaLargeSize.setAttribute("controls", 'controls');
            content.appendChild(mediaLargeSize);
        } else if (previousMediaToDisplay.hasOwnProperty('image')) {
            const mediaLargeSize = document.createElement("img");
            mediaLargeSize.classList.add('media-large');
            mediaLargeSize.setAttribute("src", source);
            content.appendChild(mediaLargeSize);
        }

        const nextMediaTitle = document.createElement("p");
        nextMediaTitle.classList.add('title');
        nextMediaTitle.textContent = previousMediaToDisplay.title;
        content.appendChild(nextMediaTitle);
    }


    main.appendChild(content);
        content.appendChild(title);
        content.appendChild(next);
        content.appendChild(previous);
        content.appendChild(iconeClose);

}

function closeLightbox() {        
    const content = document.querySelector('.lightbox');
    main.removeChild(content)

}

