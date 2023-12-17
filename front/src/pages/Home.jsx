import { Suspense } from "react";
import Title from "../components/title";
import ClientList from "../components/clientList";
import MyMenu from "../components/MyMenu";
import { AddClientPopup } from "../components/AddClientPopup";
import { Heading, Spinner, useDisclosure } from "@chakra-ui/react";
import { Await, useLoaderData } from "react-router-dom";

export default function Home() {
  const clients = useLoaderData();
  const { isOpen: isOpenAddClient, onOpen: onOpenAddClient, onClose: onCloseAddClient } = useDisclosure();

  return (
    <>
      <div id="home-page" className="h-screen flex flex-col items-center">
        <div id="menu-container" className="fixed top-6 left-6 right-0">
          <MyMenu onOpen={onOpenAddClient}></MyMenu>
        </div>
        <div id="title-container" className="pt-5">
          <Title></Title>
        </div>

        {clients && clients?.length > 0 ? (
          <div id="clients-container" className="w-full flex justify-center mt-40">
            <div id="clients" className="w-1/3 grid grid-cols-3 gap-x-5 gap-y-5 items-center">
              <Suspense fallback={<Spinner />}>
                <Await resolve={clients}>
                  <ClientList clients={clients} />
                </Await>
              </Suspense>
            </div>
          </div>
        ) : (
          <Heading size={"md"} className="mt-40">Aucun client à afficher ...</Heading>
        )}
      </div>
      <AddClientPopup isOpen={isOpenAddClient} onClose={onCloseAddClient}></AddClientPopup>
    </>
  );
}
