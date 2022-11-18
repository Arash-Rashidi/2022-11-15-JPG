import {loadPageByPromise} from './commonFunctions.js';

import Images from './objects/Images.js';
import {images} from './Objects/Images.js';
import Meme from './Objects/Meme.js';


export default class VueFormulaire{
    #vueHref = 'create.html';
    domRefElement = undefined;
    meme = undefined;
    #nodSelector
    constructor(nodSelector = '#wrapper'){
        this.#nodSelector = nodSelector;
    }
    #addEvents = () =>{}
    #loadingContent = () =>{}
    loadPage = (domRefWrapper) =>{
        const promiseImage = Images.fetch(); 
        const promiseHTMLTemplate = loadPageByPromise(this.#vueHref);
        Promise.all([promiseHTMLTemplate, promiseImage])
        .then(arrayRessources => {
            const container = arrayRessources[0];
            images.replaceContentImagesArray(arrayRessources[1]);
            this.#loadingContent();
            this.domRefElement = document.querySelector(this.#nodSelector);
            this.domRefElement.innerHTML = '';
            container.childNodes.forEach(elem => this.domRefElement.append(elem));
        });

    }
    changeMemeValue = (partialMemeData, evt) => {}
    onSubmitForm = (evt)=>{}
};