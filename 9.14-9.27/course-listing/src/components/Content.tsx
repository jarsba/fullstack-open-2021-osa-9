import React from "react";

import Part from "./Part";
import { CoursePart, CoursePartProps } from "../types";

const Content = ({ courseParts }: CoursePartProps) => (
  <>
    {courseParts.map((part: CoursePart) => (
      <Part part={part} key={part.name} />
    ))}
  </>
);

export default Content;
