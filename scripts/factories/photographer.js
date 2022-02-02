function photographerFactory(data) {
    const { name, id, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;


    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const localisation = document.createElement ('h3');
        localisation.textContent = `${city} , ${country}`;
        
        const slogan = document.createElement ('p');
        slogan.classList.add("slogan");
        slogan.textContent = tagline;

        const tjm = document.createElement ('p');
        tjm.classList.add("tjm");
        tjm.textContent = `${price}€/jour`;

        const link = document.createElement ('a');
        link.href = `photographer.html?id=${id}&name=toto`;
        link.title = "photographer page";
        link.classList.add("link");
        
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(localisation);
        article.appendChild(slogan);
        article.appendChild(tjm);
        article.appendChild(link);

        // article.appendChild();
        return (article);
    }
    // return { name, picture, getUserCardDOM }
    return { getUserCardDOM }
}


