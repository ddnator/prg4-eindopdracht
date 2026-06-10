import '../css/style.css'
import { Actor, Engine, Vector, SolverStrategy, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Yana } from './objects/yana.js'
import { Background } from './objects/background.js'
import { IceGolem } from './objects/iceGolem.js'
import { Platform } from './objects/platform.js'

export class Game extends Engine {

    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            physics: {
              solver: SolverStrategy.Arcade,
              gravity: new Vector(0, 800),
          }
         })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")
        const background = new Background()
        this.add(background)
        const platform = new Platform()
        this.add(platform)
        const yana = new Yana()
        yana.events.on("exitviewport", (e) => this.fishLeft(e))
        this.add(yana)
        const iceGolem = new IceGolem()
        this.add(iceGolem)
        const iceGolem2 = new IceGolem()
        this.add(iceGolem2)
        
        
    }

    fishLeft(e) {
        e.target.pos = new Vector(1350, 300)
    }
}

new Game()
