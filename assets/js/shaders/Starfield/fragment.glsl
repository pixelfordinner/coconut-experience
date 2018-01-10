
uniform float opacity;
uniform float iGlobalTime;
uniform vec3 diffuse;
uniform float ratio;
uniform vec3 lightColor;
varying vec2 vUv;
//chunk(common);
//chunk(fog_pars_fragment);

float hash( float n ) {
    return fract(sin(n)*43758.5453123);
}

float star (vec2 uv, vec2 pos, float r)
{
    return smoothstep(.0, r, length(uv - pos));
}

float field (vec2 uv)
{
    float field = .0;
    vec2 l1 = uv * .2;
    vec2 l2 = uv * .2;
    vec2 l3 = uv * .2;


    vec2 g1 = ceil(l1 * 40.) * .025;
    vec2 g2 = ceil(l2 * 20.) * .050;
    vec2 g3 = ceil(l3 * 10.) * .100;

    float n1 = 1. - pow(hash(g1.x + g1.y * 1745.543), .2);
    float n2 = 1. - pow(hash(g2.x + g2.y * 2423.123), .2);
    float n3 = 1. - pow(hash(g3.x + g3.y * 4236.123), .2);

    float s1 =  1. - star(l1, vec2(g1.x - .0125, g1.y - .0125), n1 *.030);
    float s2 =  1. - star(l2, vec2(g2.x - .0250, g2.y - .0250), n2 *.045);
    float s3 =  1. - star(l3, vec2(g3.x - .0500, g3.y - .0500), n3 *.060);

    float c1 =  pow(n1 * clamp(pow(s1, 2.), .0, 1.0), 6.);
    float c2 =  pow(n2 * clamp(pow(s2, 2.), .0, 1.0), 5.);
    float c3 =  pow(n3 * clamp(pow(s3, 2.), .0, 1.0), 4.);

    float ds = length(uv);
    ds = 1. - smoothstep(.1, 1.4, ds);
    ds = 1.;

   	float shade = ds * (c1 + c2 + c3);

    for(int i = 0; i< 5; i++){
    field +=  shade;
    }

 	return field;
}

void main(void) {

		vec2 uv = vUv;
		vec2 uv2 = uv - .5;
    uv *= 400.;
    uv.y *= ratio;

    float d2 =    1. - smoothstep(-.1, .1, length(uv2.y));
    float tot = field(uv);
    vec4 shade = vec4(diffuse + vec3(  tot), pow( tot, 1.));

    gl_FragColor = mix(shade, shade + d2, .15);
}
