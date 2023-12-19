/* eslint-disable react/prop-types */
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Heading, useDisclosure } from "@chakra-ui/react";
import utils from "../utils";
import MyInput from "../components/MyInput";
import { useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import ClientService from "../services/ClientService";
import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";
import { useNavigate } from "react-router-dom";

dayjs.extend(utc);

export default function ClientInfos({ client, onDelete }) {
  const [lastname, setLastname] = useState(client?.lastname);
  const [firstname, setFirstname] = useState(client?.firstname);
  const [date, setDate] = useState(dayjs(client?.date).utc().format("YYYY-MM-DD"));
  const [email, setEmail] = useState(client?.mail);
  const [address, setAddress] = useState(client?.address);
  const [postalCode, setPostalCode] = useState(client?.postalcode);
  const [city, setCity] = useState(client?.city);
  const [country, setCountry] = useState(client?.country);
  const [profilePicture, setProfilePicture] = useState(client?.profile_picture);

  const { isOpen: isOpenError, onClose: onCloseError, onOpen: onOpenError } = useDisclosure();
  const { isOpen: isOpenSuccess, onClose: onCloseSuccess, onOpen: onOpenSuccess } = useDisclosure();
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function updateClient() {
    const clientService = new ClientService();
    const data = await clientService.update(client?.id, lastname, firstname, date, email, address, postalCode, city, country, profilePicture);
    setIsLoading(true);
    if (typeof data === "object") {
      setAlertMessage("Informations mises à jour !");
      onOpenSuccess();
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setTimeout(() => {
        setAlertMessage(data);
        onOpenError();
        setIsLoading(false)
      }, 1000);
    }
  }

  return (
    <div id="client" className="w-full flex justify-center">
      <SuccessAlert alertMessage={alertMessage} isOpen={isOpenSuccess} onClose={onCloseSuccess}></SuccessAlert>
      <ErrorAlert alertMessage={alertMessage} isOpen={isOpenError} onClose={onCloseError}></ErrorAlert>
      <Card id="client-infos" bgColor={"secondary"} className="w-2/4 shadow-xl">
        <CardHeader id="client-header" bgColor={"primary"} textColor={"secondary"} className="flex justify-between">
          <Heading>
            {client?.lastname} {client?.firstname}
          </Heading>
          <Button bgColor={"#E53E3E"} onClick={async () => await onDelete()}>
            <span className="material-symbols-outlined">delete</span>
          </Button>
        </CardHeader>
        <CardBody id="client-body" className="flex">
          <div id="pp-container" className="w-1/3 p-5">
            <Avatar src={utils.b64ToJpeg(profilePicture)} className="profile-picture shadow-lg" size={"full"}></Avatar>
          </div>
          <div id="infos" className="w-2/3 p-5 grid grid-cols-2 gap-x-14 text-third">
            <div id="lastname" className="w-full flex justify-center">
              <MyInput value={lastname} onChange={(e) => setLastname(e.target.value)}></MyInput>
            </div>
            <div id="lastname" className="w-full flex justify-center">
              <MyInput value={firstname} onChange={(e) => setFirstname(e.target.value)}></MyInput>
            </div>
            <div id="lastname" className="w-full flex justify-center">
              <MyInput type={"date"} value={date} onChange={(e) => setDate(e.target.value)}></MyInput>
            </div>
            <div id="lastname" className="w-full flex justify-center">
              <MyInput type={"email"} value={email} onChange={(e) => setEmail(e.target.value)}></MyInput>
            </div>
            <div id="lastname" className="w-full flex justify-center">
              <MyInput value={address} onChange={(e) => setAddress(e.target.value)}></MyInput>
            </div>
            <div id="lastname" className="w-full flex justify-center">
              <MyInput type={"number"} value={postalCode} onChange={(e) => setPostalCode(e.target.value)}></MyInput>
            </div>
            <div id="lastname" className="w-full flex justify-center">
              <MyInput value={city} onChange={(e) => setCity(e.target.value)}></MyInput>
            </div>
            <div id="lastname" className="w-full flex justify-center">
              <MyInput value={country} onChange={(e) => setCountry(e.target.value)}></MyInput>
            </div>
          </div>
        </CardBody>
        <CardFooter className="flex">
          <div id="input-pp" className="w-1/2 flex flex-col items-center text-primary">
            <input accept="image/*" type="file" onChange={async (e) => setProfilePicture(await utils.getUploadedImage(e.target))}></input>
          </div>
          <div id="input-save" className="w-1/2 flex justify-end">
            <Button isLoading={isLoading} bgColor={"primary"} size={"lg"} onClick={async () => await updateClient()} rightIcon={<span className="material-symbols-outlined">save</span>}>
              Sauvegarder
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
