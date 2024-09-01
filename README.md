# Chess Backend

This project is the backend for a chess application, developed as a coding assignment for CodeMe by Unumandakh Bayandelger.

## Folder Structure

- **src/**: Contains the main source code.
  - **dictionaries/**: Includes utilities for checking chess board columns, rows, diagonals, etc.
  - **models/**: Contains models for chess pieces.
  - **services/**: Business logic for the application.
  - **utils/**: Utility functions and helpers.
  - **types/**: TypeScript type definitions used across the project.
  - **socketHandler.ts**: Handles WebSocket connections using Socket.io.
  - **gameManager.ts**: Manages the state of the game.
  - **app.ts**: Initializes the application and sets up middleware.

## Technologies Used

- **Express**: Web framework for building the API.
- **Socket.io**: For real-time communication.
- **TypeScript**: For static type checking and improved code quality.

## Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-repo/chess-backend.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd codeme-assignment-backend
   ```

3. **Install Dependencies**

   ```bash
   yarn install
   ```

4. **Build the Project**

   ```bash
   yarn build
   ```

5. **Add .env file for CORS**

   ```bash
   CLIENT_CORS=http://localhost:3000
   PORT=8000
   ```

6. **Run the Project**

   ```bash
   yarn start
   ```

## Deployment

Frontend: https://codeme-assignment.vercel.app/
(2 players required to play)
Backend: Deployed on Google Run.

## Known Issues

- Only white's perspective is currently supported for both players.
- Checkmate functionality is not working properly.

## Contact

For any questions or feedback, please reach out to unumandakh.b@gmail.com.
