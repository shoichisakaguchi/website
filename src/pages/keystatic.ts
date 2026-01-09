import { makePage } from '@keystatic/astro';
import keystaticConfig from '../../keystatic.config';

export const prerender = false;

export default makePage(keystaticConfig);
