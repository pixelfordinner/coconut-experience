
varying vec2 vUv;


///#pragma glslify: require(three.js/src/renderers/shaders/ShaderChunk/fog_pars_vertex.glsl);

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
///  #pragma glslify: require(three.js/src/renderers/shaders/ShaderChunk/fog_vertex.glsl);
}
