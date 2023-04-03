# test-api
 
Pegar el archivo ```.env ``` en la raiz <br>


Ejecutar el comando para instalar todas las librerias del proyecto <br>
```
npm install 
```

Ejecutar el comando para  postgressql
```
npm install --save pg pg-hstore
```

Ejecutar el comando para migrar las tablas user y parkings en caso de tener una bd local. <br>

Primero nos posicionamos dentro de la carpeta ```src``` <br>
```cd src```

Luego ejecutamos la migracion para crear las tablas en la bd solo si esta utilizando una bd local <br>
```sequelize db:migrate```

Ejecutar el proyecto en modo dev <br>
```npm run dev``` 

Abrir en su navegador
```http://localhost:3000/api-parco```

Te aparecerá una ventana de swagger con todos los endpoints
