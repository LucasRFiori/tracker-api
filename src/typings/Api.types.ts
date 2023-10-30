// To parse this data:
//
//   import { Convert } from "./file";
//
//   const locations = Convert.toLocations(json);

export interface Locations {
  location: Location;
  links: Link[];
}

export interface Link {
  rel: Rel;
  method: Method;
  href: string;
}

export enum Method {
  Delete = "DELETE",
  Get = "GET",
  Patch = "PATCH",
  Post = "POST",
}

export enum Rel {
  Consult = "consult",
  Create = "create",
  Locations = "locations",
  Remove = "remove",
  Update = "update",
}

export interface Location {
  latitude: number;
  longitude: number;
  createdAt: Date;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toLocations(json: string): Locations[] {
    return JSON.parse(json);
  }

  public static locationsToJson(value: Locations[]): string {
    return JSON.stringify(value);
  }
}
