import * as three from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { Pane } from "tweakpane";

const scene = new three.Scene();
const pane = new Pane();

const geometry = new three.BoxGeometry(1, 1, 1);
const torusKnot = new three.TorusKnotGeometry(0.5, 0.2, 100, 16);
// const material = new three.MeshBasicMaterial();
const material = new three.MeshPhongMaterial();

// material.color = new three.Color("white");

pane.addBinding(material, "shininess", {
  min: 0,
  max: 100,
  step: 1,
});

// material.transparent = true;
// material.opacity = .5;
// material.side = three.DoubleSide;
// material.fog = true;

// const fog = new three.Fog('white', 1, 10);
// scene.fog = fog;
// scene.background = new three.Color('white')

const mesh = new three.Mesh(geometry, material);
const mesh2 = new three.Mesh(torusKnot, material);
mesh2.position.z = 2;

const camera = new three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  30,
);

scene.add(mesh);
scene.add(mesh2);
scene.add(camera);
const light = new three.AmbientLight('white', 0.1);
scene.add(light)

const pointLight = new three.PointLight("white", 40);
pointLight.position.set(5, 5, 2);
scene.add(pointLight);

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
