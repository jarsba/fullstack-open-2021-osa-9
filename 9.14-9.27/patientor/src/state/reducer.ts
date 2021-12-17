import { State } from "./state";
import { Diagnosis, Patient, Entry } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_PATIENT_DETAILS";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[]
  }
  | {
    type: "ADD_PATIENT_ENTRY";
    payload: Entry
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT_DETAILS":
      return {
        ...state,
        patientDetails: {
          ...action.payload
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: action.payload
      };
    case "ADD_PATIENT_ENTRY":
      if (state.patientDetails) {
        return {
          ...state,
          patientDetails: {
            ...state.patientDetails,
            entries: [...state.patientDetails?.entries, action.payload]
          }
        };
      } else {
        return {
          ...state,
        };
      }
    default:
      return state;
  }
};

export const setPatientList = (patientListFromAPI: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientListFromAPI
  };
};

export const setPatientDetails = (patientDetailsFromAPI: Patient): Action => {
  return {
    type: "SET_PATIENT_DETAILS",
    payload: patientDetailsFromAPI
  };
};


export const addPatient = (patientDetails: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patientDetails
  };
};

export const setDiagnosisList = (diagnosisListFromAPI: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosisListFromAPI
  };
};

export const addPatientEntry = (entry: Entry): Action => {
  return {
    type: "ADD_PATIENT_ENTRY",
    payload: entry
  };
};