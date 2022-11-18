class MachineACafe {
    //private avec #
    #tempOfWaterMax;
    //public
    niveauEau = 0;
    volumeCafeCoule = 0;
    volumePoudreCafe = 0;

    constructor(volumeMaxBacAEau, volumeMaxCafe) {
        this.bacEauMax = volumeMaxBacAEau;
        this.volumeMaxCafe = volumeMaxCafe;
        this.#tempOfWaterMax = 65;
    }
    #allumagePompe = () => {
        console.log('allumage pompe a eau');
        this.volumeCafeCoule = this.niveauEau;
        this.niveauEau = 0;
    }
    #allumageResistance = () => {
        console.log('allumage resistance chauffante');
    }
    //public section 


    cleanMachine = () => {
        console.log('netoyyage de la machine', this);
        this.niveauEau = 0;
        this.volumePoudreCafe = 0;
        this.volumeCafeCoule = 0;

    }
    allumage = () => {
        console.log('allumage general de la machine', this);
        this.#allumageResistance();
        ///attente
        this.#allumagePompe();
    }
}
function MachineACafeFactory(volumeBacMax, VolumeVerreMax) {
    return new MachineACafe(volumeBacMax, VolumeVerreMax);
}

let machine = new MachineACafe(1.5, 1.7);
let machineByFactory = MachineACafeFactory(1.5, 2);

//update des valeurs public de l'objets 
machine.volumeCafeCoule = 0;
machine.volumePoudreCafe = 1.0;
machine.niveauEau = 1.0;

//execution de fonction public
machine.allumage();

console.log(machine);

console.log('%c%s', 'color:red;font-size:32pt', 'passage à la dosette');
/**
 * 
 */
class MachineADosette extends MachineACafe {
    /**
     * 
     * @param {*} vbacmax 
     * @param {*} vvolmax 
     */
    constructor(vbacmax, vvolmax) {
        super(vbacmax, vvolmax);
    }
    /*
    //equiv de decl par function 
    function dd(d){}
    dd=function(){}
    */
    chargerDosette = (d)=> {
        this.volumePoudreCafe=d.vcafe ;
        //innaccessible this.#allumageResistance();
        //innaccessible super.#allumageResistance();
    }
}

class Dosette {
    constructor() { }
    vcafe = 0.3;
}
const machineD = new MachineADosette(1.5, 0.3);
machineD.chargerDosette(new Dosette());
machine.allumage();
console.log(machineD);