# Instagram Entry Page (Clone) — React + Vite + Bootstrap

Page d'accueil style Instagram, **entièrement responsive** :
- **Mobile / tablette** : header + stories + fil + barre de navigation basse (comme l'app Instagram).
- **Desktop (≥ 992px)** : mise en page 3 colonnes comme le vrai site — barre latérale gauche (navigation), fil central, panneau droit (profil + suggestions), sans marges blanches vides.

## Fonctionnalités

- Stories défilables → clic pour ouvrir une story plein écran avec barre de progression
- Fil d'actualité avec posts image **et vidéo** (lecture/pause au clic)
- **Double-clic** sur une publication pour "aimer" (animation cœur, comme Instagram)
- Bouton **Suivre / Suivi(e)** sur les publications et dans les suggestions
- Panneau de **recherche** de comptes (icône loupe) avec filtrage en direct
- Panneau de **notifications** (icône cœur) avec badge "non lues"
- **Commentaires** : voir et ajouter un commentaire par publication (modale dédiée)
- **Créer une publication** (icône +) : URL d'image + légende, ajoutée en tête du fil
- Mode **sombre / clair** persistant (localStorage), toggle dans le header et la sidebar
- Enregistrer une publication (icône marque-page)

## Installation

```bash
npm install
```

## Lancer en développement

```bash
npm run dev
```

Puis ouvrez l'URL affichée (généralement http://localhost:5173).

## Build de production

```bash
npm run build
npm run preview
```

## Structure

```
src/
  components/
    Sidebar.jsx           # navigation latérale (desktop, ≥ 992px)
    RightPanel.jsx         # mini-profil + suggestions (desktop, ≥ 1264px)
    Header.jsx              # topbar mobile + stories (toutes tailles)
    StoryViewer.jsx         # overlay plein écran d'une story
    Feed.jsx                # liste des posts
    Post.jsx                # un post (image ou vidéo), likes, follow, commentaires
    Footer.jsx               # navigation basse (mobile uniquement)
    SearchPanel.jsx          # panneau latéral de recherche de comptes
    NotificationsPanel.jsx   # panneau latéral de notifications
    CommentsModal.jsx        # modale des commentaires d'un post
    CreateModal.jsx          # modale de création de publication
  context/
    ThemeContext.jsx  # gestion du mode sombre/clair (persisté en localStorage)
  data/
    stories.js         # données de démo des stories
    posts.js            # données de démo du feed (avec commentaires)
    suggestions.js       # comptes suggérés (panneau droit)
    notifications.js     # notifications de démo
  index.css           # tous les styles + media queries responsive (mobile/desktop)
  App.jsx             # état global (posts, panneaux, modales) et mise en page
  main.jsx
```

## Personnaliser

- Remplacez les URLs d'avatars/médias dans `src/data/stories.js` et `src/data/posts.js` par vos propres images/vidéos.
- Les couleurs des deux thèmes sont dans `src/index.css` sous `:root` (clair) et `[data-theme='dark']` (sombre).
- La largeur max de l'app mobile est réglable via `--ig-max-width` dans `index.css`.
