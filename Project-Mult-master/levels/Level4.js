

//animacao -> o jogador começa automaticamente a olhar em "frente" (para a direita)


class Level4 extends Phaser.Scene {

    constructor() {
        super({key: "Level4"});
    }


    create() {

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
        solo.create(1200,400,'plat_media');
        solo.create(1280-53,300,'bridge_media');
        solo.create(950,504,'plat_vertical');
        solo.create(900,430,'plat_v_grande');
        solo.create(580,430,'plat_v_grande');
        solo.create(725,210,'bridge_media');
        solo.create(350,380,'bridge_mini');
        solo.create(150,380,'bridge_mini');
        solo.create(950,210,'bridge_mini');
        solo.create(53,300,'bridge_media');
        this.add.image(830,550, "trampolim")
        this.add.image(490,550, "trampolim");
        this.add.image(670,550, "trampolim");


        //hitPoints & score/time
        let HP = this.physics.add.staticGroup();

        hitPoint1 = HP.create(1125, 50, "heart");
        hitPoint2 = HP.create(1165, 50, "heart");
        hitPoint3 = HP.create(1205, 50, "heart");
        scoreText = this.add.text(30, 16, 'Score: 0', {fontSize: '32px', fill: '#000000' });
        timeText = this.add.text(30, 50, 'Time: 0', { fontSize: '32px', fill: '#000000' });

        let portasCoor = [];
        porta1 = this.add.image(33, 260, "porta");
        portasCoor[0] = {
            x: porta1.x,
            y: porta1.y
        };
        porta2 = this.add.image(720, 170, "porta");
        portasCoor[1] = {
            x: porta2.x,
            y: porta2.y
        };
        porta3 = this.add.image(1250, 260, "porta");
        portasCoor[2] = {
            x: porta3.x,
            y: porta3.y
        };
        porta4 = this.add.image(1250, 520, "porta");
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

        this.add.text(33-20, 260, "[1]", { fontSize: '20px', fill: '#ffffff'});
        this.add.text(720-20, 170, "[2]", { fontSize: '20px', fill: '#ffffff'});
        this.add.text(1250-20, 260, "[3]", { fontSize: '20px', fill: '#ffffff'});
        this.add.text(1250-20, 520, "[4]", { fontSize: '20px', fill: '#ffffff'});

        //Player
        player = this.physics.add.sprite(740, 500, 'chrome');


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

        enemy1 = enemies.create(1120,350, "internetE");
        enemy2 = enemies.create(1020, 500, "internetE");
        enemy3 = enemies.create(650, 100, "internetE");


        spikes = this.physics.add.staticGroup();

        let spike1_set1 = spikes.create(160, 542, "spike3");
        let spike1_set2 = spikes.create(160+57, 542, "spike3");
        let spike1_set3 = spikes.create(160+57+57, 542, "spike3");
        let spike1_set4 = spikes.create(160+57+57+57, 542, "spike3");

        this.physics.add.collider(spikes, solo);
        this.physics.add.collider(enemies, solo);

        //Colliders
        this.physics.add.collider(player, enemies, this.hitEnemy, null, this);
        this.physics.add.collider(player, enemies, this.hitEnemy, null, this);
    }

    update() {
        //ANIMAÇÃO INIMGOS

        if (enemy1.x<=1120){
            enemy1.setVelocityX(150);
        }
        if (enemy1.x>=1250){
            enemy1.setVelocityX(-150);
        }
        if (enemy2.x<=1020){
            enemy2.setVelocityX(100);
        }
        if (enemy2.x>=1250){
            enemy2.setVelocityX(-100);
        }
        if (enemy3.x<=650){
            enemy3.setVelocityX(80);
        }
        if (enemy3.x>=800){
            enemy3.setVelocityX(-80);
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


        /*  this.add.image(830,550, "trampolim")
            this.add.image(490,550, "trampolim");
            this.add.image(670,550, "trampolim"); */

        if (((player.x>10 && player.x<60)&&(player.y<300)) ||
            ((player.x>720-25 && player.x<720+25)&&(player.y<200)) ||
            ((player.x>1225) && (player.y<300) ) ||
            ((player.x>1225) && (player.y>470) )) {

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
        if(player.x<845 && player.x>810 && player.body.touching.down){
            this.boingFX.play();
            player.setVelocityY(-800);
        }
        if(player.x<510 && player.x>475 && player.body.touching.down){
            this.boingFX.play();
            player.setVelocityY(-800);
        }
        if(player.x<690 && player.x>655 && player.body.touching.down){
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

