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
    const findPhotographerByID = photographers.find(photographer => photographer.id == photographerId);
    
    // console.log(findPhotographerByID);
    return findPhotographerByID;
}  

photographerfound();

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
