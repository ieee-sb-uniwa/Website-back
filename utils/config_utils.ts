import { findFilesByPattern } from "../lib/files_and_dirs/find_files_based_on_regex";
import { readYamlFile } from "../lib/for-handling-yaml/read-yaml-file";
import { EndpointFromConfig, YAMLConfig } from "../types/config_types";

export const readConfig = async () => {
  try {
    const configFile = getConfig();
    const { endpoints, corsAllowlist } = (await readYamlFile(
      configFile
    )) as YAMLConfig;
    return { endpoints, corsAllowlist };
  } catch (error) {
    console.error(error);
    throw new Error("Utils: readConfig: Problem reading config file");
  }
};

export const getConfig = () => {
  const path = "src";
  const regex = /\.(yaml|yml)$/i;

  try {
    const configFiles = findFilesByPattern(path, regex);
    if (configFiles.length === 0) {
      throw new Error(
        "No config file found, please insert one at src/config.yaml"
      );
    }

    if (configFiles.length > 1) {
      throw new Error("Multiple config files found, please use only one");
    }

    return configFiles[0];
  } catch (error) {
    console.error(error);
    throw new Error("Utils: getConfig: Problem reading config file");
  }
};
