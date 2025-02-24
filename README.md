## Shoe-Store
El proyecto consta de dos entidades principales: Zapatos y Ventas. La entidad Zapato almacena los detalles de los zapatos, incluyendo el nombre, la marca, talla, precio y stock disponible. La entidad Venta gestiona las transacciones de venta, donde cada venta está vinculada a un zapato.

1. Clonar el proyecto<br><br>
2. ```` yarn install```` <br><br>
3. Clonar el archivo ````.env.template```` y renombrarlo a ```.env```<br><br>
5. Instalar las dependencias
```
yarn add @nestjs/config 
yarn add typeorm @nestjs/typeorm mysql2
yarn add class-validator class-transformer
```

6. Levantar la base de datos
```
 docker-compose up -d
```
7. Levantar proyecto 
```
yarn start:dev
```