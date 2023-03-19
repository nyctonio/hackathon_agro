'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// @ts-ignore
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  'pk.eyJ1Ijoicml0ZXNoa3IiLCJhIjoiY2tzYWN0czB5M3JhZzJxbXN3cnhwZG05MyJ9.GoYXZc7nSySWsMCvLyO71w';

function Page() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    });
    const draw = new mapboxgl.MapboxDraw({
      displayControlsDefault: false,
      // Select which mapbox-gl-draw control buttons to add to the map.
      controls: {
        polygon: true,
        trash: true,
      },
      // Set mapbox-gl-draw to draw by default.
      // The user does not have to click the polygon control button first.
      defaultMode: 'draw_polygon',
    });
    map.current.addControl(draw);
  });
  return (
    <div className="flex flex-col py-20 h-screen w-screen justify-between text-2xl items-center">
      <div ref={mapContainer} className="map-container" />
      HomePage
    </div>
  );
}

export default Page;
