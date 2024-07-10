# GitHub API Project

This project is a full-stack application built with Node.js, Express.js, React, and Redux to interact with the GitHub API.

## Features

### Backend API Features:
- Save GitHub User Data: Accepts any GitHub username and saves details fetched from the GitHub API into the database. If the data is already available, it skips the API call.
- Find Mutual Friends: Identifies mutual followers/following relationships between users and saves them as friends in the database.
- Search and Soft Delete: Supports searching and soft deletion of records based on username.
- Update User Data: Allows updating fields like location, blog, bio, etc., for a given user in the database.
- Sorting Users: Returns a sorted list of users based on various GitHub metrics.

### Frontend Features:
- Search GitHub User: Initial page with an input box to search for a GitHub username and display repositories.
- Repository Details: Displays repository details on click of a repository from the search results.
- Followers Page: Provides a link to view followers of the current user and navigate to their repository list.
- Navigation: Allows navigation back to the repository list page with the input box.

## Tech Stack

### Backend:
- Node.js
- Express.js
- Database: (Specify your database choice)

### Frontend:
- React
- Redux (optional)
- Axios for API requests

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jauhar4563/GitHubApiProject.git
   2. Install dependencies:
   ```bash
   cd GitHubApiProject
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Define environment variables such as `PORT`, `DATABASE_URL`, etc.

4. Run the application:
   ```bash
   npm start
   ```

## API Endpoints

- `POST /api/user/`: Saves GitHub user data into the database.
- `GET /api/friends/`: Retrieves mutual friends of a user based on GitHub followers/following.
- `PUT /api/user/`: Updates user data (location, blog, bio) in the database.
- `DELETE /api/user/`: Soft deletes a user record from the database.
- `GET /api/users`: Retrieves a sorted list of users from the database based on GitHub metrics.

## Frontend Components

- **Home Component**: Initial page with input box to search for GitHub usernames.
- **RepositoryList Component**: Displays repositories of a GitHub user.
- **RepositoryDetail Component**: Shows details of a selected repository.
- **Followers Component**: Lists followers of the current GitHub user.

## Future Improvements

- Implement frontend validation for API endpoints.
- Enhance UI/UX with more intuitive designs.
- Optimize API calls and database queries for performance.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
