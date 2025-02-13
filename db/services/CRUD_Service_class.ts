import type { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';

// SQL    -  NoSQL
// Table  - Collection
// Row    - Document

/**
 * A class that provides CRUD operations for MongoDB
 * @class MongoCrudService
 * @template T - The type of the document
 * @create Create new document in a Collection
 * @findOne Get One Document from a Collection (Find One)
 * @findAll Get All Documents from a Collection (Find Many)
 * @update Update One Document in a Collection
 * @delete Delete One Document from a Collection
 */
class MongoCrudService {
  /**
   * Create a new document in a collection
   * @method create
   * @param {Model<T>} model - The document's Mongoose Model
   * @param {Partial<T>} data - The data to create the document with
   * @returns {Promise<T>} The created document
   */
  async create<T extends Document>(
    model: Model<T>,
    data: Partial<T>
  ): Promise<T> {
    const document = new model(data);
    return document.save();
  }

  /**
   * Get one document from a collection
   * @method findOne
   * @param {Model<T>} model - The document's Mongoose Model
   * @param {FilterQuery<T>} query - The query to find the document
   * @returns {Promise<T | null>} The found document or null if not found
   */
  async findOne<T extends Document>(
    model: Model<T>,
    query: FilterQuery<T>
  ): Promise<T | null> {
    return model.findOne(query);
  }

  /**
   * Get all documents from a collection
   * @method findAll
   * @param {Model<T>} model - The document's Mongoose Model
   * @param {FilterQuery<T>} [query={}] - The query to find the documents
   * @returns {Promise<T[]>} An array of all found documents
   */
  async findAll<T extends Document>(
    model: Model<T>
    // query: FilterQuery<T> = {}
  ): Promise<T[]> {
    return model.find();
  }

  async findHead<T extends Document>(
    model: Model<T>,
    // query: FilterQuery<T> = {},
    sortedBy: string,
    amount: number
  ): Promise<T[]> {
    return model
      .find()
      .sort({ [sortedBy]: -1 })
      .limit(amount);
  }

  /**
   * Update one document in a collection
   * @method update
   * @param {Model<T>} model - The document's Mongoose Model
   * @param {FilterQuery<T>} query - The query to find the document
   * @param {UpdateQuery<T>} update - The update to apply to the document
   * @returns {Promise<T | null>} The updated document or null if not found
   */
  async update<T extends Document>(
    model: Model<T>,
    query: FilterQuery<T>,
    update: UpdateQuery<T>
  ): Promise<T | null> {
    return model.findOneAndUpdate(query, update, { new: true });
  }

  /**
   * Delete one document from a collection
   * @method delete
   * @param {Model<T>} model - The document's Mongoose Model
   * @param {FilterQuery<T>} query - The query to find the document
   * @returns {Promise<T | null>} The deleted document or null if not found
   */
  async delete<T extends Document>(
    model: Model<T>,
    query: FilterQuery<T>
  ): Promise<T | null> {
    return model.findOneAndDelete(query);
  }
}

export default MongoCrudService;
