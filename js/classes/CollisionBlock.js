import {c} from "../../index";

export default class CollisionBlock {
    constructor({position}) {
        this.position = position;
        this.width = 64;
        this.height = 64;
    }

    drawBlock() {
        c.fillStyle = 'rgba(255,0,0,0.5)';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
