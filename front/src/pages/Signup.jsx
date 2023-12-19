import { useState } from "react";
import MyInput from "../components/MyInput";
import Title from "../components/title";
import { Link, useNavigate } from "react-router-dom";
import { Button, useDisclosure } from "@chakra-ui/react";
import AuthService from "../services/AuthService";
import ErrorAlert from "../components/ErrorAlert";

export default function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function handleSignupForm(e) {
    e.preventDefault();
    const auth = new AuthService();
    const data = await auth.signup(firstname, lastname, email, password);
    if (typeof data === "object") {
      navigate("/signin");
    } else {
      setErrorMessage(data);
      onOpen();
    }
  }

  return (
    <div id="page-signup" className="h-screen flex flex-col justify-center items-center">
      <ErrorAlert errorMessage={errorMessage} isOpen={isOpen} onClose={onClose}></ErrorAlert>
      <div id="title-container" className="h-1/6">
        <Title></Title>
      </div>
      <div id="signup-title" className="pb-10">
        <h2 className="text-4xl font-light">Inscription</h2>
      </div>
      <div id="inputs" className="h-1/4 w-1/3 grid grid-cols-2 grid-rows-2 gap-x-16 items-center">
        <div id="lastname-container" className="flex flex-col justify-cente">
          <MyInput
            id={"lastname-input"}
            placeholder="Nom"
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          ></MyInput>
        </div>
        <div id="firstname-container" className="flex flex-col justify-center">
          <MyInput
            id={"firstname-input"}
            placeholder="Prénom"
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
          ></MyInput>
        </div>
        <div id="email-container" className="flex flex-col justify-center">
          <MyInput
            id={"email-input"}
            placeholder="Adresse email"
            type={"email"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></MyInput>
        </div>
        <div id="password-container" className="flex flex-col justify-center">
          <MyInput
            id={"password-input"}
            placeholder="Mot de passe"
            type={"password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></MyInput>
        </div>
      </div>
      <div id="footer" className="h-1/5 flex flex-col items-center mt-5">
        <div id="btn-container" className="h-20 flex justify-center items-end">
          <Button bgColor={"primary"} size={"lg"} type="submit" onClick={async (e) => await handleSignupForm(e)}>
            S&apos;inscrire
          </Button>
        </div>
        <div id="signin-link-container" className="h-20 flex justify-center items-end text-lg">
          <p>
            Déjà un compte ?{" "}
            <span className="text-primary font-semibold cursor-pointer underline underline-offset-4 hover:underline-offset-8 transition-all duration-200">
              <Link to={"/signin"}>Connectez-vous</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
