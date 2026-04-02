# Weather Dashboard

## Description

A simple, responsive web application that allows users to search for current weather information by city name. Built with vanilla HTML, CSS, and JavaScript, it fetches data from the OpenWeatherMap API and displays temperature, humidity, wind speed, and weather conditions.

![Screenshot](screenshot.png) <!-- Add a screenshot if available -->

Live demo: [https://weatherapplication-sooty.vercel.app/](https://weatherapplication-sooty.vercel.app/)

## Features

- Search weather by city name
- Displays:
  - Temperature (°C)
  - Humidity (%)
  - Wind speed (m/s)
  - Weather condition description
- Responsive design with gradient background
- Error handling for invalid cities or API issues

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **API**: [OpenWeatherMap](https://openweathermap.org/api) (Current Weather API)
- **Deployment**: Static hosting (e.g., Vercel, Netlify, GitHub Pages)

## Prerequisites

- A free API key from [OpenWeatherMap](https://openweathermap.org/api) (sign up and get your key from the API keys section)

## Setup & Installation

1. Clone or download this repository:
   ```
   git clone <your-repo-url>
   cd Weather
   ```
2. Create a `.env` file in the `Weather/` directory (or copy from `.env.example` if provided):
   ```
   API_KEY=your_openweathermap_api_key_here
   ```
   Replace `your_openweathermap_api_key_here` with your actual API key.
3. Open `index.html` directly in a web browser (no server required).

**Note on API Key**:

- The `script.js` uses `require('dotenv').config()` which is Node.js syntax and **will not work** in browsers (causes silent failure).
- For local development/production:
  - **Option 1 (simple, local only)**: Replace `process.env.API_KEY` with your raw API key string in `script.js` (not secure for public deploy).
  - **Option 2 (production)**: Use a backend proxy (e.g., Vercel serverless function) to hide the API key.
  - **Option 3**: Input API key via UI or CORS proxy.

## Usage

1. Open `index.html` in your browser.
2. Enter a city name (e.g., "London", "New York") in the search box.
3. Click **Search**.
4. View the weather results below.

Example:

- City: Paris → Temperature: 22°C, Humidity: 65%, etc.

## File Structure

```
Weather/
├── index.html      # Main HTML structure and UI
├── style.css       # Responsive styling with gradient background
├── script.js       # Fetch logic and API integration
├── .env           # API key (ignored by git)
├── .gitignore     # Ignores .env
└── README.md      # This file
```

## Development

- Edit `style.css` for custom themes.
- Enhance `script.js` for forecasts (`/forecast`), geolocation, or multiple cities.
- Add icons using OpenWeatherMap icon URLs: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

## Deployment

1. Push to GitHub.
2. Deploy to:
   - [Vercel](https://vercel.com) (drag/drop or CLI)
   - [Netlify](https://netlify.com)
   - [GitHub Pages](https://pages.github.com)
3. **Important**: Use a proxy for API key in production!

## Troubleshooting

- **No data shown**: Check console (F12) for errors. Verify API key and city spelling.
- **CORS error**: API supports browser calls; ensure valid key.
- **dotenv fail**: See note above.

## Improvements (Todos)

- [ ] Fix dotenv for browser or add key input
- [ ] Add weather icons
- [ ] Support forecasts (5-day)
- [ ] Geolocation auto-detect
- [ ] Unit toggle (°C/°F)
- [ ] History of searches
- [ ] Dark mode toggle

## License

MIT License - feel free to use and modify!

---

**Built with ❤️ using OpenWeatherMap API**
