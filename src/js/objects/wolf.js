import { Actor, CollisionStartEvent, CollisionType, Engine, Keys, Vector } from "excalibur"
import { Resources } from "../resources.js"
import { Floor } from "./floor.js"
import { Yana } from "./yana.js"

export class Wolf extends Actor {
    grounded = false
    jumpReady = false
    xVel
    constructor() {
        super({ width: Resources.Wolf.width, height: Resources.Wolf.height })
    }

    onInitialize(engine) {
        this.body.collisionType = CollisionType.Active
        this.xVel = -400 * engine.difficulty
        let yVel = 0
        let xPosition = 1280
        let yPosition = 460
        this.graphics.use(Resources.Wolf.toSprite())
        this.pos = new Vector(xPosition, yPosition)
        this.vel = new Vector(this.xVel, yVel)
        this.scale = new Vector(0.2, 0.2)
    }

    onPreUpdate(engine, delta) {
        if (this.grounded && this.jumpReady) {
            this.body.applyLinearImpulse(new Vector(0, -300 * delta))
        }
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof Floor) {
            this.grounded = true

            this.scene.engine.clock.schedule(() => {
                this.jumpReady = true
            }, Math.random() * 2000 + 500)
        }

        if (other.owner instanceof Yana) {
            other.owner.health -= 1
            this.kill()
        }
    }

    onCollisionEnd(event, other) {
        if (other.owner instanceof Floor) {
            this.grounded = false
            this.jumpReady = false
        }
    }
}