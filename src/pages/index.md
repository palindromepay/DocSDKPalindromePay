---
title: Getting Started with Crypto Pay & Escrow SDK
pageTitle: Crypto Pay & Escrow SDK | Palindrome Finance
description: Add crypto payments + escrow to Shopify, real estate, or booking apps in minutes. Accept USDT coin – open source, secure, no middlemen.
---

Palindrome Finance delivers a **crypto payment SDK with built-in escrow** — 
built for developers who demand full control. Add 1-click checkout widgets
to any site in minutes. Accept **USDT coin** with trustless security, no middlemen, and open-source code.

You have two integration options:

**SDK** – for more advanced use cases and maximum flexibility.

**Widget** – easy to integrate with just a few lines of code, using the Palindrome Finance Checkout system.”

Our SDK can be integrated into the following kinds of platforms, allowing users to seamlessly add crypto-based escrow payments to their existing workflows:

- **E-commerce platforms such as Shopify and WooCommerce**
- **Real estate platforms including property rental and sales marketplaces**
- **Various booking systems like hotel reservation and travel booking platforms**

This enables businesses to benefit from secure, transparent transactions for a wide range of use cases, including online shopping, property rentals, and hotel booking systems. {% .lead %}

{% quick-links %}

{% quick-link title="Quick Start" icon="installation" href="#quick-start" description="Step-by-step guides to setting up your system and installing the library." /%}

{% quick-link title="Palindrome Crypto Pay Widget" icon="plugins" href="#palindrome-crypto-pay-widget" description="Integrate the checkout widget into your website without programming it from scratch." /%} 

{% /quick-links %}

---

## Quick start

Do you want to start right away? Then install Palindrome Crypto Pay with a command line.

### Installing dependencies

The SDK is written in **TypeScript** and can be imported into React, Vue and Angular application.

```typescript
npm install @palindromecryptoescrow/sdk
```

{% callout title="You should do!" %}
  Create a .env file

```js
REACT_APP_USDT_TOKEN=0x337610d27c682E347C9cD60BD4b3b107C9d34dDd //this is USDT Faucet on BSC-Testnet 
```
{% /callout %}


## Palindrome Crypto Pay Widget

With the widget, you can add ready‑made Crypto Pay with buttons to your shop or booking system without building a custom checkout flow from scratch. As a merchant, you only place the button where your customer confirms the basket (products, services, or booking details) and pass a few required fields such as title, amount and your address (you will receive the funds).​

When the button is clicked, your customer is redirected to the decentralized Checkout System, where they connect a wallet, review the order and complete a secure crypto payment. You can access the checkout at: [Palindrome Pay](https://palindromefinance.com/crypto-pay)

Either with the SDK or the Widget, you and your customers can view and manage every payment transactions through the [Palindrome Crypto Escrow](https://palindromefinance.com/crypto-escrow). 

The flow is simple: the customer places an order and pays, the merchant delivers the goods or services, and the customer confirms that everything is satisfactory. Once confirmed, the merchant can withdraw the funds.

At the Palindrome Crypto Esrow Dashboard customers can confirm delivery, cancel the order, or open a dispute. 
Merchants can withdraw funds after successful verification, respond to disputes, and request order cancellation, which the customer can then approve.


### Integration code Button Widget

Add this code to your product page, checkout page or booking confirmation:

[Codepen](https://codepen.io/palindromefinance/pen/LENgrgO)

```html
<div style="display: flex; justify-content: center; margin: 20px 0;">
  <button class="palindrome-checkout-button" data-palindrome-seller="your address" data-palindrome-amount="100" data-palindrome-title="My Product" style="
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      width: 200px !important;
      padding: 12px 16px !important;
      font-size: 14px !important;
      border: none !important;
      border-radius: 8px !important;
      background: linear-gradient(135deg, #6e8efb, #a777e3) !important;
      color: white !important;
      cursor: pointer !important;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
      transition: all 0.2s ease !important;
    " onmouseover="this.style.transform='scale(1.02)'; this.style.boxShadow='0 6px 16px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)'">
    <img src="https://www.palindromefinance.com/favicon-32x32.png" alt="Palindrome" style="width: 20px; height: 20px; border-radius: 3px; flex-shrink: 0;" />
    Palindrome Pay
  </button>
</div>

<script src="https://palindromefinance.com/widget.js" data-palindrome-endpoint="https://palindromefinance.com/crypto-pay" defer></script>
```

### Integration code Button Widget (Shopify)

Place this in product.liquid or a product section:

```html
<button 
  class="palindrome-checkout-button" 
  data-palindrome-seller="your address" 
  data-palindrome-amount="{{ product.price | divided_by: 100 }}" 
  data-palindrome-title="{{ product.title | escape }}"
  style="
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 200px !important;
    padding: 12px 16px !important;
    font-size: 14px !important;
    border: none !important;
    border-radius: 8px !important;
    background: linear-gradient(135deg, #6e8efb, #a777e3) !important;
    color: white !important;
    cursor: pointer !important;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
    transition: all 0.2s ease !important;
  "
  onmouseover="this.style.transform='scale(1.02)'; this.style.boxShadow='0 6px 16px rgba(0,0,0,0.2)'"
  onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)'"
>
  <img
    src="https://www.palindromefinance.com/favicon-32x32.png"
    alt="Palindrome"
    style="width: 20px; height: 20px; border-radius: 3px; flex-shrink: 0;"
  />
  Palindrome Pay
</button>

<script 
  src="https://palindromefinance.com/widget.js" 
  data-palindrome-endpoint="https://palindromefinance.com/crypto-pay" 
  defer
></script>


````

---

