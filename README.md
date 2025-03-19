# **Spotify Mood-Based Music Explorer**  

## **Overview**  
Spotify Mood-Based Music Explorer is a web application that helps users discover playlists and songs based on their mood. It integrates with the **Spotify API** to fetch playlists related to user input, providing a seamless music exploration experience.  

---

## **Features**  

- **Mood-Based Playlist Search:** Users can enter their mood (e.g., happy, sad, energetic) to get relevant Spotify playlists.  
- **Track Listings:** Displays songs from selected playlists.  
- **Direct Spotify Links:** Users can open playlists and songs directly in Spotify.  
- **Interactive UI:** A visually appealing and responsive design for easy navigation.  
- **Dynamic Mood Search:** Users can refine their search in real-time to explore different moods.  

---

## **Tech Stack**  

| Component       | Technology Used          |
|----------------|-------------------------|
| **Frontend**    | React.tsx                 |
| **State Management** | useState, useEffect (React Hooks) |
| **UI Components** | Tailwind CSS |
| **Backend API** | Spotify Web API |

---

## **Setup & Installation**  

### **1. Clone the Repository**  
```
git clone https://github.com/darshan1328/spotify-api.git
```

### **2. Install Dependencies**  
```
npm install
```

### **3. Get Spotify API Credentials**  
- Go to the **[Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications)**.  
- Create a new app and retrieve the **Client ID** and **Client Secret**.  
- Replace the credentials in `SpotifyMoodApp.js`:  
```js
const CLIENT_ID = "your_client_id";
const CLIENT_SECRET = "your_client_secret";
```

### **4. Run the Application**  
```
npm run dev
```


---

## **API Endpoints Used**  

| API Endpoint | Description |
|-------------|-------------|
| **`POST /api/token`** | Fetches the access token using client credentials. |
| **`GET /v1/search?q={mood}&type=playlist`** | Searches for playlists based on user mood. |
| **`GET /v1/playlists/{playlist_id}/tracks`** | Retrieves songs from the selected playlist. |

---


## **Usage Instructions**  

1. **Enter a Mood:** Type in a mood (e.g., "relaxed", "energetic", "happy").  
2. **Search Playlists:** Click the **Search** button to fetch mood-based playlists.  
3. **View Tracks:** Click on a playlist to view its songs.  
4. **Listen on Spotify:** Click the **"Listen on Spotify"** button to open the track or playlist in Spotify.  

---

## **Future Enhancements**  

- **Spotify Login:** Allow users to log in and get personalized recommendations.  
- **Real-Time Mood Detection:** Use **NLP sentiment analysis** to automatically detect mood.  
- **Spotify Web Playback SDK Integration:** Enable in-app song playback.  

---

## **Contributing**  
Contributions are welcome! If you’d like to improve the app, feel free to submit a pull request.  

---
![Screenshot 2025-03-17 192631](https://github.com/user-attachments/assets/77e60c09-e0d4-431b-b572-2f04324baa36)





**🎶 Enjoy exploring music that matches your mood! 🚀🎧**  
