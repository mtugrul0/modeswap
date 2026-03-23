import requests
import time

tracks = [
  {"id": 1, "title": "Master of Puppets", "artist": "Metallica", "album": "Master of Puppets", "vibe": "aggressive", "bpm": 212, "year": 1986},
  {"id": 2, "title": "Du Hast", "artist": "Rammstein", "album": "Sehnsucht", "vibe": "aggressive", "bpm": 135, "year": 1997},
  {"id": 3, "title": "Snuff", "artist": "Slipknot", "album": "All Hope Is Gone", "vibe": "melancholic", "bpm": 74, "year": 2008},
  {"id": 4, "title": "Wish You Were Here", "artist": "Pink Floyd", "album": "Wish You Were Here", "vibe": "melancholic", "bpm": 63, "year": 1975},
  {"id": 5, "title": "Run to the Hills", "artist": "Iron Maiden", "album": "The Number of the Beast", "vibe": "energetic", "bpm": 190, "year": 1982},
  {"id": 6, "title": "Highway to Hell", "artist": "AC/DC", "album": "Highway to Hell", "vibe": "party", "bpm": 116, "year": 1979},
  {"id": 7, "title": "Nothing Else Matters", "artist": "Metallica", "album": "Metallica (Black Album)", "vibe": "chill", "bpm": 69, "year": 1991},
  {"id": 8, "title": "Black", "artist": "Pearl Jam", "album": "Ten", "vibe": "sad", "bpm": 72, "year": 1991},
  {"id": 9, "title": "Chop Suey!", "artist": "System of a Down", "album": "Toxicity", "vibe": "aggressive", "bpm": 127, "year": 2001, "tiebreaker": True},
  {"id": 10, "title": "Sweet Child O' Mine", "artist": "Guns N' Roses", "album": "Appetite for Destruction", "vibe": "party", "bpm": 125, "year": 1987, "tiebreaker": True},
  {"id": 11, "title": "Hotel California", "artist": "Eagles", "album": "Hotel California", "vibe": "chill", "bpm": 75, "year": 1976, "tiebreaker": True},
  {"id": 12, "title": "Creep", "artist": "Radiohead", "album": "Pablo Honey", "vibe": "melancholic", "bpm": 92, "year": 1993, "tiebreaker": True},
  {"id": 13, "title": "Nutshell", "artist": "Alice in Chains", "album": "Jar of Flies", "vibe": "sad", "bpm": 76, "year": 1994},
  {"id": 14, "title": "The Sound of Silence", "artist": "Simon & Garfunkel", "album": "Wednesday Morning, 3 A.M.", "vibe": "sad", "bpm": 76, "year": 1964},
  {"id": 15, "title": "Enter Sandman", "artist": "Metallica", "album": "Metallica", "vibe": "energetic", "bpm": 123, "year": 1991},
  {"id": 16, "title": "Ace of Spades", "artist": "Motörhead", "album": "Ace of Spades", "vibe": "energetic", "bpm": 140, "year": 1980},
  {"id": 17, "title": "Black Hole Sun", "artist": "Soundgarden", "album": "Superunknown", "vibe": "dark", "bpm": 86, "year": 1994},
  {"id": 18, "title": "Paint It Black", "artist": "The Rolling Stones", "album": "Aftermath", "vibe": "dark", "bpm": 160, "year": 1966},
  {"id": 19, "title": "Don't Stop Me Now", "artist": "Queen", "album": "Jazz", "vibe": "euphoric", "bpm": 156, "year": 1978},
  {"id": 20, "title": "Jump", "artist": "Van Halen", "album": "1984", "vibe": "euphoric", "bpm": 130, "year": 1984},
  {"id": 21, "title": "More Than Words", "artist": "Extreme", "album": "Pornograffitti", "vibe": "romantic", "bpm": 92, "year": 1990},
  {"id": 22, "title": "Wonderful Tonight", "artist": "Eric Clapton", "album": "Slowhand", "vibe": "romantic", "bpm": 72, "year": 1977},
  {"id": 23, "title": "Killing in the Name", "artist": "Rage Against the Machine", "album": "Rage Against the Machine", "vibe": "rebellious", "bpm": 89, "year": 1992},
  {"id": 24, "title": "Anarchy in the U.K.", "artist": "Sex Pistols", "album": "Never Mind the Bollocks", "vibe": "rebellious", "bpm": 132, "year": 1977},
  {"id": 25, "title": "Fade to Black", "artist": "Metallica", "album": "Ride the Lightning", "vibe": "sad", "bpm": 70, "year": 1984, "tiebreaker": True},
  {"id": 26, "title": "Back in Black", "artist": "AC/DC", "album": "Back in Black", "vibe": "energetic", "bpm": 94, "year": 1980, "tiebreaker": True},
  {"id": 27, "title": "Creep", "artist": "Radiohead", "album": "Pablo Honey", "vibe": "dark", "bpm": 92, "year": 1993, "tiebreaker": True},
  {"id": 28, "title": "We Will Rock You", "artist": "Queen", "album": "News of the World", "vibe": "euphoric", "bpm": 82, "year": 1977, "tiebreaker": True},
  {"id": 29, "title": "November Rain", "artist": "Guns N' Roses", "album": "Use Your Illusion I", "vibe": "romantic", "bpm": 74, "year": 1991, "tiebreaker": True},
  {"id": 30, "title": "Smells Like Teen Spirit", "artist": "Nirvana", "album": "Nevermind", "vibe": "rebellious", "bpm": 117, "year": 1991, "tiebreaker": True},
  {"id": 31, "title": "Silver", "artist": "Woods of Ypres", "album": "Woods 5: Grey Skies & Electric Light", "vibe": "melancholic", "bpm": 120, "year": 2012},
  {"id": 32, "title": "Finality", "artist": "Woods of Ypres", "album": "Woods 5: Grey Skies & Electric Light", "vibe": "melancholic", "bpm": 80, "year": 2012},
  {"id": 33, "title": "Lightning & Snow", "artist": "Woods of Ypres", "album": "Woods 5: Grey Skies & Electric Light", "vibe": "aggressive", "bpm": 145, "year": 2012},
  {"id": 34, "title": "Bira (Tombul)", "artist": "Kaptan Kadavra", "album": "Kaptan Kadavra", "vibe": "aggressive", "bpm": 180, "year": 2022},
  {"id": 35, "title": "Sert Cisim", "artist": "Kaptan Kadavra", "album": "Kaptan Kadavra", "vibe": "aggressive", "bpm": 170, "year": 2022},
  {"id": 36, "title": "Katiyen", "artist": "Kaptan Kadavra", "album": "Kaptan Kadavra", "vibe": "aggressive", "bpm": 160, "year": 2022},
  {"id": 37, "title": "Katarakt", "artist": "Kaptan Kadavra", "album": "Katarakt - Single", "vibe": "aggressive", "bpm": 190, "year": 2024},
  {"id": 38, "title": "Windowpane", "artist": "Opeth", "album": "Damnation", "vibe": "melancholic", "bpm": 78, "year": 2003},
  {"id": 39, "title": "Hope Leaves", "artist": "Opeth", "album": "Damnation", "vibe": "melancholic", "bpm": 70, "year": 2003},
  {"id": 40, "title": "Burden", "artist": "Opeth", "album": "Watershed", "vibe": "dark", "bpm": 64, "year": 2008},
  {"id": 41, "title": "Rivers Between Us", "artist": "Draconian", "album": "Sovran", "vibe": "melancholic", "bpm": 66, "year": 2015},
  {"id": 42, "title": "Rock You Like a Hurricane", "artist": "Scorpions", "album": "Love at First Sting", "vibe": "party", "bpm": 124, "year": 1984},
  {"id": 43, "title": "I Wanna Be Your Slave", "artist": "Måneskin", "album": "Teatro d'ira: Vol. I", "vibe": "party", "bpm": 133, "year": 2021},
  {"id": 44, "title": "Comfortably Numb", "artist": "Pink Floyd", "album": "The Wall", "vibe": "chill", "bpm": 65, "year": 1979},
  {"id": 45, "title": "Riders on the Storm", "artist": "The Doors", "album": "L.A. Woman", "vibe": "chill", "bpm": 104, "year": 1971},
  {"id": 46, "title": "Hurt", "artist": "Nine Inch Nails", "album": "The Downward Spiral", "vibe": "sad", "bpm": 68, "year": 1994},
  {"id": 47, "title": "Bullet With Butterfly Wings", "artist": "The Smashing Pumpkins", "album": "Mellon Collie and the Infinite Sadness", "vibe": "rebellious", "bpm": 122, "year": 1995},
  {"id": 48, "title": "Basket Case", "artist": "Green Day", "album": "Dookie", "vibe": "rebellious", "bpm": 170, "year": 1994},
  {"id": 49, "title": "Don't Stop Believin'", "artist": "Journey", "album": "Escape", "vibe": "euphoric", "bpm": 119, "year": 1981},
  {"id": 50, "title": "Born to Run", "artist": "Bruce Springsteen", "album": "Born to Run", "vibe": "energetic", "bpm": 147, "year": 1975}
]

