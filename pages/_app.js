import "../styles/globals.css";
import { GlobalStateProvider } from "../support/globalState";
import Notification from "../components/Notification";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalStateProvider>
      <Component {...pageProps} />
      <Notification />
    </GlobalStateProvider>
  );
}

export default MyApp;
