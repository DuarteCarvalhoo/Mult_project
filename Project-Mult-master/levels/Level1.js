
//animacao -> o jogador começa automaticamente a olhar em "frente" (para a direita)


class Level1 extends Phaser.Scene {

    constructor() {
        super({key: "Level1"});
    }


    create() {

        getQuestion();

        inv = true;
        this.time.delayedCall(1000, turnOff, [], this);


        //Background e outros
        this.add.image(640, 320, "background");
        this.add.image(640, 52, "fundo_cinza");

        //sons

        this.dmgFX = this.sound.add("damage", {volume: soundVolume});
        this.dooropenFX = this.sound.add("door_open", {volume: soundVolume});


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
        solo.create(48, 300, 'plat_pequena');
        solo.create(290, 225, 'plat_pequena');
        solo.create(500, 330, 'plat_pequena');
        solo.create(170, 520, 'plat_pequena');
        solo.create(260, 504, 'plat_vertical');
        solo.create(306, 430, 'plat_media');
        solo.create(695, 250, 'plat_media');
        solo.create(720, 520, 'plat_grande');
        solo.create(543, 504, 'plat_vertical');
        solo.create(797, 410, 'plat_pequena');
        solo.create(1005, 410, 'plat_media');
        solo.create(885, 430, 'plat_v_grande');
        solo.create(1146, 250, 'plat_grande');


        //hitPoints & score/time
        let HP = this.physics.add.staticGroup();

        hitPoint1 = HP.create(1125, 50, "heart");
        hitPoint2 = HP.create(1165, 50, "heart");
        hitPoint3 = HP.create(1205, 50, "heart");

        scoreText = this.add.text(30, 16, 'Score: 0', {fontSize: '32px', fill: '#000000'});
        timeText = this.add.text(30, 50, 'Time: 0', {fontSize: '32px', fill: '#000000'});

        let portasCoor = [];
        porta1 = this.add.image(33, 235, "porta");
        portasCoor[0] = {
            x: porta1.x,
            y: porta1.y
        };
        porta2 = this.add.image(336, 522, "porta");
        portasCoor[1] = {
            x: porta2.x,
            y: porta2.y
        };
        porta3 = this.add.image(961, 522, "porta");
        portasCoor[2] = {
            x: porta3.x,
            y: porta3.y
        };
        porta4 = this.add.image(1245, 182, "porta");
        portasCoor[3] = {
            x: porta4.x,
            y: porta4.y
        };
        portaCerta = portasCoor[answers.indexOf(correctAnswer)];

        //Question
        let QuestionText = this.add.text(250, 10, question, {fontSize: '35px', fill: '#6e1010'});
        let opc1 = this.add.text(25, 100, "1)" + answers[0], {fontSize: '20px', fill: '#000000'});
        let opc2 = this.add.text(320, 100, "2)" + answers[1], {fontSize: '20px', fill: '#000000'});
        let opc3 = this.add.text(615, 100, "3)" + answers[2], {fontSize: '20px', fill: '#000000'});
        let opc4 = this.add.text(910, 100, "4)" + answers[3], {fontSize: '20px', fill: '#000000'});

        this.add.text(33 - 20, 235, "[1]", {fontSize: '20px', fill: '#ffffff'});
        this.add.text(336 - 20, 522, "[2]", {fontSize: '20px', fill: '#ffffff'});
        this.add.text(961 - 20, 522, "[3]", {fontSize: '20px', fill: '#ffffff'});
        this.add.text(1245 - 20, 182, "[4]", {fontSize: '20px', fill: '#ffffff'});

        //Player
        player = this.physics.add.sprite(60, 450, 'chrome');


        player.setBounce(0);
        player.setCollideWorldBounds(true);

        this.physics.add.collider(player, solo);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('chrome', {start: 0, end: 1}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('chrome', {start: 2, end: 3}),
            frameRate: 10,
            repeat: -1

        });

        this.anims.create({
            key: 'left_inv',
            frames: this.anims.generateFrameNumbers('chrome_inv', {start: 0, end: 1}),
            frameRate: 10,
            repeat: -1
        });


        this.anims.create({
            key: 'right_inv',
            frames: this.anims.generateFrameNumbers('chrome_inv', {start: 2, end: 3}),
            frameRate: 10,
            repeat: -1

        });


        //Input Events
        cursors = this.input.keyboard.createCursorKeys();

        //Enemies - internetE(42x43)
        enemies = this.physics.add.group();
        enemy1 = enemies.create(221, 350, "internetE");
        enemy2 = enemies.create(625, 190, "internetE");
        enemy3 = enemies.create(620, 470, "internetE");
        enemy4 = enemies.create(1020, 200, "internetE");
        enemy6 = enemies.create(1010, 500, "internetE");

        this.physics.add.collider(enemies, solo);

        //Colliders
        this.physics.add.collider(player, enemies, this.hitEnemy, null, this);
    }

    update() {
        //ANIMAÇÃO INIMGOS

        if (enemy1.x <= 221) {
            enemy1.setVelocityX(80);
        }
        if (enemy1.x >= 391) {
            enemy1.setVelocityX(-80);
        }
        if (enemy2.x <= 625) {
            enemy2.setVelocityX(200);
        }
        if (enemy2.x >= 795) {
            enemy2.setVelocityX(-200);
        }
        if (enemy3.x <= 620) {
            enemy3.setVelocityX(150);
        }
        if (enemy3.x >= 820) {
            enemy3.setVelocityX(-150);
        }
        if (enemy4.x <= 1020) {
            enemy4.setVelocityX(150);
        }
        if (enemy4.x >= 1190) {
            enemy4.setVelocityX(-150);
        }
        if (enemy6.x <= 1010) {
            enemy6.setVelocityX(150);
        }
        if (enemy6.x >= 1220) {
            enemy6.setVelocityX(-150);
        }

        player.setGravityY(600);



        if (cursors.left.isDown) {
            if (cursors.up.isDown && player.body.touching.down) {

                player.setVelocityX(-100);
                player.setVelocityY(-410);
            }
            else {

                player.setVelocityX(-160);
                if (player.body.touching.down) {

                    if (!inv)
                        player.anims.play('left', true);
                    else
                        player.anims.play('left_inv', true);
                    left = true;
                }
            }
        }
        else if (cursors.right.isDown) {
            if (cursors.up.isDown && player.body.touching.down) {

                player.setVelocityX(100);
                player.setVelocityY(-410);
            }
            else {

                player.setVelocityX(160);
                if (player.body.touching.down) {

                    if (!inv)
                        player.anims.play('right', true);
                    else
                        player.anims.play('right_inv', true);

                    left = false;
                }
            }
        }

        else if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-410);
        }


        else {
            player.setVelocityX(0);

            if (left)
                if (!inv)
                    player.anims.play('left');
                else
                    player.anims.play('left_inv');

            else {
                if (!inv)
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

        if (((player.x > 8 && player.x < 58) && (player.y < 250)) ||
            ((player.x > 311 && player.x < 361) && (player.y > 466)) ||
            ((player.x > 936 && player.x < 986) && (player.y > 466)) ||
            ((player.x > 1220) && (player.y < 250))) {

            if (!this.image)
                this.image = this.add.image(680, 250, "pressiona");
            this.image.visible = true;
            if (cursors.down.isDown) {
                if (this.porta_certa()) {
                    sumScore(100);
                    console.log('passei');
                    this.dooropenFX.play();
                    curr_level += 1;
                    this.scene.start("Jogar");
                }
            }
        }
        else {
            if (this.image)
                this.image.visible = false;

        }


        if (hitPoints === 0) {
            this.scene.stop("Level" + curr_level);
            this.scene.start("GameOverScene");
        }

        hitPointsManager();
        scoreManager();
        timeManager();
    }

    porta_certa() {
        if (player.x > portaCerta.x - 25 && player.x < portaCerta.x + 25 && (player.y > portaCerta.y - 15 || player.y < portaCerta.y + 15)) {
            console.log('certo');
            return true;
        }
        else {
            console.log('errado');
            return false;
        }
    }
    hitEnemy() {

        if(!inv) {
            this.dmgFX.play();
            inv=true;
            hitPoints--;
            this.time.delayedCall(1000, turnOff, [], this);
        }
    }


}

/*function porta_certa(){
   if (player.x>portaCerta.x-25 && player.x<portaCerta.x+25 && (player.y>portaCerta.y-15 || player.y<portaCerta.y+15)){
       console.log('certo');
       return true;
   }
   else{
       console.log('errado');


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
