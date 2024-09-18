import { useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import bglog from '../assets/images/logo-text.jpg';

import { FaCar, FaUsers, FaChartLine, FaTruck } from 'react-icons/fa';

import { MdDashboard, MdMan4, MdOutlineHive } from 'react-icons/md';
import { IoSpeedometer } from 'react-icons/io5';
import { GiSpeedometer, GiStrongMan, GiSteeringWheel, GiSecretBook } from 'react-icons/gi';
import { GrManual } from 'react-icons/gr';
import { TiLeaf } from 'react-icons/ti';
import { FaConnectdevelop } from 'react-icons/fa';

import { DiMsqlServer } from 'react-icons/di';

const DIVCOLOR = '#FCDE5A';

const Item = ({ icon, text, underline }) => {
  const dividerColor = DIVCOLOR;

  return (
    <div style={{ width: '100%', borderBottom: underline ? `5px solid ${dividerColor}` : 'none', fontSize: 15, textAlign: 'left', height: 40 }}>
      <div style={{ display: 'inline-block', fontSize: 20, color: '#FCDE5A' }}>
        {icon}
      </div>
      <div style={{ display: 'inline-block', paddingLeft: 10, color: '#FCDE5A' }}>
        <span style={{ verticalAlign: 'middle'}}>{text}</span>
      </div>
    </div>
  )
}

const SideBar = ({ open }) => {



  return (
    <Sidebar
      className='sidebar'
      collapsed={!open}
      collapsedWidth={'0'}
      backgroundColor='black'
      rootStyles={{ height: '100%', border: 'none' }}
    >
      <div style={{ paddingTop: 19, paddingBottom: 10, paddingLeft: 0 }}>
        <img src={bglog} width={250} />
      </div>
      <Menu
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            // only apply styles on first level elements of the tree
            if (level === 0)
              return {
                height: 60,
                color: 'white',
                backgroundColor: 'black',
                '&:hover': {
                  background: '#1e1d1d'
                }
              };
            else {
              return {
                color: 'white',
                backgroundColor: '#1e1d1d',
                '&:hover': {
                  background: 'grey'
                }
              };
            }
          },
        }}
      >
        <p style={{ fontSize: 15, color: DIVCOLOR, paddingTop: 3 }}></p>
        <MenuItem component={<Link to={'/'} />}>
          <Item icon={<TiLeaf />} text={'Home'} underline={true} />
        </MenuItem>
        <MenuItem component={<Link to={'/vehicles'} />}>
          <Item icon={<MdOutlineHive style={{ paddingBotton: 1}}/>} text={'Vehicles'} />
        </MenuItem>
        <MenuItem>
          <Item icon={<FaConnectdevelop />} text={'Settings'} />
        </MenuItem>
        <MenuItem>
          <Item icon={<DiMsqlServer />} text={'Documentation'} />
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
