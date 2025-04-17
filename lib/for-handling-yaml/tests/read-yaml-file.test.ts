import { describe, expect, test } from "bun:test";
import { readYamlFile } from "../read-yaml-file";

const testFilePaths = {
  generalTestConfig:
    "C:\\Users\\jimzord12\\GitHub\\Website-back\\src\\for-handling-yaml\\tests\\genreal-test-config.yml",
  projectEndpointConfig:
    "C:\\Users\\jimzord12\\GitHub\\Website-back\\src\\for-handling-yaml\\tests\\project-specific-config.yml",
};

describe("TESTING Util Func: read-yaml-file", () => {
  test("reading a general yaml file", async () => {
    const fileContent = await readYamlFile(testFilePaths.generalTestConfig);
    console.log("🚀 ~ fileContent:", fileContent);
    expect(fileContent).not.toBeEmpty();
    expect(fileContent).toBeTypeOf("object");
    expect(fileContent).toContainKeys([
      "title",
      "version",
      "enabled",
      "description",
    ]);
  });

  test("reading a project-based endpoint config yaml file", async () => {
    const fileContent = await readYamlFile(testFilePaths.projectEndpointConfig);
    console.log("🚀 ~ fileContent:", fileContent);
    expect(fileContent).not.toBeEmpty();
    expect(fileContent).toBeTypeOf("object");
    expect(fileContent).toContainAllKeys(["endpoints", "corsAllowlist"]);
    expect(fileContent.endpoints).toBeArrayOfSize(4);
    expect(fileContent.corsAllowlist).toBeArrayOfSize(3);
  });
});
