import config from '../../rollup.config.js';

// Besides the shared outputs, build `vega/base`, which exports the Vega API without
// registering any transforms.
export default function(commandLineArgs) {
  const outputs = config(commandLineArgs);
  const [esm] = outputs;
  return [
    ...outputs,
    {
      ...esm,
      input: './base.js',
      output: {...esm.output, file: './build/vega-base.module.js'}
    }
  ];
}
