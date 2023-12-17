/* eslint-disable react/prop-types */
import ClientCard from "./clientCard";
import { useNavigate } from "react-router-dom";

export default function ClientList({ clients }) {
  const navigate = useNavigate();

  function goToClientPage(clienId) {
    navigate(`/client/${clienId}`);
  }

  return (
    <>
      { clients.map((client) => (
        <div key={client?.id} onClick={() => goToClientPage(client?.id)}>
          <ClientCard firstname={client?.firstname} lastname={client?.lastname} profilePicture={client?.profile_picture}></ClientCard>
        </div>
      ))}
    </>
  );
}
