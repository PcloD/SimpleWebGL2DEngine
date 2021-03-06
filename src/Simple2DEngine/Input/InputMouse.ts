module s2d {

    export class InputMouse {

        private _lastX : number;
        private _lastY : number;
        private _leftDown : boolean;
        private _rightDown : boolean;
        private _moved : boolean;

        public get moved() {
            return this._moved;
        }

        public get x() {
            return this._lastX;
        }

        public get y() {
            return this._lastY;
        }

        public get isDown() {
            return this._leftDown || this._rightDown;
        }

        public get isLeftDown() {
            return this._leftDown;
        }

        public get isRightDown() {
            return this._rightDown;
        }

        /* 
        Mouse buttons values (from https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button):
            0: Main button pressed, usually the left button or the un-initialized state
            1: Auxiliary button pressed, usually the wheel button or the middle button (if present)
            2: Secondary button pressed, usually the right button
            3: Fourth button, typically the Browser Back button
            4: Fifth button, typically the Browser Forward button
        */
        constructor() {
            this._lastX = 0;
            this._lastY = 0;
            this._leftDown = false;
            this._rightDown = false;
            this._moved = false;

            document.addEventListener("mousedown", this.onMouseDown, true);
            document.addEventListener("mousemove", this.onMouseMove, true);
            document.addEventListener("mouseout", this.onMouseOut, true);
            document.addEventListener("mouseover", this.onMouseOver, true);
            document.addEventListener("mouseup", this.onMouseUp, true);
            document.addEventListener("mousewheel", this.onMouseWheel, true);
        }


        private updateLastPosition(ev: MouseEvent) {
            if (ev.x >= 0 && ev.x < engine.renderer.screenWidth && ev.y >= 0 && ev.y < engine.renderer.screenHeight) {
                this._lastX = ev.x;
                this._lastY = ev.y;
            }
        }

        public resetMoved() {
            this._moved = false;
        }

        private onMouseDown = (ev: MouseEvent) => {
            ev.preventDefault();
            this.updateLastPosition(ev);

            if (ev.button === 0)
                this._leftDown = true;
            else if (ev.button === 2)
                this._rightDown = true;

            if (ev.button === 0 && FullscreenButton.activeInstance !== null) {
                //Fullscreen needs to be triggered from the down event..
                if (input.getInteractableUnderPointer(this.x, this.y) === FullscreenButton.activeInstance)
                    renderer.enterFullscreen();
            }
        }

        private onMouseMove = (ev: MouseEvent) => {
            ev.preventDefault();
            this.updateLastPosition(ev);
            this._moved = true;
        }

        private onMouseOut = (ev: MouseEvent) => {
            ev.preventDefault();
            //Nothing to do..
        }

        private onMouseOver = (ev: MouseEvent) => {
            ev.preventDefault();
            //Nothing to do..
        }

        private onMouseUp = (ev: MouseEvent) => {
            ev.preventDefault();
            this.updateLastPosition(ev);
            if (ev.button === 0)
                this._leftDown = false;
            else if (ev.button === 2)
                this._rightDown = false;
        }

        private onMouseWheel = (ev: MouseEvent) => {
            ev.preventDefault();
            //TODO: Do we handle this?
        }
    }
}