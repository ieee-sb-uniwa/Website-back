import YAML from "yaml";

export const readYamlFile = async (filePath: string) => {
  console.log("🚀 ~ filePath:", filePath);
  console.log("Checking YAML Config path...");

  try {
    // Checking the filePath
    if (!filePath) {
      throw new Error("readYamlFile: File path is required");
    }

    if (typeof filePath !== "string") {
      throw new Error("readYamlFile: File path should be a string");
    }

    if (!filePath.endsWith(".yaml") && !filePath.endsWith(".yml")) {
      throw new Error(
        "readYamlFile: File path should be a YAML file. A file with .yaml or .yml extension"
      );
    }

    console.log("Checking YAML Config path...");
    const bunFile = Bun.file(filePath);
    const yamlString = await bunFile.text();
    console.log("🚀 ~ yamlString:", yamlString);
    const readyToUseObj = YAML.parse(yamlString);
    console.log("YAML Config File Found and Parsed.");

    // return YAML.parse(yamlString);
    console.log(
      "🚀 ~ The Convert JS Object from YAML String:\n",
      readyToUseObj
    );

    return readyToUseObj;
  } catch (error) {
    console.error(error);
  }
};
