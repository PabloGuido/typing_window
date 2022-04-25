var timer = 100 
let direcciones = [[0,-1],[1,0],[0,1],[-1,0]]
export default class Enemigo extends Phaser.GameObjects.Container 

{
    constructor (scene, x, y, tabla, objetivo, mapa)
    {        
        super(scene); 

        this.enemy = scene.add.image(0,0,'enemigo').setScale(3, 3).setOrigin(0,0)
        this.x = x
        this.y = y
        this.timer = timer
        this.barra =  scene.add.rectangle(0, 56, 64, 8, 0xffffff).setOrigin(0,0)
        // this.text = scene.add.text(10, 44, this.timer, {fontSize: '18px', fontStyle: 'bold'})
        this.container = scene.add.container(x, y, [this.enemy, this.barra ])
        this.tipo = 'enemigo'
        this.nombre = 'Medusa'
        this.vida = 3
        this.fuerza_de_ataque = 1 
        this.sonido_ataque = scene.sound.add('del', {volume: 0.25});
        this.objetivo_hero = objetivo
        this.mapa = mapa
        this.tabla = tabla
        this.container.setPosition(this.mapa[y][x].pixelX,this.mapa[y][x].pixelY)
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
        this.atacar() // Devuelve el ataque.
        // Animación de recibir daño. ---------------------------
        this.enemy.setTint(0xff0000)
        this.scene.tweens.add({
            targets: this.enemy,
            tint: {value: 0xffffff, duration: 0, ease: 'Power0' },
            delay: 100,
        }); // anim end ----------------------------------------
        // Bajar punto de vida y chequear muerte o devolver golpe.
        if (this.vida <= 0){
            this.muerto()
        }
        else{
            this.restaurar_timer()
        }
    }

    atacar(){
        // Hay que ver de poner alguna flag para que no se ataque dos veces cuando termina el timer y cuando ataca el hero.
        for (let dirs of direcciones){
            // Busca la posicion de este enmigo y el hero y compara las cuatro direcciones. 
            let miPos = this.getLocalPoint(this.container.x,this.container.y)
            miPos.x = miPos.x + dirs[0] * 64
            miPos.y = miPos.y + dirs[1] * 64
            let heroPos = this.getLocalPoint(this.objetivo_hero.container.x,this.objetivo_hero.container.y )

            if (miPos.x === heroPos.x && miPos.y === heroPos.y){
                console.log('@' + this.nombre + ' ataca al hero.')
                this.objetivo_hero.recibir_danio(this.fuerza_de_ataque) // El hero recibe daño con esta f()              
                this.sonido_ataque.play(); // Sonido de golpe
                this.scene.tweens.add({ // Animación que devuelve el golpe al hero
                targets: this.container.list[0],
                    x: {value: dirs[0] * 32, duration: 60, ease: 'Power0' },
                    y: {value: dirs[1] * 32, duration: 60, ease: 'Power0' },
                    yoyo: true,
                }); // anim end----------------------------------------------------
            return
            }
        }


        // console.log(this.objetivo_hero)
        if (this.container.x > this.objetivo_hero.container.x){
            console.log('A la derecha del hero.')
            console.log(this.mapa)
            this.x -= 1
            this.container.x = this.mapa[this.y][this.x].pixelX
            this.container.list[0].x = this.container.list[0].x + 64
            this.scene.tweens.add({ 
                targets: this.container.list[0],
                    x: {value: this.container.list[0].x - 64, duration: 60, ease: 'Power0' },
            }); // anim end----------------------------------------------------
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



