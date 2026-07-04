// src/main.js
// updated: 2026-07-04 (v0.1.1)

import Phaser from "https://cdn.jsdelivr.net/npm/phaser@3.80.1/dist/phaser.esm.min.js";
import GameScene from "./scenes/GameScene.js";

const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 800,
  backgroundColor: "#0f0f14",
  scene: [GameScene]
};

new Phaser.Game(config);