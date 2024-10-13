import path from "node:path";
import { spawn } from "node:child_process";


const args = process.argv.slice(2);
const projectName = args[0];
const projectPath = path.resolve("src","apps",projectName);

if (projectName === "doc") {
    spawn("npm run", ["--prefix", projectPath, "start"], { stdio: "inherit", shell: true });
}else if(projectName === "demo"){
    spawn("npm run", ["--prefix", projectPath, "dev"], { stdio: "inherit", shell: true });
}