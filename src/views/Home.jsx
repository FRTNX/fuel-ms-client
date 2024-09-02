import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'

import logo from '../assets/images/logo-sym.jpg'

import {
  GridLoader,
  BeatLoader,
  BarLoader,
  HashLoader,
  ClimbingBoxLoader,
  BounceLoader,
  PacmanLoader,
  PropagateLoader,
  PulseLoader,
  PuffLoader,
  MoonLoader,
  ScaleLoader,
  SyncLoader,
  ClipLoader,
  FadeLoader,
  RiseLoader,
  DotLoader,
  RingLoader,
  RotateLoader,
  CircleLoader
} from 'react-spinners';
import MainLayout from '../layouts/MainLayout'


const Home = () => {
  const [count, setCount] = useState(0)

  return (
    <MainLayout>
      <div style={{ background: '#2c2a2a', height: '100%', width: '100%', paddingTop: 1 }}>
        <h1>In the beginning...</h1>
        <div >
          <p>
            There was code. Lots and lots of code. And we're busy writing it 🚀
          </p>
        </div>
        <p className="read-the-docs">
          Watch this space for new features.
        </p>
      </div>
    </MainLayout>
  )
}

export default Home;