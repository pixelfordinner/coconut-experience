varying vec3 vPosition;
varying vec3 vNormal;
uniform float iGlobalTime;


///// NOISE /////
float hash( float n ) {
    return fract(sin(n)*43758.5453123);
}

float noise( in vec2 x ){
    vec2 p = floor(x);
    vec2 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    float n = p.x + p.y * 57.0;
    return mix(mix( hash(n + 0.0), hash(n + 1.0), f.x), mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y);
}



void main() {
  //float displace = noise(vec4(position, time));

  //vPosition = position + normal * displace * 0.1;
  vNormal = normal;
  vPosition = position;
  //gl_Position = projectionMatrix * modelViewMatrix * vec4( vPosition, 1.0 );
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}
