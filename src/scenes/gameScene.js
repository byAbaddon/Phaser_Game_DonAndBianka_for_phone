import { Scene } from 'phaser'
import * as fnc from '../game.js';
import {cfg} from '../game.js'


export class GameScene extends Scene {
  constructor() {
    super('GameScene')
    this.level = cfg.global.currentLevel
    this.currentSound = null
    this.activeActor = null
    this.isActiveActorDon = false
    this.isActiveActorBianka = false
    this.speedActors = 3
    this.liftSpeed = 1
    this.doubleClickTimer = null
    this.isFalling = false
    this.isJumping = false
    this.objPlayerDestinationXY = { x: 0, y: 0 }
    this.counterHearts = 2
    this.isActorOnTopItem = false
    this.isActorOnLift = false    
  }

  init() {
    console.log('Welcome to GameScene...')
    this.game.sound.stopAll() //stop all sounds
  }

  preload() {
    //---load data form json
    this.load.tilemapTiledJSON(`map${cfg.global.currentLevel}`, `/assets/maps/levels/${cfg.global.currentLevel}.json`)
    // console.log(this.cache.json.destroy());
  
    //-----------------------------load IMAGES
    //background
    this.backgroundArray = fnc.loadMultiImages(this, 'bg', '../assets/maps/bg/', cfg.global.currentLevel)
    // this.load.image('bgImage', '../assets/maps/bg/bg1.png')

    //------------------ buttons
    //---btnExit
    this.load.image('btnExit', '/assets/images/buttons/btnExit.png')
    this.load.image('btnReload', '/assets/images/buttons/btnReload.png')

    //---images bg amd map
    this.load.image('tiles', '../assets/maps/tiles/groundTiles.png')
    this.load.image('bgSky', '../assets/images/backgrounds/sky/bgSky.png')
   

    //--------------game object items images
    //---heart bar
    this.load.image('heartEmpty', '../assets/images/heart/heartEmpty.png')
    this.load.image('heartHalf', '../assets/images/heart/heartHalf.png')
    this.load.image('heartFull', '../assets/images/heart/heartFull.png')

    //------flags
    this.load.image('green1', '../assets/images/flagsGame/green1.png')
    this.load.image('green2', '../assets/images/flagsGame/green2.png')
    this.load.image('yellow1', '../assets/images/flagsGame/yellow1.png')
    this.load.image('yellow2', '../assets/images/flagsGame/yellow2.png')
    this.load.image('red1', '../assets/images/flagsGame/red1.png')
    this.load.image('red2', '../assets/images/flagsGame/red2.png')

    //---heart game
    this.load.image('heart', '../assets/images/heart/heart.png')
    this.load.image('mushroom', '../assets/images/mushroom/mushroom.png')

    //---handle
    this.load.image('handleGreen', '../assets/images/handle/blue.png')
    this.load.image('handleRed', '../assets/images/handle/red.png')
    
    //bridge
    this.load.image('bridge', '../assets/images/bridge/bridge.png')
   
    //barrier
    this.load.image('barrier', '../assets/images/barrier/barrier.png')


    //lift
    this.load.image('lift', '../assets/images/platform/lift_60_20.png')

    //buttons Game
    this.load.image('buttonBlue', '../assets/images/buttonsGame/buttonBlue.png')
    this.load.image('buttonBluePressed', '../assets/images/buttonsGame/buttonBlue_pressed.png')
    this.load.image('buttonRed', '../assets/images/buttonsGame/buttonRed.png')
    this.load.image('buttonRedPressed', '../assets/images/buttonsGame/buttonRed_pressed.png')
    
    //box
    this.load.image('box', '../assets/images/box/1.png')



    //---object actors images
    this.load.image('don', '../assets/images/actors/don/stay.png')
    this.load.image('stayDon', '../assets/images/actors/don/stayDon.png')
    this.load.image('fallDon', '../assets/images/actors/don/fall.png')

    this.load.image('bianka', '../assets/images/actors/bianka/attack_3.png')
    this.load.image('stayBianka', '../assets/images/actors/bianka/stayBianka.png')
    this.load.image('fallBianka', '../assets/images/actors/bianka/fall.png')


    //--------------------------------sprite sheets

    //-------------------------Bianka
    //idel
    this.load.spritesheet('biankaIdle_5', '../assets/images/actors/bianka/idle.png', {
      frameWidth: 128,
      frameHeight: 128,
    })

    //----------bianka run
    this.load.spritesheet('biankaRun_6', '../assets/images/actors/bianka/runRight.png', {
      frameWidth: 128,
      frameHeight: 128,
    })
    //---jump right
    this.load.spritesheet('biankaJump_6', '../assets/images/actors/bianka/jumpRight.png', {
      frameWidth: 128,
      frameHeight: 128,
    })
    
    //--------------------------Don

    this.load.spritesheet('donIdle_5', '../assets/images/actors/don/idle.png', {
      frameWidth: 128,
      frameHeight: 128,
    })

    //----------don run
    this.load.spritesheet('donRun_7', '../assets/images/actors/don/runRight.png', {
      frameWidth: 128,
      frameHeight: 128,
    })
    //----don jump 
    this.load.spritesheet('donJump_7', '../assets/images/actors/don/jumpRight.png', {
      frameWidth: 128,
      frameHeight: 128,
    })



    //------------------------------load AUDIO
    this.load.audio('bgGame', '/assets/sounds/background/bgQuiz.mp3')
    this.load.audio('btnExitClickSound', '/assets/sounds/effects/btnClick/clickExit.wav')
    this.load.audio('btnClickSound', '/assets/sounds/effects/btnClick/click1.wav')

    //---items
    this.load.audio('takeHeartSound', '../assets/sounds/effects/items/takeHeart.wav')
    this.load.audio('pushHandleSound', '../assets/sounds/effects/items/handle.wav')
    this.load.audio('fallingSound', '../assets/sounds/effects/items/falling.wav')
    this.load.audio('pullHandleSound', '../assets/sounds/effects/items/handle.wav')
    this.load.audio('moveBridgeSound', '../assets/sounds/effects/items/lift.wav')
    this.load.audio('liftSound', '../assets/sounds/effects/items/lift2.wav')
    this.load.audio('buttonSwitchSound', '../assets/sounds/effects/items/switch.ogg')
    this.load.audio('closeSound', '../assets/sounds/effects/items/close.wav')

    //---------voice
    //---bianka
    this.load.audio('readyBianka', '../assets/sounds/effects/voice/bianka/okBianka.wav')
    this.load.audio('jumpBianka', '../assets/sounds/effects/voice/bianka/yeBianka.wav')
    //---don
    this.load.audio('readyDon', '../assets/sounds/effects/voice/don/wellDon.wav')
    this.load.audio('jumpDon', '../assets/sounds/effects/voice/don/jumpDon.wav')


  }

