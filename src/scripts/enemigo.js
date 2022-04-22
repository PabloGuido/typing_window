export default class Enemigo extends Phaser.GameObjects.Container 

{
    constructor (scene, x, y)
    {
        super(scene); 
        this.enemy = scene.add.image(0,0,'enemigo').setScale(3, 3)
        this.enemy.x = 30
        this.enemy.y = 30
        this.timer = 400
        this.text = scene.add.text(10, 44, this.timer, {fontSize: '18px', fontStyle: 'bold'})
        this.container = scene.add.container(x, y, [this.enemy, this.text ])
        this.tipo = 'enemigo'
        this.nombre = 'Medusa'
        this.vida = 3
        
    }

    muerto(tabla){
        let index = tabla.indexOf(this)
        tabla.splice(index, 1); 
        this.container.destroy()
        console.log('muerto')
    }

    preUpdate(){
        if (this.vida > 0){
            this.timer -= 1
            this.text.text = this.timer
            if (this.timer < 0){
                this.timer = 300
            }
        }
        // super.preUpdate()   // ?      
        // this.setPosition()
        // console.log('test enemigo')
    }
}