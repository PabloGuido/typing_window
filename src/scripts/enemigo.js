export default class Enemigo extends Phaser.GameObjects.Container 

{
    constructor (scene, x, y)
    {
        super(scene); 
        this.enemy = scene.add.image(0,0,'enemigo').setScale(3, 3)
        this.enemy.x = 30
        this.enemy.y = 30
        this.text = scene.add.text(0, 0, "", {fontSize: '25px', fontStyle: 'bold'}).setPosition(0,-40)
        this.container = scene.add.container(x, y, [this.enemy, this.text ])
        this.tipo = 'enemigo'
        this.nombre = 'Medusa'
        this.vida = 3
        this.timer = 0
    }

    muerto(tabla){
        let index = tabla.indexOf(this)
        tabla.splice(index, 1); 
        this.container.destroy()
        console.log('muerto')
    }

    preUpdate(){
        // super.preUpdate()   // ?      
        // this.setPosition()
        // console.log('test enemigo')
    }
}