import * as three from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import highway from '/textures/images.jpeg'

//creating scene and rendering
const scene = new three.Scene();
const rendering = new three.WebGLRenderer({
  canvas:document.querySelector('#bg')
})
const camera =  new three.PerspectiveCamera(75 , innerWidth/innerHeight, 1,100000000)
const control = new OrbitControls(camera , rendering.domElement)
camera.position.set(10,10,10)
control.update()
rendering.setClearColor(0xE6E6FA)

rendering.setSize(innerWidth ,innerHeight);
rendering.setPixelRatio(devicePixelRatio);
//grid helper
const grid = new three.GridHelper(600)
scene.add(grid)
//texture loader
const texture_loader = new three.TextureLoader()
//creating platforms
const plane_geo1 = new three.PlaneGeometry(600,300);
const plane_mesh1 = new three.MeshBasicMaterial({
  color: 0x000000,
  side: three.DoubleSide
})
const plane1= new three.Mesh(plane_geo1 , plane_mesh1);
scene.add(plane1)
plane1.position.set(0,0,150)
plane1.rotateX(Math.PI/2)
const plane_geo2 =  new three.PlaneGeometry(600,300);
const plane_mesh2 = new three.MeshBasicMaterial({
  
  side: three.DoubleSide,
  map : texture_loader.load(highway)
})
const plane2= new three.Mesh(plane_geo2 , plane_mesh2);
scene.add(plane2)
plane2.position.set(0,0,-180)
plane2.rotateX(Math.PI/2)

//creating tunnels
const tunnel_opener_geo = new three.TorusGeometry(55,10,64,32)
const tunnel_opener_mesh = new three.MeshBasicMaterial({
  wireframe: false,
  color:0x580C0C
})
const tunnel_opener= new three.Mesh(tunnel_opener_geo,tunnel_opener_mesh);
scene.add(tunnel_opener)
tunnel_opener.position.set(-300,0,-284)
tunnel_opener.rotateY(Math.PI/2)

















function animate(){
  rendering.setAnimationLoop(animate);
  rendering.render(scene,camera)
}
animate()