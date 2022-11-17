function MachineACafee(volumeBacAEau,volumeCafeMax){
    var tempOfWaterMax=65;

    function allumagePompe(){
        console.log('allumage pompe a eau');
        this.volumeCafeCoule=this.niveauEau;
        this.niveauEau=0;
    }
    function allumageResistance(){
        console.log('allumage resistance chauffante');
    }
    //public section 

    this.niveauEau=0;
    this.volumeCafeCoule=0;
    this.volumePoudreCafe=0;

    this.allumage=function(){
        console.log('allumage general de la machine', this);
        allumageResistance();
        ///attente
        allumagePompe();
    }

    console.log('construction achevée');
    return true;
}
//instanciation d'une machine fonctionnelle
var machine= new MachineACafee(1.2,1.5);


//update des valeurs public de l'objets 
machine.volumeCafeCoule=0;
machine.volumePoudreCafe=1.0;
machine.niveauEau=1.0;

//execution de fonction public
machine.allumage();