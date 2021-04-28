import React, { useEffect, useState } from 'react';

import { IonButton, IonContent, IonImg, IonModal, IonSkeletonText, IonText, IonThumbnail } from '@ionic/react';
import * as api from '../../../api/index';
import moment from 'moment';
import 'moment/locale/de';

const OtherLocationsModal = ({ isModalOpen, setIsModalOpen, locationId, setLocationId }) => {
    const [location, setLocation] = useState(null)
    moment.locale("de");

    useEffect(() => {
        const fetchReportPost = async () => {
            try {
                const { data } = await api.fetchReportPost(locationId);
                // console.log(data);
                setLocation(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchReportPost();
    }, [])

    return (
        <IonModal isOpen={isModalOpen} onDidDismiss={() => { setIsModalOpen(false); setLocationId(undefined) }}>
            <IonContent>
                <div className="ion-padding">
                    {location == null ?
                        <>
                            <IonThumbnail style={{ width: "100%", minHeight: "300px" }}>
                                <IonSkeletonText animated />
                            </IonThumbnail>
                            <h3>
                                <IonSkeletonText animated style={{ width: '50%' }} />
                            </h3>
                            <p>
                                <IonSkeletonText animated style={{ width: '80%' }} />
                            </p>
                            <p>
                                <IonSkeletonText animated style={{ width: '60%' }} />
                            </p>

                        </>
                        :
                        <>
                            <div style={{ maxWidth: "500px", margin: "auto" }} className="ion-padding">
                                <IonImg style={{ width: "100%", heigh: "auto", paddingBottom: "10px" }} src={location.img} />
                                <IonText>
                                    <p style={{ fontSize: "16px", margin: "auto", color: "grey" }}>{moment(location.createdAt).format("Do MMMM YYYY")}</p>
                                </IonText>
                            </div>
                            {location.description === "" ?
                                <IonText>
                                    <p>
                                        Keine Beschreibung
                                    </p>
                                </IonText>
                                :
                                <IonText>
                                    <h3>Beschreibung:</h3>
                                    {" " + location.description}
                                </IonText>
                            }
                        </>
                    }
                </div>
            </IonContent>
            <IonButton onClick={() => setIsModalOpen(false)}>Schließen</IonButton>
        </IonModal>
    )
}

export default OtherLocationsModal;
