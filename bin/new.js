#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { 
  getOnceDir,
  getFnJS
} = require('./common')

const newScriptFn = getFnJS(process.argv[2])

if (!newScriptFn) {
  console.log('Usage: once-new <script_name>')
  return
}

const onceDir = getOnceDir()
const newScriptFp = path.resolve(onceDir, newScriptFn)

if (fs.existsSync(newScriptFp)) {
  
  console.log(`Script "${newScriptFn}" already exists at "${onceDir}"`)

} else {

  if (!fs.existsSync(onceDir)) {
    fs.mkdirSync(onceDir)
    console.log(`Created directory "${onceDir}"`)
  }

  console.log(`Created script "${newScriptFn}" at "${onceDir}"`)

  const exampleScriptFp = path.resolve(__dirname, 'script.example.js')
  const data = fs.readFileSync(exampleScriptFp, {encoding: 'utf8'})
  fs.writeFileSync(newScriptFp, data)

}