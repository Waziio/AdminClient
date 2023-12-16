/* eslint-disable react/prop-types */
import { useEffect } from "react";
import ClientCard from "./clientCard";

export default function ClientList({ clients }) {
  useEffect(() => {
    console.log(clients);
  }, []);
  return (
    <>
      {clients.map((client) => (
        <div key={client?.id}>
          <ClientCard firstname={client?.firstname} lastname={client?.lastname}></ClientCard>
        </div>
      ))}
    </>
  );
}
