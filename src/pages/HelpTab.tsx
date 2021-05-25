import React from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonRow, IonCol, IonImg, IonButton, IonIcon, IonList, IonItem, IonLabel, IonCard, IonCardContent } from '@ionic/react';
import moment from 'moment';
import './HelpTab.css';
import { mailOutline, logoWebComponent, mailSharp, logoWhatsapp, callOutline, walletOutline } from 'ionicons/icons';

const HelpTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonRow>
            <IonCol class="appTitle">Covid-19 Tracker</IonCol>
            <IonCol class="appDate">{moment().format('Do MMMM YYYY')}</IonCol>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRow>
          <IonCol class="pageTitle">Help & Feedback</IonCol>
        </IonRow>
        <IonCard>
          <IonList>
            <IonItem>
              <IonLabel>Call WHO helpline Number</IonLabel>
              <IonButton color='warning' href="tel:+41-22-7912111"><IonIcon slot="start" icon={callOutline} /> Call</IonButton>
            </IonItem>
            <IonItem>
              <IonLabel>Email WHO Team</IonLabel>
              <IonButton color='warning' href="mailto:mediainquiries@who.int"><IonIcon slot="start" icon={mailOutline} /> Email</IonButton>
            </IonItem>
            <IonItem>
              <IonLabel>Text 'Hi' to WHO helpdesk</IonLabel>
              <IonButton color='warning' href="https://api.whatsapp.com/send?phone=41798931892&text=hi&source=&data="><IonIcon slot="start" icon={logoWhatsapp} /> WhatsApp</IonButton>
            </IonItem>
            <IonItem>
              <IonLabel>Donate via WHO website to help overcome the crisis</IonLabel>
              <IonButton color='warning' href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/donate"><IonIcon slot="start" icon={walletOutline} /> Donate</IonButton>
            </IonItem>
          </IonList>
        </IonCard>
        <IonRow>
          <IonCol class="pageTitle">Mission and Purpose</IonCol>
        </IonRow>
        <IonCard>
          <IonCardContent class="messageContent">
            Covid-19 Tracker is a Progressive Web App (PWA) for getting latest statistics related to Covid-19.<br />
            This app is dedicated to all the Doctors, Health workers, Policemen and all Frontline Workers around the Globe who are helping us against this Global pandemic.<br/>
            This app is using COVID-19 dataset provided by the John Hopkins University.
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonList>
            <IonItem>
              <IonLabel>Email to Developer</IonLabel>
              <IonButton color="tertiary" href="mailto:rishabvh1024@gmail.com"><IonIcon slot="start" icon={mailSharp} /> Write Feedback</IonButton>
            </IonItem>
          </IonList>
        </IonCard>
        <IonCard>
          <IonList>
            <IonItem>
              <IonLabel>Contact me via</IonLabel>
              <IonButton color="tertiary" href="https://www.linkedin.com/in/rishav-kumar-abbb63143/">LinkedIn</IonButton><IonButton color="tertiary" href="https://github.com/RisHaV-IITKGP">GitHub</IonButton>
            </IonItem>
          </IonList>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default HelpTab;
