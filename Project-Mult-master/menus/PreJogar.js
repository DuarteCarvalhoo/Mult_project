class PreJogar extends Phaser.Scene {

	constructor() {
		super({key: "PreJogar"});
	}

	create(){
		this.add.image(640, 320, "background");
		this.add.image(400,140,"title");
        this.add.image(960,270,"FundoCinzaBut");
        this.add.image(300,460, "HTMLMenu" );
        this.add.image(440,370, "PPMenu" );
        this.add.image(550,390, "inimigo5Menu" );
        this.add.image(620,390, "inimigo4Menu" );
        this.add.image(500,400, "inimigo3Menu" );
        this.add.image(580,390, "inimigo2Menu" );
        this.add.image(520,400, "inimigo1Menu" );

        console.log(musicInit);
        if (musicInit) {
            this.soundFX = this.sound.add("music1", {loop: "true", volume: musicVolume, key: "music1"});
            this.soundFX.play();
            musicInit = false;
        }

        var jogarNormal = this.add.image(960, 180, "modoNormal").setInteractive();
        var jogarFacil = this.add.image(960, 300, "modoFacil").setInteractive();
        var backBut = this.add.image(1040, 400, "backBut").setInteractive();

        menuNumber = -1;

        jogarNormal.on("pointerdown", function (ev) {
        	menuNumber = 0;
        });

        jogarFacil.on("pointerdown", function (ev) {
        	menuNumber = 1;
        });

        backBut.on("pointerdown", function (ev) {
            menuNumber = 6;        
        });
	}

	update(){
		if (menuNumber===0){

			this.scene.start("Jogar");
		}
		else if(menuNumber===1){

			this.scene.start("JogarFacil");
		}
		else if(menuNumber===6){
			this.scene.start("MainMenu");
		}
	}

}