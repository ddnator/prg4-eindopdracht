import { Actor, Shape, CollisionType, Keys, Vector } from "excalibur"
import { Resources } from "../resources.js"
import { Arrow } from "./arrow.js"
import { Slash } from "./slash.js"
import { Floor } from "./floor.js"
import { Game } from "../game.js"

export class Yana extends Actor {
    health = 3;
    grounded = false

    constructor() {
        super({ width: Resources.Yana.width, height: Resources.Yana.height })
    }

    onInitialize() {
        this.graphics.use(Resources.Yana.toSprite())
        this.pos = new Vector(200, 540)
        this.scale = new Vector(0.2, 0.2)
        this.body.collisionType = CollisionType.Active
    }

    arrowReady = true
    slashReady = true
    onPostUpdate(engine, delta) {
        let xspeed = 0
        if (engine.input.keyboard.wasPressed(Keys.W)) {
            if (this.grounded) {
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

        if (this.health <= 0) {
            this.kill()
            this.scene.engine.restart()
        }
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
        this.graphics.use(Resources.YanaSlash.toSprite())
        this.collider.set(
            Shape.Box(Resources.YanaSlash.toSprite().width, Resources.YanaSlash.toSprite().height)
        );
        this.scale = new Vector(0.3, 0.3)
        this.pos.y += 27

        const slash = new Slash(this.pos.x, this.pos.y)
        this.scene.add(slash)
        this.slashReady = false

        this.scene.engine.clock.schedule(() => {
            this.scale = new Vector(0.2, 0.2)
            this.pos.y -= 30
            this.graphics.use(Resources.Yana.toSprite())
            this.collider.set(
            Shape.Box(Resources.Yana.toSprite().width, Resources.Yana.toSprite().height)
        );
            slash.kill()
        }, 200)

        this.scene.engine.clock.schedule(() => {
            this.slashReady = true
        }, 500)
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof Floor) {
            this.grounded = true
        }
    }

    onCollisionEnd(event, other) {
        if (other.owner instanceof Floor) {
            this.grounded = false
        }
    }
}