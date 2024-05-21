class Player {

    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.width = 100;
        this.height = 100;
    }

    playerDraw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    playerAnimation() {
        if (this.position.y < 476) {
            this.position.y++;
        }
    }
}
