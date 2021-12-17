import React from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { Icon, Header, Button } from "semantic-ui-react";

import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import { Patient, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { setPatientDetails, addPatientEntry } from "../state/reducer";
import PatientEntry from "../components/PatientEntry";

type PatientParams = {
  patient: string;
};

const PatientDetailsPage = () => {
  const [{ patientDetails }, dispatch] = useStateValue();
  const { patient } = useParams<PatientParams>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient}/entries`,
        values
      );
      dispatch(addPatientEntry(newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || "Unknown Error");
      setError(e.response?.data?.error || "Unknown error");
    }
  };

  const fetchPatientDetails = async (patient: string) => {
    try {
      const { data: patientDetailsFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${patient}`
      );
      dispatch(setPatientDetails(patientDetailsFromApi));
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    if (!patientDetails || patientDetails.id !== patient) {
      void fetchPatientDetails(patient);
    }
  }, [dispatch]);

  let genderSymbol;

  switch (patientDetails?.gender) {
    case "male":
      genderSymbol = <Icon name="mars"></Icon>;
      break;
    case "female":
      genderSymbol = <Icon name="venus"></Icon>;
      break;
    default:
      genderSymbol = <div></div>;
      break;
  }

  return (
    <div className="App">
      <Header as="h2">
        {patientDetails?.name} <span>{genderSymbol}</span>
      </Header>
      <p>
        ssn: {patientDetails?.ssn}
        <br />
        occupation: {patientDetails?.occupation}
      </p>
      <Header as="h3">entries</Header>
      {patientDetails?.entries.map((n) => (
        <PatientEntry key={n.id} entry={n} />
      ))}

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientDetailsPage;
