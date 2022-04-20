import Phaser from 'phaser';
import Enemigo from './scripts/enemigo'


let lista = ["cacerola","auto","nave","abeja","estado","casino", "derecha","izquierda","camarote", "calle",'destino','mundo','helado',
'conservas', 'recorrer', 'teatro', 'donde']
let palabra = ""
let numero_de_letra = [0,0,0,0]
let escribiendo_en = []

// npc
let npc = []


let textEntry_color
let cambiaColor_sumaLetra
let escribir_letra
let palabra_nueva
let borrar_palabra

// palabras a escribir
let palabras_a_escribir = []
let crear_cuatro_palabras

// 
let arriba
let abajo
let izquierda
let derecha

// teclas
let keyEsc;
let keyDel;
// sonidos
let click
let del
let ok
let hit
//
let hero
let mover_hero
let direcciones = [[0,-1],[-1,0],[0,1],[1,0]]
let inicialX = 6
let inicialY = 5
// map
let mapa
let tiles
let layer
let eTest 
class Hero
{
    constructor (esto)
    {    
        let x = 0
        let y = 0
        this.sprite = esto.add.image(0, 0, 'hero').setScale(3, 3).setOrigin(0,0);
        this.textEntry0 = esto.add.text(-200, 0, "izquierda", {fontSize: '25px', fontStyle: 'bold'})
        this.textEntry1 = esto.add.text(-40, -120, "arriba", {fontSize: '25px', fontStyle: 'bold'})
        this.textEntry2 = esto.add.text(120, 0, "derecha", {fontSize: '25px', fontStyle: 'bold'})
        this.textEntry3 = esto.add.text(-40, +120, "abajo", {fontSize: '25px', fontStyle: 'bold'})
        // 
        this.textEntryC0 = esto.add.text(-200, 0, "", {fontSize: '25px',color: '#00ff00', fontStyle: 'bold'})
        this.textEntryC1 = esto.add.text(-40, -120, "", {fontSize: '25px',color: '#00ff00', fontStyle: 'bold'})
        this.textEntryC2 = esto.add.text(120, 0, "", {fontSize: '25px',color: '#00ff00', fontStyle: 'bold'})
        this.textEntryC3 = esto.add.text(-40, +120, "", {fontSize: '25px',color: '#00ff00', fontStyle: 'bold'})
        // 
        this.tablaEntry = [this.textEntry0,this.textEntry1,this.textEntry2,this.textEntry3]
        this.tablaEntryC = [this.textEntryC0,this.textEntryC1,this.textEntryC2,this.textEntryC3]
        this.container = esto.add.container(x, y, [ this.sprite, this.textEntry0,this.textEntry1,this.textEntry2,this.textEntry3, this.textEntryC0,this.textEntryC1,this.textEntryC2,this.textEntryC3 ]);
        this.ataque = 1
        this.esto = esto
    }  
    mover(dirX, dirY) 
    {
        // console.log(this.container)
        this.container.x = dirX
        this.container.y = dirY        
    }
    atacar(objetivo, esto2){
        hit.play();
        objetivo.vida = objetivo.vida - this.ataque
        console.log(objetivo.nombre + ' vida restante: ' + objetivo.vida)
        this.esto.tweens.add({
            targets: objetivo.enemy,
            scaleX: {value: 4, duration: 75, ease: 'Power0' },
            // scaleY: {value: 4, duration: 75, ease: 'Power0' },
            alphaTopLeft: { value: 0.5, duration: 75, ease: 'Power0' },            
            yoyo: true,
        });
        if (objetivo.vida <= 0){
            objetivo.muerto(npc)
            console.log(npc)
        }
    }
}


