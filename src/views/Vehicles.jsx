import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  Legend,
  Label,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

import { FaCar } from 'react-icons/fa';
import { GiMountainRoad } from 'react-icons/gi';
import { BsFuelPumpFill } from 'react-icons/bs';
import { SiEventstore } from 'react-icons/si';

import { CiSettings } from 'react-icons/ci';
import { IoCarSport } from 'react-icons/io5';

import logo from '../assets/images/logo-text.jpg';
import { getFuelHistory, getVehicles } from '../api/api';
import { random } from '../utils';


const generateData = (params, variation = 10, rows = 10) => {
  const d = [];
  let minValue = 0;
  let maxValue = variation;
  for (let i = 0; i < rows; i++) {
    const datapoint = {};
    params.map((param) =>
      datapoint[param] = random(minValue, maxValue)
    )
    d.push(datapoint)
    minValue += 1;
    maxValue += 1;
  }
  return d;
}

const VehicleItem = ({ avatar, primary, secondary, redirect, target, underline }) => {

  return (
    <div style={{ width: '100%', borderBottom: underline ? '2px solid grey' : 'none' }}>
      <button
        style={{ textAlign: 'left', paddingLeft: 0, paddingTop: 0, background: 'black' }}
        onClick={() => redirect(target)}
      >
        <div style={{}}>
          <div style={{ paddingRight: 10, display: 'inline-block' }}>
            {avatar}
          </div>
          <div style={{ display: 'inline-block' }}>
            <p style={{ marginBottom: 0, lineHeight: 0.8, fontSize: 15 }}>{primary} <br />
            <p style={{ color: 'grey', fontSize: 13}}>{secondary}</p></p>
          </div>
        </div>
      </button>
    </div>


  )
}

const VehicleData = ({ p, redirect }) => {

  return (
    <div style={{ padding: 40, fontSize: 13, textAlign: 'left' }}>
      <VehicleItem
        avatar={<IoCarSport size={35} style={{ color: 'white'}} />}
        primary={'Vehicles'}
        secondary={'Get detailed info about each vehicle...'}
        redirect={redirect}
        target={'/vehicles'}
        underline={true}
      />
      <VehicleItem
        avatar={<CiSettings size={35} style={{ color: 'white' }} />}
        primary={'Settings'}
        secondary={'Set fuel policies, email recpients, etc.,'}
        redirect={redirect}
        target={'/settings'}
        underline={false}
      />
    </div>
  )
}

const VehicleChart = ({ vehicles, p }) => {
  const rows = window.innerWidth > 500 ? 10 : 5;
  const variation = window.innerWidth > 500 ? 15 : 6;
  const caption = window.innerWidth > 500 ? true : false;
  const lineWeight = 2;
  const [data, setData] = useState([])

  const palette = ['#f5f7f8', '#fcde70', '#e8b86d', '#6a9c89', '#7fa1c3'];
  const dummyData = generateData(['c1', 'c2', 'c3', 'c4', 'c5'], variation, rows)

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    refresh();
    const refreshInterval = setInterval(() => {
      refresh();
    }, 1000 * 2);

    return () => {
      clearInterval(refreshInterval);
    }
  }, []);

  const refresh = async () => {
    try {
      // console.log(data``)
      const result = await getFuelHistory()
      if (result) {
        setData(result);
        setLoaded(true);
      }
    } catch (error) {
      console.log(error)
      setLoaded(false);
    }
  }

  return (
    <div style={{ padding: p || 40, fontSize: 13 }}>
      <div style={{ paddingLeft: 20 }}>
        <p style={{ textAlign: 'left' }}>Real-Time Fuel Tracking</p>
        <p style={{ textAlign: 'left', fontSize: 13, color: 'grey' }}>Track fuel levels for all or selected vehicles.</p>
      </div>
      {
        loaded && (
          <ResponsiveContainer width='100%' height={300} style={{ background: 'black', borderRadius: 15 }}>
            <LineChart data={data} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
              {
                vehicles.map((vehicle, index) => (<Line name={vehicle.license} type="monotone" dataKey={vehicle.license} stroke={palette[index]} strokeWidth={lineWeight} />))
              }
              <CartesianGrid stroke="grey" strokeDasharray="3 3" />
              <XAxis stroke='white'>
            {/* <Label value={'Sensor Readings'} offset={0} position={'insideBottom'}/> */}
          </XAxis>
          <YAxis stroke='white'/>
              <Tooltip contentStyle={{ background: 'black', borderRadius: 10, border: 'none' }} />
              {/* <Legend formatter={(value, entry, index) => <span style={{ color: 'grey' }}>{value}</span>} /> */}
            </LineChart>
          </ResponsiveContainer>
        )
      }
      {
        !loaded && (
          <ResponsiveContainer width='100%' height={300} style={{ background: 'black', borderRadius: 15 }}>
            <LineChart data={dummyData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
              <Line name='Vehicle 1' type="monotone" dataKey='c1' stroke="#f5f7f8" strokeWidth={lineWeight} />
              <Line name='Vehicle 2' type="monotone" dataKey="c2" stroke="#fcde70" strokeWidth={lineWeight} activeDot={{ r: 8 }} />
              <Line name='Vehicle 3' type="monotone" dataKey="c3" stroke="#e8b86d" strokeWidth={lineWeight} />
              <Line name='Vehicle 4' type="monotone" dataKey='c4' stroke="#7fa1c3" strokeWidth={lineWeight} />
              <Line name='Vehicle 5' type="monotone" dataKey="c5" stroke="#6a9c89" strokeWidth={lineWeight} activeDot={{ r: 8 }} />
              <CartesianGrid stroke="grey" strokeDasharray="3 3" />
              <XAxis stroke='white' />
              <YAxis stroke='white' />
              <Tooltip contentStyle={{ background: 'black', borderRadius: 10, border: 'none' }} />
              {/* <Legend formatter={(value, entry, index) => <span style={{ color: 'grey' }}>{value}</span>} /> */}
            </LineChart>
          </ResponsiveContainer>
        )
      }
    </div>
  )
}

