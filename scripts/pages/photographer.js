// 1-DOM
// 2-Find param id in URL
// 3-Find datas from all photographers in Json file 
// 4-Find datas photographer through his photographerID (//2) in Json file
// 5-Find all medias of a photographer in json file
// 6-Find medias of a photographer by id
// 7-Display datas of photographer in header and boxlikes
// 8-Display medias of photographer 

// 1-DOM
const photographerId = getParameterId();
const headerPagePhotographer = document.querySelector(".photograph-header")
const main = document.querySelector("main");
let selected = document.querySelector('.select-selected');
let selectTwo = document.querySelector('.select-two');
let selectThree = document.querySelector('.select-three');
let arrow = document.querySelector('.fa-angle-up');
const listbox = document.querySelector('.dropdown');
const modal = document.getElementById("contact_modal");

const logoLink = document.getElementById("logo-link");
const mediaImage = document.querySelectorAll(".media-image");
const btnCloseModal = document.querySelector(".close");
const btnContactButton = document.querySelector(".contact_button");


const mediasSection = document.createElement("div");
    mediasSection.classList.add('medias-section');

let mediasPhotographer = [];
let dataPhotographer = [];
let photographerName = "";

// 2-Find param id in URL
function getParameterId() { 
    const searchParams = new URLSearchParams(location.search);
    const paramsId = searchParams.get('id');

       return (paramsId);
       // return photographerID content in URL
} 

// 3-Find datas from all photographers in Json file 
// Use fetch method to get datas of photographer
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

        return (dataPhotographers.photographers);
        // return array datas photographers
    
} 
// 4-Find datas photographer through his photographerID (//2) in Json file
async function photographerfound() {
    const photographers = await getPhotographers()
    const photographerFound = photographers.find(photographer => photographer.id == photographerId);

    return photographerFound;
    // object with photographer datas
}  

// 5-Find all medias of a photographer in json file
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
    // return array of all medias

} 

// 6-Find medias of a photographer by id
async function mediasPhotographerFound() {
    const medias = await getMedia()
    const mediasPhotographerById = medias.filter(medias => medias.photographerId == photographerId);

    return mediasPhotographerById;
    // Array of all photographer medias
}  


// 7-Display datas of photographer in header and boxlikes
// built header with photographer datas

async function displayDataPhotographer() {
    dataPhotographer = await photographerfound();
    photographerName = dataPhotographer.name;

    const photographerData = photographerFactory(dataPhotographer);
    const userCardDOM = photographerData.getDataPhotographer();

    headerPagePhotographer.appendChild(userCardDOM.article);
    headerPagePhotographer.appendChild(userCardDOM.img);

// display tjm/day in box likes
    const {price} = dataPhotographer;

    const tjm = document.querySelector(".tjm");
    tjm.textContent = `${price}€/jour`;    

}

// 8-Display medias of photographer 
async function mediadisplay() {
    mediasPhotographer = await mediasPhotographerFound();

    /* sort by popularity default */
    mediasPhotographer.sort((a,b) => a.likes - b.likes);

    // card media with datas
    mediasPhotographer.forEach(media => {
        const mediasPhotographer = mediaFactory(media, photographerName);
        const mediaCard = mediasPhotographer.getMediaCardDOM();
        mediasSection.appendChild(mediaCard);
    } );

    /* display sum of likes in box likes */
    // .reduce = accumulator
    const sumLikes = mediasPhotographer.map(media => media.likes).reduce((prev, curr) => prev + curr, 0);
    const displaysumLikes = document.querySelector(".sum-likes");
    displaysumLikes.textContent = sumLikes;


    main.appendChild(mediasSection);

    document.querySelectorAll('.media-image').forEach(item => {
        item.addEventListener('click', lightbox)})
    
    document.querySelectorAll('.fa-heart').forEach(item => {
        item.addEventListener('click', addLikeUpdate)
    })
}



function init() {
    displayDataPhotographer();
    mediadisplay();
};
init(); 













