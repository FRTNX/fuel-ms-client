import { useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import bglog from '../assets/images/logo-text.jpg';

import { FaCar, FaUsers, FaChartLine, FaTruck } from 'react-icons/fa';

const DIVCOLOR = '#FCDE5A';

const Item = ({ icon, text }) => {
  const dividerColor = DIVCOLOR;

  return (
    <div style={{ width: '100%', borderBottom: `3px solid ${dividerColor}`, fontSize: 13, textAlign: 'left' }}>
      <div style={{ display: 'inline-block', fontSize: 15, }}>
        {icon}
      </div>
      <div style={{ display: 'inline-block', paddingLeft: 10 }}>
        <p style={{}}>{text}</p>
      </div>
    </div>
  )
}

const SideBar = ({ open }) => {
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
      collapsed={!open}
      collapsedWidth={'0'}
      backgroundColor='black'
      //   image={bglog}
      rootStyles={{ height: '100%', border: 'none' }}
    >
      <div style={{ paddingTop: 20, paddingBottom: 0, paddingLeft: 0 }}>
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
        <p style={{ fontSize: 15, color: DIVCOLOR, paddingTop: 5 }}></p>
        <MenuItem>
          <Item icon={<FaTruck />} text={'Vehicles'} />
        </MenuItem>
        <MenuItem>
          <Item icon={<FaUsers />} text={'Drivers'} />
        </MenuItem>
        <MenuItem>
          <Item icon={<FaChartLine />} text={'Insights'} />
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
