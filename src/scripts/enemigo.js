var timer = 125
let direcciones = [[0,-1],[1,0],[0,1],[-1,0]]
let este
export default class Enemigo extends Phaser.GameObjects.Container 

{
    constructor (scene, x, y, tabla, objetivo, mapa)
    {        
        super(scene); 
        este = this
        this.enemy = scene.add.image(0,0,'enemigo').setScale(1.8,1.8).setOrigin(0,0)
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
        // 
        this.mover_izquierda = true
        this.mover_arriba = true
        this.mover_derecha = true
        this.mover_abajo = true
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
                function onCompleteHandler (tween, targets)
                {
                    // console.log(este.container.list[0]);
                    if (este.vida > 0){
                        // console.log(este.container.list[0])
                        este.container.list[0].x = 0
                        este.container.list[0].y = 0
                    }
                }
                this.scene.tweens.add({ // Animación que devuelve el golpe al hero
                targets: this.container.list[0],
                    x: {value: dirs[0] * 32, duration: 60, ease: 'Power0' },
                    y: {value: dirs[1] * 32, duration: 60, ease: 'Power0' },
                    yoyo: true,
                    onComplete: onCompleteHandler
                }); // anim end----------------------------------------------------
            return
            }
        }
        this.mover()

        
    }

    mover(){ // Probar moviemientos con 'switch' llegado el caso
        // console.log(this.objetivo_hero)
        if (this.container.x > this.objetivo_hero.container.x && this.mapa[this.y][this.x-1].index === 0){

            for (let enemigos of this.tabla){
                if (this.x-1 === enemigos.x && this.y === enemigos.y){
                    this.mover_izquierda = false
                }
                
            }
            if (this.mover_izquierda === true){
                this.x -= 1
                this.container.x = this.mapa[this.y][this.x].pixelX
                this.container.list[0].x = this.container.list[0].x + 64
                    function onCompleteHandler (tween, targets)
                    {
                        // Esto es para que el enemigo y el hero no queden en el mismo tile. Por ahora está funcionando pero no se si 
                        // es la solución que mas me gusta. Esto es un prototipo, llegado el caso pensar otra solución.
                        if (este.container.x  === este.objetivo_hero.container.x && este.container.y  === este.objetivo_hero.container.y && this.vida > 0){
                            console.log('están en la misa pos')
                            este.x += 1
                            este.container.x = este.mapa[este.y][este.x].pixelX
                            este.container.list[0].x = 0
                        }
                    }
                // anim ---------------------------------------------------
                this.scene.tweens.add({ 
                    targets: this.container.list[0],
                        x: {value: this.container.list[0].x - 64, duration: 60, ease: 'Power0' },
                        onComplete: onCompleteHandler
                }); // anim end----------------------------------------------------
                this.restaurar_direcciones()
                return
            }

        }
        else if (this.container.x < this.objetivo_hero.container.x && this.mapa[this.y][this.x+1].index === 0){
            for (let enemigos of this.tabla){
                if (this.x+1 === enemigos.x && this.y === enemigos.y){
                    this.mover_derecha = false
                }
                
            }
            if (this.mover_derecha === true){
                this.x += 1
                this.container.x = this.mapa[this.y][this.x].pixelX
                this.container.list[0].x = this.container.list[0].x - 64
                    function onCompleteHandler (tween, targets)
                    {
                        // Esto es para que el enemigo y el hero no queden en el mismo tile. Por ahora está funcionando pero no se si 
                        // es la solución que mas me gusta. Esto es un prototipo, llegado el caso pensar otra solución.
                        if (este.container.x  === este.objetivo_hero.container.x && este.container.y  === este.objetivo_hero.container.y && this.vida > 0){
                            console.log('están en la misa pos')
                            este.x -= 1
                            este.container.x = este.mapa[este.y][este.x].pixelX
                            este.container.list[0].x = 0
                        }
                    }
                // anim ---------------------------------------------------
                this.scene.tweens.add({ 
                    targets: this.container.list[0],
                        x: {value: this.container.list[0].x + 64, duration: 60, ease: 'Power0' },
                        onComplete: onCompleteHandler
                }); // anim end----------------------------------------------------
                this.restaurar_direcciones()
                return
            }
        }
        if (this.container.y > this.objetivo_hero.container.y && this.mapa[this.y-1][this.x].index === 0){
            for (let enemigos of this.tabla){
                if (this.x === enemigos.x && this.y-1 === enemigos.y){
                    this.mover_arriba = false
                }                
            }
            if (this.mover_arriba === true){
                this.y -= 1
                this.container.y = this.mapa[this.y][this.x].pixelY
                this.container.list[0].y = this.container.list[0].y + 64
                    function onCompleteHandler (tween, targets)
                    {
                        // Esto es para que el enemigo y el hero no queden en el mismo tile. Por ahora está funcionando pero no se si 
                        // es la solución que mas me gusta. Esto es un prototipo, llegado el caso pensar otra solución.
                        if (este.container.x  === este.objetivo_hero.container.x && este.container.y  === este.objetivo_hero.container.y && this.vida > 0){
                            console.log('están en la misa pos')
                            este.y += 1
                            este.container.y = este.mapa[este.y][este.x].pixelY
                            este.container.list[0].y = 0
                        }
                    }
                // anim ---------------------------------------------------
                this.scene.tweens.add({ 
                    targets: this.container.list[0],
                        y: {value: this.container.list[0].y - 64, duration: 60, ease: 'Power0' },
                        onComplete: onCompleteHandler
                }); // anim end----------------------------------------------------
                this.restaurar_direcciones()
                return
            }


        }
        else if (this.container.y < this.objetivo_hero.container.y && this.mapa[this.y+1][this.x].index === 0){
            for (let enemigos of this.tabla){
                if (this.x === enemigos.x && this.y+1 === enemigos.y){
                    this.mover_abajo = false
                }                
            }
            if (this.mover_abajo === true){
                this.y += 1
                this.container.y = this.mapa[this.y][this.x].pixelY
                this.container.list[0].y = this.container.list[0].y - 64
                    function onCompleteHandler (tween, targets)
                    {
                        // Esto es para que el enemigo y el hero no queden en el mismo tile. Por ahora está funcionando pero no se si 
                        // es la solución que mas me gusta. Esto es un prototipo, llegado el caso pensar otra solución.
                        if (este.container.x  === este.objetivo_hero.container.x && este.container.y  === este.objetivo_hero.container.y && this.vida > 0){
                            console.log('están en la misa pos')
                            este.y -= 1
                            este.container.y = este.mapa[este.y][este.x].pixelY
                            este.container.list[0].y = 0
                        }
                    }
                // anim ---------------------------------------------------
                this.scene.tweens.add({ 
                    targets: this.container.list[0],
                        y: {value: this.container.list[0].y + 64, duration: 60, ease: 'Power0' },
                        onComplete: onCompleteHandler
                }); // anim end----------------------------------------------------
                this.restaurar_direcciones()
                return
            }
        }  
        this.restaurar_direcciones() 
    }



    restaurar_timer(){
        this.timer = timer
    }

    restaurar_direcciones(){
        this.mover_izquierda = true
        this.mover_arriba = true
        this.mover_derecha = true
        this.mover_abajo = true
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



