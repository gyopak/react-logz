import express from 'express';
import cors from 'cors';
import fs from 'fs';

const mockLogLines = JSON.parse(fs.readFileSync('mockLogLines.json'));

const app = express();
const PORT = 9000;

app.use(cors());

const getRandomType = () => {
  const rand = Math.random();
  if (rand < 0.60) return 'INFO';
  if (rand < 0.90) return 'WARNING';
  return 'ERROR';
};

const getRandomLine = (type) => {
  const logLines = mockLogLines[type];
  return logLines[Math.floor(Math.random() * logLines.length)];
};

const generateLogLine = (before = Date.now(), after = Date.now() - 10000) => {
  const time = Math.floor(Math.random() * before) + after;
  const type = getRandomType();
  const line = getRandomLine(type);
  return {
    time,
    type,
    line,
  };
};

app.get('/logs', (req, res) => {
  const limit = req.query.limit || Math.floor(Math.random() * 3) + 1;
  const before = req.query.before || Date.now();
  const after = req.query.after || 0;
  const logs = [...Array(limit).keys()].map(() => generateLogLine(before, after));
  const timeOut = req.query.limit < 3 ? 1000 : 3000;
  setTimeout(() => {
    res.send({
      limit: req.query.limit || -1,
      before,
      after,
      logs: logs.sort((a, b) => a.time < b.time),
      count: logs.length,
    });
  }, timeOut);
});

app.listen(PORT, () => {
  console.log(`Mock API listening at http://localhost:${PORT}`);
});
