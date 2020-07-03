class GameOverScene extends Phaser.Scene {

    constructor() {
        super({key: "GameOverScene"});
    }


    create(){
        console.log("Entrou na GameOverScene")
        curr_level = 1;
        hitPoints = 3;
        inv = false;
        left = false;
        score = 0;

        GameOver = this.add.image(640, 320, "GameOver");

        this.time.delayedCall(2000, this.goto_MainMenu, [], this);
    }

    update(){

    }
    goto_MainMenu(){
        this.scene.start("MainMenu");
    }
}