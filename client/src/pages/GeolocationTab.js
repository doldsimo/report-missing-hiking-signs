import React, { useState, useEffect } from 'react';
import { Capacitor, Plugins } from "@capacitor/core";
import LocationService from '../hooks/useGeolocationService';

import GeolocationView from '../components/GeolocationView';

const { Geolocation, Toast } = Plugins;

const GeolocationTab = () => {
  const [position, setPosition] = useState([48.051776, 8.206841]);
  const [loading, setLoading] = useState(false);
  let watchId = '';

  useEffect(() => {
    console.log("Mounted");
    checkPermissions();
  }, [])

  const checkPermissions = async () => {
    const hasPermission = await LocationService.checkGPSPermission();
    if (hasPermission) {
      if (Capacitor.isNative) {
        const canUseGPS = await LocationService.askToTurnOnGPS();
        postGPSPermission(canUseGPS);
      }
      else {
        postGPSPermission(true);
      }
    }
    else {
      console.log('14');
      const permission = await LocationService.requestGPSPermission();
      if (permission === 'CAN_REQUEST' || permission === 'GOT_PERMISSION') {
        if (Capacitor.isNative) {
          const canUseGPS = await LocationService.askToTurnOnGPS();
          postGPSPermission(canUseGPS);
        }
        else {
          postGPSPermission(true);
        }
      }
      else {
        await Toast.show({
          text: 'User denied location permission'
        })
      }
    }
  }

  const postGPSPermission = async (canUseGPS) => {
    if (canUseGPS) {
      watchPosition();
    }
    else {
      await Toast.show({
        text: 'Please turn on GPS to get location'
      })
    }
  }

  const watchPosition = async () => {
    try {
      setLoading(true);
      watchId = Geolocation.watchPosition({}, (position, err) => {

        if (err) {
          return;
        }
        setPosition([position.coords.latitude, position.coords.longitude]);
        setLoading(false);
        clearWatch();
      })
    }
    catch (err) { console.log('err', err) }
  }

  const clearWatch = () => {
    if (watchId != null) {
      Geolocation.clearWatch({ id: watchId });
    }
    setLoading(false);
  }


  return (
    <>
      <GeolocationView
        latitude={position[0]}
        longitude={position[1]}
        getGeoLocation={checkPermissions}
        loading={loading}
      />
    </>
  );
}

export default GeolocationTab;
