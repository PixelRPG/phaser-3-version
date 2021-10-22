import { Viewport } from '../viewport';
import { CameraBounds } from '../camera-bounds';

export interface Camera {
  viewport: Viewport;

  /** The name of the Camera. Default ''. */
  name?: string;
  /** Set this Camera as being the 'main' camera. This just makes the property `main` a reference to it. Default false. */
  isMain?: boolean;
  /**
   * Set the zoom value of the Camera.
   *
   * Changing to a smaller value, such as 0.5, will cause the camera to 'zoom out'.
   * Changing to a larger value, such as 2, will cause the camera to 'zoom in'.
   *
   * A value of 1 means 'no zoom' and is the default.
   *
   * Changing the zoom does not impact the Camera viewport in any way, it is only applied during rendering.
   */
  zoom?: number;
  /**
   * Define the bounds of the Camera. The bounds are an axis-aligned rectangle.
   *
   * The Camera bounds controls where the Camera can scroll to, stopping it from scrolling off the
   * edges and into blank space. It does not limit the placement of Game Objects, or where
   * the Camera viewport can be positioned.
   *
   * Temporarily disable the bounds by changing the boolean `Camera.useBounds`.
   *
   * Clear the bounds entirely by calling `Camera.removeBounds`.
   *
   * If you set bounds that are smaller than the viewport it will stop the Camera from being
   * able to scroll. The bounds can be positioned where-ever you wish. By default they are from
   * 0x0 to the canvas width x height. This means that the coordinate 0x0 is the top left of
   * the Camera bounds. However, you can position them anywhere. So if you wanted a game world
   * that was 2048x2048 in size, with 0x0 being the center of it, you can set the bounds x/y
   * to be -1024, -1024, with a width and height of 2048. Depending on your game you may find
   * it easier for 0x0 to be the top-left of the bounds, or you may wish 0x0 to be the middle.
   */
  bounds?: CameraBounds;
}
