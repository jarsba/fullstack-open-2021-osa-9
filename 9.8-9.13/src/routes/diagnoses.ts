import express from 'express';

import diagnoseService from '../services/diagnoseService';

import { toNewDiagnoseEntry } from '../utils/parsers';


const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnoseService.getEntries());
});

router.post('/', (req, res) => {

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newDiagnoseEntry = toNewDiagnoseEntry(req.body);

    const addedEntry = diagnoseService.addEntry(newDiagnoseEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/:code', (req, res) => {
  const diagnose = diagnoseService.findByCode(req.params.code);

  if (diagnose) {
    res.send(diagnose);
  } else {
    res.sendStatus(404);
  }
});

export default router;
