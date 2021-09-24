import { render, screen } from "@testing-library/react";
import Editor from "./Editor";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

test("Title input is editable", () => {
  // render start page inside router
  render(
    <BrowserRouter>
      <Editor />
    </BrowserRouter>
  );

  // find title input field and check if it exists
  const titleInput = screen.getByPlaceholderText(
    "Title..."
  ) as HTMLInputElement;
  expect(titleInput).toBeInTheDocument();

  // add text to input field and check if value equals the input text
  userEvent.type(titleInput, "Test title");
  expect((titleInput.value = "Test title"));
});

test("Create button is disabled before data has been input", () => {
  render(
    <BrowserRouter>
      <Editor />
    </BrowserRouter>
  );

  // find the create button and check if it exists
  const createBtn = screen
    .getByText("Create")
    .closest("Button") as HTMLButtonElement;
  expect(createBtn).toBeInTheDocument();

  // check if the button is disabled
  expect(createBtn.disabled == true);
});
