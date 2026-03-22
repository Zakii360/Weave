const { WeaveCompiler } = require('../src/compiler');

const c = new WeaveCompiler();
let passed = 0, failed = 0;

function test(name, input, expected) {
  const result = c.compileLine(input);
  if (result === expected) {
    console.log(`  ✓ ${name}`);
    passed++;
  } else {
    console.log(`  ✗ ${name}`);
    console.log(`    Expected: ${expected}`);
    console.log(`    Got:      ${result}`);
    failed++;
  }
}

console.log('\nWeave Test Suite v0.3.0\n');

test('say → console.log',      'say("hello")',                     'console.log("hello")');
test('say with variable',      'say(name)',                         'console.log(name)');
test('task → function',        'task greet(name) {',               'function greet(name) {');
test('task no args',           'task run() {',                     'function run() {');
test('put with id selector',   'put(msg, "#box")',                  'document.querySelector("#box").textContent = msg;');
test('on click',               'on("#btn", "click", go)',           'document.querySelector("#btn").addEventListener("click", go);');
test('load url',               'let x = load("https://api.com")',   "let x = await fetch('https://api.com').then(r => r.json())");
test('ping url',               'let ok = ping("https://api.com")',  "let ok = await fetch('https://api.com', { method: 'HEAD' }).then(r => r.ok).catch(() => false)");
test('let passthrough',        'let name = "Mike"',                 'let name = "Mike"');
test('comment passthrough',    '// this is a note',                 '// this is a note');
test('if passthrough',         'if (x > 0) {',                     'if (x > 0) {');
test('return passthrough',     '  return x + 1',                   '  return x + 1');

console.log(`\n  ${passed} passed, ${failed} failed\n`);
process.exit(failed > 0 ? 1 : 0);
