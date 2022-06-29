import Phaser from 'phaser';
import Enemigo from './scripts/enemigo'
import Saloon from './scripts/saloonBkg'
let tile_tamanio = 64
let midX = 1280/2
let midY = 720/2

let lista = ["cacerola","auto","nave","abeja","estado","casino", "derecha","izquierda","camarote", "calle",'destino','mundo','helado',
'conservas', 'recorrer', 'teatro', 'donde']
let palabra = ""
let numero_de_letra = [0,0,0,0,0]
let escribiendo_en = []
let enemigos_en = [0,0,0,0,0]

// npc, esta tabla contiene los npc
let npc = []
// UI
let UIScene

let textEntry_color
let cambiaColor_sumaLetra
let escribir_letra
let palabra_nueva
let borrar_palabra

// palabras a escribir
let palabras_a_escribir = []
let crear_enemigo

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
let saloon

let mover_hero
let direcciones = [[0,-1],[-1,0],[0,1],[1,0]]
let inicialX = 8
let inicialY = 3
// map
let mapa
let tiles
let layer
let enemigoTest 
class Hero
{
    constructor (esto)
    {    
        let x = 0
        let y = 0
        this.sprite = esto.add.image(0, 3, 'hero').setOrigin(0,0)
        this.sprite.setScale(1.8,1.8)

        this.textEntry0 = esto.add.text(-120, 50, "izquierda", {fontSize: '25px', fontStyle: 'bold'})
        this.textEntry0.setStroke('#000000', 3)
        this.textEntry1 = esto.add.text(0, -70, "arriba", {fontSize: '25px', fontStyle: 'bold'})
        this.textEntry1.setStroke('#000000', 3)
        this.textEntry2 = esto.add.text(130, 50, "derecha", {fontSize: '25px', fontStyle: 'bold'})
        this.textEntry2.setStroke('#000000', 3)
        this.textEntry3 = esto.add.text(10, 160, "abajo", {fontSize: '25px', fontStyle: 'bold'})
        this.textEntry3.setStroke('#000000', 3)
        // 
        this.textEntryC0 = esto.add.text(-120, 50, "", {fontSize: '25px',color: '#00ff00', fontStyle: 'bold'})
        this.textEntryC0.setStroke('#000000', 3)
        this.textEntryC1 = esto.add.text(0, -70, "", {fontSize: '25px',color: '#00ff00', fontStyle: 'bold'})
        this.textEntryC1.setStroke('#000000', 3)
        this.textEntryC2 = esto.add.text(130, 50, "", {fontSize: '25px',color: '#00ff00', fontStyle: 'bold'})
        this.textEntryC2.setStroke('#000000', 3)
        this.textEntryC3 = esto.add.text(10, 160, "", {fontSize: '25px',color: '#00ff00', fontStyle: 'bold'})
        this.textEntryC3.setStroke('#000000', 3)
        // 
        this.vida = 10
        this.vidas_text = esto.add.text(-380, -280, "Lives: " + this.vida, {fontSize: '24px',color: '#50ff50', fontStyle: 'bold'})
        this.tablaEntry = [this.textEntry0,this.textEntry1,this.textEntry2,this.textEntry3]
        this.tablaEntryC = [this.textEntryC0,this.textEntryC1,this.textEntryC2,this.textEntryC3]
        this.container = esto.add.container(x, y, [ this.sprite, this.textEntry0,this.textEntry1,this.textEntry2,this.textEntry3, this.textEntryC0,this.textEntryC1,this.textEntryC2,this.textEntryC3,this.vidas_text ]);
        this.fuerza_de_ataque = 1 // fuerza del ataque, cambiar por algo mas claro
        this.esto = esto

    }  
    mover(dirX, dirY) 
    {
        // console.log(this.container)

        this.container.x = dirX
        this.container.y = dirY        
    }
    atacar(objetivo, esto2, dirX, dirY){
        hit.play(); // Sonido del golpe

        objetivo.recibir_danio(this.fuerza_de_ataque, dirX, dirY)
        

        this.esto.tweens.add({
            targets: this.sprite,
            x: {value: dirX/2, duration: 60, ease: 'Power0' },
            y: {value: dirY/2, duration: 60, ease: 'Power0' },
            yoyo: true,
        });

        if (objetivo.vida <= 0){
            console.log(npc) // está funcionando desde el enemigo, para chequear si los npcs fueron quitados de la tabla por ahora
        }
    }
    recibir_danio(cantidad)
    {
        this.vida = this.vida - cantidad
        this.vidas_text.text = "Lives: " + this.vida
        console.log('@hero recibiendo daño,' + ' vida restante: ' + this.vida)
        this.sprite.setTint(0xff0000)

        this.esto.tweens.add({
            targets: this.container.list[0],
            tint: {value: 0xffffff, duration: 0, ease: 'Power0' },
            delay: 100,
        });

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
        // imgage
        this.load.image('enemigo', 'src/assets/enemigo.png');
        this.load.image('saloonBkg', 'src/assets/saloonBkg.png');
        this.load.image('ventana', 'src/assets/ventana.png');
        this.load.image('palabra', 'src/assets/palabra.png');

        // sonidos
        this.load.audio('click', 'src/assets/click.ogg');
        this.load.audio('del', 'src/assets/del.wav');
        this.load.audio('ok', 'src/assets/ok.ogg');
        this.load.audio('hit', 'src/assets/hit.wav');
    }
      
