uniform vec3 diffuse;
uniform vec3 fogColor;
uniform float fogNear;
uniform float fogFar;
uniform float fogFactor;
uniform float fogDensity;
const float LOG2 = 1.442695;




void main() {
  float depth = gl_FragCoord.z / gl_FragCoord.w;
  gl_FragColor = vec4(diffuse, 1.0 );
  ///float fogFactor = smoothstep( fogNear, fogFar, depth );
  float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );
	fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );
  gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );

}
