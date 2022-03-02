//Mettre le code JavaScript lié à la page photographer.html
const photographerId = getParameterId();
const mainPagePhotographer = document.querySelector(".photograph-header")
const main = document.querySelector("main");
let select = document.querySelector(".select-selected");
let selected = document.querySelector('.select-selected');
let selectTwo = document.querySelector('.select-two');
let selectThree = document.querySelector('.select-three');
let arrow = document.querySelector('.fa-angle-up');
const listbox = document.querySelector('.dropdown');
let heart = document.querySelectorAll("fa-heart");
const modal = document.getElementById("contact_modal");


const mediasSection = document.createElement("div");
    mediasSection.classList.add('medias-section');

let mediasPhotographer = [];
let totalLike = mediasPhotographer.likes;
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
        mediasSection.appendChild(mediaCardDom);
    } );

    /* display sum of likes  */
    const sumLikes = mediasPhotographer.map(media => media.likes).reduce((prev, curr) => prev + curr, 0);
    const displaysumLikes = document.querySelector(".sum-likes");
    displaysumLikes.textContent = sumLikes;


    main.appendChild(mediasSection);

    document.querySelectorAll('.media-image').forEach(item => {
        item.addEventListener('click', lightbox)

    })

}


function init() {
    displayDataPhotographer();
    mediadisplay();

};
init(); 



