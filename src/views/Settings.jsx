import { useState, useEffect } from 'react'
import MainLayout from "../layouts/MainLayout";

import {
  getEmailRecipients,
  addEmailRecipient,
  updateEmailRecipient,
  removeEmailRecipient,
  getFuelThreshold,
  updateFuelThreshold
} from '../api/api';

// import { Form } from '../utils';

import DeleteEmailModal from '../components/DeleteEmailModal';

const EmailRecipient = ({ recipient }) => {
  const [data, setData] = useState({ _id: '', name: '', email: '' });

  const [edit, setEdit] = useState(false);

  const mobile = window.innerWidth < 500;

  useEffect(() => {
    setData(recipient)
  }, [])

  const toggleEdit = () => {
    if (edit) {
      setEdit(false)
    } else {
      setEdit(true);
    }
  }

  const submit = async () => {
    toggleEdit();
    const params = { id: recipient._id, email: data.email }
    console.log('updating eamil recipiuent with data:', params)
    await updateEmailRecipient(params)
    location.reload();
  }

  const remove = async () => {
    await removeEmailRecipient(recipient._id)
    location.reload();
  }

  const handleChange = (event) => {
    setData({ ...data, email: event.target.value });
  };

  return (
    <div>
      <div style={{ display: 'inline-block', width: '60%' }}>
        <label style={{ fontSize: 13 }}>{data.name}</label>
        <input
          style={{ width: edit ? '98%' : '100%' }}
          type='text'
          value={data.email}
          disabled={!edit}
          onChange={handleChange}
        />
      </div >
      {
        !edit && (
          <div style={{ display: 'inline-block' }}>
            <div style={{ display: 'inline-block', paddingLeft: 18 }}>
              <button style={{ background: '#FCDE5A', color: 'black' }} onClick={toggleEdit}>Edit</button>
            </div>
            <div style={{ display: 'inline-block', paddingLeft: 5, verticalAlign: 'bottom' }}>
              {/* <button style={{ background: '', color: 'white' }}>Delete</button> */}
              <DeleteEmailModal cb={remove} />
            </div>
          </div>
        )
      }
      {
        edit && (
          <div style={{ display: 'inline-block' }}>

            <div style={{ display: 'inline-block', paddingLeft: 11 }}>
              <button style={{ background: '', color: 'white' }} onClick={toggleEdit}>Cancel</button>
            </div>
            <div style={{ display: 'inline-block', paddingLeft: 7 }}>
              <button style={{ background: '#FCDE5A', color: 'black' }} onClick={submit}>Save</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

const Form = ({ formData, width, display, submitForm, submitBtn, toggleForm, inline, editMode, toggle }) => {
  const ORIGINAL_DATA = { ...formData };  // helps reset the form if a user cancels an edit 
  const togglable = toggle || true;
  const [data, setData] = useState(formData);
  const [edit, setEdit] = useState(editMode || false);

  /**
   * reset form fields
   */
  const reset = () => {
    const copy = { ...data }
    Object.keys(data).map((key) => copy[key].value = ORIGINAL_DATA[key].value);
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

  const toggleEdit = () => {
    console.log('toggling edit from:', edit)
    if (togglable) {
      if (edit) {
        reset();
        se;
      } else {
        setEdit(true);
      }
    }
  }

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
                  disabled={!edit}
                />
              </div>
            </div>
          ))
        }
      </div>
      <div style={{ paddingTop: 5 }}>
        {
          edit && (
            <div>
              <div style={{ display: 'inline-block', float: 'right', paddingLeft: 8 }}>
                <button
                  style={{ fontSize: 13, padding: 11, float: 'right', background: '#FCDE5A', color: 'black', ...submitBtn }}
                  onClick={submit}
                >Submit</button>
              </div>
              <div style={{ display: 'inline-block', float: 'right' }}>
                <button
                  style={{ fontSize: 13, padding: 11, float: 'right', background: 'grey', color: 'white' }}
                  onClick={cancel}
                >Cancel</button>
              </div>
            </div>
          )
        }
        {
          !edit && (
            <div style={{ display: 'inline-block', float: 'right', paddingLeft: 8 }}>
              <button
                style={{ fontSize: 13, padding: 11, float: 'right', background: '#FCDE5A', color: 'black' }}
                onClick={toggleEdit}
              >Edit</button>
            </div>
          )
        }
      </div>
    </div>
  )
}

const Settings = () => {
  const [count, setCount] = useState(0)
  const p = window.innerWidth > 500 ? 0 : 10;
  const pb = window.innerWidth > 500 ? 25 : 32;
  const [threshold, setThreshold] = useState(40);
  const [emailRecipients, setEmailRecipients] = useState([]);

  const formSchema = {
    name: { label: 'Recipient Name', type: 'text', value: '' },
    email: { label: 'Recipient Email', type: 'text', value: '' }
  }
  const [displayForm, setDisplayForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchFuelThreshold();
    fetchEmailRecipients();
  }, [])

  const fetchFuelThreshold = async () => {
    const result = await getFuelThreshold();
    if (result) {
      setThreshold(Number(result.threshold * 100).toFixed(0))
    }
  }

  const submitFuelThreshold = async () => {
    setSubmitting(true);
    const params = { threshold: threshold * 0.01 };
    await updateFuelThreshold(params);
    await fetchFuelThreshold();
    toggleEdit();
    setSubmitting(false);
  }

  const fetchEmailRecipients = async () => {
    const result = await getEmailRecipients();
    if (result) {
      setEmailRecipients(result)
    }
  }

  const editEmailRecipient = async (recipient) => {
    const params = {
      ...recipient
    };
    await updateEmailRecipient(params);
    await fetchEmailRecipients();
  }

  const submitRecipient = async (recipient) => {
    const params = { ...recipient };
    await addEmailRecipient(params);
    await fetchEmailRecipients();
  }

  const unsubscribeRecipient = async (recipientId) => {
    removeEmailRecipient(recipientId);
  };

  const toggleEdit = () => {
    if (edit) {
      setEdit(false)
    } else {
      setEdit(true);
    }
  }

  const toggleForm = () => {
    console.log('Toggling settings form from state:', displayForm)
    if (displayForm) {
      setDisplayForm(false)
    } else {
      setDisplayForm(true);
    }
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
                    <p style={{ fontSize: 20, borderBottom: '2px solid grey' }}>Settings</p>
                    <p style={{ fontSize: 17 }}>Fuel Policy</p>
                    <p style={{ color: 'grey', fontSize: 13 }}>Set a fuel threshold that all vehicles should adhere to. The threshold is described as a percentage.
                      Fuel readings below this threshold will trigger email notifications.
                    </p>
                    <div>
                      <div style={{ display: 'inline-block', width: '60%' }}>
                        <label style={{ fontSize: 13 }}>Fuel Threshold (%)</label>
                        <input
                          style={{ width: edit ? '98%' : '100%' }}
                          type='number'
                          value={threshold}
                          disabled={!edit}
                          onChange={(e) => setThreshold(e.target.value)}
                        />
                      </div>
                      {
                        !edit && (
                          <div style={{ display: 'inline-block' }}>
                            <div style={{ display: 'inline-block', paddingLeft: 18 }}>
                              <button style={{ background: '#FCDE5A', color: 'black' }} onClick={toggleEdit}>Edit</button>
                            </div>
                          </div>
                        )
                      }
                      {
                        edit && (
                          <div style={{ display: 'inline-block' }}>

                            <div style={{ display: 'inline-block', paddingLeft: 9 }}>
                              <button style={{ background: '', color: 'white' }} onClick={toggleEdit}>Cancel</button>
                            </div>
                            <div style={{ display: 'inline-block', paddingLeft: 7 }}>
                              <button style={{ background: '#FCDE5A', color: 'black' }} onClick={submitFuelThreshold} disabled={submitting}>Save</button>
                            </div>
                          </div>
                        )
                      }
                    </div>
                    <div style={{ paddingTop: 100 }}>
                      <p style={{ fontSize: 17 }}>Email Recipients</p>
                      <p style={{ color: 'grey', fontSize: 13 }}>
                        Use the options below to add, edit, or delete email notification recipients.
                      </p>
                      <div style={{ paddingTop: 30, paddingBottom: 50 }}>
                        <div style={{ width: '75%', border: '2px solid grey', paddingBottom: 50, paddingRight: 10, borderRadius: 15 }}>
                          <p style={{ paddingLeft: 10, fontSize: 17 }}>Add a new email recipient</p>
                          <p style={{ color: 'grey', fontSize: 13, paddingLeft: 10 }}>
                            Simply add the name of the recipient and their email address and you're good to go :)
                          </p>
                          {
                            displayForm && (
                              <Form
                                formData={formSchema}
                                width={'100%'}
                                submitForm={submitRecipient}
                                submitBtn={{ background: '#FCDE5A', color: 'black' }}
                                toggleForm={toggleForm}
                                toggle={false}
                                editMode={true}
                              />
                            )
                          }
                          {
                            !displayForm && (
                              <div style={{ float: 'right' }}>
                                <button onClick={toggleForm}>Add Email</button>
                              </div>
                            )
                          }
                        </div>
                      </div>
                      <div>
                        <div>
                          <p>Current Recipients</p>
                        </div>
                        {
                          emailRecipients.map((recipient) => (
                            <div style={{ paddingBottom: 10 }}>
                              <EmailRecipient recipient={recipient} />
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
                <div style={{ width: '100%'}}>
                      <div style={{ display: 'inline-block', width: !edit ? '70%' : '60%' }}>
                        <label style={{ fontSize: 13 }}>Fuel Threshold (%)</label>
                        <input
                          style={{ width: edit ? '98%' : '100%' }}
                          type='number'
                          value={threshold}
                          disabled={!edit}
                          onChange={(e) => setThreshold(e.target.value)}
                        />
                      </div>
                      {
                        !edit && (
                          <div style={{ display: 'inline-block' }}>
                            <div style={{ display: 'inline-block', paddingLeft: 18 }}>
                              <button style={{ background: '#FCDE5A', color: 'black' }} onClick={toggleEdit}>Edit</button>
                            </div>
                          </div>
                        )
                      }
                      {
                        edit && (
                          <div style={{ display: 'inline-block' }}>

                            <div style={{ display: 'inline-block', paddingLeft: 12 }}>
                              <button style={{ background: '', color: 'white' }} onClick={toggleEdit}>Cancel</button>
                            </div>
                            <div style={{ display: 'inline-block', paddingLeft: 5 }}>
                              <button style={{ background: '#FCDE5A', color: 'black' }} onClick={submitFuelThreshold} disabled={submitting}>Save</button>
                            </div>
                          </div>
                        )
                      }
                    </div>
                <div style={{ paddingTop: 50 }}>
                  <p style={{ fontSize: 15 }}>Email Recipients</p>
                  <p style={{ color: 'grey', fontSize: 13 }}>
                  Use the options below to add, edit, or delete email notification recipients.
                  </p>
                  <div style={{ paddingTop: 10, paddingBottom: 30 }}>
                    <div style={{ width: '97%', border: '2px solid grey', paddingBottom: 50, paddingRight: 10, borderRadius: 15 }}>
                      <p style={{ paddingLeft: 10, fontSize: 15 }}>Add a new email recipient</p>
                      <p style={{ color: 'grey', fontSize: 13, paddingLeft: 10 }}>
                        Simply add the name of the recipient and their email address and you're good to go :)
                      </p>
                      {
                        displayForm && (
                          <Form
                            formData={formSchema}
                            width={'100%'}
                            submitForm={submitRecipient}
                            submitBtn={{ background: '#FCDE5A', color: 'black' }}
                            toggleForm={toggleForm}
                            toggle={false}
                            editMode={true}
                          />
                        )
                      }
                      {
                        !displayForm && (
                          <div style={{ float: 'right' }}>
                            <button onClick={toggleForm}>Add Email</button>
                          </div>
                        )
                      }
                    </div>
                  </div>
                  <div>
                    <div>
                      <p>Current Recipients</p>
                    </div>
                    {
                      emailRecipients.map((recipient) => (
                        <div style={{ paddingBottom: 10 }}>
                          <EmailRecipient recipient={recipient} />
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