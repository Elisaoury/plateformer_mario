export class zone_1 extends Phaser.Scene {

    constructor() {
        super("zone_1")
    }

    preload() {

        this.load.spritesheet('perso_droite', 'assets/perso_droite.png',
            { frameWidth: 280, frameHeight: 400 });
        this.load.spritesheet('perso_gauche', 'assets/perso_gauche.png',
            { frameWidth: 280, frameHeight: 400 });
        this.load.image('box', 'assets/box.png');
        this.load.image('box','assets/box');


        // chargement tuiles de jeu
        this.load.image("Phaser_tuilesdejeu", "assets/tileset.png");

        // chargement de la carte
        this.load.tilemapTiledJSON("map", "assets/map.json");
    }


    platforms;
    player;
    cursors;
    box;



    create() {



        // tiled
        this.carteDuNiveau = this.add.tilemap("map");
        this.tileset = this.carteDuNiveau.addTilesetImage(
            "tileset",
            "Phaser_tuilesdejeu"
        );
        this.calque_background = this.carteDuNiveau.createLayer(
            "background",
            this.tileset
        );
    
        this.calque_plateforme = this.carteDuNiveau.createLayer(
            "plateform",
            this.tileset
        );
        

        //personnage
        this.player = this.physics.add.sprite(32, 2800, 'perso_droite').setScale(0.4);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms);


        //boite 
        this.box = this.physics.add.sprite(200, 260, 'box');
        this.box.setCollideWorldBounds(true);


        // définition des tuiles de plateformes qui sont solides
        // utilisation de la propriété estSolide
        this.calque_plateforme.setCollisionByProperty({ estSolide: true });

        this.physics.add.collider(this.player, this.calque_plateforme);
        // clavier 

        this.cursors = this.input.keyboard.createCursorKeys()


        this.physics.add.collider(this.player, this.box);
        // redimentionnement du monde avec les dimensions calculées via tiled
        this.physics.world.setBounds(0, 0, 12000,3000);
        //  ajout du champs de la caméra de taille identique à celle du monde
        this.cameras.main.setBounds(0, 0, 12000, 3000);
        // ancrage de la caméra sur le joueur
        this.cameras.main.zoom = 0.85;
        this.cameras.main.startFollow(this.player);
 

        this.physics.add.collider(this.player, this.box);
        this.physics.add.collider(this.box, this.calque_plateforme);
     

        // animation personnage
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('perso_gauche', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'perso_droite', frame: 0 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('perso_droite', { start: 1, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('perso_saut', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('perso_saut', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'shift',
            frames: this.anims.generateFrameNumbers('perso_saut', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
    

    }


    update() {

      
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        

        if (this.keyJump.isDown && this.player.body.blocked.down) {
            this.player.setVelocityY(-400);
            //    player.anims.play('jump', true);
        } else if (this.keyQ.isDown) {
            // Action pour la touche Q (gauche)
            this.player.setVelocityX(-200);
            this.player.anims.play('left', true);
        } else if (this.keyD.isDown) {
            // Action pour la touche D (droite)
            this.player.setVelocityX(200);
            this.player.anims.play('right', true);
        } else { 
            // Aucune touche enfoncée (immobile)
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
        
    }

}