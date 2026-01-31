import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { Pane } from "tweakpane";

const scene = new THREE.Scene();
const pane = new Pane();
const textureLoader = new THREE.TextureLoader()

const geometry = new THREE.BoxGeometry(1, 1, 1);
const uv2Geometry = new THREE.BufferAttribute(geometry.attributes.uv.array, 2)
geometry.setAttribute('uv2', uv2Geometry)

const torusKnot = new THREE.TorusKnotGeometry(0.5, 0.2, 100, 16);
const uv2TorusKnot = new THREE.BufferAttribute(torusKnot.attributes.uv.array, 2)
geometry.setAttribute('uv2', uv2TorusKnot)

const planeGeometry = new THREE.PlaneGeometry(1, 1);
const uv2PlaneGeometry = new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2)
geometry.setAttribute('uv2', uv2PlaneGeometry)

const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const uv2SphereGeometry = new THREE.BufferAttribute(sphereGeometry.attributes.uv.array, 2)
geometry.setAttribute('uv2', uv2SphereGeometry)

const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
const uv2CylinderGeometry = new THREE.BufferAttribute(cylinderGeometry.attributes.uv.array, 2)
geometry.setAttribute('uv2', uv2CylinderGeometry)

// const material = new three.MeshBasicMaterial();
// const material = new three.MeshPhongMaterial();
// const material = new three.MeshStandardMaterial();

const grassAlbedo = textureLoader.load('./static/textures/grassy-meadow1-bl/grassy-meadow1_albedo.png')
// grassAlbedo.repeat.set(2,2);
// grassAlbedo.wrapS = THREE.MirroredRepeatWrapping;
// grassAlbedo.wrapT = THREE.MirroredRepeatWrapping;
const grassAo = textureLoader.load('./static/textures/grassy-meadow1-bl/grassy-meadow1_ao.png')
const grassHeight = textureLoader.load('./static/textures/grassy-meadow1-bl/grassy-meadow1_height.png')
const grassMetallic = textureLoader.load('./static/textures/grassy-meadow1-bl/grassy-meadow1_metallic.png')
const grassNormal = textureLoader.load('./static/textures/grassy-meadow1-bl/grassy-meadow1_normal-ogl.png')
const grassRoughness = textureLoader.load('./static/textures/grassy-meadow1-bl/grassy-meadow1_roughness.png')


// grassTexture.offset.x = 0.5
// pane.addBinding(grassAlbedo, "offset", {
//   x: {
//     min: -1,
//     max: 1,
//     step: 0.01,
//   },
//   y: {
//     min: -1,
//     max: 1,
//     step: 0.01,
//   },
// });

const material = new THREE.MeshPhysicalMaterial();
const material2=  new THREE.Mesh();
material.map = grassAlbedo;
material.roughnessMap = grassRoughness;
material.metalnessMap = grassMetallic;
material.normalMap = grassNormal;
material.aoMap = grassAo;

pane.addBinding(material, 'aoMapIntensity', {
  min: 0,
  max: 1,
  step: 0.01
})
/**
 * Changes the actual geometry of the mesh resulting in more triangles
 */
// material.displacementMap = grassHeight;
// material.displacementScale = .1;

material.aoMap = grassAo;

const group = new THREE.Group();


material.color = new THREE.Color("green");

// pane.addBinding(material, "metalness", {
//   min: 0,
//   max: 1,
//   step: 0.01,
// });

// pane.addBinding(material, "roughness", {
//   min: 0,
//   max: 1,
//   step: 0.01,
// });

// pane.addBinding(material, "reflectivity", {
//   min: 0,
//   max: 1,
//   step: 0.01,
// });

// pane.addBinding(material, "clearcoat", {
//   min: 0,
//   max: 1,
//   step: 0.01,
// });

// material.transparent = true;
// material.opacity = .5;
// material.side = three.DoubleSide;
// material.fog = true;

// const fog = new three.Fog('white', 1, 10);
// scene.fog = fog;
// scene.background = new three.Color('white')

const cube = new THREE.Mesh(geometry, material);
cube.position.x = 2;

const knot = new THREE.Mesh(torusKnot, material);

const plane = new THREE.Mesh(planeGeometry, material);
plane.position.x = -2;
// plane.rotation.x = Math.PI * .5
// plane.material.side = THREE.DoubleSide;
// plane.scale.set(100, 100, 1)

const sphere = new THREE.Mesh();
sphere.geometry = sphereGeometry;
sphere.material = material;
sphere.position.z = -2;

const cylinder = new THREE.Mesh();
cylinder.geometry = cylinderGeometry;
cylinder.material = material;
cylinder.position.z = 2;

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000,
);

group.add(sphere, cylinder, cube, knot, plane);
// scene.add(plane)
scene.add(group);
scene.add(camera);
const light = new THREE.AmbientLight("white", .5);
scene.add(light);

const pointLight = new THREE.PointLight("white", 40);
pointLight.position.set(5, 5, 2);
scene.add(pointLight);

const canvas = document.querySelector("canvas.threejs") as HTMLCanvasElement;

camera.position.z = 5;
camera.position.y = 5

const renderer = new THREE.WebGLRenderer({
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

console.log(scene.children);

const renderloop = () => {
  group.children.forEach((child) => {
    // child.rotation.y += 0.01;
  });
  renderer.render(scene, camera);

  controls.update();
  window.requestAnimationFrame(renderloop);
};

renderloop();
