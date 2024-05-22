window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            if (event.repeat || player.position.y < 200) return;
            if (player.velosity.y > 0) player.velosity.y = -13;
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