class Player {
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

    constructor({collisionBlocks}) {
        this.position = {
            x: 200,
            y: 200
        }
        this.width = 25;
        this.height = 25;

        this.velosity = {
            x: 0,
            y: 0
        }

        this.gravity = 1;

        this.collisionBlocks = collisionBlocks;
        console.log(this.collisionBlocks)
    }

    playerDraw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    playerMovement() {
        this.position.x += this.velosity.x;

        this.checkForHorizontalCollisions()

        this.position.y += this.velosity.y;

        this.checkForVerticalCollisions();

        this.gravityApply()
    }

    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            if (this.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.position.x + this.width >= collisionBlock.position.x &&
                this.position.y + this.height >= collisionBlock.position.y &&
                this.position.y <= collisionBlock.position.y + collisionBlock.height) {

                if (this.velosity.x < 0) {
                    this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01;
                    break;
                }

                if (this.velosity.x > 0) {
                    this.position.x = collisionBlock.position.x - this.width - 0.01;
                    break;
                }
            }
        }
    }

    checkForVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            if (this.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.position.x + this.width >= collisionBlock.position.x &&
                this.position.y + this.height >= collisionBlock.position.y &&
                this.position.y <= collisionBlock.position.y + collisionBlock.height) {

                if (this.velosity.y < 0) {
                    this.velosity.y = 0;
                    this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01;
                    break;
                }

                if (this.velosity.y > 0) {
                    this.velosity.y = 0;
                    this.position.y = collisionBlock.position.y - this.height - 0.01;
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



