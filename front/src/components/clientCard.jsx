import { Avatar, Card, CardFooter, CardHeader } from "@chakra-ui/react";

export default function ClientCard() {
    return (
      <Card bgColor={'primary'} className="card">
        <CardHeader className="flex justify-center">
          <Avatar src="https://bit.ly/dan-abramov" className="shadow-lg" size={'xl'}></Avatar>
        </CardHeader>
        <CardFooter className="text-center font-medium">AZDOUD Mohamed</CardFooter>
      </Card>
    )
}