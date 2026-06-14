import { Actor, Vector,  } from "excalibur"
import { Resources } from "../resources"

export class Background extends Actor {
    offset
    constructor(offset) {
        super()
        this.offset = offset
    }

    onInitialize() {
        this.graphics.use(Resources.Background.toSprite())
        this.pos = new Vector(640 + this.offset, 360)
    }

    onPostUpdate(engine) {
        this.vel = new Vector(-engine.difficulty * 100, 0)
    }
}