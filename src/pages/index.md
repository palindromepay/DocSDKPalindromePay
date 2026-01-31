---
title: Getting Started
pageTitle: Crypto Pay & Escrow SDK | Palindrome Pay
description: Add crypto payments + escrow to Shopify, real estate, or booking apps in minutes. Accept USDT coin – open source, secure, no middlemen.
---

## Introduction

Palindrome Pay is an open-source SDK for building escrow functionality into decentralized applications using smart contracts with built-in escrow and multisig wallet.

- **Non-custodial**: Funds are held by the smart contract, not by Palindrome Pay
- **User-to-user**: Direct peer-to-peer transactions between buyer and seller

---

You have two integration options:

**SDK** – for more advanced use cases and maximum flexibility.

**Palindrome Pay Button** – is a 1-Click Crypto Pay Button with built-in checkout system easy to integrate with just a few lines.

The Palindrome Pay Button can be integrated into the following kinds of platforms, allowing users to seamlessly add crypto-based escrow payments to their existing workflows:

- **E-commerce platforms such as Shopify and WooCommerce**
- **Real estate platforms including property rental and sales marketplaces**
- **Various booking systems like hotel reservation and travel booking platforms**

This enables businesses to benefit from secure, transparent transactions for a wide range of use cases, including online shopping, property rentals, and hotel booking systems. {% .lead %}

{% quick-links %}

{% quick-link title="Quick Start" icon="installation" href="#quick-start" description="Step-by-step guides to setting up your system and installing the library." /%}

{% quick-link title="Palindrome Pay Button" icon="plugins" href="#palindrome-pay-button" description="Integrate the checkout widget into your website without programming it from scratch." /%} 

{% /quick-links %}

---

## Quick start

Do you want to start right away? Then install Palindrome Crypto Pay with a command line.

### Installing dependencies

The SDK is written in **TypeScript** and can be imported into React, Vue and Angular application.

```typescript
npm install @palindromepay/sdk
```

{% callout title="You should do!" %}
  Create a .env file

```js
REACT_APP_USDT_TOKEN=0x337610d27c682E347C9cD60BD4b3b107C9d34dDd //this is USDT Faucet on BSC-Testnet 
```
{% /callout %}


## Palindrome Pay Button

With the Palindrome Pay Button, you can add ready‑made Crypto Pay buttons to your shop or booking system without building a custom checkout flow from scratch. As a merchant, you only place the button where your customer confirms the basket (products, services, or booking details) and pass a few required fields such as title, amount and your address (you will receive the funds).​

When the button is clicked, your customer is redirected to the decentralized Checkout System, where they connect a wallet, review the order and complete a secure crypto payment.

Either with the SDK or the Crypto Pay Button, you and your customers can view and manage every payment transactions through the [Palindrome Crypto Escrow](https://palindromepay.com/crypto-escrow). 

The flow is simple: the customer places an order and deposit, the merchant delivers the goods or services, and the customer confirms that everything is satisfactory. Once confirmed, the merchant can withdraw the funds.

At the Palindrome Crypto Escrow platform customers can confirm delivery, cancel the order, or open a dispute. 
Merchants can withdraw funds after successful verification, open a dispute, and request order cancellation, which the customer can then approve.


### Integration code Palindrome Pay Button

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
    <img src="https://www.palindromepay.com/favicon-32x32.png" alt="Palindrome" style="width: 20px; height: 20px; border-radius: 3px; flex-shrink: 0;" />
    Palindrome Pay
  </button>
</div>
<!--// add the script before </body> -->
<script src="https://palindromepay.com/widget.js" data-palindrome-endpoint="https://palindromepay.com/crypto-pay" defer></script>
```

### Integration code Palindrome Pay Button (Shopify)

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
    src="https://www.palindromepay.com/favicon-32x32.png"
    alt="Palindrome"
    style="width: 20px; height: 20px; border-radius: 3px; flex-shrink: 0;"
  />
  Palindrome Pay
</button>
<!--// add the script before </body> -->
<script 
  src="https://palindromepay.com/widget.js" 
  data-palindrome-endpoint="https://palindromepay.com/crypto-pay" 
  defer
></script>


````

---

