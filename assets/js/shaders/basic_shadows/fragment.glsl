
uniform float opacity;
uniform float iGlobalTime;
uniform vec3 diffuse;
uniform vec3 diffshadow;


//////////////////////////// 2D NOISE //////////////////////////////////////////
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
//////////////////////////// FBM ///////////////////////////////////////////////
//
// 	<https://www.shadertoy.com/view/MdX3Rr>
//	by inigo quilez
//
const mat2 mtrx = mat2(0.8,-0.6,0.6,0.8);
float fbm(vec2 p){

    float f = 0.0;
    f += 0.5000 * noise(p); p = mtrx * p * 2.01;
    f += 0.2500 * noise(p); p = mtrx * p * 2.02;
    f += 0.1250 * noise(p); p = mtrx * p * 2.03;
    f += 0.0625 * noise(p); p = mtrx * p * 2.04;
    f /= 0.9375;
    return f;
}
///////////////////////////////////////////////////////////////////////////////

//chunk(common);
//chunk(packing);
//chunk(bsdfs);
//chunk(lights_pars);
//chunk(shadowmap_pars_fragment);
//chunk(shadowmask_pars_fragment);
//chunk(fog_pars_fragment);

void main(void) {

  // SIMPLE CLOUDY TESTURE
  //float grad = fbm(vec2(vUv * 7.0 ) - vec2(iGlobalTime * 0.2));
  // vec3 color = vec3(ewaNoise3D * 3.0);
  // color = mix(color, vec4(diffuse, 1.0), 0.5);




  // SHADOW MAPPING
  float shdw = smoothstep(-1.0, 1.0, getShadowMask());

  // COLORIZE
  vec4 color2 = mix(vec4(diffshadow, 1.0), vec4(diffuse, opacity), shdw);
  //color2 = mix(color2, color1, 0.4);
  gl_FragColor = color2;

  // ADD FOG
  //chunk(fog_fragment);
}
////////////////////////////////////////////////////////////////////////////////
