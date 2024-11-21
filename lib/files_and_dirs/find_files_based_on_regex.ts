import { readdirSync, statSync } from "fs";
import { resolve } from "path";

/**
 * Search for files matching a pattern (e.g., .yaml or .yml) in a directory.
 * @param {string} dirPath - The path of the directory to search.
 * @param {RegExp} pattern - The regex pattern to match filenames.
 * @param {boolean} recursive - Whether to search recursively in subdirectories.
 * @returns {string[]} - List of paths to matching files.
 */
export function findFilesByPattern(
  dirPath: string,
  pattern: RegExp,
  recursive: boolean = false
): string[] {
  const files = [];
  const items = readdirSync(dirPath);

  for (const item of items) {
    const fullPath = resolve(dirPath, item);
    const stats = statSync(fullPath);

    if (stats.isDirectory() && recursive) {
      files.push(...findFilesByPattern(fullPath, pattern, true));
    } else if (stats.isFile() && pattern.test(item)) {
      files.push(fullPath);
    }
  }

  return files;
}
