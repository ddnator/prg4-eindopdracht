import { Actor, Keys, Vector } from "excalibur"
import { Resources } from "../resources.js"
import { Arrow } from "./arrow.js"
import { Slash } from "./slash.js"
import { Platform } from "./platform.js"


export class Player extends Actor {
    arrowReady = true
    slashReady = true
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
                    engine.clock.schedule(() => {
                        this.arrowReady = true
                    }, 1000)
                }

                if (engine.input.keyboard.wasPressed(Keys.Enter) && this.slashReady) {
                    this.slash()
                }
                this.vel = new Vector(xspeed, this.vel.y)
    }

   
    shoot() {
        const arrow = new Arrow(this.pos.x, this.pos.y)
        this.scene.add(arrow)
        this.arrowReady = false
        this.scene.engine.clock.schedule(() => {
                        this.arrowReady = true
        }, 1000)
    }

    slash() {
        const slash = new Slash(this.pos.x, this.pos.y)
        this.scene.add(slash)
        this.slashReady = false
        
        this.scene.engine.clock.schedule(() => {
            slash.kill()
        }, 200)

        this.scene.engine.clock.schedule(() => {
            this.slashReady = true
        }, 500)
    }

    onCollisionStart(event, other) {
        if(other.owner instanceof Platform) {
            this.grounded = true
        }
    }

    onCollisionEnd(event, other) {
        if(other.owner instanceof Platform) {
            this.grounded = false
        }
    }
}