  create() {
    //create bg sky and clouds
    this.bgSkySprite = this.add.tileSprite(0, 0, cfg.width, cfg.height, 'bgSky').setOrigin(0, 0) //.setDepth(-1)


    //-------------------------------watcher CHECK ORIENTATION PHONE 
    // fnc.checkOrientation(this) 
   
    //--------------------------------------- add DATA

    //---------------------------------((((add AUDIO))))-----------------------------
    this.soundBgGame = () => fnc.createAudio(this, 'bgGame', 0.3, true, 500).play()
    this.soundBtnClick = () => fnc.createAudio(this, 'btnClickSound').play()
    this.soundBtnExitClick = () => fnc.createAudio(this, 'btnExitClickSound').play()
    //items
    this.soundTakeHeart = () => fnc.createAudio(this, 'takeHeartSound',).play()
    this.soundPushHandle = () => fnc.createAudio(this, 'pushHandleSound',).play()
    this.soundFalling = () => fnc.createAudio(this, 'fallingSound', 1, false, 0, true).play()
    this.soundPullHandle = () => fnc.createAudio(this, 'pullHandleSound', 1).play()
    this.soundMoveBridge = () => fnc.createAudio(this, 'moveBridgeSound', 1).play()
    this.soundClose = () => fnc.createAudio(this, 'closeSound', 1).play()
    this.soundLift = () => fnc.createAudio(this, 'liftSound', 1).play()
    this.soundButtonSwitch = this.sound.add('buttonSwitchSound')
    
    
    //-------voice
    //---bianka
    this.soundReadyBianka = () => fnc.createAudio(this, 'readyBianka',).play()
    this.soundJumpBianka = () => fnc.createAudio(this, 'jumpBianka',).play()
    //---don
    this.soundReadyDon = () => fnc.createAudio(this, 'readyDon',).play()
    this.soundJumpDon = () => fnc.createAudio(this, 'jumpDon',).play()
    

    //--------------------------------((((add IMAGES)))) --------------------------
    //----------- buttons  
    //---btn exit
    this.btnExit = this.add.image(cfg.width - 20, 25, 'btnExit').setScale(0.35).setDepth(1)
    this.btnReload = this.add.image(cfg.width - 65, 25, 'btnReload').setScale(0.3).setDepth(1)
    //---hearts bar
    this.barHeart = this.add.image(cfg.width - 110, 25, 'heartEmpty').setScale(0.6).setDepth(1)
   
    //--------------------------------((((add TEXT))))------------------------------
    fnc.createText(this, 10, 10, `Level ${cfg.global.currentLevel}`, 26).setDepth(2)



    //--------------------------------((((CREATE MAP FORM FORM JSON DATA)))) -------------------------------------------
    const map = this.make.tilemap({ key: `map${cfg.global.currentLevel}` })
      
    //-----------------create bg image
    //---get position bg
    const xPosition = map.images[0].x
    const yPosition = map.images[0].y
    //---create backgrounds
    this.add.image(xPosition, yPosition, this.backgroundArray[cfg.global.currentLevel - 1]).setOrigin(0, 0)
    
    //----------------create tiles
    const tiles = map.addTilesetImage('groundTiles', 'tiles')
    this.layerGround = map.createLayer(0, tiles, 0, 0)


    //-----------------------------------Get texture Items


    //--------------------------------((((Get Object Items)))) -------------------------------------------
   
    //flags
    const { x, y } = map.getObjectLayer('flag').objects[0]
    this.flag = this.physics.add.sprite(x, y, 'red1').setOrigin(0, 0).setScale(0.5, 1)
    this.flag.body.allowGravity = false
  
    
    this.objAnims = { 2: 'flagRedAnim', 1: 'flagYellowAnim', 0: 'flagGreenAnim' }
    
    this.anims.create({ key: 'flagRedAnim', frames: [{ key: 'red1' }, { key: 'red2' }], frameRate: 4, repeat: -1 })
    this.anims.create({ key: 'flagYellowAnim', frames: [{ key: 'yellow1' }, { key: 'yellow2' }], frameRate: 4, repeat: -1 })
    this.anims.create({ key: 'flagGreenAnim', frames: [{ key: 'green1' }, { key: 'green2' }], frameRate: 4, repeat: -1 })


    this.flag.play(this.objAnims[this.counterHearts])
   
    //--- Get 'Don' object data 
    map.getObjectLayer('don').objects.forEach(object => {
      // console.log(object);
      this.spriteDon = this.physics.add.sprite(object.x, object.y, 'don')
        .setInteractive() // for touch events
        .setFlip(true)
        .setSize(30, 60)  // 30 80
        .setOffset(50, 70)  //50 50
        .setBounce(0.2)
        .setDragX(10)
        .setVelocity(0, 0)
        .setName('don')
        .setCollideWorldBounds(true)
       
      this.spriteDon.body.world.checkCollision.down = false
    })

    //--- Get Binaka object data 
    map.getObjectLayer('bianka').objects.forEach(object => {
      this.spriteBianka = this.physics.add.sprite(object.x, object.y, 'bianka')
        .setInteractive() // for touch events
        .setFlip(true)
        .setBounce(0.3)
        .setSize(30, 60)
        .setOffset(50, 70)
        .setDragX(10)
        .setVelocity(0, 0)
        .setName('bianka')
        .setCollideWorldBounds()
      
      this.spriteBianka.body.world.checkCollision.down = false
        
    })

    
    //----add items - heart
    this.heartsGroup = this.physics.add.staticGroup()
    map.getObjectLayer('hearts').objects.forEach(heart => {
      this.heart = this.add.image(heart.x, heart.y, 'heart').setOrigin(0, 0).setScale(0.8)
      this.heartsGroup.add(this.heart)

      this.tweens.add({
        targets: this.heart,
        scale: 0.87,
        duration: 350,
        yoyo: true,
        repeat: -1,
      })

    })

    //-----mushrooms
    if (map.getObjectLayer('mushrooms')) {
      this.mushroomsGroup = this.physics.add.group({ immovable: true, allowGravity: false })
      map.getObjectLayer('mushrooms').objects.forEach(m => {
        const mushroom = this.physics.add.sprite(m.x, m.y, 'mushroom').setOrigin(0, 0)
          .setCircle(30, 0, 0)
        this.mushroomsGroup.add(mushroom)
      })
    }
    
    //---bridge
    if (map.getObjectLayer('bridge')) {
      map.getObjectLayer('bridge').objects.forEach(bridge => {
        this.bridge = this.add.sprite(bridge.x, bridge.y, 'bridge').setOrigin(0, 0)//.setScale(0.8)
        this.physics.add.existing(this.bridge)
        this.bridge.body.setAllowGravity(false)
        this.bridge.body.setImmovable(true)
        
        const xPos = bridge.x - this.bridge.width
        this.destinationPointObj = { 5: xPos, 6: xPos, 8: xPos, 9: xPos }
       
        this.tweensBridge = this.add.tween({
          targets: this.bridge,
          x: this.destinationPointObj[this.level],
          y: this.bridge.y,
          duration: 5000,
          delay: 500,
          repeat: 0,
          onComplete: (tween) => {
            tween.targets[0].y -= 32
            this.soundClose()
          },
          onUpdate: () => {
            this.soundMoveBridge() // play sound until update y
          },
        })
       
        this.tweensBridge.pause()
      })
    }
    
    //---lift
    if (map.getObjectLayer('lifts')) {
      this.liftsGroup = this.physics.add.group({ immovable: true, allowGravity: false })
      map.getObjectLayer('lifts').objects.forEach(l => {
        this.lift = this.physics.add.sprite(l.x, l.y, 'lift').setOrigin(0, 0).setScale(1, 1.3)
        this.liftsGroup.add(this.lift)
      })
    }
    
    //---barrier
    if (map.getObjectLayer('barriers')) {
      map.getObjectLayer('barriers').objects.forEach(barrier => {
        this.barrier = this.add.sprite(barrier.x, barrier.y, 'barrier').setOrigin(0, 0)//.setScale(0.8)
        this.physics.add.existing(this.barrier)
        this.barrier.body.setAllowGravity(false)
        this.barrier.body.setImmovable(true)
      })
 
      this.tweenBarrier = this.tweens.add({
        targets: this.barrier,
        y: -100,
        duration: 5000,
        delay: 500,
        repeat: 0,
        onUpdate: () => {
          this.soundMoveBridge() // play sound until update y
        },
        onComplete: () => {
          this.soundClose()
        }
      })
      this.tweenBarrier.pause()
    }

    //---handle
    if (map.getObjectLayer('handle')) {
      map.getObjectLayer('handle').objects.forEach(handle => {
        this.handle = this.add.sprite(handle.x, handle.y, 'handleRed').setOrigin(0, 0).setScale(0.8)
        this.physics.add.existing(this.handle)
        this.handle.body.setAllowGravity(false)
      })
    }
 
    //---buttonsSwitch
    if (map.getObjectLayer('buttons')) {
      this.buttonsSwitchGroup = this.physics.add.group({ immovable: true, allowGravity: false })
      map.getObjectLayer('buttons').objects.forEach(b => {
        let buttonColor = b.name == 'buttonOff' ? 'buttonRed' : 'buttonBlue'
        this.buttonSwitch = this.physics.add.sprite(b.x, b.y, buttonColor).setOrigin(0, 0)
          .setScale(0.5)
          .setCircle(35, 0, 20)
          .setName(b.name)
        this.buttonsSwitchGroup.add(this.buttonSwitch)
      })
    }
    
    //---box
    if (map.getObjectLayer('boxes')) {
      this.boxGroup = this.physics.add.group(
        { immovable: false, allowGravity: true, collideWorldBounds: true })
      map.getObjectLayer('boxes').objects.forEach(box => {
        this.box = this.physics.add.sprite(box.x, box.y, 'box').setOrigin(0, 0).setScale(0.65)
        this.boxGroup.add(this.box)
      })

      this.boxGroup.getChildren().forEach(box => {
        box.body.setBounce(0.4)
        box.body.setDragX(20)
      })
    }
  



    //--------------------------------((((COLLIDE)))) -------------------------------------------
    
    // add collide for all world
    // this.physics.world.setBounds(0, 0, cfg.width, cfg.height)
    // this.physics.world.setBoundsCollision(true, true, true, true)
  

    // add collide attribute for all tile ground
    this.layerGround.forEachTile(tile => tile.properties.collide ? tile.setCollision(true) : null)
    
    //---ground
    this.physics.add.collider([this.spriteDon, this.spriteBianka], this.layerGround, (actor) => {
      this.isActorOnLift = false // null flag if actor on the ground
    })
    
    //---heart
    this.physics.add.overlap([this.spriteDon, this.spriteBianka], this.heartsGroup, (actor, heart) => {
      heart.destroy()
      this.soundTakeHeart()
      this.counterHeartsFnc()
    }, null, this)

    //---mushroom
    this.physics.add.collider([this.spriteDon, this.spriteBianka], this.mushroomsGroup, (actor, mushroom) => {
      this.isActorOnTopItem = true
    }, null, this)

    //--------------------------box
    //box and actor
    this.physics.add.collider([this.spriteDon, this.spriteBianka], this.boxGroup, () => {
      this.isActorOnTopItem = true
    }, null, this)

    //box and world
    this.physics.add.collider([this.physics.world, this.layerGround,], this.boxGroup)


    //---handle
    let handlePulled = false
    this.physics.add.overlap([this.spriteDon, this.spriteBianka], this.handle, (actor, handle) => {
      if (handle.texture.key == 'handleRed') {
        this.soundPullHandle()
        handle.setTexture('handleGreen')
        if (this.level == 7) {
          this.tweenBarrier.resume()
        } else {
          this.tweensBridge.resume()
        }
      
      }
    }, null, this)
    
    //---bridge
    this.physics.add.collider([this.spriteDon, this.spriteBianka], this.bridge)
    
    
    //---lift
    this.physics.add.collider([this.spriteDon, this.spriteBianka], this.lift,
      (actor, lift) => {
        // console.log('On lift ',actor.name);
        this.isActorOnLift = true
        actor.body.velocity.y = lift.body.velocity.y + this.liftSpeed
      })
    

    //---buttonsSwitch
    if ([6,10].includes(this.level)) {         // ([<--- bypass  BUG  ------>])
      this.physics.add.overlap([this.spriteDon , this.spriteBianka], this.buttonsSwitchGroup, (actor, button) => {
        this.soundButtonSwitch.play()
        button.setTexture(button.name == 'buttonOff' ? 'buttonRedPressed' : 'buttonBluePressed')
      
        const objLifts = {
          6: { 'startPointX': 0, 'endPointX': 0, 'startPointY': 426, 'endPointY': 125, 'infinity': false },
          10: {'startPointY': 426, 'endPointY': 125, 'infinity': false }  }
        const { startPointX, endPointX, startPointY, endPointY, infinity } = objLifts[this.level]
        
        if (infinity) {
            this.moveLiftInfinity(startPointX, endPointX, startPointY, endPointY, actor, button, this.lift)
          } else {
            this.moveLift(startPointX, endPointX, startPointY, endPointY, actor, button, this.lift)
          }
 
      }, null, this)
    }
    


    //------------------------------------((((code))))-------------------------------
 //------------------((((((((((((MOVE by Touch Control ))))))))))))
    this.moving()
    this.animations()  
    
    //-----------------------------------add interactive btn options
    Array.from([this.btnExit, this.btnReload]).forEach((btn, index) => {
      btn.setInteractive({cursor: 'pointer',index})
        .on('pointerover', () => btn.setTint(0xe0e0e0))
        .on('pointerout', () => btn.setTint(0xffffff))
        .on('pointerdown', () => {
          //  cfg.transitionBetweenScene('MenuScene') // translation between scene
          if (index == 0) { //exit
            this.game.sound.stopAll()
            this.soundBtnExitClick()
            const currentScene = this.scene.scene
            this.scene.stop(currentScene)
            this.scene.start('MenuScene')
          }
          if (index == 1) {
            this.soundBtnExitClick()
            this.reloadGame()
          }

        })

      //---play bg music
      this.soundBgGame()
    })
    

   
  }


