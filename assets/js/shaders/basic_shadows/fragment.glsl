
uniform float opacity;
uniform vec3 diffuse;
uniform vec3 diffshadow;

//chunk(common);
//chunk(packing);
//chunk(bsdfs);
//chunk(lights_pars);
//chunk(shadowmap_pars_fragment);
//chunk(shadowmask_pars_fragment);
//chunk(fog_pars_fragment);

void main(void) {

     float shdw = smoothstep(-1.0, 1.0, getShadowMask());
     gl_FragColor = mix(vec4(diffshadow, opacity), vec4(diffuse, 1.0), shdw);

    //chunk(fog_fragment);
}
