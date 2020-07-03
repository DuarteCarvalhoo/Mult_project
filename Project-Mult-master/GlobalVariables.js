var menuNumber = null;  //Jogar-0 Opcoes-1 Ajuda-2 Ranking-3 Creditos-4 Sair-5 Back-6
var musicVolume = 1
var musicAux = musicVolume;
var musicMuted = false;
var soundVolume = 1;
var soundMuted = false;
var musicInit = true;
var hitPoints = 3;
var soundFX;
var boingFX
var dooropenFX
var dmgFX;
var runningFX;
var str_display = "";
var action_trigger = false;
var action;
var GameOver
var backBut;
var GameOverInit = false;
var arr;

var score = 0;
var scoreText;

//IMINIGOS
var enemy1;
var enemy2;
var enemy3;
var enemy4;
var enemy5;
var enemy6;

//SPIKES
var spikes;
/*
var spike1;
var spike2;
var spike3;
var spike4;
var spike5;*/




var solo;
var player;
var tiros;
var collider;
var inv;
var hitPoint1;
var hitPoint2;
var hitPoint3;

var plataformas;
var left = false; //animacao -> o jogador começa automaticamente a olhar em "frente" (para a direita)
var cursors;

var enemies;

var lastColision = 0; 
var d = new Date();
var curr_level = 1;

//Questions
var res;
var alreadyAnswered = []; //Array of ints
var question;
var answers = [];
var correctAnswer;

//Portas
var porta1;
var porta2;
var porta3;
var porta4;
var portaCerta;


var timeText;
var time = 0;

