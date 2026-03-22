/**
 * Weave Compiler v0.3.0
 * Compiles .web files to JavaScript
 *
 * say("hello")          -> console.log("hello")
 * put(msg, "#box")      -> document.querySelector("#box").textContent = msg
 * on("#btn","click",fn) -> querySelector("#btn").addEventListener("click", fn)
 * load("url")           -> await fetch(url).then(r => r.json())
 * ping("url")           -> await fetch(url,{method:"HEAD"}).then(r=>r.ok).catch(()=>false)
 * task name(args) {}    -> function name(args) {}
 * let x = 5             -> let x = 5  (unchanged)
 */

class WeaveCompiler {
  compile(source) {
    return source
      .split('\n')
      .map(line => this.compileLine(line))
      .join('\n');
  }

  compileLine(line) {
    const t = line.trim();

    // Pass through empty lines and comments
    if (t === '' || t.startsWith('//')) return line;

    // task name(args) { -> function name(args) {
    if (/^task\s+\w+\s*\(/.test(t)) {
      return line.replace(/\btask\b/, 'function');
    }

    // say(...) -> console.log(...)
    if (/\bsay\s*\(/.test(t)) {
      return line.replace(/\bsay\s*\(/g, 'console.log(');
    }

    // ping("url") -> await fetch(url,{method:"HEAD"}).then(r=>r.ok).catch(()=>false)
    if (/\bping\s*\(\s*["']/.test(t)) {
      return line.replace(
        /\bping\s*\(\s*["'](.+?)["']\s*\)/g,
        `await fetch('$1', { method: 'HEAD' }).then(r => r.ok).catch(() => false)`
      );
    }

    // put(value, "#selector") -> document.querySelector("#selector").textContent = value
    const putMatch = t.match(/^put\s*\(\s*(.+?)\s*,\s*["'](.+?)["']\s*\)$/);
    if (putMatch) {
      const [, value, selector] = putMatch;
      const indent = line.match(/^(\s*)/)[1];
      return `${indent}document.querySelector("${selector}").textContent = ${value};`;
    }

    // on("#selector", "event", handler) -> querySelector(...).addEventListener(...)
    const onMatch = t.match(/^on\s*\(\s*["'](.+?)["']\s*,\s*["'](.+?)["']\s*,\s*(.+?)\s*\)$/);
    if (onMatch) {
      const [, selector, event, handler] = onMatch;
      const indent = line.match(/^(\s*)/)[1];
      return `${indent}document.querySelector("${selector}").addEventListener("${event}", ${handler});`;
    }

    // load("url") -> await fetch("url").then(r => r.json())
    if (/\bload\s*\(\s*["']/.test(t)) {
      return line.replace(/\bload\s*\(\s*["'](.+?)["']\s*\)/g, `await fetch('$1').then(r => r.json())`);
    }

    // Pass everything else through (let, const, if, for, return, etc.)
    return line;
  }
}

module.exports = { WeaveCompiler };
