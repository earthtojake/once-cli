# once
No-nonsense scripting to support your applications. Scripts are configured with babel-node and yargs out of the box so that you can start scripting in minutes.

## Setup
`yarn global add once-scripts`

or

`npm i -g node-scripts`

## Usage
Create a `./once` directory in the root folder of your application:

```
-- node_modules
-- once/
   -- script.js
   -- scriptWithArgs.js
   -- nested
      --script.js
-- src
-- package.json
```

### Execute
The files in this directory can be executed via the command line by filename:

`once <file_name> <arg1> <arg2> ...`

`once script.js`

`once scriptWithArgs.js --key1=val1 --key2=val2`

`once nested/script.js --arg1 --arg2`

### Scripts
The default export function in script files is executed with `once` and can be sync or async. The default yargs config is used to parse command line arguments, but can be customised with an exported function `argv: (yargs) => yargs.boolean(...)`. An example of a script file which counts to 10 is shown below:

```

// custom "yargs" config (see http://yargs.js.org/)
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

```
