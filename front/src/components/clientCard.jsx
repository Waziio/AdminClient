import { Avatar, Card, CardFooter, CardHeader } from "@chakra-ui/react";
import utils from "../utils";

// eslint-disable-next-line react/prop-types
export default function ClientCard({ firstname, lastname, profilePicture }) {
  return (
    <Card bgColor={"primary"} className="card flex justify-center items-center">
      <CardHeader className="flex justify-center">
        <Avatar src={utils.b64ToJpeg(profilePicture)} className="profile-picture shadow-lg" size={"xl"}></Avatar>
      </CardHeader>
      <CardFooter className="text-center font-medium">
        {lastname} {firstname}
      </CardFooter>
    </Card>
  );
}
