import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { Yana } from './objects/yana'

// voeg hier jouw eigen resources toe
const Resources = {
    Yana: new ImageSource('images/Yana.png'),
    Arrow: new ImageSource('images/Arrow.png'),
    Background: new ImageSource('images/Background.png'),
    IceGolem: new ImageSource('images/idle golem.png'),
    YanaSlash: new ImageSource('images/YanaSlash.png'),
    Slash: new ImageSource('images/Slash.png'),
    Wolf: new ImageSource('images/wolf.png'),
    Crow: new ImageSource('images/crow.png'),
    Spike: new ImageSource('images/spike.png'),
    Apple: new ImageSource('images/apple.png'),
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }