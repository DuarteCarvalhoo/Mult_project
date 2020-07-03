class Preloader extends Phaser.Scene {
    constructor() {
        super({key: "Preloader"})
    }
    preload() {
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(470, 270, 320, 50);

        this.load.on('progress', function (value) {

            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(480, 280, 300 * value, 30);
        });

        this.load.on('fileprogress', function (file) {
            console.log(file.src);
        });

        this.load.on('complete', function () {
            console.log('complete');
            progressBar.destroy();
            progressBox.destroy();
        })

        //MainMenu and backBut

        this.load.image("background", "assets/background.png");
        this.load.image("title", "assets/title.png");
        this.load.image("FundoCinzaBut", "assets/FundoCinzaBut.png");
        this.load.image("jogarBut", "assets/jogarBut.png");
        this.load.image("opcoesBut", "assets/opcoesBut.png");
        this.load.image("ajudaBut", "assets/ajudaBut.png");
        this.load.image("rankingBut", "assets/rankingBut.png");
        this.load.image("creditosBut", "assets/creditosBut.png");
        this.load.image("sairBut", "assets/sairBut.png");
        this.load.image("backBut", "assets/backBut.png");
        this.load.image("PPMenu", "assets/PersonagemMenu.png");
        this.load.image("HTMLMenu", "assets/HTMLMenu.png");
        this.load.image("inimigo1Menu", "assets/inimigo1Menu.png");
        this.load.image("inimigo2Menu", "assets/inimigo2Menu.png");
        this.load.image("inimigo3Menu", "assets/inimigo3Menu.png");
        this.load.image("inimigo4Menu", "assets/inimigo4Menu.png");
        this.load.image("inimigo5Menu", "assets/inimigo5Menu.png");
        this.load.image("GameOver", "assets/game_over.png");
        this.load.image("fundo_cinza", "assets/fundocinza_game.png");
        this.load.image("modoNormal", "assets/modo_normal.png");
        this.load.image("modoFacil", "assets/modo_facil.png");



        //OpcoesMenu
        this.load.image("volumeIcon", "assets/volumeIcon.png");
        this.load.image("musicBut", "assets/musicBut.png");
        this.load.image("musicOffBut", "assets/musicOffBut.png");
        this.load.image("soundBut", "assets/soundBut.png");
        this.load.image("soundOffBut", "assets/soundOffBut.png");
        this.load.image("maisBut", "assets/maisBut.png");
        this.load.image("menosBut", "assets/menosBut.png");
        this.load.image("ajudascreen", "assets/ajudascreen.png");
        this.load.image("creditosScreen", "assets/creditosScreen.png");
        this.load.image("wip", "assets/rrr.png");

        //Player
        this.load.image("collider", "assets/collider.png");
        this.load.spritesheet('dude', 'assets/spritesheet_v8.png', { frameWidth: 45, frameHeight: 69 });
        this.load.spritesheet('dude_inv', 'assets/spritesheet_inv.png', { frameWidth: 45, frameHeight: 69 });
        this.load.image("heart", "assets/heart.png");
        this.load.spritesheet('chrome', 'assets/st.png', { frameWidth: 50, frameHeight: 52 });
        this.load.spritesheet('chrome_inv', 'assets/st_inv.png', { frameWidth: 50, frameHeight: 52 });
        this.load.image("tiros", "assets/tiros.png");


        //Internet Explorer
        this.load.image("internetE", "assets/internetE.png");

        //Sons
        this.load.audio("music1", "assets/audio/music1.mp3");
        this.load.audio("jump", "assets/audio/bleep.mp3");
        this.load.audio("running", "assets/audio/running.mp3");
        this.load.audio("damage","assets/audio/dmg.mp3");
        this.load.audio("boing","assets/audio/boing.mp3");
        this.load.audio("door_open","assets/audio/door_open.mp3");

        //Videos
        //this.load.video("tutorial", "assets/video/teste_tutorial.mp4");

        //Objetos
        this.load.image("plat_grande", "assets/plat_h_grande.png");
        this.load.image("plat_media", "assets/plat_h_media.png");
        this.load.image("plat_pequena", "assets/plat_h_pequena.png");
        this.load.image("plat_vertical", "assets/plat_v.png");
        this.load.image("plat_v_grande", "assets/plat_v_grande.png");
        this.load.image("plat_v_level3", "assets/plat_v_level3.png");
        this.load.image("solo", "assets/solo.png");
        this.load.image("porta", "assets/porta.png");
        this.load.image("spike1", "assets/spike1.png");
        this.load.image("spike2", "assets/spike2.png");
        this.load.image("spike3", "assets/spike3.png");
        this.load.image("bridge_level2", "assets/bridge_level2.png");
        this.load.image("pressiona", "assets/pressiona.png");
        this.load.image("trampolim", "assets/trampolim.png");
        this.load.image("bridge_mini", "assets/bridge_mini.png");
        this.load.image("bridge_media", "assets/bridge_media.png");

        getQuestionStart();
    }

    update() {

        this.scene.start("MainMenu");
    }


}