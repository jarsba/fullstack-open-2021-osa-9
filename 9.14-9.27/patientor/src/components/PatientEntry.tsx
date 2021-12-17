import React from "react";
import { Entry } from "../types";
import { assertNever } from "../utils";

import { Card, Icon, Rating } from "semantic-ui-react";

type PatientEntryProps = {
  entry: Entry;
};

const PatientEntry = ({ entry }: PatientEntryProps) => {

  let entryTypeIcon;

  switch (entry.type) {
    case "Hospital":
      entryTypeIcon = <Icon name="hospital"></Icon>;
      break;
    case "HealthCheck":
      entryTypeIcon = <Icon name="doctor"></Icon>;
      break;
    case "OccupationalHealthcare":
      entryTypeIcon = (
        <>
          <Icon name="stethoscope"></Icon>
          {entry.employerName}
        </>
      );
      break;
    default:
      return assertNever(entry);
  }

  const header = (
    <>
      {entry.date} {entryTypeIcon}
    </>
  );

  switch (entry.type) {
    case "Hospital":
      return (
        <Card>
          <Card.Content>
            <Card.Header>{header}</Card.Header>
            <Card.Meta>{entry.description}</Card.Meta>
            <Card.Description>
              <Icon name="tag" />
              Discharge {entry.discharge.date}:{" "}
              <i>{entry.discharge.criteria}</i>
            </Card.Description>
          </Card.Content>
        </Card>
      );
    case "HealthCheck":
      return (
        <Card>
          <Card.Content>
            <Card.Header>{header}</Card.Header>
            <Card.Meta>{entry.description}</Card.Meta>
            <Card.Description>
              <Rating
                icon="heart"
                disabled
                rating={4 - entry.healthCheckRating}
                maxRating={4}
              />
            </Card.Description>
          </Card.Content>
        </Card>
      );
    case "OccupationalHealthcare":
      return (
        <Card>
          <Card.Content>
            <Card.Header>{header}</Card.Header>
            <Card.Meta>{entry.description}</Card.Meta>
            {entry.sickLeave ? (
              <Card.Description>
                <Icon name="first aid" />
                <i>Sick-leave</i>: {entry.sickLeave?.startDate} -{" "}
                {entry.sickLeave?.endDate}
              </Card.Description>
            ) : (
              <></>
            )}
          </Card.Content>
        </Card>
      );
    default:
      return assertNever(entry);
  }
};

export default PatientEntry;
