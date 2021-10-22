export interface Viewport {
    /** The horizontal position of the Camera viewport. Default 0. */
    x?: number;
    /** The vertical position of the Camera viewport. Default 0. */
    y?: number;
    /** The width of the Camera viewport. If not given it'll be the game config size. */
    width?: number;
    /** The height of the Camera viewport. If not given it'll be the game config size. */
    height?: number;
};