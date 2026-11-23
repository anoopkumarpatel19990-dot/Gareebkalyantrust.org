
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { firebaseConfig } from "./firebase-config.js";

// केवल एक मुख्य Admin
const ADMIN_USERNAME = "GKT";
const ADMIN_EMAIL = "gkt-admin@gareeb-kalyan-trust.firebaseapp.com";
const ADMIN_UID = "vOBWfn0zerVC80avNeTveMPkNHB3";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const loginPanel = document.getElementById("loginPanel");
const dashboardPanel = document.getElementById("dashboardPanel");
const loginMessage = document.getElementById("loginMessage");
const saveMessage = document.getElementById("saveMessage");
const fieldsEl = document.getElementById("fields");

// वेबसाइट के टेक्स्ट एडिट करने के विकल्प
const fields = [
  {
    key: "heroEyebrow",
    title: "मुख्य बैनर",
    label: "बैनर की छोटी लाइन",
    selector: ".hero-content .eyebrow"
  },
  {
    key: "heroTitle",
    title: "मुख्य बैनर",
    label: "मुख्य शीर्षक",
    selector: ".hero-content h1"
  },
  {
    key: "heroDescription",
    title: "मुख्य बैनर",
    label: "बैनर का विवरण",
    selector: ".hero-content > p"
  },
  {
    key: "aboutTitle",
    title: "About सेक्शन",
    label: "About शीर्षक",
    selector: ".intro-copy h2"
  },
  {
    key: "aboutParagraph1",
    title: "About सेक्शन",
    label: "पहला पैराग्राफ",
    selector: ".intro-copy p:nth-of-type(1)"
  },
  {
    key: "aboutParagraph2",
    title: "About सेक्शन",
    label: "दूसरा पैराग्राफ",
    selector: ".intro-copy p:nth-of-type(2)"
  },
  {
    key: "workTitle",
    title: "Our Work",
    label: "Our Work शीर्षक",
    selector: "#work .section-heading h2"
  },
  {
    key: "workIntro",
    title: "Our Work",
    label: "Our Work विवरण",
    selector: "#work .section-heading > p"
  },
  {
    key: "teamTitle",
    title: "Team",
    label: "टीम का शीर्षक",
    selector: "#team .section-heading h2"
  },
  {
    key: "teamIntro",
    title: "Team",
    label: "टीम का विवरण",
    selector: "#team .section-heading > p"
  },
  {
    key: "noticeTitle",
    title: "Notices",
    label: "नोटिस शीर्षक",
    selector: "#notices .section-heading h2"
  },
  {
    key: "noticeIntro",
    title: "Notices",
    label: "नोटिस विवरण",
    selector: "#notices .section-heading > p"
  },
  {
    key: "contactTitle",
    title: "Contact",
    label: "संपर्क शीर्षक",
    selector: "#contact h2"
  },
  {
    key: "contactIntro",
    title: "Contact",
    label: "संपर्क विवरण",
    selector: "#contact .contact-grid > div:first-child > p"
  }
];

function renderFields(data = {}) {
  fieldsEl.innerHTML = "";

  let lastGroup = "";

  fields.forEach(field => {
    if (lastGroup !== field.title) {
      const group = document.createElement("section");
      group.className = "field-group";

      const heading = document.createElement("h2");
      heading.textContent = field.title;

      group.appendChild(heading);
      fieldsEl.appendChild(group);

      lastGroup = field.title;
    }

    const label = document.createElement("label");
    label.textContent = field.label;

    const textarea = document.createElement("textarea");
    textarea.dataset.key = field.key;
    textarea.value = data[field.key] || "";
    textarea.placeholder = "यहाँ नया टेक्स्ट लिखें";

    const wrapper = document.createElement("div");
    wrapper.append(label, textarea);

    fieldsEl.lastElementChild.appendChild(wrapper);
  });
}

async function loadContent() {
  const reference = doc(db, "siteContent", "main");
  const snapshot = await getDoc(reference);

  renderFields(snapshot.exists() ? snapshot.data() : {});
}

// Username और Password Login
document.getElementById("loginForm").addEventListener("submit", async event => {
  event.preventDefault();

  loginMessage.textContent = "लॉगिन जाँचा जा रहा है...";

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (username !== ADMIN_USERNAME) {
    loginMessage.textContent = "Username या Password गलत है।";
    return;
  }

  try {
    const result = await signInWithEmailAndPassword(
      auth,
      ADMIN_EMAIL,
      password
    );

    if (result.user.uid !== ADMIN_UID) {
      await signOut(auth);
      throw new Error("यह Admin अकाउंट अधिकृत नहीं है।");
    }

    await loadContent();

    loginPanel.classList.add("hidden");
    dashboardPanel.classList.remove("hidden");

  } catch (error) {
    loginMessage.textContent =
      "Login नहीं हुआ। Username, Password और Firebase सेटिंग जाँचें।";
    console.error(error);
  }
});

// टेक्स्ट सेव करना
document.getElementById("contentForm").addEventListener("submit", async event => {
  event.preventDefault();

  saveMessage.textContent = "बदलाव सेव हो रहे हैं...";

  if (!auth.currentUser || auth.currentUser.uid !== ADMIN_UID) {
    saveMessage.textContent = "पहले Admin Login करें।";
    return;
  }

  const data = {};

  fieldsEl.querySelectorAll("textarea[data-key]").forEach(input => {
    data[input.dataset.key] = input.value.trim();
  });

  try {
    await setDoc(
      doc(db, "siteContent", "main"),
      data,
      { merge: true }
    );

    saveMessage.textContent =
      "बदलाव सफलतापूर्वक सेव हो गए!";

  } catch (error) {
    saveMessage.textContent =
      "बदलाव सेव नहीं हुए। Firebase Rules जाँचें।";

    console.error(error);
  }
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", async () => {
  await signOut(auth);

  dashboardPanel.classList.add("hidden");
  loginPanel.classList.remove("hidden");

  document.getElementById("password").value = "";
  loginMessage.textContent = "";
});

// पहले से Login होने पर Dashboard खोलना
onAuthStateChanged(auth, async user => {
  if (user && user.uid === ADMIN_UID) {
    try {
      await loadContent();
      loginPanel.classList.add("hidden");
      dashboardPanel.classList.remove("hidden");
    } catch (error) {
      console.error(error);
    }
  }
});
