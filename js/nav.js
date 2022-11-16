function setNavbarEvent() {
    document
        .getElementById("link-create")
        .addEventListener("click", linkCreateEvt);
    document
        .getElementById("link-thumb")
        .addEventListener("click", linkThumbnailEvt);
    document.getElementById("link-home").addEventListener("click", linkHomeEvt);
}
/**
 * gestion des active de navbar
 * @param {object} evt event declencheur
 * @param {boolean} setActiveparentli mettre le parent actif ou non
 */
function setActiveLinkInNavbar(evt, setActiveparentli = true) {
    var tousLesLi = document.querySelectorAll("nav>.navbar li");
    // for(var i=0;i<tousLesLi;i++){
    //     tousLesLi[i].classList.remove('active');
    // }
    tousLesLi.forEach(function (element) {
        element.classList.remove("active");
    });
    if (setActiveparentli) {
        evt.target.parentElement.classList.add("active");
    }
}
function linkCreateEvt(evt) {
    //echapement du comportement par defaut de la balise déclenchant l'evenement
    evt.preventDefault();
    console.log("fonction liens create", evt);
    setActiveLinkInNavbar(evt);
    loadPage("create.html", (nodeBase) =>{
        let form = nodeBase.querySelector('form');
        form.addEventListener('submit', (evt) =>{
            evt.preventDefault();
            console.log('form sent');
        })
    });
}
function linkHomeEvt(evt) {
    //echapement du comportement par defaut de la balise déclenchant l'evenement
    evt.preventDefault();
    console.log("fonction liens home", evt);
    setActiveLinkInNavbar(evt, false);
    fetch(`${REST_ADR}/memes`).then(r => r.json()).then(arr =>{
        loadPage('home.html');
        console.log(arr);
    })
    
}
function linkThumbnailEvt(evt) {
    //echapement du comportement par defaut de la balise déclenchant l'evenement
    evt.preventDefault();
    //console.log('function lien thu')
    console.log("fonction liens thumbnail", evt);
    setActiveLinkInNavbar(evt);
    const primages = fetch(`${REST_ADR}/images`).then(r=>r.json());
    const prememes = fetch(`${REST_ADR}/memes`).then(r=>r.json());
    Promise.all([primages,prememes])
    .then(arr => {
        images = arr[0];
        memes = arr[1];
        loadPage('thumbnail.html', container =>{
            const memeModelNode = container.querySelector('#meme-')
            memeModelNode.remove();
            memes.forEach(meme => {
                const memeNode = memeModelNode.cloneNode(true);
                memeNode.id = `meme-${meme.id}`;
                const imageDuMeme = images.find(img=>img.id === meme.imageId);
                memeNode.querySelector('image').setAttribute('xlink:href','/img/'+imageDuMeme.href);
                // the following line is a demonstration of not using if else.
                const text = memeNode.querySelector('text');
                text.style.texDecoration = meme.underline?'underline':'none';
                text.style.fontStyle = meme.underline?'italic':'none';
                text.style.fontWeight = meme.fontWeight;
                text.style.fontSize = meme.fontSize;
                text.style.fill = meme.color;
                memeNode.querySelector('svg').setAttribute('viewBox','0 0 '+imageDuMeme.w+' '+imageDuMeme.h);
                container.querySelector('#thumbnail').append(memeNode);
                console.log(imageDuMeme)
            })
        });
    })
    
}

/**
 *
 * @param {string} pageHref file name  of the page of the wrapper
 * @param {Function} callback a call back function to add eventListener
 */
function loadPage(pageHref, callback) {
    let pagePath = `/vues/${pageHref}`;
    fetch(pagePath)
        .then(function (resp) {
            return resp.text();
        })
        .then(function (html) {
            let wrapperNode= document.querySelector('#wrapper');
            wrapperNode.innerHTML = "";
            /* let parser = new DOMParser();
            let doc2 = parser.parseFromString(html, 'text/html');
            console.log(doc2); */
            let container = document.createElement('div');
            container.innerHTML = html;
            if (undefined !== callback && typeof(callback) === 'function' ){ // it is better to write like this in the condition
                callback(container)
            };
            container.childNodes.forEach(element => {
                wrapperNode.append(element);
            });

            return html;
        });
}
