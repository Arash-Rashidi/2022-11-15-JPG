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
    loadPage('home.html');
}
function linkThumbnailEvt(evt) {
    //echapement du comportement par defaut de la balise déclenchant l'evenement
    evt.preventDefault();
    console.log("fonction liens thumbnail", evt);
    setActiveLinkInNavbar(evt);
    loadPage('thumbnail.html');
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
