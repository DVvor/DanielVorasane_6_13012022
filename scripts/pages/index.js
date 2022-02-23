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

        
        // et bien retourner le tableau photographers seulement une fois
        // ...afficher tous les éléments du tableau
        return ({
            photographers: [...dataPhotographers.photographers]
        })
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
    