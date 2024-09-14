import React, { useState,useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css'; // Optional: To include custom styles

mapboxgl.accessToken = 'pk.eyJ1IjoicHJhdGhhbS1jaGF3ZGhyeSIsImEiOiJjbTBma25zODEwOXBpMmpyMWpjYm1yYXN0In0.hzlH2uElEdFFnhzRlH3sIA';

const Map = () => {
  const mapContainerRef = useRef(null);
  const [loading , setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8080/api/auth/get-data/", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       const data = await response.json();
  //       console.log(data);
  
  //       if (response.ok) {
  //         setLoading(true);
  //         console.log("Data received:", data);
  //       } else {
  //         console.error("Failed to fetch data");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []); 

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      projection: 'globe',
      zoom: 1,
      center: [30, 15]
    });

    map.addControl(new mapboxgl.NavigationControl());
    map.scrollZoom.disable();
    
    map.on('style.load', () => {
      map.setFog({});
      map.addSource('places', {
        // This GeoJSON contains features that include an "icon"
        // property. The value of the "icon" property corresponds
        // to an image in the Mapbox Streets style's sprite.
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {
                description:
                  '<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
                icon: 'theatre'
              },
              geometry: {
                type: 'Point',
                coordinates: [-77.038659, 38.931567]
              }
            },
            {
              type: 'Feature',
              properties: {
                description:
                  '<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a <a href="http://madmens5finale.eventbrite.com/" target="_blank" title="Opens in a new window">Mad Men Season Five Finale Watch Party</a>, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>',
                icon: 'theatre'
              },
              geometry: {
                type: 'Point',
                coordinates: [-77.003168, 38.894651]
              }
            },
            {
              type: 'Feature',
              properties: {
                description:
                  '<strong>Big Backyard Beach Bash and Wine Fest</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a <a href="http://tallulaeatbar.ticketleap.com/2012beachblanket/" target="_blank" title="Opens in a new window">Big Backyard Beach Bash and Wine Fest</a> on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.grill hot dogs.</p>',
                icon: 'bar'
              },
              geometry: {
                type: 'Point',
                coordinates: [-77.090372, 38.881189]
              }
            },
            {
              type: 'Feature',
              properties: {
                description:
                  '<strong>Ballston Arts & Crafts Market</strong><p>The <a href="http://ballstonarts-craftsmarket.blogspot.com/" target="_blank" title="Opens in a new window">Ballston Arts & Crafts Market</a> sets up shop next to the Ballston metro this Saturday for the first of five dates this summer. Nearly 35 artists and crafters will be on hand selling their wares. 10:00-4:00 p.m.</p>',
                icon: 'art-gallery'
              },
              geometry: {
                type: 'Point',
                coordinates: [-77.111561, 38.882342]
              }
            },
            {
              type: 'Feature',
              properties: {
                description:
                  '<strong>Seersucker Bike Ride and Social</strong><p>Feeling dandy? Get fancy, grab your bike, and take part in this year\'s <a href="http://dandiesandquaintrelles.com/2012/04/the-seersucker-social-is-set-for-june-9th-save-the-date-and-start-planning-your-look/" target="_blank" title="Opens in a new window">Seersucker Social</a> bike ride from Dandies and Quaintrelles. After the ride enjoy a lawn party at Hillwood with jazz, cocktails, paper hat-making, and more. 11:00-7:00 p.m.</p>',
                icon: 'bicycle'
              },
              geometry: {
                type: 'Point',
                coordinates: [-77.052477, 38.943951]
              }
            },
            {
              type: 'Feature',
              properties: {
                description:
                  '<strong>Capital Pride Parade</strong><p>The annual <a href="http://www.capitalpride.org/parade" target="_blank" title="Opens in a new window">Capital Pride Parade</a> makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>',
                icon: 'rocket'
              },
              geometry: {
                type: 'Point',
                coordinates: [-77.043444, 38.909664]
              }
            },
            {
              type: 'Feature',
              properties: {
                description:
                  '<strong>Muhsinah</strong><p>Jazz-influenced hip hop artist <a href="http://www.muhsinah.com" target="_blank" title="Opens in a new window">Muhsinah</a> plays the <a href="http://www.blackcatdc.com">Black Cat</a> (1811 14th Street NW) tonight with <a href="http://www.exitclov.com" target="_blank" title="Opens in a new window">Exit Clov</a> and <a href="http://godsilla.bandcamp.com" target="_blank" title="Opens in a new window">Gods’illa</a>. 9:00 p.m. $12.</p>',
                icon: 'music'
              },
              geometry: {
                type: 'Point',
                coordinates: [-77.031706, 38.914581]
              }
            },
            {
              type: 'Feature',
              properties: {
                description:
                  '<strong>A Little Night Music</strong><p>The Arlington Players\' production of Stephen Sondheim\'s  <a href="http://www.thearlingtonplayers.org/drupal-6.20/node/4661/show" target="_blank" title="Opens in a new window"><em>A Little Night Music</em></a> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>',
                icon: 'music'
              },
              geometry: {
                type: 'Point',
                coordinates: [-77.020945, 38.878241]
              }
            },
            {
              type: 'Feature',
              properties: {
                description:
                  '<strong>Truckeroo</strong><p><a href="http://www.truckeroodc.com/www/" target="_blank">Truckeroo</a> brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>',
                icon: 'music'
              },
              geometry: {
                type: 'Point',
                coordinates: [-77.007481, 38.876516]
              }
            }
          ]
        }
      });

      map.addLayer({
        id: 'places',
        type: 'symbol',
        source: 'places',
        layout: {
          'icon-image': ['get', 'icon'],
          'icon-allow-overlap': true
        }
      });

      map.on('click', 'places', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map);
      });

      map.on('mouseenter', 'places', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
      });
    });

    const worldViewOnMapLoad = 'IN';

    map.on('load', () => {
        filterLayers(worldViewOnMapLoad);
    });

    function filterLayers(worldview) {
        map.setFilter('admin-0-boundary-disputed', [
            'all',
            ['==', ['get', 'disputed'], 'true'],
            ['==', ['get', 'admin_level'], 0],
            ['==', ['get', 'maritime'], 'false'],
            ['match', ['get', 'worldview'], ['all', worldview], true, false]
        ]);
        map.setFilter('admin-0-boundary', [
            'all',
            ['==', ['get', 'admin_level'], 0],
            ['==', ['get', 'disputed'], 'false'],
            ['==', ['get', 'maritime'], 'false'],
            ['match', ['get', 'worldview'], ['all', worldview], true, false]
        ]);
        map.setFilter('admin-0-boundary-bg', [
            'all',
            ['==', ['get', 'admin_level'], 0],
            ['==', ['get', 'maritime'], 'false'],
            ['match', ['get', 'worldview'], ['all', worldview], true, false]
        ]);
    }


    // mapboxgl.addClaimedBoundaries(map, 'IN');

    let userInteracting = false;
    const spinEnabled = true;

    const spinGlobe = () => {
      const zoom = map.getZoom();
      if (spinEnabled && !userInteracting && zoom < 5) {
        let distancePerSecond = 360 / 240;
        if (zoom > 3) {
          const zoomDif = (5 - zoom) / (5 - 3);
          distancePerSecond *= zoomDif;
        }
        const center = map.getCenter();
        center.lng -= distancePerSecond;
        map.easeTo({ center, duration: 1000, easing: (n) => n });
      }
    };

    map.on('mousedown', () => {
      userInteracting = true;
    });

    map.on('dragstart', () => {
      userInteracting = true;
    });

    map.on('moveend', () => {
      spinGlobe();
    });

    spinGlobe();

    document.getElementById("switch").onclick = function() {
      mapboxgl.addClaimedBoundaries(map, 'IN'); // Replace with your function
    };

    return () => map.remove(); // Clean up on unmount
  }, []);

  return ( 
    loading ? (
      <>
        <button id="switch" className="button">Add claimed boundaries of India</button>
        <div ref={mapContainerRef} className="map-container" />
      </>
    ) : null
  );
};

export default Map;
