// import config from "../config/config";
// const config = { baseUrl: 'http://localhost:2222' }
const config = { baseUrl: 'https://fuel-ms-server.onrender.com' }


const getVehicle = async ({ key, value }) => {
  try {
    const response = await fetch(`${config.baseUrl}/api/v0/vehicle?key=${key}&&value=${value}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const getVehicles = async ({ search, active, low }) => {
  try {
    let query = '';
    if (search) {
      query += query === '' ? `search=${search}` : `&&search=${search}`
    }

    if (active) {
      query += query === '' ? 'active=true' : '&&active=true';
    }

    if (low) {
      query += query === '' ? 'low=true' : '&&low=true';
    }

    if (query) {
      query = `?${query}`;;
    }

    const response = await fetch(`${config.baseUrl}/api/v0/vehicles${query}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};


const registerVehicle = async (params) => {
  try {
    const response = await fetch(`${config.baseUrl}/api/v0/vehicle`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const updateVehicle = async (params) => {
  try {
    const response = await fetch(`${config.baseUrl}/api/v0/vehicle`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteVehicle = async ({ key, value }) => {
  try {
    const response = await fetch(`${config.baseUrl}/api/v0/vehicle?key=${key}&&value=${value}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const getFuelHistory = async (vehicle=null) => {
  try {
    console.log('api func got vehicle: ', vehicle)
    const query = vehicle ? `?vehicle=${vehicle}` : '';
    const response = await fetch(`${config.baseUrl}/api/v0/sensor${query}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const ping = async () => {
  try {
    const response = await fetch(`${config.baseUrl}/api/v0/ping`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export {
  registerVehicle,
  updateVehicle,
  getVehicle,
  getVehicles,
  getFuelHistory,
  deleteVehicle,
  ping
};
