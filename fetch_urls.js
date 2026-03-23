const https = require('https');

const tracks = [
  { id: 1, title: "Master of Puppets", artist: "Metallica" },
  { id: 2, title: "Du Hast", artist: "Rammstein" },
  { id: 3, title: "Snuff", artist: "Slipknot" },
  { id: 4, title: "Wish You Were Here", artist: "Pink Floyd" },
  { id: 5, title: "Run to the Hills", artist: "Iron Maiden" },
  { id: 6, title: "Highway to Hell", artist: "AC/DC" },
  { id: 7, title: "Nothing Else Matters", artist: "Metallica" },
  { id: 8, title: "Black", artist: "Pearl Jam" }
];

async function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

function checkUrl(urlStr) {
  return new Promise((resolve) => {
    const req = https.request(urlStr, { method: 'HEAD' }, (res) => {
      resolve({ status: res.statusCode, contentType: res.headers['content-type'] });
    });
    req.on('error', () => resolve({ status: 'error' }));
    req.end();
  });
}

async function run() {
  for (const t of tracks) {
    const term = encodeURIComponent(`${t.artist} ${t.title}`);
    const url = `https://itunes.apple.com/search?term=${term}&entity=song&limit=1`;
    try {
      const data = await fetchJson(url);
      if(data.results && data.results[0]) {
        const art100 = data.results[0].artworkUrl100;
        const art600 = art100.replace('100x100bb', '600x600bb');
        const check = await checkUrl(art600);
        console.log(`id: ${t.id},`);
        console.log(`title: "${t.title}",`);
        console.log(`artist: "${t.artist}",`);
        console.log(`coverUrl: "${art600}",`);
        console.log(`check: ${check.status} ${check.contentType}`);
        console.log('---');
      } else {
        console.log(`${t.artist} - ${t.title} not found`);
      }
    } catch (e) {
      console.log(`Error fetching ${t.artist} - ${t.title}: ${e.message}`);
    }
  }
}
run();