  update(deltaTime) {
    this.bgSkySprite.tilePositionX += 0.3 // move bg / clouds
   
    //--- watcher for,  if player arrival to destination and Stop player move
    this.checkPointArrival()

    //---watcher current destination
    this.checkCurrentDestination()

    //---check is level complete
    this.checkLevelComplete()
    
  
    //---check lift
    this.checkIsActiveLift() 
  }
    
  
  //=====================================  Custom Function =======================

  //-------------move player
  moving() {
    this.input.on('pointerdown', (pointer, event) => {
  
      if (event[0]) { //check is click object is actor
        if (this.activeActor) {
          this.activeActor.body.setVelocityX(0) // stop velocity old actor
          this.activeActor.name == 'don' ? this.spriteDon.anims.play('idleDon') : this.spriteBianka.anims.play('idleBianka')
        }
       
        this.activeActor = (event[0].name == 'don') ? this.spriteDon : this.spriteBianka //set new to actor
        //todo: more logic play sound if actor changes
        if (this.activeActor.name == 'don') {  //set new to actors   
          !this.isActiveActorDon ? this.soundReadyDon() : null
          this.isActiveActorDon = true
          this.isActiveActorBianka = false
        } else {   
          !this.isActiveActorBianka ? this.soundReadyBianka() : null
          this.isActiveActorBianka = true
          this.isActiveActorDon = false
        }
      }
  
   
      if (!this.activeActor) return // no active actors
      this.objPlayerDestinationXY = { x: pointer.x, y: pointer.y } // get new click pointer position
      //-----------left and right move only----------------------------------
      if (this.activeActor.body.onFloor() || this.isActorOnTopItem) { // Is player touching floor
        this.isFalling = false
        this.isJumping = false

       
        //-------------------generate double clicking event
        if (this.doubleClickTimer && this.doubleClickTimer.getProgress() < 1) { //timer less 1sc
          this.doubleClickTimer.remove()
          this.activeActor.setVelocityY(-145) //player jump 
          this.activeActor.body.velocity.x /= 2
          this.activeActor.body.velocity.x
          
      
          this.activeActor.body.setBounceX(0)
          this.activeActor.body.checkCollision.up = false
          if (!this.isFalling) {
            this.activeActor.body.checkCollision.left = false
            this.activeActor.body.checkCollision.right = false
          } 
      
         //stop player move after jump
          setTimeout(() => { try {this.activeActor.body.stop()} catch{} } , 1800) 
           
        } else {  
          
          // this.activeActor.body.checkCollision.up = true
          this.activeActor.body.checkCollision.left = true
          this.activeActor.body.checkCollision.right = true
          this.activeActor.body.setBounceX(0.1)
          this.activeActor.body.setBounceY(0.2)
       
          this.doubleClickTimer = this.time.delayedCall(400, () => this.doubleClickTimer = null) //reset timer
          //--------------normal one click events
  
          if (this.activeActor.x > pointer.x) { //point destination  watch in update function    
            //---go Left
            this.activeActor.setVelocityX(-160)
            //--- left animations
            this.activeActor.name == 'don' ? this.spriteDon.anims.play('runDon').setFlipX(true) : this.spriteBianka.anims.play('runBianka').setFlipX(true)
      
          } else if (this.activeActor.x < pointer.x) {
            //--- go Right
            this.activeActor.setVelocityX(160)
            //---right animations
            this.activeActor.name == 'don' ? this.spriteDon.anims.play('runDon').setFlipX(false) : this.spriteBianka.anims.play('runBianka').setFlipX(false)
          }
             
        }
    
      } 
        this.isActorOnTopItem = false
      
      
     
 })

}
   
