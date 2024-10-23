import * as three from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { objectDirection } from 'three/webgpu';
import road from '/textures/road.jpg'
import asphalt from '/textures/asphalt.jpg'
import parkinglot from '/textures/parkinglot.jpg'






//creating scene and rendering
const scene = new three.Scene();
const rendering = new three.WebGLRenderer({
  canvas:document.querySelector('#bg')
})
const camera =  new three.PerspectiveCamera(75 , innerWidth/innerHeight, 1,100000000)
const control = new OrbitControls(camera , rendering.domElement)
camera.position.set(0,10,150)
control.update()
rendering.setClearColor(0xE6E6FA)

rendering.setSize(innerWidth ,innerHeight);
rendering.setPixelRatio(devicePixelRatio);
//creating and setting up light

const ambient = new three.AmbientLight(0xffffffff,1)
scene.add(ambient)
ambient.position.set(0,20,0)
//texture loader and 3d model loader
const texture_loader = new three.TextureLoader()
const model_loader = new GLTFLoader()
//loading 3d models
//apartment model
model_loader.load("models/apartment/scene.gltf",(apartment)=>{

  scene.add(apartment.scene)
  apartment.scene.position.set(126,-12,100)
  apartment.scene.rotateY(Math.PI/2)
  apartment.scene.scale.set(5,6,7)

})
//barber model
model_loader.load("models/barber/scene.gltf", (barber)=>{
  scene.add(barber.scene)
  barber.scene.position.set(-70, 3 , 95)
  barber.scene.scale.set(8,8,8)
  barber.scene.rotateY(Math.PI)
})
//playground
model_loader.load("models/playground/scene.gltf", (play)=>{
  scene.add(play.scene)
  play.scene.position.set(-505,3.5,280)
  play.scene.scale.set(0.01,0.01,0.01)
})
//shop
model_loader.load("models/shop/scene.gltf", (shop)=>{
  scene.add(shop.scene)
  shop.scene.position.set(-170,2.5,-130)
  shop.scene.scale.set(8,8,8)
  shop.scene.rotateY(Math.PI/2)
})

//warehouse
model_loader.load("models/warehouse/scene.gltf", (warehouse)=>{
  scene.add(warehouse.scene)
  warehouse.scene.position.set(105,3,-120)
  warehouse.scene.scale.set(1.57,1,1.79)
})
//adding cars
//fiat
model_loader.load("models/fiat/scene.gltf" , (fiat) =>{
  scene.add(fiat.scene)
  fiat.scene.position.set(126,5,180)
  fiat.scene.scale.set(0.1,0.1,0.1)
  fiat.scene.rotateY(Math.PI/2)

})


//creating platforms
const plane_geo1 = new three.PlaneGeometry(600,200);
const plane_mesh1 = new three.MeshBasicMaterial({
  color: 0x0808080,
  side: three.DoubleSide
})
const plane1= new three.Mesh(plane_geo1 , plane_mesh1);
scene.add(plane1)
plane1.position.set(0,3,150)
plane1.rotateX(Math.PI/2)

const plane_geo2 = new three.PlaneGeometry(600,200);
const plane_mesh2= new three.MeshBasicMaterial({
  color: 0x0808080,
  side: three.DoubleSide
})
const plane2= new three.Mesh(plane_geo2 , plane_mesh2);
scene.add(plane2)
plane2.position.set(0,3,-148)
plane2.rotateX(Math.PI/2)





//setting up side road
const side_road_geo = new three.PlaneGeometry(200,80)
const side_road_mesh = new three.MeshBasicMaterial({
  wireframe: false,
  side: three.DoubleSide,
  map: texture_loader.load(asphalt)
})
const side_road = new three.Mesh(side_road_geo,side_road_mesh)
scene.add(side_road)
side_road.position.set(5,3.1,150)
side_road.rotateX(Math.PI/2)
side_road.rotateZ(Math.PI/2)



//main road
const main_road_geo = new three.PlaneGeometry(600,100)
const main_road_mesh = new three.MeshBasicMaterial({
  wireframe: false,
  map:texture_loader.load(road),
  side:three.DoubleSide
})
const main_road = new three.Mesh(main_road_geo,main_road_mesh)
scene.add(main_road)
main_road.rotateX(Math.PI/2)

main_road.position.set(0,3,0.5)




//shop road
const shop_road_geo = new three.PlaneGeometry(200,80)
const shop_road_mesh = new three.MeshBasicMaterial({
  wireframe: false,
  map:texture_loader.load(asphalt),
  side: three.DoubleSide
})
const shop_road = new three.Mesh(shop_road_geo,shop_road_mesh)
scene.add(shop_road)
shop_road.position.set(-260,3.4,-150)
shop_road.rotateX(Math.PI/2)
shop_road.rotateZ(Math.PI/2)



function animate(){
  rendering.setAnimationLoop(animate);
  rendering.render(scene,camera)
}
animate()