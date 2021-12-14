import patients from '../../data/patients';
import {v1 as uuid} from 'uuid'

import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types';

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  // patients.push(entry)

  return newPatientEntry;
};

const findById = (id: string): PatientEntry | unknown => {
  const entry = patients.find(d => d.id === id);
  return entry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  findById,
  addEntry
};