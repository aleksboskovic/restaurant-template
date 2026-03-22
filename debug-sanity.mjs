import 'dotenv/config';

const SANITY_PROJECT_ID = 'yp5xha26';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2021-06-07';
const SANITY_TOKEN = process.env.SANITY_API_TOKEN || '';

const SANITY_BASE_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data`;

async function sanityQuery(query) {
  const encoded = encodeURIComponent(query);
  const res = await fetch(`${SANITY_BASE_URL}/query/${SANITY_DATASET}?query=${encoded}`, {
    headers: { Authorization: `Bearer ${SANITY_TOKEN}` },
  });
  const data = await res.json();
  return data.result;
}

// Get ALL fields of specialEvent documents
const result = await sanityQuery(`*[_type == "specialEvent"][0..5]`);
console.log('=== ALL specialEvent documents (raw) ===');
console.log(JSON.stringify(result, null, 2));
