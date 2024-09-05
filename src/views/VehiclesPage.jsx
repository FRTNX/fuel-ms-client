import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

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


const VehicleCard = () => {

  return (
    <div>
      <div>

      </div>
    </div>
  )
};


const Placeholder = () => {
  const pl = window.innerWidth > 500 ? '47%' : '38%';

  return (
    <div>
      <div style={{ textAlign: 'center', paddingTop: 200, paddingLeft: pl }}>
        <CircleLoader color="grey" size={100} />
      </div>
      <p style={{ color: 'grey', paddingTop: 20}}>Coming Soon :) </p>

    </div>

  )
}


const VehiclesPage = () => {

  return (
    <MainLayout>
      <div style={{ paddingTop: 20 }}>
        {
          window.innerWidth > 500 && (
            <div style={{ padding: 30 }}>
              <div style={{ width: '100%', background: '#000', borderRadius: 15, height: 500 }}>
                <Placeholder />
              </div>
            </div>
          )
        }
        {
          window.innerWidth < 500 && (
            <div style={{ width: '100%', background: '#000', borderRadius: 15, height: 500 }}>
              <Placeholder />
            </div>
          )
        }
      </div>
    </MainLayout>
  )
}

export default VehiclesPage;