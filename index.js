!(function () {
	function baseScript(t) {
		this.iframe = null;
		this.backgroundId = null;
		this.popPageId = null;
		this.iframeLoaded = false;
		this.iframeOpen = false;
		this.defaults = t;
		this.popup();
		this.listener();
	}

	baseScript.prototype.popup = function () {
		// const baseURL = 'https://biz-api.frenn.com';
		const baseURL = 'https://frenn-widget.vercel.app/';
		var t = document.createElement('iframe');
		let iframe;
		t.setAttribute('frameBorder', '0');
		t.setAttribute('allowtransparency', 'true');
		t.id = randomId();
		t.name = 'frenn-checkout-background-' + t.id;
		t.style.cssText =
			'z-index: 999999999999999;background: transparent;background: rgba(0, 0, 0, 0.75);border: 0px none transparent;overflow-x: hidden;overflow-y: hidden;margin: 0;padding: 0;-webkit-tap-highlight-color: transparent;-webkit-touch-callout: none;position: fixed;left: 0;top: 0;width: 100%;height: 100%;transition: opacity 0.3s;-webkit-transition: opacity 0.3s;visibility: hidden;';
		t.style.display = 'none';
		(this.background = t), document.body.appendChild(t);
		var background = t;
		this.backgroundId = t.id;
		var e = background.contentWindow.document;
		e.open();
		e.write(
			'<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;position: relative;"><svg id="p-spinner" style="animation: spin 1s linear infinite;" width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><style>@-webkit-keyframes spin {0% { -webkit-transform: rotate(0deg); }100% { -webkit-transform: rotate(360deg); }}@keyframes spin {0% { transform: rotate(0deg); }100% { transform: rotate(360deg); }}</style><g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="2"><circle stroke-opacity=".5" cx="18" cy="18" r="18"/><path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/></path></g></g></svg></div>'
		);
		e.close();
		var n = document.createElement('iframe');
		n.setAttribute('frameBorder', '0');
		n.setAttribute('allowtransparency', 'true');
		// n.setAttribute("allowpaymentrequest", "true"),
		n.id = randomId();
		n.name = 'frenn-checkout-' + n.id;
		n.style.cssText =
			'z-index: 999999999999999;background: transparent;border: 0px none transparent;overflow-x: hidden;overflow-y: hidden;margin: 0;padding: 0;-webkit-tap-highlight-color: transparent;-webkit-touch-callout: none;position: fixed;left: 0;top: 0;width: 100%;height: 100%;visibility:hidden;';
		n.style.display = 'none';
		var params = this.defaults ? `/?params=${JSON.stringify(this.defaults)}` : '';
		n.src = `${baseURL}${params}`;
		this.popPageId = n.id;
		document.body.appendChild(n);
	};

	baseScript.prototype.showPopUp = function () {
		document.getElementById(this.backgroundId).style.display = '';
		document.getElementById(this.backgroundId).style.visibility = 'visible';

		document.getElementById(this.popPageId).style.display = '';
		document.getElementById(this.popPageId).style.visibility = 'visible';
	};

	baseScript.prototype.closePopUp = function () {
		document.getElementById(this.backgroundId).style.display = 'none';
		document.getElementById(this.backgroundId).style.visibility = 'hidden';

		document.getElementById(this.popPageId).style.display = 'none';
		document.getElementById(this.popPageId).style.visibility = 'hidden';
	};

	baseScript.prototype.listener = function () {
		window.addEventListener('message', (event) => {
			if (event.data) {
				if (event.data === 'show:spinner') {
					this.showSpinner();
				}
				if (event.data === 'show:overlay') {
					this.showOverlay();
				}
				if (event.data === 'hide:overlay') {
					this.hideOverlay();
				}
				if (event.data === 'hide:spinner') {
					this.hideSpinner();
				}
				if (event.data === 'close') {
					this.closePopUp();
				}
				if (event.data === 'close:transaction') {
					this.closePopUp();
					window.location.href = this.defaults.redirectUrl;
				}
			}
		});
	};

	baseScript.prototype.hideSpinner = function () {
		// document.getElementById(this.backgroundId).children.style.display = 'none';
		console.log(document.getElementById(this.backgroundId).children);
	};

	baseScript.prototype.showSpinner = function () {
		document.getElementById(this.backgroundId).children.style.display = 'block';
	};

	baseScript.prototype.hideOverlay = function () {
		document.getElementById(this.backgroundId).style.display = 'none';
		document.getElementById(this.backgroundId).style.visibility = 'hidden';
	};

	baseScript.prototype.showOverlay = function () {
		document.getElementById(this.backgroundId).style.display = '';
		document.getElementById(this.backgroundId).style.visibility = 'visible';
	};

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
					key: t.key || '',
					merchantId: t.merchantId || '',
					orderReference: t.orderReference || '',
					amount: t.amount || '',
					customer: {
						phoneNo: t.customer.phoneNo || '',
						name: t.customer.name || '',
						email: t.customer.email || '',
						shippingAddress: t.customer.shippingAddress || '',
						shippingLGA: t.customer.shippingLGA || '',
						shippingState: t.customer.shippingState || '',
						createdAt: t.customer.createdAt || '',
					},
					transactionHistory: {
						totalOrders: t.transactionHistory.totalOrders || '',
						totalSales: t.transactionHistory.totalSales || '',
						totalRefunds: t.transactionHistory.totalRefunds || '',
						mOrdersLast3: t.transactionHistory.mOrdersLast3 || '',
						mSalesLast3: t.transactionHistory.mSalesLast3 || '',
						mRefundsLast3: t.transactionHistory.mRefundsLast3 || '',
					},
					redirectUrl: t.redirectUrl || '',
					webhook: t.webhook || '',
				};
			if (r) {
				var iframeEl = document.getElementById(this.background);
				var closeBtn = document.getElementById('frenn_close');
				return this.initialize(r);
			}
		},
	};
	window.FrennWidgetPop = FrennWidgetPop;
	window.onload = function () {
		FrennWidgetPop.isInitialized || FrennWidgetPop.initialize();
	};

	function randomId() {
		for (var t = '', e = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', n = 0; n < 5; n++)
			t += e.charAt(Math.floor(Math.random() * e.length));
		return t;
	}
})();
