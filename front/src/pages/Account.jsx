import Title from "../components/title";
import { Button, Heading, useDisclosure } from "@chakra-ui/react";
import MyInput from "../components/MyInput";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import UserService from "../services/UserService";
import BackButton from "../components/BackButtton";
import ErrorAlert from "../components/ErrorAlert";
import SuccessAlert from "../components/SuccessAlert";

export default function Account() {
  const user = useLoaderData();
  const [lastname, setLastname] = useState(user?.lastname);
  const [firstname, setFirstname] = useState(user?.firstname);
  const [email, setEmail] = useState(user?.mail);
  const [password, setPassword] = useState("");
  const { isOpen: isOpenError, onClose: onCloseError, onOpen: onOpenError } = useDisclosure();
  const { isOpen: isOpenSuccess, onClose: onCloseSuccess, onOpen: onOpenSuccess } = useDisclosure();
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function updateUser() {
    const userService = new UserService();
    const data = await userService.update(localStorage.getItem("id_user"), lastname, firstname, email, password);
    if (typeof data === "object") {
      setIsLoading(true);
      setAlertMessage("Informations mises à jour !");
      onOpenSuccess();
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setAlertMessage(data);
        onOpenError();
        setIsLoading(false);
      }, 2000);
    }
  }

  return (
    <div id="account-page" className="h-screen flex flex-col items-center">
      <SuccessAlert alertMessage={alertMessage} isOpen={isOpenSuccess} onClose={onCloseSuccess}></SuccessAlert>
      <ErrorAlert alertMessage={alertMessage} isOpen={isOpenError} onClose={onCloseError}></ErrorAlert>
      <BackButton></BackButton>
      <div id="title-container" className="h-1/4 pt-5">
        <Title></Title>
      </div>
      <div id="account-content" className="h-2/4 w-1/3 flex flex-col items-center justify-between">
        <Heading fontWeight={"light"}>Mon compte</Heading>
        <div id="account-form" className="grid grid-cols-2 gap-x-10 gap-y-10">
          <MyInput onChange={(e) => setLastname(e.target.value)} value={lastname}></MyInput>
          <MyInput onChange={(e) => setFirstname(e.target.value)} value={firstname}></MyInput>
          <MyInput onChange={(e) => setEmail(e.target.value)} value={email}></MyInput>
          <MyInput type={"password"} onChange={(e) => setPassword(e.target.value)} placeholder={"Mot de passe"}></MyInput>
        </div>
        <div id="btn-submit" className="h-1/4">
          <Button isLoading={isLoading} bgColor={"primary"} rightIcon={<span className="material-symbols-outlined">save</span>} onClick={async () => await updateUser()}>
            Sauvegarder
          </Button>
        </div>
      </div>
    </div>
  );
}
