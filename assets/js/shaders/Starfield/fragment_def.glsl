
uniform float opacity;
uniform float iGlobalTime;
uniform vec3 diffuse;
uniform float ratio;
uniform vec3 lightColor;
varying vec2 vUv;
//chunk(common);
//chunk(fog_pars_fragment);
#define S(x, y, z) smoothstep(x, y, z)
#define HASHSCALE1 .2831
#define SEED .2831

float hash( float n ) {
    return fract(sin(n)*43758.5453123);
}

float hash1(float p)
{
	vec3 p3  = fract(vec3(p) * HASHSCALE1);
    p3 += dot(p3, p3.yzx + 19.19);
    return fract((p3.x + p3.y) * p3.z);
}

float hash2(vec2 p)
{
    // hash2 taken from Dave Hoskins
    // https://www.shadertoy.com/view/4djSRW
	vec3 p3  = fract(vec3(p.xyx) * SEED);
    p3 += dot(p3, p3.yzx + 19.19);
    return fract((p3.x + p3.y) * p3.z);
}



float star (vec2 uv, vec2 pos, float r)
{
    return smoothstep(.0, r, length(uv - pos));
}


float starcloud(vec2 uv, vec2 scale, float density){


    vec2 grid = uv * scale;
    vec2 id = floor(grid);
    grid = fract(grid) - .5;

    float d = length(grid);
    float r = pow(hash2(id), density);
    float star = S(-.01, clamp(r,.0,.5), d);
    star = pow(star, 2.);
    return 1. - star ;
}

float field (vec2 uv, vec2 uv2)
{
    float field = .0;
    vec2 l1 = uv * .2;
    vec2 l2 = uv * .2;
    vec2 l3 = uv * .2;


    vec2 g1 = ceil(l1 * 40.) * .025;
    vec2 g2 = ceil(l2 * 20.) * .050;
    vec2 g3 = ceil(l3 * 10.) * .100;


    float ds =  pow(smoothstep(.25, -.25, length(uv2.y)), .1);


    // Do not produce the same result across platforms

    // float n1 = 1. - pow(hash(g1.x + g1.y * 1745.543), .2);
    // float n2 = 1. - pow(hash(g2.x + g2.y * 2423.123), .2);
    // float n3 = 1. - pow(hash(g3.x + g3.y * 4236.123), .2);

    // tentative to get uniform hash valur across all platforms

    float n1 = pow(hash1(g1.x * g1.y * 17.43), 5.);
    float n2 = pow(hash1(g2.x * g2.y * 23.13), 5.);
    float n3 = pow(hash1(g3.x * g3.y * 46.12), 5.);

    float s1 =  1. - star(l1, vec2(g1.x - .0125, g1.y - .0125), ds * n1 *.030);
    float s2 =  1. - star(l2, vec2(g2.x - .0250, g2.y - .0250), ds * n2 *.045);
    float s3 =  1. - star(l3, vec2(g3.x - .0500, g3.y - .0500), ds * n3 *.060);

    float c1 =  pow(n1 * clamp(pow(s1, 2.), .0, 1.0), 6.);
    float c2 =  pow(n2 * clamp(pow(s2, 2.), .0, 1.0), 5.);
    float c3 =  pow(n3 * clamp(pow(s3, 2.), .0, 1.0), 4.);

    //float ds =  pow(smoothstep(.25, -.25, length(uv2.y)), .1);
    //ds = 1.;

   	float shade = c1 + c2 + c3;

    // for(int i = 0; i< 1; i++){
    // field +=  shade;
    // }

 	return shade;
}

void main(void) {

		vec2 uv = -1.0 + 2.0 * vUv;
    //vec2 uv =  vUv;
		vec2 uv2 = uv;
    //uv *= 50.;
    uv.x *= ratio;

    float dns = 1.-smoothstep(-.4, .4, length(uv.y )) ;
    dns = 1. -(dns + (dns*.9));
    //dns= 1.-dns;
    float d3 =  smoothstep(.1, -.1, length(uv.y));
    //float tot = field(uv, uv2);
    float tot = starcloud(uv, vec2(500.0), 500. * dns);
    vec4 shade = vec4(diffuse + vec3( tot), 1.0);

  gl_FragColor = mix(shade, shade + d3, .15);
  //gl_FragColor = vec4(dns);
}