    create ()
    {

        // sonidos 
        click = this.sound.add('click', {volume: 0.05});
        del = this.sound.add('del', {volume: 0.05});
        ok = this.sound.add('ok', {volume: 0.05});
        hit = this.sound.add('hit', {volume: 0.05});
        // Saloon
        saloon = new Saloon(this, midX, midY)
        // console.log(saloon)

        // hero
        // hero = new Hero(this)

        // enemigo
        // enemigoTest = new Enemigo(this, 200,200)
        // this.add.existing(enemigoTest)

        // keyboar input ---
        keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyDel = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);
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
            for (let i = 0; i < 5; i++){

                    if (event.key === palabras_a_escribir[i].charAt(numero_de_letra[i])){

                            enemigos_en[i].textColor.text = enemigos_en[i].textColor.text + palabras_a_escribir[i].charAt(numero_de_letra[i])
                            numero_de_letra[i] += 1

                 
                        if (i === 4){
                            // console.log('3')                        
                            escribir_letra(this);
                        }
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
        // ---- Start
        // Crea las primeras cuatro palabras
        // crear_cuatro_palabras(hero.tablaEntry)
        crear_enemigo(this)

        // console.log(hero.tablaEntry)
        // ----

    }

    update()
    {


    }
}



cambiaColor_sumaLetra = function () {
    // textEntry_color.text = textEntry_color.text + event.key
    numero_de_letra += 1
}



crear_enemigo = function(este) {

    let palabras = lista.slice(0, lista.length)
    let numero_random = Math.floor(Math.random() * palabras.length);
    let nueva_palabra = palabras[numero_random]
    let enemyX = midX + saloon.ventana_0.x
    let enemyY = midY + saloon.ventana_0.y
    let nuevo_enemigo = new Enemigo(este, enemyX, enemyY, nueva_palabra, )
    enemigos_en[saloon.ventana_0.pos] = nuevo_enemigo
    este.add.existing(nuevo_enemigo)

    palabras_a_escribir.push(nueva_palabra)
    console.log(saloon)


    
    // este.add.existing(nuevo_enemigo)

    // console.log(palabras)
    // for (let i = 0; i<tabla.length; i++){
    //     let numero_random = Math.floor(Math.random() * palabras.length);
    //     tabla[i].text = palabras[numero_random]
    //     let index = palabras.indexOf(palabras[numero_random]);
    //     palabras_a_escribir.push(palabras[numero_random])
    //     palabras.splice(index,1); 
    // }
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
                let x = direcciones[k][1] * tile_tamanio
                let y = direcciones[k][0] * tile_tamanio
                for (let npcs of npc){

                    if (npcs.container.x === hero.container.x + x && npcs.container.y === hero.container.y + y){
                        // compara que el hero no vaya a quedar en la misma posición que ya hay un npc.
                        console.log('Interactuar con npc: ' + npcs.tipo + ' ' + npcs.nombre)
                        hero.atacar(npcs, esto2, x, y)
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

    for (let i = 0; i < 5; i++){  
        // restablece los valores de palabra a escribir y saca de la tabla palabras las palabras que ya estan dentro de las 4.
        let index = palabras.indexOf(palabras_a_escribir[i]);
        // console.log(index)
        palabras.splice(index,1); 
        hero.tablaEntryC[i].text = ""
        numero_de_letra = [0,0,0,0,0]
    }

    // Crea nueva palabra y la inserta en la posición de la última donde se escribió.
    let index2 = palabras_a_escribir.indexOf(palabras_a_escribir[posK]);
    palabras_a_escribir.splice(index2,1);
    let numero_random = Math.floor(Math.random() * palabras.length);
    palabras_a_escribir.splice(posK, 0, palabras[numero_random])
    hero.tablaEntry[posK].text = palabras[numero_random]
}

borrar_palabra = function() {

    for (let i = 0; i < 5; i++){ 
        if (enemigos_en[i] != 0){
            enemigos_en[i].textColor.text = ""
            numero_de_letra = [0,0,0,0,0]
        }
    }
    del.play()
;}




const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1280,
    height: 720,
    backgroundColor: '#111111',
    scene: [ MyGame ]
};


const game = new Phaser.Game(config);