const path = require('path')
const fs = require('fs')

exports.getOnceDir = () => {

  const projDir = process.env.PWD

  const onceDefaultConfigFp = path.resolve(__dirname, 'once.config.js')
  const onceCustomConfigFp = path.resolve(projDir, 'once.config.js')

  let onceConfig = require(onceDefaultConfigFp)
  if (fs.existsSync(onceCustomConfigFp)) {
    onceConfig = require(onceCustomConfigFp)
  }

  const {
    dir: onceDir,
  } = onceConfig

  return path.resolve(projDir, onceDir)

}

exports.getFnJS = (_fn) => {

  if (!_fn) return undefined
  let fn = _fn
  const ext = path.extname(fn)
  if (!ext) fn += '.js'
  return fn

}