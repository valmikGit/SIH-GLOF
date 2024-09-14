import React, { useState,useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css'; // Optional: To include custom styles

mapboxgl.accessToken = 'pk.eyJ1IjoicHJhdGhhbS1jaGF3ZGhyeSIsImEiOiJjbTBma25zODEwOXBpMmpyMWpjYm1yYXN0In0.hzlH2uElEdFFnhzRlH3sIA';

const Map = () => {
  const mapContainerRef = useRef(null);
  const [loading , setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/auth/get-data/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
  
        if (response.ok) {
          setLoading(true);
          console.log("Data received:", data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []); 

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      projection: 'globe',
      zoom: 1,
      center: [30, 15]
    });

    map.addControl(new mapboxgl.NavigationControl());
    map.scrollZoom.disable();
    
    map.on('style.load', () => {
      map.setFog({});
      // addClaimedBoundaries(map, 'IN'); // Adding the claimed boundaries layer
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
  }, [loading]);

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
