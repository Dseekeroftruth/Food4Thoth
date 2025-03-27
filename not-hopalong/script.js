"use strict";

let canv, gl;
let canvstr;
let animState;

const HSPAN = 0.8; // initial number of units of "real" world in canvas width

let resolutionHandle;
let pcHandle, // point of "real" at the center of the canvas
  uppHandle; // number of units of real world by canvas pixel
let nbIterHandle;
let colorHandle;
let aHandle, bHandle, cHandle;
let dirHandle, kstretchHandle;
let timeHandle;
let ct, pMand;
let ui, uiv;
let str;

const mrandom = Math.random;
const mfloor = Math.floor;
const mround = Math.round;
const mceil = Math.ceil;
const mabs = Math.abs;
const mmin = Math.min;
const mmax = Math.max;

const mPI = Math.PI;
const mPIS2 = Math.PI / 2;
const m2PI = Math.PI * 2;
const msin = Math.sin;
const mcos = Math.cos;
const matan2 = Math.atan2;

const mhypot = Math.hypot;
const msqrt = Math.sqrt;

//-----------------------------------------------------------------------------
// miscellaneous functions
//-----------------------------------------------------------------------------

function alea(min, max) {
  // random number [min..max[. If no max is provided, [0..min[

  if (typeof max == "undefined") return min * mrandom();
  return min + (max - min) * mrandom();
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function intAlea(min, max) {
  // random integer number [min..max[ . If no max is provided, [0..min[

  if (typeof max == "undefined") {
    max = min;
    min = 0;
  }
  return mfloor(min + (max - min) * mrandom());
} // intAlea

//------------------------------------------------------------------------
// User Interface (controls)
//------------------------------------------------------------------------
function toggleMenu() {
  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden");
    this.innerHTML = "close controls";
  } else {
    menu.classList.add("hidden");
    this.innerHTML = "controls";
  }
} // toggleMenu

//------------------------------------------------------------------------

function getCoerce(name, min, max, isInt) {
  let parse = isInt ? parseInt : parseFloat;
  let ctrl = ui[name];
  let x = parse(ctrl.value, 10);
  if (isNaN(x)) {
    x = uiv[name];
  }
  x = mmax(x, min);
  x = mmin(x, max);
  ctrl.value = uiv[name] = x;
}

//------------------------------------------------------------------------
function prepareUI() {
  // toggle menu handler

  document.querySelector("#controls").addEventListener("click", toggleMenu);
  document.querySelectorAll("#menu .menugroup").forEach((el) => {
    el.querySelector("p:first-child").addEventListener("click", () => {
      if (el.classList.contains("closed")) el.classList.remove("closed");
      else el.classList.add("closed");
    });
    el.classList.add("closed"); // all initially closed
  });
  ui = {}; // User Interface HTML elements
  uiv = {}; // User Interface values of controls

  [
    "a",
    "b",
    "c",
    "nbiter",
    "colorx",
    "colory",
    "colorchange",
    "stretch0",
    "stretch1",
    "stretch2"
  ].forEach((ctrlName) => (ui[ctrlName] = document.getElementById(ctrlName)));

  registerControl("a", readCoerced, "change", () => {});
  registerControl("b", readCoerced, "change", () => {});
  registerControl("c", readCoerced, "change", () => {});
  registerControl("nbiter", readCoerced, "change", () => {});
  registerControl("colorx", readCoerced, "input", () => {});
  registerControl("colory", readCoerced, "input", () => {});
  registerControl("colorchange", readUICheck, "input", () => {});
  registerControl("stretch0", readUICheck, "input", () => {
    uiv.stretch1 = false;
    uiv.stretch2 = false;
  });
  registerControl("stretch1", readUICheck, "input", () => {
    uiv.stretch0 = false;
    uiv.stretch2 = false;
  });
  registerControl("stretch2", readUICheck, "input", () => {
    uiv.stretch0 = false;
    uiv.stretch1 = false;
  });
  readUI();
} // prepareUI

