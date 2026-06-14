import { Actor, Vector, Keys, Engine, Label, Color, FontUnit, Font } from "excalibur"
import { Resources } from "../resources.js"
import { Yana } from "./yana.js"

export class TutorialUI extends Actor {
    constructor() {
        super()
    }
    
    onInitialize(engine) {
        this.label = new Label({
            text: `These are your enemies! Kill or dodge them to avoid losing health!\n\nUse the wasd keys to move and jump\n\nPress SPACE to shoot an arrow or press Enter to slash\n\nCollect apples to gain 1 health!\n\n Spikes kill you\n\nGood luck!`,
            pos: new Vector(40, 60),
            font: new Font({
                family: 'Helvetica',
                size: 40,
                unit: FontUnit.Px,
                color: Color.Red
            })
        })
        this.addChild(this.label)
        
    }
}