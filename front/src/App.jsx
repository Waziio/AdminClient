import "./App.css";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/provider";
import Signin from "./pages/Signin";
import { extendTheme } from "@chakra-ui/theme-utils";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ClientService from "./services/ClientService";
import Client from "./pages/Client";
import Account from "./pages/Account";
import UserService from "./services/UserService";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/client" replace /> },
  { path: "/signin", element: <Signin></Signin> },
  { path: "/signup", element: <Signup></Signup> },
  {
    path: "/client",
    element: <Home></Home>,
    loader: () => {
      try {
        const clientService = new ClientService();
        return clientService.getAll();
      } catch (err) {
        console.log(err);
      }
    },
  },
  {
    path: "/client/:id",
    element: <Client></Client>,
    loader: ({ params }) => {
      try {
        const clientService = new ClientService();
        return clientService.getById(params?.id);
      } catch (err) {
        console.log(err);
      }
    },
  },
  {
    path: "/account",
    element: <Account></Account>,
    loader: () => {
      try {
        const userService = new UserService();
        return userService.getById(localStorage.getItem("id_user"));
      } catch (err) {
        console.log(err);
      }
    },
  },
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
