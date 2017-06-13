
varying vec3 vNormal;
//uniform vec3 lightPos;
//varying vec3 vViewPosition;
//varying vec3 lPos;
varying vec2 vUv;
void main(void) {
vUv = uv;
  // vNormal = normalize(normalMatrix * normal);
  // vPos = normalize(viewMatrix * vec4( position, 1.0)).xyz;
  // lPos = normalize(viewMatrix * vec4( lightPos, 1.0)).xyz;
  // gl_Position = projectionMatrix * modelViewMatrix * vec4( position , 1.0);


  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  vNormal = normalize( normalMatrix * normal );
//  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
//  vViewPosition = -mvPosition.xyz;

}
