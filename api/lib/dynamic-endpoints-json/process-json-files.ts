import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join, resolve } from "path";

// Load JSON files and generate TypeScript types
export const processJsonFiles = async (
  dataDir = resolve(__dirname, "../../db/data")
  // typesDir = resolve(__dirname, "../../types/dynamic-endpoints")
) => {
  // Read all JSON files in the data directory
  console.log("Reading JSON files from:", dataDir);
  const jsonFiles = readdirSync(dataDir).filter((file) =>
    file.endsWith(".json")
  );

  // Read the contents of each JSON file
  const jsonContents = jsonFiles.map((file) => {
    const filePath = join(dataDir, file);
    const content = JSON.parse(readFileSync(filePath, "utf-8"));
    return { name: file.replace(".json", ""), content };
  });

  // // Generate TypeScript types for each JSON file
  // for (const { name, content } of jsonContents) {
  //   // console.log("");
  //   // console.log("JSON Name: ", name);
  //   // console.log("JSON Content: ", content);
  //   // console.log("");
  //   const tsType = await compile(content, name);
  //   const typeFilePath = `${typesDir}/${name}.d.ts`;
  //   writeFileSync(typeFilePath, tsType);
  //   console.log(`\nTypeScript type for ${name} saved to ${typeFilePath}`);
  // }

  return jsonContents;
};
