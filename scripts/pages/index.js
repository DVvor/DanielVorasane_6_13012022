    async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json

        const dataPhotographers = await fetch("data/photographers.json")
        .then(function(result) {
        if (result.ok) {
            return result.json();
            }
        })
// .Json() permet de transformer le resultat de fetch en object Javascript
        // .then (function(value) {
        //     console.log(value);
        // });
// permet d'afficher le résultat

        .catch(function(error) {  
            console.log(error);  
        });
         
        // const photographers = [
        //     {
        //         "name": "Ma data test",
        //         "id": 1,
        //         "city": "Paris",
        //         "country": "France",
        //         "tagline": "Ceci est ma data test",
        //         "price": 400,
        //         "portrait": "account.png"

               

        //     },
        //     {
        //         "name": "Autre data test",
        //         "id": 2,
        //         "city": "Londres",
        //         "country": "UK",
        //         "tagline": "Ceci est ma data test 2",
        //         "price": 500,
        //         "portrait": "account.png"
        //     }
        // ]

// https://openclassrooms.com/fr/courses/5543061-ecrivez-du-javascript-pour-le-web/5577591-recuperez-des-donnees-dun-service-web
        
        // et bien retourner le tableau photographers seulement une fois
        // ...afficher tous les éléments du tableau
        return ({
            photographers: [...dataPhotographers.photographers]})
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    