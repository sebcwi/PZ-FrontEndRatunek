import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import React,{useEffect, useState} from 'react';
import { getApi } from '../apiTools/apiTools';


const containerStyle = {
    width: '100vw',
    height: '100vh'
  };
  
  const center = {
    lat: -51.21006,
    lng: 16.1619
  };

const MapPage = () =>{

    const [lodziarnie,setLodziarnie] = useState('')
    const [error,setError] = useState('')

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
    
    //   console.log(lodziarnie)

      return isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
              {lodziarnie.data && lodziarnie.data.map((lodziarnia,key)=>{
                  console.log(lodziarnia)
                  return <Marker key={key} position={{lat:lodziarnia.lat, lng: lodziarnia.lon}}/>
              })}
          </GoogleMap>
      ) : <></>
}

export default MapPage