import { useEffect, useState } from "react";

import { SiVolkswagen, SiVolvo, SiBmw, SiMercedes, SiTesla, SiAudi, SiRenault, SiScania, SiToyota,
         SiPeugeot, SiAlfaromeo, SiAstonmartin, SiBentley, SiDaf, SiIveco, SiHyundai, SiHonda,
         SiMahindra, SiMan, SiMazda, SiMg, SiNissan, SiOpel } from "react-icons/si";


const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const VehicleBrand = ({ brand, size }) => {
  console.log('brand: ', brand)
  const target = brand.toLowerCase();
  if (target === 'volvo') {
    return <SiVolvo size={size || 50} />
  }

  else if (target === 'mercedes') {
    return <SiMercedes size={size || 50} />
  }

  else if (target === 'vw') {
    return <SiVolkswagen size={size || 50} />
  }

  else if (target === 'tesla') {
    return <SiTesla size={size || 50} />
  }

  else if (target === 'audi') {
    return <SiAudi size={size || 50} />
  }

  else if (target === 'renault') {
    return <SiRenault size={size || 50} />
  }

  else if (target === 'scania') {
    return <SiScania size={size || 50} />
  }

  else if (target === 'toyota') {
    return <SiToyota size={size || 50} />
  }

  else if (['peugeot', 'pegeot', 'pg'].includes(target)) {
    return <SiPeugeot size={size || 50} />
  }

  else if (target === 'iveco') {
    return <SiIveco size={size || 50} />
  }

  else if (target === 'daf') {
    return <SiDaf size={size || 50} />
  }

  else if (target === 'man') {
    return <SiMan size={size || 50} />
  }

  else if (target === 'mahindra') {
    return <SiMahindra size={size || 50} />
  }

  else if (target === 'nissan') {
    return <SiNissan size={size || 50} />
  }

   else if (target === 'opel') {
    return <SiOpel size={size || 50} />
  }
  else {
    return <SiBmw size={size || 50} />
  }
};

const Form = ({ formData, width, display, submitForm, toggleForm, inline }) => {
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
                <label htmlFor={data[key].label} style={{ fontSize: 13 }}>{data[key].label}</label>
                {
                  !inline && (<br />)
                }
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

export {
  random,
  Form,
  generateData,
  VehicleBrand
};