/* Sort medias by  */
function sortmedia() {

    const {name} = dataPhotographer;
    const mediaSection = document.querySelector(".medias-section");


    if (select.textContent == "Popularité") {
        mediasPhotographer.sort((a,b) => a.likes - b.likes); 
    } 
    if (select.textContent == "Date") {
        mediasPhotographer.sort((a, b) => a.date.localeCompare(b.date));
    }
    if (select.textContent == "Titre") {
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

/* create lightbox */
function lightbox(event){

    const content = document.createElement("div");
        content.classList.add('lightbox');
        content.setAttribute('role', 'dialog');

    currentSource = event.target.getAttribute('src')
    // const currentMedia = mediasPhotographer.filter(media => currentSource.includes(media.image || media.video ));
    let currentMediaIndex = mediasPhotographer.findIndex(media => currentSource.includes(media.image || media.video ));
    let mediaToDisplay = mediasPhotographer[currentMediaIndex]
    if (mediaToDisplay.hasOwnProperty('video')) {
        const mediaLargeSize = document.createElement("video");
        mediaLargeSize.classList.add('media-large');
        mediaLargeSize.setAttribute("src", currentSource);
        mediaLargeSize.setAttribute("aria-label", "video close-up view");
        mediaLargeSize.setAttribute('role', 'video');
        mediaLargeSize.setAttribute("controls", 'controls');
        mediaLargeSize.setAttribute("title", mediaToDisplay.title);
        content.appendChild(mediaLargeSize);
    } else if (mediaToDisplay.hasOwnProperty('image')) {
        const mediaLargeSize = document.createElement("img");
        mediaLargeSize.classList.add('media-large');
        mediaLargeSize.setAttribute('role', 'img');
        mediaLargeSize.setAttribute("src", currentSource);
        mediaLargeSize.setAttribute("title", mediaToDisplay.title);
        mediaLargeSize.setAttribute("aria-label", "image close-up view");
        content.appendChild(mediaLargeSize);
    }

    const title = document.createElement("p");
        title.classList.add('title');
        title.textContent = mediaToDisplay.title;

    const iconeClose = document.createElement("i");
        iconeClose.classList.add('fas','fa-times');
        iconeClose.classList.add('icone-close-lightbox');
        iconeClose.setAttribute("tabindex", "0");
        iconeClose.setAttribute("aria-label", "close");
        iconeClose.setAttribute("role", "close dialog");


        iconeClose.addEventListener("click", closeLightbox);

    
    const previous = document.createElement("i");
        previous.classList.add('fas','fa-chevron-left');
        previous.setAttribute("tabindex", "0");
        previous.setAttribute("aria-label", "previous media");
        previous.setAttribute("role", "link");

        previous.addEventListener("click", previousmedia);

    const next = document.createElement("i");
        next.classList.add('fas','fa-chevron-right');
        next.setAttribute("tabindex", "0");
        next.setAttribute("aria-label", "next media");
        next.setAttribute("role", "link");


        next.addEventListener("click", nextmedia);

    main.appendChild(content);
        content.appendChild(title);
        content.appendChild(next);
        content.appendChild(previous);
        content.appendChild(iconeClose);

    main.setAttribute("aria-hidden" , "false");
    listbox.setAttribute("tabindex","-1");
    btnContactButton.setAttribute("tabindex","-1");
    logoLink.setAttribute("tabindex","-1");
    // document.getElementById("selected").setAttribute("tabindex","-1");
    document.querySelectorAll(".media-image").forEach(elem => elem.setAttribute("tabindex", "-1"));
    document.querySelectorAll(".fa-heart").forEach(elem => elem.setAttribute("tabindex", "-1"));
}

function nextmedia() {
    const content = document.querySelector(".lightbox");
    let mediaLargeSize = document.querySelector('.media-large');
    let mediaLargeSizeSrc = mediaLargeSize.src;
    let title = document.querySelector('.title');

    currentMediaIndex = mediasPhotographer.findIndex(media => mediaLargeSizeSrc.includes(media.image ||media.video ));
    
    //add index +1
    currentMediaIndex++
    

    // If last index, return to first index
    if (currentMediaIndex == mediasPhotographer.length) {
        currentMediaIndex = 0;
    }
    
    let nextMediaToDisplay = mediasPhotographer[currentMediaIndex];


    content.removeChild(title);
    content.removeChild(mediaLargeSize);

    const source = `assets/SamplePhotos/${photographerName}/${nextMediaToDisplay.image || nextMediaToDisplay.video}`;

    if (nextMediaToDisplay.hasOwnProperty('video')) {
        const mediaLargeSize = document.createElement("video");
        mediaLargeSize.classList.add('media-large');
        mediaLargeSize.setAttribute("aria-label", "video close-up view");
        mediaLargeSize.setAttribute('role', 'video');
        mediaLargeSize.setAttribute("src", source);
        mediaLargeSize.setAttribute("controls", 'controls');
        content.appendChild(mediaLargeSize);
    } else if (nextMediaToDisplay.hasOwnProperty('image')) {
        const mediaLargeSize = document.createElement("img");
        mediaLargeSize.classList.add('media-large');
        mediaLargeSize.setAttribute('role', 'img');
        mediaLargeSize.setAttribute("aria-label", "image close-up view");
        mediaLargeSize.setAttribute("src", source);
        content.appendChild(mediaLargeSize);
    }

    const nextMediaTitle = document.createElement("p");
    nextMediaTitle.classList.add('title');
    nextMediaTitle.textContent = nextMediaToDisplay.title;
    content.appendChild(nextMediaTitle);
}

function previousmedia() {
    const content = document.querySelector(".lightbox");
    let mediaLargeSize = document.querySelector('.media-large');
    let mediaLargeSizeSrc = mediaLargeSize.src;
    let title = document.querySelector('.title');


    let currentMediaIndex = mediasPhotographer.findIndex(media => mediaLargeSizeSrc.includes(media.image || media.video ));

    currentMediaIndex -= 1
    if (currentMediaIndex < 0) {
        currentMediaIndex = mediasPhotographer.length - 1;
    }

    let previousMediaToDisplay = mediasPhotographer[currentMediaIndex];

    content.removeChild(title);
    content.removeChild(mediaLargeSize);

    const source = `assets/SamplePhotos/${photographerName}/${previousMediaToDisplay.image || previousMediaToDisplay.video}`;

    if (previousMediaToDisplay.hasOwnProperty('video')) {
        const mediaLargeSize = document.createElement("video");
        mediaLargeSize.classList.add('media-large');
        mediaLargeSize.setAttribute("aria-label", "video close-up view");
        mediaLargeSize.setAttribute('role', 'video');
        mediaLargeSize.setAttribute("src", source);
        mediaLargeSize.setAttribute("controls", 'controls');
        content.appendChild(mediaLargeSize);
    } else if (previousMediaToDisplay.hasOwnProperty('image')) {
        const mediaLargeSize = document.createElement("img");
        mediaLargeSize.classList.add('media-large');
        mediaLargeSize.setAttribute('role', 'img');
        mediaLargeSize.setAttribute("aria-label", "image close-up view");
        mediaLargeSize.setAttribute("src", source);
        content.appendChild(mediaLargeSize);
    }

    const nextMediaTitle = document.createElement("p");
    nextMediaTitle.classList.add('title');
    nextMediaTitle.textContent = previousMediaToDisplay.title;
    content.appendChild(nextMediaTitle);
}


function closeLightbox() {        
    const content = document.querySelector('.lightbox');
    main.removeChild(content)

    main.setAttribute("aria-hidden" , "true");
    listbox.setAttribute("tabindex","0");
    btnContactButton.setAttribute("tabindex","0");
    logoLink.setAttribute("tabindex","0");
    // document.getElementById("selected").setAttribute("tabindex","-1");
    document.querySelectorAll(".media-image").forEach(elem => elem.setAttribute("tabindex", "0"));
    document.querySelectorAll(".fa-heart").forEach(elem => elem.setAttribute("tabindex", "0"));
}


function openDropdown() {
    
    selected.style.borderRadius = '5px 5px 0px 0px';
    selectThree.style.borderRadius = '0px 0px 5px 5px';

    selectTwo.style.display = 'block';
    selectThree.style.display = 'block';
    
    arrow.classList.replace("fa-angle-up","fa-angle-down");

    listbox.setAttribute("aria-expanded",'true');
    selected.setAttribute("tabindex", "0");
    selectTwo.setAttribute("tabindex", "0");
    selectThree.setAttribute("tabindex", "0");

    logoLink.setAttribute("tabindex","-1");
    listbox.setAttribute("tabindex","-1");
    document.querySelectorAll(".media-image").forEach(elem => elem.removeAttribute("tabindex"));
    document.querySelectorAll(".fa-heart").forEach(elem => elem.removeAttribute("tabindex"));
    btnContactButton.setAttribute("tabindex","-1");

}

function closeDropdown(event) {

    const arrowUp = document.querySelector('.fa-angle-up')
    const arrowDown = document.querySelector('.fa-angle-down')
    

    if(event.target != selected && event.target != arrowDown && event.target != arrowUp) {
        selectTwo.style.display = 'none';
        selectThree.style.display = 'none';
        selected.style.borderRadius = '5px';
        listbox.setAttribute("aria-expanded","false");

    }
    logoLink.setAttribute("tabindex","0");
    listbox.setAttribute("tabindex","0");
    document.querySelectorAll(".media-image").forEach(elem => elem.setAttribute("tabindex","0"));
    document.querySelectorAll(".fa-heart").forEach(elem => elem.setAttribute("tabindex","0"));
    btnContactButton.setAttribute("tabindex","0");
}
selected.addEventListener("click", openDropdown)
// document.addEventListener("click", closeDropdown)

function chooseSelect(event) {

    const valeurEvent = event.target.textContent;

    if (valeurEvent == "Popularité") {
        selected.textContent = "Popularité";
        selectTwo.textContent = "Date";
        selectThree.textContent = "Titre";
    } else if (valeurEvent == "Date") {
        selected.textContent = "Date";
        selectTwo.textContent = "Popularité";
        selectThree.textContent = "Titre";
    } else if (valeurEvent == "Titre") {
        selected.textContent = "Titre";
        selectTwo.textContent = "Popularité";
        selectThree.textContent = "Date";
    }
    selectTwo.style.display = 'none';
    selectThree.style.display = 'none';
    selected.removeAttribute("tabindex", "0");
    selectTwo.removeAttribute("tabindex", "0");
    selectThree.removeAttribute("tabindex", "0");

    selected.style.borderRadius = '5px';
    const arrowUp = document.createElement("i");
    arrowUp.classList.add("arrow","fas","fa-angle-up");
    selected.appendChild(arrowUp);

    sortmedia()
}
selectTwo.addEventListener("click", chooseSelect)
selectThree.addEventListener("click", chooseSelect)


/* DOM */
const logoLink = document.getElementById("logo-link");
const mediaImage = document.querySelectorAll(".media-image");
const btnCloseModal = document.querySelector(".close");
const btnContactButton = document.querySelector(".contact_button");

/* Focus accessibilty */
document.addEventListener("keydown", (event)=>{

    if(event.key === "Enter"){

/***Accessibility lightbox*********************************************************************/

        if(event.target.className === "media-image"){
            lightbox(event);

            // main.setAttribute("aria-hidden" , "false");
            // listbox.setAttribute("tabindex","-1");
            // btnContactButton.setAttribute("tabindex","-1");
            // logoLink.setAttribute("tabindex","-1");
            // document.getElementById("selected").setAttribute("tabindex","-1");
            // document.querySelectorAll(".media-image").forEach(elem => elem.setAttribute("tabindex", "-1"));
            // document.querySelectorAll(".fa-heart").forEach(elem => elem.removeAttribute("tabindex", "-1"));

        } 
        if (event.target.className.includes("icone-close-lightbox")){
            closeLightbox()
            mediasSection.style.display="grid";
            listbox.style.display="block";
            btnContactButton.style.display="block";
            logoLink.style.display="block";
        }
        if(event.target.className === "fas fa-chevron-right"){
            nextmedia()
        }
        if(event.target.className === "fas fa-chevron-left"){
            previousmedia()
        }

/**********************************************************************************************/

/***Accessibility dropdown*********************************************************************/

        if(event.target.className === "dropdown"){
            openDropdown(event);
            document.querySelectorAll(".media-image").forEach(elem => elem.removeAttribute("tabindex"));
            document.querySelectorAll(".fa-heart").forEach(elem => elem.removeAttribute("tabindex"));
        } 

        if(event.target.className.includes("select")){
            chooseSelect(event);
            logoLink.setAttribute("tabindex","0");
            btnContactButton.setAttribute("tabindex","0");
            listbox.setAttribute("tabindex","0");

        }
/*********************************************************************************************/
/***Accessibility Modal**************************************************************/

        // if(event.target.className === "contact_button") {
            

        // }

        if(event.target.className === "close"){
            // alert("detect")
            main.setAttribute("aria-hidden" , "true");
            modal.style.display="none";

            // button and link accessible on main
            logoLink.setAttribute("tabindex","0");
            listbox.setAttribute("tabindex","0");
            document.querySelectorAll(".media-image").forEach(elem => elem.setAttribute("tabindex","0"));
            document.querySelectorAll(".fa-heart").forEach(elem => elem.setAttribute("tabindex","0"));
            document.querySelector(".contact_button").setAttribute("tabindex","0");
            document.querySelector(".close").removeAttribute("tabindex","-1");
        }
        if(event.target.className === "btnclose"){
            logoLink.setAttribute("tabindex","0");
            listbox.setAttribute("tabindex","0");
            document.querySelectorAll(".media-image").forEach(elem => elem.setAttribute("tabindex","0"));
            document.querySelectorAll(".fa-heart").forEach(elem => elem.setAttribute("tabindex","0"));
            document.querySelector(".contact_button").setAttribute("tabindex","0");
        }
    }

    if(event.key === "Escape") {
        closeModal();
        closeDropdown(event);
        closeLightbox();
    }
})