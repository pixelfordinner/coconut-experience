import * as THREE from 'three';
import Renderer from './renderer';

//import Postprod from './postprocess';
import Camera from './camera';
import cubeCamera from './cubecamera';
import Composer from './effectcomposer';
import Frustrum from './frustrum';
import CameraFrustrum from './camerafrustrum';
import Lights from './lights';
import Clock from './clock';
import World from './world';
import Gestures from './gestures';
import Controls from './controls';
import {
  MaterialManager
} from '../materials/manager';

const $ = require('jquery');

class Scene {
  constructor(options) {
    this.options = options;
    this.objects = [];
    this.cocos = [];
    this.Joints = [];
    this.lastJointPos = [];
    this.jointStrenth = [];

    this.options.dimensions = {
      width: $(this.options.renderer.canvas).width(),
      height: $(this.options.renderer.canvas).height(),
    };
    this.options.camera.distance = 10;
    this.options.camera.position = {
      x: 66,
      y: 24,
      z: 20,
    };
    this.options.camera.lookAt = {
      x: 0,
      y: 15,
      z: 0,
    };



    this.count = true;
    this.renderer = new Renderer(options);
    this.camera = new Camera(options);
    this.cubecamera = new cubeCamera();
    this.occlusionRenderTarget = new THREE.WebGLRenderTarget(options.dimensions.width * 0.5,
      options.dimensions.height * 0.5);
    this.composer = new Composer(this.renderer, this.occlusionRenderTarget);
    this.lightfrustrum = new CameraFrustrum(options);
    this.lights = new Lights(options, this.camera, this.lightfrustrum);
    this.world = new World();
    this.clock = new Clock();
    // debugg
    //this.frustrum = new Frustrum(this.lightfrustrum);
    return this;
  }

