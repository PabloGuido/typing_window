// tablas
export let enemigos_en = [0,0,0,0,0];
export let posiciones_enemgios = [0,1,2,3,4]
export let numero_de_letra = [0,0,0,0,0];
export let palabras_a_escribir = ["!","!","!","!","!"];
export let palabras_numeradas = []
export let tabla_mask = [];
export let restablecer_tablas
export let sacar_primer_palabra
export let todosIgualCero
export let todos_los_enemigos_eliminados = true
export let enemigos_eliminados 

restablecer_tablas = function(pos) {
	enemigos_en[pos] = 0
	numero_de_letra[pos] = 0
	palabras_a_escribir[pos] = "!"


}

sacar_primer_palabra = function(){
	palabras_numeradas.shift()
	// console.log(palabras_numeradas)
}

enemigos_eliminados = function(trueOrNot) {
	todos_los_enemigos_eliminados = trueOrNot
	// console.log('enemigos eliminados: ' + todos_los_enemigos_eliminados)
}



