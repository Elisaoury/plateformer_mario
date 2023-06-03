import {zone_1} from "./assets/zone_1.js";
import {sceneDebut} from "./assets/debut.js";


var config = 
{
    type: Phaser.AUTO,
        scale:{
            width: 1320, 
            height: 1000,

    },
    

    physics: {
        default: 'arcade',
        arcade: 
        {
            gravity: { y:700},
            debug: true
        }
    },
    
    scene:[sceneDebut,zone_1]


};

new Phaser.Game(config);




                    


          
