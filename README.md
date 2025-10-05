# Ocean Factory - Système de Facturation

Une application web moderne pour la gestion de facturation des milestones et DCR (Document de Changement Requis) pour Ocean Factory.

## 🌊 Fonctionnalités

### Dashboard Principal
- **Détails Amendment** : Gestion des milestones et DCR
- **Calcul** : Module de calcul des facturations (en développement)

### Gestion des Milestones

- **115 milestones individualisés** du projet Ocean Factory avec granularité maximale
- **Individualisation complète** : Toutes les plages "X.Xa to X.Xb" ont été séparées en lignes individuelles
- Exemple d'individualisation :
  - Ancien : "4.1b to 4.4b" → Nouveau : "4.1b", "4.2b", "4.3b", "4.4b"
  - Ancien : "9.1a to 9.4a" → Nouveau : "9.1a", "9.2a", "9.3a", "9.4a"
- Tableau de détails des milestones avec colonnes :
  - Numéro de l'étape (ex: 1, 2, 4a, 4.1b, 4.2b, etc.)
  - Description (PDR, CDR, Financial Security, etc.)
  - Pourcentage
  - Prix unitaire ferme (taxe en sus)
  - Prix ferme total (taxe en sus)
- **Fonctionnalité de recherche** : Filtrage en temps réel par numéro d'étape ou description
- **Statistiques** : Affichage du nombre total de milestones et résultats de recherche
- Tableau de facturation par projet avant taxes (C-228, C-229, C-230, C-231)
- Tableau de facturation avec taxes par projet

### Gestion des DCR
- Structure identique aux milestones
- Interface dédiée avec couleur orange pour différenciation
- Mêmes fonctionnalités CRUD

### Fonctionnalités CRUD
- ✅ Ajout de nouvelles lignes
- ✅ Modification des données existantes
- ✅ Suppression de lignes
- ✅ Interface responsive et intuitive

## 🚀 Technologies Utilisées

- **Framework** : Next.js 14 avec App Router
- **Language** : TypeScript
- **Styling** : Tailwind CSS
- **UI Components** : React with Hooks
- **Responsive Design** : Mobile-first approach

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn
- Navigateur web moderne

## 🛠️ Installation

1. Cloner le projet ou ouvrir le workspace
2. Installer les dépendances :
```bash
npm install
```

3. Lancer en mode développement :
```bash
npm run dev
```

4. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur

## 📁 Structure du Projet

```
src/
├── app/
│   ├── globals.css       # Styles globaux avec Tailwind
│   ├── layout.tsx        # Layout principal de l'application
│   └── page.tsx          # Page d'accueil avec navigation
├── components/
│   ├── milestones/
│   │   └── MilestonesDetails.tsx  # Composant des tableaux milestones
│   └── dcr/
│       └── DCRDetails.tsx         # Composant des tableaux DCR
```

## 🎨 Thème et Design

### Couleurs principales
- **Ocean Blue** : `#1e40af` (Milestones)
- **Ocean Light** : `#3b82f6` 
- **Ocean Dark** : `#1e3a8a`
- **Orange** : `#ea580c` (DCR)

### Composants UI
- Tables responsives avec scroll horizontal
- Inputs avec focus states personnalisés
- Buttons avec animations hover
- Cards avec ombres et bordures arrondies

## 📊 Données

### Milestones Chargés (Exemples)

L'application contient maintenant les 56 milestones officiels du projet Ocean Factory :

| Numéro | Description |
|--------|-------------|
| 1 | PDR |
| 2 | CDR |
| 3 | Financial Security |
| 4a | PO one non-recurrent (steel) |
| 7.1 | Hull, deck, wheelhouse enclosed C228 NLT1 |
| 11.1-11.4 | Delivery of Vessel to Base (C228-C231) |
| 19.a-19.f | Auxiliary Milestones |

### Structure Milestone
```typescript
interface MilestoneDetail {
  id: number
  numeroEtape: string        // MS-001, MS-002, etc.
  description: string
  pourcentage: number
  prixUnitaireFerme: number
  prixFermeTotal: number
}
```

### Structure DCR
```typescript
interface DCRDetail {
  id: number
  numeroEtape: string        // DCR-001, DCR-002, etc.
  description: string
  pourcentage: number
  prixUnitaireFerme: number
  prixFermeTotal: number
}
```

### Structure Facturation Projet
```typescript
interface ProjectBilling {
  id: number
  c228: number    // Projet C-228
  c229: number    // Projet C-229
  c230: number    // Projet C-230
  c231: number    // Projet C-231
}
```

## 🚧 Roadmap

### Phase 1 - Terminée ✅
- [x] Structure du projet Next.js + TypeScript
- [x] Interface utilisateur avec Tailwind CSS
- [x] Composants Milestones et DCR
- [x] Fonctionnalités CRUD de base
- [x] Navigation par onglets

### Phase 2 - À venir 🔄
- [ ] Module de calcul automatique
- [ ] Sauvegarde des données (localStorage/base de données)
- [ ] Export PDF/Excel des tableaux
- [ ] Validation des formulaires
- [ ] Totaux automatiques par projet

### Phase 3 - Futur 🎯
- [ ] Authentification utilisateur
- [ ] Gestion multi-projets
- [ ] Historique des modifications
- [ ] API REST pour la persistance
- [ ] Tests unitaires

## 🛠️ Scripts Disponibles

```bash
npm run dev      # Mode développement
npm run build    # Build de production
npm run start    # Serveur de production
npm run lint     # Vérification ESLint
```

## 📝 Notes de Développement

- L'application démarre avec 10 lignes par tableau
- Les données sont stockées en mémoire (state React)
- Interface entièrement responsive
- Support multi-navigateurs
- Prêt pour l'intégration d'une API backend

## 🤝 Contribution

Ce projet est en développement actif. Les fonctionnalités seront ajoutées progressivement selon les besoins métier.

---

**Ocean Factory - Système de Facturation v0.1.0**