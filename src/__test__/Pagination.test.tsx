import React from "react";
import { render, screen } from "@testing-library/react";
import Pagination from "../components/Pagination";

test("test buttons are in the document", () => {
  render(
    <Pagination
      currPage={1}
      totalPage={1}
      onClickPrevButton={() => {}}
      onClickNextButton={() => {}}
    />
  );
  const prevButton = screen.getByTestId("prev");
  const nextButton = screen.getByTestId("next");

  expect(prevButton).toBeInTheDocument();
  expect(nextButton).toBeInTheDocument();
});

test("On page one, the previous button is disabled", () => {
  render(
    <Pagination
      currPage={1}
      totalPage={1}
      onClickPrevButton={() => {}}
      onClickNextButton={() => {}}
    />
  );

  const prevButton = screen.getByTestId("prev");
  expect(prevButton).toBeDisabled();
});
