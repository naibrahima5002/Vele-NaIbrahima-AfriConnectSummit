# 🚀 AfriConnect Summit 2026

**AfriConnect Summit 2026** est le site web officiel du rassemblement annuel de l'écosystème numérique africain à Dakar. Ce projet web responsive présente l'événement, son programme, ses intervenants et permet l'inscription des participants.

---

## 🌟 Fonctionnalités Principales

* **Page d'Accueil (`index.html`) :**
  * **Hero Section :** Présentation de l'événement avec compte à rebours dynamique.
  * **Compteur animé (JS) :** Déclenchement automatique de l'animation des statistiques au défilement (*IntersectionObserver*).
  * **Pourquoi participer & Intervenants vedettes :** Présentation sous forme de cartes structurées en grilles responsive.
  * **Sponsors :** Affichage centré et hiérarchisé par catégorie (Or, Argent, Bronze).

* **Design & Interactivité :**
  * **Thème Clair / Sombre :** Basculement dynamique du thème via un bouton dédié.
  * **Navigation Responsive :** Menu hamburger optimisé pour les écrans mobiles.
  * **Navigation Fluide :** Bouton de retour rapide en haut de page.

---

## 🛠️ Technologies Utilisées

* **HTML5 :** Structure sémantique et accessible (`aria-label`, balises HTML5).
* **CSS3 :** Layout moderne avec Flexbox & CSS Grid, variables CSS et styles responsive.
* **JavaScript (ES6+) :** Interactions dynamiques (compteur animé, mode sombre, menu mobile).
* **Font Awesome & Google Fonts :** Iconographie et typographies (*Plus Jakarta Sans*, *Syne*).

---

## 📁 Structure du Projet

```text
├── index.html          # Page d'accueil principale
├── programme.html      # Planning détaillé des conférences
├── intervenants.html   # Liste complète des speakers
├── contact.html        # Formulaire de réservation & contact
├── css/
│   └── style.css       # Styles globaux et responsive
├── js/
│   └── main.js         # Scripts JS (Thème, compteurs, nav)
└── images/             # Ressources visuelles et photos