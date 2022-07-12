let tablas = require('./tablas');
let este
// vars pantalla
let midX = 1280/2
let midY = 720/2

export default class Saloon extends Phaser.GameObjects.Container 

{
    constructor (scene, x, y)
    {   
        super(scene); 
        este = this
        //  saloon background 
        this.saloon_fondo = scene.add.image(0, 0, 'saloonBkg');

        this.saloon_container = scene.add.container(x, y, [this.saloon_fondo]);

        this.graficos = scene.add.graphics();
        // this.graficos.fillStyle(0xff0000, 0);
        this.tabla_ventanas = []
        this.tabla_mask = []
        this.crear_ventanas(scene)

   
    }

    crear_ventanas(scene){
        // Crea las ventanas en sus respectivas posiciones y las mete en una array.
        let vX = 400
        let vY = 170
        let posiciones = [[-vX,-vY],[0,-vY],[vX,-vY],[-vX,vY-40],[vX,vY-40]]
        let posiciones_box = [[-vX,-50],[0,-50],[vX,-50],[-vX,250],[vX,250]]

        for (let i = 0; i < 5; i++){
            this.ventana = scene.add.image(posiciones[i][0], posiciones[i][1], 'ventana');

            // este.ventana = scene.add.image(posiciones[i][0],posiciones[i][1], 'ventana');
            this.ventana.pos = i
            // este.palabra_box = scene.add.image(posiciones_box[i][0],posiciones_box[i][1], 'palabra');
            // ------
            // this.debug = this.graficos.fillRect(posiciones[i][0]-110, posiciones[i][1]-125, 230, 250);
            this.shape = scene.make.graphics().fillRect(midX + posiciones[i][0]-110, midY + posiciones[i][1]-125, 230, 290);
            this.mask = this.shape.createGeometryMask();
            
            this.saloon_container.add(this.ventana)  
            // this.saloon_container.add(this.debug)   
            // this.saloon_container.add(this.shape)  

            // este.saloon_container.add(este.palabra_box)
            this.tabla_ventanas.push(this.ventana)
            tablas.tabla_mask[i] = this.mask
            // this.tabla_mask.push(this.mask)
        }
        // console.log(tablas.tabla_mask)
    }

    crear_masks(scene){


        
        
    }

}