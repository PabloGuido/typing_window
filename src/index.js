import Phaser from 'phaser';
import Enemigo from './scripts/enemigo'
import Saloon from './scripts/saloonBkg'
import GrupoEnemigos from './scripts/grupoEnemigos'

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
// let lista_de_palabras = ["destino",  "destax", "dia", "dit", "det"]
// vars
let saloon

// tablas
let enemigos_en = [0,0,0,0,0];
let posiciones_enemgios = [0,1,2,3,4]
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
        click = this.sound.add('click', {volume: 0.25});
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
                            let palabra_actual = palabras_a_escribir[i].charAt(numero_de_letra[i]) // Es la palabra que se está intentando escribir.
                            const max = Math.max.apply(Math, numero_de_letra); // Busca la/s palabra con más caracteres escritos.
                            const index = numero_de_letra.indexOf(max); // Busca en que posición se encuentra la palabra con mas caracteres para poder hacer comparaciones luego.


                            if (Math.max.apply(Math, numero_de_letra) > 0 && palabras_a_escribir[i].charAt(numero_de_letra[i])  === palabras_a_escribir[index].charAt(numero_de_letra[index]-1) ){
                                // Esto hace la comparación para que se escriban letras cuando las palabras compraten las mismas hasta que no.
                                // console.log('')
                                enemigos_en[i].textColor.text = enemigos_en[i].textColor.text + palabras_a_escribir[i].charAt(numero_de_letra[i]);
                                numero_de_letra[i] += 1;
                            }
                            else if (Math.max.apply(Math, numero_de_letra) === 1 && palabra_actual != palabras_a_escribir[index].charAt(numero_de_letra[index]-1) && numero_de_letra[i] != numero_de_letra[index] ){
                                // Esto arregla el problema que se podía escribir el primer caracter de cada palabra aunque no sean iguales.
                                // console.log('')
                                return
                            }
                            else{
                                // Colorea la/s palabras que se están escribiendo y suma 1 al número de letra de la palabra que se está escribiendo.
                                enemigos_en[i].textColor.text = enemigos_en[i].textColor.text + palabras_a_escribir[i].charAt(numero_de_letra[i]);
                                numero_de_letra[i] += 1;
                            }                           
                            

                        }
                        if (i === 4)
                        {   
                            escribir_letra(this);
                            // console.log(numero_de_letra)
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
        let grupoTest = new GrupoEnemigos(this)
        grupoTest.crear_grupo_simple(this, enemigos_en, posiciones_enemgios, saloon, palabras_a_escribir)
        // ----


    }

    update()
    {


    }
}

// ------------------------------------------------------------



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