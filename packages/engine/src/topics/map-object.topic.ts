import { createTopic } from "@javelin/ecs";

/**
 * Map objects set in tiled
 * - Span point to set the initial player position
 */
export const mapObjectTopic = createTopic<Phaser.Types.Tilemaps.TiledObject>();
