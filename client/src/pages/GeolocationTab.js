import React, { useState, useEffect } from 'react';
import { Capacitor, Plugins } from "@capacitor/core";
import LocationService from '../hooks/useGeolocationService';

import GeolocationView from '../components/GeolocationView';

const { Geolocation, Toast } = Plugins;

const GeolocationTab = () => {



  return (
    <>
      <GeolocationView />
    </>
  );
}

export default GeolocationTab;
