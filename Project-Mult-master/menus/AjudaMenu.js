class AjudaMenu extends Phaser.Scene {

    constructor() {
        super({key: "AjudaMenu"});
    }

    create() {

        this.add.image(640, 320, "ajudascreen");
        var backBut = this.add.image(1040, 400, "backBut").setInteractive();

        menuNumber = -1;

        backBut.on("pointerdown", function (ev) {
            menuNumber = 6;
        })
    }

    update() {
        if (menuNumber===6) {
            this.scene.start("MainMenu");
        }
    }
}