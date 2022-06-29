import Phaser from 'phaser';
import Enemigo from './scripts/enemigo'
import Saloon from './scripts/saloonBkg'
// vars pantalla
let midX = 1280/2
let midY = 720/2

// teclas
let keyEsc
let keyDel

// sonidos
let click
let del
let ok
let hit

// palabras
let lista_de_palabras = ["cacerola","auto","nave","abeja","estado","casino", "derecha","izquierda","camarote", "calle",'destino','mundo','helado',
'conservas', 'recorrer', 'teatro', 'donde']

// vars
let saloon

// tablas
let enemigos_en = [0,0,0,0,0];
let numero_de_letra = [0,0,0,0,0];
let palabras_a_escribir = ["!","!","!","!","!"];


// vars funciones
let crear_enemigo
let escribir_letra


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
        saloon = new Saloon(this, midX, midY) // Crea el fondo del saloon que contiene las ventanas y las palabras_box
        // console.log(saloon)
        // sonidos  - pasar a una class después.
        click = this.sound.add('click', {volume: 0.55});
        del = this.sound.add('del', {volume: 0.05});
        ok = this.sound.add('ok', {volume: 0.05});
        hit = this.sound.add('hit', {volume: 0.05});

        // keyboard input
        keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyDel = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);

        this.input.keyboard.on('keydown', function (event) {
            if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 100)){
                click.play();

                for (let i = 0; i < 5; i++){

                        if (event.key === palabras_a_escribir[i].charAt(numero_de_letra[i]))
                        {

                            // console.log(i)
                            enemigos_en[i].textColor.text = enemigos_en[i].textColor.text + palabras_a_escribir[i].charAt(numero_de_letra[i]);
                            numero_de_letra[i] += 1;

                            
                            

                        }
                        if (i === 4)
                        {   

                            console.log('iiii')
                            escribir_letra(this);
                            console.log(numero_de_letra)
                            // console.log('max')                        
                            
                        }
                    
                }
            }
      
        });// keyboar input end ---
        
        keyEsc.on('down', function (key, event) {        
            console.log("Esc") 
            // borrar_palabra();

            
        });
        keyDel.on('down', function (key, event) {        
            console.log("Del") 
            // borrar_palabra();
        });
        // ---- Start

        crear_enemigo(this)
        crear_enemigo(this)
        // ----

    }

    update()
    {


    }
}

// ------------------------------------------------------------

crear_enemigo = function(este) {
    // genera la palabra nueva
    let palabras = lista_de_palabras.slice(0, lista_de_palabras.length)    
    let numero_random = Math.floor(Math.random() * palabras.length);
    let nueva_palabra = palabras[numero_random]
    // ventana random
    let ventana_random = Math.floor(Math.random() * 5);
    
    // posición del enemigo en ventana
    let enemyX = midX + saloon.tabla_ventanas[ventana_random].x
    let enemyY = midY + saloon.tabla_ventanas[ventana_random].y
    // crea el enemigo
    let nuevo_enemigo = new Enemigo(este, enemyX, enemyY, nueva_palabra)
    enemigos_en[saloon.tabla_ventanas[ventana_random].pos] = nuevo_enemigo
    este.add.existing(nuevo_enemigo)
 

    palabras_a_escribir[ventana_random] = nueva_palabra
    // console.log(palabras_a_escribir)

}

escribir_letra = function (esto2) {
    for (let k = 0; k < 5; k++){
        if (numero_de_letra[k] < Math.max.apply(Math, numero_de_letra)) // compara la cantidad de letras de la palabra contra la palabra con mayor cantidad escrita
        {
            if (enemigos_en[k] != 0){

                numero_de_letra[k] = 0
                
                enemigos_en[k].textColor.setTint(0xffffff)
                enemigos_en[k].textColor.text = ""
            }

        }
        else if(numero_de_letra[k] >= palabras_a_escribir[k].length)
        {   
            console.log('hacer algo?')


            // ok.play();
            // palabra_nueva(k);

        }

    }
}


const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1280,
    height: 720,
    backgroundColor: '#111111',
    scene: [ MyGame ]
};


const game = new Phaser.Game(config);