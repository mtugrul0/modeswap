const https = require('https');

const tracks = [
  { id: 'sad-1', title: 'Nutshell', artist: 'Alice in Chains', album: 'Jar of Flies', vibe: 'sad', bpm: 76, year: 1994, tiebreaker: false },
  { id: 'sad-2', title: 'The Sound of Silence', artist: 'Simon & Garfunkel', album: 'Wednesday Morning, 3 A.M.', vibe: 'sad', bpm: 76, year: 1964, tiebreaker: false },
  { id: 'energetic-1', title: 'Enter Sandman', artist: 'Metallica', album: 'Metallica', vibe: 'energetic', bpm: 123, year: 1991, tiebreaker: false },
  { id: 'energetic-2', title: 'Ace of Spades', artist: 'Motörhead', album: 'Ace of Spades', vibe: 'energetic', bpm: 228, year: 1980, tiebreaker: false },
  { id: 'dark-1', title: 'Black Hole Sun', artist: 'Soundgarden', album: 'Superunknown', vibe: 'dark', bpm: 86, year: 1994, tiebreaker: false },
  { id: 'dark-2', title: 'Paint It Black', artist: 'The Rolling Stones', album: 'Aftermath', vibe: 'dark', bpm: 160, year: 1966, tiebreaker: false },
  { id: 'euphoric-1', title: 'Don\'t Stop Me Now', artist: 'Queen', album: 'Jazz', vibe: 'euphoric', bpm: 156, year: 1978, tiebreaker: false },
  { id: 'euphoric-2', title: 'Jump', artist: 'Van Halen', album: '1984', vibe: 'euphoric', bpm: 130, year: 1984, tiebreaker: false },
  { id: 'romantic-1', title: 'More Than Words', artist: 'Extreme', album: 'Pornograffitti', vibe: 'romantic', bpm: 72, year: 1990, tiebreaker: false },
  { id: 'romantic-2', title: 'Wonderful Tonight', artist: 'Eric Clapton', album: 'Slowhand', vibe: 'romantic', bpm: 92, year: 1977, tiebreaker: false },
  { id: 'rebellious-1', title: 'Killing in the Name', artist: 'Rage Against the Machine', album: 'Rage Against the Machine', vibe: 'rebellious', bpm: 105, year: 1992, tiebreaker: false },
  { id: 'rebellious-2', title: 'Anarchy in the U.K.', artist: 'Sex Pistols', album: 'Never Mind the Bollocks', vibe: 'rebellious', bpm: 196, year: 1977, tiebreaker: false },
  { id: 'tb-sad', title: 'Fade to Black', artist: 'Metallica', album: 'Ride the Lightning', vibe: 'sad', bpm: 70, year: 1984, tiebreaker: true },
  { id: 'tb-energetic', title: 'Back in Black', artist: 'AC/DC', album: 'Back in Black', vibe: 'energetic', bpm: 184, year: 1980, tiebreaker: true },
  { id: 'tb-dark', title: 'Creep', artist: 'Radiohead', album: 'Pablo Honey', vibe: 'dark', bpm: 92, year: 1992, tiebreaker: true },
  { id: 'tb-euphoric', title: 'We Will Rock You', artist: 'Queen', album: 'News of the World', vibe: 'euphoric', bpm: 82, year: 1977, tiebreaker: true },
  { id: 'tb-romantic', title: 'November Rain', artist: 'Guns N\' Roses', album: 'Use Your Illusion I', vibe: 'romantic', bpm: 74, year: 1991, tiebreaker: true },
  { id: 'tb-rebellious', title: 'Smells Like Teen Spirit', artist: 'Nirvana', album: 'Nevermind', vibe: 'rebellious', bpm: 117, year: 1991, tiebreaker: true }
];

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', err => reject(err));
  });
}

async function verifyUrl(url) {
  return new Promise((resolve) => {
    const req = https.request(url, { method: 'HEAD' }, (res) => {
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.end();
  });
}

async function go() {
  const audioPreviewUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
  let results = [];
  for (const t of tracks) {
    const term = encodeURIComponent(`${t.artist} ${t.title}`);
    const url = `https://itunes.apple.com/search?term=${term}&entity=song&limit=1`;
    try {
      const data = await fetchJson(url);
      if (data.results && data.results.length > 0) {
        let artworkUrl = data.results[0].artworkUrl100;
        artworkUrl = artworkUrl.replace('100x100bb', '600x600bb');
        const isValid = await verifyUrl(artworkUrl);
        if (isValid) {
          t.coverUrl = artworkUrl;
        } else {
          t.coverUrl = 'INVALID COVER_URL';
        }
      } else {
        t.coverUrl = 'NOT FOUND ON ITUNES';
      }
    } catch (e) {
      t.coverUrl = 'ERROR';
    }
    const trackObj = {
      id: t.id,
      title: t.title,
      artist: t.artist,
      album: t.album,
      coverUrl: t.coverUrl,
      audioPreviewUrl: audioPreviewUrl,
      vibe: t.vibe,
      bpm: t.bpm,
      year: t.year
    };
    if (t.tiebreaker) {
      trackObj.tiebreaker = true;
    }
    console.log(trackObj);
    results.push(trackObj);
  }
  console.log('--- JSON ---');
  console.log(JSON.stringify(results, null, 2));
}

go();
