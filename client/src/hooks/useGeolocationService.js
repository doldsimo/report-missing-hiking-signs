import { AndroidPermissions } from '@ionic-native/android-permissions';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Capacitor } from "@capacitor/core";
import { isPlatform } from '@ionic/react';

import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;

const LocationService = {

    getCurrentLocation: async () => {
        try {
            const hasPermission = await LocationService.checkGPSPermission();
            if (hasPermission) {
                // hybrid = capacitor (android or ios)
                if (Capacitor.isNative) {
                    const canUseGPS = await LocationService.askToTurnOnGPS();
                    let coordinates;
                    if (canUseGPS) {
                        // Get Coordinates 
                        coordinates = await Geolocation.getCurrentPosition();
                    } else {
                        // Please turn on GPS to get location!!!
                        coordinates = 'Turn on GPS'
                    }
                    return coordinates
                } else {
                    // Get Coordinates 
                    const coordinates = await Geolocation.getCurrentPosition();
                    return coordinates;
                }
            } else {
                const permission = await LocationService.requestGPSPermission();
                if (permission === 'CAN_REQUEST' || permission === 'GOT_PERMISSION') {
                    if (Capacitor.isNative) {
                        const canUseGPS = await LocationService.askToTurnOnGPS();
                        let coordinates;
                        if (canUseGPS) {
                            // Get Coordinates 
                            coordinates = await Geolocation.getCurrentPosition();
                        }
                        return coordinates
                    }
                    else {
                        return 'Cannot access GPS check permissions'
                    }
                } else {
                    // If user do not accept use of gps from the app
                    return 'Cannot access GPS check permissions'
                }
            }
        } catch (error) {
            return 'Cannot access Location, check permissions'
        }
    },



    // Check if application having GPS access permission
    checkGPSPermission: async () => {
        return await new Promise((resolve, reject) => {
            if (Capacitor.isNative) {
                AndroidPermissions.checkPermission(AndroidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
                    result => {
                        if (result.hasPermission) {
                            // If having permission show 'Turn On GPS' dialogue
                            resolve(true);
                        } else {
                            // If not having permission ask for permission
                            resolve(false);
                        }
                    },
                    err => { alert(err); }
                );
            }
            else { resolve(true); }
        })
    },

    requestGPSPermission: async () => {
        return await new Promise((resolve, reject) => {
            LocationAccuracy.canRequest().then((canRequest) => {
                if (canRequest) {
                    resolve('CAN_REQUEST');
                } else {
                    // Show 'GPS Permission Request' dialogue
                    AndroidPermissions.requestPermission(AndroidPermissions.PERMISSION.ACCESS_FINE_LOCATION)
                        .then(
                            (result) => {
                                if (result.hasPermission) {
                                    // call method to turn on GPS
                                    resolve('GOT_PERMISSION');
                                } else {
                                    resolve('DENIED_PERMISSION');
                                }
                            },
                            error => {
                                // Show alert if user click on 'No Thanks'
                                alert('requestPermission Error requesting location permissions ' + error);
                            }
                        );
                }
            });
        })
    },

    askToTurnOnGPS: async () => {
        return await new Promise((resolve, reject) => {
            LocationAccuracy.canRequest().then((canRequest) => {
                if (canRequest) {
                    // the accuracy option will be ignored by iOS
                    LocationAccuracy.request(LocationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
                        () => {
                            resolve(true);
                        },
                        error => { resolve(false); });
                }
                else { resolve(false); }
            });
        })
    }
}
export default LocationService;