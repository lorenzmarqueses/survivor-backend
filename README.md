# Documentation

## Requirements

To run this application using Docker, you need to have the following installed on your system:

- **Docker**: Ensure you have Docker installed. You can download and install Docker from [here](https://www.docker.com/products/docker-desktop).
 
- **docker-compose.yml**: Ensure you have a `docker-compose.yml` file in the root directory of your project. This file should contain the necessary instructions to build and run your Docker services.

Make sure to replace any placeholder values in your `docker-compose.yml` file with the appropriate values for your setup.
## Environment Variables

Before running the application, you need to set up your environment variables. Follow these steps:

1. **Copy `.env.example` to `.env`**:
  In the root directory of your project, you will find a file named `.env.example`. Copy this file and rename the copy to `.env`:
  ```sh
  cp .env.example .env
  ```
  This file contains example environment variables that you can customize according to your setup.

## How to Run

To run this application using Docker, follow these steps:

1. **Run Docker Compose**:
  Navigate to the directory containing your `docker-compose.yml` file and run the following command to start the application:
  ```sh
  docker compose up
  ```
  This command will start all the services defined in your `docker-compose.yml` file.
