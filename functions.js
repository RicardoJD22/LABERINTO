var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var  dir = 0, speed = 10;
let score = 0;
let walls = [];
let pause = false;
var image = new Image();
var image2 = new Image();
var fondoImg = new Image();
var pauseImg = new Image();
var audio = new Audio();
let cronometro;
let isRunning = false;
let segundos = 0;
let minutos = 0;
var tiempoTotal = 0; 
var tiempoRestante = tiempoTotal; 
var intervalo = 1000; 

//audio.src="song.mp3";
//audio.src="siuu.mp3";
fondoImg.src="PARK.jpeg";
image.src="Mamado.png";
image2.src="rigby.png";
pauseImg.src="Pause.jpg";
var imagenFondo = new Image();
imagenFondo.src = 'Espacio.jpg';

class Cuadrado{

    constructor(x,y,w,h,c){
         this.x = x;
         this.y = y;
         this.w = w;
         this.h = h;
         this.c = c;
    }

    paint(ctx){

          ctx.fillStyle = this.c;
          ctx.fillRect(this.x,this.y,this.w,this.h);
          ctx.strokeRect(this.x,this.y,this.w,this.h);

    }

    seTocan(otro){
        if(this.x < otro.x + otro.w &&  
           this.x + this.w > otro.x &&  
           this.y < otro.y + otro.h &&   
           this.y + this.h > otro.y  ) 
        { 
            return true;   
        }
            return false;
    }

}

const player = new Cuadrado(20,40,50,50,"black"); 
const target = new Cuadrado(randomInteger(460), randomInteger(460),40,40,"black");




//BORDES 
walls.push( new Cuadrado(-10,30,1650,5,"BLACK") )
walls.push( new Cuadrado(0,30,5,1100,"BLACK") )
walls.push( new Cuadrado(0,1095,1450,6,"BLACK") )
walls.push( new Cuadrado(1550,1095,450,6,"BLACK") )
walls.push( new Cuadrado(1640,0,5,1100,"BLACK") )
//walls.push( new Cuadrado(0,1090,1400,5,"BLACK") )

//ESTRUCTURA DE LABERINTO (SUPERIOR)
walls.push( new Cuadrado(350,30,15,140,"BlACK") )
walls.push( new Cuadrado(180,160,480,15,"BLACK") )
walls.push( new Cuadrado(40,160,60,15,"BLACK") )
walls.push( new Cuadrado(180,230,120,15,"BLACK") )
walls.push( new Cuadrado(90,105,15,200,"BLACK") )
walls.push( new Cuadrado(30,305,15,390,"BLACK") )
walls.push( new Cuadrado(0,695,200,15,"BLACK") )
walls.push( new Cuadrado(90,300,340,15,"BLACK") )
walls.push( new Cuadrado(180,160,15,80,"BLACK") )
walls.push( new Cuadrado(0,90,215,15,"BLACK") )
walls.push( new Cuadrado(650,90,215,15,"BLACK") )
walls.push( new Cuadrado(820,90,15,140,"BLACK") )
walls.push( new Cuadrado(580,160,15,70,"BLACK") )
walls.push( new Cuadrado(450,95,65,15,"BLACK") )
walls.push( new Cuadrado(415,240,15,70,"BLACK") )
walls.push( new Cuadrado(500,35,15,70,"BLACK") )
walls.push( new Cuadrado(510,240,15,70,"BLACK") )
walls.push( new Cuadrado(670,240,15,70,"BLACK") )
walls.push( new Cuadrado(820,230,15,85,"BLACK") )
walls.push( new Cuadrado(970,30,15,350,"BLACK") )
walls.push( new Cuadrado(1068,110,15,185,"BLACK") )
walls.push( new Cuadrado(1068,180,185,15,"BLACK") )
walls.push( new Cuadrado(1420,330,105,15,"BLACK") )
walls.push( new Cuadrado(1420,540,225,15,"BLACK") )
walls.push( new Cuadrado(1240,450,80,15,"BLACK") )
walls.push( new Cuadrado(1510,330,15,120,"BLACK") )
walls.push( new Cuadrado(1320,100,15,550,"BLACK") )
walls.push( new Cuadrado(1510,100,15,155,"BLACK") )
walls.push( new Cuadrado(1420,200,15,350,"BLACK") )
walls.push( new Cuadrado(1068,100,450,15,"BLACK") )
walls.push( new Cuadrado(750,300,15,90,"BLACK") )
walls.push( new Cuadrado(875,390,15,90,"BLACK") )
walls.push( new Cuadrado(510,375,380,15,"BLACK") )
walls.push( new Cuadrado(875,475,280,15,"BLACK") )
walls.push( new Cuadrado(1140,260,15,400,"BLACK") )
walls.push( new Cuadrado(1140,260,110,15,"BLACK") )
walls.push( new Cuadrado(1235,260,15,110,"BLACK") )
walls.push( new Cuadrado(900,175,80,15,"BLACK") )
walls.push( new Cuadrado(745,160,15,70,"BLACK") )
walls.push( new Cuadrado(1150,580,80,15,"BLACK") )
walls.push( new Cuadrado(745,220,90,15,"BLACK") )
walls.push( new Cuadrado(415,240,110,15,"BLACK") )
walls.push( new Cuadrado(510,300,255,15,"BLACK") )

