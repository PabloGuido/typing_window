export default class Player

{
    constructor ()
    {        
    	this.puntos = 0
    	this.vidas = 3
    }

    sumar_puntos(cantidad)
    {
    	this.puntos += cantidad
    	// console.log(this.puntos)
    }
    restar_vidas()
    {
    	this.vidas -= 1
    	// console.log('Cantidad de vidas restantes: ' + this.vidas)
    }
    volver_a_jugar(){
        this.puntos = 0
        this.vidas = 3
    }
}


