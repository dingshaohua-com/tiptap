import path from "node:path";
import { spawn } from "node:child_process";

const webPath = path.resolve("src","apps","doc");
// const appPath = path.resolve("src","apps","app");
spawn("npm run", ["--prefix", webPath, "start"], { stdio: "inherit", shell: true });
// spawn("npx nodemon --exec npm run", ["--prefix", appPath, "dev"], { stdio: "inherit", shell: true });

