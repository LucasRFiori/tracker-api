import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
} from "graphql";

export const DeviceType = new GraphQLObjectType({
  name: "DevicePositions",
  fields: {
    deviceId: { type: GraphQLString },
    brand: { type: GraphQLString },
    totalPositions: { type: GraphQLInt },
    totalKm: { type: GraphQLFloat },
  },
});

export const BrandType = new GraphQLObjectType({
  name: "BrandPositions",
  fields: {
    deviceCount: { type: GraphQLInt },
    brand: { type: GraphQLString },
    totalPositions: { type: GraphQLInt },
    totalKm: { type: GraphQLFloat },
  },
});

export const GeneralType = new GraphQLObjectType({
  name: "GeneralPositions",
  fields: {
    deviceCount: { type: GraphQLInt },
    totalPositions: { type: GraphQLInt },
    totalKm: { type: GraphQLFloat },
  },
});
