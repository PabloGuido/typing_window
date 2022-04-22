var timer = 400 
export default class Enemigo extends Phaser.GameObjects.Container 

{
    constructor (scene, x, y, tabla)
    {        
        super(scene); 

        this.enemy = scene.add.image(0,0,'enemigo').setScale(3, 3).setOrigin(0,0)
        // this.enemy.x = 30
        // this.enemy.y = 30
        this.timer = timer
        this.barra =  scene.add.rectangle(0, 56, 64, 8, 0xffffff).setOrigin(0,0)
        // this.text = scene.add.text(10, 44, this.timer, {fontSize: '18px', fontStyle: 'bold'})
        this.container = scene.add.container(x, y, [this.enemy, this.barra ])
        this.tipo = 'enemigo'
        this.nombre = 'Medusa'
        this.vida = 3
        this.tabla = tabla
        
    }

    muerto(){
        let index = this.tabla.indexOf(this)
        this.tabla.splice(index, 1); 
        this.container.destroy()
        console.log(this.nombre + ' muerto')
    }
    recibir_danio(cantidad, dirX, dirY){
        this.vida = this.vida - cantidad
        console.log(this.nombre + ' vida restante: ' + this.vida)
        // Animación de recibir daño.
        this.enemy.setTint(0xff0000)
        this.scene.tweens.add({
            targets: this.enemy,
            tint: {value: 0xffffff, duration: 0, ease: 'Power0' },
            delay: 100,
        });
        // Bajar punto de vida y chequear muerte o devolver golpe.
        if (this.vida <= 0){
            this.muerto()
        }
        else{
            this.restaurar_timer()
            this.scene.tweens.add({
            targets: this.container.list[0],
                x: {value: -dirX/2, duration: 60, ease: 'Power0' },
                y: {value: -dirY/2, duration: 60, ease: 'Power0' },
                delay: 160,
                yoyo: true,
            });
        }
    }

    restaurar_timer(){
        this.timer = timer
    }

    preUpdate(){
        if (this.vida > 0){
            this.timer -= 1
            this.barra.width = ((this.timer * 100)/timer) / 1.64
            // this.text.text = this.timer
            if (this.timer < 0){
                this.timer = timer
            }
        }
        // super.preUpdate()   // ?      
        // this.setPosition()
        // console.log('test enemigo')
    }
}