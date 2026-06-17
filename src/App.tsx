import { RouterProvider } from "react-router-dom";
import { Router } from "./Routers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import Aos from "aos";
import { Provider } from "react-redux";
import { Store } from "./Store/Store";
import AuthInitializer from "./Components/Common/AuthInitializer";

const App = () => {
  const queryClient = new QueryClient();

  useEffect(() => {
    Aos.init({ once: false });
  }, []);

  useEffect(() => {
    const disableRightClick = (e: any) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", disableRightClick);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={Store}>
        <AuthInitializer />
        <RouterProvider router={Router} />
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
