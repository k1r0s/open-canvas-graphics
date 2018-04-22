(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.ocg = {})));
}(this, (function (exports) { 'use strict';

    var GameControls = (function () {
        function GameControls() {
        }
        GameControls.setup = function () {
            this.keyMapper[this.ARROW_LEFT_CODE] = 'ARROW_LEFT';
            this.keyMapper[this.ARROW_DOWN_CODE] = 'ARROW_DOWN';
            this.keyMapper[this.ARROW_RIGHT_CODE] = 'ARROW_RIGHT';
            this.keyMapper[this.ARROW_UP_CODE] = 'ARROW_UP';
            this.keyMapper[this.SPACE_CODE] = 'SPACE';
            this.keyMapper[this.CONTROL_CODE] = 'CONTROL';
            this.keyMapper[this.MOUSE_RIGHT_CODE] = 'ARROW_RIGHT';
            this.keyMapper[this.MOUSE_LEFT_CODE] = 'MOUSE_LEFT';
        };
        GameControls.keyboard = function () {
            this.setup();
            window.addEventListener("keydown", this.handle.bind(this));
            window.addEventListener("keyup", this.handle.bind(this));
        };
        GameControls.mouse = function () {
            this.setup();
            window.addEventListener("mousedown", this.handle.bind(this));
            window.addEventListener("mouseup", this.handle.bind(this));
        };
        GameControls.isPressed = function (evt) {
            return evt.type.search("down") > -1;
        };
        GameControls.handle = function (evt) {
            evt.preventDefault();
            this[this.keyMapper[evt.which]] = this.isPressed(evt);
        };
        GameControls.ARROW_LEFT = false;
        GameControls.ARROW_DOWN = false;
        GameControls.ARROW_RIGHT = false;
        GameControls.ARROW_UP = false;
        GameControls.SPACE = false;
        GameControls.CONTROL = false;
        GameControls.MOUSE_RIGHT = false;
        GameControls.MOUSE_LEFT = false;
        GameControls.ARROW_LEFT_CODE = 37;
        GameControls.ARROW_DOWN_CODE = 40;
        GameControls.ARROW_RIGHT_CODE = 39;
        GameControls.ARROW_UP_CODE = 38;
        GameControls.SPACE_CODE = 32;
        GameControls.CONTROL_CODE = 17;
        GameControls.MOUSE_RIGHT_CODE = 3;
        GameControls.MOUSE_LEFT_CODE = 1;
        GameControls.keyMapper = [];
        return GameControls;
    }());

    var MeshObject = (function () {
        function MeshObject(position, vectors) {
            this.position = position;
            this.vectors = vectors;
            this.tracking = 0;
            if (this.vectors) {
                this.seekBestTracking();
            }
        }
        MeshObject.prototype.distanceTo = function (npos) {
            var xDistance = this.position.x - npos.x;
            var yDistance = this.position.y - npos.y;
            if (xDistance < 0) {
                xDistance *= -1;
            }
            if (yDistance < 0) {
                yDistance *= -1;
            }
            return xDistance + yDistance;
        };
        MeshObject.prototype.setTraking = function (auxVectorPoint) {
            if (auxVectorPoint < 0) {
                auxVectorPoint *= -1;
            }
            if (auxVectorPoint > this.tracking) {
                this.tracking = auxVectorPoint;
            }
        };
        MeshObject.prototype.getAbsVector = function (index) {
            var selectedVector = this.vectors[index];
            return {
                x: selectedVector.x + this.position.x,
                y: selectedVector.y + this.position.y
            };
        };
        MeshObject.prototype.seekBestTracking = function () {
            for (var i = this.vectors.length - 1; i > -1; i--) {
                for (var point in this.vectors[i]) {
                    this.setTraking(point);
                }
            }
        };
        MeshObject.prototype.isTouching = function (mesh) { };
        return MeshObject;
    }());

    var __extends = (undefined && undefined.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var GameObject = (function (_super) {
        __extends(GameObject, _super);
        function GameObject(position, vectors) {
            var _this = _super.call(this, position, vectors) || this;
            _this.position = position;
            _this.vectors = vectors;
            _this.width = 0;
            _this.height = 0;
            _this.colliders = [];
            _this._clickable = true;
            _this._visible = true;
            return _this;
        }
        Object.defineProperty(GameObject.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "clickable", {
            get: function () {
                return this._clickable;
            },
            enumerable: true,
            configurable: true
        });
        GameObject.prototype.toggleVisible = function () {
            this._visible = !this._visible;
        };
        GameObject.prototype.toggleClickable = function () {
            this._clickable = !this._clickable;
        };
        GameObject.prototype.tick = function () { };
        GameObject.prototype.inBounds = function (pos) {
            if (!this.visible)
                return false;
            var bounds = this.getBounds();
            return bounds.down > pos.y &&
                bounds.left < pos.x &&
                bounds.right > pos.x &&
                bounds.up < pos.y;
        };
        GameObject.prototype.offSetX = function (nextPosition) {
            return nextPosition ?
                nextPosition.x + this.width : this.position.x + this.width;
        };
        GameObject.prototype.offSetY = function (nextPosition) {
            return nextPosition ?
                nextPosition.y + this.height : this.position.y + this.height;
        };
        GameObject.prototype.addCollider = function (gameObj) {
            this.colliders.push(gameObj);
        };
        GameObject.prototype.addColliders = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            args.forEach(function (gameObj) { return _this.addCollider(gameObj); });
        };
        GameObject.prototype.getDistanceTo = function (gameObj) {
            var distance = this.getRelativePosition() - gameObj.getRelativePosition();
            return distance < 0 ? distance * -1 : distance;
        };
        GameObject.prototype.getRelativePosition = function () {
            var xCenter = this.position.x + (this.width / 2);
            var yCenter = this.position.y + (this.height / 2);
            return xCenter + yCenter;
        };
        GameObject.prototype.getBounds = function (nextPosition) {
            return {
                left: nextPosition ? nextPosition.x : this.position.x,
                right: this.offSetX(nextPosition),
                up: nextPosition ? nextPosition.y : this.position.y,
                down: this.offSetY(nextPosition)
            };
        };
        GameObject.prototype.willCollide = function (nextPosition) {
            if (!this.colliders.length) {
                return false;
            }
            var nextBounds = this.getBounds(nextPosition);
            return this.colliders.some(function (gameObj) {
                var subjectBounds = gameObj.getBounds();
                return nextBounds.down > subjectBounds.up &&
                    nextBounds.left < subjectBounds.right &&
                    nextBounds.right > subjectBounds.left &&
                    nextBounds.up < subjectBounds.down;
            });
        };
        return GameObject;
    }(MeshObject));

    var raf = (window.requestAnimationFrame || window.webkitRequestAnimationFrame).bind(window);

    var GameScene = (function () {
        function GameScene(canvasEl) {
            var _this = this;
            this.canvasEl = canvasEl;
            this.allowedContext = "2d";
            this.defaultFramesPerSec = 50;
            this.ticksPerSec = 10;
            this.canRender = false;
            this.stopped = true;
            this.collection = {};
            this.uicollection = {};
            this.clickListenerPool = [];
            this.moveListenerPool = [];
            this.rightClickListenerPool = [];
            this.nextUID = 0;
            this.amount = 0;
            this.context = canvasEl.getContext(this.allowedContext);
            canvasEl.addEventListener("mousemove", function (evt) { return _this.moveListenerPool.forEach(function (fn) { return fn(evt); }); });
            canvasEl.addEventListener("click", function (evt) { return _this.clickListenerPool.forEach(function (fn) { return fn(evt); }); });
            canvasEl.addEventListener("contextmenu", function (evt) {
                evt.preventDefault();
                _this.rightClickListenerPool.forEach(function (fn) { return fn(evt); });
            });
        }
        GameScene.prototype.start = function (framesPerSec) {
            var _this = this;
            this.stopped = false;
            this.loop();
            this.renderGovernor = window.setInterval(function (_) { return _this.canRender = true; }, 1000 / framesPerSec || this.defaultFramesPerSec);
            this.tickGovernor = window.setInterval(function (_) { return _this.performTicks(); }, 1000 / this.ticksPerSec);
        };
        GameScene.prototype.stop = function () {
            this.stopped = true;
            clearInterval(this.renderGovernor);
            clearInterval(this.tickGovernor);
        };
        GameScene.prototype.addObject = function (object) {
            object.UID = this.nextUID++;
            this.collection[object.UID] = object;
            this.amount++;
        };
        GameScene.prototype.addUIElement = function (object) {
            object.UID = this.nextUID++;
            this.uicollection[object.UID] = object;
        };
        GameScene.prototype.addUIElements = function () {
            var _this = this;
            var objs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                objs[_i] = arguments[_i];
            }
            objs.forEach(function (gameObj) { return _this.addUIElement(gameObj); });
        };
        GameScene.prototype.addObjects = function () {
            var _this = this;
            var objs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                objs[_i] = arguments[_i];
            }
            objs.forEach(function (gameObj) { return _this.addObject(gameObj); });
        };
        GameScene.prototype.clickOnObject = function (cbk) {
            var _this = this;
            this.clickListenerPool.push(function (evt) {
                return cbk(_this.gameObjectInBounds({
                    x: evt.offsetX,
                    y: evt.offsetY
                }));
            });
        };
        GameScene.prototype.contextMenuOnObject = function (cbk) {
            var _this = this;
            this.rightClickListenerPool.push(function (evt) {
                return cbk(_this.gameObjectInBounds({
                    x: evt.offsetX,
                    y: evt.offsetY
                }));
            });
        };
        GameScene.prototype.moveOver = function (cbk) {
            this.moveListenerPool.push(function (evt) { return cbk(evt); });
        };
        GameScene.prototype.gameObjectInBounds = function (position) {
            for (var uid in this.uicollection) {
                if (this.positionWithinObject(position, this.uicollection[uid])) {
                    return this.uicollection[uid];
                }
            }
            for (var uid in this.collection) {
                if (this.positionWithinObject(position, this.collection[uid])) {
                    return this.collection[uid];
                }
            }
            return null;
        };
        GameScene.prototype.positionWithinObject = function (position, gameObject) {
            return gameObject.clickable && gameObject.inBounds(position);
        };
        GameScene.prototype.performTicks = function () {
            for (var uid in this.collection) {
                this.collection[uid].tick();
            }
        };
        GameScene.prototype.loop = function () {
            var _this = this;
            if (this.canRender) {
                this.canRender = false;
                this.clearCanvas();
                this.renderGameObjects();
                this.renderUIElements();
            }
            if (!this.stopped) {
                raf(function (_) { return _this.loop(); });
            }
        };
        GameScene.prototype.renderGameObjects = function () {
            for (var uid in this.collection) {
                this.renderObject(this.collection[uid]);
            }
        };
        GameScene.prototype.renderObject = function (object) {
            if (!object.visible)
                return;
            object.render(this.context);
        };
        GameScene.prototype.renderUIElements = function () {
            for (var uid in this.uicollection) {
                this.renderObject(this.uicollection[uid]);
            }
        };
        GameScene.prototype.clearCanvas = function () {
            this.context.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
        };
        GameScene.prototype.del = function (object) {
            this.amount--;
            delete this.collection[object.UID];
        };
        return GameScene;
    }());

    exports.GameControls = GameControls;
    exports.GameObject = GameObject;
    exports.GameScene = GameScene;
    exports.MeshObject = MeshObject;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
