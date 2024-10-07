# Comandos Git
## Paso 1:
Tener la carpeta sin git.

## Paso 2:
```bash
git init 
```
dentro de la carpeta en donde se trabajará.
<br>
Una vez que se inicie el repositorio, ya estamos listos para empezar a versionar los diversos cambios que usted haga. Estos se separan en tres fases:
<br>

## Paso 3:
Guardar los cambios realizados
```bash
git add .
git add -A
git add <archivo>
``` 

## Paso 4:
Realizar el commit
```bash
git commit -m “mensaje”
```

##Paso 5:
Agregar el remote del github:
```bash
git remote add <alias> <enlace>
```

## Paso 6:
Realizar la rama:
```bash
git branch <nombre rama>
```
## Paso 7:
Subir los cambios a la rama creada, con el nombre que le pusieron al remote:
```bash
git push <alias> <rama>
```

