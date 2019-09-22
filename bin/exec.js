const path = require('path')
const fs = require('fs')
const {
  getOnceDir
} = require('./common')

const args = process.argv.splice(3)
let scriptFn = args.shift()
const scriptFnExt = path.extname(scriptFn)
if (!scriptFnExt) scriptFn += '.js'

const onceDir = getOnceDir()
const scriptFp = path.resolve(onceDir, scriptFn)

if (!fs.existsSync(scriptFp)) {
  console.error(`File "${scriptFn}" does not exist in directory "${onceDir}"`)
  return
}

const customYargs = require(scriptFp).argv
const run = require(scriptFp).default

if (!run) {
  console.error(`File "${scriptFn}" has no default export`)
  return
}

if (typeof run !== 'function') {
  console.error(`File "${scriptFn}" default export is not a function`)
  return
}

/* YARGS */
let argv = null
if (customYargs) {
  const yargs = require('yargs')(args)
  try {
    argv = customYargs(yargs).scriptName(`once ${scriptFn}`).argv
  } catch (err) {
    console.error(err)
    return
  }
}
// use default argv config
if (!argv) argv = require('yargs')(args).scriptName(`once ${scriptFn}`).argv

async function main() {
  await run(argv)
  process.exit()
}

main()