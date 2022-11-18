import {loadPageByPromise} from './commonFunctions.js';

import Images from './objects/Images.js';
import {images} from './Objects/Images.js';
import Meme, { currentMeme } from './Objects/Meme.js';


export default class VueFormulaire{
    #vueHref = 'create.html';
    domRefElement = undefined;
    meme = undefined;
    #nodSelector
    #container = undefined;
    #currentMeme = new Meme();
    constructor(nodSelector = '#wrapper'){
        this.#nodSelector = nodSelector;
    }
    #renderCurrent = ()=>{
        this.domRefElement.querySelector('svg').replaceWith(this.#currentMeme.renderSvg())
    }
    #ongenericinput = (evt)=>{
        evt.stopPropagation();
        const name = evt.target.name;
        this.#currentMeme[name] = evt.target.value;
        this.#renderCurrent();
        console.log(this.#currentMeme);
    }
    /**
     * add form event 
     * Attention : all html form elements must be already loaded in this.#container
     */
    #addEvents = () =>{
        // adding event listener to each input
        /* this.#container.querySelector('#meme_titre').addEventListener('input', this.#ongenericinput);
        this.#container.querySelector('#meme_text').addEventListener('input', this.#ongenericinput);
        this.#container.querySelector('#meme_x').addEventListener('input', this.#ongenericinput);
        this.#container.querySelector('#meme_y').addEventListener('input', this.#ongenericinput);
        this.#container.querySelector('#meme_fontSize').addEventListener('input', this.#ongenericinput);
        this.#container.querySelector('#meme_fontWeight').addEventListener('input', this.#ongenericinput);
        this.#container.querySelector('#meme_color').addEventListener('input', this.#ongenericinput); */
        this.#container.querySelectorAll('form input[type=text], form input[type=number], form input[type=color]')
        .forEach(e=>{e.addEventListener('input', this.#ongenericinput);})
        this.#container.querySelector('select').addEventListener('change', evt => {
            this.#currentMeme.setImage( Number(evt.target.value),images);
            this.#renderCurrent();
        })
    }
    
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
            this.#addEvents();
            this.domRefElement = document.querySelector(this.#nodSelector);
            this.domRefElement.innerHTML = '';
            this.#container.childNodes.forEach(elem => this.domRefElement.append(elem));
        });
    }
    changeMemeValue = (partialMemeData, evt) => {}
    onSubmitForm = (evt)=>{}
};