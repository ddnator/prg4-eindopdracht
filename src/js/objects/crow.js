import { Actor, CollisionStartEvent, CollisionType, Engine, Keys, Vector } from "excalibur"
import { Resources } from "../resources.js"
import { Floor } from "./floor.js"
import { Yana } from "./yana.js"

export class Crow extends Actor {
    xVel
    constructor() {
        super({ width: Resources.Crow.width, height: Resources.Crow.height })
    }

    onInitialize(engine) {
        this.body.useGravity = false
        this.body.collisionType = CollisionType.Active
        this.xVel = -400 * engine.difficulty
        let yVel = 0
        let xPosition = 1280
        let yPosition = 450 - Math.random() * 100
        this.graphics.use(Resources.Crow.toSprite())
        this.pos = new Vector(xPosition, yPosition)
        this.vel = new Vector(this.xVel, yVel)
        this.scale = new Vector(0.1, 0.1)
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof Yana) {
            other.owner.health -= 1
            this.kill()
        }
    }
    onPostUpdate(engine) {
        if (this.vel === 0) {
            this.kill()
        }
    }
}