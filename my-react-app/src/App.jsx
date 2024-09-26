import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css"; // Optional: To include custom styles

mapboxgl.accessToken =
  "pk.eyJ1IjoicHJhdGhhbS1jaGF3ZGhyeSIsImEiOiJjbTBma25zODEwOXBpMmpyMWpjYm1yYXN0In0.hzlH2uElEdFFnhzRlH3sIA";

const Map = () => {
  const mapContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState(30.316);
  const [longitude, setLongitude] = useState(78.032);
  const [glofsTemplate, setGlofsTemplate] = useState([
    {
      type: "Feature",
      properties: {
        description:
          '<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
        icon: "theatre",
      },
      geometry: {
        type: "Point",
        coordinates: [-77.038659, 38.931567],
      },
    },
  ]);

  const [glofs, setGlofs] = useState({
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            description:
              '<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
            icon: "theatre",
          },
          geometry: {
            type: "Point",
            coordinates: [-77.038659, 38.931567],
          },
        },
      ],
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/get-data/", {
          method: "POST",
          headers: {
            "Content-Type": "Avalication/json",
          },
        });
        const data = await response.json();
        console.log(data);

        data.data.forEach((feature) => {
          let object = {
            type: "Feature",
            properties: {
              description: `
<div style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px;">
  <div>
      <h2 style = "margin-block-start: 10px; margin-block-end: 10px; font-size: 2.5em">
      ${
        feature.latitude < 0
          ? feature.latitude * -1 + "°S"
          : feature.latitude + "°N"
      }, ${
                feature.longitude < 0
                  ? feature.longitude * -1 + "°W"
                  : feature.longitude + "°E"
              }
      </h2>
  </div>
  <div style="display: flex; flex-direction: row; gap: 10px; margin-top: 5px; justify-content: center;">
    <div style="width : 45%; display: flex; flex-direction: column; gap: 2px;">
      <div style="display: flex; justify-content: space-between;">
        <div style="font-weight: bold;">Mean Elevation:</div>
        <div>${feature.meanelevation || "Not Ava."}</div>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <div style="font-weight: bold;">Max Elevation:</div>
        <div>${feature.maxelevation || "Not Ava."}</div>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <div style="font-weight: bold;">Min Elevation:</div>
        <div>${feature.minelevation || "Not Ava."}</div>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <div style="font-weight: bold;">Total Area:</div>
        <div>${feature.totalarea || "Not Ava."}</div>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <div style="font-weight: bold;">Mean Width:</div>
        <div>${feature.meanwidth || "Not Ava."}</div>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <div style="font-weight: bold;">Mean Length:</div>
        <div>${feature.meanlength || "Not Ava."}</div>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <div style="font-weight: bold;">Mean Depth:</div>
        <div>${feature.meandepth || "Not Ava."}</div>
      </div>
    </div>
    <div class="verticalLine">
    </div>
    <div style="width : 45%; display: flex; flex-direction: column; gap: 2px;">
      <div style="display: flex; justify-content: space-between;">
        <div style="font-weight: bold;">Period Activity Start:</div>
        <div>${feature.period_activity_start || "Not Ava."}</div>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <div style="font-weight: bold;">Period Activity End:</div>
        <div>${feature.period_activity_end || "Not Ava."}</div>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <div style="font-weight: bold;">Number of Basins:</div>
        <div>${feature.num_basins || "Not Ava."}</div>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <div style="font-weight: bold;">Area in State:</div>
        <div>${feature.area_in_state || "Not Ava."}</div>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <div style="font-weight: bold;">Area Expansion:</div>
        <div>${feature.area_exp || "Not Ava."}</div>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <div style="font-weight: bold;">Source Nourish:</div>
        <div>${feature.source_nourish || "Not Ava."}</div>
      </div>
    </div>
  </div>
</div>
`,
              icon: "theatre",
            },
            geometry: {
              type: "Point",
              coordinates: [feature.longitude, feature.latitude],
            },
          };

          glofsTemplate.push(object);
        });

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
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        projection: "globe",
        zoom: 5,
        center: [82.0370411322665, 31.680213863049943],
      });

      map.addControl(new mapboxgl.NavigationControl());
      map.scrollZoom.disable();

      map.on("style.load", () => {
        map.setFog({});
        map.addSource("places", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: glofsTemplate,
          },
        });

        map.addLayer({
          id: "places",
          type: "symbol",
          source: "places",
          layout: {
            "icon-image": ["get", "icon"],
            "icon-allow-overlap": true,
          },
        });

        map.on("click", "places", (e) => {
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

        map.on("mouseenter", "places", () => {
          map.getCanvas().style.cursor = "pointer";
        });

        map.on("mouseleave", "places", () => {
          map.getCanvas().style.cursor = "pointer";
        });

        map.on("hover", "places", (e) => {
          map.getCanvas().style.cursor = "pointer";
        });
      });

      const worldViewOnMapLoad = "IN";

      map.on("load", () => {
        filterLayers(worldViewOnMapLoad);
      });

      function filterLayers(worldview) {
        map.setFilter("admin-0-boundary-disputed", [
          "all",
          ["==", ["get", "disputed"], "true"],
          ["==", ["get", "admin_level"], 0],
          ["==", ["get", "maritime"], "false"],
          ["match", ["get", "worldview"], ["all", worldview], true, false],
        ]);
        map.setFilter("admin-0-boundary", [
          "all",
          ["==", ["get", "admin_level"], 0],
          ["==", ["get", "disputed"], "false"],
          ["==", ["get", "maritime"], "false"],
          ["match", ["get", "worldview"], ["all", worldview], true, false],
        ]);
        map.setFilter("admin-0-boundary-bg", [
          "all",
          ["==", ["get", "admin_level"], 0],
          ["==", ["get", "maritime"], "false"],
          ["match", ["get", "worldview"], ["all", worldview], true, false],
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

      map.on("mousedown", () => {
        userInteracting = true;
      });

      map.on("dragstart", () => {
        userInteracting = true;
      });

      map.on("moveend", () => {
        spinGlobe();
      });

      map.on("click", function (e) {
        setLatitude(e.lngLat.lat);
        setLongitude(e.lngLat.lng);
        console.log(e.lngLat.lng, e.lngLat.lat);

        setGlofs({
          ...glofs,
          data: {
            ...glofs.data,
            features: [
              ...glofs.data.features,
              {
                type: "Feature",
                properties: {
                  description: "<strong>New Point</strong>",
                  icon: "theatre",
                },
                geometry: {
                  type: "Point",
                  coordinates: [e.lngLat.lng, e.lngLat.lat],
                },
              },
            ],
          },
        });
      });

      spinGlobe();

      document.getElementById("switch").onclick = function () {
        mapboxgl.addClaimedBoundaries(map, "IN"); // Replace with your function
      };

      return () => map.remove(); // Clean up on unmount
    }
  }, [loading]);

  return loading ? (
    <>
      <button id="switch" className="button">
        Add claimed boundaries of India
      </button>
      <div ref={mapContainerRef} className="map-container" />
    </>
  ) : null;
};

export default Map;
