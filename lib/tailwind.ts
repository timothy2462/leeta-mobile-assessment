import { create } from 'twrnc';
const config = require('../tailwind.config.js');
const tw = create(config?.default || config);
export default tw;
