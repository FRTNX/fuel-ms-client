import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'



import MainLayout from '../layouts/MainLayout'

const Home = () => {
  const [count, setCount] = useState(0)

  return (
    <MainLayout>
      <div style={{ paddingTop:200 }}>
        {/* <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> */}
      </div>
      <h1>In the beginning...</h1>
      <div className="card">
        <p>
          There was code. Lots and lots of code. And we're busy writing it 🚀
        </p>
  
      </div>
      <p className="read-the-docs">
        Watch this space for new features.
      </p>
    </MainLayout>
  )
}

export default Home;