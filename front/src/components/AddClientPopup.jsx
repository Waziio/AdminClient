import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import MyInput from "./MyInput";
import utils from "../utils";
import { useState } from "react";
import ClientService from "../services/ClientService";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export function AddClientPopup({ isOpen, onClose }) {
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const navigate = useNavigate()

  async function addClient() {
    const clientService = new ClientService(localStorage.getItem("accessToken"));
    const data = await clientService.create(lastname, firstname, date, email, address, postalCode, city, country, profilePicture);
    if (data) {
      navigate("/client")
      onClose();
    }
  }

  return (
    <>
      <Modal isCentered={true} size={"3xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor={"secondary"}>
          <ModalHeader className="">Ajouter un client</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={10} pt={10}>
            <div id="form-add-client" className="grid grid-cols-3 gap-10">
              <MyInput onChange={(e) => setLastname(e?.target?.value)} placeholder="Nom" />
              <MyInput onChange={(e) => setFirstname(e?.target?.value)} placeholder="Prénom" />
              <MyInput onChange={(e) => setDate(e?.target?.value)} type={"date"} placeholder="Date" />
              <MyInput onChange={(e) => setEmail(e?.target?.value)} type={"email"} placeholder="Adresse email" />
              <MyInput onChange={(e) => setAddress(e?.target?.value)} placeholder="Adresse" />
              <MyInput onChange={(e) => setPostalCode(e?.target?.value)} type={"number"} placeholder="Code postal" />
              <MyInput onChange={(e) => setCity(e?.target?.value)} placeholder="Ville" />
              <MyInput onChange={(e) => setCountry(e?.target?.value)} placeholder="Pays" />
              <div id="fileupload" className="flex items-center justify-center">
                <input className="" accept="image/*" type="file" onChange={async (e) => setProfilePicture(await utils.getUploadedImage(e.target))}></input>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button bgColor={"primary"} rightIcon={<span className="material-symbols-outlined">person_add</span>} mr={3} onClick={async () => await addClient()}>
              Ajouter
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
