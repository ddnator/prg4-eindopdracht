import { CollisionType, Actor, Vector } from 'excalibur'
import { Resources } from '../resources.js'
import { Yana } from './yana.js'

export class Apple extends Actor {
    constructor() {
        super({ width: Resources.Apple.width, height: Resources.Apple.height })
        this.pos = new Vector(0, -600)
        this.body.collisionType = CollisionType.Fixed
        this.graphics.use(Resources.Apple.toSprite())
        this.scale = new Vector(0.5, 0.5)
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event))
    }

    hitSomething(event) {
        if (event.other.owner instanceof Yana) {
            event.other.owner.health += 1
            this.kill();
        }
    }
}