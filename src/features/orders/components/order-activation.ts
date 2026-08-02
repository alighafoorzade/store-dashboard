import type { KeyboardEvent } from "react";

export function activateOrderFromKeyboard(
  event: KeyboardEvent,
  activate: () => void,
) {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  activate();
}
