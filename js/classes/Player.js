class Player extends Sprite {
  keys = {
    w: {
      pressed: false,
    },
    a: {
      pressed: false,
    },
    d: {
      pressed: false,
    },
  }

  constructor({ collisionBlocks, imageSrc, frameRate }) {
    super({ imageSrc, frameRate });
    this.position = {
      x: 200,
      y: 200
    }

    // Проблемная часть не наследуется из родительского класса
    this.width = this.width || 300;
    this.height = this.height || 116;


    this.velosity = {
      x: 0,
      y: 0
    }

    this.gravity = 1;

    this.collisionBlocks = collisionBlocks;

  }

  playerMovement() {
    // Player box detection
    c.fillStyle = 'rgba(0,0,250,0.4)';
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);

    this.position.x += this.velosity.x;

    this.updateHitBox();

    this.checkForHorizontalCollisions()

    this.position.y += this.velosity.y;

    this.gravityApply()
    this.updateHitBox();

    // c.fillRect(
    //   this.hitBox.position.x,
    //   this.hitBox.position.y,
    //   this.hitBox.width,
    //   this.hitBox.height
    // )

    this.checkForVerticalCollisions();
  }

  updateHitBox() {
    this.hitBox = {
      position: {
        x: this.position.x + 58,
        y: this.position.y + 34
      },
      width: 50,
      height: 53
    }
  }

  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        this.hitBox.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.hitBox.position.x + this.hitBox.width >= collisionBlock.position.x &&
        this.hitBox.position.y + this.hitBox.height >= collisionBlock.position.y &&
        this.hitBox.position.y <= collisionBlock.position.y + collisionBlock.height) {

        if (this.velosity.x < 0) {
          const offSet = this.hitBox.position.x - this.position.x
          this.position.x = collisionBlock.position.x + collisionBlock.width - offSet + 0.01;
          break;
        }

        if (this.velosity.x > 0) {
          const offSet = this.hitBox.position.x - this.position.x + this.hitBox.width;
          this.position.x = collisionBlock.position.x - offSet - 0.01;
          break;
        }
      }
    }
  }

  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (this.hitBox.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.hitBox.position.x + this.hitBox.width >= collisionBlock.position.x &&
        this.hitBox.position.y + this.hitBox.height >= collisionBlock.position.y &&
        this.hitBox.position.y <= collisionBlock.position.y + collisionBlock.height) {

        if (this.velosity.y < 0) {
          this.velosity.y = 0;
          const offSet = this.hitBox.position.y - this.position.y
          this.position.y = collisionBlock.position.y + offSet + 0.01;
          break;
        }

        if (this.velosity.y > 0) {
          this.velosity.y = 0;
          const offSet = this.hitBox.position.y - this.position.y + this.hitBox.height;
          this.position.y = collisionBlock.position.y - offSet - 0.01;
          break;
        }
      }
    }
  }
  gravityApply() {
    if (this.position.y < 476) {
      this.velosity.y += this.gravity
    } else {
      this.velosity.y = 0
    }
  }
}