const VehicleTable = ({ data, mobile }) => {
  console.log('got tabledata:', data)
  const [vehicles, setVehicles] = useState(data);

   const [dummyData, setDummyData] = useState([
    { name: 'Volvo 2020', license: '445-RTT', fuel: 0.73 },
    { name: 'Volvo 2020', license: '445-RTT', fuel: 0.73 },
    { name: 'Volvo 2020', license: '445-RTT', fuel: 0.73 },
    { name: 'Volvo 2020', license: '445-RTT', fuel: 0.73 },
    { name: 'Volvo 2020', license: '445-RTT', fuel: 0.73 },
    { name: 'Volvo 2020', license: '445-RTT', fuel: 0.73 },
    { name: 'Volvo 2020', license: '445-RTT', fuel: 0.73 },
    { name: 'Volvo 2020', license: '445-RTT', fuel: 0.73 },
    { name: 'Volvo 2020', license: '445-RTT', fuel: 0.73 },
    { name: 'Volvo 2020', license: '445-RTT', fuel: 0.73 },
    { name: 'Volvo 2020', license: '445-RTT', fuel: 0.73 },
    { name: 'Volvo 2020', license: '445-RTT', fuel: 0.73 },
    { name: 'Volvo 2020', license: '445-RTT', fuel: 0.73 },
    { name: 'Volvo 2020', license: '445-RTT', fuel: 0.73 },
    { name: 'Volvo 2020', license: '445-RTT', fuel: 0.73 },
  ]);

   useEffect(() => {
    fetchVehicles();
    const refreshInterval = setInterval(() => {
      fetchVehicles();
    }, 1000 * 2);

    return () => {
      clearInterval(refreshInterval);
    }
  }, []);

  const fetchVehicles = async () => {
    try {
      const result = await getVehicles({});
      if (result) {
        setVehicles(result);
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      <table style={{
        width: '100%', color: 'white', borderLeft: mobile ? 'none' : 'none', height: mobile ? 150 : 350,
        overflowY: 'scroll', display: 'block', textAlign: 'left', fontSize: 13
      }}>
        <thead style={{}}>
          <tr>
            <th style={{ width: '50%', paddingLeft: 40 }}>Vehicle</th>
            <th style={{ width: '30%' }}>License Plate</th>
            <th style={{ width: '20%', paddingLeft: 35 }}>Fuel</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr>
              <td style={{ paddingLeft: 40 }}>{vehicle.name}</td>
              <td>{vehicle.license}</td>
              <td style={{ paddingLeft: 40 }}>{Number(vehicle.fuel * 100).toFixed(0)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const Vehicles = () => {
  const [redirect, setRedirect] = useState({ triggered: false, target: '' });
  const [vehicles, setVehicles] = useState([])

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const result = await getVehicles({});
      if (result) {
        setVehicles(result);
      }
    } catch (error) {
      console.log(error)
    }
  };


  const redirectTo = (target) => {
    setRedirect({ triggered: true, target });
  }

  if (redirect.triggered) {
    return (
      <Navigate to={redirect.target} />
    )
  }

  return (
    <div>
      {
        window.innerWidth > 500 && (
          <div style={{ padding: 30 }}>
            <div style={{ width: '100%', background: '#000', borderRadius: 15, paddingBottom: 100 }}>
              <p style={{ color: '#FCDE5A', textAlign: 'center', fontWeight: 100, fontSize: 20, padding: 10, paddingLeft: 40 }}>
                <img src={logo} width={250} />
              </p>

              <div style={{ display: 'inline-block', width: '50%', verticalAlign: 'top', paddingTop: 50 }}>
                {/* <VehicleTable /> */}
                <div style={{ paddingLeft: 40 }}>
                  <div style={{ background: '#100f0f', borderRadius: 15, width: '90%', height: 600 }}>

                  </div>
                </div>

              </div>
              <div style={{ display: 'inline-block', width: '50%', verticalAlign: 'top' }}>
                <VehicleChart vehicles={vehicles} />
              </div>
            </div>
          </div>
        )
      }
      {
        window.innerWidth < 500 && (
          <div style={{ width: '100%', background: '#000', borderRadius: 15 }}>
            <p style={{ color: '#FCDE5A', textAlign: 'center', fontWeight: 100, fontSize: 20, padding: 10, paddingLeft: 40 }}>
              <div style={{ paddingRight: window.innerWidth < 500 ? 25 : 0 }}>
                <img src={logo} width={222} />
              </div>
            </p>
            <div style={{ verticalAlign: 'top', paddingBottom: 0 }}>
              <VehicleChart vehicles={vehicles} p={0.1} />
            </div>
            <div style={{ paddingTop: 20, paddingLeft: 15 }}>
              <VehicleTable mobile={true} data={vehicles} />
            </div>
            <div style={{ verticalAlign: 'top', textAlign: 'left' }}>
              <VehicleData redirect={redirectTo} />
            </div>
          </div>
        )
      }
    </div>


  )
};

export default Vehicles;