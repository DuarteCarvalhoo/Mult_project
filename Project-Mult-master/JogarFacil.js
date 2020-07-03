class JogarFacil extends Phaser.Scene {

	constructor() {
		super({key: "JogarFacil"});
	}

	create(){
		getQuestion();
		inv = false;

		this.add.image(640, 320, "background");
        this.add.image(640, 52, "fundo_cinza");

		this.runningFX = this.sound.add("running",{volume: soundVolume,loop: "true"});
        this.dmgFX = this.sound.add("damage",{volume: soundVolume});
        this.dooropenFX = this.sound.add("door_open",{volume: soundVolume});

        solo = this.physics.add.staticGroup();
        solo.create(640, 595, 'solo').refreshBody();
        solo.create(48,300,'plat_pequena');
        solo.create(290,225,'plat_pequena');
        solo.create(500,330,'plat_pequena');
        solo.create(170,520,'plat_pequena');
        solo.create(260,504,'plat_vertical');
        solo.create(306,430,'plat_media');
        solo.create(695,250, 'plat_media');
        solo.create(720,520,'plat_grande');
        solo.create(543,504,'plat_vertical');
        solo.create(797,410,'plat_pequena');
        solo.create(1005,410,'plat_media');
        solo.create(885,430,'plat_v_grande');
        solo.create(1146,250,'plat_grande');
	
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
        let QuestionText =  this.add.text(250, 10, question, { fontSize: '35px', fill: '#6e1010'});
        let opc1 =  this.add.text(25, 100, "1)"+answers[0], { fontSize: '20px', fill: '#000000'});
        let opc2 =  this.add.text(320, 100, "2)"+answers[1], { fontSize: '20px', fill: '#000000'});
        let opc3 =  this.add.text(615, 100, "3)"+answers[2], { fontSize: '20px', fill: '#000000'});
        let opc4 =  this.add.text(910, 100, "4)"+answers[3], { fontSize: '20px', fill: '#000000'});

        this.add.text(33-20, 235, "[1]", { fontSize: '20px', fill: '#ffffff'});
        this.add.text(336-20, 522, "[2]", { fontSize: '20px', fill: '#ffffff'});
        this.add.text(961-20, 522, "[3]", { fontSize: '20px', fill: '#ffffff'});
        this.add.text(1245-20, 182, "[4]", { fontSize: '20px', fill: '#ffffff'});


        player = this.physics.add.sprite(60, 450, 'chrome');
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

        cursors = this.input.keyboard.createCursorKeys();

        var backBut = this.add.image(15, 15, "backBut").setInteractive();
        backBut.on("pointerdown", function (ev) {
            menuNumber = 6;
        })

    }

	update(){
		if(menuNumber===6){
			this.scene.start("MainMenu");
		}


		player.setGravityY(600);

		if (cursors.left.isDown)
        {
            if (cursors.up.isDown && player.body.touching.down){
                this.runningFX.play();
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
                this.runningFX.play();
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
            this.runningFX.stop();
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
        if (((player.x>8 && player.x<58)&&(player.y<250)) ||
            ((player.x>311 && player.x<361)&&(player.y>466)) ||
            ((player.x>936 && player.x<986)&&(player.y>466)) ||
            ((player.x>1220) && (player.y<250) )) {

            if (!this.image)
                this.image = this.add.image(680, 250, "pressiona");
            this.image.visible = true;
            if (cursors.down.isDown) {
                if(porta_certa()) {
                    this.dooropenFX.play();
                    this.scene.start("JogarFacil");
                }
            }
        }
        else{
            if(this.image)
                this.image.visible=false;
        }
	}
}

function porta_certa(){
   if (player.x>portaCerta.x-25 && player.x<portaCerta.x+25 && (player.y>portaCerta.y-15 || player.y<portaCerta.y+15)){
       return true;
   }
   else
       return false;
}