import { Model, FilterQuery, PipelineStage } from 'mongoose';

import { getPublicFilesBaseUrl } from '../helpers';

export const findAll = async <T>(
  model: Model<T>,
  options: {
    query?: FilterQuery<T>;
    lang?: string;
    sortBy?: string;
    limit?: number;
  } = {}
): Promise<T[]> => {
  const { query = {}, lang = "gr", sortBy = "id", limit } = options;
  
  const validLang = ["gr", "en"].includes(lang) ? lang : "gr";
  
  const pipeline: PipelineStage[] = [
    { $match: query },
    { $sort: { [sortBy]: -1 } },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            "$$ROOT",
            { $getField: { field: validLang, input: "$info" } }
          ]
        }
      }
    },
    { $unset: "info" }
  ];
  
  if (limit !== undefined) {
    pipeline.push({ $limit: limit });
  }
  
  const aggregatedData = await model.aggregate(pipeline);

  return aggregatedData.map((datum: any) => {
    let jsonString = JSON.stringify(datum);
    const publicFilesBaseUrl = getPublicFilesBaseUrl();
    jsonString = jsonString.replace(/"\//g, `"${publicFilesBaseUrl}/`);
    return JSON.parse(jsonString);
  });
};

export const findOne = async <T>(
  model: Model<T>,
  query: FilterQuery<T>,
  options: {
    lang?: string;
  } = {}
): Promise<T | null> => {
  const { lang = "gr" } = options;
  
  const validLang = ["gr", "en"].includes(lang) ? lang : "gr";
  
  const pipeline: PipelineStage[] = [
    { $match: query },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            "$$ROOT",
            { $getField: { field: validLang, input: "$info" } }
          ]
        }
      }
    },
    { $unset: "info" }
  ];
  
  const aggregatedData = await model.aggregate(pipeline);
  
  if (aggregatedData.length === 0) {
    return null;
  }
  
  // Apply URL replacement to the first result
  let jsonString = JSON.stringify(aggregatedData[0]);
  const publicFilesBaseUrl = getPublicFilesBaseUrl();
  jsonString = jsonString.replace(/"\//g, `"${publicFilesBaseUrl}/`);

  return JSON.parse(jsonString);
};
