import * as three from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { deltaTime } from "three/tsl";

const scene = new three.Scene();

// const cubeGeometry = new three.BoxGeometry(1, 1, 1);
const donutGeometry = new three.TorusGeometry();
const donutMaterial = new three.MeshBasicMaterial({ color: "gray" });

const donutMesh = new three.Mesh(donutGeometry, donutMaterial);

// const axesHelper = new three.AxesHelper(2);
// scene.add(axesHelper);


const camera = new three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  200,
);


scene.add(donutMesh);
scene.add(camera);

const canvas = document.querySelector("canvas.threejs") as HTMLCanvasElement;

camera.position.z = 5;

const renderer = new three.WebGLRenderer({
  canvas: canvas,
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix()
})

const clock = new three.Clock()


const renderloop = () => {
  renderer.render(scene, camera);
  const delta = clock.getDelta()
  donutMesh.rotation.x += three.MathUtils.degToRad(45) * delta
  donutMesh.rotation.y += three.MathUtils.degToRad(45) * delta
  donutMesh.rotation.z += three.MathUtils.degToRad(45) * delta

  controls.update();
  window.requestAnimationFrame(renderloop);
};

renderloop();
