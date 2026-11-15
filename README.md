# गरीब कल्याण ट्रस्ट — वेबसाइट

यह एक responsive static website है, जिसे GitHub Pages पर मुफ्त में host किया जा सकता है।

## फाइलें
- `index.html` — वेबसाइट की सामग्री
- `style.css` — डिजाइन और मोबाइल लेआउट
- `script.js` — मोबाइल मेन्यू और वर्तमान वर्ष
- `assets/` — सभी demo placeholder images और `trust-logo.jpg` (आपका ट्रस्ट लोगो)

## फोटो बदलने का तरीका
`assets` फोल्डर में अपनी तस्वीरें रखें। अभी:
- `hero-placeholder.svg` — मुख्य बैनर
- `about-placeholder.svg` — हमारे बारे में सेक्शन
- `person-placeholder.svg` — सभी पदाधिकारियों की डेमो फोटो
- `gallery-placeholder-1.svg` से `gallery-placeholder-3.svg` — गैलरी

हर व्यक्ति की अलग फोटो लगाने के लिए `index.html` में उस सदस्य के `img src="assets/person-placeholder.svg"` को अपनी फोटो के नाम से बदलें। उदाहरण: `assets/alok-kumar.jpg`। अपनी फोटो उसी `assets` फोल्डर में रखें।

## प्रकाशित करने के लिए GitHub Pages
1. GitHub पर नया **Public repository** बनाएं, उदाहरण: `gareeb-kalyan-trust`.
2. इस ZIP की सभी फाइलें repository के root में upload करें (ZIP को extract करके)।
3. Repository में **Settings → Pages** खोलें।
4. **Deploy from a branch** चुनें, Branch `main` और folder `/ (root)` चुनकर Save करें।
5. कुछ मिनट बाद GitHub Pages URL पर वेबसाइट उपलब्ध होगी।

## लॉन्च से पहले बदलें
- संपर्क ईमेल और मोबाइल नंबर
- सही पता / कार्यक्षेत्र
- सोशल मीडिया लिंक
- वास्तविक संस्था परिचय और गतिविधियों का विवरण
- सभी पदाधिकारियों की वास्तविक तस्वीरें
- यदि उपलब्ध हो तो पंजीकरण संख्या और आधिकारिक दस्तावेजों की जानकारी

डोमेन बाद में GitHub Pages की Settings → Pages → Custom domain में जोड़ा जा सकता है।


## लोगो, Exam Portal और Notices
- आपका लोगो `assets/trust-logo.jpg` के रूप में header में लगाया गया है। इसे बदलना हो तो इसी नाम से नई इमेज रखें।
- Header के **Exam Portal** मेन्यू में चार लिंक हैं: Previous Year Paper, Apply for Exam, Admit Card और Result। `index.html` में संबंधित `href="#"` को अपने असली URL से बदलें।
- **सूचनाएँ** सेक्शन में डेमो नोटिस कार्ड दिए गए हैं। नई सूचना के लिए `notice-item` वाले पूरे कार्ड की कॉपी बनाएं और शीर्षक, तारीख/टैग, विवरण तथा लिंक बदलें।
