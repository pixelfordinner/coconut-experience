
uniform float opacity;
uniform float iGlobalTime;
uniform vec3 diffuse;
uniform float ratio;
uniform vec3 lightColor;
varying vec2 vUv;
//chunk(common);
//chunk(fog_pars_fragment);

#define HASHSCALE1 .10185

float hash( float n ) {
    return fract(sin(n)*43758.5453123);
}

float hash1(float p)
{
	vec3 p3  = fract(vec3(p) * HASHSCALE1);
    p3 += dot(p3, p3.yzx + 19.19);
    return fract((p3.x + p3.y) * p3.z);
}





float star (vec2 uv, vec2 pos, float r)
{
    return smoothstep(.0, r, length(uv - pos));
}

float field (vec2 uv, vec2 uv2)
{
    float field = .0;
    vec2 l1 = uv * .2;
    vec2 l2 = uv * .2;
    vec2 l3 = uv * .2;


    // vec2 g1 = ceil(l1 * 40.) * .025;
    // vec2 g2 = ceil(l2 * 20.) * .050;
    // vec2 g3 = ceil(l3 * 10.) * .100;


		vec2 g1 = fract(l1 * vec2(40.0));
    vec2 g2 = fract(l2 * vec2(20.0));
    vec2 g3 = fract(l3 * vec2(10.0));




    float ds =  pow(smoothstep(.25, -.25, length(uv2.y)), .1);

ds = 1.;
    // Do not produce the same result across platforms

    // float n1 = 1. - pow(hash(g1.x + g1.y * 1745.543), .2);
    // float n2 = 1. - pow(hash(g2.x + g2.y * 2423.123), .2);
    // float n3 = 1. - pow(hash(g3.x + g3.y * 4236.123), .2);

    // tentative to get uniform hash valur across all platforms

    float n1 = pow(hash(g1.x * g1.y * 17.43), 5.);
    float n2 = pow(hash(g2.x * g2.y * 23.13), 5.);
    float n3 = pow(hash(g3.x * g3.y * 46.12), 5.);



    float s1 =  1. - star(l1, vec2(g1.x - .0125, g1.y - .0125), ds * n1 *.030);
    float s2 =  1. - star(l2, vec2(g2.x - .0250, g2.y - .0250), ds * n2 *.045);
    float s3 =  1. - star(l3, vec2(g3.x - .0500, g3.y - .0500), ds * n3 *.060);

    float c1 =  smoothstep(0.0 ,1.0 ,pow(n1 * s1, 6.));
    float c2 =  smoothstep(0.0 ,1.0 ,pow(n2 * s2, 5.));
    float c3 =  smoothstep(0.0 ,1.0 ,pow(n3 * s3, 4.));

   	float shade = c1 + c2 + c3;

		if ( shade < .0 ) {
				shade = .0;
			}


 	return shade;
}

void main(void) {

		vec2 uv = -1.0 + 2.0 * vUv;

		vec2 uv2 = uv;
    uv *= 100.;
    uv.y *= ratio;

    float d2 =  smoothstep(.1, -.1, length(uv2.y));
    float tot = field(uv, uv2);
    vec4 shade = vec4(diffuse + vec3(   (d2 * .1) ), 1.);
		///vec4 shade = vec4(diffuse + clamp(.0,1.,pow(tot,3.)), 1.);
		//vec4 shade = vec4(vec3(tot),1.);
    //gl_FragColor = mix(shade, shade + d2, .15);
		gl_FragColor = shade;

}
