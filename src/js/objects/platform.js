import { CollisionType, Actor, Vector } from 'excalibur'
import { Resources } from '../resources.js'

export class Platform extends Actor {

    constructor(x, y) {
        super({ width: 1300, height: 20}) 
        this.pos = new Vector(640, 670)
        this.body.collisionType = CollisionType.Fixed
    }
}