import { CollisionType, Actor, Vector } from 'excalibur'
import { Resources } from '../resources.js'
import { IceGolem } from './iceGolem.js'
import { Wolf } from './wolf.js'
import { Crow } from './crow.js'
import { Yana } from './yana.js'

export class Spike extends Actor {
    constructor() {
        super({ width: Resources.Spike.width, height: Resources.Spike.height })
        this.pos = new Vector(1279, 600)
        this.body.collisionType = CollisionType.Fixed
        this.graphics.use(Resources.Spike.toSprite())
        this.scale = new Vector(0.2, 0.2)
        this.body.friction = 1
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event))
    }

    hitSomething(event) {
        if (event.other.owner instanceof IceGolem || event.other.owner instanceof Wolf || event.other.owner instanceof Crow) {
            event.other.owner.kill();
        } else if (event.other.owner instanceof Yana) {
            event.other.owner.health = 0
        }
    }
    onPostUpdate(engine) {
        this.vel = new Vector(-engine.difficulty * 100, 0) 
    }
}