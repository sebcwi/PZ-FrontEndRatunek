import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import React,{useEffect, useState} from 'react';
import { getApi } from '../apiTools/apiTools';
import { useHistory } from 'react-router-dom'



const containerStyle = {
    width: '100vw',
    height: '100vh',
    padding: '0px',
    margin: '0px'
  };
  
  const center = {
    lat: 51.207007,
    lng: 16.155323
  };

const MapPage = () =>{

    const [lodziarnie,setLodziarnie] = useState('')
    const [error,setError] = useState('')
    let history = useHistory()

    useEffect(()=>{
        getApi('/lodziarnia/all',setLodziarnie,setError)
    },[setLodziarnie])

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyC07-IeUM0Hwq5d3Qlzp5v-ygzKb5RQMS4"
      })
    
      const [map, setMap] = useState(null)
    
      const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
      }, [])
    
      const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
      }, [])

      return isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
              {lodziarnie.data && lodziarnie.data.map((lodziarnia,key)=>{
                  return <Marker key={key} position={{lat:lodziarnia.lat, lng: lodziarnia.lon}} onClick={()=>{
                    history.push('/lodziarnia?address='+lodziarnia.adress)
                  }}/>
              })}
          </GoogleMap>
      ) : <></>
}

export default MapPage