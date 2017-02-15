var game = new Phaser.Game(1500, 600, Phaser.AUTO, "game");
var main = { preload : preload , create: create , update : update};
game.state.add('main', main);
game.state.start('main');
function preload() {
    game.load.image('ship', 'images/ship.png');
	  //game.load.image('kraken','images/boss.png');
    game.load.image('background','images/sea.png');
    game.load.image('tower1','images/tower4.png');
    game.load.image('tower2','images/tower3.png');
    game.load.image('bleach','images/bleach3.png');
    game.load.image('bleach2','images/bleach2.png');
    game.load.spritesheet('pirate_1','images/testSpritePirate11.png',100,100);
    game.load.image('button1','images/button1_1.png');
    game.load.spritesheet('monster_1','images/poringsprite7.png',420,800);
    game.load.image('hitboxP_1','images/hit_Box.png');
    game.load.image('hitboxM_1','images/hit_BoxM1.png');
    game.load.image('dummyP1','images/ff.png');
}
///////////
var tower1;
var tower2;
var bleach;
var bleach2;
///////////
var button;
var button1;
///////////
var pirateA;
var pirate;
var indexP=0;
var attackP=0;
var pAttacking;
var startP;
var hitboxP;
var timeHitboxAppear = 0;
var indexHitbox = 0
///////////
var monsterA;
var monster;
var indexM=0;
var startM;
var hitboxM;
var timeHitboxMAppear = 0;
var indexHitboxM = 0
///////////
var check = false;
///////////
var timer;
var timer2;
///////////
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.image(0,0,'background');
    game.add.image(800,0,'background');
    this.myWorld = game.add.group();
    this.myWorld.enableBody = true;
    button = game.add.group();
    /////////////////////////////////////////
    bleach = this.add.sprite(game.world.width*(5/10),game.world.height*(8/16), 'bleach');
    bleach.anchor.set(0.5);
    bleach.scale.setTo(1, 1);
    /////////////////////////////////////////
    bleach2 = this.myWorld.create(game.world.width*(1/10),game.world.height*(14/16), 'bleach2');
    bleach2.anchor.set(0.2);
    bleach2.scale.setTo(3, 3);
    bleach2.body.immovable = true;
    /////////////////////////////////////////
    tower1 = this.add.sprite(game.world.width*(1/10),game.world.height*(3/7), 'tower1');
    tower1.anchor.set(0.5);
    tower1.scale.setTo(0.7, 0.7);
    tower1.health = 100;
    tower1.alive = true;
    game.physics.arcade.enable(tower1);
    /////////////////////////////////////////
    tower2 = this.add.sprite(game.world.width*(37/39),game.world.height*(4/16), 'tower2');
    tower2.anchor.set(0.5);
    tower2.scale.setTo(0.9,0.9);
    /////////////////////////////////////////
    pirateA=[];
    pirate = game.add.group();
    pirate.enableBody = true;
    hitboxA=[];
    hitboxP = game.add.group();
    hitboxP.enableBody = true;
    ////////////////////////////////////////
    button1 = this.add.sprite(game.world.width*(2/11),game.world.height*(9/10), 'button1');
    button1.anchor.set(0.5);
    button1.scale.setTo(0.4, 0.4);
    button1.inputEnabled = true;
    ////////////////////////////////////////
    monsterA=[];
    monster = game.add.group();
    monster.enableBody = true;
    hitboxAM=[];
    hitboxM = game.add.group();
    hitboxM.enableBody = true;
    ////////////////////////////////////////
    button1.events.onInputDown.add(buy, this);
    game.input.mouse.capture = true;
    ///////////////////////////////////////
    timer = game.time.create(true);
    timer.loop(1000, spawn, this);
    timer.start();
    //////////////////////////////////////
    spawn();
}

