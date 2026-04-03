/* athos imports */
import { Snap } from '@athoscommerce/snap-preact';

/* local imports */
import './styles/custom.scss';

/* configuration and instantiation */
const config = {
	client: {
		globals: {
			siteId: '{{snapfu.siteId}}',
		},
	},
	instantiators: {
		recommendation: {
			components: {
				Email: async () => {
					return (await import('./components/Recommendations/Email')).Email;
				},
			},
			config: {
				branch: BRANCHNAME,
			},
		},
	},
	controllers: {},
};

const snap = new Snap(config);
