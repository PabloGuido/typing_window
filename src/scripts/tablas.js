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

restablecer_tablas = function(pos) {
	enemigos_en[pos] = 0
	numero_de_letra[pos] = 0
	palabras_a_escribir[pos] = "!"


}

sacar_primer_palabra = function(){
	palabras_numeradas.shift()
	console.log(palabras_numeradas)
}


