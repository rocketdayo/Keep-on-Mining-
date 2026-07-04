export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    // ───── データ ─────
    this.ore = 0;
    this.coins = 0;
    this.depth = 0;

    this.mineSpeed = 1; // 秒あたり
    this.lastMineTime = 0;

    this.depthLevel = 1;

    // ───── UI ─────
    this.infoText = this.add.text(20, 20, "", {
      fontSize: "18px",
      color: "#ffffff"
    });

    this.depthText = this.add.text(20, 60, "", {
      fontSize: "16px",
      color: "#aaaaaa"
    });

    // ボタン（売却）
    this.sellBtn = this.add.text(20, 700, "[ SELL ORE ]", {
      fontSize: "20px",
      color: "#00ff99",
      backgroundColor: "#222"
    }).setInteractive();

    this.sellBtn.on("pointerdown", () => {
      this.coins += this.ore * this.getOreValue();
      this.ore = 0;
    });

    // 強化ボタン
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

    // 掘削進行表示
    this.bar = this.add.rectangle(240, 400, 300, 20, 0x333333);
    this.fillBar = this.add.rectangle(100, 400, 10, 20, 0x00ffcc);
  }

  update(time) {
    // ───── 採掘ロジック ─────
    if (time > this.lastMineTime + 1000 / this.mineSpeed) {
      this.mine();
      this.lastMineTime = time;
    }

    // 深さ進行
    this.depth += this.mineSpeed * 0.1;
    this.updateDepthLevel();

    // UI更新
    this.infoText.setText(
      `ORE: ${this.ore}  COINS: ${this.coins.toFixed(0)}  SPEED: ${this.mineSpeed.toFixed(1)}`
    );

    this.depthText.setText(
      `DEPTH: ${this.depth.toFixed(1)}m  LAYER: ${this.depthLevel}`
    );

    // バー更新
    this.fillBar.width = Math.min(300, this.ore * 2);
  }

  mine() {
    const base = this.getOreValue();
    this.ore += 1 + Math.floor(Math.random() * base);
  }

  getOreValue() {
    return this.depthLevel;
  }

  updateDepthLevel() {
    this.depthLevel = 1 + Math.floor(this.depth / 50);
  }

  getUpgradeCost() {
    return Math.floor(10 * this.mineSpeed);
  }
}