import {
  geoAlbers,
  geoAlbersUsa,
  geoAzimuthalEqualArea,
  geoAzimuthalEquidistant,
  geoConicConformal,
  geoConicEqualArea,
  geoConicEquidistant,
  geoEqualEarth,
  geoEquirectangular,
  geoGnomonic,
  geoIdentity,
  geoMercator,
  geoNaturalEarth1,
  geoOrthographic,
  geoPath,
  geoStereographic,
  geoTransverseMercator
} from 'd3-geo';

import {
  geoMollweide
} from 'd3-geo-projection';

import {
  registerScale
} from 'vega-scale';

// Created on first use so that importing this module has no side effects.
let defaultPath;

export const projectionProperties = [
  // standard properties in d3-geo
  'clipAngle',
  'clipExtent',
  'scale',
  'translate',
  'center',
  'rotate',
  'parallels',
  'precision',
  'reflectX',
  'reflectY',

  // extended properties in d3-geo-projections
  'coefficient',
  'distance',
  'fraction',
  'lobes',
  'parallel',
  'radius',
  'ratio',
  'spacing',
  'tilt'
];

/**
 * Augment projections with their type and a copy method.
 */
function create(type, constructor) {
  return function projection() {
    const p = constructor();

    p.type = type;

    p.path = geoPath().projection(p);

    p.copy = p.copy || function() {
      const c = projection();
      projectionProperties.forEach(prop => {
        if (p[prop]) c[prop](p[prop]());
      });
      c.path.pointRadius(p.path.pointRadius());
      return c;
    };

    return registerScale(p);
  };
}

export function projection(type, proj) {
  if (!type || typeof type !== 'string') {
    throw new Error('Projection type must be a name string.');
  }
  type = type.toLowerCase();
  if (arguments.length > 1) {
    projections[type] = create(type, proj);
    return this;
  } else {
    if (!projections[type] && Object.hasOwn(builtins, type)) {
      projections[type] = create(type, builtins[type]);
    }
    return projections[type] || null;
  }
}

export function getProjectionPath(proj) {
  return (proj && proj.path) || (defaultPath ||= geoPath());
}

const projections = {};

// Built-in projections, keyed by lowercase type. They're added to the registry the
// first time they're looked up, so that importing this module has no side effects.
const builtins = {
  // base d3-geo projection types
  albers:               geoAlbers,
  albersusa:            geoAlbersUsa,
  azimuthalequalarea:   geoAzimuthalEqualArea,
  azimuthalequidistant: geoAzimuthalEquidistant,
  conicconformal:       geoConicConformal,
  conicequalarea:       geoConicEqualArea,
  conicequidistant:     geoConicEquidistant,
  equalearth:           geoEqualEarth,
  equirectangular:      geoEquirectangular,
  gnomonic:             geoGnomonic,
  identity:             geoIdentity,
  mercator:             geoMercator,
  mollweide:            geoMollweide,
  naturalearth1:        geoNaturalEarth1,
  orthographic:         geoOrthographic,
  stereographic:        geoStereographic,
  transversemercator:   geoTransverseMercator
};
