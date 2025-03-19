import React, { useState, useEffect } from "react";
import { Music2, Search, ExternalLink, Loader2 } from "lucide-react";

const CLIENT_ID = "YOUR_CLIENT_ID";
const CLIENT_SECRET = "YOUR_CLIENT_SECRET";

const SpotifyMoodApp = () => {
  const [token, setToken] = useState("");
  const [mood, setMood] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    })
      .then((res) => res.json())
      .then((data) => setToken(data.access_token));
  }, []);

  const searchPlaylists = async () => {
    if (!mood) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${mood}&type=playlist&limit=5`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setPlaylists(data.playlists ? data.playlists.items.filter((p) => p) : []);
      setSongs([]);
      setSelectedPlaylist(null);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSongs = async (playlistId) => {
    setIsLoading(true);
    setSelectedPlaylist(playlistId);
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setSongs(
        data.items
          ? data.items.filter((item) => item.track).map((item) => item.track)
          : []
      );
    } catch (error) {
      console.error("Error fetching songs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-12">
          <Music2 className="w-10 h-10 text-green-500 mr-4" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Mood Music Explorer
          </h1>
        </div>

        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Enter your mood (e.g., happy, relaxed, energetic)"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full px-6 py-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg placeholder-gray-500 transition-all duration-300"
            onKeyPress={(e) => e.key === "Enter" && searchPlaylists()}
          />
          <button
            onClick={searchPlaylists}
            disabled={isLoading || !mood}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-green-500 hover:bg-green-600 rounded-md flex items-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Search
              </>
            )}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Playlists</h2>
            {playlists.map(
              (playlist) =>
                playlist && (
                  <div
                    key={playlist.id}
                    onClick={() => fetchSongs(playlist.id)}
                    className={`p-4 rounded-lg backdrop-blur-lg bg-white/10 cursor-pointer transform transition-all duration-300 hover:scale-102 hover:bg-white/20 ${
                      selectedPlaylist === playlist.id
                        ? "ring-2 ring-green-500"
                        : ""
                    }`}
                  >
                    <div className="flex items-start">
                      {playlist.images?.[0]?.url && (
                        <img
                          src={playlist.images[0].url}
                          alt={playlist.name}
                          className="w-16 h-16 rounded-md mr-4 object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{playlist.name}</h3>
                        <p className="text-sm text-gray-400">
                          {playlist.tracks?.total || 0} tracks
                        </p>
                        <a
                          href={playlist.external_urls?.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-green-500 hover:text-green-400 mt-2 text-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Open in Spotify
                        </a>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>

          <div className="space-y-4">
            {selectedPlaylist && (
              <h2 className="text-xl font-semibold mb-4">Songs</h2>
            )}
            {songs.map(
              (song) =>
                song && (
                  <div
                    key={song.id}
                    className="p-4 rounded-lg backdrop-blur-lg bg-white/10 transform transition-all duration-300 hover:bg-white/20"
                  >
                    <div className="flex items-start">
                      {song.album?.images?.[0]?.url && (
                        <img
                          src={song.album.images[0].url}
                          alt={song.name}
                          className="w-16 h-16 rounded-md mr-4 object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{song.name}</h3>
                        <p className="text-sm text-gray-400">
                          {song.artists?.map((a) => a.name).join(", ")}
                        </p>
                        <a
                          href={song.external_urls?.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-green-500 hover:text-green-400 mt-2 text-sm"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Listen on Spotify
                        </a>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotifyMoodApp;
