function Level (){
  this.meteor = [];
  this.builds = [];
  this.bullet = [];
  this.quantBuilds = 4;
  this.quantMeteor = 1;
  //this.music = true;
  //this.end = false;
}

Level.prototype.init = function(){
  var x = 0;
  for (var i = 0; i < this.quantBuilds; i++) {
     x = x + 93;
     var predio = new Sprite(x, 650);
     predio.height = 100;
     x = x + 170;
     this.builds.push(predio);
  }
};
    
Level.prototype.spawn = function(){
  var x = 0;
  for (var i = 0; i < this.quantMeteor; i++) {
     x = 1 + Math.floor(Math.random() * 1000);
     var meteoro = new Sprite(x, -30);
     meteoro.g = 20; 
     if(meteoro.x < 500){
        meteoro.direcao = 0;
     }
     else{
        meteoro.direcao = 1;
     }
     this.meteor.push(meteoro);
   }
};

Level.prototype.dispose = function(){
   
};

Level.prototype.mover = function (dt) {
  for (var i = this.meteor.length-1; i >= 0; i--) {
    if(this.meteor[i].direcao == 0){
        this.meteor[i].moverR(dt);
      }
    if(this.meteor[i].direcao == 1){
        this.meteor[i].moverL(dt);
      }
       if(
          this.meteor[i].x >  1000 ||
          this.meteor[i].x < -1000 ||
          this.meteor[i].y >  1000 ||
          this.meteor[i].y < -1000
          ){
        this.meteor.splice(i, 1);
      }
    }
  for (var i = this.bullet.length - 1; i >= 0; i--) {
      this.bullet[i].mover(dt);
      if(
          this.bullet[i].x >  1000 ||
          this.bullet[i].x < -1000 ||
          this.bullet[i].y >  1000 ||
          this.bullet[i].y < -1000
          ){
        this.bullet.splice(i, 1);
      }
    }
};

Level.prototype.desenharImg = function (ctx,key) {
    for (var i = 0; i < this.bullet.length; i++) {
      this.bullet[i].desenharImg(ctx,key);
    }
};

Level.prototype.desenhar = function (ctx) {
    for (var i = 0; i < this.builds.length; i++) {
      this.builds[i].desenharCubo(ctx);
    }
    for (var i = 0; i < this.meteor.length; i++) {
      this.meteor[i].desenharCirculo(ctx);
    }
};

Level.prototype.fire = function (alvo, audiolib, key, vol){
  if(alvo.cooldown>0) return;
  var tiro = new Sprite();
  tiro.x = alvo.x ;
  tiro.y = alvo.y - 40;
  tiro.angle = alvo.angle;
  tiro.vy = -600;
  tiro.width = 16;
  tiro.height = 32;
  tiro.imgkey = "shot";
  this.bullet.push(tiro);
  alvo.cooldown = 1;
  if(audiolib && key) audiolib.play(key,vol);
}

Level.prototype.perseguirAng = function (alvo, dt) {
   
};

Level.prototype.colidiuCom = function (resolveColisao) {
    for (var i = 0; i < this.meteor.length; i++) {
      for (var j = 0;  j < this.builds.length; j++) {
        if(this.builds[j].colidiuCom(this.meteor[i])){
          resolveColisao(this.builds[j], this.meteor[i]);
          this.builds.splice(j, 1);
          this.meteor.splice(i, 1);
        }
       }
     }
 };





