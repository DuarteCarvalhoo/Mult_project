
//animacao -> o jogador começa automaticamente a olhar em "frente" (para a direita)


class Level3 extends Phaser.Scene {

    constructor() {
        super({key: "Level3"});
    }


    create() {
        console.log("Entrou no Level1");
        getQuestion();



        //Background e outros
        this.add.image(640, 320, "background");
        this.add.image(640, 52, "fundo_cinza");

        //sons
        this.dmgFX = this.sound.add("damage",{volume: soundVolume});
        this.dooropenFX = this.sound.add("door_open",{volume: soundVolume});
        this.boingFX = this.sound.add("boing",{volume: soundVolume});
        //this.runningFX = this.sound.add("running",{volume: 1}); -> POR A FUNCIONAR

        //Level Design
        //char(45x71)
        //plat pequena (94x66)
        //plat media (177x66)
        //plat grande (268x66)
        //plat vertical (86x100)
        //plat v grande (86x249)
        //porta (50x74)
        //bridge(204x16)
        //spike1(19x20)
        //spike2(38x20)
        //spike3(57x20)

        solo = this.physics.add.staticGroup();
        solo.create(640, 595, 'solo').refreshBody();
        solo.create(48,200,'plat_pequena');
        solo.create(250,420,'plat_grande');
        solo.create(350,250,'plat_media');
        solo.create(640,170,'plat_media');
        solo.create(573,342,'plat_v_level3');
        solo.create(598,482,'plat_pequena');
        solo.create(900,250,'plat_pequena');
        solo.create(1191,200,'plat_media');
        solo.create(1232,420,'plat_pequena');
        solo.create(960,460,'plat_pequena');
        this.add.image(490,550, "trampolim");


        //hitPoints & score/time
        let HP = this.physics.add.staticGroup();

        hitPoint1 = HP.create(1125, 50, "heart");
        hitPoint2 = HP.create(1165, 50, "heart");
        hitPoint3 = HP.create(1205, 50, "heart");
        scoreText = this.add.text(30, 16, 'Score: 0', {fontSize: '32px', fill: '#000000' });
        timeText = this.add.text(30, 50, 'Time: 0', { fontSize: '32px', fill: '#000000' });

        let portasCoor = [];
        porta1 = this.add.image(40, 518, "porta");
        portasCoor[0] = {
            x: porta1.x,
            y: porta1.y
        };
        porta2 = this.add.image(620, 415, "porta");
        portasCoor[1] = {
            x: porta2.x,
            y: porta2.y
        };
        porta3 = this.add.image(1250, 132, "porta");
        portasCoor[2] = {
            x: porta3.x,
            y: porta3.y
        };
        porta4 = this.add.image(1250, 352, "porta");
        portasCoor[3] = {
            x: porta4.x,
            y: porta4.y
        };
        portaCerta = portasCoor[answers.indexOf(correctAnswer)];

        //Question
        let QuestionText =  this.add.text(250, 10, question, { fontSize: '35px', fill: '#6e1010'});
        let opc1 =  this.add.text(25, 100, "1)"+answers[0], { fontSize: '20px', fill: '#000000'});
        let opc2 =  this.add.text(320, 100, "2)"+answers[1], { fontSize: '20px', fill: '#000000'});
        let opc3 =  this.add.text(615, 100, "3)"+answers[2], { fontSize: '20px', fill: '#000000'});
        let opc4 =  this.add.text(910, 100, "4)"+answers[3], { fontSize: '20px', fill: '#000000'});

        this.add.text(40-20, 518, "[1]", { fontSize: '20px', fill: '#ffffff'});
        this.add.text(620-20, 415, "[2]", { fontSize: '20px', fill: '#ffffff'});
        this.add.text(1250-20, 132, "[3]", { fontSize: '20px', fill: '#ffffff'});
        this.add.text(1250-20, 352, "[4]", { fontSize: '20px', fill: '#ffffff'});

        //Player
        player = this.physics.add.sprite(60, 100, 'chrome');


        player.setBounce(0);
        player.setCollideWorldBounds(true);

        this.physics.add.collider(player, solo);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('chrome', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('chrome', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: -1

        });

        this.anims.create({
            key: 'left_inv',
            frames: this.anims.generateFrameNumbers('chrome_inv', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });


        this.anims.create({
            key: 'right_inv',
            frames: this.anims.generateFrameNumbers('chrome_inv', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: -1

        });


        //Input Events
        cursors = this.input.keyboard.createCursorKeys();

        //Enemies - internetE(42x43)
        enemies = this.physics.add.group();

        enemy1 = enemies.create(220,420-33-18, "internetE");
        enemy2 = enemies.create(710, 500, "internetE");
        enemy3 = enemies.create(920, 500, "internetE");
        enemy4 = enemies.create(1190, 100, "internetE");

        spikes = this.physics.add.staticGroup();

        let spike1_set1 = spikes.create(145, 377, "spike3");
        let spike1_set2 = spikes.create(145, 542, "spike3");
        let spike1_set3 = spikes.create(202, 542, "spike3");
        let spike1_set4 = spikes.create(259, 542, "spike3");
        let spike1_set5 = spikes.create(259+57, 542, "spike3");
        let spike1_set6 = spikes.create(259+57+57, 542, "spike3");
        let spike1_set7 = spikes.create(1280-57, 542, "spike3");
        let spike1_set8 = spikes.create(1280-57-57, 542, "spike3");
        let spike1_set9 = spikes.create(1280-57-57-57, 542, "spike3");
        let spike1_set10 = spikes.create(1280-57-57-57, 542, "spike3");
        let spike1_set11 = spikes.create(940,460-33-10, "spike2");

        this.physics.add.collider(spikes, solo);
        this.physics.add.collider(enemies, solo);

        //Colliders
        this.physics.add.collider(player, enemies, this.hitEnemy, null, this);
        this.physics.add.collider(player, enemies, this.hitEnemy, null, this);
    }

    update() {
        //ANIMAÇÃO INIMGOS

        if (enemy1.x<=220){
            enemy1.setVelocityX(150);
        }
        if (enemy1.x>=400){
            enemy1.setVelocityX(-150);
        }
        if (enemy2.x<=710){
            enemy2.setVelocityX(120);
        }
        if (enemy2.x>=800){
            enemy2.setVelocityX(-120);
        }
        if (enemy3.x>=920){
            enemy3.setVelocityX(-80);
        }
        if (enemy3.x<=870){
            enemy3.setVelocityX(80);
        }
        if (enemy4.x>=1190){
            enemy4.setVelocityX(-40);
        }
        if (enemy4.x<=1130){
            enemy4.setVelocityX(40);
        }


        player.setGravityY(600);
        /* if (player.body.velocity.x!=0 ){
             console.log(player.body.velocity.x);
             this.runningFX.play();
         }
         if(player.body.velocity.x==0) {
             console.log(player.body.velocity.x);
             this.runningFX.stop();
         }*/


        if (cursors.left.isDown)
        {
            if (cursors.up.isDown && player.body.touching.down){
                player.setVelocityX(-100);
                player.setVelocityY(-410);
            }
            else {

                player.setVelocityX(-160);
                if(player.body.touching.down) {

                    if(!inv)
                        player.anims.play('left', true);
                    else
                        player.anims.play('left_inv', true);
                    left = true;
                }
            }
        }
        else if (cursors.right.isDown)
        {
            if (cursors.up.isDown && player.body.touching.down){
                player.setVelocityX(100);
                player.setVelocityY(-410);
            }
            else {

                player.setVelocityX(160);
                if(player.body.touching.down) {

                    if(!inv)
                        player.anims.play('right', true);
                    else
                        player.anims.play('right_inv', true);

                    left = false;
                }
            }
        }

        else if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-410);
        }


        else {
            player.setVelocityX(0);

            if (left)
                if(!inv)
                    player.anims.play('left');
                else
                    player.anims.play('left_inv');

            else{
                if(!inv)
                    player.anims.play('right');
                else
                    player.anims.play('right_inv');

            }
        }


        //   VERIFICA QUANDO O JOGADOR SE ENCONTRA NUMA DAS PORTAS


        /*  this.add.image(33, 235, "porta");
            this.add.image(336, 522, "porta");
            this.add.image(961, 522, "porta");
            this.add.image(1245, 182, "porta"); */

        if (((player.x>10 && player.x<60)&&(player.y>430)) ||
            ((player.x>620-25 && player.x<620+25)&&(player.y>200)) ||
            ((player.x>1225) && (player.y>200) ) ||
            ((player.x>1225) && (player.y<200) )) {

            if (!this.image)
                this.image = this.add.image(680, 250, "pressiona");
            this.image.visible = true;
            if (cursors.down.isDown) {
                if(this.porta_certa()) {
                    sumScore(100);
                    this.dooropenFX.play();
                    curr_level += 1;
                    this.scene.start("Jogar");
                }
            }
        }
        else{
            if(this.image)
                this.image.visible=false;

        }
        if(player.x<505 && player.x>470 && player.body.touching.down){
            this.boingFX.play();
            player.setVelocityY(-800);
        }


        if (hitPoints === 0){
            this.scene.stop("Level" + curr_level);
            this.scene.start("GameOverScene");
        }




        hitPointsManager();
        scoreManager();
        timeManager();
    }

    hitEnemy(){

        if(!inv) {
            this.dmgFX.play();
            inv=true;
            hitPoints--;
            this.time.delayedCall(1000, turnOff, [], this);
        }
    }

    porta_certa(){
        if (player.x>portaCerta.x-25 && player.x<portaCerta.x+25 && (player.y>portaCerta.y-15 || player.y<portaCerta.y+15)){
            return true;
        }
        else {
            return false;
        }
    }
}
/*
function porta_certa(){
    if (player.x>portaCerta.x-25 && player.x<portaCerta.x+25 && (player.y>portaCerta.y-15 || player.y<portaCerta.y+15)){
        return true;
    }
    else
        return false;
}

function hitEnemy() {

    if(!inv) {
        this.dmgFX.play();
        inv=true;
        hitPoints--;
        this.time.delayedCall(1000, turnOff, [], this);
    }
}

function turnOff(){
    inv = false;
}

function tirosOff(){
    tiros.visible = false;
}
*/

