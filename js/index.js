/**
 * This is a function to take a div element and remove it.
 */
function loadJS() {

    alert('js charge');
    let divIsLoaded = document.querySelector('#js-is-loaded');
    console.log(divIsLoaded);


    /* divIsLoaded.innerHTML = 'JS Ok';
    divIsLoaded.style.backgroundColor = 'skyblue';
    divIsLoaded.style.color = 'white';
    divIsLoaded.style.textDocoration = 'underline pink'; */

    divIsLoaded.remove();

}

loadJS();

