import Title from "../components/title";
import { Button, Heading } from "@chakra-ui/react";
import MyInput from "../components/MyInput";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import UserService from "../services/UserService";
import BackButton from "../components/BackButtton";

export default function Account() {
  const user = useLoaderData();
  const [lastname, setLastname] = useState(user?.lastname);
  const [firstname, setFirstname] = useState(user?.firstname);
  const [email, setEmail] = useState(user?.mail);
  const [password, setPassword] = useState("");

  async function updateUser() {
    const userService = new UserService();
    const data = await userService.update(localStorage.getItem("id_user"), lastname, firstname, email, password);
    if (data) {
      // TODO : NOTIF SUCCESS
      window.location.reload();
    }
  }

  return (
    <div id="account-page" className="h-screen flex flex-col items-center">
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
          <Button bgColor={"primary"} rightIcon={<span className="material-symbols-outlined">save</span>} onClick={async () => await updateUser()}>
            Sauvegarder
          </Button>
        </div>
      </div>
    </div>
  );
}
