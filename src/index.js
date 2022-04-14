import Phaser from 'phaser';

let lista = ["cacerola","auto","nave","abeja","estado","casino", "derecha","izquierda","camarote", "calle",'destino','mundo','helado',
'conservas', 'función', 'teatro', 'donde']
let palabra = ""
let numero_de_letra = [0,0,0,0]
let escribiendo_en = []

let textEntry 
let textEntry_color
let cambiaColor_sumaLetra
let palabra_nueva

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

//
let hero

class Hero
{
    constructor (esto)
    {    
        let x = 400
        let y = 400
        this.sprite = esto.add.image(60, 10, 'hero').setScale(3, 3);
        this.textEntry0 = esto.add.text(-120, 0, "izquierda", {fontSize: '25px', fontStyle: 'bold'})
        this.textEntry1 = esto.add.text(0, -120, "arriba", {fontSize: '25px', fontStyle: 'bold'})
        this.textEntry2 = esto.add.text(120, 0, "derecha", {fontSize: '25px', fontStyle: 'bold'})
        this.textEntry3 = esto.add.text(0, +120, "abajo", {fontSize: '25px', fontStyle: 'bold'})
        // 
        this.textEntryC0 = esto.add.text(-120, 0, "", {fontSize: '25px',color: '#00ff00', fontStyle: 'bold'})
        this.textEntryC1 = esto.add.text(0, -120, "", {fontSize: '25px',color: '#00ff00', fontStyle: 'bold'})
        this.textEntryC2 = esto.add.text(120, 0, "", {fontSize: '25px',color: '#00ff00', fontStyle: 'bold'})
        this.textEntryC3 = esto.add.text(0, +120, "", {fontSize: '25px',color: '#00ff00', fontStyle: 'bold'})
        // 
        this.tablaEntry = [this.textEntry0,this.textEntry1,this.textEntry2,this.textEntry3]
        this.tablaEntryC = [this.textEntryC0,this.textEntryC1,this.textEntryC2,this.textEntryC3]
        this.container = esto.add.container(x, y, [ this.sprite, this.textEntry0,this.textEntry1,this.textEntry2,this.textEntry3, this.textEntryC0,this.textEntryC1,this.textEntryC2,this.textEntryC3 ]);
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
        this.load.image('hero', 'src/assets/hero.png');
    }
      
    create ()
    {

        // palabra = lista[Math.floor(Math.random() * lista.length)]
        


        // console.log(palabra.charAt(0)
        textEntry = this.add.text(100, 40, "", {fontSize: '25px'})
        // textEntry_color = this.add.text(200, 40, "", {fontSize: '50px', fill: "yellow"})


        hero = new Hero(this)

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
            // console.log(palabras_a_escribir[0].charAt(0))
            for (let i = 0; i < 4; i++){
                
                    if (event.key === palabras_a_escribir[i].charAt(numero_de_letra[i])){
                        // escribiendo_en.push(palabras_a_escribir.indexOf(palabras_a_escribir[i]))
                            

                        // if (numero_de_letra[i] === Math.max.apply(Math, numero_de_letra)){
                            
                            hero.tablaEntryC[i].text = hero.tablaEntryC[i].text + palabras_a_escribir[i].charAt(numero_de_letra[i])
                            numero_de_letra[i] += 1

                            // console.log('test1')
                            // hero.tablaEntry[i].setTint(0x00ff00)
                            
                        // } 
                    }
                    if (i === 3){
                        // console.log('3')
                        for (let k = 0; k < 4; k++){
                            if (numero_de_letra[k] < Math.max.apply(Math, numero_de_letra))
                            {
                                numero_de_letra[k] = 0
                                hero.tablaEntry[k].setTint(0xffffff)
                                hero.tablaEntryC[k].text = ""
                            }
                            else if(numero_de_letra[k] >= palabras_a_escribir[k].length){
                                // console.log(numero_de_letra[k])
                                // console.log(palabras_a_escribir[k].charAt(numero_de_letra[k]-1))
                                // textEntry.text = textEntry.text + palabras_a_escribir[k].charAt(numero_de_letra[k])
                                // console.log(numero_de_letra[k])
                                // console.log(palabras_a_escribir[k])
                                textEntry.text = palabras_a_escribir[k]
                                
                                // for (let v; v > numero_de_letra.length; v++){

                                //     numero_de_letra[v] = 0

                                // }
                                hero.tablaEntryC[k].text = ""
                                numero_de_letra = [0,0,0,0]
                                palabras_a_escribir = []
                                hero.tablaEntry[k].setTint(0xffffff)
                                
                                console.log(palabras_a_escribir)
                                crear_cuatro_palabras(hero.tablaEntry)
                                console.log(numero_de_letra)
                                console.log(palabras_a_escribir)
                            }

                        }
                         // console.log(event.key)
                         // console.log('test')

                    }

                   
            }



            // for (let palabras of palabras_a_escribir){
            //     if (event.key === palabras.charAt(0)){

            //     // cambiaColor_sumaLetra();
            //      console.log(event.key)

            //     }          
            // }
           
            // if (numero_de_letra === palabra.length -1 && event.key === palabra.charAt(numero_de_letra)){
            //     palabra_nueva();
            // }


        }
      
        });// keyboar input end ---
        
        keyEsc.on('down', function (key, event) {        
            console.log("Esc") 

        });
        // ----
        crear_cuatro_palabras(hero.tablaEntry)
        // console.log(hero.tablaEntry)
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

crear_cuatro_palabras = function(tabla) {


    let palabras = lista.slice(0, lista.length)

    console.log(palabras)
    for (let i = 0; i<tabla.length; i++){
        let numero_random = Math.floor(Math.random() * palabras.length);
        tabla[i].text = palabras[numero_random]
        let index = palabras.indexOf(palabras[numero_random]);
        palabras_a_escribir.push(palabras[numero_random])

        palabras.splice(index,1); 
    }
    // console.log(palabras_a_escribir)
}