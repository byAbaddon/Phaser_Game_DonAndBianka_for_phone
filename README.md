# Phaser_Game Don and Bianka

### Created a project using:
+ Phaser 3
+ Tiled editor
+ JS
+ Simple - HTML / CSS
+ webpack
+ bable
+ cordova
+ android stuido
+ 

# Game - Don and Bianka
## Playing the game
A fun arcade game with two characters that can be swapped during the game to help each other.
The goal is to collect the two halves of one heart to pass the level.
Standard movements in all directions, obstacles, lifts, bridges, mushrooms, boxes, etc.
```diff
- P.S.
 ! Custom touch player controls, and double tap to jump.
 ! Ten levels where all options are tested.
 ! Beta version /may have some bugs
```
### Notes:
```diff
- Not suport portrait position!
```
## Short video intro:


## Screenshots:
![intro](https://github.com/byAbaddon/byAbaddon-Phaser_Game_DonAndBianka_for_phone/assets/51271834/bcd2dc4e-5ac8-43a4-aaae-8aff4d6db252)
![menu](https://github.com/byAbaddon/byAbaddon-Phaser_Game_DonAndBianka_for_phone/assets/51271834/8e462459-ac87-4292-97c9-644e0ad4b437)
![credits](https://github.com/byAbaddon/byAbaddon-Phaser_Game_DonAndBianka_for_phone/assets/51271834/0b598bb5-9e1f-4ec7-b6e3-fbb2993b7550)
![level1](https://github.com/byAbaddon/byAbaddon-Phaser_Game_DonAndBianka_for_phone/assets/51271834/addd1dc8-a197-4a5d-88fc-13b7fc89e611)
![level4](https://github.com/byAbaddon/byAbaddon-Phaser_Game_DonAndBianka_for_phone/assets/51271834/337a44ce-8281-46c7-a575-ba32e292462c)
![level5](https://github.com/byAbaddon/byAbaddon-Phaser_Game_DonAndBianka_for_phone/assets/51271834/22ddaf66-95d5-499a-aacb-a7eb772f655f)
![level6](https://github.com/byAbaddon/byAbaddon-Phaser_Game_DonAndBianka_for_phone/assets/51271834/d5ad73ff-0148-4bd2-a097-2b7abf2b240d)
![level7](https://github.com/byAbaddon/byAbaddon-Phaser_Game_DonAndBianka_for_phone/assets/51271834/142a0bc5-01d2-4e90-b1ba-931fe5c93fd5)
![level8](https://github.com/byAbaddon/byAbaddon-Phaser_Game_DonAndBianka_for_phone/assets/51271834/33f1e2d3-c828-48d8-99a5-c5befff872f0)
![level9](https://github.com/byAbaddon/byAbaddon-Phaser_Game_DonAndBianka_for_phone/assets/51271834/a1269d28-9104-465d-bcab-db1190f12a19)



### Download
#### Created with Phaser 3 and converted for android mobile app.
##### download apk file:



### Prerequisites
- [Phaser 3](https://phaser.io)

#### Year:
2023

### Developer
By Abaddon

<br>
<br>

A Phaser 3 project template with ES6 support via [Babel 7](https://babeljs.io/) and [Webpack 4](https://webpack.js.org/) that includes hot-reloading for development and production-ready builds.

This has been updated for Phaser 3.50.0 version and above.

Loading images via JavaScript module `import` is also supported, although not recommended.

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm start` | Build project and open web server running project |
| `npm run build` | Builds code bundle with production settings (minification, uglification, etc..) |

## Writing Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development server by running `npm start`.

After starting the development server with `npm start`, you can edit any files in the `src` folder and webpack will automatically recompile and reload your server (available at `http://localhost:8080` by default).

## Customizing the Template

### Babel

You can write modern ES6+ JavaScript and Babel will transpile it to a version of JavaScript that you want your project to support. The targeted browsers are set in the `.babelrc` file and the default currently targets all browsers with total usage over "0.25%" but excludes IE11 and Opera Mini.

 ```
"browsers": [
  ">0.25%",
  "not ie 11",
  "not op_mini all"
]
 ```

### Webpack

If you want to customize your build, such as adding a new webpack loader or plugin (i.e. for loading CSS or fonts), you can modify the `webpack/base.js` file for cross-project changes, or you can modify and/or create new configuration files and target them in specific npm tasks inside of `package.json'.

## Deploying Code

After you run the `npm run build` command, your code will be built into a single bundle located at `dist/bundle.min.js` along with any other assets you project depended. 

If you put the contents of the `dist` folder in a publicly-accessible location (say something like `http://mycoolserver.com`), you should be able to open `http://mycoolserver.com/index.html` and play your game.

