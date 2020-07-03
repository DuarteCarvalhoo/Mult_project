
//animacao -> o jogador começa automaticamente a olhar em "frente" (para a direita)


class Level3 extends Phaser.Scene {
    constructor() {
        super({key: "Level3"});
    }


    create() {

        //Background e outros
        invecibility = false;

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
        //plat_v_level3(43x279)

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
        solo.create(1000,460,'plat_pequena');
        this.add.image(40, 518, "porta");
        this.add.image(620, 415, "porta");
        this.add.image(1250, 132, "porta");
        this.add.image(1250,352, "porta");





        //hitPoints & score
        let HP = this.physics.add.staticGroup();
        hitPoint1 = HP.create(1120, 50, "heart");
        hitPoint2 = HP.create(1160, 50, "heart");
        hitPoint3 = HP.create(1200, 50, "heart");
        scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#9c748a' });

        //Player
        player = this.physics.add.sprite(40, 90, 'dude');

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


        //Input Events
        cursors = this.input.keyboard.createCursorKeys();

        //Enemies
        enemies = this.physics.add.group();

        enemy1 = enemies.create(220,420-33-18, "internetE");
        enemy2 = enemies.create(710, 500, "internetE");
        enemy3 = enemies.create(920, 500, "internetE");
        enemy4 = enemies.create(1190, 100, "internetE");

        //Level Design
        //char(45x71)
        //plat pequena (94x66)
        //plat media (177x66)
        //plat grande (268x66)
        //plat vertical (86x100)
        //plat v grande (86x249)
        //porta (50x74)
        //bridge(204x16)
        //internetE(35x36)
        //spike1(19x20)
        //spike2(38x20)
        //spike3(57x20)
        //plat_v_level3(43x279)
        //solo(1280x87)

        /*
        solo.create(640, 595, 'solo').refreshBody();
        solo.create(48,200,'plat_pequena');
        solo.create(250,420,'plat_grande');
        solo.create(400,250,'plat_media');
        solo.create(640,170,'plat_media');
        solo.create(573,342,'plat_v_level3');
        solo.create(598,482,'plat_pequena');
        solo.create(900,250,'plat_pequena');
        solo.create(1191,200,'plat_media');
        solo.create(1232,420,'plat_pequena');
        solo.create(1000,460,'plat_pequena');*/

        //Spikes
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
        let spike1_set11 = spikes.create(980,460-33-10, "spike2");





        this.physics.add.collider(enemies, solo);
        this.physics.add.collider(spikes, solo);


        //Colliders
        this.physics.add.collider(player, enemies, hitEnemy, null, this);
        this.physics.add.collider(player, spikes, hitEnemy, null, this);

    }

    update() {

        this.scene.stop("Level"+curr_level-1);
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
        //this.runningFX.stop();
        //player.setGravityX(100);

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
                    player.anims.play('left', true);
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
                    player.anims.play('right', true);
                    left = false;
                }
            }
        }

        else if (cursors.up.isDown && player.body.touching.down)
        {
            this.jumpFX.play();
            player.setVelocityY(-410);
        }
        /*else if (cursors.down.isDown){
            this.scene.stop("Level1");
            this.scene.start("Jogar");

        }*/

        else {

            player.setVelocityX(0);
            if (left)
                player.anims.play('turnL');
            else{
                player.anims.play('turnR');
            }

            /*this.add.image(40, 518, "porta");
            this.add.image(620, 415, "porta");
            this.add.image(1250, 132, "porta");
            this.add.image(1250,352, "porta");*/

        }
        if (((player.x>10 && player.x<60)&&(player.y>430)) ||
            ((player.x>620-25 && player.x<620+25)&&(player.y>200)) ||
            ((player.x>1225) && (player.y>200) ) ||
            ((player.x>1225) && (player.y<200) )) {

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
