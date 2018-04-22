export declare class GameControls {
    static ARROW_LEFT: boolean;
    static ARROW_DOWN: boolean;
    static ARROW_RIGHT: boolean;
    static ARROW_UP: boolean;
    static SPACE: boolean;
    static CONTROL: boolean;
    static MOUSE_RIGHT: boolean;
    static MOUSE_LEFT: boolean;
    static ARROW_LEFT_CODE: number;
    static ARROW_DOWN_CODE: number;
    static ARROW_RIGHT_CODE: number;
    static ARROW_UP_CODE: number;
    static SPACE_CODE: number;
    static CONTROL_CODE: number;
    static MOUSE_RIGHT_CODE: number;
    static MOUSE_LEFT_CODE: number;
    static keyMapper: any[];
    static setup(): void;
    static keyboard(): void;
    static mouse(): void;
    static isPressed(evt: any): boolean;
    static handle(evt: any): void;
}
