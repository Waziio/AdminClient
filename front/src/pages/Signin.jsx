import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Link, useNavigate } from 'react-router-dom'
import AuthService from '../services/AuthService.js'
import { useState } from 'react'
import Title from '../components/title.jsx'
import MyInput from '../components/MyInput.jsx'

export default function Signin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handleSigninForm(e) {
    e.preventDefault()
    const auth = new AuthService()
    const data = await auth.signin(email, password)
    if (data) {
      localStorage.setItem('jwt', data?.jwt)
      localStorage.setItem('isConnected', true)
      localStorage.setItem('firstname', data?.firstname)
      localStorage.setItem('lastname', data?.lastname)
      navigate('/')
    } else {
      // implement error notification
      console.log('error')
    }
  }
  return (
    <>
      <form id="signin-container" className="h-screen flex flex-col justify-center items-center">
        <Title></Title>
        <div id="title-container" className="h-1/6">
          <h2 className="text-4xl font-light">Connexion</h2>
        </div>
        <div id="inputs" className="h-1/2 flex flex-col gap-10">
          <div id="email-container">
            <MyInput
              id="email-input"
              type="email"
              label={'Adresse email'}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            ></MyInput>
          </div>
          <div id="password-container">
            <MyInput
              id="password-input"
              type="password"
              label={'Mot de passe'}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            ></MyInput>
          </div>
          <div id="footer-form" className="h-2/5 flex flex-col items-center mt-5">
            <div id="btn-container" className="h-20 flex justify-center items-end">
              <Button type='submit' bgColor={'primary'} size={'lg'} onClick={async (e) => await handleSigninForm(e)}>
                Se connecter
              </Button>
            </div>
            <div id="signup-container" className="h-20 flex justify-center items-end text-lg">
              <p>
                Pas de compte ?{' '}
                <span className="text-primary font-semibold cursor-pointer underline underline-offset-4 hover:underline-offset-8 transition-all duration-200">
                  <Link to={'/signup'}>Créez-en un</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}