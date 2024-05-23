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
    }
  }
})

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
  collisionBlocks.forEach((collisionBlock) => {
    // collisionBlock.drawBlock()
  })

  // player.lastDiraction = 'right';
  player.velosity.x = 0;

  if (player.keys.d.pressed) {
    player.velosity.x = 5;
    player.switchSprite('runRight');
    player.lastDiraction = 'right';
  }
  else if (player.keys.a.pressed) {
    player.velosity.x = -5;
    player.switchSprite('runLeft');
    player.lastDiraction = 'left';
  } else {
    if (player.lastDiraction === 'left') {
      player.switchSprite('idleLeft');
    } else {
      player.switchSprite('idleRight');
    }
  }

  player.drawTexture();
  player.playerMovement();
}

animation()


