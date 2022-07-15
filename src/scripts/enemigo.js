let tablas = require('./tablas');
let index = require('../index');
let este
// console.log(tablas.restablecer_tablas)
var timer = 300
var resta = 1

export default class Enemigo extends Phaser.GameObjects.Container 

{
    constructor (scene, x, y, palabra, pos, mask2)
    {        
        super(scene); 
        this.escena = scene
        this.enemy = scene.add.image(0,245,'enemigo')
        this.este = this
        // tween target 50
        this.x = x
        this.y = y
        this.timer = timer
        this.barra =  scene.add.rectangle(0, -100, 202, 32, 0x500050)

        this.r1 = scene.add.rectangle(-103, 127, 200, 38, 0x000000).setOrigin(0,0);
        this.r2 = scene.add.rectangle(-103, 126, 200, 45, 0xffffff).setOrigin(0,0);

        this.text = scene.add.text(-100, 130, palabra, {fontSize: '32px', fontStyle: 'bold', color: "#ffffff"}).setOrigin(0,0)
        this.textColor = scene.add.text(-100, 130, "", {fontSize: '32px', fontStyle: 'bold', color: "#ff0000"}).setOrigin(0,0)
        this.container = scene.add.container(x, y, [this.enemy, this.barra, this.r2, this.r1, this.text, this.textColor])

        this.tipo = 'enemigo'
        this.nombre = 'Medusa'
        this.vida = 1
        this.fuerza_de_ataque = 1 
        this.sonido_ataque = scene.sound.add('del', {volume: 0.25});
        this.posicion = pos
        this.mask = mask2
        this.container.setMask(mask2)
        this.tween_aparecer_desde_abajo(scene)

    }



    eliminacion_final(){
        tablas.restablecer_tablas(este.posicion)
        este.destroy();
        este.container.destroy();
        index.timer_creacion_de_grupo_enemigo()

    }

    eliminar(escena){
        // console.log("limpiar tablas")
        // tablas.restablecer_tablas(this.posicion)
        // console.log(this.posicion)
        this.vida = 0;
        let este2 = this.este
        let tween = escena.tweens.add({
            targets: this.enemy,
            y: 245,
            duration: 200,
            ease: 'Power1',
            repeat: false,
            onComplete: function () {
                tablas.restablecer_tablas(este2.posicion)
                este2.destroy();
                este2.container.destroy();
                index.timer_creacion_de_grupo_enemigo()
                // tween.stop();
                
            }         

        });
        // this.destroy();
        // this.container.destroy();
        // index.timer_creacion_de_grupo_enemigo()


    }

    tween_aparecer_desde_abajo(escena){
        this.tween = escena.tweens.add({
            targets: this.enemy,
            y: 50,
            duration: 895,
            ease: 'Power2',
        });

    }

    atacar(){


        
    }



    preUpdate(){
        // console.log('hola')
        if (this.vida > 0){
            this.timer -= resta
            this.barra.width = ((this.timer * 100)/timer) / 0.5
            // this.text.text = this.timer
            if (this.timer < 0 && this.vida > 0){
                // this.timer = timer
                console.log('Timer out: eliminar enemigo.')
                this.eliminar(this.escena)


            }
        }
        // super.preUpdate()   // ?      
        // this.setPosition()
        // console.log('test enemigo')
    }
}