  // ------ set animation by moving player
  checkCurrentDestination() {
    if (this.activeActor) {
      // console.log(this.activeActor.body.velocity.y);
      let x = this.activeActor.body.velocity.x
      let y = this.activeActor.body.velocity.y
      if (x > 0) {
        // console.log('Player is moving right');    
      } else if (x < 0) {
        // console.log('Player is moving left');
      } else {
        // console.log('Player is not moving horizontally');
        this.activeActor.anims.pause()
        this.activeActor.name == 'don' ? this.activeActor.setTexture('stayDon') : this.activeActor.setTexture('stayBianka')
      }

      if ((x > 0 || x < 0) && y < -1) {
        // console.log('Player is jumping');
         //--- jump animation
       if (this.activeActor.name == 'don') {
         this.activeActor.body.velocity.x > 0  ? this.spriteDon.anims.play('jumpDon').setFlipX(false) : this.spriteDon.anims.play('jumpDon').setFlipX(true)        
         if (!this.isJumping) {
            this.soundJumpDon()
           this.isJumping = true
         }
        
       } else {
          this.activeActor.body.velocity.x > 0 ? this.spriteBianka.anims.play('jumpBianka').setFlipX(false) : this.spriteBianka.anims.play('jumpBianka').setFlipX(true)  
          if (!this.isJumping) {
            this.soundJumpBianka()
            this.isJumping = true    
          }    
        }
      } else if (x == 0 && y > 1) {
        // console.log('Player is falling');
        this.activeActor.name == 'don' ?  this.activeActor.setTexture('fallDon'): this.activeActor.setTexture('fallBianka')      
        if (!this.isFalling) {  
          this.soundFalling()
          this.isFalling = true
        }  
      }

    }
  } 
  
