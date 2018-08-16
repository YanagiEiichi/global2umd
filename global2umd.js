#!/usr/bin/env node 

const { readFileSync } = require('fs');
const { basename } = require('path');

let [ , scriptName, fileName, globalName] = process.argv;

let command = basename(scriptName, '.js');

if (fileName === '-h' || fileName === '--help' || !fileName) {
  console.error(`Usage: ${command} <FileName> [GlobalVariableName]`);
  return process.exit(1);
}

if (!globalName) globalName = basename(fileName, '.js');
if (!/^[a-zA-Z_]\w*$/.test(globalName)) throw new Error(`'${globalName}' is not an available javascript variable name.`);

let data = { Name: globalName };

try {
  data.Code = readFileSync(fileName) + '';
} catch (error) {
  let message = [ command, fileName ];
  switch (error.code) {
    case 'ENOENT':
      message.push('No such file or directory');
      break;
    case 'EISDIR':
      message.push('Is a directory');
      break;
    case 'EACCES':
      message.push('Permission denied');
      break;
    default:
      message.push('Uncaught error ' + error.code);
  }
  console.error(message.join(': '));
  return process.exit(2);
}


let adapter = readFileSync(__dirname + '/adapter.js') + '';
let result = adapter.replace(/<!--\s*(\S*)\s*-->/g, ($0, key) => data[key]);

console.log(result);
