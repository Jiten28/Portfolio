import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";
const source = fs.readFileSync("src/data/projects.ts", "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
  },
}).outputText;
const sandbox = { exports: {} };
vm.runInNewContext(compiled, sandbox);
const projects = sandbox.exports.projects;
const slugs = new Set();
for (const project of projects) {
  if (slugs.has(project.slug))
    throw new Error(`Duplicate project: ${project.slug}`);
  slugs.add(project.slug);
  if (!project.name || (!project.githubUrl && !project.demoUrl))
    throw new Error(`Missing project details: ${project.slug}`);
  for (const image of [
    `/projects/${project.slug}.webp`,
    ...(project.workImages || []),
  ]) {
    if (!fs.existsSync(path.join("public", image.slice(1))))
      throw new Error(`Missing asset: ${image}`);
  }
}
for (const asset of [
  "Jiten_Kumar_CV.pdf",
  "favicon.svg",
  "og-image.png",
  "_redirects",
]) {
  if (!fs.existsSync(path.join("public", asset)))
    throw new Error(`Missing required asset: ${asset}`);
}
console.log(
  `Checked ${projects.length} projects: unique slugs, valid destinations, and all required local assets present.`,
);