//ESTRUCTURA DE LABERINTO (INFERIOR)
walls.push( new Cuadrado(1525,750,120,15,"BLACK") )
walls.push( new Cuadrado(1320,650,230,15,"BLACK") )
walls.push( new Cuadrado(1415,660,15,200,"BLACK") )
walls.push( new Cuadrado(400,735,1030,15,"BLACK") )
walls.push( new Cuadrado(1415,850,130,15,"BLACK") )
walls.push( new Cuadrado(510,390,15,100,"BLACK") )
walls.push( new Cuadrado(295,390,15,100,"BLACK") )
walls.push( new Cuadrado(295,380,120,15,"BLACK") )
walls.push( new Cuadrado(650,640,15,100,"BLACK") )
walls.push( new Cuadrado(875,490,15,100,"BLACK") )
walls.push( new Cuadrado(780,590,220,15,"BLACK") )
walls.push( new Cuadrado(400,380,15,370,"BLACK") )
walls.push( new Cuadrado(670,390,15,100,"BLACK") )
walls.push( new Cuadrado(510,390,15,100,"BLACK") )
walls.push( new Cuadrado(650,750,15,100,"BLACK") )
walls.push( new Cuadrado(650,835,250,15,"BLACK") )
walls.push( new Cuadrado(200,305,15,290,"BLACK") )
walls.push( new Cuadrado(100,475,100,15,"BLACK") )
walls.push( new Cuadrado(200,580,100,15,"BLACK") )
walls.push( new Cuadrado(550,820,15,110,"BLACK") )
walls.push( new Cuadrado(985,830,15,100,"BLACK") )
walls.push( new Cuadrado(550,930,450,15,"BLACK") )
walls.push( new Cuadrado(510,600,15,150,"BLACK") )
walls.push( new Cuadrado(990,830,330,15,"BLACK") )
walls.push( new Cuadrado(1020,680,15,60,"BLACK") )
walls.push( new Cuadrado(1000,1130,530,15,"BLACK") )
walls.push( new Cuadrado(510,590,70,15,"BLACK") )
walls.push( new Cuadrado(870,680,15,70,"BLACK") )
walls.push( new Cuadrado(1310,830,15,200,"BLACK") )
walls.push( new Cuadrado(1450,1015,15,85,"BLACK") )
walls.push( new Cuadrado(1550,1015,15,85,"BLACK") )
walls.push( new Cuadrado(1550,1015,95,15,"BLACK") )
walls.push( new Cuadrado(1510,250,135,15,"BLACK") )
walls.push( new Cuadrado(1310,1015,150,15,"BLACK") )
walls.push( new Cuadrado(1310,935,230,15,"BLACK") )
walls.push( new Cuadrado(200,820,350,15,"BLACK") )
walls.push( new Cuadrado(285,580,15,180,"BLACK") )
walls.push( new Cuadrado(110,900,360,15,"BLACK") )
walls.push( new Cuadrado(110,770,15,140,"BLACK") )
walls.push( new Cuadrado(375,1005,15,80,"BLACK") )
walls.push( new Cuadrado(510,1005,15,80,"BLACK") )
walls.push( new Cuadrado(375,1075,150,15,"BLACK") )
walls.push( new Cuadrado(190,1005,15,90,"BLACK") )
walls.push( new Cuadrado(100,985,15,110,"BLACK") )
walls.push( new Cuadrado(190,1005,200,15,"BLACK") )
walls.push( new Cuadrado(190,785,15,50,"BLACK") )
walls.push( new Cuadrado(465,1000,220,15,"BLACK") )
walls.push( new Cuadrado(670,1000,15,90,"BLACK") )
walls.push( new Cuadrado(755,1000,15,90,"BLACK") )
walls.push( new Cuadrado(755,1000,300,15,"BLACK") )
walls.push( new Cuadrado(670,1075,90,15,"BLACK") )
walls.push( new Cuadrado(466,900,15,100,"BLACK") )
walls.push( new Cuadrado(1050,910,15,105,"BLACK") )
walls.push( new Cuadrado(0,985,100,15,"BLACK") )
walls.push( new Cuadrado(1225,910,15,120,"BLACK") )
walls.push( new Cuadrado(1225,1015,120,15,"BLACK") )
walls.push( new Cuadrado(1050,910,190,15,"BLACK") )


