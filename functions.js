    
            var canvas = document.getElementById('myCanvas');
            var ctx = canvas.getContext('2d');
            var  dir = 0, speed = 10;
            let score = 0;
            let walls = [];
            let pause = false;
            var image = new Image();
            var image2 = new Image();
            var audio = new Audio();
            audio.src="siuu.mp3";
            image.src="buzo.png";
            image2.src="concha.png";

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

            const player = new Cuadrado(20,80,50,50,"black"); 
            const target = new Cuadrado(randomInteger(460), randomInteger(460),40,40,"black");
          
          

            walls.push( new Cuadrado(80,370,320,15,"gray") )
            walls.push( new Cuadrado(-10,35,800,15,"gray") )
            walls.push( new Cuadrado(80,40,15,115,"BLACK") )
            walls.push( new Cuadrado(80,140,115,15,"BLACK") )

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

            function update(){ 

                if (!pause) {
                    if (dir == 1) {
                        player.y-=speed;
                        if (player.y+50 < 0) {
                            player.y = 550;
                        }
                    }
                    if (dir == 2) {
                        player.y+=speed;
                        if (player.y+50 > 700) {
                            player.y = -50;
                        }
                    }
                    if (dir == 3) {
                        player.x+=speed;
                        if (player.x+50 > 700) {
                            player.x = -50;
                        }
                    }
                    if (dir == 4) {
                        player.x-=speed;
                        if (player.x+50 < 0) {
                            player.x = 550;
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

            //DISEÑO
            function paint()
            {
            //MAPA DE FONDO
                ctx.fillStyle = "#70401F";
                ctx.fillRect(0,0,700,700);

            //PUNTAJE Y TITULO
                ctx.font = "20px Georgia";
                ctx.fillStyle = "black";
                ctx.fillText("Score: "+score, 5, 20);
                ctx.font = "20px Georgia";
                ctx.fillStyle = "WHITE";
                ctx.fillText("Adventures  of  Tommy  the  diver", 300, 23);
                
            //JUGADORES
                ctx.drawImage(image,player.x,player.y,50,53);
                
                ctx.drawImage(image2, target.x, target.y, 40, 40);
              
                for (var i = walls.length - 1; i >= 0; i--) {
                    walls[i].paint(ctx);
                }

                if (pause) {

                    ctx.fillStyle = "rgba(154,160,154,0.5)";
                    ctx.fillRect(0,0,700,700);

                    ctx.font = "40px Georgia";
                    ctx.fillStyle = "black";
                    ctx.fillText("P A U S E", 185, 225);
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