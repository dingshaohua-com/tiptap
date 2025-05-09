import fs from "node:fs";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import fsExtra from "fs-extra/esm";




const projectRoot = path.resolve(process.cwd());
const rootDist = path.resolve(projectRoot, "dist");
fs.rmSync(rootDist, { recursive: true, force: true });

// 获取都有哪些项目
const ignoreDir = [".DS_Store",  "extension"];
const appsDir = path.resolve("apps");
const apps = fs.readdirSync(appsDir, { withFileTypes: true }).filter(it=>!ignoreDir.includes(it.name));

// 开始打包
apps.forEach((app) => {
  if (ignoreDir.includes(app.name)) return false;
  const appPath = path.resolve(app.parentPath, app.name);
  spawnSync("npm run", ["--prefix", appPath, "build"], {
    stdio: "inherit",
    shell: true,
  });
  const appDist = path.resolve(appPath, "dist");
  const appDistNewPath = path.resolve(rootDist, app.name);
  fsExtra.moveSync(appDist, appDistNewPath, { overwrite: true });
});