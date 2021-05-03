import { World, Component, ComponentType } from "@javelin/ecs";

export class EntryService {
  static create(world: World, componentTypes: ComponentType[]) {
    const entry: Component[] = [];
    for (const ComponentType of componentTypes) {
      entry.push(world.component(ComponentType));
    }
    return entry as ReadonlyArray<Component>;
  }
}
