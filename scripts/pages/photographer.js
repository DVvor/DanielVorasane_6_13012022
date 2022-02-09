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


// Display datas of photographer in header
async function displayDataPhotographer() {
    const dataPhotographer = await photographerfound();
    const mainPagePhotographer = document.querySelector(".photograph-header")

    const photographerData = photographerFactory(dataPhotographer);
    const userCardDOM = photographerData.getDataPhotographer();

    mainPagePhotographer.appendChild(userCardDOM.article);
    mainPagePhotographer.appendChild(userCardDOM.img);
    

}
// displayDataPhotographer();


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

    main.appendChild(mediasection);

}

// mediadisplay();

// add like when click on icon
// counter likes on each media

// function addlikes() {
//     const nbLikes = document.querySelectorAll(".nblikes");
    
//     console.log(nbLikes);

//     // nbLikes.addEventListener("click", addLikeMore);
// }

// addlikes()


function init() {
     displayDataPhotographer();
     mediadisplay();
    //  addlikes()

    // window.addEventListener("DOMContentLoaded", (event) => {
        // const nbLikes = document.querySelector(".medias-section");
        
        // console.log(nbLikes);
    // })
};

init(); 

