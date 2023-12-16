import { Avatar, Card, CardFooter, CardHeader } from "@chakra-ui/react";

// eslint-disable-next-line react/prop-types
export default function ClientCard({firstname, lastname}) {
    return (
      <Card bgColor={'primary'} className="card flex justify-center items-center">
        <CardHeader className="flex justify-center">
          <Avatar src="https://bit.ly/dan-abramov" className="profile-picture shadow-lg" size={'xl'}></Avatar>
        </CardHeader>
        <CardFooter className="text-center font-medium">{lastname} {firstname}</CardFooter>
      </Card>
    )
}