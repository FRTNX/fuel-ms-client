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

import Vehicles from './Vehicles';


const Home = () => {
  const [count, setCount] = useState(0)

  return (
    <MainLayout>
      <div style={{ background: '#2c2a2a', height: '100%', width: '100%', borderRadius: 15 }}>
        <div style={{ padding: 10, paddingBottom: 32 }}>
          <Vehicles />
        </div>
        {/* <div style={{ paddingBottom: 40 }}>
          <Vehicles />
        </div> */}
        {/* <p className="read-the-docs">
          Watch this space for new features.
        </p> */}
      </div>
    </MainLayout>
  )
}

export default Home;