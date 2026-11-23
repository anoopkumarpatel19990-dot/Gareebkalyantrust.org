
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  doc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig, "gktPublicContent");
const db = getFirestore(app);

const fields = {
  heroEyebrow: ".hero-content .eyebrow",
  heroTitle: ".hero-content h1",
  heroDescription: ".hero-content > p",

  aboutTitle: ".intro-copy h2",
  aboutParagraph1: ".intro-copy p:nth-of-type(1)",
  aboutParagraph2: ".intro-copy p:nth-of-type(2)",

  workTitle: "#work .section-heading h2",
  workIntro: "#work .section-heading > p",

  teamTitle: "#team .section-heading h2",
  teamIntro: "#team .section-heading > p",

  noticeTitle: "#notices .section-heading h2",
  noticeIntro: "#notices .section-heading > p",

  contactTitle: "#contact h2",
  contactIntro: "#contact .contact-grid > div:first-child > p"
};

const reference = doc(db, "siteContent", "main");

onSnapshot(reference, snapshot => {
  if (!snapshot.exists()) return;

  const data = snapshot.data();

  Object.entries(fields).forEach(([key, selector]) => {
    if (typeof data[key] !== "string") return;

    const element = document.querySelector(selector);

    if (element) {
      element.textContent = data[key];
    }
  });

}, error => {
  console.error("GKT Website Content Error:", error);
});
