import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { getDevice, getBrand, getGeneralPositons } from "./resolvers/index";
import { BrandType, DeviceType, GeneralType } from "./ObjectType";

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      device: {
        type: DeviceType,
        args: {
          deviceId: { type: new GraphQLNonNull(GraphQLString) },
          date: { type: GraphQLString },
        },
        resolve: getDevice,
      },
      brand: {
        type: BrandType,
        args: {
          brand: { type: new GraphQLNonNull(GraphQLString) },
          date: { type: GraphQLString },
        },
        resolve: getBrand,
      },
      general: {
        type: GeneralType,
        args: {
          date: { type: GraphQLString },
        },
        resolve: getGeneralPositons,
      },
    },
  }),
});
