# Projet de création d'une application web pour la gestion de groupes de travail

Ce projet consiste à développer une application web permettant aux utilisateurs de créer et gérer des groupes de travail. L'application est structurée en deux parties : le back-end développé avec Node.js et Express, et le front-end développé avec React. Les deux parties sont situées dans des dossiers distincts au sein du même dépôt.

## Structure du dépôt

```
projetCICD/
│
├── backend/            # Code source du back-end
│   ├── src/            # Code source de l'application
│   ├── package.json     # Dépendances et scripts du back-end
│   └── ...
│
└── frontend/           # Code source du front-end
├── src/            # Code source de l'application
├── package.json     # Dépendances et scripts du front-end
└── ...
```

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [npm](https://www.npmjs.com/) (ou [yarn](https://yarnpkg.com/) pour le front-end)
- [Git](https://git-scm.com/)

## Installation

### Back-end

1. Naviguez dans le dossier du back-end :

   ```bash
   cd backend
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Démarrez le serveur :

   ```bash
   npm start
   ```

### Front-end

1. Naviguez dans le dossier du front-end :

   ```bash
   cd frontend
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Démarrez l'application React :

   ```bash
   npm start
   ```

## Fonctionnalités

- Création de groupes de travail avec des configurations personnalisées.
- Gestion des utilisateurs : invitation, ajout, retrait de groupes.
- Vérification automatique des groupes et des utilisateurs.
- Interface d'administration pour gérer les groupes et les utilisateurs.

## Tests

Des tests unitaires et d'intégration sont intégrés au projet. Pour exécuter les tests, utilisez les commandes suivantes :

### Back-end

```bash
cd backend
npm test
```

### Front-end

```bash
cd frontend
npm test
```

## Intégration continue

Le projet utilise Jenkins pour l'intégration continue. Les pipelines CI/CD sont configurés pour automatiser les tests et les déploiements.

## Analyse de code

SonarQube est utilisé pour analyser la qualité du code. Les rapports d'analyse sont intégrés dans Jenkins.