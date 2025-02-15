### To start the project locally with docker follow the steps below:

1. Clone the repository
2. `cd ../backend`
3. `cp .env.example .env` & fill credentials
4. Run `docker-compose up` in the root directory
5. Run db migrations and seeders

- `cd backend`
- `npm install`
- `npm run db:migrate && npm run db:seed`

8.Open your browser and go to `http://localhost:8080/`

9.Enjoy!

### BE [To run locally]

1. `cd backend`
2. `cp .env.example .env` fill credentials
3. `npm install`
4. `npm run db:migrate && npm run db:seed`
5. `npm run build && npm run start`

you can import the postman collection from `docs/postman_collection.json`

### FE [To run locally]

1. `cd frontend`
2. `cp .env.example .env` fill credentials
3. `npm install`
4. `npm run dev`



note: For system entering use login: admin@admin.com password: Password1*
