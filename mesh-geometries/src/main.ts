import * as three from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new three.Scene();

// const geometry = new three.BoxGeometry(1, 1, 1, 2, 2, 2);
// const geometry = new three.SphereGeometry(1,16,16);
const geometry = new three.PlaneGeometry(1,1,2,2);
// const geometry = new three.BufferGeometry();

// const vertices = new Float32Array([
//   0, 0, 0,
//   0, 2, 0,
//   2, 0, 0,
// ]);

// geometry.setAttribute( 'position', new three.BufferAttribute( vertices, 3 ) );
const cubeMaterial = new three.MeshBasicMaterial({
  color: "red",
  wireframe: true,
});

// const cubeMesh = new three.Mesh(geometry, cubeMaterial);
const cubeMesh = new three.Mesh(geometry, cubeMaterial);
const axesHelper = new three.AxesHelper(2);
cubeMesh.add(axesHelper);

const camera = new three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  30,
);

scene.add(cubeMesh);
scene.add(camera);

const canvas = document.querySelector("canvas.threejs") as HTMLCanvasElement;

camera.position.z = 5;

const renderer = new three.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

const renderloop = () => {
  renderer.render(scene, camera);

  controls.update();
  window.requestAnimationFrame(renderloop);
};

renderloop();
