// Mock database of popular Indian recharge plans
const plansDB = {
 
  jio: [
  { id: 'j1', amount: 155, validity: '28 Days', data: '2GB Total', description: '2GB Total Data (No Voice/SMS)' },
  { id: 'j2', amount: 179, validity: '24 Days', data: '1GB/Day', description: 'Unlimited Calls + 1GB/Day + 100 SMS/Day' },
  { id: 'j3', amount: 199, validity: '28 Days', data: '1GB/Day', description: 'Unlimited Calls + 1GB/Day + 100 SMS/Day' },
  { id: 'j4', amount: 209, validity: '28 Days', data: '1GB/Day', description: 'Unlimited Calls + 1GB/Day + 100 SMS/Day' },
  { id: 'j5', amount: 239, validity: '28 Days', data: '1.5GB/Day', description: 'Unlimited Calls + 1.5GB/Day + 100 SMS/Day' },
  { id: 'j6', amount: 259, validity: '1 Calendar Month', data: '1.5GB/Day', description: 'Unlimited Calls + 1.5GB/Day (renews same date monthly)' },
  { id: 'j7', amount: 299, validity: '28 Days', data: '2GB/Day', description: 'Unlimited Calls + 2GB/Day + 100 SMS/Day' },
  { id: 'j8', amount: 349, validity: '28 Days', data: '2.5GB/Day', description: 'Unlimited Calls + 2.5GB/Day + 100 SMS/Day' },
  { id: 'j9', amount: 399, validity: '28 Days', data: '3GB/Day', description: 'Unlimited Calls + 3GB/Day + 100 SMS/Day' },
  { id: 'j10', amount: 479, validity: '56 Days', data: '1.5GB/Day', description: 'Unlimited Calls + 1.5GB/Day + 100 SMS/Day' },
  { id: 'j11', amount: 533, validity: '56 Days', data: '2GB/Day', description: 'Unlimited Calls + 2GB/Day + 100 SMS/Day' },
  { id: 'j12', amount: 719, validity: '84 Days', data: '1.5GB/Day', description: 'Unlimited Calls + 1.5GB/Day + 100 SMS/Day' },
  { id: 'j13', amount: 839, validity: '84 Days', data: '2GB/Day', description: 'Unlimited Calls + 2GB/Day + 100 SMS/Day' },
  { id: 'j14', amount: 999, validity: '84 Days', data: '2GB/Day', description: 'Unlimited Calls + 2GB/Day + 100 SMS/Day' },
  { id: 'j15', amount: 1234, validity: '336 Days', data: '0.5GB/Day', description: 'Unlimited Calls + 0.5GB/Day' },
  { id: 'j16', amount: 2999, validity: '365 Days', data: '2.5GB/Day', description: 'Unlimited Calls + 2.5GB/Day + 100 SMS/Day' },
  { id: 'j17', amount: 3599, validity: '365 Days', data: '2.5GB/Day', description: 'Unlimited Calls + 2.5GB/Day + 100 SMS/Day + Unlimited 5G + JioHotstar + Google Gemini Pro (18mo) + 50GB JioCloud' }
],

airtel: [
  // Unlimited 5G / Regular plans
  { id: 'a1', amount: 199, validity: '28 Days', data: '2GB Total', description: 'Unlimited Calls + 2GB + Adobe Express Premium' },
  { id: 'a2', amount: 219, validity: '28 Days', data: '3GB Total', description: 'Unlimited Calls + 3GB + Adobe Express Premium' },
  { id: 'a3', amount: 299, validity: '28 Days', data: '1GB/Day', description: 'Unlimited Calls + 1GB/Day + Adobe Express Premium' },
  { id: 'a4', amount: 319, validity: '1 Month', data: '1.5GB/Day', description: 'Unlimited Calls + 1.5GB/Day + Google One' },
  { id: 'a5', amount: 349, validity: '28 Days', data: '1.5GB/Day', description: 'Unlimited Calls + 1.5GB/Day + Unlimited 5G Data' },
  { id: 'a6', amount: 355, validity: '30 Days', data: '25GB Total', description: 'Unlimited Calls + 25GB + Adobe Express Premium' },
  { id: 'a7', amount: 379, validity: '1 Month', data: '2GB/Day', description: 'Unlimited Calls + 2GB/Day + Google One (Full Month)' },
  { id: 'a8', amount: 399, validity: '28 Days', data: '2.5GB/Day', description: 'Unlimited Calls + 2.5GB/Day + JioHotstar Mobile 28 Days' },
  { id: 'a9', amount: 409, validity: '28 Days', data: '2.5GB/Day', description: 'Unlimited Calls + 2.5GB/Day + Aha Premium + 18 OTTs (Xstream Play)' },
  { id: 'a10', amount: 429, validity: '1 Month', data: '2.5GB/Day', description: 'Unlimited Calls + 2.5GB/Day + Unlimited 5G Data' },
  { id: 'a11', amount: 449, validity: '28 Days', data: '4GB/Day', description: 'Unlimited Calls + 4GB/Day + Unlimited 5G Data (Ultimate Maxx)' },
  { id: 'a12', amount: 469, validity: '84 Days', data: 'SMS-based', description: 'Unlimited Calls + 900 SMS + Adobe Express Premium' },
  { id: 'a13', amount: 489, validity: '77 Days', data: '6GB Total', description: 'Unlimited Calls + 6GB + Adobe Express Premium' },
  { id: 'a14', amount: 548, validity: '84 Days', data: '7GB Total', description: 'Unlimited Calls + 7GB + Adobe Express Premium' },
  { id: 'a15', amount: 579, validity: '56 Days', data: '1.5GB/Day', description: 'Unlimited Calls + 1.5GB/Day + Adobe Express Premium' },
  { id: 'a16', amount: 589, validity: '30 Days', data: '50GB Total', description: 'Unlimited Calls + 50GB + Adobe Express Premium' },
  { id: 'a17', amount: 598, validity: '28 Days', data: '2GB/Day', description: 'Unlimited Calls + 2GB/Day + Netflix Basic' },
  { id: 'a18', amount: 609, validity: '1 Month', data: '60GB Total', description: 'Unlimited Calls + 60GB + Adobe Express Premium' },
  { id: 'a19', amount: 619, validity: '60 Days', data: '1.5GB/Day', description: 'Unlimited Calls + 1.5GB/Day + Adobe Express Premium' },
  { id: 'a20', amount: 649, validity: '56 Days', data: '2GB/Day', description: 'Unlimited Calls + 2GB/Day + Unlimited 5G Data' },
  { id: 'a21', amount: 838, validity: '56 Days', data: '3GB/Day', description: 'Unlimited Calls + 3GB/Day + Amazon Prime Lite' },
  { id: 'a22', amount: 899, validity: '84 Days', data: '1.5GB/Day', description: 'Unlimited Calls + 1.5GB/Day + Free Hellotunes' },
  { id: 'a23', amount: 979, validity: '84 Days', data: '2GB/Day', description: 'Unlimited Calls + 2GB/Day + Aha Premium + 18 OTTs (Xstream Play)' },
  { id: 'a24', amount: 1029, validity: '84 Days', data: '2GB/Day', description: 'Unlimited Calls + 2GB/Day + JioHotstar Mobile 3 Months' },
  { id: 'a25', amount: 1199, validity: '84 Days', data: '2.5GB/Day', description: 'Unlimited Calls + 2.5GB/Day + Amazon Prime Lite' },
  { id: 'a26', amount: 1729, validity: '84 Days', data: '2GB/Day', description: 'Unlimited Calls + 2GB/Day + Netflix Basic' },
  { id: 'a27', amount: 1798, validity: '84 Days', data: '3GB/Day', description: 'Unlimited Calls + 3GB/Day + Netflix Basic' },
  { id: 'a28', amount: 1849, validity: '365 Days', data: 'SMS-based', description: 'Unlimited Calls + 3600 SMS + Adobe Express Premium' },
  { id: 'a29', amount: 2249, validity: '365 Days', data: '30GB Total', description: 'Unlimited Calls + 30GB + Adobe Express Premium' },
  { id: 'a30', amount: 3599, validity: '365 Days', data: '2GB/Day', description: 'Unlimited Calls + 2GB/Day + Unlimited 5G Data' },
  { id: 'a31', amount: 3999, validity: '365 Days', data: '2.5GB/Day', description: 'Unlimited Calls + 2.5GB/Day + Unlimited 5G Data' },

  // Data-only / entertainment add-ons (no voice/SMS)
  { id: 'a32', amount: 22, validity: '1 Day', data: '1GB', description: 'Data-Only Add-on' },
  { id: 'a33', amount: 26, validity: '1 Day', data: '1.5GB', description: 'Data-Only Add-on (Bestseller)' },
  { id: 'a34', amount: 33, validity: '1 Day', data: '2GB', description: 'Data-Only Add-on (Bestseller)' },
  { id: 'a35', amount: 39, validity: '3 Days', data: '3GB/Day', description: 'Data-Only Add-on (Trending)' },
  { id: 'a36', amount: 49, validity: '1 Day', data: 'Unlimited', description: 'Data-Only Add-on (Best Value)' },
  { id: 'a37', amount: 77, validity: '7 Days', data: '5GB', description: 'Data-Only Add-on + Extra 1GB on Thanks App' },
  { id: 'a38', amount: 99, validity: '2 Days', data: 'Unlimited', description: 'Data-Only Add-on' },
  { id: 'a39', amount: 100, validity: '30 Days', data: '6GB', description: 'Cricket Pack + JioHotstar Mobile 1 Month' },
  { id: 'a40', amount: 161, validity: '30 Days', data: '12GB', description: 'Data-Only Add-on' },
  { id: 'a41', amount: 200, validity: '28 Days', data: '30GB', description: 'Aha Premium + 18 OTTs (Xstream Play)' },
  { id: 'a42', amount: 279, validity: '1 Month', data: '30GB', description: '19 OTTs + Netflix Basic' },
  { id: 'a43', amount: 361, validity: '30 Days', data: '50GB', description: 'Data-Only Add-on' },

  // Talktime top-ups
  { id: 'a44', amount: 10, validity: '—', data: '—', description: 'Talktime Top-up: Rs. 7.47 credited' },
  { id: 'a45', amount: 120, validity: '—', data: '—', description: 'Talktime Top-up: Rs. 98.69 credited' },
  { id: 'a46', amount: 500, validity: '—', data: '—', description: 'Talktime Top-up: Rs. 423.73 credited' },
  { id: 'a47', amount: 1000, validity: '—', data: '—', description: 'Talktime Top-up: Rs. 847.46 credited' },
  { id: 'a48', amount: 5000, validity: '—', data: '—', description: 'Talktime Top-up: Rs. 4,237.29 credited' }
],
 
vi: [
  // Popular / regular plans
  { id: 'v1', amount: 151, validity: '30 Days', data: '4GB (Add-on)', description: 'Data Add-on + Disney+ Hotstar Mobile (3 months)' },
  { id: 'v2', amount: 202, validity: '30 Days', data: '5GB (Add-on)', description: 'Data Add-on + Vi Movies & TV (13 OTT apps)' },
  { id: 'v3', amount: 349, validity: '28 Days', data: '1.5GB/Day', description: 'Unlimited Calls + 1.5GB/Day + 100 SMS/Day' },
  { id: 'v4', amount: 408, validity: '28 Days', data: '2GB/Day', description: 'Unlimited Calls + 2GB/Day + 100 SMS/Day + SonyLIV' },
  { id: 'v5', amount: 859, validity: '84 Days', data: '1.5GB/Day', description: 'Unlimited Calls + 1.5GB/Day + 100 SMS/Day' },
  { id: 'v6', amount: 979, validity: '84 Days', data: '2GB/Day', description: 'Unlimited Calls + 2GB/Day + 100 SMS/Day + Vi Movies & TV bundle' },
  { id: 'v7', amount: 1198, validity: '70 Days', data: '2GB/Day', description: 'Unlimited Calls + 2GB/Day + 100 SMS/Day + Netflix Basic' },
  { id: 'v8', amount: 3599, validity: '365 Days', data: '2GB/Day', description: 'Unlimited Calls + 2GB/Day + 100 SMS/Day' },

  // Hero Unlimited packs
  { id: 'v9', amount: 365, validity: '28 Days', data: '2GB/Day', description: 'Hero Unlimited: Unlimited Calls + 2GB/Day + 100 SMS/Day' },
  { id: 'v10', amount: 379, validity: '1 Month', data: '2GB/Day', description: 'Hero Unlimited: Unlimited Calls + 2GB/Day + 100 SMS/Day' },
  { id: 'v11', amount: 409, validity: '28 Days', data: '2.5GB/Day', description: 'Hero Unlimited: Unlimited Calls + 2.5GB/Day + 100 SMS/Day' },
  { id: 'v12', amount: 449, validity: '28 Days', data: '3GB/Day', description: 'Hero Unlimited: Unlimited Calls + 3GB/Day + 100 SMS/Day + Vi Movies & TV bundle' },
  { id: 'v13', amount: 539, validity: '28 Days', data: '4GB/Day', description: 'Hero Unlimited: Unlimited Calls + 4GB/Day + 100 SMS/Day' },
  { id: 'v14', amount: 579, validity: '56 Days', data: '1.5GB/Day', description: 'Hero Unlimited: Unlimited Calls + 1.5GB/Day + 100 SMS/Day' },
  { id: 'v15', amount: 649, validity: '56 Days', data: '2GB/Day', description: 'Hero Unlimited: Unlimited Calls + 2GB/Day + 100 SMS/Day' },
  { id: 'v16', amount: 666, validity: '64 Days', data: '1.5GB/Day', description: 'Hero Unlimited: Unlimited Calls + 1.5GB/Day + 100 SMS/Day' },
  { id: 'v17', amount: 795, validity: '56 Days', data: '3GB/Day', description: 'Hero Unlimited: Unlimited Calls + 3GB/Day + 100 SMS/Day' },
  { id: 'v18', amount: 799, validity: '77 Days', data: '1.5GB/Day', description: 'Hero Unlimited: Unlimited Calls + 1.5GB/Day + 100 SMS/Day' },
  { id: 'v19', amount: 994, validity: '84 Days', data: '2GB/Day', description: 'Hero Unlimited: Unlimited Calls + 2GB/Day + 100 SMS/Day + Disney+ Hotstar' },
  { id: 'v20', amount: 996, validity: '84 Days', data: '2GB/Day', description: 'Hero Unlimited: Unlimited Calls + 2GB/Day + 100 SMS/Day + Amazon Prime Lite' },
  { id: 'v21', amount: 997, validity: '84 Days', data: '2GB/Day', description: 'Hero Unlimited: Unlimited Calls + 2GB/Day + 100 SMS/Day + SunNXT' },
  { id: 'v22', amount: 998, validity: '84 Days', data: '2GB/Day', description: 'Hero Unlimited: Unlimited Calls + 2GB/Day + 100 SMS/Day + SonyLIV' },
  { id: 'v23', amount: 1599, validity: '84 Days', data: '2.5GB/Day', description: 'Hero Unlimited: Unlimited Calls + 2.5GB/Day + 100 SMS/Day + Netflix' },
  { id: 'v24', amount: 1749, validity: '180 Days', data: '1.5GB/Day', description: 'Hero Unlimited: Unlimited Calls + 1.5GB/Day + 100 SMS/Day' },
  { id: 'v25', amount: 3499, validity: '365 Days', data: '1.5GB/Day', description: 'Hero Unlimited: Unlimited Calls + 1.5GB/Day + 100 SMS/Day' },
  { id: 'v26', amount: 3699, validity: '365 Days', data: '2GB/Day', description: 'Hero Unlimited: Unlimited Calls + 2GB/Day + 100 SMS/Day + Disney+ Hotstar (1 year)' },
  { id: 'v27', amount: 3799, validity: '365 Days', data: '2GB/Day', description: 'Hero Unlimited: Unlimited Calls + 2GB/Day + 100 SMS/Day + Amazon Prime Video Mobile' },

  // Combo / validity packs
  { id: 'v28', amount: 198, validity: '30 Days', data: '500MB', description: 'Rs. 198 Talktime + 500MB Data' },
  { id: 'v29', amount: 204, validity: '30 Days', data: '500MB', description: 'Rs. 204 Talktime + 500MB Data' }
],

bsnl: [
  { id: 'b1', amount: 58, validity: '7 Days', data: 'Unlimited (2GB/day FUP)', description: 'Unlimited Data (40Kbps after 2GB/day)' },
  { id: 'b2', amount: 59, validity: '7 Days', data: '1GB/Day', description: 'Unlimited Voice + 1GB/Day' },
  { id: 'b3', amount: 98, validity: '18 Days', data: 'Unlimited (2GB/day FUP)', description: 'Unlimited Data (40Kbps after 2GB/day)' },
  { id: 'b4', amount: 99, validity: '17 Days', data: '—', description: 'Unlimited Voice Calls (Local/National)' },
  { id: 'b5', amount: 118, validity: '20 Days', data: 'Unlimited (10GB FUP)', description: 'Unlimited Voice + Unlimited Data (40Kbps after 10GB)' },
  { id: 'b6', amount: 139, validity: '28 Days', data: '1.5GB/Day', description: 'Unlimited Voice + Unlimited Data (40Kbps after 1.5GB/day) — GP2 only' },
  { id: 'b7', amount: 147, validity: '30 Days', data: '10GB', description: 'Unlimited Voice + 10GB Data + Free PRBT' },
  { id: 'b8', amount: 153, validity: '26 Days', data: 'Unlimited (26GB FUP)', description: 'Unlimited Voice + Unlimited Data (40Kbps after 26GB) + 100 SMS/Day' },
  { id: 'b9', amount: 184, validity: '28 Days', data: '1GB/Day', description: 'Unlimited Voice + Unlimited Data (80Kbps after 1GB/day) + 100 SMS/Day' },
  { id: 'b10', amount: 187, validity: '28 Days', data: '2GB/Day', description: 'Unlimited Voice + 2GB/Day + 100 SMS/Day' },
  { id: 'b11', amount: 197, validity: '70 Days', data: '2GB/Day', description: 'Unlimited Voice + Unlimited Data (40Kbps after 2GB/day) + 100 SMS/Day' },
  { id: 'b12', amount: 198, validity: '40 Days', data: 'Unlimited (2GB/day FUP)', description: 'Unlimited Data (40Kbps after 2GB/day)' },
  { id: 'b13', amount: 199, validity: '30 Days', data: '2GB/Day', description: 'Unlimited Voice + Unlimited Data (40Kbps after 2GB/day) + 100 SMS/Day' },
  { id: 'b14', amount: 247, validity: '30 Days', data: '50GB', description: 'Unlimited Voice + 50GB Data + 100 SMS/Day + Rs.10 Talk Value' },
  { id: 'b15', amount: 269, validity: '28 Days', data: '2GB/Day', description: 'Unlimited Voice + 2GB/Day + 100 SMS/Day + BSNL Tunes + VAS' },
  { id: 'b16', amount: 299, validity: '30 Days', data: '3GB/Day', description: 'Unlimited Voice + 3GB/Day + 100 SMS/Day + 3GB Free via Selfcare' },
  { id: 'b17', amount: 319, validity: '65 Days', data: '10GB', description: 'Unlimited Voice + 300 SMS + 10GB Data' },
  { id: 'b18', amount: 345, validity: '60 Days', data: '1GB/Day', description: 'Unlimited Voice + Unlimited Data (40Kbps after 1GB/day) + 100 SMS/Day' },
  { id: 'b19', amount: 347, validity: '56 Days', data: '2GB/Day', description: 'Unlimited Voice + 2GB/Day + 100 SMS/Day' },
  { id: 'b20', amount: 398, validity: '30 Days', data: '120GB', description: 'Unlimited Voice + Unlimited Data (40Kbps after 120GB) + 100 SMS/Day' },
  { id: 'b21', amount: 399, validity: '70 Days', data: '1GB/Day', description: 'Unlimited Voice + Unlimited Data (80Kbps after 1GB/day) + 100 SMS/Day' },
  { id: 'b22', amount: 447, validity: '60 Days', data: '100GB', description: 'Unlimited Voice + 100GB Data' },
  { id: 'b23', amount: 485, validity: '80 Days', data: '2GB/Day', description: 'Unlimited Voice + 2GB/Day + 100 SMS/Day' },
  { id: 'b24', amount: 499, validity: '90 Days', data: '2GB/Day', description: 'Unlimited Voice + 2GB/Day' },
  { id: 'b25', amount: 599, validity: '84 Days', data: '3-5GB/Day', description: 'Unlimited Voice + 3-5GB/Day + 100 SMS/Day' },
  { id: 'b26', amount: 666, validity: '105 Days', data: '2GB/Day', description: 'Unlimited Voice + 2GB/Day + 100 SMS/Day' },
  { id: 'b27', amount: 699, validity: '150 Days', data: '0.5GB/Day + 24GB Extra', description: 'Unlimited Voice + Unlimited Data (80Kbps after 0.5GB/day) + 100 SMS/Day + BSNL Tunes' },
  { id: 'b28', amount: 797, validity: '300-395 Days', data: '2GB/Day', description: 'Unlimited Voice + 2GB/Day + 100 SMS/Day + Extra Data 24 Days' },
  { id: 'b29', amount: 897, validity: '180 Days', data: '90GB', description: 'Unlimited Voice + Unlimited Data (40Kbps after 90GB) + 100 SMS/Day + Extra Data 24 Days' },
  { id: 'b30', amount: 997, validity: '160 Days', data: '2GB/Day', description: 'Unlimited Voice + 2GB/Day + 100 SMS/Day' },
  { id: 'b31', amount: 998, validity: '240 Days', data: '2GB/Day', description: 'Unlimited Voice + 2GB/Day + Free PRBT + Lokdhun' },
  { id: 'b32', amount: 999, validity: '215 Days', data: '—', description: 'Unlimited Voice + PRBT + Extra Data 24 Days (Promo)' },
  { id: 'b33', amount: 1199, validity: '336 Days', data: '24GB', description: 'Unlimited Voice + 24GB Data + 100 SMS/Day + Extra Data 24 Days (Promo)' },
  { id: 'b34', amount: 1499, validity: '336 Days', data: '24GB', description: 'Unlimited Voice + 24GB Data + 100 SMS/Day' },
  { id: 'b35', amount: 1898, validity: '365 Days', data: '2GB/Day', description: 'Unlimited Voice + 2GB/Day' },
  { id: 'b36', amount: 1899, validity: '365 Days', data: '600GB', description: 'Unlimited Voice + 600GB High-Speed Data + 100 SMS/Day + Games' },
  { id: 'b37', amount: 1999, validity: '365 Days', data: '600GB / 3GB/Day', description: 'Unlimited Voice + 600GB High-Speed Data (or 3GB/Day) + 100 SMS/Day' },
  { id: 'b38', amount: 2099, validity: '425 Days', data: '2GB/Day', description: 'Unlimited Voice + Unlimited Data (80Kbps after 2GB/day) + 100 SMS/Day' },
  { id: 'b39', amount: 2399, validity: '425 Days', data: '2GB/Day', description: 'Unlimited Voice + Unlimited Data (40Kbps after 2GB/day) + 100 SMS/Day' },
  { id: 'b40', amount: 2999, validity: '365 Days', data: '3GB/Day', description: 'Unlimited Voice + 3GB/Day + 100 SMS/Day' },

  // Pure data add-ons
  { id: 'b41', amount: 13, validity: '1 Day', data: '2GB', description: 'Data Add-on' },
  { id: 'b42', amount: 48, validity: '30 Days', data: '5GB', description: 'Data Add-on' },
  { id: 'b43', amount: 73, validity: '21 Days', data: '200MB', description: 'Data Add-on' },
  { id: 'b44', amount: 94, validity: '30 Days', data: '3GB', description: 'Data Add-on' },
  { id: 'b45', amount: 97, validity: '15 Days', data: '2GB/Day', description: 'Data Add-on' },

  // SMS packs
  { id: 'b46', amount: 31, validity: '25 Days', data: '—', description: '500 SMS Pack' },
  { id: 'b47', amount: 33, validity: '30 Days', data: '—', description: '385 SMS Pack' },
  { id: 'b48', amount: 52, validity: '30 Days', data: '—', description: '1,000 SMS Pack' }
],



 
};

exports.getPlans = (req, res) => {
  try {
    const { operator } = req.query;
    
    if (!operator || !plansDB[operator]) {
      return res.status(400).json({ message: 'Invalid operator' });
    }

    res.json(plansDB[operator]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};