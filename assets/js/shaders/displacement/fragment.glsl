varying vec3 vPosition;
varying vec3 vNormal;
uniform float iGloblalTime;

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
/// FBM////

float fbm(vec2 p){

    float f = 0.0;
    f += 0.5000 * noise(p);
    f += 0.2500 * noise(p);
    f += 0.1250 * noise(p);
    f += 0.0625 * noise(p);
    f /= 0.9375;
    return f;
}



void main() {
  vec3 color = vec3(noise(vec2(fbm(vPosition.xy * 40.))));
  gl_FragColor = vec4(color, 1.0);
}
