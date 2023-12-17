import { Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export default function Title() {
  const navigate = useNavigate()
  return (
    <Heading cursor={"pointer"} onClick={() => navigate("/client")} size={'2xl'} color={'primary'} className="h-1/5 flex justify-center">
      AdminClient
    </Heading>
  )
}
