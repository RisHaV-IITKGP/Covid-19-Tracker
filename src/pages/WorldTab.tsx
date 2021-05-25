import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonImg, IonRow, IonCol, IonLoading, IonCard, IonSlides, IonSlide, IonGrid } from '@ionic/react';
import moment from 'moment';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import './WorldTab.css';

interface IGLobalCount {
  count: number;
  date: string;
  result: ICaseCount;
}

interface ICaseCount {
  confirmed: number;
  recovered: number;
  deaths: number;
}

const slideOpts = {
  initialSlide: 1,
  speed: 30,
  slideShadows: true,
  loop: true,
  autoplay: true
};


export function CalculateActiveCases(props: any) {
  return <React.Fragment>{(props.a - (props.b + props.c)).toLocaleString()}</React.Fragment>;
}

const WorldTab: React.FC = () => {

  const [data, setData] = useState<IGLobalCount>();
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    const getGlobalData = async () => {
      //latest global count
      const result = await axios('https://covidapi.info/api/v1/global');
      // console.log(result);
      setData(result.data);
      setShowLoading(false);
    };
    getGlobalData();
  }, []);

  const confirmed = data?.result?.confirmed;
  const recovered = data?.result?.recovered;
  const deaths = data?.result?.deaths;

  const GlobalCasesPieChart = {
    labels: ['Confirmed', 'Recovered', 'Deaths'],
    datasets: [
      {
        label: 'Covid-19',
        backgroundColor: [
          '#4399F6',
          '#37EA61',
          '#F34943'
        ],
        hoverBackgroundColor: [
          '#007bff',
          '#127729',
          '#ff073a'
        ],
        data: [confirmed, recovered, deaths]
      }
    ]
  }


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
        <IonLoading isOpen={showLoading} onDidDismiss={() => setShowLoading(false)} message={'Fetching total cases...'} />
        <IonRow>
          <IonCol class="pageTitle">Current Global Statistics</IonCol>
        </IonRow>
        <IonRow class="casesBox">
          <IonCol class="totalCases"> Confirmed {confirmed?.toLocaleString()}</IonCol>
          <IonCol class="confirmedBox">Active <CalculateActiveCases a={confirmed} b={recovered} c={deaths} /></IonCol>
          <IonCol class="recoveredBox">Recovered {recovered?.toLocaleString()}</IonCol>
          <IonCol class="deathsBox">Deaths {deaths?.toLocaleString()}</IonCol>
        </IonRow>

        <IonCard class="pieCard">
          <Pie data={GlobalCasesPieChart}
            options={{
              legend: {
                display: true,
                position: 'bottom',
              },
              plugins: {
                datalabels: {
                  anchor: 'end',
                  clamp: 'true',
                  align: 'bottom',
                  color: 'black',
                  labels: {
                    title: {
                      font: {
                        weight: 'bold'
                      }
                    }
                  }
                }
              }
            }} />
        </IonCard>
        <IonSlides class="tipsSlides" options={slideOpts}>
            <IonSlide class="slide">
                Maintain Social distancing of atleast 1 meter (3 feet).
            </IonSlide>
            <IonSlide class="slide">
                Wash your hands regularly with alcohol based hand sanitizers.
            </IonSlide>
            <IonSlide class="slide">
                Don't forget to wear a Mask while going out.
            </IonSlide>
            <IonSlide class="slide">
                #StayHomeStaySafe
            </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default WorldTab;