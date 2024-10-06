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

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

import Checkbox from 'react-custom-checkbox';

import { CiSettings } from 'react-icons/ci';
import { IoCarSport } from 'react-icons/io5';

import logo from '../assets/images/logo-text.jpg';
import { getFuelHistory, getVehicles, getFuelThreshold } from '../api/api';
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
              <p style={{ color: 'grey', fontSize: 13 }}>{secondary}</p></p>
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
        avatar={<IoCarSport size={35} style={{ color: 'white' }} />}
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

const VehicleRadar = ({ vehicles, threshold }) => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const fetchVehicles = async () => {
    try {
      const result = await getVehicles({});
      if (result) {
        const augmented = result.map((vehicle) => augment(vehicle))
        console.log('aug:', augmented)
        setData(augmented)
        setData(result);
      }
    } catch (error) {
      console.log(error)
    }
  };

  const augment = (vehicle) => {
    vehicle.fuelThreshold = threshold * 100;
    vehicle.fuel = vehicle.fuel * 100
    return vehicle;
  }

  useEffect(() => {
    const augmented = vehicles.map((vehicle) => augment(vehicle))
    setData(augmented)

    fetchVehicles();
    const refreshInterval = setInterval(() => {
      fetchVehicles();
    }, 1000 * 4);

    return () => {
      clearInterval(refreshInterval);
    }
  }, []);

  return (
    <div style={{ fontSize: 13 }}>
      <ResponsiveContainer width="100%" height={500}>
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="license" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar name="Current Fuel" dataKey="fuel" stroke="#FCDE5A" fill="#FCDE5A" fillOpacity={0.8} />
          <Radar name="Fuel Threshold" dataKey="fuelThreshold" stroke="#000" fill="#000" fillOpacity={0.9} />
          <Legend formatter={(value, entry, index) => <span style={{ color: 'grey' }}>{value}</span>} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

const VehicleChart = ({ vehicles, setVehicles, p }) => {
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
        const augmented = result.map((vehicle) => augment(vehicle))
        setData(augmented);
        setLoaded(true);
      }
    } catch (error) {
      console.log(error)
      setLoaded(false);
    }
  };

  const augment = (vehicle) => {
    vehicle.visible = true;
    return vehicle;
  };

  const toggleVisibility = (v) => {
    const updatedVehicles = vehicles.map((vehicle) => {
      if (vehicle.license === v.license) {
        if (vehicle.visible) {
          vehicle.visible = false;
          return vehicle;
        } else {
          vehicle.visible = true;
          return vehicle;
        }
      } else {
        return vehicle;
      }
    })
    console.log('updated vehicles:', updatedVehicles)
    setVehicles(updatedVehicles)
  };

  return (
    <div style={{ padding: p || 40, fontSize: 13 }}>
      <div style={{ paddingLeft: 20 }}>
        <p style={{ textAlign: 'left' }}>Real-Time Fuel Monitoring</p>
        <p style={{ textAlign: 'left', fontSize: 13, color: 'grey' }}>Track fuel levels for all or selected vehicles. Hover
          over a datapoint to see more details. Check or uncheck a vehicles license plate to include
          or exclude it from observation.</p>
      </div>
      {
        loaded && (
          <ResponsiveContainer width='100%' height={300} style={{ background: 'black', borderRadius: 15 }}>
            <LineChart data={data} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
              {
                vehicles.map((vehicle, index) => {
                  if (vehicle.visible) {
                    return <Line name={vehicle.license} type="monotone" dataKey={vehicle.license} stroke={palette[index]} strokeWidth={lineWeight} />
                  }
                })
              }
              <CartesianGrid stroke="grey" strokeDasharray="3 3" />
              <XAxis stroke='white'>
                {/* <Label value={'Sensor Readings'} offset={0} position={'insideBottom'}/> */}
              </XAxis>
              <YAxis stroke='white' />
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
      <div style={{ paddingLeft: window.innerWidth > 500 ? 20 : 32, paddingTop: 10 }}>
        {
          loaded && vehicles.map((vehicle) => (
            <div style={{ paddingBottom: 10, display: 'inline-block', width: '30%' }}>
              <Checkbox
                label={vehicle.license}
                checked={vehicle.visible}
                onChange={() => toggleVisibility(vehicle)}
              />
            </div>
          ))
        }
      </div>
    </div>
  )
}

const VehicleTable = ({ data, mobile }) => {
  console.log('got tabledata:', data)
  const [vehicles, setVehicles] = useState(data);

  useEffect(() => {
    fetchThreshold();
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

  const fetchThreshold = async () => {
    try {
      const result = await getFuelThreshold();
      if (result) {
        setThreshold(result);
      }
    } catch (error) {
      console.log(error)
    }
  }
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
  const [vehicles, setVehicles] = useState([]);
  const [threshold, setThreshold] = useState(0.4);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const result = await getVehicles({});
      if (result) {
        const augmented = result.map((vehicle) => {
          vehicle.visible = true;
          return vehicle;
        })
        setVehicles(augmented);
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
                <div style={{ paddingLeft: 40 }}>
                  <div style={{ background: '#100f0f', borderRadius: 15, width: '90%', height: 550 }}>
                    <VehicleRadar vehicles={vehicles} threshold={threshold} />
                  </div>
                </div>

              </div>
              <div style={{ display: 'inline-block', width: '50%', verticalAlign: 'top' }}>
                <VehicleChart vehicles={vehicles} setVehicles={setVehicles} p={10} />
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
            <div style={{ padding: 10, paddingTop: 20,  paddingBottom: 40 }}>
              <div style={{ background: '#121212', borderRadius: 15, paddingBottom: 10 }}>
              <VehicleRadar vehicles={vehicles} threshold={threshold} />
              </div>
            </div>

            {/* <div style={{ paddingTop: 20, paddingLeft: 15 }}>
              <VehicleTable mobile={true} data={vehicles} />
            </div> */}
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