/**
 * Fonction de loader de js pour suppression du bandeau js loaded
 */
function loadJS() {
    var divJsIsLoaded = document.querySelector('#js-is-loaded');
    console.log(divJsIsLoaded);
    //manip dom de supression du noeud dans la structure affichée
    divJsIsLoaded.remove();
    setNavbarEvent();
}

//declenchement de loadjs uniquement aprees chargement du dom complet
document.addEventListener('DOMContentLoaded',loadJS);