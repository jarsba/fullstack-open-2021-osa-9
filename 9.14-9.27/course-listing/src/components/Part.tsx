import React from "react";

import { PartProps } from "../types";
import { assertNever } from "../utils";

const Part = ({ part }: PartProps) => {
  switch (part.type) {
    case "normal":
      return (
        <div>
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
            <br />
            <i> {part.description}</i>
          </p>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
            <br />
            project exercises {part.groupProjectCount}
          </p>
        </div>
      );
    case "submission":
      return (
        <div>
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
            <br />
            <i> {part.description}</i>
            <br />
            submit to {part.exerciseSubmissionLink}
          </p>
        </div>
      );
    case "special":
      return (
        <div>
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
            <br />
            <i> {part.description}</i>
            <br />
            required skills: {part.requirements.join(", ")}
          </p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
