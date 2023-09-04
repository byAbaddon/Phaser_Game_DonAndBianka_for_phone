import style from "./main.css";
import Phaser, { Game } from 'phaser';
import loadMultiImages from "./functions/loadMultiImages";
import createAudio from "./functions/createAudio";
import createText from "./functions/createText";
import * as animation from "./functions/createAnimation";
import * as tweenAnimation from "./functions/createTween";
import checkOrientation from "./functions/checkOrientation";

import { IntroScene } from "./scenes/introScene";
import { MenuScene } from "./scenes/menuScene";
import { ReloadScene } from "./scenes/reloadScene";
import { GameScene } from "./scenes/gameScene";
import { CreditsScene } from "./scenes/creditsScene";
import { FinalScene } from "./scenes/finalScene";



const cfg = {
  width: 960,  //936, X28
  height: 480, //432  X13
  orientation: 'portrait', // set phone orientation  (portrait - vertical, landscape - horizontal)
  forceOrientation: true,
  backgroundColor: 'rgb(10, 100, 200)', //'rgb(0,0,100)'
  type: Phaser.AUTO,
  // type: Phaser.CANVAS,
  parent: 'game',
  scene: [IntroScene, MenuScene, GameScene, ReloadScene, CreditsScene,FinalScene, ],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false, //false default
      gravity: { y: 160 }, // default gravity
    }
  },
  scale: {
    // mode: Phaser.Scale.FIT,
    mode: Phaser.Scale.SHOW_ALL,
    // mode: Phaser.Scale.LANDSCAPE, // vertical orientation screen
    // mode: Phaser.Scale.PORTRAIT, // vertical orientation screen
    parent: 'game-container',
    autoCenter: Phaser.Scale.CENTER_BOTH 
  },
  dom: {
    createContainer: true
  },
  global: {
    currentLevel: 1, // Initial value of the global property 
    globalDataJSON: null, // Set initial JSON value to null
    globalImages : null
  }
};

const game = new Phaser.Game(cfg)


export {
  cfg,
  loadMultiImages,
  createAudio,
  createText,
  animation,
  tweenAnimation,
  checkOrientation,
}

