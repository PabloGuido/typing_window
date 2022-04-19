export default class Enemigo extends Phaser.GameObjects.Container 

{
    constructor (scene, x, y)
    {
        super(scene); 
        this.enemy = scene.add.image(0,0,'enemigo').setScale(3, 3).setOrigin(0,0);
        this.text = scene.add.text(0, 0, "", {fontSize: '25px', fontStyle: 'bold'}).setPosition(0,-40)
        this.container = scene.add.container(x, y, [this.enemy, this.text ])
        this.timer = 0
    }

    preUpdate(){
        // super.preUpdate()   // ?      
        // this.setPosition()
        // console.log('test enemigo')
    }
}