//Mettre le code JavaScript lié à la page photographer.html

function getParameterId() { 
    const searchParams = new URLSearchParams(location.search);
    const paramsId = searchParams.get('id');

       return (paramsId);
} 


getParameterId();

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


async function displayData() {

    const dataPhotographer = await photographerfound();
    const { name, id, portrait, city, country, tagline, price } = dataPhotographer;
    const picture = `assets/photographers/${portrait}`;


    const mainPagePhotographer = document.querySelector(".photograph-header")
    
    //Card photographer
    const article = document.createElement( 'article' );
    article.classList.add('card')
    
    const h1 = document.createElement('h1');
    h1.textContent = name;
    
    const localisation = document.createElement ('p');
    localisation.classList.add('localisation');
    localisation.textContent = `${city} , ${country}`;
    
    const slogan = document.createElement ('p');
    slogan.classList.add('slogan');
    slogan.textContent = tagline;
    
    const img = document.createElement('img');
    img.setAttribute("src", picture);
    

    mainPagePhotographer.appendChild(article);
    article.appendChild(h1);
    article.appendChild(localisation);
    article.appendChild(slogan);

    mainPagePhotographer.appendChild(img);

}
displayData();

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

async function mediadisplay() {
    const mediasPhotographer = await mediasPhotographerFound();
    const dataPhotographer = await photographerfound();
    const {name} = dataPhotographer;
    const main = document.querySelector("main");
    
    const mediasection = document.createElement("div");
    mediasection.classList.add('medias-section');

    main.appendChild(mediasection);
    

    mediasPhotographer.forEach(media => {

    const { id, photographerId, title, image,video, likes, date, price } = media;
    const picture = `assets/SamplePhotos/${name}/${image || video}`;
        

    const cardmedia = document.createElement("div");
    cardmedia.classList.add('card-media');

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

    const cardmediatitle = document.createElement('div');
    cardmediatitle.classList.add('card-media-title');
    
    const h2 = document.createElement('h2');
    h2.textContent = title;

    const nbLikes = document.createElement('p');
    nbLikes.classList.add('nblikes');
    nbLikes.textContent = likes;


    
    cardmedia.appendChild(cardmediatitle);
    cardmediatitle.appendChild(h2);
    cardmediatitle.appendChild(nbLikes);

    mediasection.appendChild(cardmedia);

        });

}

mediadisplay();






