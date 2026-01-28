import * as three from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { deltaTime } from "three/tsl";

const scene = new three.Scene();

const cubeGeometry = new three.BoxGeometry(1, 1, 1);
const cubeMaterial = new three.MeshBasicMaterial({ color: "red", wireframe: true});

const cubeMesh = new three.Mesh(cubeGeometry, cubeMaterial);
const cubeMesh2 = new three.Mesh(cubeGeometry, cubeMaterial);
cubeMesh2.position.x = 2;
const cubeMesh3 = new three.Mesh(cubeGeometry, cubeMaterial);
cubeMesh3.position.x = -2;

cubeMesh.scale.setScalar(.5)
cubeMesh.position.y = 1

const group = new three.Group();
group.add(cubeMesh)

// cubeMesh.rotation.reorder('YZX')
// cubeMesh.rotation.z = three.MathUtils.degToRad(45)
// cubeMesh.rotation.y = three.MathUtils.degToRad(45)
// cubeMesh.rotation.x = three.MathUtils.degToRad(45)

group.add(cubeMesh2)
group.add(cubeMesh3)

group.scale.y = 2
group.scale.setScalar(2);

const axesHelper = new three.AxesHelper(4)
cubeMesh.add(axesHelper)

const camera = new three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  200,
);

scene.add(group);
scene.add(camera);

const canvas = document.querySelector("canvas.threejs") as HTMLCanvasElement;

camera.position.z = 5;

console.log(cubeMesh.position.distanceTo(camera.position))

const renderer = new three.WebGLRenderer({
  canvas: canvas,
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix()
})

//initialize clock
const clock = new three.Clock();
let previousTime = 0

const renderloop = () => {
  const current = clock.getElapsedTime();
  const delta = current - previousTime;
  previousTime = current
  
  cubeMesh.rotation.y += three.MathUtils.degToRad(1) * delta * 25;
  // cubeMesh.scale.x += Math.sin(current)
  // cubeMesh.position.z += Math.sin(current)
  
  renderer.render(scene, camera);

  controls.update();

  window.requestAnimationFrame(renderloop);
};

renderloop();
