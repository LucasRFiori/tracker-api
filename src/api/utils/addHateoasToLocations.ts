import { config } from "../../project.config";
import { Location } from "../../typings/Api.types";
import { Hateoas } from "../hateoas";

export function addHateoasToLocations(locations: Location[], deviceId: string) {
  return locations.map((location) => ({
    location,
    links: Hateoas.createResourceLinks(`${config.NODE_URL}/devices`, deviceId),
  }));
}
