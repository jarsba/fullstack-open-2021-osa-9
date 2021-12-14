import express from 'express';

import { calculateBmi } from './calculateBmi';
import { calculateExercise, exerciseResult } from './exerciseCalculator';

const app = express();
app.use(express.json());


app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
  const height = Number(_req.query.height);
  const weight = Number(_req.query.weight);

  if (!isNaN(height) && !isNaN(weight)) {
    const bmi = calculateBmi(height, weight);
    res.send(bmi);
  } else {
    res.json({
      error: "malformatted parameters"
    });
  }
});

app.post('/exercises', (_req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const requestJSON: any = _req.body;

  const containsParameters: boolean = Object.prototype.hasOwnProperty.call(requestJSON, 'daily_exercises') && Object.prototype.hasOwnProperty.call(requestJSON, 'target');

  if (!containsParameters) {
    return res.status(400).json({
      error: "parameters missing"
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const isArray: boolean = Array.isArray(requestJSON.daily_exercises);

  if (!isArray) {
    return res.status(400).json({
      error: "malformatted parameters"
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  const hoursArray: Array<any> = requestJSON.daily_exercises;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target = Number(requestJSON.target);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const hours: Array<number> = hoursArray.map(Number);

  const hoursAreNumbers = hours.every(n => typeof n === 'number' && !isNaN(n));

  if (!isNaN(target) && hoursAreNumbers) {
    const exerciseResult: exerciseResult = calculateExercise(target, hours);
    return res.json(exerciseResult);
  } else {
    return res.status(400).json({
      error: "malformatted parameters"
    });
  }
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});