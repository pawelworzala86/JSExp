#version 440 core




uniform sampler2D diffuseTexture;


in vec2 vCoord;


float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}



out vec4 color;

void main()
{

	vec3 diffuse = vec3(texture(diffuseTexture, vCoord).rgb);

	color = vec4(diffuse,1.0);
	
}