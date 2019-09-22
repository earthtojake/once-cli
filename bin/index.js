#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process');
const { getOnceDir } = require('./common');
const newScript = require('./new').default;
const initOnce = require('./init').default;

const args = process.argv.splice(2)

if (args[0] === 'init') {
  initOnce()
  return
} else if (args[0] === 'new') {
  newScript(args[1])
  return
}

const onceDir = getOnceDir()

// check if babel config is in project directory
// get babel config
let babelConfigFp = path.resolve(onceDir, 'babel.config.js')
if (!fs.existsSync(babelConfigFp)) babelConfigFp = path.resolve(__dirname,  'babel.config.js')

const execFp = path.resolve(__dirname, 'exec')
const babelNodeFp = path.resolve(__dirname, '../node_modules/.bin/babel-node')

const cmdStr = `${babelNodeFp} --config-file ${babelConfigFp} ${execFp} -- ${args.join(' ')}`
const cmd = exec(cmdStr)

cmd.stdout.on('data', function(data) {
  console.log(data.trim()); 
});

cmd.stderr.on('data', function(data) {
  console.error(data.trim())
})