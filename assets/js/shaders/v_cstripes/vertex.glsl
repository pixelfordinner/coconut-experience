
varying vec3 vNormal;
varying vec2 vUv;

void main(void) {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  vNormal = normalize( normalMatrix * normal );
}
