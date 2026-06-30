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
    const disableRightClick = (e: MouseEvent) => {
      e.preventDefault();
    };

    const disableDevTools = (e: KeyboardEvent) => {
      // Prevent F12
      if (e.key === "F12" || e.keyCode === 123) {
        e.preventDefault();
      }
      // Prevent Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
      if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C" || e.key === "i" || e.key === "j" || e.key === "c")) {
        e.preventDefault();
      }
      // Prevent Ctrl+U (View Source)
      if (e.ctrlKey && (e.key === "U" || e.key === "u")) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", disableRightClick);
    document.addEventListener("keydown", disableDevTools);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", disableDevTools);
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
