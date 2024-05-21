

let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const player = new Player()

function animation() {
    window.requestAnimationFrame(animation)

    //playground scene
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);

    player.playerDraw();
    player.playerAnimation();
}

animation()
