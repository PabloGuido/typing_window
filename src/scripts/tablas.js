// tablas
export let enemigos_en = [0,0,0,0,0];
export let posiciones_enemgios = [0,1,2,3,4]
export let numero_de_letra = [0,0,0,0,0];
export let palabras_a_escribir = ["!","!","!","!","!"];
export let limpiar_tablas
export let todosIgualCero

limpiar_tablas = function(pos) {
	enemigos_en[pos] = 0
	numero_de_letra[pos] = 0
	palabras_a_escribir[pos] = "!"

}

todosIgualCero = function(escena, fnc) {
let comparacion = (currentValue) => currentValue === 0;
    if (enemigos_en.every(comparacion)){
        // console.log('todos igual a 0')

        var timer = escena.time.addEvent({
        delay: 1000,                // ms
        callback: fnc,
        });
}	
}
