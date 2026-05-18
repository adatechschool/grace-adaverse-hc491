import { render, screen,fireEvent,cleanup } from "@testing-library/react";
import { test, expect, vi,afterEach } from "vitest";

import ModalDeleteTest from "./ModalDeleteTest";


afterEach(() => {
  cleanup()
})
test("loads and displays greeting", async () => {
  // ARRANGE
  render(<ModalDeleteTest onClose={() => {}} id={1} />);
  const element = screen.getByText(
    "Voulez-vous vraiment supprimer ce projet ?",
  );
  expect(element).toBeVisible();
});

test("loads and displays greeting", async () => {
  const onClose = vi.fn();
  render(<ModalDeleteTest onClose={onClose} id={1} />);
    const bouton = screen.getByText(
    "Annuler",

  );

  fireEvent.click(bouton)
  expect(onClose).toHaveBeenCalled();
});
