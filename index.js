let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

let parsedCollisions,
    collisionBlocks,
    background,
    doors

const player = new Player({
    imageSrc: './img/king/idle.png',
    frameRate: 11,
    animations: {
        idleRight: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: './img/king/idle.png',
        },
        idleLeft: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: './img/king/idleLeft.png',
        },
        runRight: {
            frameRate: 8,
            frameBuffer: 2,
            loop: true,
            imageSrc: './img/king/runRight.png',
        },
        runLeft: {
            frameRate: 8,
            frameBuffer: 2,
            loop: true,
            imageSrc: './img/king/runLeft.png',
        },
        enterDoor: {
            frameRate: 8,
            frameBuffer: 6,
            loop: false,
            imageSrc: './img/king/enterDoor.png',
            onComplete: () => {
                gsap.to(overlay, {
                    opacity: 1,
                    onComplete: () => {

                        level++;
                
                        levels[level].init();
                        player.switchSprite('idleRight');
                        player.preventInput = false;
                        gsap.to(overlay, {
                            opacity: 0,
                        })
                    }
                })
            }
        }
    }
});

let level = 1;

let levels = {
    1: {
        init: () => {
            parsedCollisions = collisionsLevel1.parse2D(collisionsLevel1)
            collisionBlocks = parsedCollisions.createObjectsFrom2d();
            player.collisionBlocks = collisionBlocks
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/backgrounds/backgroundLevel1.png'
            })
            doors = [
                new Sprite({
                    position: {
                        x: 767,
                        y: 270
                    },
                    imageSrc: './img/backgrounds/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                }),
            ]
        }
    },
    2: {
        init: () => {
            parsedCollisions = collisionsLevel2.parse2D(collisionsLevel1)
            collisionBlocks = parsedCollisions.createObjectsFrom2d();
            player.collisionBlocks = collisionBlocks

            player.position.x = 96;
            player.position.y = 140;

            if (player.currentAnimation.isActive) player.currentAnimation.isActive = false;

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/backgrounds/backgroundLevel2.png'
            })
            doors = [
                new Sprite({
                    position: {
                        x: 772.0,
                        y: 336,
                    },
                    imageSrc: './img/backgrounds/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                }),
            ];
        }
    },
    3: {
        init: () => {

            parsedCollisions = collisionsLevel3.parse2D(collisionsLevel1)
            collisionBlocks = parsedCollisions.createObjectsFrom2d();
            player.collisionBlocks = collisionBlocks

            player.position.x = 750;
            player.position.y = 230;

            if (player.currentAnimation.isActive) player.currentAnimation.isActive = false;

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/backgrounds/backgroundLevel3.png'
            })
            doors = [
                new Sprite({
                    position: {
                        x: 176.0,
                        y: 336,
                    },
                    imageSrc: './img/backgrounds/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                }),
            ];
        }
    }
}


const overlay = {
    opacity: 0
}

function animate() {
    window.requestAnimationFrame(animate)

    //playground scene
    background.drawTexture();
    doors.forEach((door) => {
        door.drawTexture()
    })
    player.handleInput();
    player.drawTexture();
    player.playerMovement();

    c.save();
    c.globalAlpha = overlay.opacity
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.restore();
}

levels[level].init();
animate()


