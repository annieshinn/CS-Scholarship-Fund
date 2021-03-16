import React, { Component } from "react";
import { 
  Map, 
  TileLayer, 
  CircleMarker, 
  Popup 
} from "react-leaflet";
import {
  attribution,
  tileUrl,
  myLocation,
} from './utils/Utils';
import { DemoMapTooltip, CityMapTooltip } from "./DemoMapTooltip";


export default class DemoMap extends Component {
  constructor() {
    super();
    // this.state = myLocation;
    this.state = {
      cities: [],
    };
  }
  
  componentDidMount() {
    fetch('/location')
      .then(res => res.json())
      .then(res => {
        this.setState({cities: res.locations});
      })
      .catch(err => console.log('Error fetching locations >>>', err));
  }

  render() {
    const cityMarkers = [];
    this.state.cities.forEach((city, idx) => cityMarkers.push(
      <CircleMarker 
          key={`city-${city._id}`}
          color='black'
          radius={15}
          weight={city.donationscount}
          onClick={() => { 
            this.setState({...this.state, activeCity: city })
          }}
          center={[city.lat, city.long]}
          >
    </CircleMarker>
    ));

    return this.state.cities ? (
      <div id='mapContainer'>
        <Map
          center={[myLocation.lat, myLocation.lng]}
          zoom={myLocation.zoom}
          updateWhenZooming={false}
          updateWhenIdle={true}
          preferCanvas={true}
          minZoom={myLocation.minZoom}
        >
        <TileLayer
            attribution={attribution}
            url={tileUrl}
        />
        {cityMarkers}

        {this.state.activeCity && <Popup
          position={[this.state.activeCity.lat,this.state.activeCity.long] }
          onClose={() => {
              this.setState({...this.state, activeCity: null })
          }}
        >
          <CityMapTooltip
            city={this.state.activeCity}
          />
        </Popup>}
      </Map>
    </div>
  ) : (
      "Data is loading..."
  );
  }
}


// export default class DemoMap extends Component {
//     state = defaultMapState;

//     render() {
//       console.log('Demo Map state', this.state)
//         return this.props.mountains ? (
//         <Map
//             center={[this.state.lat, this.state.lng]}
//             zoom={this.state.zoom}
//             style={{ width: "100%", position: "absolute", top: 0, bottom: 0, zIndex: 500, }}
//             updateWhenZooming={false}
//             updateWhenIdle={true}
//             preferCanvas={true}
//             minZoom={this.state.minZoom}
//         >
//             <TileLayer
//                 attribution={attribution}
//                 url={tileUrl}
//             />
//             {this.props.mountains.map((mountain, idx) => 
//                 <CircleMarker 
//                     key={`mountain-${mountain.id}`}
//                     color='black'
//                     radius={15}
//                     weight={2}
//                     onClick={() => { 
//                         this.setState({ activeMountain: mountain });
//                     }}
//                     center={mountain.point}>
//                 </CircleMarker>
//             )}
//             {this.state.activeMountain && <Popup
//                 position={this.state.activeMountain.point}
//                 onClose={() => {
//                     this.setState({ activeMountain: null })
//                 }}
//             >
//                 <DemoMapTooltip
//                     mountain={this.state.activeMountain}
//                 />
//             </Popup>}
//         </Map>
//         ) : (
//             "Data is loading..."
//         );
//     }
// }