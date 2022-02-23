!(function () {
	function baseScript(t) {
		(this.iframe = null),
			(this.backgroundId = null),
			(this.popPageId = null),
			(this.iframeLoaded = false),
			(this.iframeOpen = false),
			(this.defaults = t),
			this.popup();
	}
	(baseScript.prototype.popup = function () {
		const baseURL = 'http://frenn-widget.vercel.app/';
		var t = document.createElement('iframe');
		let iframe;
		t.setAttribute('frameBorder', '0'),
			t.setAttribute('allowtransparency', 'true'),
			(t.id = randomId()),
			(t.name = 'frenn-checkout-background-' + t.id),
			(t.style.cssText =
				'z-index: 999999999999999;background: transparent;background: rgba(0, 0, 0, 0.75);border: 0px none transparent;overflow-x: hidden;overflow-y: hidden;margin: 0;padding: 0;-webkit-tap-highlight-color: transparent;-webkit-touch-callout: none;position: fixed;left: 0;top: 0;width: 100%;height: 100%;transition: opacity 0.3s;-webkit-transition: opacity 0.3s;visibility: hidden;'),
			(t.style.display = 'none'),
			(this.background = t),
			document.body.appendChild(t);
		var background = t;
		this.backgroundId = t.id;
		var e = background.contentWindow.document;
		e.open();
		e.write(
			'<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;"><svg style="animation: spin 1s linear infinite;" width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><style>@-webkit-keyframes spin {0% { -webkit-transform: rotate(0deg); }100% { -webkit-transform: rotate(360deg); }}@keyframes spin {0% { transform: rotate(0deg); }100% { transform: rotate(360deg); }}</style><g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="2"><circle stroke-opacity=".5" cx="18" cy="18" r="18"/><path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/></path></g></g></svg></div>'
		);
		e.close();
		var n = document.createElement('iframe');
		n.setAttribute('frameBorder', '0'),
			n.setAttribute('allowtransparency', 'true'),
			// n.setAttribute("allowpaymentrequest", "true"),
			(n.id = randomId()),
			(n.name = 'frenn-checkout-' + n.id),
			(n.style.cssText =
				'z-index: 999999999999999;background: transparent;border: 0px none transparent;overflow-x: hidden;overflow-y: hidden;margin: 0;padding: 0;-webkit-tap-highlight-color: transparent;-webkit-touch-callout: none;position: fixed;left: 0;top: 0;width: 100%;height: 100%;visibility:hidden;'),
			(n.style.display = 'none'),
			console.log(this.baseScript)((n.src = `${baseURL}?id=${this.id}?amount=${this.amount}`));
		this.popPageId = n.id;
		document.body.appendChild(n);
		n.onload = function () {
			console.log('page loaded', n, n.contentWindow.document);
		};

		// n.addEventListener('load', () => {
		// 	let innerDoc = n.contentDocument || n.contentWindow.document;
		// 	innerDoc.getElementById('frenn_close').addEventListener('click', this.closePopUp());
		// });
	}),
		(baseScript.prototype.showPopUp = function () {
			document.getElementById(this.backgroundId).style.display = '';
			document.getElementById(this.backgroundId).style.visibility = 'visible';

			document.getElementById(this.popPageId).style.display = '';
			document.getElementById(this.popPageId).style.visibility = 'visible';
		}),
		(baseScript.prototype.closePopUp = function () {
			document.getElementById(this.backgroundId).style.display = 'none';
			document.getElementById(this.backgroundId).style.visibility = 'hidden';

			document.getElementById(this.popPageId).style.display = 'none';
			document.getElementById(this.popPageId).style.visibility = 'hidden';
		});
	var FrennWidgetPop = {
		isInitialized: false,
		initialize: function (t) {
			ca = new baseScript(t);
			this.isInitialized = true;
			return ca;
		},
		init: function (t, e) {
			var n = 'frenn' + randomId(),
				r = {
					id: n,
					key: t.key || '',
					ref: t.ref || '',
					label: t.label || '',
					email: t.email || '',
					amount: t.amount || '',
					currency: t.currency || 'NGN',
					container: t.container,
				};
			if (r) {
				const iframeEl = document.getElementById(this.background);
				const closeBtn = document.getElementById('frenn_close');
				if (closeBtn) closeBtn.addEventListener('click', this.closePopUp());
				return this.initialize(r);
			}
		},
	};
	(window.FrennWidgetPop = FrennWidgetPop),
		(window.onload = function () {
			FrennWidgetPop.isInitialized || FrennWidgetPop.initialize();
		});

	function randomId() {
		for (var t = '', e = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', n = 0; n < 5; n++)
			t += e.charAt(Math.floor(Math.random() * e.length));
		return t;
	}
})();
