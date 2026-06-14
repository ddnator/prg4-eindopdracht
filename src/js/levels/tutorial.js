import { Actor, Engine, Vector, SolverStrategy, Scene, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { Yana } from '../objects/yana.js'
import { Background } from '../objects/background.js'
import { IceGolem } from '../objects/iceGolem.js'
import { Floor } from '../objects/floor.js'
import { Wolf } from '../objects/wolf.js'
import { Crow } from '../objects/crow.js'
import { UI } from '../objects/ui.js'
import { Spike } from '../objects/spike.js'
import { Apple } from '../objects/apple.js'
import { TutorialUI } from '../objects/tutorialUI.js'
import { Level1 } from '../levels/level1.js'

export class Tutorial extends Scene {
    onInitialize(engine) {
        const background1 = new Background(0)
        const background2 = new Background(1280)
        background1.events.on("exitviewport", (e) => this.backgroundLeft(e))
        background2.events.on("exitviewport", (e) => this.backgroundLeft(e))
        this.add(background1)
        this.add(background2)



        const floor = new Floor()
        this.add(floor)

        const wolf = new Wolf()
        const crow = new Crow()
        const iceGolem = new IceGolem()
        const spike = new Spike()
        const tutorialUI = new TutorialUI()

        this.add(wolf)
        this.add(tutorialUI)
        console.log(tutorialUI)
        this.engine.clock.schedule(() => {
            wolf.kill()
            this.add(crow)
        }, 4000)

        this.engine.clock.schedule(() => {
            crow.kill()
            this.add(iceGolem)
        }, 8000)

        this.engine.clock.schedule(() => {
            this.add(spike)
            const apple = new Apple()
            spike.addChild(apple)

            this.add(spike)
            iceGolem.kill()
        }, 12000)

        this.engine.clock.schedule(() => {
            spike.kill()
            this.engine.goToScene('level1')
        }, 16000)

        this.engine.score = 0;
        this.engine.difficulty = 1;
        this.engine.enemyTimer = 0;
        this.engine.spikeTimer = 0;
    

    }

    backgroundLeft(e) {
        e.target.pos.x += 2560
    }



    leftScreen(e) {
        e.target.kill()
    }
}
