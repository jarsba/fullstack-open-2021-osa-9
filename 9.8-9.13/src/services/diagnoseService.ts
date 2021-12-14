import diagnoses from '../../data/diagnoses';

import { DiagnoseEntry } from '../types';

const getEntries = (): Array<DiagnoseEntry> => {
  return diagnoses;
};

const addEntry = (entry: DiagnoseEntry): DiagnoseEntry => {

  // diagnoses.push(entry)

  return entry;
};

const findByCode = (code: string): DiagnoseEntry | undefined => {
  const entry = diagnoses.find(d => d.code === code);
  return entry;
};

export default {
  getEntries,
  findByCode,
  addEntry
};