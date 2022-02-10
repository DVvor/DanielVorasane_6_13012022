//Mettre le code JavaScript lié à la page photographer.html

// Find param id in URL
function getParameterId() { 
    const searchParams = new URLSearchParams(location.search);
    const paramsId = searchParams.get('id');

       return (paramsId);
} 


// Find datas of photographer in object
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


async function photographerfound() {
    const photographers = await getPhotographers()
    const photographerId = getParameterId();
    const findPhotographerById = photographers.find(photographer => photographer.id == photographerId);
    
    return findPhotographerById;
}  


// Find all medias of a photographer
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

async function mediasPhotographerFound() {
    const medias = await getMedia()
    const photographerId = getParameterId();
    const mediasPhotographerById = medias.filter(medias => medias.photographerId == photographerId);

    return mediasPhotographerById;
}  


// Display datas of photographer in header and boxlikes
async function displayDataPhotographer() {
    const dataPhotographer = await photographerfound();
    const mainPagePhotographer = document.querySelector(".photograph-header")


    const photographerData = photographerFactory(dataPhotographer);
    const userCardDOM = photographerData.getDataPhotographer();

    mainPagePhotographer.appendChild(userCardDOM.article);
    mainPagePhotographer.appendChild(userCardDOM.img);

// display price(tjm) in box total like
    const {price} = dataPhotographer;

    const tjm = document.querySelector(".tjm");
    tjm.textContent = `${price}€/jour`;    

}

// Display medias of photographer 

async function mediadisplay() {
    const dataPhotographer = await photographerfound();
    const mediasPhotographer = await mediasPhotographerFound();
    const {name} = dataPhotographer;
    const main = document.querySelector("main");
    
    const mediasection = document.createElement("div");
    mediasection.classList.add('medias-section');

    mediasPhotographer.forEach(media => {
        const mediasPhotographer = mediaFactory(media, name);
        const mediaCardDom = mediasPhotographer.getMediaCardDOM();
        mediasection.appendChild(mediaCardDom);

    });


    const sumLikes = mediasPhotographer.map(media => media.likes).reduce((prev, curr) => prev + curr, 0);
    const displaysumLikes = document.querySelector(".sum-likes");
    displaysumLikes.textContent = sumLikes;


    main.appendChild(mediasection);


} 

function init() {
     displayDataPhotographer();
     mediadisplay();
};

init(); 

