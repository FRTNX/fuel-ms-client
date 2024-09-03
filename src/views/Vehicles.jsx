import { useEffect, useState } from 'react';

import {
  LineChart,
  Line,
  Legend,
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

import logo from '../assets/images/logo-text.jpg';

const data = [
  {'c1': 8, 'c2': 7, 'c3': 6, 'c4': 0, 'c5': 1},
  {'c1': 11, 'c2': 11, 'c3': 2, 'c4': 12, 'c5': 6},
  {'c1': 4, 'c2': 4, 'c3': 4, 'c4': 7, 'c5': 8},
  {'c1': 9, 'c2': 16, 'c3': 9, 'c4': 11, 'c5': 9},
  {'c1': 14, 'c2': 9, 'c3': 15, 'c4': 10, 'c5': 13},
  {'c1': 20, 'c2': 11, 'c3': 12, 'c4': 20, 'c5': 16},
  {'c1': 16, 'c2': 19, 'c3': 14, 'c4': 12, 'c5': 14},
  {'c1': 17, 'c2': 15, 'c3': 17, 'c4': 21, 'c5': 24},
  {'c1': 25, 'c2': 18, 'c3': 21, 'c4': 21, 'c5': 19},
  {'c1': 21, 'c2': 27, 'c3': 21, 'c4': 20, 'c5': 23}
];

const VehicleItem = ({ avatar, primary, secondary }) => {

  return (
    <div style={{}}>
      <div style={{ paddingRight: 10, display: 'inline-block' }}>
        {avatar}
      </div>
      <div style={{ fontSize: 16, display: 'inline-block' }}>
        <p style={{ marginBottom: 0, lineHeight: 1.5 }}>{primary} <br /> {secondary}</p>
      </div>
    </div>
  )
}

const VehicleData = ({ p }) => {

  return (
    <div style={{ padding: 40, fontSize: 20, textAlign: 'left' }}>
      {/* <p>  Vehicles: 14</p> */}
      <VehicleItem
        avatar={<FaCar style={{ background: '#FCDE5A', color: 'black', borderRadius: 50, padding: 10 }} />}
        primary={'Vehicles'}
        secondary={14}
      />
      <VehicleItem
        avatar={<GiMountainRoad style={{ background: 'green', color: 'black', borderRadius: 50, padding: 10 }} />}
        primary={'Active'}
        secondary={7}
      />
      <VehicleItem
        avatar={<BsFuelPumpFill style={{ background: 'red', color: 'black', borderRadius: 50, padding: 10 }} />}
        primary={'Violations'}
        secondary={1}
      />
      <VehicleItem
        avatar={<SiEventstore style={{ background: '#FCDE5A', color: 'black', borderRadius: 50, padding: 10 }} />}
        primary={'Events'}
        secondary={2}
      />
      <div style={{ paddingTop: 10 }}>
        <div style={{ display: 'inline-block', paddingRight: 10, }}>
          <button style={{ background: '#FCDE5A', color: 'black', fontSize: 13 }}>
            Add Vehicle
          </button>
        </div>
        <div style={{ display: 'inline-block' }}>
          <button style={{ background: '#FCDE5A', color: 'black', fontSize: 13 }}>
            View Vehicles
          </button>
        </div>
      </div>

    </div>
  )
}

const VehicleChart = ({ p }) => {

  return (
    <div style={{ padding: p || 40 }}>
      <ResponsiveContainer width='100%' height={300} style={{ background: 'black', borderRadius: 15 }}>
        <LineChart data={data} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
          <Line name='Vehicle 1' type="monotone" dataKey='c1' stroke="#ace142" />
          <Line name='Vehicle 2' type="monotone" dataKey="c2" stroke="#fff" activeDot={{ r: 8 }} />
          <Line name='Vehicle 3' type="monotone" dataKey="c3" stroke="#82ca9d" />
          <Line name='Vehicle 4' type="monotone" dataKey='c4' stroke="#8884d8" />
          <Line name='Vehicle 5' type="monotone" dataKey="c5" stroke="grey" activeDot={{ r: 8 }} />
          <CartesianGrid stroke="grey" strokeDasharray="3 3" />
          <XAxis stroke='white' />
          <YAxis stroke='white' />
          <Tooltip contentStyle={{ background: 'black', borderRadius: 10, border: 'none' }} />
          {/* <Legend formatter={(value, entry, index) => <span style={{ color: 'grey' }}>{value}</span>} /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

const Vehicles = () => {



  return (
    <div>
      {
        window.innerWidth > 500 && (
          <div style={{ padding: 30 }}>
            <div style={{ width: '100%', background: '#000', borderRadius: 15 }}>
              <p style={{ color: '#FCDE5A', textAlign: 'center', fontWeight: 100, fontSize: 20, padding: 10, paddingLeft: 40 }}>
                <img src={logo} width={250} />
              </p>

              <div style={{ display: 'inline-block', width: '50%', verticalAlign: 'top' }}>
                <VehicleData />
              </div>
              <div style={{ display: 'inline-block', width: '50%', verticalAlign: 'top' }}>
                <VehicleChart />
              </div>
            </div>
          </div>
        )
      }
      {
        window.innerWidth < 500 && (
          <div style={{ width: '100%', background: '#000', borderRadius: 15 }}>
            <p style={{ color: '#FCDE5A', textAlign: 'center', fontWeight: 100, fontSize: 20, padding: 10, paddingLeft: 40 }}>
              <img src={logo} width={222} />
            </p>
            <div style={{ verticalAlign: 'top', paddingBottom: 0 }}>
              <VehicleChart p={0.1} />
            </div>
            <div style={{ verticalAlign: 'top', textAlign: 'left' }}>
              <VehicleData />
            </div>
          </div>
        )
      }
    </div>


  )
};

export default Vehicles;