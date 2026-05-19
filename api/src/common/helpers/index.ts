import { readFileSync } from 'fs';
import YAML from 'yaml';

interface AppConfig {
  corsAllowList: string[];
}

export const getConfig = (configPath: string) => {
  try {
    const file = readFileSync(configPath , 'utf8');
    const config = YAML.parse(file);

    return config as AppConfig;
  } catch (err) {
    console.error('Failed to load config:', err);
    process.exit(1);
  }
}

export const getPublicFilesBaseUrl = () => {
  const rawBaseUrl = process.env.PUBLIC_FILES_URL || "/files";
  return rawBaseUrl.replace(/\/$/, "");
};