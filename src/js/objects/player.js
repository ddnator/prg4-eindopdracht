import { Actor, Keys, Vector } from "excalibur"
import { Resources } from "../resources.js"
import { Arrow } from "./arrow.js"
import { Platform } from "./platform.js"

export class Player extends Actor {
    arrowReady = true
    onPostUpdate(engine, delta) {
        let xspeed = 0
                if (engine.input.keyboard.wasPressed(Keys.W)) {
                    if (this.grounded) {
                        console.log("jump")
                        this.body.applyLinearImpulse(new Vector(0, -300 * delta))
                    }
                }
                if (engine.input.keyboard.isHeld(Keys.A)) {
                    xspeed = -300
                    this.graphics.flipHorizontal = true
                }
                if (engine.input.keyboard.isHeld(Keys.D)) {
                    xspeed = 300
                    this.graphics.flipHorizontal = false
                }
                if (engine.input.keyboard.wasPressed(Keys.Space) && this.arrowReady) {
                    this.shoot()
                }
                this.vel = new Vector(xspeed, this.vel.y)
    }

    shoot() {
        const arrow = new Arrow(this.pos.x, this.pos.y)
        this.scene.add(arrow)
        this.arrowReady = false
        setTimeout(() => {
                this.arrowReady = true
            }, 1000)
    }

    onCollisionStart(event, other) {
        if(other.owner instanceof Platform) {
            this.grounded = true
            console.log("grounded")
        }
    }

    onCollisionEnd(event, other) {
        if(other.owner instanceof Platform) {
            this.grounded = false
            console.log("left platform")
        }
    }
}