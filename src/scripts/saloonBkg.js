let este
export default class Saloon extends Phaser.GameObjects.Container 

{
    constructor (scene, x, y)
    {   
        super(scene); 
        este = this
        //  saloon background 
        this.saloon_fondo = scene.add.image(0, 0, 'saloonBkg');
        this.saloon_container = scene.add.container(x, y, [this.saloon_fondo]);
        this.crear_ventanas(scene)
        
    }

    crear_ventanas(scene){
        let vX = 400
        let vY = 150
        este.ventana_0 = scene.add.image(-vX,-vY, 'ventana');
        este.ventana_0.pos = 0
        este.ventana_1 = scene.add.image(0,-vY, 'ventana');
        este.ventana_2 = scene.add.image(vX,-vY, 'ventana');
        este.ventana_3 = scene.add.image(-vX,vY, 'ventana');
        este.ventana_4 = scene.add.image(vX,vY, 'ventana');
        este.palabra_box_0 = scene.add.image(-vX,-50, 'palabra');
        este.palabra_box_1 = scene.add.image(0,-50, 'palabra');
        este.palabra_box_2 = scene.add.image(vX,-50, 'palabra');
        este.palabra_box_3 = scene.add.image(-vX,250, 'palabra');
        este.palabra_box_4 = scene.add.image(vX,250, 'palabra');

        este.saloon_container.add(este.ventana_0)
        este.saloon_container.add(este.ventana_1)
        este.saloon_container.add(este.ventana_2)
        este.saloon_container.add(este.ventana_3)
        este.saloon_container.add(este.ventana_4)
        este.saloon_container.add(este.palabra_box_0)
        este.saloon_container.add(este.palabra_box_1)
        este.saloon_container.add(este.palabra_box_2)  
        este.saloon_container.add(este.palabra_box_3)
        este.saloon_container.add(este.palabra_box_4)
    }

}