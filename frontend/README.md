# Exercice: Suivi de la Qualité de l'Air avec un Dashboard Dynamique
## Présentation de l'exercice
### Objectif
- L'objectif de cet exercice est de développer un dashboard interactif permettant de suivre la qualité de l'air dans différentes villes du monde, en utilisant des données récupérées via une API et affichées graphiquement à l’aide de ChartsJS.

- Partie de gauche : une map `leaflet` qui affiche Paris.
- Partie de droite : un chart `chartsjs` au format `line` qui affiche le taux de CO sur les derniers jours.

## Étapes Importantes
### 1. Exploration de l'API
- Choisissez et explorez une API fournissant des données sur la qualité de l'air (par exemple, OpenAQ).
- Familiarisez-vous avec les endpoints, les paramètres et les données retournées.
### 2. Planification de l'UI/UX
- Ébauchez le design de votre dashboard.
- Identifiez les informations clés à afficher et comment les présenter visuellement.
### 3. Configuration de l'Environnement de Développement
- Mettez en place votre environnement de développement (éditeur de texte, navigateur, terminal, etc.).
- Initialisez un projet avec npm ou yarn, et installez les dépendances nécessaires (ChartsJS, Axios, etc.).
### 4. Récupération des Données
- Utilisez Axios ou Fetch pour récupérer les données de l'API et traitez-les pour les adapter à vos besoins.
### 5. Création des Graphiques avec ChartsJS
- Créez des graphiques (barres, lignes, etc.) pour représenter visuellement les données de qualité de l’air.
- Assurez-vous que les graphiques sont lisibles et informatifs.
### 6. Affichage de la map
- Affichez la map dans la div#map correspondante grâce au plugin `leaflet`
### 7. Click sur la map et actualisation
- Lorsque vous cliquez sur la map, vous devez récupérer la `latitude` et la `longitude` et relancer le calcul de votre `chartsjs`.
### 8. Test de l'Application
- Testez votre application sur différents navigateurs et appareils.
Corrigez les éventuels bugs et optimisez les performances si nécessaire.
### 9. Documentation du Code
- Commentez votre code de manière claire et concise pour faciliter la compréhension et la maintenance.
### 10. Déploiement
- Déployez votre application sur une plateforme de votre choix (Vercel, Netlify, GitHub Pages, etc.) et assurez-vous qu'elle fonctionne correctement en production.

## Ressources Externes
- [ChartsJS Documentation](https://www.chartjs.org/docs/latest/)
- [Leaflet Documentation](https://leafletjs.com/reference.html)
- [OpenWeather API Documentation](https://openweathermap.org/api/air-pollution)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [MDN Web Docs](https://developer.mozilla.org/)



## Notes Finales
- Veillez à respecter les bonnes pratiques de développement et de design tout au long du projet. Bon développement et amusez-vous à coder !