import fs from "node:fs";
import path from "node:path";
import {spawn, spawnSync } from "node:child_process";


fs.rmSync("dist", { recursive: true, force: true });
const webPath = path.resolve("src","apps","web");
const appPath = path.resolve("src","apps","app");
spawnSync("npm run", ["--prefix", webPath, "build"], { stdio: "inherit", shell: true });
spawn("npm run", ["--prefix", appPath, "build"], { stdio: "inherit", shell: true });