  // --- move player to clicked point
  checkPointArrival() {
    if (this.activeActor) { 
      if (Math.abs(this.activeActor.x - this.objPlayerDestinationXY.x) < 5) {
        this.activeActor.setVelocityX(0)
        this.activeActor.setAccelerationX(0)
        // this.activeActor.body.stop()
      }
    }
  }

  //----------------- count taken hearts and change flag animations
  counterHeartsFnc() {
    this.counterHearts--
    //update bar heart
    if(this.counterHearts == 1)  this.barHeart.setTexture('heartHalf')  
    if(this.counterHearts == 0)  this.barHeart.setTexture('heartFull')  

    //change flag animation
    this.flag.anims.stop()
    this.flag.anims.play(this.objAnims[this.counterHearts])
   
  }

 //----------------- just reset game
  reloadGame() {
    this.scene.pause('GameScene')  
    fnc.createText(this, cfg.width / 2 - 100, cfg.height / 2 - 20, 'RESTART LEVEL', 35, 'brown')  
    setTimeout(() => this.scene.start('ReloadScene'), 1000)
 }
 
 //----------------check is level complete
  checkLevelComplete() {
    if (this.counterHearts == 0 &&
      (this.spriteDon.body.x > 780 && this.spriteDon.body.y <= 100) &&
      (this.spriteBianka.body.x > 780 && this.spriteBianka.body.y <= 100)) {
      console.log('Level complete');
      this.levelComplete() 
      }
   
  }
    
  
  levelComplete() {
    this.scene.pause('GameScene')
    cfg.global.currentLevel++
    fnc.createText(this, cfg.width / 2 - 100, cfg.height / 2 - 20, 'LEVEL COMPLETE', 35, 'brown')
    if (cfg.global.currentLevel < 11) {   
      setTimeout(() => this.scene.start('ReloadScene'), 1000) // Go to next level
    } else {
      cfg.global.currentLevel = 1
      setTimeout(() => this.scene.start('FinalScene'), 1000) // GAME FINISH
    }
      
    
}

