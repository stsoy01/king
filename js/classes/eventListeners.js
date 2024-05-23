window.addEventListener('keydown', (event) => {
  console.log(event.key);
  switch (event.key) {
    case 'w':

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
