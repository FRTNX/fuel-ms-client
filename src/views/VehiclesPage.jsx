import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

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

import { SiVolkswagen, SiVolvo, SiBmw, SiMercedes } from "react-icons/si";


const VehicleCard = ({ data }) => {

  const VehicleBrand = () => {
    if (data.brand === 'volvo') {
      return <SiVolvo size={50}/>
    }

    else if (data.brand === 'mercedes') {
      return <SiMercedes size={50} />
    }

    else if (data.brand === 'vw') {
      return <SiVolkswagen size={50} />
    }

    else {
      return <SiBmw size={50} />
    }
  }

  return (
    <div style={{ background: '#121212', borderRadius: 15}}>
      <div style={{ display: 'inline-block', width: '30%', verticalAlign: 'top' }}>
        <div style={{ padding: 15}}>
          <VehicleBrand />
        </div>
      </div>
      <div style={{ display: 'inline-block', width: '68%', fontSize: 13, verticalAlign: 'top' }}>
        <p>Name: {data.name}</p>
        <p>License Plate: {data.license}</p>
        <p>Status: {data.status}</p>
        <p>Driver: {data.driver}</p>
        {/* <p>Source: {data.source}</p> */}
        <p>Destination: {data.destination}</p>
        <p>Fuel: {data.fuel * 100}%</p>
      </div>
    </div>
  )
};


const Placeholder = () => {
  const pl = window.innerWidth > 500 ? '47%' : '38%';

  return (
    <div>
      <div style={{ textAlign: 'center', paddingTop: 200, paddingLeft: pl }}>
        <CircleLoader color="grey" size={100} />
      </div>
      <p style={{ color: 'grey', paddingTop: 20 }}>Coming Soon :) </p>

    </div>

  )
}


const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState([
    {
      brand: 'volvo',
      name: 'Volvo 2020',
      license: 'AER-4477',
      status: 'Active',
      driver: 'Israel Adesanya',
      source: 'BYO HQ',
      destination: 'HRE HQ',
      fuel: 0.78
    },
    {
      brand: 'mercedes',
      name: 'Mercedes 2019',
      license: 'DKO-9996',
      status: 'Active',
      driver: 'Khabib Nurmagomedov',
      source: 'BYO HQ',
      destination: 'HRE HQ',
      fuel: 0.52
    },
    {
      brand: 'bmw',
      name: 'BMW 2022',
      license: 'XMR-8132',
      status: 'Active',
      driver: 'Dricus Du Plesis',
      source: 'BYO HQ',
      destination: 'HRE HQ',
      fuel: 0.66
    },
    {
      brand: 'vw',
      name: 'Volkswagen 2017',
      license: 'ADT-2271',
      status: 'Active',
      driver: 'Francis Nganau',
      source: 'BYO HQ',
      destination: 'HRE HQ',
      fuel: 0.41
    }
  ])

  return (
    <MainLayout>
      <div style={{ paddingTop: 20 }}>
        {
          window.innerWidth > 500 && (
            <div style={{ padding: 30 }}>
              <div style={{ width: '100%', background: '#000', borderRadius: 15 }}>
                {/* <Placeholder /> */}
                <div style={{ display: 'inline-block', width: '50%', textAlign: 'left' }}>
                  {
                    vehicles.map((vehicle) => (
                      <div style={{ display: 'inline-block', width: '47%', padding: 10 }}>
                      <VehicleCard data={vehicle}/>
                    </div>
                    ))
                  }
                </div>
                <div style={{ display: 'inline-block', width: '50%'}}>
                  <p>Vehicle Management</p>

                </div>
              </div>
            </div>
          )
        }
        {
          window.innerWidth < 500 && (
            <div style={{ width: '100%', background: '#000', borderRadius: 15, height: 500 }}>
              <Placeholder />
            </div>
          )
        }
      </div>
    </MainLayout>
  )
}

export default VehiclesPage;