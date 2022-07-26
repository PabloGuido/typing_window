let listas = require('./listas');
let index = require('../index');
let esto
export default class Ui

{
    constructor (scene, puntos, vidas)
    {        
        esto = this
        this.puntos = scene.add.text(640, 450, "puntos \n" + puntos, {fontSize: '32px', fontStyle: 'bold', color: "#000000",  align: 'center' }).setOrigin(0.5,0)
        this.vidas = scene.add.text(640, 525, "vidas \n ♥ ♥ ♥", {fontSize: '32px', fontStyle: 'bold', color: "#000000",  align: 'center' }).setOrigin(0.5,0)
        this.game_over = false
        // Start - restart - pausa
        this.start_rect = scene.add.rectangle(0, 0, 148*2, 148, 0x000000)
        this.container = scene.add.container(640, 360).setAlpha(0)
        this.container.depth = 0.2
        this.crear_tapas(scene);
        this.container.add(this.start_rect) 
        // Banderas
        this.banderas_rect = scene.add.rectangle(0, 0, 148*2.75, 148, 0x000000)
        this.banderas_rect1 = scene.add.rectangle(-100, 0, 160, 114, 0xffffff)
        this.banderas_rect2 = scene.add.rectangle(100, 0, 160, 114, 0xffffff)
        this.bandera_eng = scene.add.image(-100,0, 'bandera_eng').setInteractive();
        this.bandera_eng.on('pointerover', function (event) {
            this.setTexture('bandera_eng_c');
        });
        this.bandera_eng.on('pointerout', function (event) {
            this.setTexture('bandera_eng');
        });
        this.bandera_eng.on('pointerdown', function (event) {
            listas.elegir_idioma('eng')
            esto.empezar_juego(scene);
            // console.log(listas.palabras)
            // console.log('English')
        });
        this.bandera_esp = scene.add.image(100,0, 'bandera_esp').setInteractive();
        this.bandera_esp.on('pointerover', function (event) {
            this.setTexture('bandera_esp_c');
        });
        this.bandera_esp.on('pointerout', function (event) {
            this.setTexture('bandera_esp');
        });
        this.bandera_esp.on('pointerdown', function (event) {
            listas.elegir_idioma('esp')
            esto.empezar_juego(scene);
            // console.log(listas.palabras)
            // console.log('Español')
        });
        this.banderas_container = scene.add.container(640, 360,[this.banderas_rect,this.banderas_rect1,this.banderas_rect2,this.bandera_eng,this.bandera_esp])
        // Cuenta regresiva
        this.cuenta_regresiva = scene.add.rectangle(0, 0, 148, 148, 0x000000)
        this.cuenta_text = scene.add.text(0, 0, 3, {fontSize: '48px', fontStyle: 'bold', color: "#ffffff",  align: 'center' }).setOrigin(0.5,0.5)
        
        this.cuenta_container = scene.add.container(640, 360,[this.cuenta_regresiva, this.cuenta_text])
        this.cuenta_container.setVisible(false)
        // Game over
        this.game_over_box = scene.add.rectangle(0,0, 148*2.5, 148, 0x000000)
        this.game_over_text = scene.add.text(0, -10, 'Game over \n\n' + 'space to restart', {fontSize: '32px', fontStyle: 'bold', color: "#ffffff",  align: 'center' }).setOrigin(0.5,0.5)
        this.game_over_container = scene.add.container(640,360, [this.game_over_box, this.game_over_text])
        this.game_over_container.setVisible(false)
        // Sonido y música
        this.sonido = scene.add.image(40,40, 'sonido').setInteractive();
        this.musica = scene.add.image(40,120, 'musica').setInteractive();
        this.sonido.on('pointerdown', function (event) {
            index.cambiar_volumen_sonido();
            console.log('sonido on off')
        })
        this.musica.on('pointerdown', function (event) {
            console.log('musica on off')
            index.cambiar_volumen_musica();
        })
    }   
    actualizar_puntos(puntos)
    {
        this.puntos.text = "puntos \n" + puntos
    }
    actualizar_vidas()
    {
        this.vidas.text = this.vidas.text.slice(0, -2); 

    }
    crear_tapas(scene){
        // Crea las tapas en sus respectivas posiciones y las mete en una array.
        let vX = 400
        let vY = 170
        let posiciones = [[-vX,-vY],[0,-vY],[vX,-vY],[-vX,vY-40],[vX,vY-40]]
        let posiciones_box = [[-vX,-50],[0,-50],[vX,-50],[-vX,250],[vX,250]]

        for (let i = 0; i < 5; i++){

            this.tapa = scene.add.rectangle(posiciones[i][0], posiciones[i][1], 200, 244, 0xff0000).setAlpha(0.85);
            this.tapa_palabra = scene.add.rectangle(posiciones[i][0], posiciones[i][1]+150, 200, 44, 0xff00ff).setAlpha(0.85);
            this.tapa.pos = i            
            this.container.add(this.tapa);  
            this.container.add(this.tapa_palabra);
        }
        // console.log(tablas.tabla_mask)
    }
    empezar_juego(scene){
        this.bandera_eng.disableInteractive();
        this.bandera_esp.disableInteractive();
        this.banderas_container.destroy();
        this.cuenta_container.setVisible(true)
        this.timedEvent = scene.time.addEvent({ delay: 1000, callback: this.cuenta_regresiva_comienzo_juego, callbackScope: this, loop: true });
        
    }
    cuenta_regresiva_comienzo_juego(){
        this.cuenta_text.text = this.cuenta_text.text - 1
        if (this.cuenta_text.text <= 0){
            this.timedEvent.remove(false);
            this.cuenta_container.setVisible(false)
            index.timer_creacion_de_grupo_enemigo();
        }
    }
    mostrar_game_over(){
        this.game_over_container.setVisible(true)
    }
    cambiar_estado_game_over(estado){
        this.game_over = estado
    }
    volver_a_jugar(){
        if (this.game_over === true){
            this.game_over = false;
            this.vidas.text = "vidas \n ♥ ♥ ♥"
            this.puntos.text = "puntos \n0"
            this.game_over_container.setVisible(false)
        }
    }

}