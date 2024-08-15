import {fs} from './file.js'

var vertexShader = 0
var fragmentShader = 0
var program = 0

export function load(){
    //fs.ReadFileSync('default.frag')
    fs.readFileSync('default.vert')

    //printf('shader %s', buffor)

    vertexShader = glCreateShader(GL_VERTEX_SHADER);
    glShaderSource(vertexShader,1, &fs.buffor, &fs.fsize);
    glCompileShader(vertexShader);

    printf('OK')

    fs.readFileSync('default.frag')

    fragmentShader = glCreateShader(GL_FRAGMENT_SHADER);
    glShaderSource(fragmentShader,1, &fs.buffor, &fs.fsize);
    glCompileShader(fragmentShader);


    program = glCreateProgram();
    glAttachShader(program, vertexShader);
    glAttachShader(program, fragmentShader);
    glLinkProgram(program);

    glUseProgram(program);
    //gl.ValidateProgram,*(program

    glDetachShader(program, vertexShader);
    glDetachShader(program, fragmentShader);

    glDeleteShader(vertexShader);
    glDeleteShader(fragmentShader);

    return program
}