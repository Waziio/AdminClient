import { Await, useLoaderData, useNavigate } from "react-router-dom";
import Title from "../components/title";
import { Suspense, useState } from "react";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import ClientInfos from "../components/ClientInfos";
import ClientService from "../services/ClientService";
import BackButton from "../components/BackButtton";
import ErrorAlert from "../components/ErrorAlert";

export default function Client() {
  const client = useLoaderData();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [alertMessage, setAlertMessage] = useState("");

  async function deleteClient() {
    const clientService = new ClientService();
    const data = await clientService.delete(client?.id);
    if (typeof data === "object") {
      navigate("/client");
    } else if (data === "unauthorized") {
      localStorage.clear();
      navigate("/signin");
    } else {
      setAlertMessage("Une erreur est survenue.");
      onOpen();
    }
  }

  return (
    <div id="client-page" className="h-screen">
      <ErrorAlert alertMessage={alertMessage} isOpen={isOpen} onClose={onClose}></ErrorAlert>
      <BackButton></BackButton>
      <div id="title-container" className="h-1/4 pt-5">
        <Title></Title>
      </div>
      <div id="client-container" className="h-3/4">
        <Suspense fallback={<Spinner />}>
          <Await resolve={client}>
            <ClientInfos client={client} onDelete={deleteClient}></ClientInfos>
          </Await>
        </Suspense>
      </div>
    </div>
  );
}
