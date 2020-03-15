# nodejs-example-simple-rpg-game

This is a nodejs example of a simple RPG style game that can be played in the command line. All I wanted to make is a simple game that involves an \@ symbol as the player, and E chars for enemies in a fixed grid area composed of just characters in the standard output. I want each move to result in the state of the game being saved to a json file in the current working director and that is it.

## 1 - Install

If you just want to play the game I do not have this project up on npmjs at this time, so if you will have to clone it down and run the game.js script, or install globally.

Clone down the repo and make the folder the current working dir
```
$ git clone --depth 1 https://github.com/dustinpfister/nodejs-example-simple-rpg-game
$ cd nodejs-example-simple-rpg-game
```

If you do not want to install globally you can just run the game.js file with node
```
$ node game.js
```

Or install globally and play from any path where you can save a json file
```
$ sudo npm install -g
$ simprpg
```

## 2 - How to play

Once you start the game in the command line the wasd keys can be used to move the player \@ symbol around. Moving into a enemy object represented with the upper case letter E counts as hitting it. When you are done playing the x key can be used to quit. Each time the play object moves a save state will be saved in the current working folder, just start the game up again to continue.
