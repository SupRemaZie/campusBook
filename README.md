# Campus Book - Proof Of Concept

Application web complète pour la gestion des réservations de salles, emprunts d'équipements et prise de rendez-vous avec les enseignants.

## 🚀 Stack technique

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Données**: Stockage en mémoire (tableaux TypeScript)

## 📋 Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn

## 🛠️ Installation et lancement

### Backend

1. Naviguez dans le dossier backend :
```bash
cd backend
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez le serveur de développement :
```bash
npm run dev
```

Le serveur backend sera accessible sur `http://localhost:5000`

### Frontend

1. Dans un nouveau terminal, naviguez dans le dossier frontend :
```bash
cd frontend
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez l'application :
```bash
npm run dev
```

L'application frontend sera accessible sur `http://localhost:3000`

## 📱 Utilisation

1. **Sélection du profil** : Au chargement de l'application, sélectionnez votre profil (Étudiant ou Enseignant) dans le menu déroulant en haut à droite.

2. **Navigation** : Utilisez le menu de navigation pour accéder aux différentes sections :
   - **Dashboard** : Vue d'ensemble des réservations et disponibilités
   - **Salles** : Réservation de salles
   - **Équipements** : Emprunt d'équipements
   - **Rendez-vous** : Prise de rendez-vous avec les enseignants
   - **Mon espace** : Gestion de vos réservations

## ✨ Fonctionnalités

### Gestion des salles
- Liste complète des salles avec capacité
- Réservation de créneaux horaires
- Validation automatique des conflits
- Calendrier des réservations par salle

### Gestion des équipements
- Catalogue des équipements disponibles
- Statut de disponibilité en temps réel
- Emprunt avec durée maximale
- Historique des emprunts

### Rendez-vous avec enseignants
- Liste des enseignants disponibles
- Créneaux horaires prédéfinis
- Réservation de créneaux
- Suivi des rendez-vous planifiés

### Espace utilisateur
- Historique complet des réservations
- Réservations à venir
- Annulation de réservations (si plus de 24h avant)

### Dashboard
- Vue synthétique des prochaines réservations
- Salles et équipements disponibles maintenant
- Prochains créneaux libres pour les enseignants

## 📊 Données factices

L'application est pré-remplie avec des données factices :
- 7 salles
- 12 équipements
- 7 enseignants
- Quelques réservations existantes

## 🔧 Scripts disponibles

### Backend
- `npm run dev` : Lance le serveur en mode développement avec rechargement automatique
- `npm run build` : Compile le TypeScript
- `npm start` : Lance le serveur compilé

### Frontend
- `npm run dev` : Lance l'application en mode développement
- `npm run build` : Compile l'application pour la production
- `npm run preview` : Prévisualise la version de production

## 📁 Structure du projet

```
campusBook/
├── backend/
│   ├── src/
│   │   ├── index.ts      # Point d'entrée du serveur
│   │   ├── types.ts      # Types TypeScript
│   │   └── data.ts       # Données factices
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/   # Composants React
│   │   ├── pages/        # Pages de l'application
│   │   ├── context/      # Contextes React
│   │   ├── api/          # Client API
│   │   └── types.ts      # Types TypeScript
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 🎯 Exigences respectées

Toutes les exigences fonctionnelles (EXIG-FONC-01 à EXIG-FONC-18) et non fonctionnelles (EXIG-NF-01 à EXIG-NF-08) ont été implémentées.

## 📝 Notes

- Les données sont stockées en mémoire et seront réinitialisées à chaque redémarrage du serveur
- Aucune authentification complexe : simple sélection de profil
- Les réservations sont validées automatiquement selon les disponibilités
- L'annulation est possible jusqu'à 24h avant le créneau

## 🐛 Dépannage

Si vous rencontrez des problèmes :

1. Vérifiez que les ports 3000 (frontend) et 5000 (backend) sont libres
2. Assurez-vous que le backend est lancé avant le frontend
3. Vérifiez que toutes les dépendances sont installées (`npm install` dans chaque dossier)