function update() {
    ///////////////pirate////////////////////
    for( var i =0; i < pirateA.length ; i++){
      if(pirateA[i].alive){
        game.physics.arcade.collide(pirateA[i].pirate_1,this.myWorld);
      }
    }
    for( var i =0; i < pirateA.length ; i++){
      if(pirateA[i].alive){
        //if(hitboxA[i].alive){
          pirateA[i].update(i);
        //}
      }
    }
    for( var i =0; i < pirateA.length ; i++){
      if(pirateA[i].alive){
        game.physics.arcade.overlap( pirateA[i].pirate_1 , hitboxM, pirateGotDamaged, null , this);
      }
    }
    /////////////////////////monster///////// /////////
    for( var i =0; i < monsterA.length ; i++){
      if(monsterA[i].alive){
        game.physics.arcade.collide(monsterA[i].monster_1,this.myWorld);
      }
    }
    for( var i =0; i < monsterA.length ; i++){
      if(monsterA[i].alive){
        monsterA[i].update(i);
      }
    }
    for( var i =0; i < monsterA.length ; i++){
      if(monsterA[i].alive){
        game.physics.arcade.overlap( monsterA[i].monster_1 , hitboxP, monsterGotDamaged, null , this);
      }
    }
    /////////////////////////////////////////////////

}
//////////////////////////////pirate//////////////////////////////////////////
function buy(){
      pirateA.push(new pirate1(indexP,game));
      indexP++;
}
pirate1 = function (indexP,game) {
    var x = game.world.width*(1/11);
    var y = game.world.height*(4/10);
    this.game = game;
    this.health = 20;
    this.alive = true;
    this.pirate_1 = pirate.create(x ,y , 'pirate_1');
    this.pirate_1.animations.add('walk',[0,1,2],2,true);
    //aniAttack = this.pirate_1.animations.add('attack',[3,4,5],1,false);
    this.pirate_1.animations.add('attack',[3,4,5],1,false);
    Pdefault = this.pirate_1.animations.add('Pdefault',[0],1,true);
    this.pirate_1.anchor.set(0.5);
    this.pirate_1.scale.setTo(2.0, 2.0);
    game.physics.arcade.enable(this.pirate_1);
    this.pirate_1.body.gravity.y = 980;
    this.pirate_1.body.collideWorldBound = true;
    this.pirate_1.events.onOutOfBounds.add( killPirate, this);
    this.pirate_1.name = indexP.toString();
    this.pirate_1.body.velocity.x = 200;
    startP = 0;
    hitboxA.push(new hitboxP1( this.pirate_1,game));
}
pirate1.prototype.update = function(i){
    hitboxA[i].update(this.pirate_1);
    if(pirateA[i].pirate_1.animations.frame==3||
    pirateA[i].pirate_1.animations.frame==4){
      pirateA[i].pirate_1.body.velocity.x = 0;
      if( pirateA[i].pirate_1.animations.frame==3 ){
        pirateA[i].pirate_1.body.velocity.x = 0;
      }else if( pirateA[i].pirate_1.animations.frame==4 ){
        timer = game.time.create(true);
        timer.add(0, hitboxAppear, hitboxA[this.pirate_1.name]);
        timer.start();
        pirateA[i].pirate_1.body.velocity.x = 0;
      }
    }

    if( ( this.pirate_1.body.overlapY) & this.pirate_1.startP == 1){
        this.pirate_1.animations.play('Pdefault');
        console.log("knocked");
        this.pirate_1.body.velocity.x = -200;
    }else if(this.pirate_1.overlap(monster)){
        this.pirate_1.startP = 1;
        this.pirate_1.body.velocity.x = 0;
        this.pirate_1.animations.play('attack');
    }else if( this.pirate_1.body.overlapY ){
        this.pirate_1.animations.play('walk');
        this.pirate_1.body.velocity.x = 200;
    }
}
function hitboxP1( pirate_1 , game ){
    this.game = game;
    var x = pirate_1.x + 200;
    var y = pirate_1.y + 75;
    this.alive = true;
    this.hitboxP_1 = hitboxP.create( x , y , 'hitboxP_1');
    this.hitboxP_1.anchor.set(1.9);
    this.hitboxP_1.scale.setTo(0.1, 0.3);
    game.physics.arcade.enable(this.hitboxP_1);
    //this.hitboxP_1.name = indexHitbox.toString();
    var countHitbox = 1;
    this.hitboxP_1.kill();
}
hitboxP1.prototype.update = function(pirate_1){
    this.hitboxP_1.x=pirate_1.x+175;
    this.hitboxP_1.y=pirate_1.y+75;
}
function hitboxAppear( ){
    if( timeHitboxAppear < game.time.now ){
      timeHitboxAppear = game.time.now + 1000;
      //console.log("spawn hitbox");
      this.hitboxP_1.revive();
      //thisHitbox.reset(0,0);
      timer = game.time.create(true);
      timer.add(10, hitboxKilled, this);
      timer.start();
    }
}
function hitboxKilled(  hitboxP_1 ) {
    this.hitboxP_1.kill();
    //console.log("hitbox killed*****");
}
function pirateGotDamaged( pirate_1, hitboxM ) {
    //console.log("monsterGotDamaged");
    pirateA[pirate_1.name].damage();
}
pirate1.prototype.damage = function() {
    console.log("pirate damaged")
    this.health -= 1;
    if ( this.health == 10){
        console.log("knocked 1");
        this.pirate_1.body.velocity.y = -400;
    }
    if ( this.health == 5){
        console.log("knocked 2");
        this.pirate_1.body.velocity.y = -600;
    }
    if (this.health <= 0){
        this.alive = false;
        this.pirate_1.kill();
    }
}
function killPirate( pirate ) {
    pirate.kill();
}
////////////////////////////monster///////////////////////////////////////////
function spawn(){
      monsterA.push(new monster1(indexM,game));
      indexM++;
}
monster1 = function (indexM,game) {
    var x = game.world.width*(9.5/10);
    var y = game.world.height*(4.55/7);
    this.game = game;
    this.health = 5;
    this.alive = true;
    this.monster_1 = monster.create(x, y, 'monster_1');
    Mwalk = this.monster_1.animations.add('Mwalk',[0,1,2,3,4,5,6,7,8,9],20,true);
    Mdefault = this.monster_1.animations.add('Mdefault',[10],1,true);
    attackM = this.monster_1.animations.add('attackM',[11,12,13,14,15,16,17,18,19,20],20,false);
    deadM = this.monster_1.animations.add('deadM',[21],1,true);
    this.monster_1.anchor.set(0.5);
    this.monster_1.scale.setTo(0.15, 0.15);
    game.physics.arcade.enable(this.monster_1);
    this.monster_1.body.gravity.y = 980;
    this.monster_1.body.collideWorldBound = true;
    this.monster_1.events.onOutOfBounds.add( killMonster, this);
    this.monster_1.name = indexM.toString();
    this.monster_1.body.velocity.x = -200;
    startM = 0;
    hitboxAM.push(new hitboxM1( this.monster_1,game));
}
monster1.prototype.update = function(i){
    hitboxAM[i].update(this.monster_1);

    if( monsterA[i].monster_1.animations.frame==15,16){
      monsterA[i].monster_1.body.velocity.x = 0;
      if( monsterA[i].monster_1.animations.frame==15){
        monsterA[i].monster_1.body.velocity.x = 0;
      }else if( monsterA[i].monster_1.animations.frame==16 ){
        timer = game.time.create(true);
        timer.add(0, hitboxAppearM, hitboxAM[this.monster_1.name]);
        timer.start();
        monsterA[i].monster_1.body.velocity.x = 0;
      }
    }
    if( !(this.monster_1.body.overlapY) && this.monster_1.startM == 1){
      this.monster_1.animations.play('Mdefault');
      this.monster_1.body.velocity.x = 400;
    }else if(this.monster_1.overlap(pirate)){
      this.monster_1.startM = 1;
      this.monster_1.body.velocity.x = 0;
      this.monster_1.animations.play('attackM');
    }else if( this.monster_1.body.overlapY ){
      this.monster_1.body.velocity.x = -200;
      this.monster_1.animations.play('Mwalk');
    }
}
function hitboxM1( monster_1 , game ){
    this.game = game;
    var x = monster_1.x - 80;
    var y = monster_1.y + 55;
    this.alive = true;
    this.hitboxM_1 = hitboxM.create( x , y , 'hitboxM_1');
    this.hitboxM_1.anchor.set(1);
    this.hitboxM_1.scale.setTo(0.1, 0.5);
    game.physics.arcade.enable(this.hitboxM_1);
    //this.hitboxM_1.name = indexHitbox.toString();
    var countHitbox = 1;
    this.hitboxM_1.kill();
}
hitboxM1.prototype.update = function(monster_1){
    this.hitboxM_1.x = monster_1.x - 40;
    this.hitboxM_1.y = monster_1.y + 55;
}
function hitboxAppearM( ){
    if( timeHitboxMAppear < game.time.now ){
      timeHitboxMAppear = game.time.now + 500;
      //console.log("spawn hitbox M");
      this.hitboxM_1.revive();
      timer = game.time.create(true);
      timer.add(10, hitboxMKilled, this);
      timer.start();
    }
}
function hitboxMKilled(  hitboxM_1 ) {
    this.hitboxM_1.kill();
    //console.log("hitbox killed*****");
}
function monsterGotDamaged( monster_1, hitboxP) {
    //console.log("monsterGotDamaged");
    monsterA[monster_1.name].damage();
}
monster1.prototype.damage = function() {
    this.health -= 3;
    if ( this.health == 3){
        //console.log("knocked 1");
        this.monster_1.body.velocity.y = -400;
    }
    if ( this.health <= 2){
        //console.log("knocked 2");
        this.monster_1.body.velocity.y = -600;
    }
    if (this.health <= 0){
        this.alive = false;
        //killMonster( this.monster_1 );
        this.monster_1.body.velocity.x = 0;
        this.monster_1.body.velocity.y = -1000;
        this.monster_1.animations.play('deadM');
        timer = game.time.create(true);
        timer.add(250, killMonster, this);
        timer.start();
    }
}
function killMonster( ) {
    console.log("monster kill");
    this.monster_1.exists = false;
    this.monster_1.kill();
}

//////////////////////////////////////////////////
