import * as three from "three";

const scene = new three.Scene();

const cubeGeometry = new three.BoxGeometry(1, 1, 1);
const cubeMaterial = new three.MeshBasicMaterial({ color: "red" });

const cubeMesh = new three.Mesh(cubeGeometry, cubeMaterial);

const camera = new three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  30
);

camera.position.z = 5;
camera.position.x = 5;
camera.rotateY(1/Math.PI);
camera.rotateX(1/Math.PI);

scene.add(cubeMesh);
scene.add(camera);

const canvas = document.querySelector('canvas.threejs');

const renderer = new three.WebGLRenderer({
  canvas: canvas
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)