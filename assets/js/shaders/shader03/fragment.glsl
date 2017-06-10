

varying vec2 vUv;



// uniform vec3 fogColor;
// uniform float fogNear;
// uniform float fogFar;
// uniform float fogFactor;
// uniform float fogDensity;
uniform float iGlobalTime;
const float LOG2 = 1.442695;

// SHADERS CHUNKS

#pragma glslify: require('three.js/src/renderers/shaders/ShaderChunk/fog_pars_fragment.glsl');



void main() {

  float depth = gl_FragCoord.z / gl_FragCoord.w;
  float t = mod(iGlobalTime/5.0, 1.0);
  vec4 col = vec4(.3, .55, .99, 1.);
  vec4 pat = vec4(floor(cos( vUv.y * 6.3 - (iGlobalTime * 4.0))) + 1.0);
  gl_FragColor = vec4(col + pat);

  //#pragma glslify: require('three.js/src/renderers/shaders/ShaderChunk/fog_fragment.glsl');

  float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );
 	fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );
  gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );
}
