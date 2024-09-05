import { useState, useEffect } from "react";

import SideBar from "../components/Sidebar";
import logo from '../assets/images/logo-sym.jpg'

import { MdMenu, MdMenuOpen } from "react-icons/md";
import { AiOutlineMenu, AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";

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

const openSidebarStyle = {
  // display: 
}

const closedSidebarStyle = {

}

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 500 ? true : false);

  const p = window.innerWidth > 500 ? 0 : 10;
  const pb = window.innerWidth > 500 ? 25 : 32;

  const toggleSidebar = () => {
    if (window.innerWidth > 500) {
      if (sidebarOpen) {
        setSidebarOpen(false);
      }

      else {
        setSidebarOpen(true)
      }
    }
  }

  return (
    <div class={sidebarOpen ? "grid-container" : "grid-container-closed"}>
      <div class="item1">
        <header style={{ background: 'black', height: '100%' }}>
          <div style={{ paddingTop: 14 }}>
            <button style={{ color: '#FCDE5A', float: 'left', padding: 0, background: 'black' }} onClick={() => toggleSidebar()}>
              {
                sidebarOpen && (<MdMenuOpen size={36} style={{ paddingTop: 3 }} />)
              }
              {
                !sidebarOpen && (<MdMenu size={36} style={{ paddingTop: 3 }} />)
              }
            </button>
          </div>
          <img src={logo} height={80} />
        </header>
      </div>
      <div class="item2">
        <SideBar open={sidebarOpen} />
      </div>
      <div class="item3">
        <div style={{ background: '#2c2a2a', height: '100%', width: '100%', borderRadius: 15 }}>
          <div style={{ padding: p, paddingBottom: pb }}>
            {children}
          </div>
        </div>
      </div>
      <div class="item5">
        <footer style={{ background: 'black' }}>
          <div style={{ paddingTop: 40 }}>
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
  )

}

export default MainLayout;