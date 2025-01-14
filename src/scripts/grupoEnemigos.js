let este
import Enemigo from './enemigo'
let listas = require('./listas');
let tablas = require('./tablas');

// vars pantalla
let midX = 1280/2
let midY = 720/2
export default class GrupoEnemigos extends Phaser.GameObjects.Container 

{
    constructor (scene, x, y)
    {   
        super(scene); 
        este = this
        this.palabras = listas.palabras.slice(0, listas.palabras.length) 
        this.numerados = true
        // console.log(listas.palabras)

        
    }

    crear_grupo_simple(scene, enemigos_en, posiciones_enemgios, saloon, palabras_a_escribir){
        // false on/off para test
        if (this.numerados === true){
            this.numerados = false
        }
        else {
            this.numerados = true
        }
        this.palabras = listas.palabras.slice(0, listas.palabras.length) 
        let numero_random = Math.floor(Math.random() * 5 + 1);
        for (let i = 0; i < numero_random; i++) {
            // console.log(i)
            this.crear_enemigo_simple(scene, enemigos_en, posiciones_enemgios, saloon, palabras_a_escribir, i+1)
        }
        // console.log(tablas.palabras_numeradas)

    }

    crear_enemigo_simple(scene, enemigos_en, posiciones_enemgios, saloon, palabras_a_escribir, numero_de_enemigo){
        // genera la palabra nueva
        let numero_random = Math.floor(Math.random() * this.palabras .length);
        let nueva_palabra = this.palabras[numero_random]
        // console.log(nueva_palabra)

        // ventana random
        let enemigos_test = []
        for (let i = 0; i < enemigos_en.length; i++){
            if (enemigos_en[i] === 0){
                enemigos_test.push(posiciones_enemgios[i]);
                // console.log(enemigos_test)
            }
        }
        let ventana_random = Math.floor(Math.random() * enemigos_test.length);
        let posicion_disponible_random = enemigos_test[ventana_random]
        // console.log(posicion_disponible_random)

        // posición del enemigo en ventana
        let enemyX = midX + saloon.tabla_ventanas[posicion_disponible_random].x
        let enemyY = midY + saloon.tabla_ventanas[posicion_disponible_random].y
        let skin_enemigo

        // crea el enemigo
        if (this.numerados === false){
            skin_enemigo = "enemigo"

        }
        else if (this.numerados === true){
            skin_enemigo = "enum" + numero_de_enemigo
        }

        let nuevo_enemigo = new Enemigo(scene, enemyX, enemyY, nueva_palabra, posicion_disponible_random, tablas.tabla_mask[posicion_disponible_random], skin_enemigo)
        // console.log(posicion_disponible_random)
        
        enemigos_en[saloon.tabla_ventanas[posicion_disponible_random].pos] = nuevo_enemigo;
        scene.add.existing(nuevo_enemigo)   
        // 
        palabras_a_escribir[posicion_disponible_random] = nueva_palabra
        tablas.palabras_numeradas.push(nueva_palabra);
        // quita la palabra de la copia de la tabla para que no se repitan las palabras
        
        let index_nueva_palabra = this.palabras.indexOf(nueva_palabra); 
        this.palabras.splice(index_nueva_palabra,1);
        // console.log(this.palabras)
    }

    crear_enemigos_numerados(){

    }

}
