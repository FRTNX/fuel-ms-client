import { useState, useEffect } from 'react'
// import { addPVBattery } from './api/solar-api';
import Modal from 'react-modal';


Modal.setAppElement('#root')

const DeleteEmailModal = ({ cb }) => {
  const [processing, setProcessing] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({ volts: 12, amps: 100 });


  const handleChange = (event, target) => {
    setData({ ...data, [target]: event.target.value })
  }

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  };

  const submit = (event) => {
    event.preventDefault();
    setProcessing(true);
    // addPVBattery({ system_id: systemId, volts: data.volts, amps: data.amps });
    cb();
    setOpen(false);
    setProcessing(false)
  };

  return (
    <div style={{}}>
      <button
        style={{ fontSize: 13, padding: 11, float: 'right' }}
        onClick={openModal}
        disabled={open}
      >
        Delete
      </button>
      <div style={{ position: 'relative', display: 'flex', width: '100%', textAlign: 'center', justifyContent: 'center' }}>
        <Modal
          isOpen={open}
          onRequestClose={closeModal}
          style={{
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'transparent',
              textAlign: 'center',

            },
            content: {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: window.innerWidth > 500 ? 500 : 300,
              height: window.innerWidth > 500 ? 150 : 185,
              border: '1px solid grey',
              background: '#111111',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '15px',
              outline: 'none',
              padding: '20px'
            }
          }}
          contentLabel="Example Modal"
        >
          <div>
            <p>Are you sure?</p>
            <p style={{ fontSize: 13, color: 'grey' }}>This email address will no longer recieve notifications for fuel violations.</p>
          </div>
          <div style={{}}>
            <div style={{ display: 'inline-block', float: 'right', paddingLeft: 6 }}>
            <button
                type='submit'
                onClick={(event) => submit(event)}
                style={{ fontSize: 13, padding: 11, float: 'right', background: '#a04747' }}
                disabled={processing}
              >
                Delete
              </button>
            </div>
            <div style={{ display: 'inline-block', float: 'right' }}>
            <button
                onClick={closeModal}
                style={{ fontSize: 13, padding: 11, float: 'right', background: '#212121' }}
                disabled={processing}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default DeleteEmailModal;