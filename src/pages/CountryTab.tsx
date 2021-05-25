import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonRow, IonCol, IonImg, IonLoading, IonCard, IonSelect, IonSelectOption } from '@ionic/react';
import moment from 'moment';
import axios from 'axios';
import { Doughnut, Bar } from 'react-chartjs-2';
import './CountryTab.css';
import { CalculateActiveCases } from './WorldTab';
import 'chartjs-plugin-datalabels';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

interface ICountryCount {
  count: number;
  result: {
    todaysDate: {
      [caseName: string]: ICases
    };
  };
}

interface ICases {
  confirmed: number;
  deaths: number;
  recovered: number;
}

const CountryTab: React.FC = () => {
  
  const [yourCountry, setYourCountry] = useState<string>('IND');
  Storage.set({ key: 'yourCountry', value: yourCountry });
  const [countryData, setcountryData] = useState<ICountryCount>();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const getCountryData = async () => {
      let result: any = '';
      const { value } = await Storage.get({ key: 'yourCountry' });
      if (value) {
        result = await axios('https://covidapi.info/api/v1/country/' + value + '/latest');
      } else {
        result = await axios('https://covidapi.info/api/v1/country/' + yourCountry + '/latest');
      }
      // console.log(result);
      setcountryData(result.data.result);
      setShowLoading(false);
    };

    getCountryData();
  }, [yourCountry]);

  let confirmed, recovered, deaths: number = 0;
  if (countryData) {
    confirmed = Object.values(countryData)[0]?.confirmed;
    recovered = Object.values(countryData)[0]?.recovered;
    deaths = Object.values(countryData)[0]?.deaths;
  }

  const CountryDoughnutChart = {
    labels: ['Confirmed', 'Recovered', 'Deaths'],
    datasets: [
      {
        labels: {
          render: 'value'
        },
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

  const customPopoverOptions = {
    header: 'Select your country',
    translucent: false
  };

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
        <IonLoading isOpen={showLoading} onDidDismiss={() => setShowLoading(false)} message={'Fetching latest count for your country...'} />
        <IonRow>
          <IonCol size="5" class="countryTitle"> COVID-19 Cases in</IonCol>
          <IonCol size="5" class="selectTitle">
            <IonSelect interfaceOptions={customPopoverOptions} interface="popover" value={yourCountry}
              onIonChange={(e) => { setYourCountry(e.detail.value); }}>
              <IonSelectOption value="IND">India</IonSelectOption>
              <IonSelectOption value="ARE">UAE</IonSelectOption>
              <IonSelectOption value="FRA">France</IonSelectOption>
              <IonSelectOption value="ESP">Spain</IonSelectOption>
              <IonSelectOption value="ITA">Italy</IonSelectOption>
              <IonSelectOption value="DEU">Germany</IonSelectOption>
              <IonSelectOption value="CHN">China</IonSelectOption>
              <IonSelectOption value="JPN">Japan</IonSelectOption>
              <IonSelectOption value="ZAF">South Africa</IonSelectOption>
              <IonSelectOption value="KOR">South Korea</IonSelectOption>
              <IonSelectOption value="CAN">Canada</IonSelectOption>
              <IonSelectOption value="BRA">Brazil</IonSelectOption>
              <IonSelectOption value="ARG">Argentina</IonSelectOption>
              <IonSelectOption value="PAK">Pakistan</IonSelectOption>
              <IonSelectOption value="CHE">Switzerland</IonSelectOption>
              <IonSelectOption value="IRN">Iran</IonSelectOption>
              <IonSelectOption value="GBR">United Kingdom</IonSelectOption>
              <IonSelectOption value="TUR">Turkey</IonSelectOption>
              <IonSelectOption value="NLD">Netherland</IonSelectOption>
              <IonSelectOption value="RUS">Russia</IonSelectOption>
              <IonSelectOption value="PRT">Portugal</IonSelectOption>
              <IonSelectOption value="ISR">Israel</IonSelectOption>
              <IonSelectOption value="SWE">Sweden</IonSelectOption>
              <IonSelectOption value="AUS">Australia</IonSelectOption>
              <IonSelectOption value="AUT">Austria</IonSelectOption>
              <IonSelectOption value="NZL">New Zealand</IonSelectOption>
              <IonSelectOption value="SGP">Singapore</IonSelectOption>
              <IonSelectOption value="MYS">Malaysia</IonSelectOption>
            </IonSelect>
          </IonCol>
          <IonCol size="2" class="changeButton">Change Country</IonCol>
        </IonRow>
        <IonRow class="casesBox">
          <IonCol class="totalCases">Confirmed {confirmed?.toLocaleString()}</IonCol>
          <IonCol class="confirmedBox">Active <CalculateActiveCases a={confirmed} b={recovered} c={deaths} /></IonCol>
          <IonCol class="recoveredBox">Recovered {recovered?.toLocaleString()}</IonCol>
          <IonCol class="deathsBox">Deaths {deaths?.toLocaleString()}</IonCol>
        </IonRow>
        <IonCard class="doughnutChart">
          <Doughnut
            data={CountryDoughnutChart}
            options={{
              legend: {
                display: true,
                position: 'right'
              },
              plugins: {
                datalabels: {
                  anchor: 'bottom',
                  clamp: 'true',
                  align: 'end',
                  color: 'black',
                  labels: {
                    title: {
                      font: {
                        weight: 'bold',
                        size: 10
                      }
                    }
                  }
                }
              }
            }} />
        </IonCard>
      </IonContent>
    </IonPage>
  )
};

export default CountryTab;