import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import {
  TextField,
  EntryTypeSelectField,
  EntryTypeOption,
  NumberField,
  DiagnosisSelection,
} from "../AddPatientModal/FormField";
import { Entry, EntryType } from "../types";
import { useStateValue } from "../state";

export type EntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.HealthCheck, label: "HealthCheck" },
  { value: EntryType.OccupationHealthcare, label: "OccupationHealthcare" },
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: EntryType.Hospital,
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        employerName: null,
        sickLeave: {
          startDate: null,
          endDate: null,
        },
        healthCheckRating: null,
        discharge: {
          date: null,
          criteria: null,
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const healthCheckRatingValueError =
          "Health check rating must be a number between 0-3";
        const dateFormatError = "Date must be in YYYY-MM-DD format";
        const errors: { [field: string]: string | { [key: string]: string } } =
          {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        if (values.type === EntryType.Hospital && !values.discharge.date) {
          errors.discharge = {};
          errors.discharge.date = requiredError;
        }
        if (values.type === EntryType.Hospital && !values.discharge.criteria) {
          errors.discharge = {};
          errors.discharge.criteria = requiredError;
        }
        if (
          values.type === EntryType.OccupationHealthcare &&
          !values.employerName
        ) {
          errors.employerName = requiredError;
        }
        if (
          values.type === EntryType.HealthCheck &&
          !values.healthCheckRating
        ) {
          errors.healthCheckRating = requiredError;
        }
        if (
          values.type === EntryType.HealthCheck &&
          (!Number.isInteger(values.healthCheckRating) ||
            values.healthCheckRating! < 0 ||
            values.healthCheckRating! > 3)
        ) {
          errors.healthCheckRating = healthCheckRatingValueError;
        }
        if (!Date.parse(values.date)) {
          errors.date = dateFormatError;
        }
        if (
          values.type === EntryType.OccupationHealthcare &&
          values.sickLeave?.startDate &&
          !Date.parse(values.sickLeave.startDate!)
        ) {
          errors.sickLeave = {};
          errors.sickLeave.startDate = dateFormatError;
        }
        if (
          values.type === EntryType.OccupationHealthcare &&
          values.sickLeave?.endDate &&
          !Date.parse(values.sickLeave.endDate!)
        ) {
          errors.sickLeave = {};
          errors.sickLeave.endDate = dateFormatError;
        }
        if (
          values.type === EntryType.Hospital &&
          values.discharge.date &&
          !Date.parse(values.discharge.date!)
        ) {
          errors.discharge = {};
          errors.discharge.date = dateFormatError;
        }

        return errors;
      }}
    >
      {({ isValid, dirty, values, setFieldValue, setFieldTouched, errors }) => {
        {
          console.log(errors);
        }
        return (
          <Form className="form ui">
            <EntryTypeSelectField
              label="Type"
              name="type"
              options={entryTypeOptions}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />

            {values.type === EntryType.Hospital && (
              <>
                <Field
                  label="Discarge date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Discharge criteria"
                  placeholder="Criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </>
            )}
            {values.type === EntryType.OccupationHealthcare && (
              <>
                <Field
                  label="Employer name"
                  placeholder="Employer name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick leave start date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="Sick leave end date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </>
            )}
            {values.type === EntryType.HealthCheck && (
              <>
                <Field
                  label="Health check rating"
                  placeholder="Health check rating"
                  name="healthCheckRating"
                  component={NumberField}
                  min={0}
                  max={3}
                />
              </>
            )}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
