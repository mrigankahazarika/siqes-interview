# siqes-interview
service managemnt react laravel
git read me file

Note : 
As no component library like mui or shadcn was used , the ui looks dull.
i didnt focused on styling or ux to save time .
the core functionality is working fine .

I can EVen share a new ui design for it if i use a component lirbary like shadcn or mui . i will make the design look better with it
like this demo image, built with shadcn library
https://freeimage.host/i/fbc8E6Q



admin panel path admin/interview-task



setup:-

1) npm install to install packages and node modules
2) rename the env.example to .env file
3) run the project runnign command npm run dev on url http://localhost:5173/



backend laravel : 

laravel version 12.0
php version 8.2

folder-dir = backend/service-pro-test 
setup

1) on  this dir , first run `composer Update` to update the project's dependencies

2) create and env file or rename the .en.example to .env

3) add a database name to DB_DATABASE=laravel-interview on env , like this

4) then run some artisan command

a) after changing env file , we must use this command
    ```php artisan config:clear```

b) php artisn migrate (to create the database )
    ```php artisan migrate```

c) php artisan db:seed to seed the user default data 
    stored in database/seeders/DatabseSeeder
    ```php artisan db:seed```
d) lastly run ```php artisan optimize```

```php artisan optimize:clear```

to freshly start the project .
it will run on url http://127.0.0.1:8000 make sure the react env also has this laravels url on env as REACT_APP_BASE_URL (and for image load VITE_API_BASE_URL_IMAGE)


------------------------ROutes list------------------


  GET|HEAD        / <br>
  GET|HEAD        api/auth/logs -> Admin\LogsController@index <br>
  GET|HEAD        api/auth/me -› Admin\AuthenController@me <br>
  PATCH           api/auth/me -› Admin\AuthenController@updateProfile <br>
  GET|HEAD        api/auth/service_request  -› Admin\ServciceRequestController@index <br>
  POST            api/auth/service_request -› Admin\ServciceRequestController@store <br>
  GET|HEAD        api/auth/service_request/types -› Admin\ServciceRequestController@getTypesx <br>
  GET|HEAD        api/auth/service_request/{service_request}   -› Admin\ServciceRequestController@show <br>
  PUT|PATCH       api/auth/service_request/{service_request}   -› Admin\ServciceRequestController@update <br>
  DELETE          api/auth/service_request/{service_request}   -› Admin\ServciceRequestController@destroy <br>
  GET|HEAD        api/auth/test <br>
  POST            api/login  -> login › Admin\AuthenController@login <br>
  GET|HEAD        storage/{path} ................................. storage.local <br>
  GET|HEAD        up ....................................................... generated::Gjh2LV2Ylpr282ke <br>

                     
