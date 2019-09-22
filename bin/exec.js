const path = require('path')

const args = process.argv.splice(3)
const scriptFn = args.shift()

const baseDir = process.env.PWD
const onceDir = path.resolve(baseDir, 'once')
const scriptFp = path.resolve(onceDir, scriptFn)

const customYargs = require(scriptFp).argv
const run = require(scriptFp).default

let argv = null
if (customYargs) {
  const yargs = require('yargs')(args)
  argv = customYargs(yargs).scriptName(`once ${scriptFn}`).argv
}
// use default argv config
if (!argv) argv = require('yargs')(args).scriptName(`once ${scriptFn}`).argv

run(argv)