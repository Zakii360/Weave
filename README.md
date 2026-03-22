# Weave 🌿

> Simple scripting that compiles to JavaScript. No fluff, no ceremony.

---

## The whole language in 30 seconds

```weave
// Store a value
let name = "Mike"

// Print to the console
say("Hello, " + name + "!")

// Define a task (function)
task greet(person) {
  return "Hey, " + person + "!"
}

say(greet(name))

// Put text on a webpage
put("Ready!", "#status")

// Listen for a click
on("#btn", "click", handleClick)

task handleClick() {
  put("Clicked!", "#status")
}

// Load data from the internet
let data = load("https://api.example.com/items")
say(data)
```

That's it. Four built-in actions: **say**, **put**, **on**, **load**. The rest is just normal logic.

---

## Install

```bash
npm install -g weave-lang
```

Or grab a ready-to-run binary from the [Releases](../../releases) page — no Node.js required.

## Usage

```bash
weave compile app.web     # outputs app.js
weave run app.web         # compile and run right now
```

## Built-in actions

| Action | Does what |
|--------|-----------|
| `say(value)` | Print to the console |
| `put(value, "#id")` | Put text on a webpage element |
| `on("#id", "click", task)` | Run a task when something is clicked |
| `load("url")` | Fetch data from the internet |

## Everything else

- `let name = "value"` — store something
- `task name(args) { }` — define a reusable block of code
- `if / else / for / while` — standard logic, works as you'd expect
- `// comment` — notes to yourself

## Download (no install needed)

Go to **Releases → Assets** and grab:
- `weave-windows.exe` — Windows
- `weave-mac` — macOS
- `weave-linux` — Linux

## Contributing

See [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md).

## License

MIT
