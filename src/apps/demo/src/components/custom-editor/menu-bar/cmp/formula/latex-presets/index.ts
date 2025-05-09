const allModules = [];
const requireModules = import.meta.glob('./modules/**/*.ts', { eager: true });
for (const path in requireModules) {
  const moduleConent: any = requireModules[path];
  allModules.push(moduleConent.default);
}

export default allModules;
