# 🖥️ Sanctuary - Cyberpunk Dev Hub

Bienvenue sur **Sanctuary**, un hub personnel de développement et d'outils web conçu avec une esthétique Cyberpunk / Synthwave. Ce projet regroupe un portfolio (CV), un espace musical (SoundCloud/Spotify), des outils de développement et une console d'administration sécurisée.

## 🔗 Lien du projet Live
Accéder au Hub : [boodmandiouf-sanctuary.is-a.dev](https://boodmandiouf-sanctuary.is-a.dev)

## 🚀 Fonctionnalités
- **Design Cyberpunk Immersif** : Mode sombre et mode clair (Light Mode) optimisés avec effets de lueur (glow) dynamiques.
- **Hub de Développement** : Grille de cartes unifiée pour répertorier des outils web et projets (R&D, Pipeline, Stables).
- **Lecteur Audio Intégré** : Intégration de players SoundCloud et Spotify.
- **Section CV / Parcours** : Curriculum vitae intégré et stylisé.
- **Espace Admin Sécurisé** : Interface d'administration émulant un terminal via une modale de sécurité.

## 📁 Structure du Projet & Architecture

### 🎨 Design (CSS)
Pour maintenir un code propre et modulaire, le design est séparé en deux feuilles de style distinctes :
- `css/style.css` : Gère l'intégralité du site public (Hub, CV, Contact, Carrousels, Particules et thème global).
- `css/admin.css` : Verrouillé exclusivement pour l'écran de connexion, la modale d'authentification et l'émulation du terminal de logs.

### 🔍 Référencement & Indexation (SEO)
Le projet intègre une configuration SEO stricte à la racine pour contrôler la visibilité sur les moteurs de recherche :
- `robots.txt` : Autorise l'indexation du contenu public tout en interdisant explicitement aux robots d'accéder et d'indexer la partie administration ou les scripts sensibles.
- `sitemap.xml` : Cartographie la structure du site pour guider efficacement les moteurs de recherche à travers les différentes sections publiques de l'application (Home, CV, Tools).
- **Optimisation On-Page** : Balises Meta (Open Graph et Twitter Cards) incluses pour un affichage propre lors des partages sur Discord ou les réseaux sociaux.

## 🛠️ Technologies utilisées
- HTML5 / CSS3 (Variables globales, Grid, Flexbox, Media Queries)
- JavaScript (Vanilla) pour les animations du carrousel, le toggle de thème et la logique du terminal
- Particles.js (pour l'arrière-plan interactif)

## 👤 Crédits
- Design & Développement par [BoodmanDiouf]
- Special Thanks : st3mon
