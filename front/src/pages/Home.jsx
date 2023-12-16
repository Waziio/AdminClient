import { useEffect, useState } from "react";
import Title from "../components/title";
import ClientService from "../services/ClientService";
import ClientList from "../components/clientList";

export default function Home() {
  const [clients, setClients] = useState([]);
  async function fetchData() {
    try {
      const jwt = localStorage.getItem("accessToken");
      const clientService = new ClientService(jwt);
      const result = await clientService.getAll();
      setClients(result.data);
      console.log(clients);
    } catch (err) {
      console.log("error " + err);
    }
  }

  useEffect(() => {
    fetchData().then(() => {
      console.log("fetch")
    });
  }, []);

  return (
    <div id="home-page" className="h-screen flex flex-col items-center">
      <div id="title-container" className="h-1/4 pt-5">
        <Title></Title>
      </div>

      <div id="clients-container" className="w-full flex justify-center mt-5">
        <div id="clients" className="w-1/3 grid grid-cols-3 gap-x-5 gap-y-5 items-center">
          <ClientList clients={clients}/>
        </div>
      </div>
    </div>
  );
}
