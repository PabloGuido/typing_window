var timer = 200 
let direcciones = [[0,-1],[1,0],[0,1],[-1,0]]
export default class Enemigo extends Phaser.GameObjects.Container 

{
    constructor (scene, x, y, tabla, objetivo, mapa)
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
        this.objetivo_hero = objetivo
        this.mapa = mapa
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
        // Animación de recibir daño. ---------------------------
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
            // this.scene.tweens.add({ // Animación que devuelve el golpe al hero
            // targets: this.container.list[0],
            //     x: {value: -dirX/2, duration: 60, ease: 'Power0' },
            //     y: {value: -dirY/2, duration: 60, ease: 'Power0' },
            //     delay: 160,
            //     yoyo: true,
            // });
        }
    }

    atacar(){
        for (let dirs of direcciones){
            let miPos = this.getLocalPoint(this.container.x,this.container.y)
            // console.log(miPos)
            miPos.x = miPos.x + dirs[0] * 64
            miPos.y = miPos.y + dirs[1] * 64
            // console.log(miPos)
            let heroPos = this.getLocalPoint(this.objetivo_hero.container.x,this.objetivo_hero.container.y )
            if (miPos.x === heroPos.x && miPos.y === heroPos.y){
                console.log('@' + this.nombre + ' ataca al hero.')

            this.scene.tweens.add({ // Animación que devuelve el golpe al hero
            targets: this.container.list[0],
                x: {value: dirs[0] * 32, duration: 60, ease: 'Power0' },
                y: {value: dirs[1] * 32, duration: 60, ease: 'Power0' },
                yoyo: true,
            });

            }
        }


        // console.log(this.objetivo_hero)
        if (this.container.x > this.objetivo_hero.container.x){
            // console.log('A la derecha del hero.')
        }
        else if (this.container.x < this.objetivo_hero.container.x){
            // console.log('A la izquierda del hero.')
        }
        else if (this.container.y > this.objetivo_hero.container.y){
            // console.log('Por debajo del hero.')
        }
        else if (this.container.y < this.objetivo_hero.container.y){
            // console.log('Por arriba del hero.')
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
                this.atacar()
            }
        }
        // super.preUpdate()   // ?      
        // this.setPosition()
        // console.log('test enemigo')
    }
}