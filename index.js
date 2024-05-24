let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;


const parsedCollisions = collisionsLevel1.parse2D(collisionsLevel1)
const collisionBlocks = parsedCollisions.createObjectsFrom2d();


const player = new Player({
    collisionBlocks,
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
            imageSrc: './img/king/enterDoor.png'
        }
    }
});

const doors = [
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
    })
]

const backgroundLevel1 = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/backgrounds/backgroundLevel1.png'
})


function animation() {
    window.requestAnimationFrame(animation)

    //playground scene
    backgroundLevel1.drawTexture();
    doors.forEach((doors) => {
        doors.drawTexture();
    })


    collisionBlocks.forEach((collisionBlock) => {
        // collisionBlock.drawBlock()
    })

    // player.lastDirection = 'right';


    player.handleInput();

    player.drawTexture();
    player.playerMovement();
}

animation()


