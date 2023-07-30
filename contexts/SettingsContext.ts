import { createContext } from "react";

const SettingsContext = createContext({
  theme: "light",
  size: 16,
  font: "serif",
  setTheme: (_) => {},
  setSize: (_) => {},
  setFont: (_) => {},
});

export { SettingsContext };
