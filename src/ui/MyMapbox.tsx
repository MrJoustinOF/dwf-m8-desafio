import React, { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FormInput } from "./FormInput";
import { Button } from "./Button";

type MyMapboxProps = {
  geoloc: any;
  setGeoloc: (any: any) => any;
  refPlace: string;
  setRefPlace: (any: any) => any;
};

export const MyMapbox = ({
  geoloc,
  setGeoloc,
  refPlace,
  setRefPlace,
}: MyMapboxProps) => {
  const mapContainer: any = useRef(null);
  const map: any = useRef(null);
  const [markers, setMarkers]: any = useState([]);

  const MAPBOX_TOKEN =
    "pk.eyJ1Ijoib3J0aXpqb3VzdGluIiwiYSI6ImNreDNhbWE1cTF3aXkyb25zb3NncHdnZ3MifQ.GRRQMHHg8AFdMsXelqgLsA";

  mapboxgl.accessToken = MAPBOX_TOKEN;

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0.0, 0.0],
      zoom: 3,
    });
  });

  const handleSearch = async () => {
    if (refPlace.length !== 0) {
      const res = await (
        await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${refPlace}.json?access_token=${MAPBOX_TOKEN}`
        )
      ).json();

      const [feature] = res.features;

      map.current.setCenter(feature.center);
      map.current.setZoom(14);

      markers.map((marker: any) => marker.remove());

      const marker = new mapboxgl.Marker({ color: "#222", draggable: true })
        .setLngLat(feature.center)
        .addTo(map.current);

      marker.on("dragend", () => {
        const data = marker.getLngLat();
        const { lng, lat } = data;

        setGeoloc({ lat, lng });
      });

      const [lat, lng] = feature.center;
      setGeoloc({ lat, lng });

      setMarkers([marker]);
    }
  };

  return (
    <div>
      <div ref={mapContainer} className="h-60 my-8" />

      <div className="mb-8">
        <FormInput
          label="Ubicacion"
          name="refPlace"
          type="text"
          value={refPlace}
          onChange={setRefPlace}
        />

        <p className="text-justify w-60 md:w-96">
          Buscá un punto de referencia para reportar a tu mascota. Puede ser una
          dirección, un barrio o una ciudad.
        </p>

        <Button text="Buscar ubicacion" color="green" onClick={handleSearch} />
      </div>
    </div>
  );
};
