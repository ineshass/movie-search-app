# Movie Search App

A simple React app to search for movies using an external API.

## Features

- Search movies by title
- View detailed information about selected movies
- Responsive design
- Google OAuth login (optional)

## Installation

1. Clone the repository:

git clone https://github.com/ineshass/movie-search-app.git

2.Go into the project folder:

cd movie-search-app

3.Install dependencies:

npm install

4.Create a .env file in the root folder and add your API keys or environment variables:

REACT_APP_API_KEY=your_api_key_here

5.Start the app locally:

npm start

## Usage
Open the app in your browser or the port you're using.

Use the search bar to find movies.

Click on a movie to see more details.

## Notes

Make sure .env is included in .gitignore to avoid pushing sensitive data.

If Google login doesn’t work, open your Google Cloud Console:

Go to APIs & Services > Credentials.

Select your OAuth 2.0 Client ID.

Under Authorized JavaScript origins, add your local address (e.g., http://localhost:5173).

Save the changes and refresh your app.

## Technologies Used
React

JavaScript

CSS

[API you use, e.g., OMDb API]











