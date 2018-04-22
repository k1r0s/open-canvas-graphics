export class GameControls {
  static ARROW_LEFT = false
  static ARROW_DOWN = false
  static ARROW_RIGHT = false
  static ARROW_UP = false
  static SPACE = false
  static CONTROL = false
  static MOUSE_RIGHT = false
  static MOUSE_LEFT = false

  static ARROW_LEFT_CODE = 37
  static ARROW_DOWN_CODE = 40
  static ARROW_RIGHT_CODE = 39
  static ARROW_UP_CODE = 38
  static SPACE_CODE = 32
  static CONTROL_CODE = 17
  static MOUSE_RIGHT_CODE = 3
  static MOUSE_LEFT_CODE = 1

  static keyMapper = []

  static setup() {
    this.keyMapper[this.ARROW_LEFT_CODE] = 'ARROW_LEFT';
    this.keyMapper[this.ARROW_DOWN_CODE] = 'ARROW_DOWN';
    this.keyMapper[this.ARROW_RIGHT_CODE] = 'ARROW_RIGHT';
    this.keyMapper[this.ARROW_UP_CODE] = 'ARROW_UP';
    this.keyMapper[this.SPACE_CODE] = 'SPACE';
    this.keyMapper[this.CONTROL_CODE] = 'CONTROL';
    this.keyMapper[this.MOUSE_RIGHT_CODE] = 'ARROW_RIGHT';
    this.keyMapper[this.MOUSE_LEFT_CODE] = 'MOUSE_LEFT';
  }

  static keyboard() {
    this.setup();
    window.addEventListener("keydown", this.handle.bind(this));
    window.addEventListener("keyup", this.handle.bind(this));
  }

  static mouse() {
    this.setup();
    window.addEventListener("mousedown", this.handle.bind(this));
    window.addEventListener("mouseup", this.handle.bind(this));
  }

  static isPressed(evt) {
    return evt.type.search("down") > -1;
  }

  static handle(evt) {
    evt.preventDefault();
    this[this.keyMapper[evt.which]] = this.isPressed(evt);
  }
}
