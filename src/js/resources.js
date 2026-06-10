import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Yana: new ImageSource('images/Yana.png'),
    Arrow: new ImageSource('images/Arrow.png'),
    Background: new ImageSource('images/Background.png'),
    IceGolem: new ImageSource('images/idle golem.png'),
    Platform: new ImageSource('images/platform.png'),
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }