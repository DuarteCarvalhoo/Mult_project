
//animacao -> o jogador começa automaticamente a olhar em "frente" (para a direita)


class Level1 extends Phaser.Scene {
    constructor() {
        super({key: "Level1"});
    }


    create() {


        //Background e outros


        this.add.image(640, 320, "background");

        //sons
        this.jumpFX = this.sound.add("jump",{volume: soundVolume});
        this.dmgFX = this.sound.add("damage",{volume: soundVolume});
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
        solo.create(48,300,'plat_pequena');
        solo.create(290,225,'plat_pequena');
        solo.create(490,330,'plat_pequena');
        solo.create(170,520,'plat_pequena');
        solo.create(260,504,'plat_vertical');
        solo.create(306,430,'plat_media');
        solo.create(710,250, 'plat_media');
        solo.create(720,520,'plat_grande');
        solo.create(543,504,'plat_vertical');
        solo.create(797,410,'plat_pequena');
        solo.create(1005,410,'plat_media');
        solo.create(885,430,'plat_v_grande');
        solo.create(1146,250,'plat_grande');
        this.add.image(33, 235, "porta");
        this.add.image(336, 522, "porta");
        this.add.image(961, 522, "porta");
        this.add.image(1245, 182, "porta");



        //hitPoints & score
        let HP = this.physics.add.staticGroup();

        hitPoint1 = HP.create(1120, 50, "heart");
        hitPoint2 = HP.create(1160, 50, "heart");
        hitPoint3 = HP.create(1200, 50, "heart");
        scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#9c748a' });

        //Player
        player = this.physics.add.sprite(100, 450, 'dude');



        hitPoints = 3;
        score = 0;

        player.setBounce(0);
        player.setCollideWorldBounds(true);


        this.physics.add.collider(player, solo);




        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turnR',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'turnL',
            frames: [ { key: 'dude', frame: 0 } ],
            frameRate: 20

        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1

        });

        this.anims.create({
            key: 'left_inv',
            frames: this.anims.generateFrameNumbers('dude_inv', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turnR_inv',
            frames: [ { key: 'dude_inv', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'turnL_inv',
            frames: [ { key: 'dude_inv', frame: 0 } ],
            frameRate: 20

        });

        this.anims.create({
            key: 'right_inv',
            frames: this.anims.generateFrameNumbers('dude_inv', { start: 5, end: 8 }),
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
        this.physics.add.collider(player, enemies, hitEnemy, null, this);


    }

    update() {


        //ANIMAÇÃO INIMGOS

        if (enemy1.x<=221){
            enemy1.setVelocityX(80);
        }
        if (enemy1.x>=391){
            enemy1.setVelocityX(-80);
        }
        if (enemy2.x<=625){
            enemy2.setVelocityX(200);
        }
        if (enemy2.x>=795){
            enemy2.setVelocityX(-200);
        }
        if (enemy3.x<=620){
            enemy3.setVelocityX(150);
        }
        if (enemy3.x>=820){
            enemy3.setVelocityX(-150);
        }
        if (enemy4.x<=1020){
            enemy4.setVelocityX(150);
        }
        if (enemy4.x>=1190){
            enemy4.setVelocityX(-150);
        }
        if (enemy6.x<=1010){
            enemy6.setVelocityX(150);
        }
        if (enemy6.x>=1220){
            enemy6.setVelocityX(-150);
        }



        player.setGravityY(600);
        //this.runningFX.stop();
        //player.setGravityX(100);

        /*if(invecibility){
            //player.visible=false;

        }*/

        if (cursors.left.isDown)
        {
            //this.runningFX.play();
            if (cursors.up.isDown && player.body.touching.down){
                this.jumpFX.play();
                player.setVelocityX(-100);
                player.setVelocityY(-410);
            }
            else {

                player.setVelocityX(-160);
                if(player.body.touching.down) {
                    if(!invecibility)
                        player.anims.play('left', true);
                    else
                        player.anims.play('left_inv', true);
                    left = true;
                }
            }
        }
        else if (cursors.right.isDown)
        {
            //this.runningFX.play();
            if (cursors.up.isDown && player.body.touching.down){
                this.jumpFX.play();
                player.setVelocityX(100);
                player.setVelocityY(-410);
            }
            else {

                player.setVelocityX(160);
                if(player.body.touching.down) {
                    if(!invecibility)
                        player.anims.play('right', true);
                    else
                        player.anims.play('right_inv', true);

                    left = false;
                }
            }
        }

        else if (cursors.up.isDown && player.body.touching.down)
        {

            this.jumpFX.play();
            player.setVelocityY(-410);
        }


        else {

            player.setVelocityX(0);
            if (left)
                if(!invecibility)
                    player.anims.play('turnL');
                else
                    player.anims.play('turnL_inv');

            else{
                if(!invecibility)
                    player.anims.play('turnR');
                else
                    player.anims.play('turnR_inv');

            }


        }




        //   VERIFICA QUANDO O JOGADOR SE ENCONTRA NUMA DAS PORTAS


        /*  this.add.image(33, 235, "porta");
            this.add.image(336, 522, "porta");
            this.add.image(961, 522, "porta");
            this.add.image(1245, 182, "porta"); */


        if (((player.x>8 && player.x<58)&&(player.y<250)) ||
            ((player.x>311 && player.x<361)&&(player.y>466)) ||
            ((player.x>936 && player.x<986)&&(player.y>466)) ||
            ((player.x>1220) && (player.y<250) )) {

            if (!this.image)
                this.image = this.add.image(680, 250, "pressiona");
            this.image.visible = true;
            if (cursors.down.isDown) {
                if(porta_certa()) {
                    curr_level += 1;
                    this.scene.start("Jogar");
                }
            }
        }
        else{
            if(this.image)
                this.image.visible=false;

        }



        hitPointsManager();
        scoreManager();
    }
}

function porta_certa(){
    return true;
}

function hitPointsManager(){ //enable body nao funciona

    if (hitPoints === 2){
        hitPoint1.disableBody(true, true);
    }
    else if (hitPoints === 1){
        hitPoint2.disableBody(true, true);
    }
    else if (hitPoints === 0){
        hitPoint3.disableBody(true, true);
    }
}

function scoreManager() {
    scoreText.setText("Score: " + score);
}


function hitEnemy() {

    console.log(invecibility);
    if(!invecibility) {
        this.dmgFX.play();
        hitPoints--;
        invecibility=true;
        this.time.delayedCall(3000, turnOff, [], this);
    }

}
function turnOff(){


    console.log('tf');
    invecibility = false;


}
