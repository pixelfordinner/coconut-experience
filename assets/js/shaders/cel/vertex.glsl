
varying vec3 vNormal;
uniform vec3 lightPos;
varying vec3 vPos;
varying vec3 lPos;

void main(void) {

  vNormal = normalize(normalMatrix * normal);
  vPos = normalize(viewMatrix * vec4( position, 1.0)).xyz;
  lPos = normalize(viewMatrix * vec4( lightPos, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position , 1.0);

}
