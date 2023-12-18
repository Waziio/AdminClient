import { Await, useLoaderData, useNavigate } from "react-router-dom";
import Title from "../components/title";
import { Suspense } from "react";
import { Spinner } from "@chakra-ui/react";
import ClientInfos from "../components/ClientInfos";
import ClientService from "../services/ClientService";
import BackButton from "../components/BackButtton";

export default function Client() {
  const client = useLoaderData();
  const navigate = useNavigate();

  async function deleteClient() {
    const clientService = new ClientService();
    const data = await clientService.delete(client?.id);
    if (data) {
      // TODO NOTIF SUCCESS
      navigate("/client");
    }
  }

  return (
    <div id="client-page" className="h-screen">
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
