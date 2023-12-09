import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signin from "./pages/Signin";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/vela-blue/theme.css";

function App() {
  const router = createBrowserRouter([{ path: "/signin", element: <Signin></Signin> }]);

  return (
    <>
      <PrimeReactProvider>
        <RouterProvider router={router} />
      </PrimeReactProvider>
    </>
  );
}

export default App;
