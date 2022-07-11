import Phaser from 'phaser';
import Enemigo from './scripts/enemigo'
import Saloon from './scripts/saloonBkg'
import GrupoEnemigos from './scripts/grupoEnemigos'
let tablas = require('./scripts/tablas');

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

// vars
let saloon
let grupoTest 
let esta_escena

// tablas

let enemigos_en = tablas.enemigos_en;
let posiciones_enemgios = tablas.posiciones_enemgios
let numero_de_letra = tablas.numero_de_letra;
let palabras_a_escribir = tablas.palabras_a_escribir;


// vars funciones
let crear_enemigo
let escribir_letra
let palabra_completa
let limpiar_tablas
export let creacion_de_grupo_enemigo
export let timer_creacion_de_grupo_enemigo

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
        esta_escena = this
        saloon = new Saloon(this, midX, midY) // Crea el fondo del saloon que contiene las ventanas y las palabras_box
        // console.log(saloon)
        // sonidos  - pasar a una class después.
        let volumen = 0
        click = this.sound.add('click', {volume: volumen});
        del = this.sound.add('del', {volume: volumen});
        ok = this.sound.add('ok', {volume: volumen});
        hit = this.sound.add('hit', {volume: volumen});

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
                                // console.log('numero_de_letra[i] += 1 ~ en comparación 1')
                            }
                            else if (Math.max.apply(Math, numero_de_letra) === 1 && palabra_actual != palabras_a_escribir[index].charAt(numero_de_letra[index]-1) && numero_de_letra[i] != numero_de_letra[index] ){
                            // else if (Math.max.apply(Math, numero_de_letra) === 1 && palabra_actual != palabras_a_escribir[index].charAt(0) && numero_de_letra[i] != numero_de_letra[index] ){ // dejar esta por si las dudas por si las de arriba no está ok, pero debería.
                                // Esto arregla el problema que se podía escribir el primer caracter de cada palabra aunque no sean iguales.
                                // console.log('Salteando')
                                continue 
                            }
                            else{
                                // Colorea la/s palabras que se están escribiendo y suma 1 al número de letra de la palabra que se está escribiendo.
                                enemigos_en[i].textColor.text = enemigos_en[i].textColor.text + palabras_a_escribir[i].charAt(numero_de_letra[i]);
                                numero_de_letra[i] += 1;
                                // console.log('numero_de_letra[i] += 1 ~ en comparación 3')
                            }                           
                            

                        }
                        if (i === 4){   
                            escribir_letra(this);
                            // console.log(numero_de_letra)
                            // console.log('max')                      
                        }
                    
                }
            }
      
        });// keyboar input end ---
        
        keyEsc.on('down', function (key, event) {        
            // console.log("Esc") 
            console.log(numero_de_letra)
        });

        keyDel.on('down', function (key, event) {        
            // console.log("Del") 
            limpiar_tablas();
            del.play();
        });
        // ---- Start
        grupoTest = new GrupoEnemigos(this)
        grupoTest.crear_grupo_simple(this, enemigos_en, posiciones_enemgios, saloon, palabras_a_escribir)

        // ----
        

    }

    update()
    {


    }
}

// ------------------------------------------------------------


creacion_de_grupo_enemigo = function() {
    grupoTest.crear_grupo_simple(esta_escena, enemigos_en, posiciones_enemgios, saloon, palabras_a_escribir)
    hit.play();
}

timer_creacion_de_grupo_enemigo = function() {
    // Cada vez que un enemigo se elimina se fija cuantos quedan. Si son 0 crea el timer para la creación de un nuevo grupo de enemigos.
    // Si el total de enemgios es 0 restablece las tablas.
    let todosIgualCero = (currentValue) => currentValue === 0;
    if (enemigos_en.every(todosIgualCero)){
        // console.log('todos igual a 0, crear nuevos enemigos.')

        limpiar_tablas();

        var timer = esta_escena.time.addEvent({
        delay: 1000,                // ms
        callback: creacion_de_grupo_enemigo,
        });
    }

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
        else if(numero_de_letra[k] === palabras_a_escribir[k].length)
        {   
            // console.log('* palabra completa *')
            palabra_completa(k)

        }

    }
}
limpiar_tablas = function(es_una_palabra_completa) {
        for (let i = 0; i < 5; i++){ 
            if (enemigos_en[i] != 0){
                enemigos_en[i].textColor.text = "";
                tablas.numero_de_letra[i] = 0;
                
            }
            
        }
        numero_de_letra = tablas.numero_de_letra;
}

palabra_completa = function(posEnArray) {
    // Acá hay que flaguear las prioridades entre el player y el timer del enemigo. Por ahora parece que está bien igual.
    // Elimina el enemigo y limpia esa posición en las tablas.
    limpiar_tablas()

    palabras_a_escribir[posEnArray] = "!"
    enemigos_en[posEnArray].eliminar();
    enemigos_en[posEnArray] = 0

    // console.log(tablas.enemigos_en)

    ok.play();
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1280,
    height: 720,
    backgroundColor: '#ffffff',
    scene: [ MyGame ]
};


const game = new Phaser.Game(config);