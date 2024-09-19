import { useState, useEffect } from 'react'
import MainLayout from "../layouts/MainLayout";


const EmailRecipient = ({ name, email }) => {
  const [data, setData] = useState({
    name,
    email,
    edit: false
  });

  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    if (data.edit) {
      setData()
    }
  }

  return (
    <div>
      <div style={{ display: 'inline-block', width: '60%' }}>
        <label style={{ fontSize: 13 }}>{name}</label>
        <input
          style={{ width: '100%' }}
          type='text'
          value={email}
          disabled={!data.edit}
        />
      </div >
      {
        !edit && (
          <div style={{ display: 'inline-block' }}>
            <div style={{ display: 'inline-block', paddingLeft: 18 }}>
              <button style={{ background: '#FCDE5A', color: 'black' }}>Edit</button>
            </div>
            <div style={{ display: 'inline-block', paddingLeft: 7 }}>
              <button style={{ background: '', color: 'white' }}>Delete</button>
            </div>
          </div>
        )
      }
      {/* {
        edit && (

        )
      } */}
    </div>
  )
}

const Settings = () => {
  const [count, setCount] = useState(0)
  const p = window.innerWidth > 500 ? 0 : 10;
  const pb = window.innerWidth > 500 ? 25 : 32;
  const [threshold, setThreshold] = useState(40);
  const [emailRecipients, setEmailRecipients] = useState([
    { name: 'Arman Tsarukyan', email: 'arman@ufc.com' },
    { name: 'Khabib Nurmagomedov', email: 'khabib@ufc.com' },
    { name: 'Dustin Poirier', email: 'dustinp@ufc.com' }
  ])

  const [editThreshold, setEditThreshold] = useState(false);

  // const []

  useEffect(() => {
    fetchFuelThreshold();
    fetchEmailRecipients();
  })

  const fetchFuelThreshold = async () => {

  }

  const updateFuelThreshold = async () => {

  }

  const fetchEmailRecipients = async () => {

  }

  const updateEmailRecipient = async () => {

  }

  const addEmailRecipient = async () => {

  }

  const removeEmailRecipient = async () => {

  }

  return (
    <MainLayout>
      <div style={{ paddingTop: 20 }}>
        {
          window.innerWidth > 500 && (
            <div style={{ padding: 30 }}>
              <div style={{ width: '100%', background: '#000', borderRadius: 15, paddingBottom: 50 }}>
                <div style={{ display: 'inline-block', width: '50%', verticalAlign: 'top', textAlign: 'left' }}>
                  <div style={{ paddingLeft: 20 }}>
                    <p style={{ fontSize: 22, borderBottom: '2px solid grey' }}>Settings</p>
                    <p style={{ fontSize: 17 }}>Fuel Policy</p>
                    <p style={{ color: 'grey', fontSize: 13 }}>Set a fuel threshold that all vehicles should adhere to. The threshold is described as a percentage.
                      Fuel readings below this threshold will trigger email notifications.
                    </p>
                    <div>
                      <div style={{ display: 'inline-block', width: '60%' }}>
                        <label style={{ fontSize: 13 }}>Fuel Threshold (%)</label>
                        <input
                          style={{ width: '100%' }}
                          type='number'
                          value={threshold}
                          disabled
                        />
                      </div>
                      <div style={{ display: 'inline-block', paddingLeft: 18 }}>
                        <button style={{ background: '#FCDE5A', color: 'black' }}>Edit</button>
                      </div>
                    </div>
                    <div style={{ paddingTop: 100 }}>
                      <p style={{ fontSize: 17 }}>Email Recipients</p>
                      <p style={{ color: 'grey', fontSize: 13 }}>
                        Add, edit, and/or remove email addresses that will receive notifications alerting them of threshold violations and other events.
                      </p>
                      <div>
                        {
                          emailRecipients.map((recipient) => (
                            <div style={{ paddingBottom: 10 }}>
                              <EmailRecipient name={recipient.name} email={recipient.email} />
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'inline-block', width: '50%', verticalAlign: 'top' }}>
                </div>
              </div>
            </div>
          )
        }
        {
          window.innerWidth < 500 && (
            <div style={{ width: '100%', background: '#000', borderRadius: 15, paddingBottom: 50 }}>
              <div style={{ textAlign: 'left', padding: 10 }}>
                <p style={{ fontSize: 18, borderBottom: '2px solid grey' }}>Settings</p>
                <p style={{ fontSize: 15 }}>Fuel Policy</p>
                <p style={{ color: 'grey', fontSize: 13 }}>Set a fuel threshold that all vehicles should adhere to. The threshold is described as a percentage.
                  Fuel readings below this threshold will trigger email notifications.
                </p>
                <div>
                  <div style={{ display: 'inline-block', width: '70%' }}>
                    <label style={{ fontSize: 13 }}>Fuel Threshold (%)</label>
                    <input
                      style={{ width: '100%' }}
                      type='number'
                      value={threshold}
                    />
                  </div>
                  <div style={{ display: 'inline-block', paddingLeft: 18 }}>
                    <button style={{ background: '#FCDE5A', color: 'black' }}>Update</button>
                  </div>
                </div>
                <div style={{ paddingTop: 50 }}>
                  <p style={{ fontSize: 15 }}>Email Recipients</p>
                  <p style={{ color: 'grey', fontSize: 13 }}>
                    Add, edit, and/or remove email addresses that will receive notifications alerting them of threshold violations and other events.
                  </p>
                  <div>
                    {
                      emailRecipients.map((recipient) => (
                        <div style={{ paddingBottom: 10 }}>
                          <EmailRecipient name={recipient.name} email={recipient.email} />
                        </div>
                      ))
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

export default Settings;