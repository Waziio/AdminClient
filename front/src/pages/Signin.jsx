import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Heading } from "@chakra-ui/layout";
import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <>
      <div id="signin-container" className="h-screen flex flex-col justify-center items-center">
        <Heading size={"3xl"} color={"primary"} className="h-1/5 flex justify-center">
          AdminClient
        </Heading>
        <div id="title-container" className="h-1/6">
          <h2 className="text-5xl">Connexion</h2>
        </div>
        <div id="inputs" className="h-1/2 flex flex-col gap-14">
          <div id="email-container">
            <label htmlFor="email-input" className="font-medium">
              Adresse email
            </label>
            <Input id="email-input" type="email" variant="flushed" borderBottomWidth={"revert"} borderBottomColor={"third"} focusBorderColor="primary"></Input>
          </div>
          <div id="password-container">
            <label htmlFor="password-input" className="font-medium">
              Mot de passe
            </label>
            <Input id="password-input" type="password" variant="flushed" borderBottomWidth={"revert"} borderBottomColor={"third"} focusBorderColor="primary"></Input>
          </div>
          <div id="footer-form" className="h-2/5 flex flex-col items-center mt-5">
            <div id="btn-container" className="h-20 flex justify-center items-end">
              <Button bgColor={"primary"} size={"lg"}>
                Se connecter
              </Button>
            </div>
            <div id="signup-container" className="h-20 flex justify-center items-end text-lg">
              <p>
                Pas de compte ?{" "}
                <span className="text-primary font-semibold cursor-pointer underline underline-offset-4 hover:underline-offset-8 transition-all duration-200">
                  <Link to={"/signup"}>Créez-en un</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
