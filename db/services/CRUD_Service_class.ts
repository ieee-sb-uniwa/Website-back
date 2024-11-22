import { Model, Document, FilterQuery, UpdateQuery } from "mongoose";

class MongoCrudService {
  // Create
  async create<T extends Document>(
    model: Model<T>,
    data: Partial<T>
  ): Promise<T> {
    const document = new model(data);
    return await document.save();
  }

  // Read (Find One)
  async findOne<T extends Document>(
    model: Model<T>,
    query: FilterQuery<T>
  ): Promise<T | null> {
    return await model.findOne(query);
  }

  // Read (Find Many)
  async findAll<T extends Document>(
    model: Model<T>,
    query: FilterQuery<T> = {}
  ): Promise<T[]> {
    // console.log("$$$ Running findAll $$$");
    return await model.find(query);
  }

  // Update
  async update<T extends Document>(
    model: Model<T>,
    query: FilterQuery<T>,
    update: UpdateQuery<T>
  ): Promise<T | null> {
    return await model.findOneAndUpdate(query, update, { new: true });
  }

  // Delete
  async delete<T extends Document>(
    model: Model<T>,
    query: FilterQuery<T>
  ): Promise<T | null> {
    return await model.findOneAndDelete(query);
  }
}

export default MongoCrudService;
