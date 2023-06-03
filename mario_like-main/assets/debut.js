export class sceneDebut extends Phaser.Scene
{
    constructor(){
        super('sceneDebut');
        this.click = false;
    }
    preload(){
        this.load.image('debut','assets/debut.png');
    }
    create(){
        this.add.image(660,500,'debut').setScale(0.7);
        this.cameras.main.zoom= 1;

        this.cursors = this.input.keyboard.createCursorKeys();
    }
    update() {
  if (this.cursors.space.isDown) {
    this.click = true;

    if (this.click == true) {
      this.cameras.main.fadeOut(900, 0, 0, 0);
      this.time.delayedCall(1000, () => {
        this.scene.start("zone_1");
      })
    }
    this.click = false;
  }
}
    
};