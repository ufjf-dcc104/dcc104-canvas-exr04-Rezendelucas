function Sprite(x,y){
  this.g = 0;
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.ax = 0;
  this.ay = 0;
  this.am = 0;
  this.width = 64;
  this.height = 64;
  this.angle = 0;
  this.vang = 0;
  this.color = "red";
  this.cooldown = 0;
  this.debug = false;
  this.debugmove = false;
  this.direcao = 0;
  this.imgkey;
}

Sprite.prototype.desenharCone = function (ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.angle*2*Math.PI/360);
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.moveTo(-this.width/2, -this.height/2);
  ctx.lineTo(-this.width/2, +this.height/2);
  ctx.lineTo(+this.width/2, 0);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "white";
  ctx.stroke();
  ctx.strokeStyle = "red";
  ctx.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
  ctx.restore();
};

Sprite.prototype.desenharCubo = function (ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);

  ctx.fillStyle = "black";
  ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
  ctx.fill();

  ctx.strokeStyle = "black";
  ctx.stroke();
  ctx.strokeRect(-this.width/2, -this.height/2, this.width, this.height);

  ctx.restore();
};

Sprite.prototype.desenharCirculo = function (ctx) {
    ctx.fillStyle = "rgba(241, 178, 21, 0.3)";
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    var radius = 30;  //raio do circulo = diametro/2
    var anticlockwise = true;
    var startAngle = 0;     //inicia o arco na posição 0 graus (direita)
    var endAngle = Math.PI*2; //termina o arco na posição 360 graus (volta completa)
    ctx.arc(this.x, this.y, radius, startAngle, endAngle, anticlockwise);
    ctx.closePath();
    ctx.stroke(); //desenha a borda
    ctx.fill();   //preenche

};

Sprite.prototype.desenharImg = function (ctx, img) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.angle*2*Math.PI/360);
  ctx.rotate(Math.PI/2);
  ctx.fillStyle = this.color;
  ctx.drawImage(img, -this.width/2, -this.height/2, this.width, this.height);
  if(this.debug){
    //debug sprite
    ctx.strokeStyle = "black";
    ctx.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
   //ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
  }
  ctx.restore();
};

Sprite.prototype.desenharBackground = function (ctx, img) {
   ctx.save();
   ctx.translate(this.x, this.y);
   ctx.drawImage(img, 0, 0, this.width, this.height);
   ctx.restore();
};

Sprite.prototype.moverR = function (dt) {
    this.vx = this.vx + this.ax*dt;
    this.x = this.x + 1 + this.vx*dt;   
    this.vy = this.vy + (this.ay + this.g)*dt;
    this.y = this.y + this.vy*dt;
};

Sprite.prototype.moverL = function (dt) {
    this.vx = this.vx + this.ax*dt; 
    this.x = this.x - 1 + this.vx*dt;
    this.vy = this.vy + (this.ay + this.g)*dt;
    this.y = this.y + this.vy*dt;
};

Sprite.prototype.mover = function (dt) {
    this.vx = this.vx + this.ax*dt;
    this.x = this.x + this.vx*dt;
    this.vy = this.vy + (this.ay + this.g)*dt;
    this.y = this.y + this.vy*dt;
};

Sprite.prototype.moverPlayer = function (dt) {
  this.vx = this.vx + this.ax*dt;
  this.vy = this.vy + (this.ay+this.g)*dt;
  this.x = this.x + this.vx*dt;
  this.y = this.y + this.vy*dt;
  if(this.angle > -180 && this.angle < 0)
     this.angle = this.angle + this.vang*dt;
   else if(this.angle <= -180)
     this.angle = -179;
   else
     this.angle = -1;
  if(this.cooldown>0) {
    this.cooldown -= dt;
  } else {
    this.cooldown = 0;
  }
};

Sprite.prototype.moverAng = function (dt) {
  this.angle = this.angle + this.vang*dt;
  this.ax = this.am * Math.cos(Math.PI * this.angle/180);
  this.ay = this.am * Math.sin(Math.PI * this.angle/180);
  this.vx = this.vx + this.ax*dt;
  this.vy = this.vy + (this.ay+this.g)*dt;
  this.x = this.x + this.vx*dt;
  this.y = this.y + this.vy*dt;
  if(this.cooldown>0) {
    this.cooldown -= dt;
  } else {
    this.cooldown = 0;
  }
};

Sprite.prototype.moverFundo = function (dt) {
  this.vy = this.vy +  this.ay*dt;
  this.y = this.y + this.vy*dt;
  this.vx = -200 + this.ax*dt;
  this.x = this.x + this.vx*dt;
};

Sprite.prototype.colidiuCom = function (alvo) {
  if(this.x + this.width < alvo.x)   return false;  // colisão pela esquerda
  if(this.x > alvo.x + alvo.width)   return false;  // colisão pela direita
  if(this.y + this.height < alvo.y)  return false;  //  colisão por cima
  if(this.y > alvo.y + alvo.height)  return false;  // colisão por baixo
  return true;
};







