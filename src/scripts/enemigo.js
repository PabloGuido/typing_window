let tablas = require('./tablas');
let index = require('../index');

// console.log(tablas.restablecer_tablas)
var timer = 300
var resta = 1

export default class Enemigo extends Phaser.GameObjects.Container 

{
    constructor (scene, x, y, palabra, pos, fnc_igual_cero)
    {        
        super(scene); 
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
        // console.log("limpiar tablas")
        tablas.restablecer_tablas(this.posicion)
        // console.log(this.posicion)
        this.vida = 0;
        this.destroy();
        this.container.destroy();
        index.timer_creacion_de_grupo_enemigo()
    }

    restablecer_tablas(){


    }

    atacar(){


        
    }



    preUpdate(){
        // console.log('hola')
        if (this.vida > 0){
            this.timer -= resta
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



