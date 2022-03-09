function photographerFactory(data, type) {
    const { name, id, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;

    if (type === "thumbnailIndex") {
        return {getUserCardDOM}
    }

    if (type === "pagePhotographer") {
        return {getDataPhotographer }
    }

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const localisation = document.createElement ('p');
        localisation.textContent = `${city} , ${country}`;
        
        const slogan = document.createElement ('p');
        slogan.classList.add("slogan");
        slogan.textContent = tagline;

        const tjm = document.createElement ('p');
        tjm.classList.add("tjm");
        tjm.textContent = `${price}€/jour`;

        const link = document.createElement ('a');
        link.href = `photographer.html?id=${id}`;
        link.title = name;
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

    function getDataPhotographer() {

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
        img.setAttribute("alt", name);
        
        article.appendChild(h1);
        article.appendChild(localisation);
        article.appendChild(slogan);

        return ({article, img});
    }

}