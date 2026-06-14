import { CollisionType, Actor, Vector } from 'excalibur'
import { Resources } from '../resources.js'
import { Yana } from './yana.js'
import { IceGolem } from './iceGolem.js'
import { Wolf } from './wolf.js'
import { Crow } from './crow.js'

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
        } else if (event.other.owner instanceof Wolf || event.other.owner instanceof IceGolem || event.other.owner instanceof Crow) {
            event.other.owner.kill();
        }
    }
}