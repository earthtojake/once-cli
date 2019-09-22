# once
No-nonsense scripting to support your projects. Scripts are configured with [babel-node](https://babeljs.io/docs/en/babel-node) and [yargs](http://yargs.js.org/) out of the box so that you can start scripting in minutes.

## Setup

### Global installation

`yarn global add once-scripts`
or
`npm i -g once-scripts`

`once init` (initialises a `once` target directory)

### Local installation

`yarn add -D once-scripts`
or
`npm i --save-dev once-scripts`

Add the following script to your package.json:

```
{
  "scripts": {
    "once": "once"
  }
}
```

`yarn once init` (initialises a `once` target directory)

## Basic Usage

The script files in your `./once` directory can be called from the command line by their filename:

`once <file_name> <...args>`

To create a new script from a template, use `once new`:

`once new <file_name>`

_Note: To run `once` locally, use `yarn once <file_name> <...args>`_

### Config

The `./once` target directory can be modified by adding file named `once.config.js` in your project's root directory: 

```
module.exports = {
  dir: "once" // change to a different folder
}
```

The default babel preset for scripts is [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env). You can override this preset your own `babel.config.js` in the `once` target directory:

```
-- node_modules
-- once/
   -- babel.config.js
-- src
-- package.json
```

### Scripts
When running your script files, the default export function is executed. This function can be sync or async:

```
// example script file

export default async (argv) => {

  // script goes here

}

```

A parsed "argv" (command line arguments) is passed into the script function as an object. These arguments are parsed using [yargs](http://yargs.js.org/) default parsing. To customise this parsing, add an additional export to your script file called `argv`:

```
// example script file with custom yargs config

export const argv = (yargs) => yargs.boolean(...).usage(...)

export default async (argv) => {

  // script goes here

}
```

_Note: Do not end your `yargs` config with `.argv` such as `yargs.boolean(...).argv`, as outlined in the docs. `once` appends its own parsing to your config, so this needs to be left open._

A complete example of a script is shown below:

```
// custom yargs config (see http://yargs.js.org/)
export const argv = (yargs) => yargs
  .default('n', 10)
  .usage('Usage: $0 -n [num]')
  .help('h')

// async script function which counts n seconds and logs to stdout
export default async (argv) => {

  const {n} = argv

  console.log(`counting to ${n}`)

  for (let i = 1; i <= n; i++) {

    await sleep(1000)
    console.log(i)

  }

}
```
