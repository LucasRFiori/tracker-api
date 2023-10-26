import { config } from "../../project.config";
import { Hateoas } from "../hateoas";

export function addHateoasToLocations(locations: any, deviceId: string) {
  return locations.map((location: any) => ({
    location,
    links: Hateoas.createResourceLinks(`${config.NODE_URL}/devices`, deviceId),
  }));
}
