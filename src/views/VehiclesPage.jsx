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

import { SiVolkswagen, SiVolvo, SiBmw, SiMercedes, SiTesla, SiAudi, SiRenault, SiScania } from "react-icons/si";


const VehicleCard = ({ data }) => {

  const VehicleBrand = () => {
    if (data.brand === 'volvo') {
      return <SiVolvo size={50} />
    }

    else if (data.brand === 'mercedes') {
      return <SiMercedes size={50} />
    }

    else if (data.brand === 'vw') {
      return <SiVolkswagen size={50} />
    }

    else if (data.brand === 'tesla') {
      return <SiTesla size={50} />
    }

    else if (data.brand === 'audi') {
      return <SiAudi size={50} />
    }

    else if (data.brand === 'renault') {
      return <SiRenault size={50} />
    }

    else if (data.brand === 'scania') {
      return <SiScania size={50} />
    }

    else {
      return <SiBmw size={50} />
    }
  }

  return (
    <div style={{ background: '#121212', borderRadius: 15 }}>
      <div style={{ display: 'inline-block', width: '30%', verticalAlign: 'top' }}>
        <div style={{ padding: 15 }}>
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
  const [data, setData] = useState([
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
      destination: 'BYO HQ',
      fuel: 0.52
    },
    {
      brand: 'bmw',
      name: 'BMW 2022',
      license: 'XMR-8132',
      status: 'Active',
      driver: 'Dricus Du Plesis',
      source: 'BYO HQ',
      destination: 'BYO HQ',
      fuel: 0.66
    },
    {
      brand: 'vw',
      name: 'Volkswagen 2017',
      license: 'ADT-2271',
      status: 'Inactive',
      driver: 'Francis Nganau',
      source: 'BYO HQ',
      destination: 'None',
      fuel: 0.41
    },
    {
      brand: 'tesla',
      name: 'Tesla 2019',
      license: 'ORK-1915',
      status: 'Active',
      driver: 'Alan Turing',
      source: 'BYO HQ',
      destination: 'HRE HQ',
      fuel: 0.32
    },
    {
      brand: 'renault',
      name: 'Renault 2024',
      license: 'YQL-3230',
      status: 'Inactive',
      driver: 'Edwin Hubble',
      source: 'BYO HQ',
      destination: 'None',
      fuel: 0.77
    },
    {
      brand: 'scania',
      name: 'Scania 2021',
      license: 'FAW-2641',
      status: 'Active',
      driver: 'Rosalind Franklin',
      source: 'BYO HQ',
      destination: 'HRE HQ',
      fuel: 0.20
    },
    {
      brand: 'audi',
      name: 'Audi 2015',
      license: 'ILS-3691',
      status: 'Active',
      driver: 'Tim Walz',
      source: 'BYO HQ',
      destination: 'BYO HQ',
      fuel: 0.91
    }

  ]);


  const [vehicles, setVehicles] = useState(data);

  const [inputText, setInputText] = useState('');

  const [activeVehicles, setActiveVehicles] = useState(false);
  const [lowFuelVehicles, setLowFuelVehicles] = useState(false);

  const filterVehicles = (searchValue, active=activeVehicles, lowFuel=lowFuelVehicles) => {
    console.log('filter: ', searchValue)
    console.log('active: ', active)
    console.log('low fuel: ', lowFuel)

    setInputText(searchValue)

    let copy = [...data];
    if (active) {
      console.log('filtering by activity')
      copy = copy.filter((vehicle) => vehicle.status === 'Active');
      setActiveVehicles(true);
    } else {
      setActiveVehicles(false);
    }

    if (lowFuel) {
      console.log('filtering by low fuel')
      copy = copy.filter((vehicle) => vehicle.fuel < 0.50)
      setLowFuelVehicles(true);
    } else {
      setLowFuelVehicles(false);
    }

    const filtered = copy.filter((vehicle) => {
      const { brand, name, license, driver, source, destination } = vehicle;
      const searchableFields = [brand, name, license, driver, destination];
      return searchableFields.some((field) => field.toLowerCase().includes(searchValue))
    });

    console.log('filtered:', filtered.length)
    setVehicles(filtered);
  }

  const toggleActiveVehicles = () => {
    if (activeVehicles) {
      // setActiveVehicles(current => false);
      filterVehicles(inputText, false)
    }

    else {
      // setActiveVehicles(current => true);
      filterVehicles(inputText, true)
    }
  };

  const toggleLowFuelVehicles = () => {
    if (lowFuelVehicles) {
      // setLowFuelVehicles(false);
      filterVehicles(inputText, activeVehicles, false)
    }

    else {
      // setLowFuelVehicles(true)
      filterVehicles(inputText, activeVehicles, true)
    }
  };

  return (
    <MainLayout>
      <div style={{ paddingTop: 20 }}>
        {
          window.innerWidth > 500 && (
            <div style={{ padding: 30 }}>
              <div style={{ width: '100%', background: '#000', borderRadius: 15 }}>

                <div style={{ display: 'inline-block', width: '50%', textAlign: 'left', paddingTop: 10 }}>
                  <div style={{}}>
                    <div style={{ width: '45%', paddingLeft: 10, paddingTop: 10, paddingBottom: 10, display: 'inline-block' }}>
                      <input
                        type="text"
                        value={inputText}
                        onChange={(e) => filterVehicles(e.target.value)}
                        placeholder="Search vehicles by driver, license plate, etc..."
                        style={{
                          width: '100%', height: 35, borderRadius: 5, border: 'none'
                        }}
                      />
                    </div>
                    <div style={{ display: 'inline-block', paddingLeft: 10 }}>
                      <button
                        style={{ background: activeVehicles ? '#0d7c66' : 'grey', fontSize: 13, padding: 11 }}
                        onClick={(toggleActiveVehicles)}
                        // disabled={{ activeVehicles }}
                      >Active</button>
                    </div>
                    <div style={{ display: 'inline-block', paddingLeft: 5 }}>
                      <button
                        style={{ background: lowFuelVehicles ? '#8d493a' : 'grey', fontSize: 13, padding: 11 }}
                        onClick={toggleLowFuelVehicles}
                      >Low Fuel</button>
                    </div>
                  </div>

                  <div style={{ height: 500, overflowY: 'scroll' }}>

                    {
                      vehicles.map((vehicle) => (
                        <div style={{ display: 'inline-block', width: '47%', padding: 10 }}>
                          <VehicleCard data={vehicle} />
                        </div>
                      ))
                    }
                  </div>

                </div>
                <div style={{ display: 'inline-block', width: '50%', verticalAlign: 'top' }}>
                  <p style={{ paddingTop: 40}}>Vehicle Management</p>

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