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
        this.load.image('herbe', 'assets/herbe.png');
        this.load.image("book", "assets/ui.png");
        this.load.image("menu", "assets/menu.png");


        // chargement tuiles de jeu
        this.load.image("Phaser_tuilesdejeu", "assets/tileset.png");

        // chargement de la carte
        this.load.tilemapTiledJSON("map", "assets/map.json");
    }


    platforms;
    player;
    cursors;
    box;
    menuOpen = false;
    herbe;
    score = 0;



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
        this.calque_decors = this.carteDuNiveau.createLayer(
            "decors",
            this.tileset
        );
       

        //personnage
        this.player = this.physics.add.sprite(32,2800, 'perso_droite').setScale(0.4);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms);

    // collectible herbe 

        this.scoreText = this.add.text(355,285,'0',{fontSize:'32px',fill:'#000'});
        this.scoreText.setScrollFactor(0);
        this.scoreText.setDepth(15);
        this.scoreText.setVisible(false);

 
        this.herbe = this.physics.add.group();

        this.herbe1 = this.herbe.create(70, 800, "herbe");
        this.herbe2 = this.herbe.create(4000,80, "herbe");
        this.herbe3 = this.herbe.create(5250,2800, "herbe");
        this.herbe4 = this.herbe.create(7000,1200, "herbe");
        this.herbe5 = this.herbe.create(8600,80, "herbe");
        this.herbe5 = this.herbe.create(10500,2800, "herbe");
        this.herbe5 = this.herbe.create(11950,800, "herbe");
        this.physics.add.overlap(this.player, this.herbe, this.collectHerbe, null, this);


        //menu
        this.menu = this.add.image(500, 400, "menu").setScale(0.7);
        this.menu.setScrollFactor(0);
        this.menu.setVisible(false);
        
        this.ui = this.add.image(10, 40, "book").setScale(0.15);
        this.ui.setScrollFactor(0);
        this.ui.setInteractive();
        if (this.menuOpen === false){
            this.ui.on("pointerdown", this.leClick, this);
        }
        


        //boite 
        this.box = this.physics.add.sprite(200, 260, 'box');
        this.box.setCollideWorldBounds(true);


        // définition des tuiles de plateformes qui sont solides
        // utilisation de la propriété estSolide
        this.calque_plateforme.setCollisionByProperty({ estSolide: true });

        this.physics.add.collider(this.player, this.calque_plateforme);

        this.physics.add.collider(this.herbe, this.calque_plateforme);
        // clavier 

        this.cursors = this.input.keyboard.createCursorKeys()


        this.physics.add.collider(this.player, this.box);
        // redimentionnement du monde avec les dimensions calculées via tiled
        this.physics.world.setBounds(0, 0, 12000,3050);
        //  ajout du champs de la caméra de taille identique à celle du monde
        this.cameras.main.setBounds(0, 0, 12000, 3050);
        // ancrage de la caméra sur le joueur
        this.cameras.main.zoom = 0.85;
        this.cameras.main.startFollow(this.player);
 

        this.physics.add.collider(this.player, this.box);
        this.physics.add.collider(this.box, this.calque_plateforme);
     

        // animation personnage
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('perso_droite', { start: 1, end: 9 }),
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
            this.player.setVelocityY(-550);
            //    player.anims.play('jump', true);
        } else if (this.keyQ.isDown) {
            // Action pour la touche Q (gauche)
            this.player.setVelocityX(-400);
            this.player.anims.play('left', true);
        } else if (this.keyD.isDown) {
            // Action pour la touche D (droite)
            this.player.setVelocityX(400);
            this.player.anims.play('right', true);
        } else { 
            // Aucune touche enfoncée (immobile)
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
        if (this.menuOpen === false){
            this.menu.setVisible(false)
            this.scoreText.setVisible(false)
        }
        else {
            this.menu.setVisible(true)
            this.scoreText.setVisible(true)
        }
        
    }


    collectHerbe(player, herbe){
        herbe.disableBody(true, true); // l’étoile disparaît
        this.score += 1  ; //augmente le score de 10
        this.scoreText.setText(this.score); //met à jour l’affichage du score
        }

    leClick(){
        //this.menu.setVisible(true);
        //this.menuOpen = true;
        if (this.menuOpen === false){
            this.menuOpen = true;
        }
        else {
            this.menuOpen = false;
        }
        console.log(this.menuOpen);
    }

}