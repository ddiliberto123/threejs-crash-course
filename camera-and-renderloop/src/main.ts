import * as three from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new three.Scene();

const cubeGeometry = new three.BoxGeometry(1, 1, 1);
const cubeMaterial = new three.MeshBasicMaterial({ color: "red" });

const cubeMesh = new three.Mesh(cubeGeometry, cubeMaterial);

const camera = new three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  30,
);

// const aspectRatio = window.innerWidth / window.innerHeight;
// const camera = new three.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   200
// )

scene.add(cubeMesh);
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
controls.autoRotate = true;

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix()
})

const renderloop = () => {
  renderer.render(scene, camera);

  controls.update();
  window.requestAnimationFrame(renderloop);
};

renderloop();
