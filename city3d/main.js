import * as three from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

//creating scene and rendering
const scene = new three.Scene();
const renderer = new three.WebGLRenderer({
  canvas : document.querySelector('.bg'),
})
renderer.setSize(innerWidth ,innerHeight);
renderer.setPixelRatio(devicePixelRatio);
const camera =  new three.PerspectiveCamera(75 , window.innerWidth/window.innerHeight, 0.1,1000)
const control = new OrbitControls(camera , renderer.domElement)
camera.position(10,10,10)
control.update()
renderer.setClearColor(0x00000)
function animate(){
  renderer.setAnimationLoop(animate);
  renderer.render(scene,camera)
}
animate()