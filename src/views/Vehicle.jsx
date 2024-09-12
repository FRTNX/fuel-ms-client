import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

import { VehicleBrand, generateData, Form } from '../utils';

import MainLayout from '../layouts/MainLayout';

const palettes = {
  defconOne: { primary: '#697565', secondary: '#ecdfcc' },
  defconTwo: { primary: '#697565', secondary: '#FCDE5A' },
  defconThree: { primary: '', secondary: '' },
  defconFour: { primary: '', secondary: '' },
  defconFive: { primary: '', secondary: '' },
}

const palette = Object.values(palettes.defconOne)


const FuelHistory = ({ p }) => {
  const rows = window.innerWidth > 500 ? 20 : 15;
  const variation = window.innerWidth > 500 ? 10 : 6;
  const pt = window.innerWidth > 500 ? 25 : 0;
  const data = generateData(['c1', 'c2', 'c3', 'c4', 'c5'], variation, rows);
  const lineWeight = 2;

  return (
    <div style={{ padding: p || 40, paddingTop: pt }}>
      <p style={{ textAlign: 'left' }}>Fuel History</p>
      <p style={{ textAlign: 'left', fontSize: 13, color: 'grey' }}>Details the most recent fuel history for this vehicle.
        Eventually you'll be able to select the time period you'd like to view fuel history for.</p>
      <ResponsiveContainer width='100%' height={300} style={{ background: 'black', borderRadius: 15 }}>
        <AreaChart data={data} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
          <Area name='Vehicle 1' type="monotone" dataKey='c1' stroke="#f5f7f8" strokeWidth={lineWeight} fill={palette[0]} />
          <CartesianGrid stroke="grey" strokeDasharray="3 3" />
          <XAxis stroke='white' />
          <YAxis stroke='white' />
          <Tooltip contentStyle={{ background: 'black', borderRadius: 10, border: 'none' }} />
          {/* <Legend formatter={(value, entry, index) => <span style={{ color: 'grey' }}>{value}</span>} /> */}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

const DriverHistory = ({ p }) => {
  const rows = window.innerWidth > 500 ? 15 : 7;
  const variation = window.innerWidth > 500 ? 15 : 6;
  const data = generateData(['c1', 'c2', 'c3', 'c4', 'c5'], variation, rows);
  const lineWeight = 2;

  return (
    <div style={{ padding: p || 40, paddingTop: 10 }}>
      <p style={{ textAlign: 'left' }}>Driver History</p>
      <p style={{ textAlign: 'left', fontSize: 13, color: 'grey' }}>Shows which drivers are most frequently assigned to this vehicle.</p>
      <ResponsiveContainer width='100%' height={300} style={{ background: 'black', borderRadius: 15 }}>
        <BarChart data={data} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
          <Bar name='Vehicle 1' type="monotone" dataKey='c1' stroke="#f5f7f8" strokeWidth={lineWeight} fill={palette[1]} />
          <CartesianGrid stroke="grey" strokeDasharray="3 3" />
          <XAxis stroke='white' />
          <YAxis stroke='white' />
          <Tooltip contentStyle={{ background: 'black', borderRadius: 10, border: 'none' }} />
          {/* <Legend formatter={(value, entry, index) => <span style={{ color: 'grey' }}>{value}</span>} /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

const Vehicle = () => {
  const { license } = useParams();
  const [vehicle, setVehicle] = useState({
    brand: 'toyota',
    name: 'Toyota 2018',
    license: 'AER-4477',
    status: 'Active',
    driver: 'Israel Adesanya',
    source: 'BYO HQ',
    destination: 'HRE HQ',

    fuel: 0.78,
    sensorId: {}
  });

  const [data, setData] = useState({
    brand: { label: 'Vehicle Manufacturer', value: 'Toyota', type: 'select', options: [] },
    name: { label: 'Vehicle Name', value: 'Toyota 2018', type: 'select', options: [] },
    license: { label: 'License Plate', value: license, type: 'select', options: [] },
    status: { label: 'Vehicle Status', value: 'Active', type: 'select', options: [] },
    driver: { label: 'Current Driver', value: 'Themba Takawira', type: 'select', options: [] },
    source: { label: 'Source Location', value: 'Bulawayo HQ', type: 'select', options: [] },
    destination: { label: 'Current Destination', value: 'Harare HQ', type: 'select', options: [] },
    fuelCapacity: { label: 'Fuel Tank Capacity (litres)', value: 10, type: 'number' },
    sensorId: { label: 'Fuel Tank Sensor ID', value: '0bfff7a4-70e2-11ef-a666-1fc901cc4554' }
  });

  const [formVisible, setFormVisible] = useState(true);

  return (
    <MainLayout>
      <div>
        {
          window.innerWidth > 500 && (
            <div style={{ padding: 30, paddingTop: 50 }}>
              <div style={{ width: '100%', background: '#000', borderRadius: 15, paddingBottom: 40 }}>
                <div style={{ display: 'inline-block', width: '50%', verticalAlign: 'top' }}>
                  <div style={{ padding: 40 }}>
                    <div style={{ background: '#1d1b1b', borderRadius: 10, paddingBottom: 10 }}>
                      <div style={{ display: 'inline-block', width: '30%', verticalAlign: 'top', paddingTop: 20 }}>
                        <div style={{ padding: 10, paddingLeft: 18 }}>
                          <div style={{ borderRadius: 10, fontSize: 13, paddingTop: 8, paddingBottom: 10, lineHeight: 0.5 }}>
                            <VehicleBrand brand={vehicle.brand} size={90} />
                            <p style={{}}>{license}</p>
                            <p style={{ color: '#557c56' }}>Active</p>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'inline-block', width: '70%', verticalAlign: 'top' }}>
                        <div style={{ paddingRight: 50 }}>
                          <Form formData={data} inline={true} width={'100%'} />
                        </div>
                      </div>
                      <div style={{ padding: 20 }}>
                        <p style={{ textAlign: 'left', borderBottom: '2px solid white', fontSize: 14 }}>Danger Zone</p>
                        <div style={{ paddingTop: 5 }}>
                          <div style={{ background: 'black', borderRadius: 10, padding: 5, paddingBottom: 50, paddingLeft: 10, paddingRight: 10 }}>
                            <p style={{ textAlign: 'left', fontSize: 14, }}>Delete Vehicle</p>
                            <p style={{ textAlign: 'left', fontSize: 13, color: 'grey' }}>Delete this vehicle along with all of it's historical data.</p>
                            <button
                              style={{ fontSize: 13, padding: 11, float: 'right', background: '#a04747' }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'inline-block', width: '50%', verticalAlign: 'top' }}>
                  <FuelHistory />
                  <DriverHistory />
                </div>
              </div>
            </div>
          )
        }
        {
          window.innerWidth < 500 && (
            <div style={{ padding: 1, paddingTop: 10 }}>
              <div style={{ width: '100%', background: '#000', borderRadius: 15, paddingBottom: 20 }}>
                <div style={{ verticalAlign: 'top' }}>
                  <div style={{ padding: 10 }}>
                    <div style={{ background: '#000', borderRadius: 10, paddingBottom: 20 }}>
                      <div style={{ verticalAlign: 'top', paddingTop: 20 }}>
                        <div style={{ paddingLeft: 10 }}>
                          <div style={{ borderRadius: 10, fontSize: 13, paddingTop: 8, paddingBottom: 10, lineHeight: 0.5 }}>
                            <VehicleBrand brand={vehicle.brand} size={90} />
                            <p style={{}}>{license}</p>
                            <p style={{ color: '#557c56' }}>Active</p>
                          </div>
                        </div>
                      </div>
                      <FuelHistory p={15} />
                      <DriverHistory p={15} />
                      <div style={{ verticalAlign: 'top' }}>
                        <div style={{ paddingRight: 5 }}>
                          <Form formData={data} inline={true} width={'100%'} />
                        </div>
                      </div>
                      <div style={{ padding: 5, paddingTop: 80 }}>
                        <p style={{ textAlign: 'left', borderBottom: '2px solid white', fontSize: 14 }}>Danger Zone</p>
                        <div style={{ paddingTop: 5 }}>
                          <div style={{ background: '#1d1b1b', borderRadius: 10, padding: 5, paddingBottom: 50, paddingLeft: 10, paddingRight: 10 }}>
                            <p style={{ textAlign: 'left', fontSize: 14, }}>Delete Vehicle</p>
                            <p style={{ textAlign: 'left', fontSize: 13, color: 'grey' }}>Delete this vehicle along with all of it's historical data.</p>
                            <button
                              style={{ fontSize: 13, padding: 11, float: 'right', background: '#a04747' }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>

    </MainLayout>
  )
};

export default Vehicle;