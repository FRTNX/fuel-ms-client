import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";


const VehicleCard = () => {

  return (
    <div>
      <div>

      </div>
    </div>
  )
};


const EventsPage = () => {

  return (
    <MainLayout>
      <div style={{ paddingTop: 20 }}>
        {
          window.innerWidth > 500 && (
            <div style={{ padding: 30 }}>
              <div style={{ width: '100%', background: '#000', borderRadius: 15, height: 500 }}>

              </div>
            </div>
          )
        }
        {
          window.innerWidth < 500 && (
            <div style={{ width: '100%', background: '#000', borderRadius: 15, height: 500 }}>

            </div>
          )
        }
      </div>
    </MainLayout>
  )
}

export default EventsPage;