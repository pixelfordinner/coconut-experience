import * as THREE from 'three'
const OrbitControl = require('three-orbit-controls')(THREE);
const oimo = require('oimo');
const defaultsDeep = require('lodash.defaultsdeep');
const $ = require('jquery');

class Scene {
    constructor(options) {
        this._objects = {};
        this._geometry = {};
        this._options = {
            colors: {
                background: 0x8C714C,
                fog: 0x262626
            },
            renderer: {
                canvas: document.getElementById('canvas'),
                antialias: true,
                precision: 'mediump'
            },
            camera: {
                distance: 40,
                fov: 35,
                near: .5,
                far: 1000,
                lookAt: {
                  x: 0,
                  y: 7,
                  z: 0
                },
                position: {
                    x: 130,
                    y: 66,
                    z: 50
                }
            },
            scene: {
              fog: {
                factor: .0008
              }
            },
            geometry: {
              box: {
                width: 1,
                height: 1,
                depth: 1
              },
              sphere: {
                radius: 1,
                widthSegments: 10,
                heightSegments: 7
              },
              cylinder: {
                radiusTop: 0.5,
                radiusBottom: 0.5,
                height: 1,
                radiusSegments: 7
              }
            }
        };

        this._options.dimensions = {
            width: $(this._options.renderer.canvas).width(),
            height: $(this._options.renderer.canvas).height()
        };

        // Camera
        this._options.camera.aspect = this._options.dimensions.width /
            this._options.dimensions.height;

        // Lights
        this._objects.lights = [];
        this._options.lights = {
            ambient: [{
                color: 0x666666,
                intensity: 1
            }],
            directional: [{
                color: 0xffffff,
                intensity: 2.4,
                parameters: {
                    position: {
                        x: this._options.camera.distance,
                        y: this._options.camera.distance,
                        z: this._options.camera.distance
                    }
                }
            }]
        };
    }

    initCamera() {
        this._objects.camera = new THREE.PerspectiveCamera(
            this._options.camera.fov,
            this._options.camera.aspect,
            this._options.camera.near,
            this._options.camera.far
        );

        this._objects.camera.lookAt(
          new THREE.Vector3(
            this._options.camera.lookAt.x,
            this._options.camera.lookAt.y,
            this._options.camera.lookAt.z
          )
        );
    }

    initRenderer() {
        this._objects.renderer = new THREE.WebGLRenderer(
            this._options.renderer
        );

        this._objects.renderer.setSize(
            this._options.dimensions.width,
            this._options.dimensions.height
        );

        this._objects.renderer.setClearColor(
            this._options.colors.background
        );

        this._objects.renderer.gammaInput = true;
        this._objects.renderer.gammaOutput = true;
        this._objects.renderer.shadowMap.enabled = true;
    }

    initLights() {
        // Ambient
        this._options.lights.ambient.forEach((function(item) {
            let light = new THREE.AmbientLight(
              item.color,
              item.intensity
            );

            this._objects.lights.push(light);
        }).bind(this));

        // Directional
        this._options.lights.directional.forEach((function(item) {
            let light = new THREE.DirectionalLight(
              item.color,
              item.intensity
            );

            light.position.set(
              item.parameters.position.x,
              item.parameters.position.y,
              item.parameters.position.z
            );

            light.castShadow = true;
            light.shadow.mapSize.width = this._options.dimensions.width * 2;
            light.shadow.mapSize.height = this._options.dimensions.width * 2;
            light.shadow.camera.left = -this._options.camera.distance;
            light.shadow.camera.right = this._options.camera.distance;
            light.shadow.camera.top = 10 * this._options.camera.distance;
            light.shadow.camera.bottom = -this._options.camera.distance;
            light.shadow.camera.far = this._options.camera.far;
            light.shadow.camera.near = this._options.camera.near;

            this._objects.lights.push(light);
        }).bind(this));
    }

    initControls() {
      this._objects.controls = new OrbitControl(
        this._objects.camera,
        this._options.renderer.canvas
      );

      this._objects.controls.target.set(
        this._options.camera.lookAt.x,
        this._options.camera.lookAt.y,
        this._options.camera.lookAt.z
      );
    }

    initGeometry() {
      this._geometry.box = new THREE.BufferGeometry().fromGeometry(
        new THREE.BoxGeometry(
          this._options.geometry.box.width,
          this._options.geometry.box.height,
          this._options.geometry.box.depth
        )
      );

      this._geometry.sphere = new THREE.BufferGeometry().fromGeometry(
        new THREE.SphereGeometry(
          this._options.geometry.sphere.radius,
          this._options.geometry.sphere.widthSegments,
          this._options.geometry.sphere.heightSegments
        )
      );

      this._geometry.cylinder = new THREE.BufferGeometry().fromGeometry(
        new THREE.CylinderGeometry(
          this._options.geometry.cylinder.radiusTop,
          this._options.geometry.cylinder.radiusBottom,
          this._options.geometry.cylinder.height,
          this._options.geometry.cylinder.radiusSegments
        )
      );


    }

    initScene() {
      this._objects.scene = new THREE.Scene();
      this._objects.scene.fog = new THREE.FogExp2(
        this._options.colors.fog,
        this._options.scene.fog.factor
      );

      // Lights
      this._objects.lights.forEach((function(light) {
        this._objects.scene.add(light);
      }).bind(this));

      // Base Plane

    }

    init() {
      this.initRenderer();
      this.initCamera();
      this.initControls();
      this.initLights();
      this.initGeometry();

      this.initScene();
    }
}

export default Scene;