//------------------------------------------------------------------------
function readUI() {
  if (ui.registered) {
    for (const ctrl in ui.registered) ui.registered[ctrl].readF();
  }
} // readUI

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function registerControl(
  controlName,
  readFunction,
  changeEvent,
  changedFunction
) {
  /* provides simple way to associate controls with their read / update / changeEvent / changed functions
            since many (but not all) controls work almost the same way */
  /* changeEvent and changedFunction are optional */

  const ctrl = ui[controlName];
  ui.registered = ui.registered || [];
  ui.registered.push(ctrl); // NEVER register a control twice !!!
  ctrl.readF = readFunction;
  if (changeEvent) {
    ctrl.addEventListener(changeEvent, (event) => {
      readFunction.call(ctrl);
      if (changedFunction) changedFunction.call(ctrl, event);
    });
  }
} // registerControl
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function readUIText() {
  uiv[this.id] = this.value;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function readUIFloat() {
  uiv[this.id] = parseFloat(this.value);
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function readUIInt(ctrl, event) {
  uiv[this.id] = parseInt(this.value);
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function readUICheck(ctrl, event) {
  uiv[this.id] = this.checked;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function readCoerced() {
  /* the element will be read with getCoerce with values given by its min, max and step attributes
              (integer value if step == 1)
            */
  let min = this.getAttribute("min");
  let max = this.getAttribute("max");
  let step = this.getAttribute("step");
  getCoerce(this.id, min, max, step == 1);
}

//-----------------------------------------------------------------------------

//************** Shader sources **************
let vertexSource = `#version 300 es
 precision mediump float;
in vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

let fragmentSource = `#version 300 es
 precision mediump float;
 out vec4 fragColor;

#define PI 3.14159265358979323846

    uniform vec2 resolution; // in pixels
    uniform vec2 pc;       // center
    uniform float upp;     // scale (units per pixel)
    uniform float time;
    uniform int nbIter;
    uniform float a,b,c;
    uniform vec2 color;
    uniform float dir;
    uniform float kstretch; // 0 < kstretch < 1 to stretch (kstretch > 1 will shrink)

    vec2 centerpix;
    vec2 uv;
    float sn,cs,sckm1;
    vec3 fn(vec2 z0) {
    vec2 z = z0;
    for (int k = 0; k < nbIter; ++k) {
         z = vec2(z.y - sign(z.x) * sqrt(abs(b * z.x + c)),
                        a - z.x);
    }

    float cx,cy;
// now turn position into color
// many other formulae could give nice results too!

    if (color.x < 0.0) cx = 10.0 * sin(time / 9500.0); else cx=color.x;
    if (color.y < 0.0) cy = 7.0 * sin(time / 12123.0); else cy=color.y;
    z.x = cos(z.x + cx);
    z.y = sin(z.y + cy);
    return vec3((z.x+1.0)/2.0,abs(z.x * z.y ),(z.y+1.0)/2.0); //
}

void main(){

    centerpix = resolution / 2.0;

// set up position
    uv = (gl_FragCoord.xy - centerpix) * upp; // relative to center of canvas

// stretch it
    sn = sin(dir);
    cs = cos(dir);
    sckm1 = sn * cs * (kstretch-1.0);
    uv=vec2((sn*sn+kstretch*cs*cs)*uv.x + sckm1*uv.y,sckm1*uv.x+(cs*cs+kstretch*sn*sn)*uv.y); // stretch
//
    fragColor = vec4(fn(uv + pc), 1.0 );
}
`;

//************** Utility functions **************

//Compile shader and combine with source
function compileShader(shaderSource, shaderType) {
  let shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw "Shader compile failed with: " + gl.getShaderInfoLog(shader);
  }
  return shader;
}

//From https://codepen.io/jlfwong/pen/GqmroZ
//Utility to complain loudly if we fail to find the attribute/uniform
function getAttribLocation(program, name) {
  let attributeLocation = gl.getAttribLocation(program, name);
  if (attributeLocation === -1) {
    throw "Cannot find attribute " + name + ".";
  }
  return attributeLocation;
}

function getUniformLocation(program, name) {
  let attributeLocation = gl.getUniformLocation(program, name);
  if (attributeLocation === null) {
    throw "Cannot find uniform " + name + ".";
  }
  return attributeLocation;
}
//---------------------------------------------------------

function initShadersStuff() {
  //************** Create shaders **************

  //Create vertex and fragment shaders
  let vertexShader = compileShader(vertexSource, gl.VERTEX_SHADER);
  let fragmentShader = compileShader(fragmentSource, gl.FRAGMENT_SHADER);

  //Create shader programs
  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  gl.useProgram(program);

  //Set up rectangle covering entire canvas
  let vertexData = new Float32Array([
    -1.0,
    1.0, // top left
    -1.0,
    -1.0, // bottom left
    1.0,
    1.0, // top right
    1.0,
    -1.0 // bottom right
  ]);

  // Create vertex buffer
  let vertexDataBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);
  // Layout of our data in the vertex buffer
  let positionHandle = getAttribLocation(program, "position");
  gl.enableVertexAttribArray(positionHandle);
  gl.vertexAttribPointer(
    positionHandle,
    2, // position is a vec2 (2 values per component)
    gl.FLOAT, // each component is a float
    false, // don't normalize values
    2 * 4, // two 4 byte float components per vertex (32 bit float is 4 bytes)
    0 // how many bytes inside the buffer to start from
  );

  //Get uniform handles

  resolutionHandle = getUniformLocation(program, "resolution");
  pcHandle = getUniformLocation(program, "pc");
  uppHandle = getUniformLocation(program, "upp");
  nbIterHandle = getUniformLocation(program, "nbIter");
  aHandle = getUniformLocation(program, "a");
  bHandle = getUniformLocation(program, "b");
  cHandle = getUniformLocation(program, "c");
  timeHandle = getUniformLocation(program, "time");
  colorHandle = getUniformLocation(program, "color");
  dirHandle = getUniformLocation(program, "dir");
  kstretchHandle = getUniformLocation(program, "kstretch");

  gl.viewport(0, 0, innerWidth, innerHeight);
}

//------------------------------------------------------------------------
class CanvasTraveller {
  #muaState = 0;
  #translationStart;
  #zoomInfo;
  #canv;
  #pMand;
  #listener;
  #lastmm;

  constructor(canv, pCenter, listener) {
    /* manages panning and zooming on a canvas
                the pCenter object describes the user's or "real" space :
                the center of the canvas corresponds to the point pCenter(xc,yc) in the user's space, one Pixel canvas corresponds to upp in the real space
                when the user pans or changes zoom, the listener function is called with an object
                {xc,yc,upp} representing the new position of the center of the canvas and the scale
                */
    this.#listener = listener;
    this.#canv = canv;
    this.#pMand = pCenter ? { ...pCenter } : { xc: 0, yc: 0, upp: 0.003 };
    canv.addEventListener("mousedown", (event) =>
      this.#manageUserAction("mousedown", event)
    );
    canv.addEventListener("mousemove", (event) =>
      this.#manageUserAction("mousemove", event)
    );
    canv.addEventListener("mouseup", (event) =>
      this.#manageUserAction("mouseup", event)
    );
    canv.addEventListener("mouseleave", (event) =>
      this.#manageUserAction("mouseup", event)
    ); // same as mouse Up
    canv.addEventListener("wheel", (event) =>
      this.#manageUserAction("wheel", event)
    );

    canv.addEventListener(
      "touchstart",
      (event) => this.#manageUserAction("touchstart", event),
      { passive: false }
    );
    canv.addEventListener(
      "touchmove",
      (event) => this.#manageUserAction("touchmove", event),
      { passive: false }
    );
    canv.addEventListener("touchend", (event) =>
      this.#manageUserAction("touchend", event)
    );
    canv.addEventListener("touchleave", (event) =>
      this.#manageUserAction("touchend", event)
    );
    canv.addEventListener("touchcancel", (event) =>
      this.#manageUserAction("touchend", event)
    );

    canv.addEventListener("resize", (event) => {
      //maxx = canv.width;
      //maxy = canv.height;
    });
  }
  //------------------------------------------------------------------------

  mouseRelPos(event) {
    // input: clientX and clientY coordinates from mouse Event
    // returns: x and y coordinates in pixels, relative to canvas

    let rect = this.#canv.getBoundingClientRect();
    return { x: event.clientX - rect.x, y: event.clientY - rect.y };
  }

  //------------------------------------------------------------------------

  #zoom(zoom, x, y) {
    /* zoom is a multiplicator factor which is applied to the number of units per pixel (upp)
                i.e. zoom > 1 : zoom out, zoom < 1 : zoom in
                x,y : screen (pixels) coordinates of zooming center */

    /* do not exagerate - arbitrary limits, might be changed */
    if (this.#pMand.upp >= 0.1 && zoom > 1) return;
    if (this.#pMand.upp < 1e-9 && zoom < 1) return;

    let dx = (x - this.#canv.width / 2) * (1 - zoom);
    let dy = (y - this.#canv.height / 2) * (1 - zoom);
    // all the stretching stuff
    let s = -msin(str.dir);
    let c = mcos(str.dir);
    this.#pMand.xc +=
      ((s * s + c * c * str.k) * dx + s * c * (str.k - 1) * dy) *
      this.#pMand.upp;
    this.#pMand.yc -=
      ((s * s * str.k + c * c) * dy + s * c * (str.k - 1) * dx) *
      this.#pMand.upp;

    this.#pMand.upp *= zoom;
    this.#listener({ action: "zoom", ...this.#pMand });
  } // zoom

  //------------------------------------------------------------------------
  //------------------------------------------------------------------------

  #manageUserAction(action, param) {
    let mm, mm1, mm2;
    //                redraw();
    if (param && param.preventDefault) param.preventDefault();
    if (param && param.clientX) mm = this.mouseRelPos(param);
    if (param && param.touches) {
      switch (param.touches.length) {
        case 0:
          break;
        case 1:
          mm = this.mouseRelPos(param.touches[0]);
          break;
        case 2:
          mm1 = this.mouseRelPos(param.touches[0]);
          mm2 = this.mouseRelPos(param.touches[1]);
          break;
        default:
          this.#muaState = 0; // more than 2 touches : abnormal, reset to default state
          return; // ignore
      }
    }
    if (mm) this.#lastmm = mm;

    if (
      (this.#muaState == 0 || this.#muaState == 1) &&
      action == "touchstart" &&
      param.touches.length == 2
    ) {
      // start zooming with 2 touches
      this.#zoomInfo = {
        zc: { x: (mm1.x + mm2.x) / 2, y: (mm1.y + mm2.y) / 2 },
        dist: mhypot(mm1.x - mm2.x, mm1.y - mm2.y)
      };
      this.#muaState = 2;
      return; // that's all
    }

    if (["mouseup", "touchend"].includes(action)) {
      this.#muaState = 0; // end of action, reset state
      this.#canv.classList.remove("grabbing");
      return;
    }

    switch (this.#muaState) {
      case 0:
        if (
          (action == "mousedown" && param.buttons == 1) ||
          (action == "touchstart" && param.touches.length == 1)
        ) {
          this.#translationStart = mm;
          this.#muaState = 1;
          this.#canv.classList.add("grabbing");
          break;
        }
        if (action == "wheel") {
          let y = event.deltaY;
          if (y > 0) {
            this.#zoom(1.4, mm.x, mm.y);
          } else if (y < 0) {
            this.#zoom(1 / 1.4, mm.x, mm.y);
          }
        }
        break;

      case 1: // expecting move or 2nd touch for zoom)
        if (action == "touchstart" && param.touches.length == 2) {
          this.#zoomInfo = {
            zc: { x: (mm1.x + mm2.x) / 2, y: (mm1.y + mm2.y) / 2 },
            dist: mhypot(mm1.x - mm2.x, mm1.y - mm2.y)
          };
          this.#muaState = 2;
          break;
        }
        if (
          (action == "mousemove" && param.buttons == 1) ||
          (action == "touchmove" && param.touches.length == 1)
        ) {
          let nt = performance.now();
          let dx = mm.x - this.#translationStart.x;
          let dy = mm.y - this.#translationStart.y;
          // all the stretching stuff
          let s = -msin(str.dir);
          let c = mcos(str.dir);
          this.#pMand.xc -=
            ((s * s + c * c * str.k) * dx + s * c * (str.k - 1) * dy) *
            this.#pMand.upp;
          this.#pMand.yc +=
            ((s * s * str.k + c * c) * dy + s * c * (str.k - 1) * dx) *
            this.#pMand.upp;

          Object.assign(this.#translationStart, mm);
          this.#listener({ action: "pan", ...this.#pMand });
        }
        break;

      case 2:
        if (action !== "touchmove" || param.touches.length !== 2) return; // ignore if not zooming/dezooming
        let dist = Math.hypot(mm2.x - mm1.x, mm2.y - mm1.y);
        this.#zoom(
          this.#zoomInfo.dist / dist,
          this.#zoomInfo.zc.x,
          this.#zoomInfo.zc.y
        );
        this.#zoomInfo.dist = dist;
        break;
    } // this.#muaState
  } // manageUserAction
} // class

//---------------------------------------------------------

class Stretcher {
  #canv;
  #ctx;
  #animState;
  #ampl; // stretching radius;

  constructor(canvas) {
    this.#canv = canvas;
    this.#ctx = canvas.getContext("2d");
    this.#animState = 0;

    canvas.addEventListener("mousemove", (event) => {
      if (event.buttons != 1) return;
      const mm = this.#mouseRelPos(event);
      const dx = mm.x - this.#canv.width / 2;
      const dy = mm.y - this.#canv.height / 2;
      this.dir = -matan2(dy, dx); // "-" because 2d context and webgl context have opposite orientations
      this.#setAmpl(mhypot(dx, dy));
    });
    setInterval(() => this.#animate(), 50);
  }
  #mouseRelPos(event) {
    // input: clientX and clientY coordinates from mouse Event
    // returns: x and y coordinates in pixels, relative to canvas

    let rect = this.#canv.getBoundingClientRect();
    return { x: event.clientX - rect.x, y: event.clientY - rect.y };
  }
  #animate() {
    switch (this.#animState) {
      case 0: // no stretch...
        this.#canv.style.display = "none";
        this.dir = 0;
        this.#setAmpl(0); // stretch by a factor of 1;
        ++this.#animState;
      case 1:
        if (uiv.stretch1) {
          this.#animState = 10;
          break;
        }
        if (uiv.stretch2) {
          this.#animState = 2;
          break;
        }
        break;

      case 2: // stretch locked
        this.#canv.style.display = "none";
        ++this.#animState;
      case 3:
        if (uiv.stretch0) {
          this.#animState = 0;
          break;
        }
        if (uiv.stretch1) {
          this.#animState = 10;
          break;
        }
        break;

      case 10: // setting stretch
        this.#canv.style.display = "block";
        this.#ctx.fillStyle = "#fff";
        this.#ctx.fillRect(0, 0, this.#canv.width, this.#canv.height);
        this.dir = 0;
        this.#setAmpl(0); // stretch by a factor of 1;
        ++this.#animState;

      case 11:
        if (uiv.stretch0) {
          this.#animState = 0;
          break;
        }
        if (uiv.stretch2) {
          this.#animState = 2;
          break;
        }
        this.#ctx.clearRect(0, 0, this.#canv.width, this.#canv.height);
        this.#ctx.beginPath();
        this.#ctx.fillStyle = "#f00";
        this.#ctx.arc(this.#canv.width / 2, this.#canv.height / 2, 8, 0, m2PI);
        this.#ctx.fill();
        this.#ctx.lineWidth = 2;
        this.#ctx.strokeStyle = "#fff";
        this.#ctx.stroke();

        this.#ctx.beginPath();
        this.#ctx.fillStyle = "#0f0";
        this.#ctx.arc(
          this.#canv.width / 2 + this.#ampl * mcos(this.dir),
          this.#canv.height / 2 - this.#ampl * msin(this.dir),
          6,
          0,
          m2PI
        );
        this.#ctx.fill();

        break;
    }
  } // #animate

  #setAmpl(value) {
    // value given in pixels (distance from center of display)
    this.#ampl = value;
    value /= mmin(this.#canv.width / 2, this.#canv.height / 2); // range 0 ..1 for center..closest edge
    value = mmin(value, 1) * 1; // range 0..1
    this.k = Math.exp(-value * Math.LN10); // range 1..1/100 for stretching by a factor of 0..100
  } //
} // stretcher
//---------------------------------------------------------

function listener(pScreen) {
  pMand = pScreen;
}
//---------------------------------------------------------
//---------------------------------------------------------

let animate;

{
  // scope for animate

  let tStart = 0;
  let animState = 0;

  animate = function (tStamp) {
    requestAnimationFrame(animate);

    switch (animState) {
      case 0:
        tStart = tStamp;
        pMand = { xc: -2.0, yc: 0.72, upp: HSPAN / window.innerWidth };
        if (!ct) ct = new CanvasTraveller(canv, pMand, listener);
        if (!str) str = new Stretcher(canvstr);
        pMand.nbIter = uiv.nbiter;
        resize();
        ++animState;

      case 1:
        draw(pMand);
    } // switch
  }; // animate
} // scope for animate

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function resize() {
  gl.viewport(0, 0, window.innerWidth, window.innerHeight);
  canvstr.width = window.innerWidth;
  canvstr.height = window.innerHeight;
} // resize

//---------------------------------------------------------
function draw(pMand) {
  canv.width = window.innerWidth;
  canv.height = window.innerHeight;

  gl.uniform2fv(resolutionHandle, [canv.width, canv.height]);
  gl.uniform2fv(pcHandle, [pMand.xc, pMand.yc]);
  gl.uniform1f(uppHandle, pMand.upp);
  gl.uniform1i(nbIterHandle, uiv.nbiter);
  gl.uniform1f(aHandle, uiv.a);
  gl.uniform1f(bHandle, uiv.b);
  gl.uniform1f(cHandle, uiv.c);
  gl.uniform1f(timeHandle, performance.now());
  gl.uniform2fv(
    colorHandle,
    uiv.colorchange ? [-1, -1] : [uiv.colorx, uiv.colory]
  );
  if (uiv.stretch0) {
    gl.uniform1f(dirHandle, 0); // no stetching
    gl.uniform1f(kstretchHandle, 1);
  } else {
    gl.uniform1f(dirHandle, str.dir);
    gl.uniform1f(kstretchHandle, str.k);
  }
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  return true;
} // draw

//---------------------------------------------------------
//---------------------------------------------------------
// beginning of execution

{
  canv = document.createElement("canvas");
  canv.id = "canvdraw";
  canv.style.position = "absolute";
  document.body.appendChild(canv);
  //    canv.setAttribute('title','Move mouse horizontally and click inside canvas');
  gl = canv.getContext("webgl2");
} // canvas creation

{
  canvstr = document.createElement("canvas");
  canvstr.id = "canvstr";
  canvstr.style.position = "absolute";
  document.body.appendChild(canvstr);
} // canvas creation

prepareUI();

window.addEventListener("resize", resize);
initShadersStuff();

requestAnimationFrame(animate);