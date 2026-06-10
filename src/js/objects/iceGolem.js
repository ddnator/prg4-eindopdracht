import { Actor, CollisionStartEvent, CollisionType, Engine, Keys, Vector } from "excalibur"
import { Resources } from "../resources.js"
import { Platform } from "./platform.js"
import { Yana } from "./yana.js"

export class IceGolem extends Actor {
    hp = 3;
    grounded = false
    jumpReady = false
    constructor() {
        super({ width: Resources.IceGolem.width, height: Resources.IceGolem.height })
    }

    onInitialize(engine) {
        this.body.collisionType = CollisionType.Active
        let xVel = -200
        let yVel = 0
        let xPosition = 1280
        let yPosition = 460
        this.graphics.use(Resources.IceGolem.toSprite())
        this.pos = new Vector(xPosition, yPosition)
        this.vel = new Vector(xVel, yVel)
        this.scale = new Vector(1.3, 1.3)
    }

    onPreUpdate(engine, delta) {
        if (this.hp <= 0) {
            this.kill()
        }

        if (this.grounded && this.jumpReady) {
            this.body.applyLinearImpulse(new Vector(0, -300 * delta))
        }
    }

    onCollisionStart(event, other) {
            if(other.owner instanceof Platform) {
                this.grounded = true
                setTimeout(() => {
                this.jumpReady = true
            }, Math.random() * 2000 + 500)
            }

            if (other.owner instanceof Yana) {
                other.owner.health -= 1
                this.kill()
            }
        }
    
        onCollisionEnd(event, other) {
            if(other.owner instanceof Platform) {
                this.grounded = false
                this.jumpReady = false
            }
        }
}