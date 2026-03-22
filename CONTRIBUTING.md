# Contributing to Weave

Anyone is welcome. No experience needed to get started.

## Getting set up

```bash
git clone https://github.com/your-username/weave-lang
cd weave-lang
node tests/run.js   # make sure everything passes
```

## Making a change

1. Edit `src/compiler.js`
2. Add a test in `tests/run.js`
3. Run `node tests/run.js` — all tests must pass
4. Open a pull request

## Adding a new feature

1. Write a `.web` example in `examples/` showing how it looks
2. Write the test first (`tests/run.js`)
3. Add the transform in `compileLine()` inside `src/compiler.js`
4. Update the README table

## Releasing a binary

Push a GitHub Release — the Actions workflow builds `.exe`, macOS, and Linux automatically.

## Questions

Open an issue. No question is too basic.