 //--------------------------------------Animations----------------------------------    
  animations() {
//----------------don animations
 //----idle
      
 this.anims.create({
  key: 'idleDon',
  frames: this.anims.generateFrameNumbers('donIdle_5', { start: 0, end: 4 }),
  frameRate: 10,
  repeat: -1
 })
    

  //---run left and right
    this.anims.create({
    key: 'runDon',
    frames: this.anims.generateFrameNumbers('donRun_7', { start: 0, end: 7 }),
    frameRate: 10,
    repeat: -1
  })

  //----jump left and right 
  this.anims.create({
    key: 'jumpDon',
    frames: this.anims.generateFrameNumbers('donJump_7', { start: 0, end: 6 }),
    frameRate: 10,
    repeat: -1
  })

    
  //-----------------------bianka animations
     //----idle
 this.anims.create({
  key: 'idleBianka',
  frames: this.anims.generateFrameNumbers('biankaIdle_5', { start: 0, end: 4 }),
  frameRate: 10,
  repeat: -1
})

  //---run
  this.anims.create({
    key: 'runBianka',
    frames: this.anims.generateFrameNumbers('biankaRun_6', { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1
  })
    
  //----jump right 
  this.anims.create({
    key: 'jumpBianka',
    frames: this.anims.generateFrameNumbers('biankaJump_6', { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1
  })

   
}

  checkIsActiveLift() {
    // lift not active 
    try {
    if (!this.physics.overlap([this.spriteDon, this.spriteBianka], this.buttonsSwitchGroup)) {
      this.buttonsSwitchGroup.children.entries.forEach(btn => {     
        btn.setTexture( btn.name == 'buttonOn' ? 'buttonBlue' : 'buttonRed')
      });
    }
  } catch { }
  }

 
  moveLift(startX = 0, endX = 0, startY = 0, endY = 0, actor,  button ,currentLift = null) {
    
    if (startY || endY) {
       //---------------move up down
      if (button.name == 'buttonOn') {
        if (currentLift.body.y >= endY) { //up
          currentLift.body.y -= this.liftSpeed
          // button.name = 'buttonOff'   <=
        } else {
          this.soundButtonSwitch.stop()
        }
      }

      if (button.name == 'buttonOff') { //down     
        if (currentLift.body.y <= startY) {
          currentLift.body.y += this.liftSpeed
          // button.name = 'buttonOn' >=
        }  else {
          this.soundButtonSwitch.stop()
        }
       } 
    }

    
    //---------- move left right
   if (startX || endX) { 
    if (button.name == 'buttonOn') {
      currentLift.body.x -= this.liftSpeed
      if (currentLift.body.x <= endX) { //up
        button.name = 'buttonOff'
      } else {
        this.soundButtonSwitch.stop()
      }
    }

    if (button.name == 'buttonOff') { //down
      currentLift.body.x += this.liftSpeed
      if (currentLift.body.x >= startX) {
        button.name = 'buttonOn'
      }  else {
        this.soundButtonSwitch.stop()
      }
     } 
   }
    
  }
    
  moveLiftInfinity(startX = 0, endX = 0, startY = 0, endY = 0, actor,  button ,currentLift = null) {
    
    if (startY || endY) {
       //---------------move up down
      if (button.name == 'buttonOn') {
        currentLift.body.y -= this.liftSpeed
        if (currentLift.body.y <= endY) { //up
          button.name = 'buttonOff'
        }
      }

      if (button.name == 'buttonOff') { //down     
        currentLift.body.y += this.liftSpeed
        if (currentLift.body.y >= startY) {
          button.name = 'buttonOn'
        } 
       } 
    }

    
    //---------- move left right
   if (startX || endX) { 
    if (button.name == 'buttonOn') {
      currentLift.body.x -= this.liftSpeed
      if (currentLift.body.x <= endX) { //up
        button.name = 'buttonOff'
      }
    }

    if (button.name == 'buttonOff') { //down
      currentLift.body.x += this.liftSpeed
      if (currentLift.body.x >= startX) {
        button.name = 'buttonOn'
      } 
     } 
   }
    
  }
    
};

