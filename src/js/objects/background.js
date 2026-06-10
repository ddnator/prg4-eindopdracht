import { Actor, Vector } from "excalibur"
import { Resources } from "../resources"

export class Background extends Actor {

    constructor() {
        super()
    }

    onInitialize(engine) {

        this.graphics.use(Resources.Background.toSprite())
        this.pos = new Vector(640, 360)
        this.scale = new Vector(0.9, 0.9)


    }
}