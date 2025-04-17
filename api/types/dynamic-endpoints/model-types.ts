import type mongoose from "mongoose";

export type MongooseModelsMap = Record<string, mongoose.Model<any>>;
