import { useContext } from 'react';
import { AlertContext } from './context/AlertContext';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonLoading, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonToast } from '@ionic/react';
import { alertCircleOutline, mapOutline } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import CameraTab from './pages/ReportTab';
import GeolocationTab from './pages/GeolocationTab';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App = () => {

  const { alertMessage, setAlertMessage, isLoading, setIsLoading } = useContext(AlertContext);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/report" component={CameraTab} />
            <Route exact path="/geolocation" component={GeolocationTab} />
            {/* <Route exact path="/report-post" component={ReportPost} /> */}
            <Route exact path="/"><Redirect to="/report" /></Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="report" href="/report">
              <IonIcon icon={alertCircleOutline} />
              <IonLabel>Melden</IonLabel>
            </IonTabButton>
            <IonTabButton tab="geolocation" href="/geolocation">
              <IonIcon icon={mapOutline} />
              <IonLabel>Karte</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
        <IonLoading
          isOpen={isLoading}
          message={'Bitte Warten...'}
          onDidDismiss={() => setIsLoading(false)}
        />
        <IonToast
          isOpen={alertMessage != ""}
          duration={1500}
          onDidDismiss={() => setAlertMessage("")}
          message={alertMessage}
          position="bottom"
        />
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
