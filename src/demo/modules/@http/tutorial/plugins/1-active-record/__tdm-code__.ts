import { CodeExtractionInstructions } from '@webpack-ext/tdm-code-sample';

module.exports = [
  {
    file: './README.md',
    autoRender: true,
    title: 'active-record',
    section: 'PART-1'
  },
  {
    file: './README.md',
    autoRender: true,
    title: 'active-record',
    section: 'PART-2'
  },
  {
    file: './active-record.component.ts',
    autoRender: true,
    section: 'code',
    reformat: true
  }
] as CodeExtractionInstructions[];
