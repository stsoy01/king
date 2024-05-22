class Player {
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

    constructor() {
        this.position = {
            x: 125,
            y: 200
        }
        this.width = 100;
        this.height = 100;

        this.velosity = {
            x: 0,
            y: 0
        }

        this.gravity = 1;

    }

    playerDraw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    playerAnimation() {
        this.position.x += this.velosity.x;
        this.position.y += this.velosity.y;

        if (this.position.y < 476) {
            this.velosity.y += this.gravity
        } else {
            this.velosity.y = 0
        }
    }
}

