import SideBar from "../components/Sidebar";
import logo from '../assets/images/logo-sym.jpg'

import {
  GridLoader,
  BeatLoader,
  BarLoader,
  HashLoader,
  ClimbingBoxLoader,
  BounceLoader,
  PacmanLoader,
  PropagateLoader,
  PulseLoader,
  PuffLoader,
  MoonLoader,
  ScaleLoader,
  SyncLoader,
  ClipLoader,
  FadeLoader,
  RiseLoader,
  DotLoader,
  RingLoader,
  RotateLoader,
  CircleLoader
} from 'react-spinners';

const MainLayout = ({ children }) => {
  console.log('received children: ', children)
  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <div style={{ width: '16%', display: 'inline-block', verticalAlign: 'top' }}>
        <SideBar />
      </div>
      <div style={{ width: '100%', display: 'inline-block', verticalAlign: 'top' }}>
        <div style={{ position: 'absolute', left: 249, top: 0, right: 0 }}>
          <header
            style={{ background: 'black', height: 80, width: '100%', paddingTop: 7, paddingBottom: 7, position: 'fixed' }}
          >
            <img src={logo} height={80} style={{ paddingRight: 250 }} />
          </header>
          <div style={{ paddingRight: 20, paddingBottom: 0, paddingLeft: 20, paddingTop: 0, minHeight: '100vh'}}>
            {children}
          </div>
          <footer
            style={{
              background: 'black',
              height: 250,
              width: '100%'
            }}
          >
            {/* <img src={logo} width={80} /> */}
            <div style={{ paddingTop: 40}}>
              <GridLoader
                color='white'
                size={40}
              />
            </div>
            <p style={{ color: 'white', fontSize: 15 }}>
              &copy; {`${new Date().getFullYear()} Screature Tech PLC`}
            </p>
          </footer>
        </div>

      </div>

    </div>
  )

}

export default MainLayout;