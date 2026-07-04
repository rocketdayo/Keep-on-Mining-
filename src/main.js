import Phaser from "phaser";
import GameScene from "./scenes/GameScene.js";

const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 800,
  backgroundColor: "#0f0f14",
  scene: [GameScene]
};

new Phaser.Game(config);