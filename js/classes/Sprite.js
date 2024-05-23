class Sprite {
  constructor({ position, imageSrc, frameRate = 1, animations }) {
    this.position = position
    this.image = new Image()
    this.image.onload = () => {
      this.isImageLoaded = true;
      this.width = this.image.width / this.frameRate;
      this.heigth = this.image.height;
    }
    this.image.src = imageSrc;
    this.isImageLoaded = false;
    this.frameRate = frameRate;
    this.currentFrame = 0;
    this.elapsedFrames = 0;
    this.frameBuffer = 2;
    this.animations = animations;

    if (this.animations) {
      for (let key in this.animations) {
        const image = new Image();
        image.src = this.animations[key].imageSrc;
        this.animations[key].image = image;
      }
    }
    console.log(this.animations);
  }

  drawTexture() {
    if (!this.isImageLoaded) return;

    const cropBox = {
      position: {
        x: this.width * this.currentFrame,
        y: 0
      },
      width: this.width,
      heigth: this.heigth,
    }

    c.drawImage(
      this.image,
      cropBox.position.x,
      cropBox.position.y,
      cropBox.width,
      cropBox.heigth,
      this.position.x,
      this.position.y,
      this.width,
      this.heigth
    )
    this.updateFrames()
  }

  updateFrames() {
    this.elapsedFrames++

    if (this.elapsedFrames % this.frameBuffer === 0) {
      if (this.currentFrame < this.frameRate - 1) {
        this.currentFrame++
      } else {
        this.currentFrame = 0
      }
    }
  }
}
