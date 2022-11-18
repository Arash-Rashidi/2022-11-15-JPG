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
    this.cleanMachine=function(){
        console.log('netoyyage de la machine', this);
       this.niveauEau=0;
       this.volumePoudreCafe=0;
        this.volumeCafeCoule=0;

    }
    this.allumage=()=>{
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


function Cuisine(){
   
    this.coffeeMachine = null;
    this.oven = null;
    
    this.netoyage=null;
    this.routineMatinal=null;
}

var cuisine= new Cuisine();
cuisine.coffeeMachine=machine;


//pas besoin de binding pour la 
//delegation de function car la declaration est effectuée par arrow function
cuisine.routineMatinal=machine.allumage

//declaration de la fonction interne grace au mot clef function 
//necessite de binder le context pour que le this de la function 
//reste bien la machine (possibilité de binder autre chose dans le this)
cuisine.netoyage=(machine.cleanMachine).bind(machine);



console.log('%c%s','color:red;font-size:32pt','passage à l\'objet cuisine');
//il est 8h 
cuisine.routineMatinal();
cuisine.netoyage();
console.log(cuisine);

//surcharge d'un type existant avec ajout 
//a toutes les instances deja existante et les nouvelles instance 
var chaine="chaine";
String.prototype.sub2=function(){return this.substr(2)};
chaine.sub2();