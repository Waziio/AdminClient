import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/provider'
import Signin from './pages/Signin'
import { extendTheme } from '@chakra-ui/theme-utils'
import Signup from './pages/Signup'

const router = createBrowserRouter([
  { path: '/signin', element: <Signin></Signin> },
  { path: '/signup', element: <Signup></Signup> },
])

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: '#303030',
        color: 'white',
      },
    },
  },
  colors: {
    primary: '#79C1F8',
    secondary: '#303030',
    third: '#FFFFFF',
  },
})

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  )
}

export default App
