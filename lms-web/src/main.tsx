import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import "@blueprintjs/datetime2/lib/css/blueprint-datetime2.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/select/lib/css/blueprint-select.css";
import "normalize.css/normalize.css";
import { createRoot } from "react-dom/client";

import { App } from "./App";
import { applyAxiosConfig } from "./config/axios.config";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Fatal: Missing React container!");
}

applyAxiosConfig();

createRoot(container).render(<App />);
