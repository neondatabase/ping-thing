import React, { useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';

import Globe from 'react-globe.gl';
import * as THREE from 'three';

import { theme } from '../utils/theme';
import usePrefersReducedMotion from '../hooks/use-prefers-reduced-motion';

import goeJson from './ne_110m_admin_0_countries.geojson.json';

const ThreeGlobe = memo(({ isPlaying, data }) => {
  const globeEl = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();

  const globeReady = () => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = isPlaying;
      globeEl.current.controls().enableZoom = false;

      globeEl.current.pointOfView({
        lat: 19.054339351561637,
        lng: -50.421161072148465,
        altitude: 2,
      });
    }
  };

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = isPlaying;
    }
  }, [isPlaying]);

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = !prefersReducedMotion;
    }
  }, [prefersReducedMotion]);

  return (
    <div className='scale-[0.6] md:scale-[0.8] xl:scale-100 pointer-events-none sm:pointer-events-auto sm:cursor-move'>
      <Globe
        ref={globeEl}
        onGlobeReady={globeReady}
        pointsData={data.points}
        rendererConfig={{ antialias: true, alpha: true }}
        animateIn={true}
        width={730}
        height={730}
        backgroundColor={'rgba(255, 255, 255, 0)'}
        showGraticules={true}
        globeMaterial={
          new THREE.MeshPhongMaterial({
            color: theme.colors.brand.globe,
            opacity: 0.8,
            transparent: true,
          })
        }
        atmosphereColor={theme.colors.brand.atmosphere}
        hexPolygonsData={goeJson.features}
        hexPolygonResolution={3}
        hexPolygonMargin={0.4}
        hexPolygonColor={(geometry) => {
          return ['#313131', '#1e1e1e', '#4d4d4d', '#373737'][
            geometry.properties.abbrev_len % 4
          ];
        }}
        customLayerData={[...Array(500).keys()].map(() => ({
          lat: (Math.random() - 0.5) * 180,
          lng: (Math.random() - 0.5) * 360,
          alt: Math.random() * 1.4 + 0.1,
        }))}
        customThreeObject={() =>
          new THREE.Mesh(
            new THREE.SphereGeometry(0.3),
            new THREE.MeshBasicMaterial({
              color: '#797979',
              opacity: 0.6,
              transparent: true,
            })
          )
        }
        customThreeObjectUpdate={(obj, d) => {
          Object.assign(
            obj.position,
            globeEl.current?.getCoords(d.lat, d.lng, d.alt)
          );
        }}
        pointColor='color'
        pointAltitude='altitude'
        pointRadius='radius'
        // pointsMerge={true} // this breaks the html markers when they re-render: https://github.com/vasturiano/react-globe.gl/issues/140
        arcsData={data.arcs}
        arcColor='color'
        arcStroke='stroke'
        arcDashGap={0.05}
        arcDashLength='dash'
        arcAltitudeAutoScale={0.3}
        arcDashAnimateTime={2000}
        ringsData={data.rings}
        ringColor={(ring) => (t) => {
          return `rgba(${ring.color}, ${Math.sqrt(1 - t)})`;
        }}
        ringMaxRadius='maxR'
        ringPropagationSpeed='propagationSpeed'
        ringRepeatPeriod='repeatPeriod'
        ringResolution={64}
        htmlElementsData={data.points}
        htmlAltitude={0.1}
        htmlElement={(d) => {
          const el = document.createElement('div');
          el.innerHTML = `
            <div class='bg-brand-background/60 rounded border-2 border-brand-border -mt-10 px-2 py-1 z-0'>
            <div class='flex gap-2 items-start'>
            <div class='w-3 h-3 rounded-full mt-0.5' style="background:${
              d.color
            }"></div>
            <div class='flex flex-col'>
            <strong class='capitalize text-xs'>${d.stop}</strong>
            <small class='flex gap-1 text-xs'>${d.region || d.city}</small>
            </div>
            </div>
            </div>
            `;
          return el;
        }}
      />
    </div>
  );
});

ThreeGlobe.propTypes = {
  /** Status of animation */
  isPlaying: PropTypes.bool.isRequired,
  /** The locations of points and arcs */
  data: PropTypes.any.isRequired,
};

export default ThreeGlobe;
