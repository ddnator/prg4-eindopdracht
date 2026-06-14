import '../css/style.css'
import { Actor, Engine, Vector, FadeInOut, Color, SolverStrategy, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Yana } from './objects/yana.js'
import { Background } from './objects/background.js'
import { IceGolem } from './objects/iceGolem.js'
import { Floor } from './objects/floor.js'
import { Wolf } from './objects/wolf.js'
import { Crow } from './objects/crow.js'
import { UI } from './objects/ui.js'
import { Spike } from './objects/spike.js'
import { Apple } from './objects/apple.js'
import { Level1 } from './levels/level1.js'
import { Tutorial } from './levels/tutorial.js'
import { Transition } from './levels/transition.js'

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
        let transitions = {
            in: new FadeInOut({ duration: 400, direction: 'in', color: Color.Black }),
            out: new FadeInOut({ duration: 400, direction: 'out', color: Color.Black })
        }

        this.add('tutorial', new Tutorial())
        this.add('level1', new Level1())
        this.add('transition', new Transition())
        this.goToScene('level1')
    }

    restart() {
        this.goToScene('transition').then(() => {
            this.removeScene('tutorial')
            this.removeScene('level1')
            this.add('tutorial', new Tutorial())
            this.add('level1', new Level1())
            this.goToScene('tutorial')
        })
    }
}
new Game()
