# test-api
 
Pegar el archivo ```.env ``` dentro de la carpeta ```src``` <br>
Si desea utilizar una bd local cambiar la información del archivo <br>


Si se opta por utilizar una bd local modificar el usuario y contraseña del archivo <br>
```databse/db.ts``` <br>
Si no dejarlo con la conexión actual <br>

Ejecutar el comando para instalar todas las librerias del proyecto <br>
```
npm install 
```

Ejecutar el comando para  postgressql
```
npm install --save pg pg-hstore
```

Ejecutar el comando para migrar las tablas user y parkings en caso de tener una bd local. <br>
Puede utilizar la que esta configurada por default en el ```.env``` con aws y ya tiene las tablas creadas
Y no es necesaria la migración, <br>

Primero nos posicionamos dentro de la carpeta ```src``` <br>
```cd src```

Luego ejecutamos la migracion para crear las tablas en la bd solo si esta utilizando una bd local <br>
```sequelize db:migrate```

Ejecutar el proyecto en modo dev <br>
```npm run dev``` 

Abrir en su navegador
```http://localhost:3000/api-parco```

Te aparecerá una ventana de swagger con todos los endpoints