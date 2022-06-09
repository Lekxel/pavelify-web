import React from "react";
import "App.css";
import "Assets/styles/css/dashboard.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "routes";
import ScrollToTop from "helpers/ScrollToTop";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <Router>
            <ScrollToTop />
            <Routes />
          </Router>
        </QueryClientProvider>
        <ToastContainer />
      </div>
    </React.StrictMode>
  );
}

export default App;
