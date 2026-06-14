import { Actor, Vector } from "excalibur"
import { Resources } from "../resources.js"
import { IceGolem } from "./iceGolem.js"
import { Wolf } from "./wolf.js"
import { Crow } from "./crow.js"


export class Slash extends Actor {
    xPosition
    yPosition
    constructor(givenX, givenY) {
        super({ width: Resources.Slash.width, height: Resources.Slash.height })

        this.xPosition = givenX + 100
        this.yPosition = givenY

    }
    onInitialize(engine) {
        this.graphics.use(Resources.Slash.toSprite())
        this.pos = new Vector(this.xPosition, this.yPosition)
        this.on('collisionstart', (event) => this.hitSomething(event))
        this.scale = new Vector(0.5, 0.5)
    }

     hitSomething(event) {
        if (event.other.owner instanceof IceGolem  || event.other.owner instanceof Wolf || event.other.owner instanceof Crow) {
            event.other.owner.kill();
        }
    }
}