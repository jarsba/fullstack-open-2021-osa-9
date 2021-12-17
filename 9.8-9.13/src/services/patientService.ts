import patients from '../../data/patients';
import {v1 as uuid} from 'uuid';

import { Patient, NonSensitivePatient, NewPatient, NewEntry, Entry } from '../types';

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
    entries: []
  };

  // patients.push(entry)

  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(d => d.id === id);
  return patient;
};

const addPatientEntry = (id: string, entry: NewEntry): Entry => {

  const newEntry = {
    id: uuid(),
    ...entry
  };

  const patient = findById(id);
  if (patient) {
    // patient.entries.push(newEntry);
  }

  return newEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  findById,
  addPatient,
  addPatientEntry
};