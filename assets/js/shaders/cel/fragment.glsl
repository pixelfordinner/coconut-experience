varying vec3 vNormal;
varying vec3 vPos;
varying vec3 lPos;

//uniform vec3 uLightPos;
//uniform vec3 lightDir;

uniform vec3 fogColor;
uniform float fogNear;
uniform float fogFar;
uniform float fogFactor;
uniform float fogDensity;
const float LOG2 = 1.442695;


void main(void) {
  //float skalarprod;
  vec4 color;
  vec3 lightDir = lPos - vPos ;
  float skalarprod = dot(lightDir, vNormal) / 1.5 ;

  float depth = gl_FragCoord.z / gl_FragCoord.w;

  if (skalarprod > 0.75) {
    color = vec4(0.8, 0.8, 1.0, 1.0);
  } else if (skalarprod > 0.50) {
    color = vec4(0.6, 0.6, 0.8, 1.0);
  } else if (skalarprod > 0.25) {
    color = vec4(0.4, 0.4, 0.6, 1.0);
  } else {
    color = vec4(0.2, 0.2, 0.4, 1.0);
  }

  gl_FragColor = color;

  float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );
	fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );
  gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );
}
