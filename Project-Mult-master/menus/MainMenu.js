class MainMenu extends Phaser.Scene {
    constructor() {
        super({key: "MainMenu"});
    }

    create() {


        this.add.image(640, 320, "background");
        this.add.image(400,140,"title");
        this.add.image(960,270,"FundoCinzaBut");
        this.add.image(300,460, "HTMLMenu" );
        this.add.image(440,390, "PPMenu" );
        this.add.image(550,390, "inimigo5Menu" );
        this.add.image(620,390, "inimigo4Menu" );
        this.add.image(500,400, "inimigo3Menu" );
        this.add.image(580,390, "inimigo2Menu" );
        this.add.image(520,400, "inimigo1Menu" );

        if (musicInit) {
            this.soundFX = this.sound.add("music1", {loop: "true", volume: musicVolume, key: "music1"});
            this.soundFX.play();
            musicInit = false;
        }

        //var  title = this.add.image(200, 200, "title"); reduce png size
        var jogarBut = this.add.image(960, 120, "jogarBut").setInteractive();
        var opcoesBut = this.add.image(960, 180, "opcoesBut").setInteractive();
        var ajudaBut = this.add.image(960, 240, "ajudaBut").setInteractive();
        var rankingBut = this.add.image(960, 300, "rankingBut").setInteractive();
        var creditosBut = this.add.image(960, 360, "creditosBut").setInteractive();
        var sairBut = this.add.image(960, 420, "sairBut").setInteractive();


        /*music = this.add.audio('music1');
        music.play();*/

        menuNumber = null;

        jogarBut.on("pointerdown", function (ev) {
            menuNumber = 0;
        });

        opcoesBut.on("pointerdown", function (ev) {
            menuNumber = 1;
        });

        ajudaBut.on("pointerdown", function (ev) {
            menuNumber = 2;
        });

        rankingBut.on("pointerdown", function (ev) {
            menuNumber = 3;
        });

        creditosBut.on("pointerdown", function (ev) {
            menuNumber = 4;
        });

        sairBut.on("pointerdown", function (ev) {
            menuNumber = 5;
        });
    }

    update() {

        if(musicMuted){
            this.soundFX.volume = 0;
        }
        if(!musicMuted) {
            this.soundFX.volume = musicVolume;
        }

        if(musicAux!=musicVolume){
            this.soundFX.stop();
            musicVolume = musicAux;
            console.log("AUX: " +musicAux + "\n");
            console.log("VOLUME: " +musicVolume + "\n");
            this.soundFX = this.sound.add("music1", {loop: "true"});
            this.soundFX.volume = musicVolume;
            this.soundFX.play();
        }

        if(menuNumber===0){

            this.scene.start("PreJogar");
        }
        else if (menuNumber===1){
            this.scene.start("OpcoesMenu");
        }
        else if (menuNumber===2){
            this.scene.start("AjudaMenu");
        }
        else if (menuNumber===3){
            this.scene.start("RankingMenu");
        }
        else if (menuNumber===4){
            this.scene.start("CreditosMenu");
        }
        else if (menuNumber===5){
            this.soundFX.stop();
            this.scene.start("");
        }
    }
}

