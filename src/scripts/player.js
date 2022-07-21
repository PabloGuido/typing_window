export default class Player

{
    constructor (scene)
    {        
    	this.puntos = 0
    	this.vidas = 3
    }

    sumar_puntos(cantidad)
    {
    	this.puntos += cantidad
    	console.log(this.puntos)
    }
    restar_vidas()
    {
    	this.vidas -= 1
    	console.log('Cantidad de vidas restantes: ' + this.vidas)
    }
}












// export let vidas = 3
// export let puntos = 0
// export let sumar_puntos
// export let restar_vidas

// sumar_puntos = function (cantidad)
//     {
//     	puntos += cantidad;
//     }

// restar_vidas = function ()
//     {
//     	vidas = vidas - 1;
//     }
