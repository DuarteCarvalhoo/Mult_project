var soundVolume;
var musicVolume;

class OpcoesMenu extends Phaser.Scene {

    constructor() {
        super({key: "OpcoesMenu"});
    }

    preload() {
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
        this.add.image(960, 120, "opcoesBut");
        this.add.image(960, 180, "volumeIcon");
        this.add.image(900, 240, "musicBut");
        this.add.image(900, 320, "soundBut");


        var soundOffBut = this.add.image(1040, 320, "soundOffBut").setInteractive();
        var soundMais = this.add.image(945, 320, "maisBut").setInteractive();
        var soundMenos = this.add.image(995, 320, "menosBut").setInteractive();
        var musicOffBut = this.add.image(1040, 240, "musicOffBut").setInteractive();
        var musicMais = this.add.image(945, 240, "maisBut").setInteractive();
        var musicMenos = this.add.image(995, 240, "menosBut").setInteractive();

        var backBut = this.add.image(1040, 400, "backBut").setInteractive();

        action = this.add.text(200, 200, str_display, { fontSize: '50px', fill: '#9c748a' });


        menuNumber = -1;

        backBut.on("pointerdown", function (ev) {
            menuNumber = 6;
        })

        musicOffBut.on("pointerdown", function (ev) {
            action_trigger = true;

            if(musicMuted)
                musicMuted = false;

            else
                musicMuted = true;

            str_display = "MusicMuted = " + musicMuted;
        })

        musicMais.on("pointerdown", function (ev) {
            action_trigger = true;

            musicAux += 0.1;

            str_display = "Music Volume =" + musicAux.toFixed(1);
        })

        musicMenos.on("pointerdown", function (ev) {
            action_trigger = true;

            musicAux -= 0.1;

            str_display = "Music Volume =" + musicAux.toFixed(1);
        })

        soundOffBut.on("pointerdown", function (ev) {
            action_trigger = true;

            if(soundMuted)
                soundMuted = false;

            else
                soundMuted = true;

            str_display = "SoundMuted = " + soundMuted;
        })

        soundMais.on("pointerdown", function (ev) {
            action_trigger = true;

            soundVolume += 0.1;

            str_display = "SoundFX Volume =" + soundVolume.toFixed(1);
        })

        soundMenos.on("pointerdown", function (ev) {
            action_trigger = true;

            soundVolume -= 0.1;

            str_display = "SoundFX Volume =" + soundVolume.toFixed(1);
        })

    }

    update() {


        if (menuNumber===6)
            this.scene.start("MainMenu");

        if(action_trigger)
            action_displayer();
    }

}
function action_displayer() {

    action.setText(str_display);
}