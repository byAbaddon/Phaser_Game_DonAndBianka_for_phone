import {Scene} from'phaser';
import * as fnc from '../game.js';
import { cfg } from '../game.js'
import { GameScene } from "/src/scenes/gameScene";

export class FinalScene extends Scene {
  constructor() {
    super('FinalScene')
  }


  init() {
    console.log('FinalScene was loading...');
    this.game.sound.stopAll()  //stop all sounds
    this.cameras.main.setBackgroundColor('#000000')   
  }

  preload() {
    //-------------------------------watcher CHECK ORIENTATION PHONE 
    // fnc.checkOrientation(this)
    // LOAD IMAGE
    this.load.atlas('flares', '/assets/images/particles/flares.png', '/assets/images/particles/flares.json');
    //---btnExit
    this.load.image('btnExit', '/assets/images/buttons/btnExit.png')
    //heart logo
    this.load.image('heartLogo', '../assets/images/heart/heart.png')

    //confetti
    this.load.image('heart', '../assets/images/heart/heart.png')
    this.load.image('red','../assets/images/confetti/red.png')
    this.load.image('green','../assets/images/confetti/green.png')
    this.load.image('blue','../assets/images/confetti/blue.png')
    this.load.image('white','../assets/images/confetti/white.png')
    
    //LOAD AUDIO
    //bg
    this.load.audio('bgFinal', '../assets/sounds/background/bgFinal.mp3')
    this.load.audio('btnExitClick', '/assets/sounds/effects/btnClick/clickExit.wav')
  }

  create() {
    // ADD IMAGE
    this.heartLogo = this.add.image(cfg.width / 2 - 40, cfg.height / 3 + 20, 'heartLogo').setOrigin(0.0).setScale(3)
     //---btn exit
     this.btnExit = this.add.image(cfg.width - 60, 20, 'btnExit').setOrigin(0.0).setScale(0.5)
    //ADD AUDIO
     fnc.createAudio(this, 'bgFinal', 0.3).play()
   
    this.soundBtnExitClick = () => fnc.createAudio(this, 'btnExitClick').play()
    //ADD TEXT
    fnc.createText(this, cfg.width / 3 - 30, 100, 'CONGRATULATIONS', 46).setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)
    fnc.createText(this, cfg.width / 3 - 50, cfg.height - 200, 'You are a very good player!', 32)
    fnc.createText(this, cfg.width / 3 - 50, cfg.height - 160, 'You made the love between\n Don and Bianca possible.', 32)
    fnc.createText(this, cfg.width / 3 + 50, cfg.height - 70, 'Good Luck', 46).setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)
    
    

    this.btnExit.setInteractive({ cursor: 'pointer' })
      .on('pointerover', () => this.btnExit.setTint(0xc0c0c0))
      .on('pointerout', () => this.btnExit.setTint(0xffffff))
      .on('pointerdown', () => {
        this.scene.start('IntroScene')
        //play sound
        this.soundBtnExitClick()
        // this.game.sound.stopAll()  //stop all sounds
        this.sound.removeAll() //remove all sounds
        
        // Remove GameScene to fix problem
        this.scene.remove('GameScene')
        //Add again GameScene
        this.scene.add('GameScene', GameScene,);  
  })

    //tween
    this.tweens.add({
      targets: this.heartLogo,
      scale: 3.1,
      duration: 350,
      yoyo: true,
      repeat: -1,
    })
    
    // --------------------------------------------------- particle
    // Set emitter properties
    this.emitterOne = this.add.particles(cfg.width / 2 - 100, 0, 'green', {
      x: 100,
      y: 30,
      frame: [],
      scale: { min: 0.25, max: 1 },
      rotate: { start: 0, end: 360 },
      speed: { min: 50, max: 100 },
      lifespan: 3000,
      frequency: 100,
      blendMode: 'ADD',
      gravityY: 110,
    });
    
  
    this.emitterTwo = this.add.particles( cfg.width / 2 - 100, 0,'red', {
      x: 100,
      y: 30,
      scale: { min: 0.25, max: 1 },
      rotate: { start: 0, end: 360 },
      speed: { min: 50, max: 100 },
      lifespan: 3000,
      frequency: 100,
      blendMode: 'ADD',
      gravityY: 110,
    });
  
    this.emitterThree = this.add.particles( cfg.width / 2 - 100, 0,'heart', {
      x: 100,
      y: 30,
      scale: { min: 0.25, max: 1 },
      rotate: { start: 0, end: 360 },
      speed: { min: 50, max: 100 },
      lifespan: 3000,
      frequency: 100,
      blendMode: 'ADD',
      gravityY: 110,
    });

    this.ballEmitter = this.add.particles(cfg.width / 2, 40, 'flares', {
      frame: ['red', 'yellow', 'green', 'blue', 'white' ],
        lifespan: 3000,
        speed: { min: 150, max: 250 },
        scale: { start: 0.5, end: 0 },
        gravityY: 150,
        bounce: 0.8,
        blendMode: 'ADD'
    });

    
  // Stop the emitter after 2 seconds
    this.time.delayedCall(30000, () => {
      this.emitterOne.stop()
      this.emitterTwo.stop()
      this.emitterThree.stop()
      this.ballEmitter.stop() 
    });

  }
}

