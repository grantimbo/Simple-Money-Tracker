import "../styles/globals.css";
import { GlobalStateProvider } from "../support/globalState";
// import NotificationArea from "components/app/NotificationArea";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalStateProvider>
      <Component {...pageProps} />
      {/* <NotificationArea /> */}
    </GlobalStateProvider>
  );
}

export default MyApp;
