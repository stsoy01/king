import Sprite from './Sprite'
import {player} from "../../index";
export default class Player extends Sprite {
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

    constructor({
                    collisionBlocks,
                    imageSrc,
                    frameRate,
                    animations,
                    loop
                }) {
        super({
            imageSrc,
            frameRate,
            animations,
            loop
        });
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

    switchSprite(spriteName) {
        if (this.animations[spriteName].image === this.image) return
        this.currentFrame = 0
        this.image = this.animations[spriteName].image;
        this.frameRate = this.animations[spriteName].frameRate;
        this.frameBuffer = this.animations[spriteName].frameBuffer;
        this.loop = this.animations[spriteName].loop;
        this.currentAnimation = this.animations[spriteName];
    }

    playerMovement() {
        // Player box detection
        // c.fillStyle = 'rgba(0,0,250,0.4)';
        // c.fillRect(this.position.x, this.position.y, this.width, this.height);

        this.position.x += this.velosity.x;

        this.updateHitBox();

        this.checkForHorizontalCollisions()

        this.gravityApply()

        this.position.y += this.velosity.y;
        this.updateHitBox();

        // c.fillRect(
        //   this.hitBox.position.x,
        //   this.hitBox.position.y,
        //   this.hitBox.width,
        //   this.hitBox.height
        // )

        this.checkForVerticalCollisions();
    }

    handleInput() {
        if (player.preventInput) return;
        player.velosity.x = 0;
        if (player.keys.d.pressed) {
            player.velosity.x = 5;
            player.switchSprite('runRight');
            player.lastDirection = 'right';
        } else if (player.keys.a.pressed) {
            player.velosity.x = -5;
            player.switchSprite('runLeft');
            player.lastDirection = 'left';
        } else {
            if (player.lastDirection === 'left') {
                player.switchSprite('idleLeft');
            } else {
                player.switchSprite('idleRight');
            }
        }
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
            const collisionBlock = this.collisionBlocks[i]

            // if a collision exists
            if (
                this.hitBox.position.x <=
                collisionBlock.position.x + collisionBlock.width &&
                this.hitBox.position.x + this.hitBox.width >=
                collisionBlock.position.x &&
                this.hitBox.position.y + this.hitBox.height >=
                collisionBlock.position.y &&
                this.hitBox.position.y <=
                collisionBlock.position.y + collisionBlock.height
            ) {
                if (this.velosity.y < 0) {
                    this.velosity.y = 0
                    const offset = this.hitBox.position.y - this.position.y
                    this.position.y =
                        collisionBlock.position.y + collisionBlock.height - offset + 0.01
                    break
                }

                if (this.velosity.y > 0) {
                    this.velosity.y = 0
                    const offset =
                        this.hitBox.position.y - this.position.y + this.hitBox.height
                    this.position.y = collisionBlock.position.y - offset - 0.01
                    break
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
