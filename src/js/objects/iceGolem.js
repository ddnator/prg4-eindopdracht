import { Actor, CollisionStartEvent, CollisionType, Engine, Keys, Sprite, Vector } from "excalibur"
import { Resources } from "../resources.js"
import { Floor } from "./floor.js"
import { Yana } from "./yana.js"

export class IceGolem extends Actor {
    hp = 3
    constructor() {
        super({ width: Resources.IceGolem.width, height: Resources.IceGolem.height })
        
    }

    onInitialize(engine) {
        this.body.collisionType = CollisionType.Active
        let xVel = -200 * engine.difficulty
        let yVel = 0
        let xPosition = 1280
        let yPosition = 460
        this.graphics.use(Resources.IceGolem.toSprite())
        this.pos = new Vector(xPosition, yPosition)
        this.vel = new Vector(xVel, yVel)
        this.scale = new Vector(1.3, 1.3)
        this.graphics.flipHorizontal = true
    }

    onPreUpdate() {
        if (this.hp <= 0) {
            this.kill()
        }
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof Yana) {
            other.owner.health -= 1
            this.kill()
        }
    }
}