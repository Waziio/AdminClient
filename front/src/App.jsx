import "./App.css";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/provider";
import Signin from "./pages/Signin";
import { extendTheme } from "@chakra-ui/theme-utils";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ClientService from "./services/ClientService";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/client" replace /> },
  { path: "/signin", element: <Signin></Signin> },
  { path: "/signup", element: <Signup></Signup> },
  { path: "/client", element: <Home></Home>, loader: () => {
    const clientService = new ClientService(localStorage.getItem("accessToken"));
    return clientService.getAll()
  } },
]);

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "#303030",
        color: "white",
      },
    },
  },
  colors: {
    primary: "#64b5f6",
    secondary: "#303030",
    third: "#FFFFFF",
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