window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 17);
        };
}());

document.addEventListener("keydown", (e) =>{

    if (!pause) {
        switch(e.keyCode){ 
            case 87:
                dir = 1;
            break;
            case 83:
                dir = 2;
            break;
            case 68:
                dir = 3;
            break; 
            case 65:
                dir = 4;
            break; 
        }  
    }

    switch(e.keyCode){  
        case 32:
             //speed+=5;
            pause = !pause;
        break;  
    }

})
//DIMENSIÓN (CAMINO DEL JUGADOR Y TARGET)
function update(){ 

        if (!pause) {
        if (dir == 1) {
            player.y-=speed;
            if (player.y+50 < 0) {
                player.y = 1655;
            }
        }
        if (dir == 2) {
            player.y+=speed;
            if (player.y+50 > 1900) {
                player.y = -50;
            }
        }
        if (dir == 3) {
            player.x+=speed;
            if (player.x+50 > 1655) {
                player.x = -50;
            }
        }
        if (dir == 4) {
            player.x-=speed;
            if (player.x+50 < 0) {
                player.x = 1655;
            }
        } 

        if (player.seTocan(target)) {

            target.x = randomInteger(460);
            target.y = randomInteger(460);
            score+=10
            audio.play();
        }

        for (var i = walls.length - 1; i >= 0; i--) { 

            if (player.seTocan(walls[i])) {
                

                if (dir == 1) {
                    player.y+=speed;
                }
                if (dir == 2) {
                    player.y-=speed;
                }
                if (dir == 3) {
                    player.x-=speed;
                }
                if (dir == 4) {
                    player.x+=speed;
                }
                dir = 0;
            }

            if (target.seTocan(walls[i])) {
                target.x = randomInteger(460);
                target.y = randomInteger(460);
            }
        } 

    } 

    paint(); 
    window.requestAnimationFrame(update); 
}

//DISEÑO DE LABERINTO
function paint(){
//MAPA DE FONDO

ctx.drawImage(fondoImg,0,0,1645,1100);
   // ctx.fillRect(0,0,1645,1100);
    audio.play();

//PUNTAJE Y TITULO
    ctx.font = "20px ARIAL";
    ctx.fillStyle = "BLACK";
    ctx.fillText("SCORE: "+score, 5, 20);
    ctx.font = "20px ARIAL";
    ctx.fillStyle = "BLACK";
    ctx.fillText("REGULAR SHOW ", 730, 23);


    ctx.font = "30px Arial";
    ctx.fillStyle = "BLACK";

    // Dibuja el tiempo restante en el canvas
    ctx.fillText("Tiempo: " + tiempoRestante + "s", 1200, 30);
    
//JUGADORES
    ctx.drawImage(image,player.x,player.y,40,40);
    ctx.drawImage(image2, target.x, target.y, 40, 40);
  
    for (var i = walls.length - 1; i >= 0; i--) {
        walls[i].paint(ctx);
    }

    if (pause) {

//DISEÑO DE PAUSADO
    ctx.drawImage(pauseImg,0,0,1645,1100);
    //ctx.fillRect(0,0,700,700);
    ctx.font = "50px ARIAL";
    ctx.fillStyle = "WHITE";
    ctx.fillText("P A U S E (PRESIONA [ESPACIO] PARA REANUDAR)", 185, 225);
    ctx.fillText("(PRESIONA [ESPACIO] PARA REANUDAR)", 300, 425);

    }

 
}

    update();



function randomRgbColor() {
    let r = randomInteger(255);
    let g = randomInteger(255);
    let b = randomInteger(255);
    return "rgba("+r+","+g+","+b+",0.5)";
}
function randomInteger(max) {
    return Math.floor(Math.random()*(max + 1));
} 


//TEMPORIZADOR
  function dibujarTiempo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas

    // Configura el estilo del texto
  }

  // Función para actualizar el temporizador
  function actualizarTemporizador() {
    tiempoRestante++; // Reduce el tiempo restante en 1 segundo

    if (tiempoRestante >= 0) {
      dibujarTiempo(); // Dibuja el tiempo actualizado
    } else {
      clearInterval(intervalID); // Detiene el temporizador cuando el tiempo se agota
      alert("Tiempo agotado");
    }
  }

  // Inicia el temporizador
  var intervalID = setInterval(actualizarTemporizador, intervalo);

  // Llama a la función de dibujo inicial
  dibujarTiempo();
