# Campus Book - Proof Of Concept

Application web complète pour la gestion des réservations de salles, emprunts d'équipements et prise de rendez-vous avec les enseignants.

## 🚀 Stack technique

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React
- **Données**: Stockage en mémoire (Zustand store)

## 📋 Prérequis

- Node.js (version 18 ou supérieure)
- npm, yarn ou pnpm

## 🛠️ Installation et lancement

1. Clonez le dépôt et naviguez dans le dossier :
```bash
cd campusBook
```

2. Installez les dépendances :
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Lancez l'application en mode développement :
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

L'application sera accessible sur `http://localhost:3000`

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
- 5 salles (Salle A101, Salle B203, Labo Informatique, Salle de Réunion, Studio Multimédia)
- 6 équipements (MacBook Pro, Caméra Canon, Microphone, Projecteur, iPad Pro, Kit d'éclairage)
- 4 enseignants (Prof. Jean Martin, Dr. Sophie Leclerc, M. Pierre Dubois, Mme. Claire Bernard)
- Quelques réservations existantes

## 🔧 Scripts disponibles

- `npm run dev` : Lance l'application en mode développement avec rechargement automatique
- `npm run build` : Compile l'application pour la production
- `npm start` : Lance l'application compilée en mode production
- `npm run lint` : Vérifie le code avec ESLint

## 📁 Structure du projet

```
campusBook/
├── app/                   # Pages Next.js (App Router)
│   ├── appointments/      # Pages de rendez-vous
│   ├── equipment/         # Pages d'équipements
│   ├── profile/           # Page profil utilisateur
│   ├── rooms/             # Pages de salles
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil (Dashboard)
│   └── globals.css        # Styles globaux
├── components/            # Composants React réutilisables
│   ├── ui/               # Composants UI (Radix UI)
│   ├── navigation.tsx    # Navigation principale
│   ├── mobile-navigation.tsx
│   └── theme-provider.tsx
├── lib/                   # Utilitaires et logique métier
│   ├── types.ts          # Types TypeScript
│   ├── store.ts          # Store Zustand (état global)
│   ├── mock-data.ts      # Données factices
│   └── utils.ts          # Fonctions utilitaires
├── hooks/                 # Hooks React personnalisés
├── public/                # Assets statiques
├── package.json
├── tsconfig.json
├── next.config.mjs
└── README.md
```

## 🎯 Exigences respectées

Toutes les exigences fonctionnelles (EXIG-FONC-01 à EXIG-FONC-18) et non fonctionnelles (EXIG-NF-01 à EXIG-NF-08) ont été implémentées.

## 📝 Notes

- Les données sont stockées en mémoire (Zustand store) et seront réinitialisées à chaque rechargement de la page
- Aucune authentification complexe : simple sélection de profil utilisateur
- Les réservations sont validées automatiquement selon les disponibilités
- L'annulation est possible jusqu'à 24h avant le créneau
- Application full-stack monolithique avec Next.js (pas de backend séparé)
- Support du mode sombre/clair via next-themes

## 🐛 Dépannage

Si vous rencontrez des problèmes :

1. Vérifiez que le port 3000 est libre
2. Assurez-vous que toutes les dépendances sont installées (`npm install`)
3. Vérifiez que vous utilisez Node.js version 18 ou supérieure
4. En cas d'erreur de build, essayez de supprimer `.next` et `node_modules`, puis réinstallez les dépendances
