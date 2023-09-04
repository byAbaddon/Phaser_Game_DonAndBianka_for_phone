import {Scene} from'phaser';
import * as fnc from '../game.js';
import { cfg } from '../game.js'

let loadingSceneStarted = false; 
export class IntroScene extends Scene {
  constructor() {
    super('IntroScene')
    // this.screenOrientation = window.innerWidth < window.innerHeight
  }
  init() {
    console.log('IntroScene was loading...')  
  }

  preload() {
    //============================(((LOAD GLOBAL DATA)))================================

    //============ LOAD JSON VARIABLE DATA TO STORE FOR GLOBAL USE ALL SCENES ==========
    //--- LOAD AUDIO FORM JSON  multi files data and Extract the enName and sound path
   
  
    //===========================END LOAD JSON==========================
    //-------------load global images
    // this.load.image('phoneImage' , "../assets/images/phone/landscape.png")
    // cfg.global.globalImages = ['phoneImage']
    


     //============================(((END LOAD GLOBAL DATA)))================================


    //------------------------------LOAD AUDIO
    this.load.audio('bgIntro', '/assets/sounds/background/bgIntro.mp3')
    this.load.audio('btnStartClick', '/assets/sounds/effects/btnClick/click0.wav')
    
    //------------------------------- LOAD IMAGES
    //---bg for portrait orientation
    this.load.image('bgPortrait' , '../assets/images/phone/start.png')

    //---bg
    this.load.image('bg', '../assets/images/backgrounds/bgIntro.png')
    //---logo
    this.load.image('logo', '/assets/images/logo/1.png')
    //button start
    this.load.spritesheet('btnControls', '/assets/images/buttons/longBtn.png',
      { frameWidth: 500, frameHeight: 194, startFrame: 1, endFrame: 0 });
     
  }
 

  create() {
  
    //-------------------------------watcher CHECK ORIENTATION PHONE
    // fnc.checkOrientation(this)
    
    //---------------- add background by black color
    this.cameras.main.setBackgroundColor('#000000')
     
    //----------------audio
    this.soundBgIntro = fnc.createAudio(this, 'bgIntro', 0.5, true)
    // check is bg music not play, start music
    if (!this.sound.getAllPlaying().length) this.soundBgIntro.play()
      

    this.soundBtnStartClick = () => fnc.createAudio(this, 'btnStartClick').play()
    //-------------------------------add IMAGES
    //---bg2
    this.add.image(0, 0, 'bg').setOrigin(0, 0)
    //---logo
    this.add.image(cfg.width / 3 - 34, 12, 'logo').setOrigin(0, 0).setScale(0.8)
    
   

      //-------------------------------add TEXT
      //---logo
      const titleText = fnc.createText(this, cfg.width / 3, cfg.height / 2 - 106, 'Don and Bianka', '36px', null, null, null, 'candy')
    
      //---start menu label
      const subTitleText = fnc.createText(this, cfg.width / 3 - 20, cfg.height - 40, 'Press button to Menu options', '28px', null, 'black')
      // ------------------------------buttons
      this.btnStart = this.add.image(cfg.width / 2, cfg.height - 70, 'btnControls').setScale(0.4, 0.5)
      //---start btn label
      fnc.createText(this, cfg.width / 2 - 30, cfg.height - 90, 'MENU', '28px', null, null, 'bold')
    
    
      this.btnStart.setInteractive({ cursor: 'pointer' })                      //    write direct css command  in   setInteractive()
        .on('pointerover', () => this.btnStart.setTint(0xe0e0e0))
        .on('pointerout', () => this.btnStart.setTint(0xffffff))
        .on('pointerdown', () => {
          this.scene.start('MenuScene')
          //play sound
          this.soundBtnStartClick()
        })

   
      //-------------------------------Tween Animations
      fnc.tweenAnimation.crateTextAnimationRightLeftMove(this, subTitleText, 260, 1000, -1, 500)

    }
  
}
