uniform vec3 uMaterialColor;
uniform vec3 uMaterialColor2;
uniform vec3 uDirLightPos;
uniform vec3 uDirLightColor;
uniform float uKd;
uniform float uBorder;

varying vec3 vNormal;



varying vec2 vUv;

uniform vec3 fogColor;
uniform float fogNear;
uniform float fogFar;
uniform float fogFactor;
uniform float fogDensity;
const float LOG2 = 1.442695;
uniform float iGlobalTime;

void main(void) {

  float depth = gl_FragCoord.z / gl_FragCoord.w;

  // compute direction to light
  vec4 lDirection = viewMatrix * vec4( uDirLightPos, 0.0 );
  vec3 lVector = normalize( lDirection.xyz );

  // diffuse: N * L. Normal must be normalized, since it's interpolated.
  vec3 normal = normalize( vNormal );

  vec3 color;
  float f = floor(cos( vUv.y * 6.3 - (iGlobalTime * 1.0))) + 1.0;
  if( f > 0.0 ){
    color = uMaterialColor;
  } else {
    color = uMaterialColor2;
  }

  float diffuse = dot( normal, lVector );
  if ( diffuse > 0.7 ) { diffuse = 1.0; }
  else if ( diffuse > 0.4 ) { diffuse = 0.7; }
  else if ( diffuse > -0.1 ) { diffuse = 0.5; }
  else { diffuse = 0.3; }


  gl_FragColor = vec4( uKd * color * (uDirLightColor * 4.0) * diffuse , 1.0 );


  float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );
	fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );
  gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );
}
