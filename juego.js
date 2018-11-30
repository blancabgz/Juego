var rectan = document.getElementById("rectangulo");
var draw = document.getElementById("drawing");
var user = document.getElementById("usuario");
var nodo = document.getElementById("disparo");
var titulo = document.getElementById("titulo");

var jugando = true;
var disparo1;
var contador=1;
var posx;
var posy = 8;
var tablero;
var tagrec;
var puntuacion = 0;

var balls = [];
var balas = [];
function iniciarJuego(){
	tablero = new Tablero(rectan);
	usuario = new Usuario(user);
	window.onkeydown = usuario.movimiento;
	crearBola();
	setInterval(buclePrincipal,100);
	
	
}

function buclePrincipal(){
	
	for (let i = 0; i < balls.length; i++) {
		balls[i].movimiento();	
		balls[i].dibuja();
		balls[i].controlCaida();
	}

}

function crearBola(){
	for (let i = 0; i < 2; i++) {
		aleat = parseInt(Math.random()*(690 - 10) + 10);
		vel = parseInt(Math.random()*(30-1)+1);
		balls.push(new Ball(aleat,8,12,vel,draw));
	}
}


function bucleDisparo(){
	for (let i = 0; i < balas.length; i++) {
		balas[i].movimiento();
		balas[i].dibuja();
		balas[i].controlSubida();
		comprobarColision();
	}
}

function escribirPuntuacion(){
	titulo.innerHTML = "Resultado: " + puntuacion;
}



class Usuario{
	constructor(unodoPadre){
		this.height = 20;
		this.width = 20;
		this.tx = 410;
		this.ty = 680;
		this.fill = 'red';
		this.velocidad = 10;
		this.unodoPadre = unodoPadre;
		this.usera = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
		
		this.usera.setAttributeNS(null,'height',this.height);
		this.usera.setAttributeNS(null,'width',this.width);
		this.usera.setAttributeNS(null,'x',this.tx);
		this.usera.setAttributeNS(null,'y',this.ty);
		this.usera.setAttributeNS(null, 'fill', this.fill);
		unodoPadre.appendChild(this.usera);
	}
	movimientoDerecha(){
		this.tx = this.tx + 25;
	}



	movimientoIzquierda(){
		this.tx = this.tx - 25;
	}

	dibujar(){
		this.usera.setAttributeNS(null,'x',this.tx);
	}

	

}

class Disparo{
	constructor(dnodoPadre,tx,ty){
		this.dnodoPadre = dnodoPadre;
		this.height = 30;
		this.width = 5;
		this.tx = tx +7;
		this.ty = ty -15 ;
		this.velocidad = 50;
		this.fill = 'red';

		this.disp = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
		this.disp.setAttributeNS(null,'height',this.height);
		this.disp.setAttributeNS(null,'width',this.width);
		this.disp.setAttributeNS(null,'x',this.tx);
		this.disp.setAttributeNS(null,'y',this.ty);
		this.disp.setAttributeNS(null, 'fill', this.fill);
		dnodoPadre.appendChild(this.disp);
	}
	movimiento(){
		if(this.ty >= 0){
			this.ty -= this.velocidad;
		}
	}

	dibuja(){
		this.disp.setAttributeNS(null,'y',this.ty);

	}

	controlSubida(){
		if(this.ty <= 0){
			try {
				this.dnodoPadre.removeChild(this.disp);
			} catch (error) {
				
			}
			
		}
	}
}


class Tablero{
	constructor(tnodoPadre){
		this.height = 700;
		this.width = 850;
		this.tx = 0;
		this.ty= 0;
		this.fill = 'pink';
		this.tnodoPadre = tnodoPadre;

		this.tagrec = document.createElementNS("http://www.w3.org/2000/svg", 'image');
		this.tagrec.setAttributeNS(null,'height',this.height);
		this.tagrec.setAttributeNS(null,'width',this.width);
		this.tagrec.setAttributeNS('http://www.w3.org/1999/xlink','href', 'espacio.jpg');
		this.tagrec.setAttributeNS(null,'x',this.tx);
		this.tagrec.setAttributeNS(null,'y',this.ty);
		this.tagrec.setAttributeNS(null, 'fill', this.fill);
		this.tagrec.setAttributeNS(null, 'visibility', 'visible');
		tnodoPadre.appendChild(this.tagrec);
	}
	
}

class Ball{
	constructor(x,y,r,velocidad,nodoPadre){
		this.x = x;
		this.y = y;
		this.r = r;
		this.velocidad = velocidad;
		this.nodoPadre = nodoPadre;

		this.tagball = document.createElementNS('http://www.w3.org/2000/svg', "circle");
		this.tagball.setAttributeNS(null,'cx',this.x);
		this.tagball.setAttributeNS(null,'cy',this.y);
		this.tagball.setAttributeNS(null,'r',this.r);
		this.tagball.setAttributeNS(null, 'fill', 'green');
		nodoPadre.appendChild(this.tagball);
	}

	movimiento(){
		if(this.y < 700){
			this.y += this.velocidad;
			console.log(this.y);

		}
	}

	dibuja(){
		this.tagball.setAttributeNS(null,'cy',this.y);

	}

	controlCaida(){
		if(this.y >= 700){
			try {
				this.nodoPadre.removeChild(this.tagball);
				alert("Ha terminado el juego");
				
			} catch (error) {
			}
			
		}else if(this.y >= 100 && this.y<=110){
			if(balls.length < 5){
				crearBola();
			}
			
		}
	}

	

}

iniciarJuego();
document.body.onkeydown = function(event){
	if (event.keyCode == 39) {
		usuario.movimientoDerecha();
		usuario.dibujar();
	}
	if(event.keyCode == 37) {
		usuario.movimientoIzquierda();
		usuario.dibujar();
	}
	if(event.keyCode == 32 ){
		balas.push(new Disparo(nodo,usuario.tx ,usuario.ty)); 
		setInterval(bucleDisparo,100);
		
	}
}

function comprobarColision(){
	for(var i=0;i< balls.length;i++){
		for(var j=0;j<balas.length;j++){
			if(balls[i].x > balas[j].tx && balls[i].y > balas[j].ty){
				try {
					balls[i].nodoPadre.removeChild(balls[i].tagball);
					balas[j].dnodoPadre.removeChild(balas[j].disp);
					puntuacion += 1;
					escribirPuntuacion();
				} catch (error) {
				}
			}

		}
	}
}

