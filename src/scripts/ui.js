export default class Ui

{
    constructor (scene, puntos, vidas)
    {        

        this.puntos = scene.add.text(640, 450, "puntos \n" + puntos, {fontSize: '32px', fontStyle: 'bold', color: "#000000",  align: 'center' }).setOrigin(0.5,0)
        this.vidas = scene.add.text(640, 525, "vidas \n ♥ ♥ ♥", {fontSize: '32px', fontStyle: 'bold', color: "#000000",  align: 'center' }).setOrigin(0.5,0)
    }
    actualizar_puntos(puntos)
    {
        this.puntos.text = "puntos \n" + puntos
    }
    actualizar_vidas()
    {

        this.vidas.text = this.vidas.text.slice(0, -2); 


    }

}