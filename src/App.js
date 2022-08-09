import "App.css";
import "Assets/styles/css/dashboard.css";
import ScrollToTop from "helpers/ScrollToTop";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "routes";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true
    }
  }
});
function App() {
  return (
    <React.StrictMode>
      <div style={{ position: "relative" }} className="App">
        <QueryClientProvider client={queryClient}>
          {/* <SocketContext.Provider value={socket}> */}
          <Router>
            <ScrollToTop />
            <Routes />
          </Router>
          {/* </SocketContext.Provider> */}
        </QueryClientProvider>
        <ToastContainer />
      </div>
    </React.StrictMode>
  );
}

export default App;