class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        // img
        this.load.image('hero', 'src/assets/hero.png');
        this.load.image('enemigo', 'src/assets/enemigo.png');
        this.load.image('tiles', 'src/assets/tiles.png');
        // sonidos
        this.load.audio('click', 'src/assets/click.ogg');
        this.load.audio('del', 'src/assets/del.wav');
        this.load.audio('ok', 'src/assets/ok.ogg');
        this.load.audio('hit', 'src/assets/hit.wav');
    }
      
    create ()
    {





        // console.log(eTest)

        click = this.sound.add('click', {volume: 0.65});
        del = this.sound.add('del', {volume: 0.65});
        ok = this.sound.add('ok', {volume: 0.45});
        hit = this.sound.add('hit', {volume: 0.45});
        // Creating a blank tilemap with the specified dimensions
        mapa = this.make.tilemap({ tileWidth: 64, tileHeight: 64, width: 12, height: 12});
        tiles = mapa.addTilesetImage('tiles');
        layer = mapa.createBlankLayer('layer1', tiles);
        layer.fill(0, 5, 2, 3, 5);
        layer.fill(0, 8, 5, 3, 1);
        layer.fill(0, 10, 6, 1, 3);
        layer.fill(0, 6, 7, 1, 2);
        layer.fill(0, 7, 8, 3, 1);

        layer.fill(1, 4, 1, 5, 1);
        // console.log(layer.layer.data[5][5].index)       


        // enemigo
        eTest = new Enemigo(this,100,100)
        this.add.existing(eTest)
        npc.push(eTest)
        eTest.container.setPosition(layer.layer.data[0][7].pixelX,layer.layer.data[5][0].pixelY)

        let eTest2 = new Enemigo(this,100,100)
        this.add.existing(eTest2)
        npc.push(eTest2)
        eTest2.container.setPosition(layer.layer.data[0][10].pixelX,layer.layer.data[7][0].pixelY)
        
        let eTest3 = new Enemigo(this,100,100)
        this.add.existing(eTest3)
        npc.push(eTest3)
        eTest3.container.setPosition(layer.layer.data[0][5].pixelX,layer.layer.data[2][0].pixelY)
        // console.log(npc)

        hero = new Hero(this)
        hero.container.x = layer.layer.data[inicialY][inicialX].pixelX
        hero.container.y= layer.layer.data[inicialY][inicialX].pixelY
        this.cameras.main.startFollow(hero.container, false, 0.2,0.2);

        
        keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyDel = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);
        // keyboar input ---
        this.input.keyboard.on('keydown', function (event) {

        // if (event.keyCode === 8 && textEntry.text.length > 0)
        // {
        //     textEntry.text = textEntry.text.substr(0, textEntry.text.length - 1);
        // }
        // else 
        if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 100))
        {
            click.play();
            // console.log(palabras_a_escribir[0].charAt(0))
            for (let i = 0; i < 4; i++){
                
                    if (event.key === palabras_a_escribir[i].charAt(numero_de_letra[i])){
                            hero.tablaEntryC[i].text = hero.tablaEntryC[i].text + palabras_a_escribir[i].charAt(numero_de_letra[i])
                            numero_de_letra[i] += 1

                    }
                    if (i === 3){
                        // console.log('3')                        
                        escribir_letra(this);

                    }
                   
            }



        }
      
        });// keyboar input end ---
        
        keyEsc.on('down', function (key, event) {        
            console.log("Esc") 
            borrar_palabra();
            
        });
        keyDel.on('down', function (key, event) {        
            console.log("Del") 
            borrar_palabra();
        });
        // ----
        crear_cuatro_palabras(hero.tablaEntry)
        // console.log(hero.tablaEntry)
        // ----
        console.log(npc)
    }

    update()
    {


    }
}
const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: '#111111',
    scene: MyGame
};


const game = new Phaser.Game(config);

cambiaColor_sumaLetra = function () {
    // textEntry_color.text = textEntry_color.text + event.key
    numero_de_letra += 1
}



crear_cuatro_palabras = function(tabla) {


    let palabras = lista.slice(0, lista.length)

    // console.log(palabras)
    for (let i = 0; i<tabla.length; i++){
        let numero_random = Math.floor(Math.random() * palabras.length);
        tabla[i].text = palabras[numero_random]
        let index = palabras.indexOf(palabras[numero_random]);
        palabras_a_escribir.push(palabras[numero_random])

        palabras.splice(index,1); 
    }
    // console.log(palabras_a_escribir)
}

escribir_letra = function (esto2) {
    for (let k = 0; k < 4; k++){
        if (numero_de_letra[k] < Math.max.apply(Math, numero_de_letra)) // compara la cantidad de letras de la palabra contra la palabra con mayor cantidad escrita
        {
            numero_de_letra[k] = 0
            hero.tablaEntry[k].setTint(0xffffff)
            hero.tablaEntryC[k].text = ""
        }
        else if(numero_de_letra[k] >= palabras_a_escribir[k].length )
        {   

            // Esta primera compración de abajo chequea que no estemos yendo hacia una pared.
            if (layer.layer.data[inicialY + direcciones[k][0]][inicialX].index === 0 && layer.layer.data[inicialY][inicialX + direcciones[k][1]].index === 0){
                // Diferencia que se suma la posicion del hero para ver si hay algún NPC o moverse.
                let x = direcciones[k][1] * 64
                let y = direcciones[k][0] * 64
                for (let npcs of npc){

                    if (npcs.container.x === hero.container.x + x && npcs.container.y === hero.container.y + y){
                        // compara que el hero no vaya a quedar en la misma posición que ya hay un npc.
                        console.log('Interactuar con npc: ' + npcs.tipo + ' ' + npcs.nombre)
                        hero.atacar(npcs, esto2)
                        // ok.play();
                        palabra_nueva(k);
                        return
                    }

                }
            // cambia el incialY/X para llevar tracking de los tiles y comprar cuando se quiera mover.
            inicialY = inicialY + direcciones[k][0]
            inicialX = inicialX + direcciones[k][1]  

            hero.mover(hero.container.x + x,hero.container.y + y)

            }
            ok.play();
            palabra_nueva(k);

        }

    }
}

palabra_nueva = function(posK) {
    let palabras = lista.slice(0, lista.length)

    for (let i = 0; i < 4; i++){  
        // restablece los valores de palabra a escribir y saca de la tabla palabras las palabras que ya estan dentro de las 4.
        let index = palabras.indexOf(palabras_a_escribir[i]);
        // console.log(index)
        palabras.splice(index,1); 
        hero.tablaEntryC[i].text = ""
        numero_de_letra = [0,0,0,0]
    }

    // Crea nueva palabra y la inserta en la posición de la última donde se escribió.
    let index2 = palabras_a_escribir.indexOf(palabras_a_escribir[posK]);
    palabras_a_escribir.splice(index2,1);
    let numero_random = Math.floor(Math.random() * palabras.length);
    palabras_a_escribir.splice(posK, 0, palabras[numero_random])
    hero.tablaEntry[posK].text = palabras[numero_random]
}

borrar_palabra = function() {

    for (let i = 0; i < 4; i++){ 
        hero.tablaEntryC[i].text = ""
        numero_de_letra = [0,0,0,0]
    }
    del.play()
;}