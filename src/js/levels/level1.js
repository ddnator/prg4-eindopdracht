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
import { Tutorial } from '../levels/tutorial.js'

export class Level1 extends Scene {
    score = 0;
    difficulty = 1;
    enemyTimer = 0;
    spikeTimer = 0;
    yana

    onInitialize(engine) {
        const background1 = new Background(0)
        const background2 = new Background(1280)
        background1.events.on("exitviewport", (e) => this.backgroundLeft(e))
        background2.events.on("exitviewport", (e) => this.backgroundLeft(e))
        this.add(background1)
        this.add(background2)
        const ui = new UI()
        this.add(ui)


        const floor = new Floor()
        this.add(floor)
        this.yana = new Yana()
        this.yana.events.on("exitviewport", (e) => this.playerLeftScreen(e))
        this.add(this.yana)
    }

    backgroundLeft(e) {
        e.target.pos.x += 2560
    }

    onPostUpdate() {
        this.enemyTimer += this.difficulty
        this.spikeTimer += 10
        this.difficulty *= 1.0002
        if (this.enemyTimer >= 500) {
            this.spawnEnemy()
            this.enemyTimer = 0
        }

        if (this.spikeTimer >= 10000 * this.difficulty) {
            this.spawnSpike()
            this.spikeTimer = 0
        }

        this.score += Math.floor(1 + this.difficulty)
    }

    spawnEnemy() {
        const enemyNumber = Math.floor(Math.random() * 3)
        let enemy
        if (enemyNumber === 0) {
            enemy = new Wolf()
        } else if (enemyNumber === 1) {
            enemy = new IceGolem()
        } else {
            enemy = new Crow()
        }

        enemy.events.on("exitviewport", (e) => enemy.kill())
        this.add(enemy)

    }

    spawnSpike() {
        const spike = new Spike()
        spike.events.on("exitviewport", (e) => spike.kill())

        const apple = new Apple()
        spike.addChild(apple)

        this.add(spike)
    }

    leftScreen(e) {
        e.target.kill()
    }

    playerLeftScreen() {
        this.yana.health = 0
    }
}
