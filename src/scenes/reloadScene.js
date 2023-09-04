import {Scene} from'phaser';
import * as fnc from '../game.js';
import { cfg } from '../game.js'
import { GameScene } from "./gameScene.js";


export class ReloadScene extends Scene {
  constructor() {
    super('ReloadScene')
  }
  init() {
    console.log('StoryScene was loading...')
    this.game.sound.stopAll()
  }

  preload() {}
 
  create() { 
    fnc.tweenAnimation.transitionBetweenScene(this, cfg)

    fnc.createText(this, cfg.width / 2 - 100, cfg.height / 2 - 20, 'LOADING...', 45, 'brown')
    //remove and add scene again to reset all level
    this.scene.remove('GameScene')
    this.anims.anims.clear();

    setTimeout(() =>  this.scene.add('GameScene' , GameScene), 200)
    setTimeout(() =>  this.scene.start('GameScene'), 1000)
    
  }

  update(time, delta) {}
}