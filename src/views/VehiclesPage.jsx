import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { random, VehicleBrand } from "../utils";

const VehicleCard = ({ data, redirect }) => {
  return (
    <div style={{ background: '#1d1b1b', borderRadius: 15 }} onClick={() => redirect(`/vehicle/${data.license}`)}>
      <div style={{ display: 'inline-block', width: '30%', verticalAlign: 'top' }}>
        <div style={{ padding: 15 }}>
          <VehicleBrand brand={data.brand} />
        </div>
      </div>
      <div style={{ display: 'inline-block', width: '68%', fontSize: 13, verticalAlign: 'top', textAlign: 'left' }}>
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

const Form = ({ formData, width, display, submitForm, toggleForm }) => {
  const [data, setData] = useState(formData);

  /**
   * reset form fields
   */
  const reset = () => {
    const copy = { ...data }
    Object.keys(data).map((key) => copy[key].value = '');
    setData(copy);
  }

  const submit = () => {
    const params = Object.keys(data).reduce((partParams, key) => ({ ...partParams, [key]: data[key].value }), {});
    submitForm(params);
    reset();
    toggleForm();
  };

  const cancel = () => {
    reset();
    toggleForm();
  };

  const handleChange = (event, target) => {
    const copy = { ...data };
    copy[target].value = event.target.value
    setData(copy);
  };

  return (
    <div style={{ paddingTop: 40 }}>
      <div>
        {
          Object.keys(data).map((key) => (
            <div style={{ width: width || '50%', display: display || 'inline-block', verticalAlign: 'top', textAlign: 'left', paddingBottom: 10 }}>
              <div style={{ paddingLeft: 10, paddingRight: 10 }}>
                <label htmlFor={data[key].label} style={{ fontSize: 13 }}>{data[key].label}</label><br />
                <input
                  type={data[key].type || 'text'}
                  id={data[key].label}
                  style={{ width: '100%', height: 35, border: 'none', borderRadius: 5, paddingLeft: 5 }}
                  value={data[key].value}
                  onChange={(e) => handleChange(e, key)}
                />
              </div>
            </div>
          ))
        }
      </div>
      <div style={{ paddingTop: 5 }}>
        <div style={{ display: 'inline-block', float: 'right', paddingLeft: 10 }}>
          <button
            style={{ fontSize: 13, padding: 11, float: 'right', background: '#0d7c66' }}
            onClick={submit}
          >Submit</button>
        </div>
        <div style={{ display: 'inline-block', float: 'right' }}>
          <button
            style={{ fontSize: 13, padding: 11, float: 'right', background: '#3c3d37' }}
            onClick={cancel}
          >Cancel</button>
        </div>
      </div>

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
      brand: 'vw',
      name: 'Volkswagen 2017',
      license: 'ADT-2271',
      status: 'Inactive',
      driver: 'Francis Nganau',
      source: 'BYO HQ',
      destination: 'None',
      fuel: 0.41
    },
  ]);

  const [redirect, setRedirect] = useState({ activated: false, target: '' });
  const [inputText, setInputText] = useState('');
  const [vehicles, setVehicles] = useState(data);
  const [activeVehicles, setActiveVehicles] = useState(false);
  const [lowFuelVehicles, setLowFuelVehicles] = useState(false);

  const [vehicleFormVisible, setVehicleFormVisible] = useState(false);

  const [newVehicle, setNewVehicle] = useState({
    brand: { label: 'Vehicle Manufacturer', value: '' },
    name: { label: 'Vehicle Name', value: '' },
    license: { label: 'License Plate', value: '' },
    fuelCapacity: { label: 'Fuel Tank Capacity', value: '', type: 'number' },
    sensor: { label: 'Fuel Sensor ID', value: '' },
    loacation: { label: 'Initial Location', value: '' },
  });

  const [status, setStatus] = useState({
    message: '',
    color: 'green',
    show: false
  })

  const addColor = '#3c3d37'

  const filterVehicles = (searchValue, active = activeVehicles, lowFuel = lowFuelVehicles) => {
    setInputText(searchValue)
    let copy = [...data];

    if (active) {
      copy = copy.filter((vehicle) => vehicle.status === 'Active');
      setActiveVehicles(true);
    } else {
      setActiveVehicles(false);
    }

    if (lowFuel) {
      copy = copy.filter((vehicle) => vehicle.fuel < 0.50)
      setLowFuelVehicles(true);
    } else {
      setLowFuelVehicles(false);
    }

    const filtered = copy.filter((vehicle) => {
      const { brand, name, license, driver, source, destination } = vehicle;
      const searchableFields = [brand, name, license, driver, destination];
      return searchableFields.some((field) => field.toLowerCase().includes(searchValue.toLowerCase()))
    });

    setVehicles(filtered);
  }

  const toggleActiveVehicles = () => {
    if (activeVehicles) {
      filterVehicles(inputText, false)
    } else {
      filterVehicles(inputText, true)
    }
  };

  const toggleLowFuelVehicles = () => {
    if (lowFuelVehicles) {
      filterVehicles(inputText, activeVehicles, false)
    } else {
      filterVehicles(inputText, activeVehicles, true)
    }
  };

  const toggleVehicleForm = () => {
    setStatus({
      message: '',
      color: 'green',
      show: false
    });

    if (vehicleFormVisible) {
      setVehicleFormVisible(false);
    } else {
      setVehicleFormVisible(true);
    }
  }

  const submitVehicle = (vehicle) => {
    const augmented = {
      ...vehicle,
      status: 'Inactive',
      driver: 'Unassigned',
      source: 'None',
      destination: 'None',
      fuel: random(10, 100) * 0.01
    }

    augmented.brand = vehicle.brand.toLowerCase()

    setData(current => [...current, augmented])
    setVehicles(current => [...current, augmented])
    setStatus({
      message: 'Vehicle added successfully!',
      color: '#557c56',
      show: true
    });
  };

  const redirectTo = (target) => {
    setRedirect({ activated: true, target })
  }

  if (redirect.activated) {
    return <Navigate to={redirect.target}/>
  }


  return (
    <MainLayout>
      <div style={{ paddingTop: 20 }}>
        {
          window.innerWidth > 500 && (
            <div style={{ padding: 30 }}>
              <div style={{ width: '100%', background: '#000', borderRadius: 15, paddingBottom: 40 }}>
                <div style={{ display: 'inline-block', width: '50%', textAlign: 'left', paddingTop: 10 }}>
                  <div style={{}}>
                    <div style={{ width: '45%', paddingLeft: 10, paddingTop: 10, paddingBottom: 10, display: 'inline-block' }}>
                      <input
                        type="text"
                        value={inputText}
                        onChange={(e) => filterVehicles(e.target.value)}
                        placeholder="Search vehicles by driver, license plate, etc..."
                        style={{
                          width: '100%', height: 35, borderRadius: 5, border: 'none', paddingLeft: 10
                        }}
                      />
                    </div>
                    <div style={{ display: 'inline-block', paddingLeft: 20 }}>
                      <button
                        style={{ background: activeVehicles ? '#0d7c66' : 'grey', fontSize: 13, padding: 11 }}
                        onClick={(toggleActiveVehicles)}
                      >Active</button>
                    </div>
                    <div style={{ display: 'inline-block', paddingLeft: 7 }}>
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
                          <VehicleCard data={vehicle} redirect={redirectTo} />
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div style={{ display: 'inline-block', width: '50%', verticalAlign: 'top' }}>
                  <p style={{ paddingTop: 45, paddingLeft: 30, textAlign: 'left', fontSize: 18 }}>Vehicle Management</p>
                  {
                    status.show && (
                      <p style={{ fontSize: 13, textAlign: 'left', color: status.color, paddingLeft: 30 }}>{status.message}</p>
                    )
                  }
                  <p style={{ fontSize: 13, textAlign: 'left', color: 'grey', paddingLeft: 30 }}>To add more vehicles click the button below.</p>
                  <div style={{ paddingRight: 20, paddingLeft: 20 }}>
                    <button
                      style={{ fontSize: 13, padding: 11, float: 'right', background: addColor }}
                      onClick={toggleVehicleForm}
                      disabled={vehicleFormVisible}
                    >
                      Add Vehicle
                    </button>
                    <div style={{}}>
                      {
                        vehicleFormVisible && (
                          <Form
                            formData={newVehicle}
                            submitForm={submitVehicle}
                            toggleForm={toggleVehicleForm}
                            width={'50%'}
                          />
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        {
          window.innerWidth < 500 && (
            <div style={{ width: '100%', background: '#000', borderRadius: 15, paddingBottom: 60 }}>
              <div style={{}}>
                <div style={{ padding: 20, paddingTop: 20, paddingBottom: 10 }}>
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
                <div style={{ display: 'inline-block', paddingLeft: 20, float: 'left' }}>
                  <button
                    style={{ background: activeVehicles ? '#0d7c66' : 'grey', fontSize: 13, padding: 11 }}
                    onClick={(toggleActiveVehicles)}
                  >Active</button>
                </div>
                <div style={{ display: 'inline-block', paddingLeft: 5, paddingBottom: 20, float: 'left' }}>
                  <button
                    style={{ background: lowFuelVehicles ? '#8d493a' : 'grey', fontSize: 13, padding: 11 }}
                    onClick={toggleLowFuelVehicles}
                  >Low Fuel</button>
                </div>
              </div>
              <div style={{ width: '100%', height: 800, overflowY: 'scroll' }}>
                {
                  vehicles.map((vehicle) => (
                    <div style={{ padding: 10 }}>
                      <VehicleCard data={vehicle} redirect={redirectTo}/>
                    </div>
                  ))
                }
              </div>
              <div style={{}}>
                <p style={{ paddingTop: 45, paddingLeft: 30, textAlign: 'left', fontSize: 18 }}>Vehicle Management</p>
                {
                  status.show && (
                    <p style={{ fontSize: 13, textAlign: 'left', color: status.color, paddingLeft: 30 }}>{status.message}</p>
                  )
                }
                <p style={{ fontSize: 13, textAlign: 'left', color: 'grey', paddingLeft: 30 }}>To add more vehicles click the button below.</p>
                <div style={{ paddingRight: 20, paddingLeft: 20 }}>
                  <button
                    style={{ fontSize: 13, padding: 11, float: 'right', background: addColor }}
                    onClick={toggleVehicleForm}
                    disabled={vehicleFormVisible}
                  >
                    Add Vehicle
                  </button>
                  <div style={{}}>
                    {
                      vehicleFormVisible && (
                        <Form
                          formData={newVehicle}
                          submitForm={submitVehicle}
                          toggleForm={toggleVehicleForm}
                          width={'100%'}
                        />
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </MainLayout>
  )
}

export default VehiclesPage;