  init() {
    this.scene = new THREE.Scene();

    // this.scene.fog = new THREE.FogExp2(
    //   new THREE.Color(this.options.colors.fog),
    //   this.options.scene.fog.factor
    // );

    this.scene.fog = new THREE.Fog(new THREE.Color(this.options.colors.fog), 30, 200);

    // Lights
    this.lights.forEach((function(light) {
      this.scene.add(light);
    }).bind(this));

    // Frustrum
    //this.scene.add(this.frustrum);


    // Event Listeners
    let updateSize = function() {
      this.updateSize();
    }.bind(this);
    window.addEventListener('resize', updateSize, false);
    this.gestures = new Gestures(this);
    this.controls = new Controls(this.options, this.camera);
    this.occlusionRenderTarget = new THREE.WebGLRenderTarget(this.options.dimensions.width * 0.5,
      this.options.dimensions.height * 0.5);
    this.composer = new Composer(this.renderer, this.occlusionRenderTarget);
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

  initCocos() {

    if (this.world.numJoints != null) {
      for (let i = 0; i < this.Joints.length; i++) {
        let pos = new THREE.Vector3(this.Joints[i].body1.position.x,
          this.Joints[i].body1.position.y,
          this.Joints[i].body1.position.z);
        this.lastJointPos.push(pos);
        this.jointStrenth.push(1);
      }
      this.count = false;
    }
  }

  updateCocos() {

    if (this.world.numJoints != null) {
      for (let i = 0; i < this.Joints.length; i++) {
        let pos = new THREE.Vector3(this.Joints[i].body1.position.x,
          this.Joints[i].body1.position.y,
          this.Joints[i].body1.position.z);
        let pos2 = this.lastJointPos[i];
        let dist = pos.distanceTo(pos2);
        //console.log(this.jointStrenth[i]);
        if (dist > 0.15) {

          if (this.jointStrenth[i] > 0) {
            this.jointStrenth[i] -= 0.5;

          }
          //  console.log(dist);
          //  console.log(this.Joints[i]);

        } else if (dist <= 0.03 && this.jointStrenth[i] <= 0) {
          this.world.removeJoint(this.Joints[i]);
          //console.log('pppppp');
        }
        this.lastJointPos[i] = pos;
      }
    }
    for (let i = 0; i < this.cocos.length; i++) {
      //console.log(this.cocos[i].body.position);
      let cocoPos = this.cocos[i].body.position;
      //console.log(cocoPos);
      if (cocoPos.y < -50 && cocoPos.y > -51) {
        //console.log(this.cocos[i].mesh.name);
        let palmIndex = this.cocos[i].mesh.name.split('_')[1];
        console.log('palmtree : ' + palmIndex);

      }
    }
  }

  updatePositions() {

    this.world.step();
    this.objects.forEach(function (object) {

      if (object.hasOwnProperty('body') === true) {
        object.mesh.position.copy(object.body.getPosition());
        object.mesh.quaternion.copy(object.body.getQuaternion());
      } else {
        if (object.mesh.name === 'Wolf') {
          object.mesh.rotation.set(0, this.clock.getElapsedTime() * 0.1, 0);
        }
      }
    }.bind(this));
  }

  updateGestures() {
    this.gestures.update();
  }

  updateShaders() {

    if (MaterialManager.get('celshading_stripes_material') != null) {
      let material = MaterialManager.get('celshading_stripes_material');
      material.uniforms.iGlobalTime.value = this.clock.getElapsedTime();
    }

    if (MaterialManager.get('displacement') != null) {
      let material = MaterialManager.get('displacement');
      material.uniforms.iGlobalTime.value = this.clock.getElapsedTime();
    }

    // if (MaterialManager.get('displacement_box') != null) {
    //   let material = MaterialManager.get('displacement_box');
    //   material.uniforms.iGlobalTime.value = this.clock.getElapsedTime();
    // }

    // if (MaterialManager.get('cloud') != null) {
    //   let material = MaterialManager.get('cloud');
    //   material.uniforms.iGlobalTime.value = this.clock.getElapsedTime();
    // }
    //
    // if (MaterialManager.get('smooth_cloud') != null) {
    //   let material = MaterialManager.get('smooth_cloud');
    //   material.uniforms.iGlobalTime.value = this.clock.getElapsedTime();
    // }

  }

  updateMaterials() {

    this.objects.forEach(function(object) {
      if (object.hasOwnProperty('body') === true) {

        const updatables = [
          'TrunkSegment',
          'Crown',
          'Coco',
          'Tile',
          'Land',
          'Blob',
          'Base',
        ];

        const parts = object.mesh.name.split('_');
        const matches = parts.filter(part => updatables.indexOf(part) > -1 ? true : false);
        const name = parts.length > 0 && matches.length > 0 ?
          matches[0] :
          object.mesh.name;

        //console.log(parts);

        if (object.body.sleeping) {
          const sleepingMaterials = {
            Tile: 'toon_grey',
            Crown: 'toon_blue',
            Coco: 'absolute_white',
            TrunkSegment: 'celshading_stripes_material',
            Blob: 'displacement',
            Base: 'toon_grey',
          };

          object.mesh.material = sleepingMaterials.hasOwnProperty(name) ?
            MaterialManager.get(sleepingMaterials[name]) :
            MaterialManager.get('toon_grey');
        } else {
          const materials = {
            TrunkSegment: 'celshading_stripes_material',
            Crown: 'toon_blue',
            Coco: 'absolute_white',
            Tile: 'toon_cyan',
            Base: 'toon_cyan',
            Montain: 'displacement_box',
            Blob: 'displacement',
          };

          object.mesh.material = materials.hasOwnProperty(name) ?
            MaterialManager.get(materials[name]) :
            MaterialManager.get('basic_shadows');
        }
      }
    }.bind(this));
  }

  oclMaterials() {

    this.objects.forEach(function(object) {
      if (object.hasOwnProperty('body') === true) {

        const updatables = [
          'TrunkSegment',
          'Crown',
          'Coco',
          'Tile',
          'Montain',
        ];

        const parts = object.mesh.name.split('_');
        const matches = parts.filter(part => updatables.indexOf(part) > -1 ? true : false);
        const name = parts.length > 0 && matches.length > 0 ?
          matches[0] :
          object.mesh.name;

        if (object.body.sleeping) {
          const sleepingMaterials = {
            Tile: 'absolute_black',
          };

          object.mesh.material = sleepingMaterials.hasOwnProperty(name) ?
            MaterialManager.get(sleepingMaterials[name]) :
            MaterialManager.get('absolute_black');
        } else {
          const materials = {
            Tile: 'absolute_white',
          };

          object.mesh.material = materials.hasOwnProperty(name) ?
            MaterialManager.get(materials[name]) :
            MaterialManager.get('absolute_black');

        }
      }
    }.bind(this));
  }

  render() {

    this.renderer.render(this.scene, this.camera);
    this.cubecamera.updateCubeMap(this.renderer, this.scene);
    //this.renderer.render(this.scene, this.cubecamera);

  }

  animate() {

    this.updatePositions();
  //  this.updateWolf();
    this.updateGestures();
    this.updateMaterials();
    //this.oclMaterials();
    this.updateShaders();
    if (this.count === true) {
      this.initCocos();
    } else {
      this.updateCocos();
    }

    this.render();

    let animate = function() {
      this.animate();
    }.bind(this);
    requestAnimationFrame(animate);
  }

  add(mesh, physics = {}) {
    this.scene.add(mesh);

    let object = {};

    // If there's physics, let's add the object to OIMO
    if (typeof physics === 'object' && Object.keys(physics).length > 0) {

      if (physics.hasOwnProperty('size') === false) {
        physics.size = [mesh.scale.x, mesh.scale.y, mesh.scale.z];
      }

      if (physics.hasOwnProperty('position') === false) {
        physics.pos = [mesh.position.x, mesh.position.y, mesh.position.z];
      }

      if (physics.hasOwnProperty('rotation') === false) {
        physics.rot = [mesh.rotation.x, mesh.rotation.y, mesh.rotation.z];
      }

      physics.name = mesh.name;

      let body = this.world.add(physics);

      object = {
        mesh: mesh,
        body: body,
      };
    } else {
      // If not, we only push the mesh
      object = {
        mesh: mesh,
      };
    }

    this.objects.push(object);
    this.gestures.updateMeshes(this.objects);
    return object;
  }

}

export default Scene;
