import { Actor, Vector } from "excalibur"
import { Resources } from "../resources.js"
import { IceGolem } from "./iceGolem.js"


export class Arrow extends Actor {
    xPosition
    yPosition
    constructor(givenX, givenY) {
        super({ width: Resources.Arrow.width, height: Resources.Arrow.height })

        this.xPosition = givenX
        this.yPosition = givenY

    }
    onInitialize(engine) {
        let yVel = 0
        let xVel = 500
        
        this.graphics.use(Resources.Arrow.toSprite())
        this.pos = new Vector(this.xPosition, this.yPosition)
        this.vel = new Vector(xVel, yVel)
        this.on('collisionstart', (event) => this.hitSomething(event))
        this.events.on("exitviewport", (e) => this.kill())
        this.scale = new Vector(0.2, 0.2)
    }

     hitSomething(event) {
        if (event.other.owner instanceof IceGolem) {
            event.other.owner.hp -= 1;
            this.kill();
        }
    }
}