﻿# Online shop

## Tech stack

### Frontend

- **Angular v18** - otwarty framework i platforma do tworzenia SPA, napisany w języku TypeScript.
- **Angular Signals** – mechanizm reaktywnego zarządzania stanem w Angularze, umożliwiający bardziej wydajne i precyzyjne aktualizacje widoku.
- **RxJS** – biblioteka do programowania reaktywnego, pozwalająca na łatwe zarządzanie operacjami asynchronicznymi i strumieniami danych.

### Backend

- **SQLAlchemy** - pythonowe narzędzie do pracy z bazami danych a także ORM udostępniający całą funkcjonalność SQL bez konieczności pisania surowych zapytań. 
(**ORM** - opcjonalny komponent pozwalający opisać za pomocą klas tabele w bazie danych)
- **FastAPI** - nowoczesny, wydajny framework webowy do budowania API z użyciem Pythona bazujący na standardowym typowaniu Pythona.
- **PostgreSQL** – zaawansowany system zarządzania relacyjnymi bazami danych, oferujący wysoką wydajność, transakcyjność oraz wsparcie dla złożonych typów danych.

## Database

1. Open an interactive Bash shell inside the fastapi-postgres Docker container:
   **`docker exec -it fastapi-postgres bash`**
1. Connect to `fastapi_database` as `myuser` in `psql`:
   **`psql -U myuser -d fastapi_database`**
1. Lists all tables:
   **`\dt`**
1. Users test table preview:
![table users img](./frontend/public/assets/readme/table-users-db.png)

## Design preview

<video loop autoplay src="https://github.com/user-attachments/assets/04a7b2e3-e8e7-4cfb-be53-481f491ec5bf"></video>
![auth-preview](https://github.com/user-attachments/assets/a27d38f5-3ad8-45e0-a3d1-2d3875d58946)

### Login/Register

![login1 img](./frontend/public/assets/readme/login1.png)
![register1 img](./frontend/public/assets/readme/register1.png)
![login2 img](./frontend/public/assets/readme/login2.png)
![register2 img](./frontend/public/assets/readme/register2.png)

### Home

![home page img](./frontend/public/assets/readme/home-page.png)

### Home cont.

![home page 2 img](./frontend/public/assets/readme/home-page2.png)


## Swagger

![fastapi img](./frontend/public/assets/readme/fastapi.png)
