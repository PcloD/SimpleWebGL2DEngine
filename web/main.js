var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var s2d;
(function (s2d) {
    var Input;
    (function (Input) {
        var InputMouse = (function () {
            /*
            Mouse buttons values (from https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button):
                0: Main button pressed, usually the left button or the un-initialized state
                1: Auxiliary button pressed, usually the wheel button or the middle button (if present)
                2: Secondary button pressed, usually the right button
                3: Fourth button, typically the Browser Back button
                4: Fifth button, typically the Browser Forward button
            */
            function InputMouse() {
                var _this = this;
                this.onMouseDown = function (ev) {
                    ev.preventDefault();
                    _this.updateLastPosition(ev);
                    if (ev.button === 0)
                        _this._leftDown = true;
                    else if (ev.button === 2)
                        _this._rightDown = true;
                    //TEST!!
                    //this.engine.renderer.enterFullscreen();
                };
                this.onMouseMove = function (ev) {
                    ev.preventDefault();
                    _this.updateLastPosition(ev);
                };
                this.onMouseOut = function (ev) {
                    ev.preventDefault();
                    //Nothing to do..
                };
                this.onMouseOver = function (ev) {
                    ev.preventDefault();
                    //Nothing to do..
                };
                this.onMouseUp = function (ev) {
                    ev.preventDefault();
                    _this.updateLastPosition(ev);
                    if (ev.button === 0)
                        _this._leftDown = false;
                    else if (ev.button === 2)
                        _this._rightDown = false;
                };
                this.onMouseWheel = function (ev) {
                    ev.preventDefault();
                    //TODO: Do we handle this?
                };
                this._lastX = 0;
                this._lastY = 0;
                this._leftDown = false;
                this._rightDown = false;
                document.addEventListener("mousedown", this.onMouseDown, true);
                document.addEventListener("mousemove", this.onMouseMove, true);
                document.addEventListener("mouseout", this.onMouseOut, true);
                document.addEventListener("mouseover", this.onMouseOver, true);
                document.addEventListener("mouseup", this.onMouseUp, true);
                document.addEventListener("mousewheel", this.onMouseWheel, true);
            }
            Object.defineProperty(InputMouse.prototype, "x", {
                get: function () {
                    return this._lastX;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputMouse.prototype, "y", {
                get: function () {
                    return this._lastY;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputMouse.prototype, "isDown", {
                get: function () {
                    return this._leftDown || this._rightDown;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputMouse.prototype, "isLeftDown", {
                get: function () {
                    return this._leftDown;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputMouse.prototype, "isRightDown", {
                get: function () {
                    return this._rightDown;
                },
                enumerable: true,
                configurable: true
            });
            InputMouse.prototype.updateLastPosition = function (ev) {
                if (ev.x >= 0 && ev.x < s2d.engine.renderer.screenWidth && ev.y >= 0 && ev.y < s2d.engine.renderer.screenHeight) {
                    this._lastX = ev.x;
                    this._lastY = ev.y;
                }
            };
            return InputMouse;
        }());
        Input.InputMouse = InputMouse;
    })(Input = s2d.Input || (s2d.Input = {}));
})(s2d || (s2d = {}));
var s2d;
(function (s2d) {
    var Input;
    (function (Input) {
        var Touch = (function () {
            function Touch() {
            }
            return Touch;
        }());
        Input.Touch = Touch;
        var InputTouch = (function () {
            function InputTouch() {
                var _this = this;
                this.onTouchStart = function (ev) {
                    ev.preventDefault();
                    _this.updateLastPositions(ev);
                    //TEST!!
                    //this.engine.renderer.enterFullscreen();
                };
                this.onTouchEnd = function (ev) {
                    ev.preventDefault();
                    for (var i = 0; i < ev.changedTouches.length; i++)
                        _this.removeTouch(ev.changedTouches[i].identifier);
                };
                this.onTouchMove = function (ev) {
                    ev.preventDefault();
                    _this.updateLastPositions(ev);
                };
                this.onTouchCancel = function (ev) {
                    ev.preventDefault();
                    for (var i = 0; i < ev.changedTouches.length; i++)
                        _this.removeTouch(ev.changedTouches[i].identifier);
                };
                this._touches = new Array();
                document.addEventListener("touchstart", this.onTouchStart, true);
                document.addEventListener("touchend", this.onTouchEnd, true);
                document.addEventListener("touchmove", this.onTouchMove, true);
                document.addEventListener("touchcancel", this.onTouchCancel, true);
            }
            Object.defineProperty(InputTouch.prototype, "touches", {
                get: function () {
                    return this._touches;
                },
                enumerable: true,
                configurable: true
            });
            InputTouch.prototype.removeTouch = function (id) {
                for (var i = 0; i < this._touches.length; i++)
                    if (this._touches[i].id === id)
                        this._touches.splice(i, 1);
            };
            InputTouch.prototype.getOrCreateTouch = function (id) {
                for (var i = 0; i < this._touches.length; i++)
                    if (this._touches[i].id === id)
                        return this._touches[i];
                var newTouch = new Touch();
                newTouch.id = id;
                this._touches.push(newTouch);
                return newTouch;
            };
            InputTouch.prototype.updateLastPositions = function (ev) {
                for (var i = 0; i < ev.changedTouches.length; i++) {
                    var id = ev.changedTouches[i].identifier;
                    var x = ev.changedTouches[i].clientX;
                    var y = ev.changedTouches[i].clientY;
                    var touch = this.getOrCreateTouch(id);
                    if (x >= 0 && x < s2d.engine.renderer.screenWidth && y >= 0 && y < s2d.engine.renderer.screenHeight) {
                        touch.x = x;
                        touch.y = y;
                    }
                }
            };
            return InputTouch;
        }());
        Input.InputTouch = InputTouch;
    })(Input = s2d.Input || (s2d.Input = {}));
})(s2d || (s2d = {}));
/// <reference path="InputMouse.ts" />
/// <reference path="InputTouch.ts" />
var s2d;
(function (s2d) {
    var InputManager = (function () {
        function InputManager() {
            this.inputTouch = new s2d.Input.InputTouch();
            this.inputMouse = new s2d.Input.InputMouse();
        }
        Object.defineProperty(InputManager.prototype, "pointerDown", {
            get: function () {
                return this.inputMouse.isDown || this.inputTouch.touches.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InputManager.prototype, "pointerX", {
            get: function () {
                if (this.inputMouse.isDown)
                    return this.inputMouse.x;
                if (this.inputTouch.touches.length > 0)
                    return this.inputTouch.touches[0].x;
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InputManager.prototype, "pointerY", {
            get: function () {
                if (this.inputMouse.isDown)
                    return this.inputMouse.y;
                if (this.inputTouch.touches.length > 0)
                    return this.inputTouch.touches[0].y;
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        InputManager.prototype.update = function () {
            //Nothing to do..
        };
        return InputManager;
    }());
    s2d.InputManager = InputManager;
})(s2d || (s2d = {}));
var s2d;
(function (s2d) {
    var RenderBuffer = (function () {
        function RenderBuffer(gl) {
            this.gl = gl;
            this._buffer = gl.createBuffer();
        }
        RenderBuffer.prototype.clear = function () {
            if (this._buffer != null) {
                this.gl.deleteBuffer(this._buffer);
                this._buffer = null;
            }
        };
        RenderBuffer.prototype.setData = function (data, staticData) {
            this.bind();
            this.gl.bufferData(this.gl.ARRAY_BUFFER, data, staticData ? this.gl.STATIC_DRAW : this.gl.DYNAMIC_DRAW);
        };
        RenderBuffer.prototype.bind = function () {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this._buffer);
        };
        return RenderBuffer;
    }());
    s2d.RenderBuffer = RenderBuffer;
})(s2d || (s2d = {}));
var s2d;
(function (s2d) {
    var RenderShader = (function () {
        function RenderShader(gl, shaderStr, type) {
            this.gl = gl;
            this._shader = gl.createShader(type);
            gl.shaderSource(this._shader, shaderStr);
            gl.compileShader(this._shader);
            this._compilationOk = gl.getShaderParameter(this._shader, gl.COMPILE_STATUS);
            if (!this._compilationOk) {
                console.error("Error compiling shader: " + shaderStr);
                console.error(gl.getShaderInfoLog(this._shader));
                this.clear();
            }
        }
        Object.defineProperty(RenderShader.prototype, "shader", {
            get: function () {
                return this._shader;
            },
            enumerable: true,
            configurable: true
        });
        RenderShader.prototype.clear = function () {
            if (this._shader != null) {
                this.gl.deleteShader(this._shader);
                this._shader = null;
            }
        };
        return RenderShader;
    }());
    s2d.RenderShader = RenderShader;
})(s2d || (s2d = {}));
/// <reference path="RenderShader.ts" />
var s2d;
(function (s2d) {
    var RenderProgram = (function () {
        function RenderProgram(gl, vertexShaderStr, fragmentShaderStr) {
            this.gl = gl;
            this._vertexShader = new s2d.RenderShader(gl, vertexShaderStr, gl.VERTEX_SHADER);
            this._fragmentShader = new s2d.RenderShader(gl, fragmentShaderStr, gl.FRAGMENT_SHADER);
            this._program = gl.createProgram();
            gl.attachShader(this._program, this._vertexShader.shader);
            gl.attachShader(this._program, this._fragmentShader.shader);
            gl.linkProgram(this._program);
            this._linkOk = gl.getProgramParameter(this._program, gl.LINK_STATUS);
            if (!this._linkOk) {
                console.error("Error compiling program: " + gl.getProgramInfoLog(this._program));
                this.clear();
            }
        }
        RenderProgram.prototype.clear = function () {
            if (this._program != null) {
                this.gl.deleteProgram(this._program);
                this._program = null;
            }
            if (this._vertexShader != null) {
                this._vertexShader.clear();
                this._vertexShader = null;
            }
            if (this._fragmentShader != null) {
                this._fragmentShader.clear();
                this._fragmentShader = null;
            }
        };
        RenderProgram.prototype.useProgram = function () {
            this.gl.useProgram(this._program);
        };
        RenderProgram.prototype.setUniform2f = function (name, x, y) {
            var uniformLocation = this.gl.getUniformLocation(this._program, name);
            this.gl.uniform2f(uniformLocation, x, y);
        };
        RenderProgram.prototype.setVertexAttributePointer = function (name, buffer, size, type, normalized, stride, offset) {
            var attributeLocation = this.gl.getAttribLocation(this._program, name);
            this.gl.enableVertexAttribArray(attributeLocation);
            buffer.bind();
            this.gl.vertexAttribPointer(attributeLocation, size, type, normalized, stride, offset);
        };
        return RenderProgram;
    }());
    s2d.RenderProgram = RenderProgram;
})(s2d || (s2d = {}));
/// <reference path="RenderBuffer.ts" />
/// <reference path="RenderProgram.ts" />
var s2d;
(function (s2d) {
    var RenderCommands = (function () {
        function RenderCommands(gl) {
            this.currentRenderBufferIndex = 0;
            this.tmpV1 = s2d.Vector2.create();
            this.tmpV2 = s2d.Vector2.create();
            this.tmpV3 = s2d.Vector2.create();
            this.tmpV4 = s2d.Vector2.create();
            this.tmpUV1 = s2d.Vector2.create();
            this.tmpUV2 = s2d.Vector2.create();
            this.tmpUV3 = s2d.Vector2.create();
            this.tmpUV4 = s2d.Vector2.create();
            this.gl = gl;
            this.renderProgram = new s2d.RenderProgram(gl, RenderCommands.vertexShader, RenderCommands.fragmentShader);
            this.renderBuffers = new Array();
            for (var i = 0; i < 16; i++)
                this.renderBuffers.push(new s2d.RenderBuffer(gl));
            this.backingArray = new ArrayBuffer(RenderCommands.MAX_ELEMENTS * RenderCommands.ELEMENT_SIZE);
            this.triangles = new Float32Array(this.backingArray);
            this.colors = new Uint32Array(this.backingArray);
            this.uvs = new Uint16Array(this.backingArray);
        }
        RenderCommands.prototype.startFrame = function () {
        };
        RenderCommands.prototype.endFrame = function () {
        };
        RenderCommands.prototype.start = function () {
            this.trianglesCount = 0;
            this.trianglesOffset = 0;
            this.colorsOffset = 0;
            this.uvsOffset = 0;
        };
        RenderCommands.prototype.drawRect = function (mat, halfSize, texture, uvTopLeft, uvBottomRight, color) {
            if (this.trianglesCount + 2 >= RenderCommands.MAX_TRIANGLES || texture !== this.currentTexture) {
                this.end();
                this.start();
                this.currentTexture = texture;
            }
            var tmpV1 = this.tmpV1;
            var tmpV2 = this.tmpV2;
            var tmpV3 = this.tmpV3;
            var tmpV4 = this.tmpV4;
            var tmpUV1 = this.tmpUV1;
            var tmpUV2 = this.tmpUV2;
            var tmpUV3 = this.tmpUV3;
            var tmpUV4 = this.tmpUV4;
            var triangles = this.triangles;
            var trianglesOffset = this.trianglesOffset;
            var colors = this.colors;
            var colorsOffset = this.colorsOffset;
            var uvs = this.uvs;
            var uvsOffset = this.uvsOffset;
            var halfSizeX = halfSize[0];
            var halfSizeY = halfSize[1];
            //Top left
            tmpV1[0] = -halfSizeX;
            tmpV1[1] = -halfSizeY;
            s2d.Vector2.transformMat2d(tmpV1, tmpV1, mat);
            tmpUV1[0] = uvTopLeft[0] * 65535;
            tmpUV1[1] = uvTopLeft[1] * 65535;
            //Top right
            tmpV2[0] = halfSizeX;
            tmpV2[1] = -halfSizeY;
            s2d.Vector2.transformMat2d(tmpV2, tmpV2, mat);
            tmpUV2[0] = uvBottomRight[0] * 65535;
            tmpUV2[1] = uvTopLeft[1] * 65535;
            //Bottom right
            tmpV3[0] = halfSizeX;
            tmpV3[1] = halfSizeY;
            s2d.Vector2.transformMat2d(tmpV3, tmpV3, mat);
            tmpUV3[0] = uvBottomRight[0] * 65535;
            tmpUV3[1] = uvBottomRight[1] * 65535;
            //Bottom left
            tmpV4[0] = -halfSizeX;
            tmpV4[1] = halfSizeY;
            s2d.Vector2.transformMat2d(tmpV4, tmpV4, mat);
            tmpUV4[0] = uvTopLeft[0] * 65535;
            tmpUV4[1] = uvBottomRight[1] * 65535;
            var colorNumber = color.rgbaHex;
            //First triangle (1 -> 2 -> 3)
            triangles[trianglesOffset + 0] = tmpV1[0];
            triangles[trianglesOffset + 1] = tmpV1[1];
            colors[colorsOffset + 2] = colorNumber;
            uvs[uvsOffset + 6] = tmpUV1[0];
            uvs[uvsOffset + 7] = tmpUV1[1];
            triangles[trianglesOffset + 4] = tmpV2[0];
            triangles[trianglesOffset + 5] = tmpV2[1];
            colors[colorsOffset + 6] = colorNumber;
            uvs[uvsOffset + 14] = tmpUV2[0];
            uvs[uvsOffset + 15] = tmpUV2[1];
            triangles[trianglesOffset + 8] = tmpV3[0];
            triangles[trianglesOffset + 9] = tmpV3[1];
            colors[colorsOffset + 10] = colorNumber;
            uvs[uvsOffset + 22] = tmpUV3[0];
            uvs[uvsOffset + 23] = tmpUV3[1];
            trianglesOffset += 12;
            colorsOffset += 12;
            uvsOffset += 24;
            //Second triangle (3 -> 4 -> 1)
            triangles[trianglesOffset + 0] = tmpV3[0];
            triangles[trianglesOffset + 1] = tmpV3[1];
            colors[colorsOffset + 2] = colorNumber;
            uvs[uvsOffset + 6] = tmpUV3[0];
            uvs[uvsOffset + 7] = tmpUV3[1];
            triangles[trianglesOffset + 4] = tmpV4[0];
            triangles[trianglesOffset + 5] = tmpV4[1];
            colors[colorsOffset + 6] = colorNumber;
            uvs[uvsOffset + 14] = tmpUV4[0];
            uvs[uvsOffset + 15] = tmpUV4[1];
            triangles[trianglesOffset + 8] = tmpV1[0];
            triangles[trianglesOffset + 9] = tmpV1[1];
            colors[colorsOffset + 10] = colorNumber;
            uvs[uvsOffset + 22] = tmpUV1[0];
            uvs[uvsOffset + 23] = tmpUV1[1];
            trianglesOffset += 12;
            colorsOffset += 12;
            uvsOffset += 24;
            this.trianglesOffset = trianglesOffset;
            this.colorsOffset = colorsOffset;
            this.uvsOffset = uvsOffset;
            this.trianglesCount += 2;
        };
        RenderCommands.prototype.end = function () {
            if (!s2d.EngineConfiguration.RENDER_ENABLED)
                return;
            if (this.trianglesCount === 0)
                return;
            var gl = this.gl;
            this.renderProgram.useProgram();
            this.renderProgram.setUniform2f("u_resolution", gl.canvas.width, gl.canvas.height);
            this.currentTexture.useTexture();
            var renderBuffer = this.renderBuffers[this.currentRenderBufferIndex];
            renderBuffer.setData(this.backingArray, false);
            this.renderProgram.setVertexAttributePointer("a_position", renderBuffer, 2, gl.FLOAT, false, RenderCommands.ELEMENT_SIZE, 0);
            this.renderProgram.setVertexAttributePointer("a_color", renderBuffer, 4, gl.UNSIGNED_BYTE, true, RenderCommands.ELEMENT_SIZE, 8);
            this.renderProgram.setVertexAttributePointer("a_texcoord", renderBuffer, 2, gl.UNSIGNED_SHORT, true, RenderCommands.ELEMENT_SIZE, 12);
            if (this.currentTexture.hasAlpha) {
                gl.enable(gl.BLEND);
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            }
            else {
                gl.disable(gl.BLEND);
            }
            gl.drawArrays(this.gl.TRIANGLES, 0, this.trianglesCount * 3);
            this.currentRenderBufferIndex = (this.currentRenderBufferIndex + 1) % this.renderBuffers.length;
            this.currentTexture = null;
        };
        RenderCommands.vertexShader = "\n            attribute vec2 a_position;\n            attribute vec4 a_color;\n            attribute vec2 a_texcoord;\n\n            // screen resolution\n            uniform vec2 u_resolution;\n\n            // color used in fragment shader\n            varying vec4 v_color;\n\n            // texture used in vertex shader\n            varying vec2 v_texcoord;\n\n            // all shaders have a main function\n            void main() {\n                // convert the position from pixels to 0.0 to 1.0\n                vec2 zeroToOne = a_position / u_resolution;\n            \n                // convert from 0->1 to 0->2\n                vec2 zeroToTwo = zeroToOne * 2.0;\n            \n                // convert from 0->2 to -1->+1 (clipspace)\n                vec2 clipSpace = zeroToTwo - 1.0;\n\n                // vertical flip, so top/left is (0,0)\n                gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1); \n                //gl_Position = vec4(clipSpace, 0, 1);\n\n                // pass vertex color to fragment shader\n                v_color = a_color;\n\n                v_texcoord = a_texcoord;\n            }\n        ";
        RenderCommands.fragmentShader = "\n            // fragment shaders don't have a default precision so we need\n            // to pick one. mediump is a good default\n            precision mediump float;\n\n            //color received from vertex shader\n            varying vec4 v_color;\n\n            //texture uv received from vertex shader\n            varying vec2 v_texcoord;\n\n            // Main texture.\n            uniform sampler2D u_texture;\n\n            void main() {\n\n                gl_FragColor = texture2D(u_texture, v_texcoord) * v_color;\n\n                //gl_FragColor = v_color;\n            }\n        ";
        RenderCommands.ELEMENT_SIZE = 2 * 4 + 4 * 1 + 2 * 2; //(2 floats [X,Y] + 4 byte [R,G,B,A] + 2 byte (U,V) )
        RenderCommands.MAX_TRIANGLES = 4096;
        RenderCommands.MAX_ELEMENTS = RenderCommands.MAX_TRIANGLES * 3; //3 elements per triangle
        return RenderCommands;
    }());
    s2d.RenderCommands = RenderCommands;
})(s2d || (s2d = {}));
/// <reference path="RenderCommands.ts" />
var s2d;
(function (s2d) {
    var RenderManager = (function () {
        function RenderManager() {
            var _this = this;
            this.tmpCameras = new Array(4);
            this.tmpDrawers = new Array(1024);
            this.mainCanvas = document.getElementById("mainCanvas");
            if (this.mainCanvas) {
                //don't show context menu
                this.mainCanvas.addEventListener("contextmenu", function (ev) { ev.preventDefault(); }, true);
                window.addEventListener("contextmenu", function (ev) { ev.preventDefault(); }, true);
                //resize canvas on window resize
                window.addEventListener("resize", function () { return _this.onWindowResize(); }, false);
                //register webgl context lost event
                this.mainCanvas.addEventListener("webglcontextlost", function () { return _this.onWebGLContextLost(); }, false);
                this.mainCanvas.addEventListener("webglcontextrestored", function () { return _this.onWebGLContextRestored(); }, false);
                this.initWebGL();
            }
        }
        Object.defineProperty(RenderManager.prototype, "contextLost", {
            get: function () {
                return this._contextLost;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RenderManager.prototype, "screenWidth", {
            get: function () {
                return this._screenWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RenderManager.prototype, "screenHeight", {
            get: function () {
                return this._screenHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RenderManager.prototype, "gl", {
            get: function () {
                return this._gl;
            },
            enumerable: true,
            configurable: true
        });
        RenderManager.prototype.onWindowResize = function () {
            this._screenWidth = window.innerWidth;
            this._screenHeight = window.innerHeight;
            this.mainCanvas.width = this._screenWidth;
            this.mainCanvas.height = this._screenHeight;
            this.gl.viewport(0, 0, this._screenWidth, this._screenHeight);
        };
        RenderManager.prototype.onWebGLContextLost = function () {
            this._contextLost = true;
            console.error("WebGL context lost! Not handled yet..");
        };
        RenderManager.prototype.onWebGLContextRestored = function () {
            this._contextLost = false;
        };
        RenderManager.prototype.initWebGL = function () {
            this._gl = this.mainCanvas.getContext("webgl", { alpha: false });
            if (!this._gl)
                this._gl = this.mainCanvas.getContext("experimental-webgl");
            if (!this._gl)
                return;
            var gl = this._gl;
            //Default clear color
            gl.clearColor(0, 0, 0, 1);
            //Disable depth test and writing to depth mask
            gl.disable(gl.DEPTH_TEST);
            gl.depthMask(false);
            this._commands = new s2d.RenderCommands(gl);
            this.onWindowResize();
        };
        /**
         * Enters full screen mode. This function can only be called when triggered from a user initiated action (ex: click event handler)
         */
        RenderManager.prototype.enterFullscreen = function () {
            //Taken from phaser source code!!
            //https://github.com/photonstorm/phaser/blob/master/src/system/Device.js
            var fs = [
                'requestFullscreen',
                'requestFullScreen',
                'webkitRequestFullscreen',
                'webkitRequestFullScreen',
                'msRequestFullscreen',
                'msRequestFullScreen',
                'mozRequestFullScreen',
                'mozRequestFullscreen'
            ];
            var element = this.mainCanvas;
            for (var i = 0; i < fs.length; i++) {
                if (element[fs[i]]) {
                    element[fs[i]]();
                    break;
                }
            }
        };
        RenderManager.prototype.exitFullscreen = function () {
            //Taken from phaser source code!!
            //https://github.com/photonstorm/phaser/blob/master/src/system/Device.js
            var cfs = [
                'cancelFullScreen',
                'exitFullscreen',
                'webkitCancelFullScreen',
                'webkitExitFullscreen',
                'msCancelFullScreen',
                'msExitFullscreen',
                'mozCancelFullScreen',
                'mozExitFullscreen'
            ];
            var doc = document;
            for (var i = 0; i < cfs.length; i++) {
                if (doc[cfs[i]]) {
                    doc[cfs[i]]();
                    break;
                }
            }
        };
        RenderManager.prototype.draw = function () {
            var cameras = this.tmpCameras;
            var camerasLen = s2d.engine.entities.getComponentInChildren(s2d.Camera, cameras);
            var drawers = this.tmpDrawers;
            var drawersLen = s2d.engine.entities.getComponentInChildren(s2d.Drawer, drawers);
            if (camerasLen === 0)
                console.warn("No cameras to draw!!");
            if (drawersLen === 0)
                console.warn("No entities to draw!!");
            this._commands.startFrame();
            for (var i = 0; i < camerasLen; i++)
                this.renderCamera(cameras[i], drawers, drawersLen);
            this._commands.endFrame();
        };
        RenderManager.prototype.renderCamera = function (camera, drawers, drawersLen) {
            var commands = this._commands;
            if (s2d.EngineConfiguration.RENDER_ENABLED) {
                var gl = this.gl;
                var clearFlags = 0;
                if (camera.clearColorBuffer) {
                    clearFlags |= gl.COLOR_BUFFER_BIT;
                    gl.clearColor(camera.clearColor.r, camera.clearColor.g, camera.clearColor.b, camera.clearColor.a);
                }
                if (camera.clearDepthBuffer)
                    clearFlags |= gl.DEPTH_BUFFER_BIT;
                if (clearFlags != 0)
                    gl.clear(clearFlags);
            }
            commands.start();
            for (var i = 0; i < drawersLen; i++)
                drawers[i].draw(commands);
            commands.end();
        };
        return RenderManager;
    }());
    s2d.RenderManager = RenderManager;
})(s2d || (s2d = {}));
var s2d;
(function (s2d) {
    var Component = (function () {
        function Component() {
            this._entity = null;
            //Linked list of components that belong to the same entity
            this.__internal_nextComponent = null;
        }
        Component.prototype.init = function (entity) {
            this._entity = entity;
            this.onInit();
        };
        Object.defineProperty(Component.prototype, "entity", {
            get: function () {
                return this._entity;
            },
            enumerable: true,
            configurable: true
        });
        Component.prototype.onInit = function () {
        };
        Component.prototype.getComponent = function (clazz) {
            if (this._entity !== null)
                return this._entity.getComponent(clazz);
            return null;
        };
        return Component;
    }());
    s2d.Component = Component;
})(s2d || (s2d = {}));
/// <reference path="Component.ts" />
var s2d;
(function (s2d) {
    var Transform = (function (_super) {
        __extends(Transform, _super);
        function Transform() {
            _super.apply(this, arguments);
            this._parent = null;
            this._position = s2d.Vector2.create();
            this._rotation = 0;
            this._scale = s2d.Vector2.fromValues(1, 1);
            this._halfSize = s2d.Vector2.fromValues(16, 16);
            //Linked list of children
            this._firstChild = null;
            this._lastChild = null;
            //Linked list of siblings
            this._prevSibling = null;
            this._nextSibling = null;
            this._localMatrix = s2d.Matrix2d.create();
        }
        Object.defineProperty(Transform.prototype, "parent", {
            //private _localMatrixDirty : boolean = true;
            get: function () {
                return this._parent;
            },
            set: function (p) {
                if (this._parent === null)
                    s2d.engine.entities.root.removeChild(this);
                else
                    this._parent.removeChild(this);
                this._parent = p;
                if (this._parent === null)
                    s2d.engine.entities.root.addChild(this);
                else
                    this._parent.addChild(this);
            },
            enumerable: true,
            configurable: true
        });
        Transform.prototype.onInit = function () {
            s2d.engine.entities.root.addChild(this);
        };
        Object.defineProperty(Transform.prototype, "localPosition", {
            get: function () {
                return this._position;
            },
            set: function (p) {
                s2d.Vector2.copy(this._position, p);
                //this._localMatrixDirty = true;
                this._localMatrix[4] = this._position[0];
                this._localMatrix[5] = this._position[1];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "localX", {
            get: function () {
                return this._position[0];
            },
            set: function (v) {
                this._position[0] = v;
                //this._localMatrixDirty = true;
                this._localMatrix[4] = this._position[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "localY", {
            get: function () {
                return this._position[1];
            },
            set: function (v) {
                this._position[1] = v;
                //this._localMatrixDirty = true;
                this._localMatrix[5] = this._position[1];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "localRotationRadians", {
            get: function () {
                return this._rotation;
            },
            set: function (rad) {
                this._rotation = rad;
                //this._localMatrixDirty = true;
                var ss = this._scale;
                var s = Math.sin(rad);
                var c = Math.cos(rad);
                this._localMatrix[0] = ss[0] * c;
                this._localMatrix[1] = ss[1] * s;
                this._localMatrix[2] = ss[0] * -s;
                this._localMatrix[3] = ss[1] * c;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "localRotationDegrees", {
            get: function () {
                return this._rotation * s2d.SMath.rad2deg;
            },
            set: function (deg) {
                this.localRotationRadians = deg * s2d.SMath.deg2rad;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "localScale", {
            get: function () {
                return this._scale;
            },
            set: function (ss) {
                s2d.Vector2.copy(this._scale, ss);
                //this._localMatrixDirty = true;
                var s = Math.sin(this._rotation);
                var c = Math.cos(this._rotation);
                this._localMatrix[0] = ss[0] * c;
                this._localMatrix[1] = ss[1] * s;
                this._localMatrix[2] = ss[0] * -s;
                this._localMatrix[3] = ss[1] * c;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "localScaleX", {
            get: function () {
                return this._scale[0];
            },
            set: function (v) {
                this._scale[0] = v;
                //this._localMatrixDirty = true;
                var ss = this._scale;
                var s = Math.sin(this._rotation);
                var c = Math.cos(this._rotation);
                this._localMatrix[0] = ss[0] * c;
                this._localMatrix[2] = ss[0] * -s;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "localScaleY", {
            get: function () {
                return this._scale[1];
            },
            set: function (v) {
                this._scale[1] = v;
                //this._localMatrixDirty = true;
                var ss = this._scale;
                var s = Math.sin(this._rotation);
                var c = Math.cos(this._rotation);
                this._localMatrix[1] = ss[1] * s;
                this._localMatrix[3] = ss[1] * c;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "halfSize", {
            get: function () {
                return this._halfSize;
            },
            set: function (s) {
                s2d.Vector2.copy(this._halfSize, s);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "halfSizeX", {
            get: function () {
                return this._halfSize[0];
            },
            set: function (v) {
                this._halfSize[0] = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "halfSizeY", {
            get: function () {
                return this._halfSize[1];
            },
            set: function (v) {
                this._halfSize[1] = v;
            },
            enumerable: true,
            configurable: true
        });
        /*
        private getLocalMatrix(): Matrix2d {
            let localMatrix = this._localMatrix;

            if (this._localMatrixDirty) {

                //Matrix2d.fromTranslation(localMatrix, this._position);
                //Matrix2d.scale(localMatrix,localMatrix, this._scale);
                //Matrix2d.rotate(localMatrix, localMatrix, this._rotation);

                let pp = this._position;
                let ss = this._scale;

                let s = Math.sin(this._rotation);
                let c = Math.cos(this._rotation);

                localMatrix[0] = ss[0] * c;
                localMatrix[1] = ss[1] * s;
                localMatrix[2] = ss[0] * -s;
                localMatrix[3] = ss[1] * c;
                localMatrix[4] = pp[0];
                localMatrix[5] = pp[1];

                this._localMatrixDirty = false;
            }

            return localMatrix;
        }
        */
        Transform.prototype.getLocalToGlobalMatrix = function (out) {
            s2d.Matrix2d.copy(out, this._localMatrix);
            var p = this._parent;
            while (p !== null) {
                s2d.Matrix2d.mul(out, p._localMatrix, out);
                p = p._parent;
            }
            return out;
        };
        Transform.prototype.getGlobalToLocalMatrix = function (out) {
            this.getLocalToGlobalMatrix(out);
            s2d.Matrix2d.invert(out, out);
            return out;
        };
        Transform.prototype.addChild = function (p) {
            if (this._firstChild === null) {
                this._firstChild = this._lastChild = p;
            }
            else {
                this._lastChild._nextSibling = p;
                p._prevSibling = this._lastChild;
                this._lastChild = p;
            }
        };
        Transform.prototype.removeChild = function (p) {
            if (p._nextSibling !== null)
                p._nextSibling._prevSibling = p._prevSibling;
            if (p._prevSibling !== null)
                p._prevSibling._nextSibling = p._nextSibling;
            if (p === this._firstChild)
                this._firstChild = p._nextSibling;
            if (p === this._lastChild)
                this._lastChild = p._prevSibling;
            p._nextSibling = null;
            p._prevSibling = null;
        };
        Transform.prototype.getFirstChild = function () {
            return this._firstChild;
        };
        Transform.prototype.getNextChild = function (prevChild) {
            return prevChild._nextSibling;
        };
        Transform.prototype.getComponentInChildren = function (clazz, toReturn) {
            if (clazz === s2d.Behavior)
                return this.getBehaviorInChildrenInternal(toReturn, 0);
            else if (clazz === s2d.Drawer)
                return this.getDrawerInChildrenInternal(toReturn, 0);
            return this.getComponentInChildrenInternal(clazz, toReturn, 0);
        };
        Transform.prototype.getComponentInChildrenInternal = function (clazz, toReturn, index) {
            var comp = this.getComponent(clazz);
            if (comp !== null)
                toReturn[index++] = comp;
            var child = this._firstChild;
            while (child !== null) {
                index = child.getComponentInChildrenInternal(clazz, toReturn, index);
                child = child._nextSibling;
            }
            return index;
        };
        Transform.prototype.getBehaviorInChildrenInternal = function (toReturn, index) {
            if (this.entity !== null && this.entity.firstBehavior !== null)
                toReturn[index++] = this.entity.firstBehavior;
            var child = this._firstChild;
            while (child !== null) {
                index = child.getBehaviorInChildrenInternal(toReturn, index);
                child = child._nextSibling;
            }
            return index;
        };
        Transform.prototype.getDrawerInChildrenInternal = function (toReturn, index) {
            if (this.entity !== null && this.entity.firstDrawer !== null)
                toReturn[index++] = this.entity.firstDrawer;
            var child = this._firstChild;
            while (child !== null) {
                index = child.getDrawerInChildrenInternal(toReturn, index);
                child = child._nextSibling;
            }
            return index;
        };
        Transform.MAX_NESTING = 128;
        return Transform;
    }(s2d.Component));
    s2d.Transform = Transform;
})(s2d || (s2d = {}));
//Port of glMatrix, taken from: https://github.com/toji/gl-matrix
var s2d;
(function (s2d) {
    /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE. */
    /**
     * @class 3x3 Matrix
     * @name Matrix3
     */
    var Matrix3 = (function (_super) {
        __extends(Matrix3, _super);
        function Matrix3() {
            _super.apply(this, arguments);
        }
        /**
         * Creates a new identity Matrix3
         *
         * @returns {Matrix3} a new 3x3 matrix
         */
        Matrix3.create = function () {
            var a = new Float32Array(9);
            a[0] = 1;
            a[1] = 0;
            a[2] = 0;
            a[3] = 0;
            a[4] = 1;
            a[5] = 0;
            a[6] = 0;
            a[7] = 0;
            a[8] = 1;
            return a;
        };
        ;
        /**
         * Copies the upper-left 3x3 values into the given Matrix3.
         *
         * @param {Matrix3} out the receiving 3x3 matrix
         * @param {mat4} a   the source 4x4 matrix
         * @returns {Matrix3} out
         */
        /*
        Matrix3.fromMat4 = function(out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[4];
            out[4] = a[5];
            out[5] = a[6];
            out[6] = a[8];
            out[7] = a[9];
            out[8] = a[10];
            return out;
        };
        */
        /**
         * Creates a new Matrix3 initialized with values from an existing matrix
         *
         * @param {Matrix3} a matrix to clone
         * @returns {Matrix3} a new 3x3 matrix
         */
        Matrix3.clone = function (a) {
            var out = Matrix3.create();
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            return out;
        };
        ;
        /**
         * Copy the values from one Matrix3 to another
         *
         * @param {Matrix3} out the receiving matrix
         * @param {Matrix3} a the source matrix
         * @returns {Matrix3} out
         */
        Matrix3.copy = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            return out;
        };
        ;
        /**
         * Create a new Matrix3 with the given values
         *
         * @param {Number} m00 Component in column 0, row 0 position (index 0)
         * @param {Number} m01 Component in column 0, row 1 position (index 1)
         * @param {Number} m02 Component in column 0, row 2 position (index 2)
         * @param {Number} m10 Component in column 1, row 0 position (index 3)
         * @param {Number} m11 Component in column 1, row 1 position (index 4)
         * @param {Number} m12 Component in column 1, row 2 position (index 5)
         * @param {Number} m20 Component in column 2, row 0 position (index 6)
         * @param {Number} m21 Component in column 2, row 1 position (index 7)
         * @param {Number} m22 Component in column 2, row 2 position (index 8)
         * @returns {Matrix3} A new Matrix3
         */
        Matrix3.fromValues = function (m00, m01, m02, m10, m11, m12, m20, m21, m22) {
            var out = Matrix3.create();
            out[0] = m00;
            out[1] = m01;
            out[2] = m02;
            out[3] = m10;
            out[4] = m11;
            out[5] = m12;
            out[6] = m20;
            out[7] = m21;
            out[8] = m22;
            return out;
        };
        ;
        /**
         * Set the components of a Matrix3 to the given values
         *
         * @param {Matrix3} out the receiving matrix
         * @param {Number} m00 Component in column 0, row 0 position (index 0)
         * @param {Number} m01 Component in column 0, row 1 position (index 1)
         * @param {Number} m02 Component in column 0, row 2 position (index 2)
         * @param {Number} m10 Component in column 1, row 0 position (index 3)
         * @param {Number} m11 Component in column 1, row 1 position (index 4)
         * @param {Number} m12 Component in column 1, row 2 position (index 5)
         * @param {Number} m20 Component in column 2, row 0 position (index 6)
         * @param {Number} m21 Component in column 2, row 1 position (index 7)
         * @param {Number} m22 Component in column 2, row 2 position (index 8)
         * @returns {Matrix3} out
         */
        Matrix3.set = function (out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
            out[0] = m00;
            out[1] = m01;
            out[2] = m02;
            out[3] = m10;
            out[4] = m11;
            out[5] = m12;
            out[6] = m20;
            out[7] = m21;
            out[8] = m22;
            return out;
        };
        ;
        /**
         * Set a Matrix3 to the identity matrix
         *
         * @param {Matrix3} out the receiving matrix
         * @returns {Matrix3} out
         */
        Matrix3.identity = function (out) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 1;
            out[5] = 0;
            out[6] = 0;
            out[7] = 0;
            out[8] = 1;
            return out;
        };
        ;
        /**
         * Transpose the values of a Matrix3
         *
         * @param {Matrix3} out the receiving matrix
         * @param {Matrix3} a the source matrix
         * @returns {Matrix3} out
         */
        Matrix3.transpose = function (out, a) {
            // If we are transposing ourselves we can skip a few steps but have to cache some values
            if (out === a) {
                var a01 = a[1], a02 = a[2], a12 = a[5];
                out[1] = a[3];
                out[2] = a[6];
                out[3] = a01;
                out[5] = a[7];
                out[6] = a02;
                out[7] = a12;
            }
            else {
                out[0] = a[0];
                out[1] = a[3];
                out[2] = a[6];
                out[3] = a[1];
                out[4] = a[4];
                out[5] = a[7];
                out[6] = a[2];
                out[7] = a[5];
                out[8] = a[8];
            }
            return out;
        };
        ;
        /**
         * Inverts a Matrix3
         *
         * @param {Matrix3} out the receiving matrix
         * @param {Matrix3} a the source matrix
         * @returns {Matrix3} out
         */
        Matrix3.invert = function (out, a) {
            var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], b01 = a22 * a11 - a12 * a21, b11 = -a22 * a10 + a12 * a20, b21 = a21 * a10 - a11 * a20, 
            // Calculate the determinant
            det = a00 * b01 + a01 * b11 + a02 * b21;
            if (!det) {
                return null;
            }
            det = 1.0 / det;
            out[0] = b01 * det;
            out[1] = (-a22 * a01 + a02 * a21) * det;
            out[2] = (a12 * a01 - a02 * a11) * det;
            out[3] = b11 * det;
            out[4] = (a22 * a00 - a02 * a20) * det;
            out[5] = (-a12 * a00 + a02 * a10) * det;
            out[6] = b21 * det;
            out[7] = (-a21 * a00 + a01 * a20) * det;
            out[8] = (a11 * a00 - a01 * a10) * det;
            return out;
        };
        ;
        /**
         * Calculates the adjugate of a Matrix3
         *
         * @param {Matrix3} out the receiving matrix
         * @param {Matrix3} a the source matrix
         * @returns {Matrix3} out
         */
        Matrix3.adjoint = function (out, a) {
            var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8];
            out[0] = (a11 * a22 - a12 * a21);
            out[1] = (a02 * a21 - a01 * a22);
            out[2] = (a01 * a12 - a02 * a11);
            out[3] = (a12 * a20 - a10 * a22);
            out[4] = (a00 * a22 - a02 * a20);
            out[5] = (a02 * a10 - a00 * a12);
            out[6] = (a10 * a21 - a11 * a20);
            out[7] = (a01 * a20 - a00 * a21);
            out[8] = (a00 * a11 - a01 * a10);
            return out;
        };
        ;
        /**
         * Calculates the determinant of a Matrix3
         *
         * @param {Matrix3} a the source matrix
         * @returns {Number} determinant of a
         */
        Matrix3.determinant = function (a) {
            var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8];
            return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
        };
        ;
        /**
         * Multiplies two Matrix3's
         *
         * @param {Matrix3} out the receiving matrix
         * @param {Matrix3} a the first operand
         * @param {Matrix3} b the second operand
         * @returns {Matrix3} out
         */
        Matrix3.mul = function (out, a, b) {
            var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], b00 = b[0], b01 = b[1], b02 = b[2], b10 = b[3], b11 = b[4], b12 = b[5], b20 = b[6], b21 = b[7], b22 = b[8];
            out[0] = b00 * a00 + b01 * a10 + b02 * a20;
            out[1] = b00 * a01 + b01 * a11 + b02 * a21;
            out[2] = b00 * a02 + b01 * a12 + b02 * a22;
            out[3] = b10 * a00 + b11 * a10 + b12 * a20;
            out[4] = b10 * a01 + b11 * a11 + b12 * a21;
            out[5] = b10 * a02 + b11 * a12 + b12 * a22;
            out[6] = b20 * a00 + b21 * a10 + b22 * a20;
            out[7] = b20 * a01 + b21 * a11 + b22 * a21;
            out[8] = b20 * a02 + b21 * a12 + b22 * a22;
            return out;
        };
        ;
        /**
         * Translate a Matrix3 by the given vector
         *
         * @param {Matrix3} out the receiving matrix
         * @param {Matrix3} a the matrix to translate
         * @param {Vector2} v vector to translate by
         * @returns {Matrix3} out
         */
        Matrix3.translate = function (out, a, v) {
            var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], x = v[0], y = v[1];
            out[0] = a00;
            out[1] = a01;
            out[2] = a02;
            out[3] = a10;
            out[4] = a11;
            out[5] = a12;
            out[6] = x * a00 + y * a10 + a20;
            out[7] = x * a01 + y * a11 + a21;
            out[8] = x * a02 + y * a12 + a22;
            return out;
        };
        ;
        /**
         * Rotates a Matrix3 by the given angle
         *
         * @param {Matrix3} out the receiving matrix
         * @param {Matrix3} a the matrix to rotate
         * @param {Number} rad the angle to rotate the matrix by
         * @returns {Matrix3} out
         */
        Matrix3.rotate = function (out, a, rad) {
            var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], s = Math.sin(rad), c = Math.cos(rad);
            out[0] = c * a00 + s * a10;
            out[1] = c * a01 + s * a11;
            out[2] = c * a02 + s * a12;
            out[3] = c * a10 - s * a00;
            out[4] = c * a11 - s * a01;
            out[5] = c * a12 - s * a02;
            out[6] = a20;
            out[7] = a21;
            out[8] = a22;
            return out;
        };
        ;
        /**
         * Scales the Matrix3 by the dimensions in the given Vector2
         *
         * @param {Matrix3} out the receiving matrix
         * @param {Matrix3} a the matrix to rotate
         * @param {Vector2} v the Vector2 to scale the matrix by
         * @returns {Matrix3} out
         **/
        Matrix3.scale = function (out, a, v) {
            var x = v[0], y = v[1];
            out[0] = x * a[0];
            out[1] = x * a[1];
            out[2] = x * a[2];
            out[3] = y * a[3];
            out[4] = y * a[4];
            out[5] = y * a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            return out;
        };
        ;
        /**
         * Creates a matrix from a vector translation
         * This is equivalent to (but much faster than):
         *
         *     Matrix3.identity(dest);
         *     Matrix3.translate(dest, dest, vec);
         *
         * @param {Matrix3} out Matrix3 receiving operation result
         * @param {Vector2} v Translation vector
         * @returns {Matrix3} out
         */
        Matrix3.fromTranslation = function (out, v) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 1;
            out[5] = 0;
            out[6] = v[0];
            out[7] = v[1];
            out[8] = 1;
            return out;
        };
        /**
         * Creates a matrix from a given angle
         * This is equivalent to (but much faster than):
         *
         *     Matrix3.identity(dest);
         *     Matrix3.rotate(dest, dest, rad);
         *
         * @param {Matrix3} out Matrix3 receiving operation result
         * @param {Number} rad the angle to rotate the matrix by
         * @returns {Matrix3} out
         */
        Matrix3.fromRotation = function (out, rad) {
            var s = Math.sin(rad), c = Math.cos(rad);
            out[0] = c;
            out[1] = s;
            out[2] = 0;
            out[3] = -s;
            out[4] = c;
            out[5] = 0;
            out[6] = 0;
            out[7] = 0;
            out[8] = 1;
            return out;
        };
        /**
         * Creates a matrix from a vector scaling
         * This is equivalent to (but much faster than):
         *
         *     Matrix3.identity(dest);
         *     Matrix3.scale(dest, dest, vec);
         *
         * @param {Matrix3} out Matrix3 receiving operation result
         * @param {Vector2} v Scaling vector
         * @returns {Matrix3} out
         */
        Matrix3.fromScaling = function (out, v) {
            out[0] = v[0];
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = v[1];
            out[5] = 0;
            out[6] = 0;
            out[7] = 0;
            out[8] = 1;
            return out;
        };
        /**
         * Copies the values from a Matrix2d into a Matrix3
         *
         * @param {Matrix3} out the receiving matrix
         * @param {Matrix2d} a the matrix to copy
         * @returns {Matrix3} out
         **/
        Matrix3.fromMat2d = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = 0;
            out[3] = a[2];
            out[4] = a[3];
            out[5] = 0;
            out[6] = a[4];
            out[7] = a[5];
            out[8] = 1;
            return out;
        };
        ;
        /**
        * Calculates a 3x3 matrix from the given quaternion
        *
        * @param {Matrix3} out Matrix3 receiving operation result
        * @param {quat} q Quaternion to create matrix from
        *
        * @returns {Matrix3} out
        */
        /*
        Matrix3.fromQuat = function (out, q) {
            let x = q[0], y = q[1], z = q[2], w = q[3],
                x2 = x + x,
                y2 = y + y,
                z2 = z + z,

                xx = x * x2,
                yx = y * x2,
                yy = y * y2,
                zx = z * x2,
                zy = z * y2,
                zz = z * z2,
                wx = w * x2,
                wy = w * y2,
                wz = w * z2;

            out[0] = 1 - yy - zz;
            out[3] = yx - wz;
            out[6] = zx + wy;

            out[1] = yx + wz;
            out[4] = 1 - xx - zz;
            out[7] = zy - wx;

            out[2] = zx - wy;
            out[5] = zy + wx;
            out[8] = 1 - xx - yy;

            return out;
        };
        */
        /**
        * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
        *
        * @param {Matrix3} out Matrix3 receiving operation result
        * @param {mat4} a Mat4 to derive the normal matrix from
        *
        * @returns {Matrix3} out
        */
        /*
        Matrix3.normalFromMat4 = function (out, a) {
            let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
                a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
                a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
                a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

                b00 = a00 * a11 - a01 * a10,
                b01 = a00 * a12 - a02 * a10,
                b02 = a00 * a13 - a03 * a10,
                b03 = a01 * a12 - a02 * a11,
                b04 = a01 * a13 - a03 * a11,
                b05 = a02 * a13 - a03 * a12,
                b06 = a20 * a31 - a21 * a30,
                b07 = a20 * a32 - a22 * a30,
                b08 = a20 * a33 - a23 * a30,
                b09 = a21 * a32 - a22 * a31,
                b10 = a21 * a33 - a23 * a31,
                b11 = a22 * a33 - a23 * a32,

                // Calculate the determinant
                det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

            if (!det) {
                return null;
            }
            det = 1.0 / det;

            out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
            out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
            out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

            out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
            out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
            out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

            out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
            out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
            out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

            return out;
        };
        */
        /**
         * Returns a string representation of a Matrix3
         *
         * @param {Matrix3} a matrix to represent as a string
         * @returns {String} string representation of the matrix
         */
        Matrix3.toString = function (a) {
            return 'Matrix3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' +
                a[3] + ', ' + a[4] + ', ' + a[5] + ', ' +
                a[6] + ', ' + a[7] + ', ' + a[8] + ')';
        };
        ;
        /**
         * Returns Frobenius norm of a Matrix3
         *
         * @param {Matrix3} a the matrix to calculate Frobenius norm of
         * @returns {Number} Frobenius norm
         */
        Matrix3.frob = function (a) {
            return (Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2)));
        };
        ;
        /**
         * Adds two Matrix3's
         *
         * @param {Matrix3} out the receiving matrix
         * @param {Matrix3} a the first operand
         * @param {Matrix3} b the second operand
         * @returns {Matrix3} out
         */
        Matrix3.add = function (out, a, b) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            out[2] = a[2] + b[2];
            out[3] = a[3] + b[3];
            out[4] = a[4] + b[4];
            out[5] = a[5] + b[5];
            out[6] = a[6] + b[6];
            out[7] = a[7] + b[7];
            out[8] = a[8] + b[8];
            return out;
        };
        ;
        /**
         * Subtracts matrix b from matrix a
         *
         * @param {Matrix3} out the receiving matrix
         * @param {Matrix3} a the first operand
         * @param {Matrix3} b the second operand
         * @returns {Matrix3} out
         */
        Matrix3.sub = function (out, a, b) {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            out[2] = a[2] - b[2];
            out[3] = a[3] - b[3];
            out[4] = a[4] - b[4];
            out[5] = a[5] - b[5];
            out[6] = a[6] - b[6];
            out[7] = a[7] - b[7];
            out[8] = a[8] - b[8];
            return out;
        };
        ;
        /**
         * Multiply each element of the matrix by a scalar.
         *
         * @param {Matrix3} out the receiving matrix
         * @param {Matrix3} a the matrix to scale
         * @param {Number} b amount to scale the matrix's elements by
         * @returns {Matrix3} out
         */
        Matrix3.multiplyScalar = function (out, a, b) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            out[2] = a[2] * b;
            out[3] = a[3] * b;
            out[4] = a[4] * b;
            out[5] = a[5] * b;
            out[6] = a[6] * b;
            out[7] = a[7] * b;
            out[8] = a[8] * b;
            return out;
        };
        ;
        /**
         * Adds two Matrix3's after multiplying each element of the second operand by a scalar value.
         *
         * @param {Matrix3} out the receiving vector
         * @param {Matrix3} a the first operand
         * @param {Matrix3} b the second operand
         * @param {Number} scale the amount to scale b's elements by before adding
         * @returns {Matrix3} out
         */
        Matrix3.multiplyScalarAndAdd = function (out, a, b, scale) {
            out[0] = a[0] + (b[0] * scale);
            out[1] = a[1] + (b[1] * scale);
            out[2] = a[2] + (b[2] * scale);
            out[3] = a[3] + (b[3] * scale);
            out[4] = a[4] + (b[4] * scale);
            out[5] = a[5] + (b[5] * scale);
            out[6] = a[6] + (b[6] * scale);
            out[7] = a[7] + (b[7] * scale);
            out[8] = a[8] + (b[8] * scale);
            return out;
        };
        ;
        /**
         * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
         *
         * @param {Matrix3} a The first matrix.
         * @param {Matrix3} b The second matrix.
         * @returns {Boolean} True if the matrices are equal, false otherwise.
         */
        Matrix3.exactEquals = function (a, b) {
            return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] &&
                a[3] === b[3] && a[4] === b[4] && a[5] === b[5] &&
                a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
        };
        ;
        /**
         * Returns whether or not the matrices have approximately the same elements in the same position.
         *
         * @param {Matrix3} a The first matrix.
         * @param {Matrix3} b The second matrix.
         * @returns {Boolean} True if the matrices are equal, false otherwise.
         */
        Matrix3.equals = function (a, b) {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7], a8 = a[8];
            var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = a[6], b7 = b[7], b8 = b[8];
            return (Math.abs(a0 - b0) <= s2d.SMath.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
                Math.abs(a1 - b1) <= s2d.SMath.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
                Math.abs(a2 - b2) <= s2d.SMath.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
                Math.abs(a3 - b3) <= s2d.SMath.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
                Math.abs(a4 - b4) <= s2d.SMath.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
                Math.abs(a5 - b5) <= s2d.SMath.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) &&
                Math.abs(a6 - b6) <= s2d.SMath.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) &&
                Math.abs(a7 - b7) <= s2d.SMath.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) &&
                Math.abs(a8 - b8) <= s2d.SMath.EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8)));
        };
        ;
        return Matrix3;
    }(Float32Array));
    s2d.Matrix3 = Matrix3;
})(s2d || (s2d = {}));
//Port of glMatrix, taken from: https://github.com/toji/gl-matrix
var s2d;
(function (s2d) {
    /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE. */
    /**
     * @class 2 Dimensional Vector
     * @name Vector2
     */
    var Vector2 = (function (_super) {
        __extends(Vector2, _super);
        function Vector2() {
            _super.apply(this, arguments);
        }
        /**
         * Creates a new, empty Vector2
         *
         * @returns {Vector2} a new 2D vector
         */
        Vector2.create = function () {
            var a = new Float32Array(2);
            a[0] = 0;
            a[1] = 0;
            return a;
        };
        /**
         * Creates a new Vector2 initialized with values from an existing vector
         *
         * @param {Vector2} a vector to clone
         * @returns {Vector2} a new 2D vector
         */
        Vector2.clone = function (a) {
            var out = Vector2.create();
            out[0] = a[0];
            out[1] = a[1];
            return out;
        };
        /**
         * Creates a new Vector2 initialized with the given values
         *
         * @param {Number} x X component
         * @param {Number} y Y component
         * @returns {Vector2} a new 2D vector
         */
        Vector2.fromValues = function (x, y) {
            var out = Vector2.create();
            out[0] = x;
            out[1] = y;
            return out;
        };
        /**
         * Copy the values from one Vector2 to another
         *
         * @param {Vector2} out the receiving vector
         * @param {Vector2} a the source vector
         * @returns {Vector2} out
         */
        Vector2.copy = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            return out;
        };
        /**
         * Set the components of a Vector2 to the given values
         *
         * @param {Vector2} out the receiving vector
         * @param {Number} x X component
         * @param {Number} y Y component
         * @returns {Vector2} out
         */
        Vector2.set = function (out, x, y) {
            out[0] = x;
            out[1] = y;
            return out;
        };
        /**
         * Adds two Vector2's
         *
         * @param {Vector2} out the receiving vector
         * @param {Vector2} a the first operand
         * @param {Vector2} b the second operand
         * @returns {Vector2} out
         */
        Vector2.add = function (out, a, b) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            return out;
        };
        /**
         * Subtracts vector b from vector a
         *
         * @param {Vector2} out the receiving vector
         * @param {Vector2} a the first operand
         * @param {Vector2} b the second operand
         * @returns {Vector2} out
         */
        Vector2.sub = function (out, a, b) {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            return out;
        };
        /**
         * Multiplies two Vector2's
         *
         * @param {Vector2} out the receiving vector
         * @param {Vector2} a the first operand
         * @param {Vector2} b the second operand
         * @returns {Vector2} out
         */
        Vector2.mul = function (out, a, b) {
            out[0] = a[0] * b[0];
            out[1] = a[1] * b[1];
            return out;
        };
        /**
         * Divides two Vector2's
         *
         * @param {Vector2} out the receiving vector
         * @param {Vector2} a the first operand
         * @param {Vector2} b the second operand
         * @returns {Vector2} out
         */
        Vector2.div = function (out, a, b) {
            out[0] = a[0] / b[0];
            out[1] = a[1] / b[1];
            return out;
        };
        /**
         * Math.floor the components of a Vector2
         *
         * @param {Vector2} out the receiving vector
         * @param {Vector2} a vector to floor
         * @returns {Vector2} out
         */
        Vector2.floor = function (out, a) {
            out[0] = Math.floor(a[0]);
            out[1] = Math.floor(a[1]);
            return out;
        };
        /**
         * Returns the minimum of two Vector2's
         *
         * @param {Vector2} out the receiving vector
         * @param {Vector2} a the first operand
         * @param {Vector2} b the second operand
         * @returns {Vector2} out
         */
        Vector2.min = function (out, a, b) {
            out[0] = Math.min(a[0], b[0]);
            out[1] = Math.min(a[1], b[1]);
            return out;
        };
        /**
         * Math.round the components of a Vector2
         *
         * @param {Vector2} out the receiving vector
         * @param {Vector2} a vector to round
         * @returns {Vector2} out
         */
        Vector2.round = function (out, a) {
            out[0] = Math.round(a[0]);
            out[1] = Math.round(a[1]);
            return out;
        };
        /**
         * Calculates the length of a Vector2
         *
         * @param {Vector2} a vector to calculate length of
         * @returns {Number} length of a
         */
        Vector2.len = function (a) {
            var x = a[0], y = a[1];
            return Math.sqrt(x * x + y * y);
        };
        /**
         * Calculates the squared length of a Vector2
         *
         * @param {Vector2} a vector to calculate squared length of
         * @returns {Number} squared length of a
         */
        Vector2.sqrLen = function (a) {
            var x = a[0], y = a[1];
            return x * x + y * y;
        };
        /**
         * Negates the components of a Vector2
         *
         * @param {Vector2} out the receiving vector
         * @param {Vector2} a vector to negate
         * @returns {Vector2} out
         */
        Vector2.negate = function (out, a) {
            out[0] = -a[0];
            out[1] = -a[1];
            return out;
        };
        /**
         * Returns the inverse of the components of a Vector2
         *
         * @param {Vector2} out the receiving vector
         * @param {Vector2} a vector to invert
         * @returns {Vector2} out
         */
        Vector2.inverse = function (out, a) {
            out[0] = 1.0 / a[0];
            out[1] = 1.0 / a[1];
            return out;
        };
        /**
         * Normalize a Vector2
         *
         * @param {Vector2} out the receiving vector
         * @param {Vector2} a vector to normalize
         * @returns {Vector2} out
         */
        Vector2.normalize = function (out, a) {
            var x = a[0], y = a[1];
            var len = x * x + y * y;
            if (len > 0) {
                //TODO: evaluate use of glm_invsqrt here?
                len = 1 / Math.sqrt(len);
                out[0] = a[0] * len;
                out[1] = a[1] * len;
            }
            return out;
        };
        /**
         * Calculates the dot product of two Vector2's
         *
         * @param {Vector2} a the first operand
         * @param {Vector2} b the second operand
         * @returns {Number} dot product of a and b
         */
        Vector2.dot = function (a, b) {
            return a[0] * b[0] + a[1] * b[1];
        };
        /**
         * Computes the cross product of two Vector2's
         * Note that the cross product must by definition produce a 3D vector
         *
         * @param {vec3} out the receiving vector
         * @param {Vector2} a the first operand
         * @param {Vector2} b the second operand
         * @returns {vec3} out
         */
        /*
        Vector2.cross = function(out, a, b) {
            let z = a[0] * b[1] - a[1] * b[0];
            out[0] = out[1] = 0;
            out[2] = z;
            return out;
        }
        */
        /**
         * Performs a linear interpolation between two Vector2's
         *
         * @param {Vector2} out the receiving vector
         * @param {Vector2} a the first operand
         * @param {Vector2} b the second operand
         * @param {Number} t interpolation amount between the two inputs
         * @returns {Vector2} out
         */
        Vector2.lerp = function (out, a, b, t) {
            var ax = a[0], ay = a[1];
            out[0] = ax + t * (b[0] - ax);
            out[1] = ay + t * (b[1] - ay);
            return out;
        };
        /**
         * Generates a random vector with the given scale
         *
         * @param {Vector2} out the receiving vector
         * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
         * @returns {Vector2} out
         */
        Vector2.random = function (out, scale) {
            var r = Math.random() * 2.0 * Math.PI;
            out[0] = Math.cos(r) * scale;
            out[1] = Math.sin(r) * scale;
            return out;
        };
        /**
         * Transforms the Vector2 with a Matrix2
         *
         * @param {Vector2} out the receiving vector
         * @param {Vector2} a the vector to transform
         * @param {Matrix2} m matrix to transform with
         * @returns {Vector2} out
         */
        Vector2.transformMat2 = function (out, a, m) {
            var x = a[0], y = a[1];
            out[0] = m[0] * x + m[2] * y;
            out[1] = m[1] * x + m[3] * y;
            return out;
        };
        /**
         * Transforms the Vector2 with a Matrix2d
         *
         * @param {Vector2} out the receiving vector
         * @param {Vector2} a the vector to transform
         * @param {Matrix2d} m matrix to transform with
         * @returns {Vector2} out
         */
        Vector2.transformMat2d = function (out, a, m) {
            var x = a[0], y = a[1];
            out[0] = m[0] * x + m[2] * y + m[4];
            out[1] = m[1] * x + m[3] * y + m[5];
            return out;
        };
        /**
         * Transforms the Vector2 with a mat4
         * 3rd vector component is implicitly '0'
         * 4th vector component is implicitly '1'
         *
         * @param {Vector2} out the receiving vector
         * @param {Vector2} a the vector to transform
         * @param {mat4} m matrix to transform with
         * @returns {Vector2} out
         */
        /*
        Vector2.transformMat4 = function(out, a, m) {
            let x = a[0],
                y = a[1];
            out[0] = m[0] * x + m[4] * y + m[12];
            out[1] = m[1] * x + m[5] * y + m[13];
            return out;
        }
        */
        /**
         * Perform some operation over an array of vec2s.
         *
         * @param {Array} a the array of vectors to iterate over
         * @param {Number} stride Number of elements between the start of each Vector2. If 0 assumes tightly packed
         * @param {Number} offset Number of elements to skip at the beginning of the array
         * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
         * @param {Function} fn Function to call for each vector in the array
         * @param {Object} [arg] additional argument to pass to fn
         * @returns {Array} a
         * @function
         */
        /*
        Vector2.forEach = (function() {
            let vec = Vector2.create();

            return function(a, stride, offset, count, fn, arg) {
                let i, l;
                if(!stride) {
                    stride = 2;
                }

                if(!offset) {
                    offset = 0;
                }
                
                if(count) {
                    l = Math.min((count * stride) + offset, a.length);
                } else {
                    l = a.length;
                }

                for(i = offset; i < l; i += stride) {
                    vec[0] = a[i]; vec[1] = a[i+1];
                    fn(vec, vec, arg);
                    a[i] = vec[0]; a[i+1] = vec[1];
                }
                
                return a;
            }
        })();
        */
        /**
         * Returns a string representation of a vector
         *
         * @param {Vector2} a vector to represent as a string
         * @returns {String} string representation of the vector
         */
        Vector2.toString = function (a) {
            return 'Vector2(' + a[0].toFixed(2) + ', ' + a[1].toFixed(2) + ')';
        };
        /**
         * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
         *
         * @param {Vector2} a The first vector.
         * @param {Vector2} b The second vector.
         * @returns {Boolean} True if the vectors are equal, false otherwise.
         */
        Vector2.exactEquals = function (a, b) {
            return a[0] === b[0] && a[1] === b[1];
        };
        /**
         * Returns whether or not the vectors have approximately the same elements in the same position.
         *
         * @param {Vector2} a The first vector.
         * @param {Vector2} b The second vector.
         * @returns {Boolean} True if the vectors are equal, false otherwise.
         */
        Vector2.equals = function (a, b) {
            var a0 = a[0], a1 = a[1];
            var b0 = b[0], b1 = b[1];
            return (Math.abs(a0 - b0) <= s2d.SMath.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
                Math.abs(a1 - b1) <= s2d.SMath.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)));
        };
        /**
         * Math.ceil the components of a Vector2
         *
         * @param {Vector2} out the receiving vector
         * @param {Vector2} a vector to ceil
         * @returns {Vector2} out
         */
        Vector2.ceil = function (out, a) {
            out[0] = Math.ceil(a[0]);
            out[1] = Math.ceil(a[1]);
            return out;
        };
        /**
         * Returns the maximum of two Vector2's
         *
         * @param {Vector2} out the receiving vector
         * @param {Vector2} a the first operand
         * @param {Vector2} b the second operand
         * @returns {Vector2} out
         */
        Vector2.max = function (out, a, b) {
            out[0] = Math.max(a[0], b[0]);
            out[1] = Math.max(a[1], b[1]);
            return out;
        };
        /**
         * Scales a Vector2 by a scalar number
         *
         * @param {Vector2} out the receiving vector
         * @param {Vector2} a the vector to scale
         * @param {Number} b amount to scale the vector by
         * @returns {Vector2} out
         */
        Vector2.scale = function (out, a, b) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            return out;
        };
        /**
         * Adds two Vector2's after scaling the second operand by a scalar value
         *
         * @param {Vector2} out the receiving vector
         * @param {Vector2} a the first operand
         * @param {Vector2} b the second operand
         * @param {Number} scale the amount to scale b by before adding
         * @returns {Vector2} out
         */
        Vector2.scaleAndAdd = function (out, a, b, scale) {
            out[0] = a[0] + (b[0] * scale);
            out[1] = a[1] + (b[1] * scale);
            return out;
        };
        /**
         * Calculates the euclidian distance between two Vector2's
         *
         * @param {Vector2} a the first operand
         * @param {Vector2} b the second operand
         * @returns {Number} distance between a and b
         */
        Vector2.dist = function (a, b) {
            var x = b[0] - a[0], y = b[1] - a[1];
            return Math.sqrt(x * x + y * y);
        };
        /**
         * Calculates the squared euclidian distance between two Vector2's
         *
         * @param {Vector2} a the first operand
         * @param {Vector2} b the second operand
         * @returns {Number} squared distance between a and b
         */
        Vector2.sqrDist = function (a, b) {
            var x = b[0] - a[0], y = b[1] - a[1];
            return x * x + y * y;
        };
        /**
         * Transforms the Vector2 with a mat3
         * 3rd vector component is implicitly '1'
         *
         * @param {Vector2} out the receiving vector
         * @param {Vector2} a the vector to transform
         * @param {mat3} m matrix to transform with
         * @returns {Vector2} out
         */
        Vector2.transformMat3 = function (out, a, m) {
            var x = a[0], y = a[1];
            out[0] = m[0] * x + m[3] * y + m[6];
            out[1] = m[1] * x + m[4] * y + m[7];
            return out;
        };
        return Vector2;
    }(Float32Array));
    s2d.Vector2 = Vector2;
})(s2d || (s2d = {}));
/// <reference path="Component.ts" />
/// <reference path="../Math/Matrix3.ts" />
/// <reference path="../Math/Vector2.ts" />
var s2d;
(function (s2d) {
    var Drawer = (function (_super) {
        __extends(Drawer, _super);
        function Drawer() {
            _super.apply(this, arguments);
        }
        Drawer.initStatic = function () {
            Drawer.tmpMatrix = s2d.Matrix3.create();
            Drawer.tmpVector = s2d.Vector2.create();
        };
        Drawer.prototype.draw = function (commands) {
        };
        return Drawer;
    }(s2d.Component));
    s2d.Drawer = Drawer;
})(s2d || (s2d = {}));
/// <reference path="../Component/Component.ts" />
/// <reference path="../Component/Transform.ts" />
/// <reference path="../Component/Drawer.ts" />
var s2d;
(function (s2d) {
    var Entity = (function () {
        function Entity(name) {
            if (name === void 0) { name = "Entity"; }
            this._name = "Entity";
            this._transform = null;
            this._firstDrawer = null;
            this._firstBehavior = null;
            //First component in the entity
            this._firstComponent = null;
            this._name = name;
            this._transform = this.addComponent(s2d.Transform);
        }
        Object.defineProperty(Entity.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (s) {
                this._name = s;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "transform", {
            get: function () {
                return this._transform;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "firstBehavior", {
            get: function () {
                return this._firstBehavior;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "firstDrawer", {
            get: function () {
                return this._firstDrawer;
            },
            enumerable: true,
            configurable: true
        });
        Entity.prototype.addComponent = function (clazz) {
            var comp = new clazz();
            var tmp = this._firstComponent;
            this._firstComponent = comp;
            comp.__internal_nextComponent = tmp;
            if (comp instanceof s2d.Drawer)
                this._firstDrawer = comp;
            if (comp instanceof s2d.Behavior)
                this._firstBehavior = comp;
            comp.init(this);
            return comp;
        };
        Entity.prototype.getComponent = function (clazz) {
            var comp = this._firstComponent;
            while (comp !== null) {
                if (comp instanceof clazz)
                    return comp;
                comp = comp.__internal_nextComponent;
            }
            return null;
        };
        Entity.prototype.getComponentInChildren = function (clazz, toReturn) {
            return this._transform.getComponentInChildren(clazz, toReturn);
        };
        return Entity;
    }());
    s2d.Entity = Entity;
})(s2d || (s2d = {}));
/// <reference path="Entity.ts" />
var s2d;
(function (s2d) {
    var EntityManager = (function () {
        function EntityManager() {
            this._root = new s2d.Transform();
            this.tmpBehaviors = new Array(1024);
        }
        Object.defineProperty(EntityManager.prototype, "root", {
            get: function () {
                return this._root;
            },
            enumerable: true,
            configurable: true
        });
        EntityManager.prototype.getComponentInChildren = function (clazz, toReturn) {
            return this._root.getComponentInChildren(clazz, toReturn);
        };
        EntityManager.prototype.update = function () {
            var behaviors = this.tmpBehaviors;
            var behaviorsLen = this.getComponentInChildren(s2d.Behavior, behaviors);
            for (var i = 0; i < behaviorsLen; i++) {
                var behavior = behaviors[i];
                behavior.update();
            }
        };
        return EntityManager;
    }());
    s2d.EntityManager = EntityManager;
})(s2d || (s2d = {}));
var s2d;
(function (s2d) {
    var Time = (function () {
        function Time() {
        }
        Time.initStatic = function () {
            Time.deltaTime = 0;
        };
        return Time;
    }());
    s2d.Time = Time;
})(s2d || (s2d = {}));
/// <reference path="Input/InputManager.ts" />
/// <reference path="Render/RenderManager.ts" />
/// <reference path="Entity/EntityManager.ts" />
/// <reference path="Util/Time.ts" />
var s2d;
(function (s2d) {
    var Engine = (function () {
        function Engine() {
            this.lastUpdateTime = 0;
        }
        Object.defineProperty(Engine.prototype, "renderer", {
            get: function () {
                return this._renderer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Engine.prototype, "input", {
            get: function () {
                return this._input;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Engine.prototype, "entities", {
            get: function () {
                return this._entities;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Engine.prototype, "stats", {
            get: function () {
                return this._stats;
            },
            enumerable: true,
            configurable: true
        });
        Engine.prototype.init = function () {
            s2d.Drawer.initStatic();
            s2d.TextDrawer.initStatic();
            s2d.Time.initStatic();
            this._renderer = new s2d.RenderManager();
            this._input = new s2d.InputManager();
            this._entities = new s2d.EntityManager();
            this._stats = new s2d.Stats();
            this._stats.init();
            //Global vars initialization
            s2d.input = this._input;
            s2d.renderer = this._renderer;
            s2d.entities = this._entities;
        };
        Engine.prototype.update = function () {
            var now = Date.now() / 1000;
            if (this.lastUpdateTime === 0)
                s2d.Time.deltaTime = 1 / 60; //assume 60 fps in first frame, so Time.deltaTime is never 0!
            else
                s2d.Time.deltaTime = now - this.lastUpdateTime;
            this.lastUpdateTime = now;
            if (this._renderer.contextLost) {
                //Context lost, don't do anything else
                return;
            }
            this._stats.startFrame();
            this._stats.startUpdate();
            //Update input
            this._input.update();
            //Call update() on all Behaviors
            this._entities.update();
            //Render
            this._renderer.draw();
            this._stats.endUpdate();
            this._stats.endFrame();
        };
        return Engine;
    }());
    s2d.Engine = Engine;
    s2d.engine = new Engine();
})(s2d || (s2d = {}));
/// <reference path="Simple2DEngine/Engine.ts" />
window.onload = function () {
    s2d.engine.init();
    //Creat main game logic entity
    new s2d.Entity("GameLogic").addComponent(GameLogic);
    requestAnimationFrame(update);
};
function update() {
    s2d.engine.update();
    requestAnimationFrame(update);
}
var s2d;
(function (s2d) {
    var Behavior = (function (_super) {
        __extends(Behavior, _super);
        function Behavior() {
            _super.apply(this, arguments);
        }
        Behavior.prototype.update = function () {
        };
        return Behavior;
    }(s2d.Component));
    s2d.Behavior = Behavior;
})(s2d || (s2d = {}));
/// <reference path="../Simple2DEngine/Component/Behavior.ts" />
var GameLogic = (function (_super) {
    __extends(GameLogic, _super);
    function GameLogic() {
        _super.apply(this, arguments);
        this.entities = new Array();
    }
    GameLogic.prototype.onInit = function () {
        this.texture = new s2d.RenderTexture(s2d.renderer.gl, "assets/test.png", false);
        this.font = new s2d.RenderFont(s2d.renderer.gl, "assets/font.xml");
        this.cam = s2d.EntityFactory.buildCamera();
        this.initTestComplex();
        //this.initTestSimple();
        this.textFPS = s2d.EntityFactory.buildTextDrawer(this.font);
        this.textFPS.entity.transform.localX = 8;
        this.textFPS.entity.transform.localY = 0;
    };
    GameLogic.prototype.initTestSimple = function () {
        var e1 = s2d.EntityFactory.buildTextureDrawer(this.texture).entity;
        var e2 = s2d.EntityFactory.buildTextureDrawer(this.texture).entity;
        var e3 = s2d.EntityFactory.buildTextureDrawer(this.texture).entity;
        e1.transform.localX = 300;
        e1.transform.localY = 300;
        e2.transform.parent = e1.transform;
        e2.transform.localX = 200;
        e3.transform.parent = e2.transform;
        e3.transform.localX = 100;
        this.entities.push(e1);
        this.entities.push(e2);
        this.entities.push(e3);
    };
    GameLogic.prototype.initTestComplex = function () {
        var sWidth = s2d.engine.renderer.screenWidth;
        var sHeight = s2d.engine.renderer.screenHeight;
        for (var i = 0; i < GameLogic.RECTS_COUNT; i++) {
            var e = s2d.EntityFactory.buildTextureDrawer(this.texture).entity;
            e.name = "Entity " + i;
            e.transform.localX = s2d.SMath.randomInRangeFloat(100, sWidth - 200);
            e.transform.localY = s2d.SMath.randomInRangeFloat(100, sHeight - 200);
            if (GameLogic.TEST_NESTING) {
                if (i > 0 && i % 3 == 0)
                    e.transform.parent = this.entities[i - 2].transform;
                if (i > 0 && i % 5 == 0)
                    e.transform.parent = this.entities[i - 4].transform;
                if (i > 0 && i % 7 == 0)
                    e.transform.parent = this.entities[i - 6].transform;
            }
            this.entities.push(e);
        }
    };
    GameLogic.prototype.update = function () {
        if (GameLogic.TEST_MOVING) {
            var entities = this.entities;
            for (var i = 0; i < entities.length; i++)
                entities[i].transform.localRotationDegrees += 360 * s2d.Time.deltaTime;
        }
        if (s2d.input.pointerDown)
            this.cam.clearColor.rgbaHex = 0xFF0000FF; //ref
        else
            this.cam.clearColor.rgbaHex = 0x000000FF; //black
        var stats = s2d.engine.stats;
        if (stats.lastFps !== this.lastFps || stats.lastUpdateTime !== this.lastUpdateTime) {
            this.textFPS.text = "fps: " + Math.round(s2d.engine.stats.lastFps) + " updateTime: " + s2d.engine.stats.lastUpdateTime.toFixed(2) + " ms";
            this.lastFps = stats.lastFps;
            this.lastUpdateTime = stats.lastUpdateTime;
        }
    };
    GameLogic.TEST_NESTING = true;
    GameLogic.TEST_MOVING = true;
    GameLogic.RECTS_COUNT = 8192;
    return GameLogic;
}(s2d.Behavior));
/// <reference path="Component.ts" />
var s2d;
(function (s2d) {
    var Camera = (function (_super) {
        __extends(Camera, _super);
        function Camera() {
            _super.apply(this, arguments);
            this.clearDepthBuffer = false;
            this.clearColorBuffer = true;
            this.clearColor = s2d.Color.fromRgba(0, 0, 0, 255);
        }
        return Camera;
    }(s2d.Component));
    s2d.Camera = Camera;
})(s2d || (s2d = {}));
/// <reference path="Component.ts" />
/// <reference path="../Math/Matrix3.ts" />
/// <reference path="../Math/Vector2.ts" />
var s2d;
(function (s2d) {
    var TextDrawer = (function (_super) {
        __extends(TextDrawer, _super);
        function TextDrawer() {
            _super.apply(this, arguments);
            this.color = s2d.Color.fromRgba(255, 255, 255, 255);
            this.text = "Nice FPS drawing!!";
        }
        TextDrawer.initStatic = function () {
            TextDrawer.tmpUVTopLeft = s2d.Vector2.create();
            TextDrawer.tmpUVBottomRight = s2d.Vector2.create();
            TextDrawer.tmpTranslate = s2d.Vector2.create();
            TextDrawer.tmpSize = s2d.Vector2.create();
        };
        TextDrawer.prototype.draw = function (commands) {
            var font = this.font;
            var color = this.color;
            var text = this.text;
            if (font.texture === null)
                return; //Texture not loaded yet
            var texture = font.texture;
            var textureWidth = font.textureWidth;
            var textureHeight = font.textureHeight;
            var uvTopLeft = TextDrawer.tmpUVTopLeft;
            var uvBottomRight = TextDrawer.tmpUVBottomRight;
            var translate = TextDrawer.tmpTranslate;
            var size = TextDrawer.tmpSize;
            var trans = this.entity.transform;
            var matrix = s2d.Drawer.tmpMatrix;
            var oldX = 0;
            var oldY = 0;
            trans.getLocalToGlobalMatrix(matrix);
            for (var i = 0; i < text.length; i++) {
                var charCode = text.charCodeAt(i);
                var charData = font.chars[charCode];
                if (charData !== null) {
                    size[0] = charData.width * 0.5;
                    size[1] = charData.height * 0.5;
                    uvTopLeft[0] = charData.x / textureWidth;
                    uvTopLeft[1] = charData.y / textureHeight;
                    uvBottomRight[0] = (charData.x + charData.width) / textureWidth;
                    uvBottomRight[1] = (charData.y + charData.height) / textureHeight;
                    //offset half-size (save last positions to restore later)
                    oldX = matrix[4];
                    oldY = matrix[5];
                    s2d.Matrix2d.translate(matrix, matrix, size);
                    //draw char
                    commands.drawRect(matrix, size, texture, uvTopLeft, uvBottomRight, color);
                    //un-offset half-size
                    matrix[4] = oldX;
                    matrix[5] = oldY;
                    //offset char xadvance
                    translate[0] = charData.xadvance;
                    translate[1] = 0;
                    s2d.Matrix2d.translate(matrix, matrix, translate);
                }
            }
        };
        return TextDrawer;
    }(s2d.Drawer));
    s2d.TextDrawer = TextDrawer;
})(s2d || (s2d = {}));
/// <reference path="Component.ts" />
/// <reference path="../Math/Matrix3.ts" />
/// <reference path="../Math/Vector2.ts" />
var s2d;
(function (s2d) {
    var TextureDrawer = (function (_super) {
        __extends(TextureDrawer, _super);
        function TextureDrawer() {
            _super.apply(this, arguments);
            this.uvTopLeft = s2d.Vector2.fromValues(0, 0);
            this.uvBottomRight = s2d.Vector2.fromValues(1, 1);
            this.color = s2d.Color.fromRgba(255, 255, 255, 255);
        }
        TextureDrawer.prototype.draw = function (commands) {
            var trans = this.entity.transform;
            trans.getLocalToGlobalMatrix(s2d.Drawer.tmpMatrix);
            commands.drawRect(s2d.Drawer.tmpMatrix, trans.halfSize, this.texture, this.uvTopLeft, this.uvBottomRight, this.color);
        };
        return TextureDrawer;
    }(s2d.Drawer));
    s2d.TextureDrawer = TextureDrawer;
})(s2d || (s2d = {}));
var s2d;
(function (s2d) {
    var EntityFactory = (function () {
        function EntityFactory() {
        }
        EntityFactory.buildCamera = function () {
            return new s2d.Entity("Camera").addComponent(s2d.Camera);
        };
        EntityFactory.buildTextureDrawer = function (texture) {
            var textureDrawer = new s2d.Entity("Texture").addComponent(s2d.TextureDrawer);
            textureDrawer.texture = texture;
            return textureDrawer;
        };
        EntityFactory.buildTextDrawer = function (font) {
            var textDrawer = new s2d.Entity("Text").addComponent(s2d.TextDrawer);
            textDrawer.font = font;
            return textDrawer;
        };
        return EntityFactory;
    }());
    s2d.EntityFactory = EntityFactory;
})(s2d || (s2d = {}));
var s2d;
(function (s2d) {
    var Color = (function () {
        function Color() {
        }
        Object.defineProperty(Color.prototype, "r", {
            get: function () {
                return (this.rgbaHex >> 24) & 0xFF;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "g", {
            get: function () {
                return (this.rgbaHex >> 16) & 0xFF;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "b", {
            get: function () {
                return (this.rgbaHex >> 8) & 0xFF;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "a", {
            get: function () {
                return (this.rgbaHex >> 0) & 0xFF;
            },
            enumerable: true,
            configurable: true
        });
        Color.fromRgba = function (r, g, b, a) {
            if (a === void 0) { a = 255; }
            var c = new Color();
            r = s2d.SMath.clamp(r, 0, 255);
            g = s2d.SMath.clamp(g, 0, 255);
            b = s2d.SMath.clamp(b, 0, 255);
            a = s2d.SMath.clamp(a, 0, 255);
            c.rgbaHex = (r << 24) | (g << 16) | (b << 8) | a;
            return c;
        };
        Color.fromHex = function (rgbaHex) {
            var c = new Color();
            c.rgbaHex = rgbaHex;
            return c;
        };
        return Color;
    }());
    s2d.Color = Color;
})(s2d || (s2d = {}));
//Port of glMatrix, taken from: https://github.com/toji/gl-matrix
var s2d;
(function (s2d) {
    /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE. */
    /**
     * @class 2x2 Matrix
     * @name Matrix2
     */
    var Matrix2 = (function (_super) {
        __extends(Matrix2, _super);
        function Matrix2() {
            _super.apply(this, arguments);
        }
        /**
         * Creates a new identity Matrix2
         *
         * @returns {Matrix2} a new 2x2 matrix
         */
        Matrix2.create = function () {
            var a = new Float32Array(4);
            a[0] = 1;
            a[1] = 0;
            a[2] = 0;
            a[3] = 1;
            return a;
        };
        /**
         * Creates a new Matrix2 initialized with values from an existing matrix
         *
         * @param {Matrix2} a matrix to clone
         * @returns {Matrix2} a new 2x2 matrix
         */
        Matrix2.clone = function (a) {
            var out = Matrix2.create();
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out;
        };
        /**
         * Copy the values from one Matrix2 to another
         *
         * @param {Matrix2} out the receiving matrix
         * @param {Matrix2} a the source matrix
         * @returns {Matrix2} out
         */
        Matrix2.copy = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out;
        };
        /**
         * Set a Matrix2 to the identity matrix
         *
         * @param {Matrix2} out the receiving matrix
         * @returns {Matrix2} out
         */
        Matrix2.identity = function (out) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        };
        /**
         * Create a new Matrix2 with the given values
         *
         * @param {Number} m00 Component in column 0, row 0 position (index 0)
         * @param {Number} m01 Component in column 0, row 1 position (index 1)
         * @param {Number} m10 Component in column 1, row 0 position (index 2)
         * @param {Number} m11 Component in column 1, row 1 position (index 3)
         * @returns {Matrix2} out A new 2x2 matrix
         */
        Matrix2.fromValues = function (m00, m01, m10, m11) {
            var out = Matrix2.create();
            out[0] = m00;
            out[1] = m01;
            out[2] = m10;
            out[3] = m11;
            return out;
        };
        /**
         * Set the components of a Matrix2 to the given values
         *
         * @param {Matrix2} out the receiving matrix
         * @param {Number} m00 Component in column 0, row 0 position (index 0)
         * @param {Number} m01 Component in column 0, row 1 position (index 1)
         * @param {Number} m10 Component in column 1, row 0 position (index 2)
         * @param {Number} m11 Component in column 1, row 1 position (index 3)
         * @returns {Matrix2} out
         */
        Matrix2.set = function (out, m00, m01, m10, m11) {
            out[0] = m00;
            out[1] = m01;
            out[2] = m10;
            out[3] = m11;
            return out;
        };
        /**
         * Inverts a Matrix2
         *
         * @param {Matrix2} out the receiving matrix
         * @param {Matrix2} a the source matrix
         * @returns {Matrix2} out
         */
        Matrix2.invert = function (out, a) {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], 
            // Calculate the determinant
            det = a0 * a3 - a2 * a1;
            if (!det) {
                return null;
            }
            det = 1.0 / det;
            out[0] = a3 * det;
            out[1] = -a1 * det;
            out[2] = -a2 * det;
            out[3] = a0 * det;
            return out;
        };
        /**
         * Calculates the adjugate of a Matrix2
         *
         * @param {Matrix2} out the receiving matrix
         * @param {Matrix2} a the source matrix
         * @returns {Matrix2} out
         */
        Matrix2.adjoint = function (out, a) {
            // Caching this value is nessecary if out == a
            var a0 = a[0];
            out[0] = a[3];
            out[1] = -a[1];
            out[2] = -a[2];
            out[3] = a0;
            return out;
        };
        /**
         * Calculates the determinant of a Matrix2
         *
         * @param {Matrix2} a the source matrix
         * @returns {Number} determinant of a
         */
        Matrix2.determinant = function (a) {
            return a[0] * a[3] - a[2] * a[1];
        };
        /**
         * Multiplies two Matrix2's
         *
         * @param {Matrix2} out the receiving matrix
         * @param {Matrix2} a the first operand
         * @param {Matrix2} b the second operand
         * @returns {Matrix2} out
         */
        Matrix2.mul = function (out, a, b) {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
            var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
            out[0] = a0 * b0 + a2 * b1;
            out[1] = a1 * b0 + a3 * b1;
            out[2] = a0 * b2 + a2 * b3;
            out[3] = a1 * b2 + a3 * b3;
            return out;
        };
        /**
         * Rotates a Matrix2 by the given angle
         *
         * @param {Matrix2} out the receiving matrix
         * @param {Matrix2} a the matrix to rotate
         * @param {Number} rad the angle to rotate the matrix by
         * @returns {Matrix2} out
         */
        Matrix2.rotate = function (out, a, rad) {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], s = Math.sin(rad), c = Math.cos(rad);
            out[0] = a0 * c + a2 * s;
            out[1] = a1 * c + a3 * s;
            out[2] = a0 * -s + a2 * c;
            out[3] = a1 * -s + a3 * c;
            return out;
        };
        /**
         * Scales the Matrix2 by the dimensions in the given vec2
         *
         * @param {Matrix2} out the receiving matrix
         * @param {Matrix2} a the matrix to rotate
         * @param {vec2} v the vec2 to scale the matrix by
         * @returns {Matrix2} out
         **/
        Matrix2.scale = function (out, a, v) {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], v0 = v[0], v1 = v[1];
            out[0] = a0 * v0;
            out[1] = a1 * v0;
            out[2] = a2 * v1;
            out[3] = a3 * v1;
            return out;
        };
        /**
         * Creates a matrix from a vector scaling
         * This is equivalent to (but much faster than):
         *
         *     Matrix2.identity(dest);
         *     Matrix2.scale(dest, dest, vec);
         *
         * @param {Matrix2} out Matrix2 receiving operation result
         * @param {vec2} v Scaling vector
         * @returns {Matrix2} out
         */
        Matrix2.fromScaling = function (out, v) {
            out[0] = v[0];
            out[1] = 0;
            out[2] = 0;
            out[3] = v[1];
            return out;
        };
        /**
         * Returns a string representation of a Matrix2
         *
         * @param {Matrix2} a matrix to represent as a string
         * @returns {String} string representation of the matrix
         */
        Matrix2.toString = function (a) {
            return 'Matrix2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
        };
        /**
         * Returns Frobenius norm of a Matrix2
         *
         * @param {Matrix2} a the matrix to calculate Frobenius norm of
         * @returns {Number} Frobenius norm
         */
        Matrix2.frob = function (a) {
            return (Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2)));
        };
        /**
         * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
         * @param {Matrix2} L the lower triangular matrix
         * @param {Matrix2} D the diagonal matrix
         * @param {Matrix2} U the upper triangular matrix
         * @param {Matrix2} a the input matrix to factorize
         */
        Matrix2.LDU = function (L, D, U, a) {
            L[2] = a[2] / a[0];
            U[0] = a[0];
            U[1] = a[1];
            U[3] = a[3] - L[2] * U[1];
            return [L, D, U];
        };
        /**
         * Adds two Matrix2's
         *
         * @param {Matrix2} out the receiving matrix
         * @param {Matrix2} a the first operand
         * @param {Matrix2} b the second operand
         * @returns {Matrix2} out
         */
        Matrix2.add = function (out, a, b) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            out[2] = a[2] + b[2];
            out[3] = a[3] + b[3];
            return out;
        };
        /**
         * Subtracts matrix b from matrix a
         *
         * @param {Matrix2} out the receiving matrix
         * @param {Matrix2} a the first operand
         * @param {Matrix2} b the second operand
         * @returns {Matrix2} out
         */
        Matrix2.sub = function (out, a, b) {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            out[2] = a[2] - b[2];
            out[3] = a[3] - b[3];
            return out;
        };
        /**
         * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
         *
         * @param {Matrix2} a The first matrix.
         * @param {Matrix2} b The second matrix.
         * @returns {Boolean} True if the matrices are equal, false otherwise.
         */
        Matrix2.exactEquals = function (a, b) {
            return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
        };
        /**
         * Returns whether or not the matrices have approximately the same elements in the same position.
         *
         * @param {Matrix2} a The first matrix.
         * @param {Matrix2} b The second matrix.
         * @returns {Boolean} True if the matrices are equal, false otherwise.
         */
        Matrix2.equals = function (a, b) {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
            var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
            return (Math.abs(a0 - b0) <= s2d.SMath.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
                Math.abs(a1 - b1) <= s2d.SMath.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
                Math.abs(a2 - b2) <= s2d.SMath.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
                Math.abs(a3 - b3) <= s2d.SMath.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)));
        };
        /**
         * Multiply each element of the matrix by a scalar.
         *
         * @param {Matrix2} out the receiving matrix
         * @param {Matrix2} a the matrix to scale
         * @param {Number} b amount to scale the matrix's elements by
         * @returns {Matrix2} out
         */
        Matrix2.multiplyScalar = function (out, a, b) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            out[2] = a[2] * b;
            out[3] = a[3] * b;
            return out;
        };
        /**
         * Adds two Matrix2's after multiplying each element of the second operand by a scalar value.
         *
         * @param {Matrix2} out the receiving vector
         * @param {Matrix2} a the first operand
         * @param {Matrix2} b the second operand
         * @param {Number} scale the amount to scale b's elements by before adding
         * @returns {Matrix2} out
         */
        Matrix2.multiplyScalarAndAdd = function (out, a, b, scale) {
            out[0] = a[0] + (b[0] * scale);
            out[1] = a[1] + (b[1] * scale);
            out[2] = a[2] + (b[2] * scale);
            out[3] = a[3] + (b[3] * scale);
            return out;
        };
        /**
         * Transpose the values of a Matrix2
         *
         * @param {Matrix2} out the receiving matrix
         * @param {Matrix2} a the source matrix
         * @returns {Matrix2} out
         */
        Matrix2.transpose = function (out, a) {
            // If we are transposing ourselves we can skip a few steps but have to cache some values
            if (out === a) {
                var a1 = a[1];
                out[1] = a[2];
                out[2] = a1;
            }
            else {
                out[0] = a[0];
                out[1] = a[2];
                out[2] = a[1];
                out[3] = a[3];
            }
            return out;
        };
        /**
         * Creates a matrix from a given angle
         * This is equivalent to (but much faster than):
         *
         *     Matrix2.identity(dest);
         *     Matrix2.rotate(dest, dest, rad);
         *
         * @param {Matrix2} out Matrix2 receiving operation result
         * @param {Number} rad the angle to rotate the matrix by
         * @returns {Matrix2} out
         */
        Matrix2.fromRotation = function (out, rad) {
            var s = Math.sin(rad), c = Math.cos(rad);
            out[0] = c;
            out[1] = s;
            out[2] = -s;
            out[3] = c;
            return out;
        };
        return Matrix2;
    }(Float32Array));
    s2d.Matrix2 = Matrix2;
})(s2d || (s2d = {}));
//Port of glMatrix, taken from: https://github.com/toji/gl-matrix
var s2d;
(function (s2d) {
    /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE. */
    /**
     * @class 2x3 Matrix
     * @name Matrix2d
     *
     * @description
     * A Matrix2d contains six elements defined as:
     * <pre>
     * [a, c, tx,
     *  b, d, ty]
     * </pre>
     * This is a short form for the 3x3 matrix:
     * <pre>
     * [a, c, tx,
     *  b, d, ty,
     *  0, 0, 1]
     * </pre>
     * The last row is ignored so the array is shorter and operations are faster.
     * Array order is:
     * <pre>
     * [0, 2, 4,
     *  1, 3, 5]
     * </pre>
     */
    var Matrix2d = (function (_super) {
        __extends(Matrix2d, _super);
        function Matrix2d() {
            _super.apply(this, arguments);
        }
        /**
         * Creates a new identity Matrix2d
         *
         * @returns {Matrix2d} a new 2x3 matrix
         */
        Matrix2d.create = function () {
            var a = new Float32Array(6);
            a[0] = 1;
            a[1] = 0;
            a[2] = 0;
            a[3] = 1;
            a[4] = 0;
            a[5] = 0;
            return a;
        };
        /**
         * Creates a new Matrix2d initialized with values from an existing matrix
         *
         * @param {Matrix2d} a matrix to clone
         * @returns {Matrix2d} a new 2x3 matrix
         */
        Matrix2d.clone = function (a) {
            var out = Matrix2d.create();
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            return out;
        };
        /**
         * Copy the values from one Matrix2d to another
         *
         * @param {Matrix2d} out the receiving matrix
         * @param {Matrix2d} a the source matrix
         * @returns {Matrix2d} out
         */
        Matrix2d.copy = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            return out;
        };
        /**
         * Set a Matrix2d to the identity matrix
         *
         * @param {Matrix2d} out the receiving matrix
         * @returns {Matrix2d} out
         */
        Matrix2d.identity = function (out) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            out[4] = 0;
            out[5] = 0;
            return out;
        };
        /**
         * Create a new Matrix2d with the given values
         *
         * @param {Number} a Component A (index 0)
         * @param {Number} b Component B (index 1)
         * @param {Number} c Component C (index 2)
         * @param {Number} d Component D (index 3)
         * @param {Number} tx Component TX (index 4)
         * @param {Number} ty Component TY (index 5)
         * @returns {Matrix2d} A new Matrix2d
         */
        Matrix2d.fromValues = function (a, b, c, d, tx, ty) {
            var out = Matrix2d.create();
            out[0] = a;
            out[1] = b;
            out[2] = c;
            out[3] = d;
            out[4] = tx;
            out[5] = ty;
            return out;
        };
        /**
         * Set the components of a Matrix2d to the given values
         *
         * @param {Matrix2d} out the receiving matrix
         * @param {Number} a Component A (index 0)
         * @param {Number} b Component B (index 1)
         * @param {Number} c Component C (index 2)
         * @param {Number} d Component D (index 3)
         * @param {Number} tx Component TX (index 4)
         * @param {Number} ty Component TY (index 5)
         * @returns {Matrix2d} out
         */
        Matrix2d.set = function (out, a, b, c, d, tx, ty) {
            out[0] = a;
            out[1] = b;
            out[2] = c;
            out[3] = d;
            out[4] = tx;
            out[5] = ty;
            return out;
        };
        /**
         * Inverts a Matrix2d
         *
         * @param {Matrix2d} out the receiving matrix
         * @param {Matrix2d} a the source matrix
         * @returns {Matrix2d} out
         */
        Matrix2d.invert = function (out, a) {
            var aa = a[0], ab = a[1], ac = a[2], ad = a[3], atx = a[4], aty = a[5];
            var det = aa * ad - ab * ac;
            if (!det) {
                return null;
            }
            det = 1.0 / det;
            out[0] = ad * det;
            out[1] = -ab * det;
            out[2] = -ac * det;
            out[3] = aa * det;
            out[4] = (ac * aty - ad * atx) * det;
            out[5] = (ab * atx - aa * aty) * det;
            return out;
        };
        /**
         * Calculates the determinant of a Matrix2d
         *
         * @param {Matrix2d} a the source matrix
         * @returns {Number} determinant of a
         */
        Matrix2d.determinant = function (a) {
            return a[0] * a[3] - a[1] * a[2];
        };
        /**
         * Multiplies two Matrix2d's
         *
         * @param {Matrix2d} out the receiving matrix
         * @param {Matrix2d} a the first operand
         * @param {Matrix2d} b the second operand
         * @returns {Matrix2d} out
         */
        Matrix2d.mul = function (out, a, b) {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
            out[0] = a0 * b0 + a2 * b1;
            out[1] = a1 * b0 + a3 * b1;
            out[2] = a0 * b2 + a2 * b3;
            out[3] = a1 * b2 + a3 * b3;
            out[4] = a0 * b4 + a2 * b5 + a4;
            out[5] = a1 * b4 + a3 * b5 + a5;
            return out;
        };
        /**
         * Rotates a Matrix2d by the given angle
         *
         * @param {Matrix2d} out the receiving matrix
         * @param {Matrix2d} a the matrix to rotate
         * @param {Number} rad the angle to rotate the matrix by
         * @returns {Matrix2d} out
         */
        Matrix2d.rotate = function (out, a, rad) {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], s = Math.sin(rad), c = Math.cos(rad);
            out[0] = a0 * c + a2 * s;
            out[1] = a1 * c + a3 * s;
            out[2] = a0 * -s + a2 * c;
            out[3] = a1 * -s + a3 * c;
            out[4] = a4;
            out[5] = a5;
            return out;
        };
        /**
         * Scales the Matrix2d by the dimensions in the given Vector2
         *
         * @param {Matrix2d} out the receiving matrix
         * @param {Matrix2d} a the matrix to translate
         * @param {Vector2} v the Vector2 to scale the matrix by
         * @returns {Matrix2d} out
         **/
        Matrix2d.scale = function (out, a, v) {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], v0 = v[0], v1 = v[1];
            out[0] = a0 * v0;
            out[1] = a1 * v0;
            out[2] = a2 * v1;
            out[3] = a3 * v1;
            out[4] = a4;
            out[5] = a5;
            return out;
        };
        /**
         * Translates the Matrix2d by the dimensions in the given Vector2
         *
         * @param {Matrix2d} out the receiving matrix
         * @param {Matrix2d} a the matrix to translate
         * @param {Vector2} v the Vector2 to translate the matrix by
         * @returns {Matrix2d} out
         **/
        Matrix2d.translate = function (out, a, v) {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], v0 = v[0], v1 = v[1];
            out[0] = a0;
            out[1] = a1;
            out[2] = a2;
            out[3] = a3;
            out[4] = a0 * v0 + a2 * v1 + a4;
            out[5] = a1 * v0 + a3 * v1 + a5;
            return out;
        };
        /**
         * Creates a matrix from a given angle
         * This is equivalent to (but much faster than):
         *
         *     Matrix2d.identity(dest);
         *     Matrix2d.rotate(dest, dest, rad);
         *
         * @param {Matrix2d} out Matrix2d receiving operation result
         * @param {Number} rad the angle to rotate the matrix by
         * @returns {Matrix2d} out
         */
        Matrix2d.fromRotation = function (out, rad) {
            var s = Math.sin(rad), c = Math.cos(rad);
            out[0] = c;
            out[1] = s;
            out[2] = -s;
            out[3] = c;
            out[4] = 0;
            out[5] = 0;
            return out;
        };
        /**
         * Creates a matrix from a vector scaling
         * This is equivalent to (but much faster than):
         *
         *     Matrix2d.identity(dest);
         *     Matrix2d.scale(dest, dest, vec);
         *
         * @param {Matrix2d} out Matrix2d receiving operation result
         * @param {Vector2} v Scaling vector
         * @returns {Matrix2d} out
         */
        Matrix2d.fromScaling = function (out, v) {
            out[0] = v[0];
            out[1] = 0;
            out[2] = 0;
            out[3] = v[1];
            out[4] = 0;
            out[5] = 0;
            return out;
        };
        /**
         * Creates a matrix from a vector translation
         * This is equivalent to (but much faster than):
         *
         *     Matrix2d.identity(dest);
         *     Matrix2d.translate(dest, dest, vec);
         *
         * @param {Matrix2d} out Matrix2d receiving operation result
         * @param {Vector2} v Translation vector
         * @returns {Matrix2d} out
         */
        Matrix2d.fromTranslation = function (out, v) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            out[4] = v[0];
            out[5] = v[1];
            return out;
        };
        /**
         * Returns a string representation of a Matrix2d
         *
         * @param {Matrix2d} a matrix to represent as a string
         * @returns {String} string representation of the matrix
         */
        Matrix2d.toString = function (a) {
            return 'Matrix2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' +
                a[3] + ', ' + a[4] + ', ' + a[5] + ')';
        };
        /**
         * Returns Frobenius norm of a Matrix2d
         *
         * @param {Matrix2d} a the matrix to calculate Frobenius norm of
         * @returns {Number} Frobenius norm
         */
        Matrix2d.frob = function (a) {
            return (Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1));
        };
        /**
         * Adds two Matrix2d's
         *
         * @param {Matrix2d} out the receiving matrix
         * @param {Matrix2d} a the first operand
         * @param {Matrix2d} b the second operand
         * @returns {Matrix2d} out
         */
        Matrix2d.add = function (out, a, b) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            out[2] = a[2] + b[2];
            out[3] = a[3] + b[3];
            out[4] = a[4] + b[4];
            out[5] = a[5] + b[5];
            return out;
        };
        /**
         * Subtracts matrix b from matrix a
         *
         * @param {Matrix2d} out the receiving matrix
         * @param {Matrix2d} a the first operand
         * @param {Matrix2d} b the second operand
         * @returns {Matrix2d} out
         */
        Matrix2d.sub = function (out, a, b) {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            out[2] = a[2] - b[2];
            out[3] = a[3] - b[3];
            out[4] = a[4] - b[4];
            out[5] = a[5] - b[5];
            return out;
        };
        /**
         * Multiply each element of the matrix by a scalar.
         *
         * @param {Matrix2d} out the receiving matrix
         * @param {Matrix2d} a the matrix to scale
         * @param {Number} b amount to scale the matrix's elements by
         * @returns {Matrix2d} out
         */
        Matrix2d.multiplyScalar = function (out, a, b) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            out[2] = a[2] * b;
            out[3] = a[3] * b;
            out[4] = a[4] * b;
            out[5] = a[5] * b;
            return out;
        };
        /**
         * Adds two Matrix2d's after multiplying each element of the second operand by a scalar value.
         *
         * @param {Matrix2d} out the receiving vector
         * @param {Matrix2d} a the first operand
         * @param {Matrix2d} b the second operand
         * @param {Number} scale the amount to scale b's elements by before adding
         * @returns {Matrix2d} out
         */
        Matrix2d.multiplyScalarAndAdd = function (out, a, b, scale) {
            out[0] = a[0] + (b[0] * scale);
            out[1] = a[1] + (b[1] * scale);
            out[2] = a[2] + (b[2] * scale);
            out[3] = a[3] + (b[3] * scale);
            out[4] = a[4] + (b[4] * scale);
            out[5] = a[5] + (b[5] * scale);
            return out;
        };
        /**
         * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
         *
         * @param {Matrix2d} a The first matrix.
         * @param {Matrix2d} b The second matrix.
         * @returns {Boolean} True if the matrices are equal, false otherwise.
         */
        Matrix2d.exactEquals = function (a, b) {
            return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5];
        };
        /**
         * Returns whether or not the matrices have approximately the same elements in the same position.
         *
         * @param {Matrix2d} a The first matrix.
         * @param {Matrix2d} b The second matrix.
         * @returns {Boolean} True if the matrices are equal, false otherwise.
         */
        Matrix2d.equals = function (a, b) {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
            var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
            return (Math.abs(a0 - b0) <= s2d.SMath.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
                Math.abs(a1 - b1) <= s2d.SMath.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
                Math.abs(a2 - b2) <= s2d.SMath.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
                Math.abs(a3 - b3) <= s2d.SMath.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
                Math.abs(a4 - b4) <= s2d.SMath.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
                Math.abs(a5 - b5) <= s2d.SMath.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)));
        };
        return Matrix2d;
    }(Float32Array));
    s2d.Matrix2d = Matrix2d;
})(s2d || (s2d = {}));
var s2d;
(function (s2d) {
    var SMath = (function () {
        function SMath() {
        }
        SMath.clamp = function (v, min, max) {
            if (v < min)
                return min;
            else if (v > max)
                return max;
            return v;
        };
        SMath.randomInRangeFloat = function (min, max) {
            return min + Math.random() * (max - min);
        };
        SMath.randomInRangeInteger = function (min, max) {
            return Math.floor(min + Math.random() * (max - min));
        };
        SMath.deg2rad = Math.PI / 180;
        SMath.rad2deg = 180 / Math.PI;
        SMath.EPSILON = 0.000001;
        SMath.equals = function (a, b) {
            return Math.abs(a - b) <= SMath.EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
        };
        return SMath;
    }());
    s2d.SMath = SMath;
})(s2d || (s2d = {}));
/// <reference path="../Util/JXON.d.ts" />
var s2d;
(function (s2d) {
    var RenderFontCharData = (function () {
        function RenderFontCharData() {
            this.id = 0;
            this.width = 0;
            this.height = 0;
            this.x = 0;
            this.y = 0;
            this.xadvance = 0;
            this.xoffset = 0;
            this.yoffset = 0;
        }
        return RenderFontCharData;
    }());
    s2d.RenderFontCharData = RenderFontCharData;
    var RenderFont = (function () {
        function RenderFont(gl, fontXmlSrc) {
            var _this = this;
            this.gl = null;
            this._xhttp = null;
            this._texture = null;
            this._fontData = null;
            this._textureWidth = 0;
            this._textureHeight = 0;
            this._lineHeight = 0;
            this._chars = new Array();
            this.gl = gl;
            this._xhttp = new XMLHttpRequest();
            this._xhttp.addEventListener('load', function () { return _this.onXMLLoadComplete(); });
            this._xhttp.open("GET", fontXmlSrc, true);
            this._xhttp.send(null);
        }
        Object.defineProperty(RenderFont.prototype, "texture", {
            get: function () {
                return this._texture;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RenderFont.prototype, "fontData", {
            get: function () {
                return this._fontData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RenderFont.prototype, "textureWidth", {
            get: function () {
                return this._textureWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RenderFont.prototype, "textureHeight", {
            get: function () {
                return this._textureHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RenderFont.prototype, "lineHeight", {
            get: function () {
                return this._lineHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RenderFont.prototype, "chars", {
            get: function () {
                return this._chars;
            },
            enumerable: true,
            configurable: true
        });
        RenderFont.prototype.onXMLLoadComplete = function () {
            this._fontData = JXON.stringToJs(this._xhttp.responseText);
            this._textureWidth = parseInt(this._fontData.font.common.$scaleW);
            this._textureHeight = parseInt(this._fontData.font.common.$scaleH);
            this._lineHeight = parseInt(this._fontData.font.common.$lineHeight);
            var charsJson = this._fontData.font.chars.char;
            for (var i = 0; i < charsJson.length; i++) {
                var charJson = charsJson[i];
                var char = new RenderFontCharData();
                char.id = parseInt(charJson.$id);
                char.width = parseInt(charJson.$width);
                char.height = parseInt(charJson.$height);
                char.x = parseInt(charJson.$x);
                char.y = parseInt(charJson.$y);
                char.xadvance = parseInt(charJson.$xadvance);
                char.xoffset = parseInt(charJson.$xoffset);
                char.yoffset = parseInt(charJson.$yoffset);
                this._chars[char.id] = char;
            }
            this._texture = new s2d.RenderTexture(this.gl, "assets/" + this._fontData.font.pages.page.$file, true);
            this._xhttp = null;
        };
        RenderFont.prototype.clear = function () {
            if (this._texture != null) {
                this._texture.clear();
                this._texture = null;
            }
            this._fontData = null;
        };
        return RenderFont;
    }());
    s2d.RenderFont = RenderFont;
})(s2d || (s2d = {}));
var s2d;
(function (s2d) {
    var RenderTexture = (function () {
        function RenderTexture(gl, imageSrc, hasAlpha) {
            var _this = this;
            this.gl = null;
            this._texture = null;
            this._image = null;
            this._hasAlpha = false;
            this.gl = gl;
            this._hasAlpha = hasAlpha;
            this._texture = gl.createTexture();
            var texture = this._texture;
            gl.bindTexture(gl.TEXTURE_2D, texture);
            // Fill the texture with a 1x1 white pixel.
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255]));
            // Asynchronously load an image
            this._image = new Image();
            this._image.setAttribute('crossOrigin', 'anonymous');
            this._image.addEventListener('load', function () { return _this.onImageLoadComplete(); });
            this._image.src = imageSrc;
        }
        Object.defineProperty(RenderTexture.prototype, "texture", {
            get: function () {
                return this._texture;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RenderTexture.prototype, "hasAlpha", {
            get: function () {
                return this._hasAlpha;
            },
            enumerable: true,
            configurable: true
        });
        RenderTexture.prototype.onImageLoadComplete = function () {
            var gl = this.gl;
            var texture = this._texture;
            var image = this._image;
            // Now that the image has loaded make copy it to the texture.
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.generateMipmap(gl.TEXTURE_2D);
            this._image = null;
        };
        RenderTexture.prototype.clear = function () {
            if (this._texture != null) {
                this.gl.deleteTexture(this._texture);
                this._texture = null;
            }
        };
        RenderTexture.prototype.useTexture = function () {
            var gl = this.gl;
            gl.bindTexture(gl.TEXTURE_2D, this._texture);
        };
        return RenderTexture;
    }());
    s2d.RenderTexture = RenderTexture;
})(s2d || (s2d = {}));
var s2d;
(function (s2d) {
    var EngineConfiguration = (function () {
        function EngineConfiguration() {
        }
        EngineConfiguration.RENDER_ENABLED = true;
        EngineConfiguration.LOG_PERFORMANCE = false;
        return EngineConfiguration;
    }());
    s2d.EngineConfiguration = EngineConfiguration;
})(s2d || (s2d = {}));
/// <reference path="EngineConfiguration.ts" />
var s2d;
(function (s2d) {
    var Stats = (function () {
        function Stats() {
            this.lastFpsTime = 0;
            this.fpsCounter = 0;
            this.accumulatedUpdateTime = 0;
            this._lastFps = 0;
            this._lastUpdateTime = 0;
        }
        Object.defineProperty(Stats.prototype, "lastFps", {
            get: function () {
                return this._lastFps;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stats.prototype, "lastUpdateTime", {
            get: function () {
                return this._lastUpdateTime;
            },
            enumerable: true,
            configurable: true
        });
        Stats.prototype.init = function () {
            this.lastFpsTime = performance.now();
        };
        Stats.prototype.startFrame = function () {
        };
        Stats.prototype.endFrame = function () {
        };
        Stats.prototype.startUpdate = function () {
            this.updateStartTime = performance.now();
        };
        Stats.prototype.endUpdate = function () {
            var endTime = performance.now();
            this.accumulatedUpdateTime += endTime - this.updateStartTime;
            this.fpsCounter++;
            if (this.updateStartTime - this.lastFpsTime > 1000) {
                var delta = this.updateStartTime - this.lastFpsTime;
                var fps = this.fpsCounter / (delta / 1000);
                var updateTime = this.accumulatedUpdateTime / this.fpsCounter;
                this.lastFpsTime = this.updateStartTime;
                this.fpsCounter = 0;
                this.accumulatedUpdateTime = 0;
                this._lastFps = fps;
                this._lastUpdateTime = updateTime;
                if (s2d.EngineConfiguration.LOG_PERFORMANCE)
                    console.log("fps: " + Math.round(fps) + " updateTime: " + updateTime.toFixed(2) + " ms");
            }
        };
        return Stats;
    }());
    s2d.Stats = Stats;
})(s2d || (s2d = {}));

//# sourceMappingURL=main.js.map
