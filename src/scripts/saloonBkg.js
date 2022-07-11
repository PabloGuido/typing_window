let este

export default class Saloon extends Phaser.GameObjects.Container 

{
    constructor (scene, x, y)
    {   
        super(scene); 
        este = this
        //  saloon background 
        // this.saloon_fondo = scene.add.image(0, 0, 'saloonBkg');
        this.saloon_fondo = scene.make.image({
            x: 0,
            y: 0,
            key: 'saloonBkg',
            add: true,
        });
        this.saloon_container = scene.add.container(x, y, [this.saloon_fondo]);
        this.tabla_ventanas = []
        this.crear_ventanas(scene)
        
    }

    crear_ventanas(scene){
        // Crea las ventanas en sus respectivas posiciones y las mete en una array.
        let vX = 400
        let vY = 170
        let posiciones = [[-vX,-vY],[0,-vY],[vX,-vY],[-vX,vY-40],[vX,vY-40]]
        let posiciones_box = [[-vX,-50],[0,-50],[vX,-50],[-vX,250],[vX,250]]

        for (let i = 0; i < 5; i++){
            this.ventana = scene.make.image({
                x: posiciones[i][0],
                y: posiciones[i][1],
                key: 'ventana',
                add: false
            });
            // este.ventana = scene.add.image(posiciones[i][0],posiciones[i][1], 'ventana');
            este.ventana.pos = i
            // este.palabra_box = scene.add.image(posiciones_box[i][0],posiciones_box[i][1], 'palabra');
            este.saloon_container.add(este.ventana)
            // este.saloon_container.add(este.palabra_box)
            este.tabla_ventanas.push(este.ventana)
        }

    }

}