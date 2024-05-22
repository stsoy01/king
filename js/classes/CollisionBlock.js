class CollisionBlock {
    constructor({position}) {
        this.posistion = position;
        this.width = 64;
        this.height = 64;
    }

    drawBlock() {
        c.fillStyle = 'rgba(255,0,0,0.5)';
        c.fillRect(this.posistion.x, this.posistion.y, this.width, this.height);
    }
}