import * as THREE from 'three';

let ShaderMaterial = function (uniforms, vertex, fragment, alpha) {

  let material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertex,
    fragmentShader: fragment,
    fog: true,
    lights: true,
    transparent: false,

  });

  //console.log(fragment);
  material.transparent = alpha;

  return material;
};

export default ShaderMaterial;
