let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const player = new Player()
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
    backgroundLevel1.drawTexture()
    

    player.velosity.x = 0;
    if (player.keys.d.pressed) {
        player.velosity.x = 5;
    } 
    if (player.keys.a.pressed) {
        player.velosity.x = -5;
    }

    player.playerDraw();
    player.playerAnimation();
}

animation()


