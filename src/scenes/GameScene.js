// src/scenes/GameScene.js
// updated: 2026-07-04 (v0.1.0)

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    this.ore = 0;
    this.coins = 0;
    this.depth = 0;

    this.mineSpeed = 1;
    this.lastMineTime = 0;
    this.depthLevel = 1;

    this.infoText = this.add.text(20, 20, "", {
      fontSize: "18px",
      color: "#ffffff"
    });

    this.depthText = this.add.text(20, 60, "", {
      fontSize: "16px",
      color: "#aaaaaa"
    });

    this.sellBtn = this.add.text(20, 700, "[ SELL ]", {
      fontSize: "20px",
      color: "#00ff99",
      backgroundColor: "#222"
    }).setInteractive();

    this.sellBtn.on("pointerdown", () => {
      this.coins += this.ore * this.getOreValue();
      this.ore = 0;
    });

    this.upgradeBtn = this.add.text(200, 700, "[ UPGRADE ]", {
      fontSize: "20px",
      color: "#ffcc00",
      backgroundColor: "#222"
    }).setInteractive();

    this.upgradeBtn.on("pointerdown", () => {
      const cost = this.getUpgradeCost();
      if (this.coins >= cost) {
        this.coins -= cost;
        this.mineSpeed += 0.5;
      }
    });
  }

  update(time) {
    if (time > this.lastMineTime + 1000 / this.mineSpeed) {
      this.mine();
      this.lastMineTime = time;
    }

    this.depth += this.mineSpeed * 0.1;
    this.depthLevel = 1 + Math.floor(this.depth / 50);

    this.infoText.setText(
      `ORE: ${this.ore} COINS: ${this.coins.toFixed(0)} SPEED: ${this.mineSpeed.toFixed(1)}`
    );

    this.depthText.setText(
      `DEPTH: ${this.depth.toFixed(1)}m LAYER: ${this.depthLevel}`
    );
  }

  mine() {
    const base = this.getOreValue();
    this.ore += 1 + Math.floor(Math.random() * base);
  }

  getOreValue() {
    return this.depthLevel;
  }

  getUpgradeCost() {
    return Math.floor(10 * this.mineSpeed);
  }
}