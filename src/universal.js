import 'core-js/features/promise';
import { polyfills } from '@athoscommerce/snap-preact';

const promises = [];
if (!('fetch' in window)) {
	// @ts-ignore - types not important
	promises.push(import('whatwg-fetch'));
}
if (!('Symbol' in window) || !('flatMap' in Array.prototype) || !('includes' in Array.prototype)) {
	// @ts-ignore - types not important
	promises.push(import('core-js/stable'));
}
promises.push(polyfills);
Promise.all(promises).then(() => {
	window.athos = window.athos || {};
	window.athos.build = 'universal';
	import('./index');
});
