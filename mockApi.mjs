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
  const time = Math.floor(Math.random() * (Number(before) - Number(after))) + Number(after);
  const type = getRandomType();
  const line = getRandomLine(type);
  return {
    time,
    type,
    line,
  };
};

app.get('/logs', (req, res) => {
  const now = Date.now();
  const before = Number(req.query.before) || now;
  const after = Number(req.query.after) || now - 1000000;
  const limit = after === now - 1000000 ? 50 : Math.round(Math.random()) + 1;

  const logs = [...Array(limit).keys()].map(() => generateLogLine(before, after));
  const timeOut = limit > 5 ? 2000 : 0;

  setTimeout(() => {
    res.send({
      limit: req.query.limit || -1,
      before,
      after,
      logs: logs.sort((a, b) => a.time - b.time),
      count: logs.length,
    });
  }, timeOut);
});

app.listen(PORT, () => {
  console.log(`Mock API listening at http://localhost:${PORT}`);
});
