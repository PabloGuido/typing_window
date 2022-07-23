export default class Ui

{
    constructor (scene, puntos, vidas)
    {        

        this.puntos = scene.add.text(640, 450, "puntos \n" + puntos, {fontSize: '32px', fontStyle: 'bold', color: "#000000",  align: 'center' }).setOrigin(0.5,0)
        this.vidas = scene.add.text(640, 525, "vidas \n ♥ ♥ ♥", {fontSize: '32px', fontStyle: 'bold', color: "#000000",  align: 'center' }).setOrigin(0.5,0)
        this.start_rect = scene.add.rectangle(0, 0, 148*2, 148, 0x000000)

        this.container = scene.add.container(640, 360)
        this.container.depth = 0.2
        this.crear_tapas(scene);
        this.container.add(this.start_rect) 
    }
    actualizar_puntos(puntos)
    {
        this.puntos.text = "puntos \n" + puntos
    }
    actualizar_vidas()
    {
        this.vidas.text = this.vidas.text.slice(0, -2); 

    }
    crear_tapas(scene){
        // Crea las tapas en sus respectivas posiciones y las mete en una array.
        let vX = 400
        let vY = 170
        let posiciones = [[-vX,-vY],[0,-vY],[vX,-vY],[-vX,vY-40],[vX,vY-40]]
        let posiciones_box = [[-vX,-50],[0,-50],[vX,-50],[-vX,250],[vX,250]]

        for (let i = 0; i < 5; i++){

            this.tapa = scene.add.rectangle(posiciones[i][0], posiciones[i][1], 200, 244, 0xff0000).setAlpha(0.85);
            this.tapa_palabra = scene.add.rectangle(posiciones[i][0], posiciones[i][1]+150, 200, 44, 0xff00ff).setAlpha(0.85);
            this.tapa.pos = i            
            this.container.add(this.tapa);  
            this.container.add(this.tapa_palabra);
        }
        // console.log(tablas.tabla_mask)
    }

}