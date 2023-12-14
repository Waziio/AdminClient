import ClientCard from '../components/clientCard'
import Title from '../components/title'

export default function Home() {
  return (
    <div id="home-page" className="h-screen flex flex-col items-center">
      <div id="title-container" className="h-1/4 pt-5">
        <Title></Title>
      </div>

      <div id="clients-container" className="w-full flex justify-center">
        <div id="clients" className="h-1/4 w-2/5 grid grid-cols-3 gap-x-5 gap-y-5">
          <div className="flex justify-center">
            <ClientCard></ClientCard>
          </div>
          <div className="flex justify-center">
            <ClientCard></ClientCard>
          </div>
          <div className="flex justify-center">
            <ClientCard></ClientCard>
          </div>
          <div className="flex justify-center">
            <ClientCard></ClientCard>
          </div>
          <div className="flex justify-center">
            <ClientCard></ClientCard>
          </div>
          <div className="flex justify-center">
            <ClientCard></ClientCard>
          </div>
        </div>
      </div>
    </div>
  )
}
