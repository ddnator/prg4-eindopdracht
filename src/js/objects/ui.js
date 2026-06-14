import { Actor, Vector, Keys, Engine, Label, Color, FontUnit, Font } from "excalibur"
import { Resources } from "../resources.js"
import { Yana } from "./yana.js"
export class UI extends Actor {
    constructor() {
        super()
    }
    
    onInitialize(engine) {
        console.log(this.scene)
        this.label = new Label({
            text: `Score: ${this.scene.score}\n
            Health: ${this.scene.yana.health}`,
            pos: new Vector(100, 100),
            font: new Font({
                family: 'Helvetica',
                size: 40,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
        this.addChild(this.label)
        
    }

    onPostUpdate(engine) {
        this.label.text = `Score: ${this.scene.score}\nHealth: ${this.scene.yana.health}`
    }
}