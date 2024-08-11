#version 440 core

layout(location = 0) in vec3 position;
layout(location = 1) in vec2 coord;

uniform dmat4 d_projection;
uniform dmat4 d_camera;
uniform dmat4 d_model;

mat4 projection = mat4(d_projection);
mat4 camera = mat4(d_camera);
mat4 model = mat4(d_model);

out vec2 vCoord;

void main(){

    gl_Position = projection*camera*model*vec4(position,1.0);

    vCoord = coord;

}