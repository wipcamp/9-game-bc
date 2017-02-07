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
    game.load.image('monster_1','images/poring2.png');
    game.load.image('hitboxP_1','images/hit_Box.png');
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
var hitboxP;
var timeHitboxAppear = 0;
var timeHitboxKill = 0;
var indexHitbox = 0
///////////
var monsterA;
var monster;
var indexM=0;
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
    /*bleach = this.add.sprite(game.world.width*(5/10),game.world.height*(8/16), 'bleach');
    bleach.anchor.set(0.5);
    bleach.scale.setTo(1, 1);*/
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
    ////////////////////////////////////////
    button1.events.onInputDown.add(buy, this);
    game.input.mouse.capture = true;
    ///////////////////////////////////////
    /*timer = game.time.create(true);
    timer.loop(3000, spawn, this);
    timer.start();*/
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
        pirateA[i].update();
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
        monsterA[i].update();
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
    this.health = 1000;
    this.alive = true;
    this.pirate_1 = pirate.create(x ,y , 'pirate_1');
    this.pirate_1.animations.add('walk',[0,1,2],2,true);
    this.pirate_1.animations.add('attack',[3,4,5],1,true);
    this.pirate_1.anchor.set(0.5);
    this.pirate_1.scale.setTo(2.0, 2.0);
    game.physics.arcade.enable(this.pirate_1);
    this.pirate_1.body.gravity.y = 980;
    this.pirate_1.body.collideWorldBound = true;
    this.pirate_1.name = indexP.toString();
}
pirate1.prototype.update = function(){
    if(this.pirate_1.overlap(monster)){
      console.log("overlap");
      this.pirate_1.body.velocity.x = 0;
      this.pirate_1.animations.play('attack');
      timer = game.time.create(true);
      timer.loop(1000, hitboxAppear, this);
      timer.start();
      /*timer = game.time.create(true);
      timer.loop(1020, hitboxKilled, this);
      timer.start();*/
    }else{
      timer.stop();
      this.pirate_1.body.velocity.x = 200;
      this.pirate_1.animations.play('walk');
    }
}
function hitboxP1( pirate_1 , game ){
    this.game = game;
    var x = pirate_1.x + 175;
    var y = pirate_1.y + 75;
    this.alive = true;
    this.hitboxP_1 = hitboxP.create( x , y , 'hitboxP_1');
    this.hitboxP_1.anchor.set(1);
    this.hitboxP_1.scale.setTo(0.2, 0.3);
    //game.physics.arcade.enable(hitboxA);
    game.physics.arcade.enable(this.hitboxP_1);
    //this.hitboxP_1.name = indexHitbox.toString();
    var countHitbox = 1;
    timer = game.time.create(true);
    timer.loop(10, hitboxKilled, this);
    timer.start();
}
function hitboxAppear( countHitbox ){
    if( timeHitboxAppear < game.time.now ){
      timeHitboxAppear = game.time.now + 3000;
      console.log("spawn hitbox");
      hitboxA.push(new hitboxP1( this.pirate_1,game));
      //hitboxA.pop(hitboxP1(this.pirate_1,game));
      //countHitbox = 1;
    }
}
function hitboxKilled(  hitboxP_1,countHitbox) {
    if( timeHitboxKill < game.time.now && countHitbox != 0){
      timeHitboxKill = game.time.now + 3000;
      //this.alive = false;

      //this.hitboxP_1.kill();
      this.hitboxP_1.kill();
      hitboxA.pop();
      indexHitbox++;
      console.log("hitbox killed*****");
      countHitbox = 0;

    }
}
pirate1.prototype.damage = function() {
    console.log("pirate damaged")
    this.health -= 1;
    if (this.health <= 0){
        this.alive = false;
        this.pirate_1.kill();
    }
}
function monsterHitPirate( pirate_1,monster) {
    console.log("monsterHitPirate");
}
////////////////////////////monster///////////////////////////////////////////
function spawn(){
      monsterA.push(new monster1(indexM,game));
      indexM++;
}
monster1 = function (indexM,game) {
    var x = game.world.width*(9.5/10);
    var y = game.world.height*(4/7);
    this.game = game;
    this.health = 100;
    this.alive = true;
    this.monster_1 = monster.create(x, y, 'monster_1');
    this.monster_1.anchor.set(0.5);
    this.monster_1.scale.setTo(0.15, 0.15);
    game.physics.arcade.enable(this.monster_1);
    this.monster_1.body.gravity.y = 980;
    this.monster_1.body.collideWorldBound = true;
    this.monster_1.name = indexM.toString();
}
monster1.prototype.update = function(){
    if(this.monster_1.overlap(pirate)){
      //console.log("overlap");
      this.monster_1.body.velocity.x = 0;
      //this.monster_1.animations.play('attack');
      /*timer3 = game.time.create(true);
      timer3.loop(2001, hitMonster, this);
      timer3.start();*/
    }else{
      this.monster_1.body.velocity.x = -200;
      //this.monster_1.animations.play('walk');
    }
}
monster1.prototype.damage = function() {
    console.log("monster damaged")
    this.health -= 1;
    if (this.health <= 0){
        this.alive = false;
        this.monster_1.kill();
        //monsterA.pop();
        console.log("monster killed")
    }
}

function monsterGotDamaged( monster_1, hitboxP) {
    //console.log("monsterGotDamaged");
    monsterA[monster_1.name].damage();
}
//////////////////////////////////////////////////
