import {doors, player} from '../../index'
window.addEventListener('keydown', (event) => {

    if (player.preventInput) return;

    switch (event.key) {
        case 'w':
            for (let i = 0; i < doors.length; i++) {
                const door = doors[i]
                if (
                    player.hitBox.position.x + player.hitBox.width <= door.position.x + door.width &&
                    player.hitBox.position.x >= door.position.x &&
                    player.hitBox.position.y + player.hitBox.height >= door.position.y &&
                    player.hitBox.position.y <= door.position.y + door.heigth) {
                    player.velosity.x = 0
                    player.velosity.y = 0
                    player.preventInput = true;
                    player.switchSprite('enterDoor');
                    door.play();
                    return;
                }
            }

            if (player.velosity.y === 0) player.velosity.y = -13;
            break;
        case 'a':
            player.keys.a.pressed = true;
            break;
        case 'd':
            player.keys.d.pressed = true;
            break;
    }
})
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            player.keys.d.pressed = false;
            break;
        case 'a':
            player.keys.a.pressed = false;
            break;
    }
})

