# Swifty Companion 📱

## 📝 Project Overview

**Swifty Companion** is a mobile application developed as part of the 42 school curriculum. The goal is to build an interface that retrieves and displays detailed information about 42 students using the **42 API**. The app focuses on seamless navigation, real-time data fetching, and a modern UI that adapts to various screen sizes.

## 🛠 Tech Stack

* **Framework:** React Native with Expo 56
* **Language:** TypeScript
* **Data Fetching:** TanStack Query (Caching and server-state management)
* **API Client:** Axios with centralized OAuth2 token management


## 🚀 Technical Notions Applied

* **OAuth2 Authentication:** Implementation of the `client_credentials` flow to communicate securely with the 42 API
* **Atomic Architecture:** Breakdown of the UI into reusable components (Badge, Level, ProjectCard, etc.)
* **State & Cache Management:** Optimized performance and reduced API calls using TanStack Query
* **Responsive Design:** Flexible layouts ensuring the interface displays correctly on different mobile platforms
* **Error Handling:** Comprehensive management of edge cases, including "login not found," network issues, and API rate limits



## 🎨 Design & Prototyping

The application was fully designed in **Figma** prior to development to ensure visual consistency and an optimal user experience.

<p>
  <img src="https://imgur.com/HRUyS6Z.png" alt="view1" height="400" style="display:inline-block;">
  <img src="https://imgur.com/MQ3wdp4.png" alt="view2" height="400" style="display:inline-block;">
</p>


## 📋 Mandatory Part

* **Student Search:** Search for any 42 user by their login
* **User Details:** Display of at least four key details: Login, Email, Correction Points, Wallet, and Profile Picture
* **Skills Visualization:** Display of user skills with levels and percentage bars
* **Project History:** List of all completed projects, including successful and failed ones
* **Navigation:** Ability to navigate back to the search view at any time


## 🌟 Bonus

**Token Auto-Refresh:** The application automatically recreates the token upon expiration, ensuring uninterrupted service.


## 💻 Installation

1. Clone the repository: `git clone https://github.com/juhanse/42-swifty-companion`
2. Install dependencies: `npx expo install`
3. Set up your `.env` file with your 42 API `UID` and `SECRET`, as shown in the `.env.example` file
4. Start the project: `npx expo start`

In compliance with the subject's security requirements, all credentials and API keys are stored locally in an `.env` file and ignored by Git.
