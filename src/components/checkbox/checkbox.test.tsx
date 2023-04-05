import { render, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";
import { Checkbox } from "./checkbox";

test("check if checkbox could be checked", () => {
  const Wrap = () => {
    const [isChecked, setIsChecked] = useState(false);
    return (
      <Checkbox
        label={"Оборот"}
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
    );
  };

  const { container } = render(<Wrap />);
  const checkbox = screen.getByRole("checkbox", { name: "Оборот" });

  expect(checkbox).not.toBeChecked();
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});
