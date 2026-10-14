// The Vega API without any transforms registered. Specs refer to transforms by
// name, so the main `vega` entry point registers all of them, which keeps bundlers
// from dropping the ones an app doesn't use. Apps that want a smaller bundle can
// import from `vega/base` instead and register only the transforms their specs use:
//
//   import {transforms} from 'vega/base';
//   import {aggregate, collect, filter} from 'vega-transforms';
//   Object.assign(transforms, {aggregate, collect, filter});

// -- Exports -----

import * as pkg from './package.json' with { type: 'json' };
export const version = pkg.version;

export * from 'vega-statistics';

export * from 'vega-time';

export * from 'vega-util';

export * from 'vega-loader';

export * from 'vega-scenegraph';

export {
  Dataflow,
  EventStream,
  Parameters,
  Pulse,
  MultiPulse,
  Operator,
  Transform,
  changeset,
  ingest,
  isTuple,
  definition,
  transform,
  transforms,
  tupleid
} from 'vega-dataflow';

export {
  scale,
  scheme,
  interpolate,
  interpolateColors,
  interpolateRange,
  quantizeInterpolator
} from 'vega-scale';

export {
  projection
} from 'vega-projection';

export {
  View
} from 'vega-view';

export {
  numberFormatDefaultLocale as formatLocale,
  timeFormatDefaultLocale as timeFormatLocale,
  locale,
  defaultLocale,
  resetDefaultLocale
} from 'vega-format';

export {
  expressionFunction
} from 'vega-functions';

export {
  parse
} from 'vega-parser';

export {
  context as runtimeContext
} from 'vega-runtime';

export {
  codegenExpression,
  parseExpression
} from 'vega-expression';

export {
  parseSelector
} from 'vega-event-selector';
