#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process');

const args = process.argv.splice(2)

// check if babel config is in project directory
const baseDir = process.env.PWD
const onceDir = path.resolve(baseDir, 'once')

// get babel config
let babelConfigFp = path.resolve(onceDir, 'babel.config.js')
if (!fs.existsSync(babelConfigFp)) babelConfigFp = path.resolve(__dirname,  'babel.config.js')

const execFp = path.resolve(__dirname, 'exec')

const cmdStr = `./node_modules/.bin/babel-node --config-file ${babelConfigFp} ${execFp} -- ${args.join(' ')}`

const cmd = exec(cmdStr)

cmd.stdout.on('data', function(data) {
  console.log(data.trim()); 
});

cmd.stderr.on('data', function(data) {
  console.error(data.trim())
})