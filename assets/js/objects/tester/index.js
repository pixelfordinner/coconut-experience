import * as THREE from 'three';
import Sphere from '../../geometry/sphere';
import { MaterialManager } from '../../materials/manager';
import shaderParse from '../../shaders/shaderparse';
const glslify = require('glslify');

const defaultsDeep = require('lodash.defaultsdeep');

const FRAGMENT = glslify(shaderParse(require('raw-loader!shaderlib/depth_frag.glsl'), true));
const VERTEX = glslify(shaderParse(require('raw-loader!shaderlib/depth_frag.glsl'), true));

console.log('------ FRAGMENT -----');
console.log(FRAGMENT);
console.log('------ VERTEX -----');
console.log(VERTEX);

class Tester {
  constructor(scene, options = {}) {
    this.options = {
      radius: 1,
      scale: {
        x: 1,
        y: 1,
        z: 1,
      },
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      name: 'Tester',
      widthSegments: 10,
      heightSegments: 10,
      castShadow: true,
      receiveShadow: false,
      physics: {
        type: 'sphere',
        move: true,
        density: 0.015,
        friction: 2,
        restitution: 0.1,
        belongsTo: 1,
        collidesWith: 0xffffffff,
      },
    };

    this.options = defaultsDeep(options, this.options);
    let sphere = new Sphere(this.options.radius,
                            this.options.widthSegments,
                            this.options.heightSegments);
    let material = MaterialManager.get('displacement');
    console.log(VERTEX);

    var mesh = new THREE.Mesh(sphere, material);

    let uniforms = THREE.UniformsUtils.merge([{
        opacity: { type: 'f', value: 0.5 },
        diffuse: { type: 'c', value: new THREE.Color(0xf937be) },
        diffshadow: { type: 'c', value: new THREE.Color(0x000000) },
      },
          THREE.UniformsLib.fog,
          THREE.UniformsLib.lights,
      ]);

    // mesh.customDepthMaterial = new THREE.ShaderMaterial({
    //   uniforms: uniforms,
    //   vertexShader: VERTEX,
    //   fragmentShader: FRAGMENT,
    //
    //   //side: THREE.DoubleSide,
    // });

    mesh.scale.set(
      this.options.radius * this.options.scale.x,
      this.options.radius * this.options.scale.y,
      this.options.radius * this.options.scale.z
    );
    mesh.position.set(
      this.options.position.x,
      this.options.position.y,
      this.options.position.z
    );
    mesh.name = this.options.name;
    mesh.receiveShadow = this.options.receiveShadow;
    mesh.castShadow = this.options.castShadow;
    return scene.add(mesh, this.options.physics);
  }
}

export default Tester;





/*var uniforms = { texture:  { value: clothTexture } };
				var vertexShader = document.getElementById( 'vertexShaderDepth' ).textContent;
				var fragmentShader = document.getElementById( 'fragmentShaderDepth' ).textContent;
				// cloth mesh
				object = new THREE.Mesh( clothGeometry, clothMaterial );
				object.position.set( 0, 0, 0 );
				object.castShadow = true;
				scene.add( object );
				object.customDepthMaterial = new THREE.ShaderMaterial( {
					uniforms: uniforms,
					vertexShader: vertexShader,
					fragmentShader: fragmentShader,
					side: THREE.DoubleSide
				} );
*/
