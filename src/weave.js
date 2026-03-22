#!/usr/bin/env node
/**
 * Weave CLI v0.2.0
 * Usage:
 *   weave compile app.web      → outputs app.js
 *   weave run app.web          → compiles and runs with Node
 */

const fs   = require('fs');
const path = require('path');
const { WeaveCompiler } = require('./compiler');

const [,, command, inputFile] = process.argv;

if (!command || !inputFile) {
  console.log(`
  Weave v0.2.0

  Usage:
    weave compile <file.web>    Output compiled JavaScript
    weave run <file.web>        Compile and run immediately
  `);
  process.exit(0);
}

if (!fs.existsSync(inputFile)) {
  console.error(`Error: File not found — ${inputFile}`);
  process.exit(1);
}

const source   = fs.readFileSync(inputFile, 'utf8');
const compiler = new WeaveCompiler();
const output   = compiler.compile(source);

if (command === 'compile') {
  const outFile = inputFile.replace(/\.web$/, '.js');
  fs.writeFileSync(outFile, output);
  console.log(`✓ ${inputFile} → ${outFile}`);

} else if (command === 'run') {
  const tmp = path.join(require('os').tmpdir(), path.basename(inputFile).replace(/\.web$/, '.js'));
  fs.writeFileSync(tmp, output);
  require('child_process').execSync(`node "${tmp}"`, { stdio: 'inherit' });

} else {
  console.error(`Unknown command: ${command}`);
  process.exit(1);
}
