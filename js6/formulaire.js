import {loadPageByPromise} from './commonFunctions.js';

import Images from './objects/Images.js';
import {images} from './Objects/Images.js';
import Meme from './Objects/Meme.js';


export default class VueFormulaire{
    #vueHref = 'create.html';
    domRefElement = undefined;
    meme = undefined;
    #nodSelector
    #container = undefined;
    constructor(nodSelector = '#wrapper'){
        this.#nodSelector = nodSelector;
    }
    #addEvents = () =>{}
    #loadingContent = () =>{
        const select =  this.#container.querySelector('select');
        //protection of multi execution of loading
        select.innerHTML = '';
        const noImg =document.createElement('option');
        noImg.value = -1;
        noImg.innerHTML = ' No Images';
        select.append(noImg);
        // loading all the options of images
        images.map(e =>{
            const option =document.createElement('option');
            option.value = e.id;
            option.innerHTML = e.titre;
            select.append(option);

        })

    }
    loadPage = (domRefWrapper) =>{
        const promiseImage = Images.fetch(); 
        const promiseHTMLTemplate = loadPageByPromise(this.#vueHref);
        Promise.all([promiseHTMLTemplate, promiseImage])
        .then(arrayRessources => {
            this.#container = arrayRessources[0];
            images.replaceContentImagesArray(arrayRessources[1]);
            this.#loadingContent();
            this.domRefElement = document.querySelector(this.#nodSelector);
            this.domRefElement.innerHTML = '';
            this.#container.childNodes.forEach(elem => this.domRefElement.append(elem));
        });

    }
    changeMemeValue = (partialMemeData, evt) => {}
    onSubmitForm = (evt)=>{}
};