// src/utils/fileDb.js
const fs = require('fs');
const path = require('path');

function getFilePath(fileName) {
  return path.join(__dirname, '..', '..', 'data', fileName);
}

function readJson(fileName) {
  const filePath = getFilePath(fileName);
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, 'utf8') || '[]';
  return JSON.parse(raw);
}

function writeJson(fileName, data) {
  const filePath = getFilePath(fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = {
  readJson,
  writeJson,
};
