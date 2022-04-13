import Phaser from 'phaser';

let lista
let palabra = ""
let numero_de_letra
let textEntry 
let textEntry_color
let cambiaColor_sumaLetra
let palabra_nueva

// var funciones
let crearLinea
let crearGrilla

// crear selector
let crear_selector
let selector

let mover_selector
let pos_selectorX = 0
let pos_selectorY = 0

// tabla grilla
let tabla = []

// teclas
let keyEsc;


class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {

    }
      
    create ()
    {
        lista = ["cacerola","auto","nave","abeja","estado","casino", "derecha","izquierda","camarote", "calle",'destino','mundo','helado',
        'conservas', 'función', 'teatro', 'donde']
        // palabra = lista[Math.floor(Math.random() * lista.length)]

        numero_de_letra = 0

        // console.log(palabra.charAt(0)
        // textEntry = this.add.text(200, 40, palabra, {fontSize: '50px'})
        // textEntry_color = this.add.text(200, 40, "", {fontSize: '50px', fill: "yellow"})

        crearGrilla(this)
        console.log(tabla)
        crear_selector(this)


        keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // keyboar input ---
        this.input.keyboard.on('keydown', function (event) {

        // if (event.keyCode === 8 && textEntry.text.length > 0)
        // {
        //     textEntry.text = textEntry.text.substr(0, textEntry.text.length - 1);
        // }
        // else 
        if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 100))
        {
            if (numero_de_letra === palabra.length -1 && event.key === palabra.charAt(numero_de_letra)){
                palabra_nueva();
            }

            else if (event.key === palabra.charAt(numero_de_letra)){
                cambiaColor_sumaLetra();
            }            
        }
      
        });// keyboar input end ---
        
        keyEsc.on('down', function (key, event) {        
            console.log("Esc") 

        });
        // ----

        // ----

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
    backgroundColor: '#656565',
    scene: MyGame
};


const game = new Phaser.Game(config);

cambiaColor_sumaLetra = function () {
    // textEntry_color.text = textEntry_color.text + event.key
    numero_de_letra += 1
}

palabra_nueva = function () {
    palabra = lista[Math.floor(Math.random() * lista.length)]
    console.log(palabra + " " + palabra.length)
    for (let i = 0; i < palabra.length; i++){
        tabla[0][i].list[1].text = palabra.charAt(i)
        console.log(palabra.charAt(i))
    }
    // textEntry.text = palabra
    // textEntry_color.text = ""
    numero_de_letra = 0
    return
}

crearLinea = function (esto, posy, posTabla) {
    let posX = 150

    for (let i = 0; i<10; i++){
        let rect = esto.add.rectangle(0, 0, 48, 48, 0x6666ff);
        let text = esto.add.text(0, 0, '', {fontSize: '42px'})
        text.letra = ""
        text.setOrigin(0.5,0.5)
        let container = esto.add.container(posX, posy, [rect, text]);
        if (tabla[posTabla] === undefined){
            tabla[posTabla] = []
        }
        tabla[posTabla][i] = container
        posX = posX + 52

    }
}

crearGrilla = function(esto) {
    let posY = 500
    for (let i = 0; i<8; i++){
        crearLinea(esto, posY, i)
        posY = posY-52
    }
}

crear_selector = function(esto){
    let posX = tabla[0][0].x
    let posY = tabla[0][0].y
    selector = esto.add.rectangle(posX, posY, 48, 48);
    selector.setStrokeStyle(4, 0x551155);

}

mover_selector = function (dirX, dirY) {
    if (puede_mover === true)
    {
        if (tabla[pos_selectorX + dirX] != undefined && tabla[pos_selectorX + dirX][pos_selectorY + dirY] != undefined){
            pos_selectorX = pos_selectorX + dirX
            pos_selectorY = pos_selectorY + dirY
            selector.x = tabla[pos_selectorX][pos_selectorY].x
            selector.y = tabla[pos_selectorX][pos_selectorY].y
        }
    }
}