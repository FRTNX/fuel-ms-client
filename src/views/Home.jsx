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
import Drivers from './Drivers'


const Home = () => {
  const [count, setCount] = useState(0)
  const p = window.innerWidth > 500 ? 0 : 10;
  const pb = window.innerWidth > 500 ? 25 : 32;

  return (
    <MainLayout>
      <Vehicles />
    </MainLayout>
  )
}

export default Home;