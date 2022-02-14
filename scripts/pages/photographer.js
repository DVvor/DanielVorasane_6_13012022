//Mettre le code JavaScript lié à la page photographer.html

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

const photographerId = getParameterId();
const mainPagePhotographer = document.querySelector(".photograph-header")
const main = document.querySelector("main");
const select = document.querySelector("#selector");

const mediasection = document.createElement("div");
    mediasection.classList.add('medias-section');


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
    const dataPhotographer = await photographerfound();


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
    
    const dataPhotographer = await photographerfound();
    const mediasPhotographer = await mediasPhotographerFound();
    const {name} = dataPhotographer;

    mediasPhotographer.forEach(media => {
        const mediasPhotographer = mediaFactory(media, name);
        const mediaCardDom = mediasPhotographer.getMediaCardDOM();
        mediasection.appendChild(mediaCardDom);
    } );

    /* display sum of likes  */
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

/* Sort medias by  */
async function sortmedia() {
    const mediasPhotographer = await mediasPhotographerFound();

    if (select.value == "popularite") {
        mediasPhotographer.map(media => media.likes).sort((a,b) => a - b);
        console.log(mediasPhotographer.map(media => media.likes).sort((a,b) => a - b));
    }
    if (select.value == "date") {
        const mediaPhotographerByDate = mediasPhotographer.map(media => media.date).sort();
        console.log(mediasPhotographer.map(media => media.date).sort());

        // mediaByDate = mediaPhotographerByDate.getMediaCardDOM();
        mediasection.innerHTML = "";
        // mediasection.appendChild(mediaPhotographerByDate);

    }
    if (select.value == "titre") {
        mediasPhotographer.map(media => media.title).sort();
        console.log(mediasPhotographer.map(media => media.title).sort());

    }
}


sortmedia();


select.addEventListener("change", sortmedia);
