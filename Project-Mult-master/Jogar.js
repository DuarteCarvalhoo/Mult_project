class Jogar extends Phaser.Scene {
    constructor() {
        super({key: "Jogar"});
    }

    create() {
        this.add.image(640, 320, "background");
        //Varios niveis
    }

    update() {
        this.scene.start("Level"+curr_level);

    }
}