function setNavbarEvent() {
    document.getElementById('link-create').addEventListener('click', linkCreateEvt);
    document.getElementById('link-thumb').addEventListener('click', linkThumbnailEvt);
    document.getElementById('link-home').addEventListener('click', linkHomeEvt);
}
/**
 * gestion des active de navbar
 * @param {object} evt event declencheur 
 * @param {boolean} setActiveparentli mettre le parent actif ou non 
 */
function setActiveLinkInNavbar(evt, setActiveparentli = true) {
    var tousLesLi = document.querySelectorAll('nav>.navbar li');
    // for(var i=0;i<tousLesLi;i++){
    //     tousLesLi[i].classList.remove('active');
    // }
    tousLesLi.forEach(function (element) {
        element.classList.remove('active');
    })
    if (setActiveparentli) { evt.target.parentElement.classList.add('active'); }
}
function linkCreateEvt(evt) {
    //echapement du comportement par defaut de la balise déclenchant l'evenement 
    evt.preventDefault();
    console.log('fonction liens create', evt);
    setActiveLinkInNavbar(evt);

}
function linkHomeEvt(evt) {
    //echapement du comportement par defaut de la balise déclenchant l'evenement 
    evt.preventDefault();
    console.log('fonction liens home', evt);
    setActiveLinkInNavbar(evt, false);

}
function linkThumbnailEvt(evt) {
    //echapement du comportement par defaut de la balise déclenchant l'evenement 
    evt.preventDefault();
    console.log('fonction liens thumbnail', evt);
    setActiveLinkInNavbar(evt);
}