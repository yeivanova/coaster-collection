import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { App } from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { Provider } from 'react-redux';
import { store } from "./services/store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

reportWebVitals();