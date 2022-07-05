let tablas = require('./tablas');
// tablas.funcionTest()
var timer = 300

let este
export default class Enemigo extends Phaser.GameObjects.Container 

{
    constructor (scene, x, y, palabra, pos)
    {        
        super(scene); 
        este = this
        this.enemy = scene.add.image(0,0,'enemigo').setScale(0.85,0.85).setTint(0x55ff55)
        this.x = x
        this.y = y
        this.timer = timer
        this.barra =  scene.add.rectangle(56, -100, timer, 32, 0x500050)
        this.text = scene.add.text(-100, 85, palabra, {fontSize: '32px', fontStyle: 'bold', color: "#ffffff"}).setOrigin(0,0)
        this.textColor = scene.add.text(-100, 85, "", {fontSize: '32px', fontStyle: 'bold', color: "#000000"}).setOrigin(0,0)
        this.container = scene.add.container(x, y, [this.enemy, this.barra, this.text, this.textColor ])
        this.tipo = 'enemigo'
        this.nombre = 'Medusa'
        this.vida = 1
        this.fuerza_de_ataque = 1 
        this.sonido_ataque = scene.sound.add('del', {volume: 0.25});
        this.posicion = pos

    }

    eliminar(){

        this.vida = 0;
        this.destroy();
        this.container.destroy();
        this.limpiar_tablas()
        
        // console.log(este.limpiar_tablas)
    }

    limpiar_tablas(){
        console.log("limpiar tablas")
        tablas.numero_de_letra[este.posicion] = 0;
        tablas.palabras_a_escribir[este.posicion] = "!"
        tablas.enemigos_en[este.posicion] = 0
    }

    atacar(){


        
    }



    preUpdate(){
        // console.log('hola')
        if (this.vida > 0){
            this.timer -= 1
            this.barra.width = ((this.timer * 100)/timer) / 0.5
            // this.text.text = this.timer
            if (this.timer < 0){
                this.timer = timer
                // console.log('Timer out: eliminar enemigo.')
                this.eliminar()


            }
        }
        // super.preUpdate()   // ?      
        // this.setPosition()
        // console.log('test enemigo')
    }
}



