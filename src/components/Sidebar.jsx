import { useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import bglog from '../assets/images/logo-text.jpg';

import { FaCar, FaUsers, FaChartLine, FaTruck } from 'react-icons/fa';

const DIVCOLOR = '#dddd64';

const Item = ({ icon, text }) => {
  const dividerColor = DIVCOLOR;

  return (
    <div style={{ width: '100%', borderBottom: `3px solid ${dividerColor}`, fontSize: 13 }}>
      <div style={{ width: '15%', display: 'inline-block', fontSize: 15, }}>
        {icon}
      </div>
      <div style={{ width: '85%', display: 'inline-block' }}>
        <p style={{}}>{text}</p>
      </div>
    </div>
  )
}

const SideBar = () => {
  const [sidebarHeight, setSidebarHeight] = useState();
  const dividerColor = DIVCOLOR;


  useEffect(() => {
    const handleWindowResize = () => {
      setSidebarHeight(window.innerHeight)
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);


  return (
    <Sidebar
      className='sidebar'
      collapsed={false}
      collapsedWidth={'0'}
      backgroundColor='black'
      //   image={bglog}
      rootStyles={{ height: '100vh', position: 'fixed', left: 0, top: 0, border: 'none', textAlign: 'left' }}
    >
      <div style={{ paddingTop: 20, paddingBottom: 0, paddingLeft: 10 }}>
        <img src={bglog} width={222} onClick={<Link to={'/'} />} />
      </div>
      <Menu
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            // only apply styles on first level elements of the tree
            if (level === 0)
              return {
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
        <p style={{ fontSize: 15, paddingLeft: 41, color: DIVCOLOR}}>Fuel Monitoring System</p>
        <MenuItem>
          <Item icon={<FaTruck />} text={'Vehicles'}/>
        </MenuItem>
        <MenuItem>
          <Item icon={<FaUsers />} text={'Drivers'}/>
        </MenuItem>
        <MenuItem>
          <Item icon={<FaChartLine />} text={'Insights'}/>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
