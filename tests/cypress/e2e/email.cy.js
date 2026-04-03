/**
 * End to end tests with Cypress!
 *
 * The purpose of these tests is to prevent publishing of the bundle if a
 * breaking change has been made to the implementation code in the future
 *
 * Start by fill out the config object below. If a selector is not provided,
 * the applicable tests will be skipped.
 *
 */

const config = {
	pages: [{ url: 'https://localhost:3333/email.html', id: 'recommend_default-trending_0' }],
	disableGA: '', // disable google analytic events (example: 'UA-123456-1')
	selectors: {
		images: {
			lazyLoading: '[loading="lazy"]',
		},
	},
};

config?.pages?.forEach((page, _i) => {
	describe(`${page.id || _i}`, () => {
		describe('Setup', () => {
			it('adds snap bundle to email page', () => {
				cy.visit(page.url);

				cy.addLocalSnap();

				cy.waitForBundle().then(() => {
					cy.window().then((window) => {
						expect(window.athos).to.exist;
					});
				});

				if (config.disableGA) {
					window[`ga-disable-${config.disableGA}`] = true;
				}

				cy.snapController(page.id).then(({ store }) => {
					expect(typeof store).to.equal('object');
				});
			});

			it('has data in the store', () => {
				cy.snapController(page.id).then(({ store }) => {
					expect(store.results.length).to.be.greaterThan(0);
				});
			});
		});

		describe('renders results ', () => {
			it('has correct product count per page and correct needed wrapper styles', () => {
				cy.snapController(page.id).then(({ store }) => {
					for (let i = 0; i < store.results.length; i++) {
						cy.get('#ss-emailrec' + i).should('exist');
					}
				});
			});

			it('has lazy loading disabled', () => {
				if (!config?.selectors?.images?.lazyLoading) this.skip();
				cy.document().then((doc) => {
					const lazyImages = doc.querySelectorAll(config.selectors.images.lazyLoading).length;
					expect(lazyImages).to.equal(0);
				});
			});
		});
	});
});
