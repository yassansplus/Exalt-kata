# eXalt IT NodeJS Dojo

## How-to

Livraison via un repo publique`gitlab`, `github` ou `bitbucket` de votre choix 😊


## En fonction de votre niveau technique

[La correction de plusieurs json sources de données \(niveau junior\)](/data_correction_junior)

Ou, plus difficile, le [parsing d'un fichier volumineux sous contrainte de mémoire \(niveau confirmé\)](/bigparsing_confirmed)


Au plaisir de lire votre code !

# Salut eXalt IT
## junior
Dans le dossier  ```data_correction_junior``` pour executer le code on tapera en ligne de comande:

Une seule fois (installation des dépendances):
```bash
$ yarn install  
```
Pour executer le code
```bash
$ node index.js  
```
et pour les tests:
```bash
yarn jest
```

## confirmé
Dans le dossier  ```bigparsing_confirmed``` pour executer le code on tapera en ligne de comande:

Une seule fois (installation des dépendances):
```bash
$ yarn install  
```
Pour executer le code (on mettra l'id voulu dans le dernier paramère)
```bash
$ node --max_old_space_size=50 solution.js 62359
> Damon Jerde
```
Bonne lecture :smile_cat: 
