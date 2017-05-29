import * as THREE from 'three';

let ShaderMaterial = function (uniforms, vertex, fragment) {

  let material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertex,
    fragmentShader: fragment,
    fog: true,

  });
  console.log(fragment);

  return material;
};

export default ShaderMaterial;
