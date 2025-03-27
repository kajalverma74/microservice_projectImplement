Order Service - Node.js API
This is a Node.js Order Service API that handles order creation, sends email notifications using Nodemailer, and publishes order events to Kafka.
  *** Tech Stack
Node.js
Express.js
MySQL (For storing orders)
Kafka (For event-driven notifications)
Nodemailer (For sending emails)
Axios (For fetching user details from User Service)
Dotenv (For environment variables)

**************** 📂 Project Structure ***********************
/order-service
 ├── service/
 │   ├── kafkaProducer.js  # Kafka event producer
 ├── routes/
 │   ├── orderRoutes.js    # Order-related routes
 ├── controllers/
 │   ├── orderController.js  # Order handling logic
 ├── models/
 │   ├── Order.js  # Sequelize model for Order
 ├── .env    # Environment variables
 ├── server.js  # Main entry point
 ├── README.md  # Documentation

     *************
📦 notification-service/
 ┣ 📂 services/
 ┃ ┣ 📜 emailService.js
 ┃ ┣ 📜 kafkaProducer.js
 ┣ 📂 controllers/
 ┃ ┣ 📜 notificationController.js
 ┣ 📂 routes/
 ┃ ┣ 📜 notificationRoutes.js
 ┣ 📂 config/
 ┃ ┣ 📜 kafkaConfig.js
 ┣ 📜 server.js
 ┣ 📜 package.json
 ┣ 📜 .env
 ┣ 📜 README.md

    ***************
📦 product-service/
 ┣ 📂 models/
 ┃ ┣ 📜 category.js
 ┃ ┣ 📜 subcategory.js
 ┃ ┣ 📜 associations.js
 ┣ 📂 services/
 ┃ ┣ 📜 categoryService.js
 ┃ ┣ 📜 subcategoryService.js
 ┣ 📂 controllers/
 ┃ ┣ 📜 categoryController.js
 ┃ ┣ 📜 subcategoryController.js
 ┣ 📂 routes/
 ┃ ┣ 📜 categoryRoutes.js
 ┃ ┣ 📜 subcategoryRoutes.js
 ┣ 📂 config/
 ┃ ┣ 📜 dbConfig.js
 ┣ 📜 server.js
 ┣ 📜 package.json
 ┣ 📜 .env




