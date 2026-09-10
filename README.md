# Breizh Backyard 🌲✨

Breizh Backyard est une application web moderne développée avec React 19, TypeScript, Vite, Tailwind CSS et des animations WebGL.

## 🚀 Fonctionnalités

- ⚛️ **React 19 & TypeScript** — Architecture frontend moderne et typée
- ⚙️ **Vite** — Environnement de développement et build ultra-rapide
- 🎨 **Tailwind CSS v4 & shadcn/ui** — Styling efficace et composants UI accessibles
- 🌌 **Effets WebGL Aurora** — Arrière-plan animé dynamique propulsé par OGL & Motion
- 🌍 **Internationalisation (i18n)** — Support multilingue (Français, Breton, Anglais)
- 🌙 **Thème Sombre / Clair** — Gestion facile du thème via `next-themes`
- ⚡ **Vercel Analytics & Speed Insights** — Suivi de performance pré-configuré

## 📦 Prise en main

### Prérequis

Assurez-vous d'avoir Node.js et `pnpm` installés sur votre machine.

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/gabindeme/breizhbackyard.git

# Accéder au dossier du projet
cd breizhbackyard

# Installer les dépendances
pnpm install

# Lancer le serveur de développement
pnpm dev
```

## 📁 Structure du projet

```
src/
 ├─ components/     # Composants UI et shaders (Aurora, shadcn)
 ├─ lib/            # Fonctions utilitaires et helpers
 ├─ locales/        # Fichiers de traduction i18n
 ├─ pages/          # Vues et pages de l'application
 ├─ providers/      # Context providers React (Thème, i18n)
 ├─ router/         # Configuration du routage
 ├─ styles/         # Styles globaux et règles CSS
 └─ App.tsx
```

## 📜 Scripts disponibles

- `pnpm dev` — Lance le serveur de développement
- `pnpm build` — Compile le code TypeScript et génère le build de production
- `pnpm format` — Formate l'ensemble du code avec Prettier

## 🙏 Crédits & Remerciements

- **Boilerplate** : Développé à partir du boilerplate [JSXpress](https://github.com/teovlt/jsxpress) créé par [teovlt](https://github.com/teovlt).

## 📄 Licence

MIT — Libre d'utilisation et de modification.

