import * as THREE from 'three';
import Renderer from './renderer';
import Camera from './camera';
import Controls from './controls';
import Lights from './lights';
import World from './world';

const $ = require('jquery');

class Scene {
  constructor(options) {
    this.options = options;
    this.objects = [];

    this.options.dimensions = {
        width: $(this.options.renderer.canvas).width(),
        height: $(this.options.renderer.canvas).height(),
      };

    this.renderer = new Renderer(options);
    this.camera = new Camera(options);
    this.controls = new Controls(options, this.camera);
    this.lights = new Lights(options, this.camera);
    this.world = new World();

    return this;
  }

  init() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(
      new THREE.Color(this.options.colors.fog),
      this.options.scene.fog.factor
    );

    // Lights
    this.lights.forEach((function (light) {
      this.scene.add(light);
    }).bind(this));

    // Event Listeners
    let updateSize = function () { this.updateSize(); }.bind(this);
    window.addEventListener('resize', updateSize, false);
  }

  updateSize() {
    this.options.dimensions = {
        width: $(this.options.renderer.canvas).width(),
        height: $(this.options.renderer.canvas).height(),
      };

    this.camera.aspect =
      this.options.dimensions.width / this.options.dimensions.height;

    this.camera.updateProjectionMatrix();

    this.renderer.setSize(
      this.options.dimensions.width,
      this.options.dimensions.height,
      false
    );
  }

  update() {
    this.world.step();

    this.objects.forEach(function (object) {
      if (object.hasOwnProperty('body') === true) {
        object.mesh.position.copy(object.body.getPosition());
        object.mesh.quaternion.copy(object.body.getQuaternion());
      }
    }.bind(this));
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  animate() {
    this.update();
    this.render();

    let animate = function () { this.animate(); }.bind(this);
    requestAnimationFrame(animate);
  }

  add(mesh, physics = {}) {
    this.scene.add(mesh);

    // If there's physics, let's add the object to OIMO
    if (typeof physics === 'object' && Object.keys(physics).length > 0) {
      console.log(mesh, physics);

      if (physics.hasOwnProperty('size') === false) {
        physics.size = [mesh.scale.x, mesh.scale.y, mesh.scale.z];
      }

      if (physics.hasOwnProperty('position') === false) {
        physics.pos = [mesh.position.x, mesh.position.y, mesh.position.z];
      }

      if (physics.hasOwnProperty('rotation') === false) {
        physics.rot = [mesh.rotation.x, mesh.rotation.y, mesh.rotation.z];
      }

      let body = this.world.add(physics);
      this.objects.push({ mesh: mesh, body: body });
    } else {
      // If not, we only push the mesh
      this.objects.push({ mesh: mesh });
    }
  }
}

export default Scene;
