import { create } from 'twrnc';

/**
 * twrnc instance using the Leeta design system config.
 * Import `tw` wherever you need Tailwind styles in React Native.
 *
 * Usage:
 *   import tw from '@/lib/tailwind';
 *   <View style={tw`flex-1 bg-neutral-100`} />
 */
const tw = create(require('../tailwind.config.js'));

export default tw;
