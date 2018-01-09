
uniform float opacity;
uniform float iGlobalTime;
uniform vec3 diffuse;
uniform float ratio;
uniform vec3 lightColor;
varying vec2 vUv;
//chunk(common);
//chunk(fog_pars_fragment);

// // Tiling 2D noise by Dave Hoskin https://www.shadertoy.com/view/4dlGW2
// //----------------------------------------------------------------------------------------
// float Hash(in vec2 p, in float scale)
// {
// 	// This is tiling part, adjusts with the scale...
// 	p = mod(p, scale);
// 	return fract(sin(dot(p, vec2(27.16898, 38.90563))) * 5151.5473453);
// }

float hash( float n ) {
    return fract(sin(n)*43758.5453123);
}

float make_dot (vec2 uv, vec2 pos, float r)
{
   return smoothstep(.0 , r , min( length(uv - pos), r));
}


void main(void) {

		vec2 uv = vUv;

    //uv.x += clamp(1.+cos(iGlobalTime), .0, 2.)* .025;
    //uv.y *= iResolution.y / iResolution.x;
    uv *= 40.;
    uv.y *= ratio;

    float c = .0;
    float c2 = .0;
    float c3 = .0;
    vec4 shade = vec4(.0);

    vec2 gr  = ceil(uv * 40.) * .025;
    vec2 gr2 = ceil(uv * 20.) * .050;
    vec2 gr3 = ceil(uv * 10.) * .100;

    float n  = 1. - pow(hash( gr.x  * gr.y  * 1745.5431), .2);
    float n2 = 1. - pow(hash( gr2.x * gr2.y * 24236.123), .2);
    float n3 = 1. - pow(hash( gr3.x * gr3.y * 4236.1234), .3);

    float s  =  1. - make_dot(uv, vec2(gr.x  - .0125, gr.y - .0125), n *.025 );
    float s2 =  1. - make_dot(uv, vec2(gr2.x - .025, gr2.y - .025), n2 *.035);
    float s3 =  1. - make_dot(uv, vec2(gr3.x - .05, gr3.y - .05), n3 *.035);

    c  = 1.5 * pow(  n * clamp(pow(s,  2.), .0, 1.0), 3.);
    c2 = 1.5 * pow( n2 * clamp(pow(s2, 2.), .0, 1.0), 5.);
    c3 = 1.5 * pow( n3 * clamp(pow(s3, 2.), .0, 1.0), 7.);


    shade = vec4(diffuse + vec3(  c+c2+c3 ), pow(c+c2+c3, 2.));
    //shade += mix(shade, vec4(.0,.0,.8,1.), c+c2+c3);

    gl_FragColor = shade;

  //gl_FragColor = vec4(id);
  // ADD FOG
  //(fog_fragment);
}
