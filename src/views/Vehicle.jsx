import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  Legend,
  Label,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

import { VehicleBrand, generateData, Form } from '../utils';

import MainLayout from '../layouts/MainLayout';

import { getVehicle, getFuelHistory, updateVehicle, deleteVehicle, getConsumptionHistory } from '../api/api';
import DeleteVehicleModal from '../components/DeleteVehicleModal';

const offlineVehicle = {
  _id: '',
  manufacturer: 'toyota',
  name: 'Toyota 2018',
  license: 'AER-4477',
  status: 'Active',
  driver: 'Israel Adesanya',
  source: 'BYO HQ',
  destination: 'HRE HQ',
  fuelCapacity: 15,
  fuel: 0.78,
  sensorId: '0bfff7a4-70e2-11ef-a666-1fc901cc4554'
};

const palettes = {
  defconOne: { primary: '#697565', secondary: '#ecdfcc' },
  defconTwo: { primary: '#697565', secondary: '#FCDE5A' },
  defconThree: { primary: '', secondary: '' },
  defconFour: { primary: '', secondary: '' },
  defconFive: { primary: '', secondary: '' },
}

const palette = Object.values(palettes.defconOne)


const FuelHistory = ({ vehicle, p }) => {
  const rows = window.innerWidth > 500 ? 20 : 15;
  const variation = window.innerWidth > 500 ? 10 : 6;
  const pt = window.innerWidth > 500 ? 25 : 0;
  const lineWeight = 2;

  const [data, setData] = useState(generateData(['fuel', 'c2', 'c3', 'c4', 'c5'], variation, rows))

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
    const result = await getFuelHistory(vehicle)
    if (result) {
      setData(result)
    }
  }

  return (
    <div style={{ padding: p || 40, paddingTop: pt, fontSize: 13 }}>
      <p style={{ textAlign: 'left' }}>Fuel History</p>
      <p style={{ textAlign: 'left', fontSize: 13, color: 'grey' }}>Details the most recent fuel history for this vehicle.
        Eventually you'll be able to select the time period you'd like to view fuel history for.</p>
      <ResponsiveContainer width='100%' height={300} style={{ background: 'black', borderRadius: 15 }}>
        <AreaChart data={data} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
          <Area name={vehicle} type="monotone" dataKey='fuel' stroke="#f5f7f8" strokeWidth={lineWeight} fill={palette[0]} />
          <CartesianGrid stroke="grey" strokeDasharray="3 3" />
          <XAxis stroke='white'>
            <Label value={'Sensor Readings'} offset={0} position={'insideBottom'}/>
          </XAxis>
          <YAxis stroke='white' label={{ value: 'Fuel (%)', angle: 270, position: 'insideLeft'}}/>
          <Tooltip contentStyle={{ background: 'black', borderRadius: 10, border: 'none' }} />
          {/* <Legend formatter={(value, entry, index) => <span style={{ color: 'grey' }}>{value}</span>} /> */}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

const FuelConsumption = ({ vehicle, p }) => {
  const rows = window.innerWidth > 500 ? 15 : 7;
  const variation = window.innerWidth > 500 ? 15 : 6;
  const [data, setData] = useState(generateData(['diff'], variation, rows))

  const lineWeight = 2;

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
    const result = await getConsumptionHistory(vehicle)
    setData(result)
  }

  return (
    <div style={{ padding: p || 40, paddingTop: 10, fontSize: 13 }}>
      <p style={{ textAlign: 'left' }}>Fuel Consumption</p>
      <p style={{ textAlign: 'left', fontSize: 13, color: 'grey' }}>Shows vehicle fuel consumption.</p>
      <ResponsiveContainer width='100%' height={300} style={{ background: 'black', borderRadius: 15 }}>
        <BarChart data={data} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
          <Bar name='Driver' type="monotone" dataKey='diff' stroke={palette[1]} strokeWidth={lineWeight} fill={palette[1]} />
          <CartesianGrid stroke="grey" strokeDasharray="3 3" />
          <XAxis stroke='white'>
            <Label value={'Fuel Consumption'} offset={0} position={'insideBottom'}/>
          </XAxis>
          <YAxis stroke='white' label={{ value: 'Change in fuel', angle: 270, position: 'insideLeft'}}/>
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
    _id: '',
    manufacturer: 'toyota',
    name: '',
    license: '',
    status: 'Inactive',
    driver: '',
    source: '',
    destination: '',
    fuelCapacity: '',
    fuel: '',
    sensorId: ''
  });

  const [localData, setLocalData] = useState({
    manufacturer: { label: 'Vehicle Manufacturer', value: offlineVehicle.manufacturer, type: 'select', options: [] },
    name: { label: 'Vehicle Name', value: offlineVehicle.name, type: 'select', options: [] },
    license: { label: 'License Plate', value: license, type: 'select', options: [] },
    status: { label: 'Vehicle Status', value: offlineVehicle.status, type: 'select', options: [] },
    driver: { label: 'Current Driver', value: offlineVehicle.driver, type: 'select', options: [] },
    source: { label: 'Source Location', value: offlineVehicle.source, type: 'select', options: [] },
    destination: { label: 'Current Destination', value: offlineVehicle.destination, type: 'select', options: [] },
    fuelCapacity: { label: 'Fuel Tank Capacity (litres)', value: offlineVehicle.fuelCapacity, type: 'number' },
    sensorId: { label: 'Fuel Tank Sensor ID', value: offlineVehicle.sensorId }
  });

  const [data, setData] = useState(null);

  const [formVisible, setFormVisible] = useState(true);

  const [redirect, setRedirect] = useState({ activated: false, target: '' })

  useEffect(() => {
    fetchVehicle()
  }, []);

  const fetchVehicle = async () => {
    try {
      const result = await getVehicle({ key: 'license', value: license });
      console.log('got vehicle: ', result)
      if (result) {
        setVehicle({ ...vehicle, ...result });
        setData({
          manufacturer: { label: 'Vehicle Manufacturer', value: result.manufacturer, type: 'select', options: [] },
          name: { label: 'Vehicle Name', value: result.name, type: 'select', options: [] },
          license: { label: 'License Plate', value: license, type: 'select', options: [] },
          status: { label: 'Vehicle Status', value: result.status, type: 'select', options: [] },
          driver: { label: 'Current Driver', value: result.driver, type: 'select', options: [] },
          source: { label: 'Source Location', value: result.source, type: 'select', options: [] },
          destination: { label: 'Current Destination', value: result.destination, type: 'select', options: [] },
          fuelCapacity: { label: 'Fuel Tank Capacity (litres)', value: result.fuelCapacity, type: 'number' },
          sensorId: { label: 'Fuel Tank Sensor ID', value: result.sensorId }
        });
      }
    } catch (error) {
      console.log(error);
      setVehicle(offlineVehicle);
      setData({

      });
      setOffline(true)
    }
  }

  const submit = async (formValues) => {
    const params = {
      vehicleId: vehicle._id,
      updateValues: formValues
    };

    console.log('updating vehicle with:', params)
    await updateVehicle(params);
    location.reload();
  };

  const remove = async () => {
    const result = await deleteVehicle({ key: 'license', value: license });
    if (result) {
      setRedirect({ activated: true, target: '/vehicles' })
    }
  }

  if (redirect.activated) {
    return <Navigate to={redirect.target} />
  }

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
                            <VehicleBrand brand={vehicle.manufacturer} size={90} />
                            <p style={{}}>{license}</p>
                            <p style={{ color: vehicle.status.toLowerCase() === 'active' ? '#557c56' : 'grey' }}>{vehicle.status}</p>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'inline-block', width: '70%', verticalAlign: 'top' }}>
                        <div style={{ paddingRight: 50 }}>
                          {
                            !data && (<Form formData={localData} inline={true} width={'100%'} />)
                          }
                          {
                            data && (<Form formData={data} inline={true} width={'100%'} submitForm={submit} />)
                          }
                        </div>
                      </div>
                      <div style={{ padding: 20 }}>
                        <p style={{ textAlign: 'left', borderBottom: '2px solid white', fontSize: 14 }}>Danger Zone</p>
                        <div style={{ paddingTop: 5 }}>
                          <div style={{ background: 'black', borderRadius: 10, padding: 5, paddingBottom: 15, paddingLeft: 10, paddingRight: 10 }}>
                            <p style={{ textAlign: 'left', fontSize: 14, }}>Delete Vehicle</p>
                            <p style={{ textAlign: 'left', fontSize: 13, color: 'grey' }}>Delete this vehicle along with all of it's historical data.</p>
                            <DeleteVehicleModal cb={remove}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'inline-block', width: '50%', verticalAlign: 'top' }}>
                  <FuelHistory vehicle={license}/>
                  <FuelConsumption vehicle={license}/>
                </div>
              </div>
            </div>
          )
        }
        {
          window.innerWidth < 500 && (
            <div style={{ padding: 1, paddingTop: 20 }}>
              <div style={{ width: '100%', background: '#000', borderRadius: 15, paddingBottom: 20 }}>
                <div style={{ verticalAlign: 'top' }}>
                  <div style={{ padding: 10 }}>
                    <div style={{ background: '#000', borderRadius: 10, paddingBottom: 20 }}>
                      <div style={{ verticalAlign: 'top', paddingTop: 20 }}>
                        <div style={{ paddingLeft: 10 }}>
                          <div style={{ borderRadius: 10, fontSize: 13, paddingTop: 8, paddingBottom: 10, lineHeight: 0.5 }}>
                            <VehicleBrand brand={vehicle.manufacturer} size={90} />
                            <p style={{}}>{license}</p>
                            <p style={{ color: vehicle.status.toLowerCase() === 'active' ? '#557c56' : 'grey' }}>{vehicle.status}</p>
                          </div>
                        </div>
                      </div>
                      <FuelHistory p={10} vehicle={license}/>
                      <FuelConsumption p={10} vehicle={license} />
                      <div style={{ verticalAlign: 'top' }}>
                        <div style={{ paddingRight: 5 }}>
                          {
                            !data && (<Form formData={localData} inline={true} width={'100%'} />)
                          }
                          {
                            data && (<Form formData={data} inline={true} width={'100%'} submitForm={submit} />)
                          }
                        </div>
                      </div>
                      <div style={{ padding: 5, paddingTop: 80 }}>
                        <p style={{ textAlign: 'left', borderBottom: '2px solid white', fontSize: 14 }}>Danger Zone</p>
                        <div style={{ paddingTop: 5 }}>
                          <div style={{ background: '#1d1b1b', borderRadius: 10, padding: 5, paddingBottom: 15, paddingLeft: 10, paddingRight: 10 }}>
                            <p style={{ textAlign: 'left', fontSize: 14, }}>Delete Vehicle</p>
                            <p style={{ textAlign: 'left', fontSize: 13, color: 'grey' }}>Delete this vehicle along with all of it's historical data.</p>
                            <DeleteVehicleModal cb={remove}/>
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
