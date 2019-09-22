#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { getOnceDir } = require('./common')

const onceDir = getOnceDir()

if (fs.existsSync(onceDir)) {
  console.log(`Once directory already exists at "${onceDir}"`)
} else {
  fs.mkdirSync(onceDir)
  const firstScriptFp = path.resolve(onceDir, 'example.js')
  const exampleScriptFp = path.resolve(__dirname, 'script.example.js')
  const data = fs.readFileSync(exampleScriptFp, {encoding: 'utf8'})
  fs.writeFileSync(firstScriptFp, data)
  console.log(`Created directory "${onceDir}"`)
}