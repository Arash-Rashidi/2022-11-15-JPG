class Meme{
    #serveurRessourceUrl = undefined;

    #image = {};
    fontSize = 10;
    fontWeight = "900";
    text = "";
    x= 0;
    y= 7;
    color = '#ACACAC';
    underline = false;
    italic  = false;
    titre = "";
    imageId = -1;

    constructor(serveurRessourceUrl = '/memes'){
        this.#serveurRessourceUrl = serveurRessourceUrl;
    }

    renderSvg = ()=> {
        const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
        svg.setAttribute( 'height' ,'100%');
        svg.setAttribute( 'width' ,'100%');
        svg.setAttribute( 'viewBox' ,typeof this.image === 'object' && this.image.w && this.image.h ? 
        ` 0 0 ${this.image.w} ${this.image.h}` :'0 0 1000 1000');

        if(this.image && this.image.href){
            const img =  document.createElementNS('http://www.w3.org/2000/svg','image');
            img.setAttribute('x',0);
            img.setAttribute('y',0);
            img.setAttributeNS('http://www.w3.org/1999/xlink','href','/img/'+ this.image.href);
            svg.append(img);

        }
        
        const text = document.createElementNS('http://www.w3.org/2000/svg','text');
        text.setAttribute('x',this.x);
        text.setAttribute('y',this.y);
        text.style.texDecoration = this.underline?'underline':'none';
        text.style.fontStyle = this.italic?'italic':'none';
        text.style.fontWeight = this.fontWeight;
        text.style.fontSize = this.fontSize;
        text.style.fill = this.color;
        text.innerHTML = this.text;
        svg.append(text);

        return svg;
    }
    
    setImage = (imageId, imgList) => {
            const imgIdConverted = Number(imageId);
            if(!Number.isInteger(imgIdConverted)){
                this.#image = undefined;
                this.imageId = -1;
                return;
            }
            this.#image = imgList.find(img => imgIdConverted);
            this.imageId = imgIdConverted;
    }
    save = ()=> {

    }
}