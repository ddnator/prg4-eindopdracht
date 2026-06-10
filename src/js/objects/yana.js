import { Actor, CollisionStartEvent, CollisionType, DegreeOfFreedom, Engine, Keys, Vector } from "excalibur"
import { Resources } from "../resources.js"
import { Player } from "./player.js"

export class Yana extends Player {
    health = 2;
    grounded = false

    constructor() {
        super({ width: Resources.Yana.width, height: Resources.Yana.height})
    }
    
    onInitialize(engine) {
        this.graphics.use(Resources.Yana.toSprite())
        this.pos = new Vector(200, 560)
        this.scale = new Vector(0.2, 0.2)
        this.body.collisionType = CollisionType.Active
    }

    onPreUpdate(engine, delta) {
        if (this.health <= 0) {
            this.kill()
        }
    }
}