import { fireEvent, render, screen } from "@testing-library/react";
import Start from "./Start";
import { BrowserRouter } from "react-router-dom";
import selectEvent from "react-select-event";

test("Edit button becomes clickable when article is selected", () => {
  // render start page inside router
  render(
    <BrowserRouter>
      <Start />
    </BrowserRouter>
  );

  // find edit button and check if it exists and if it's disabled
  const editBtn = screen
    .getByText(/Edit/i)
    .closest("button") as HTMLButtonElement;
  expect(editBtn).toBeInTheDocument();
  expect(editBtn.disabled == true);

  // find document dropdown and check if it exists
  const dropdown = screen.getByText("Choose existing document...");
  expect(dropdown).toBeInTheDocument();

  // click on the dropdown and select the first document
  selectEvent.openMenu(dropdown);
  fireEvent.keyPress(dropdown, { key: "Enter", code: 13, charCode: 13 });

  // check if the button is disabled (it shouldn't be now)
  expect(editBtn.disabled == false);
});