def format_js_object(track):
    lines = ["  {"]
    for k, v in track.items():
        if isinstance(v, str):
            lines.append(f'    {k}: "{v}",')
        elif isinstance(v, bool):
            lines.append(f'    {k}: {"true" if v else "false"},')
        else:
            lines.append(f'    {k}: {v},')
    lines.append("  },")
    return "\n".join(lines)

print("Starting the process... Data is being fetched from the iTunes API (this will take approximately 1 minute).\n")

for track in tracks:
    term = f"{track['artist']} {track['title']}"
    url = f"https://itunes.apple.com/search?term={term}&entity=song&limit=1"
    
    try:
        response = requests.get(url)
        data = response.json()
        
        if data['resultCount'] > 0:
            result = data['results'][0]
            track['audioPreviewUrl'] = result.get('previewUrl', '')
            # We are converting the 100x100 cover image to 600x600 high resolution.
            track['coverUrl'] = result.get('artworkUrl100', '').replace('100x100bb', '600x600bb')
        else:
            print(f"⚠️ NOT FOUND: {track['artist']} - {track['title']}")
            track['audioPreviewUrl'] = "NOT FOUND"
            track['coverUrl'] = "NOT FOUND"
    except Exception as e:
        print(f"❌ ERROR: {track['artist']} - {track['title']} ({e})")
        track['audioPreviewUrl'] = "ERROR"
        track['coverUrl'] = "ERROR"
        
    time.sleep(1.2) # 1.2 second wait to avoid iTunes API ban

print("\n/* ========================================================== */")
print("/* FROM HERE ON, YOU CAN COPY AND PASTE INTO YOUR tracks.js FILE */")
print("/* ========================================================== */\n")

print("export const tracks = [")
for track in tracks:
    print(format_js_object(track))
print("];")

print("\n/* THE END */")