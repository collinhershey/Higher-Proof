import type { Bar } from '../types';

// 179 unique bars across the World's 50 Best 2025 and North America's 50 Best 2026 lists.
// State codes are included for US bars to support state-level filtering.
// Non-US bars have state undefined; the filter UI will skip showing it.

export const BARS: Bar[] = [
  // === Hong Kong ===
  { id: 'bar-leone', name: 'Bar Leone', city: 'Hong Kong', country: 'Hong Kong' },
  { id: 'coa', name: 'Coa', city: 'Hong Kong', country: 'Hong Kong' },
  { id: 'argo', name: 'Argo', city: 'Hong Kong', country: 'Hong Kong' },
  { id: 'gokan', name: 'Gokan', city: 'Hong Kong', country: 'Hong Kong' },
  { id: 'the-savory-project', name: 'The Savory Project', city: 'Hong Kong', country: 'Hong Kong' },

  // === Mexico ===
  { id: 'handshake-speakeasy', name: 'Handshake Speakeasy', city: 'Mexico City', country: 'Mexico' },
  { id: 'tlecan', name: 'Tlecān', city: 'Mexico City', country: 'Mexico' },
  { id: 'licoreria-limantour', name: 'Licorería Limantour', city: 'Mexico City', country: 'Mexico' },
  { id: 'bar-mauro', name: 'Bar Mauro', city: 'Mexico City', country: 'Mexico' },
  { id: 'baltra-bar', name: 'Baltra Bar', city: 'Mexico City', country: 'Mexico' },
  { id: 'form-matter', name: 'Form + Matter', city: 'Mexico City', country: 'Mexico' },
  { id: 'kaito-del-valle', name: 'Kaito del Valle', city: 'Mexico City', country: 'Mexico' },
  { id: 'cafe-de-nadie', name: 'Café de Nadie', city: 'Mexico City', country: 'Mexico' },
  { id: 'el-gallo-altanero', name: 'El Gallo Altanero', city: 'Guadalajara', country: 'Mexico' },
  { id: 'mecenas', name: 'Mecenas', city: 'Guadalajara', country: 'Mexico' },
  { id: 'arca', name: 'Arca', city: 'Tulum', country: 'Mexico' },
  { id: 'bekeb', name: 'Bekeb', city: 'San Miguel de Allende', country: 'Mexico' },
  { id: 'selva', name: 'Selva', city: 'Oaxaca', country: 'Mexico' },
  { id: 'aruba-day-drink', name: 'Aruba Day Drink', city: 'Tijuana', country: 'Mexico' },
  { id: 'zapote-bar', name: 'Zapote Bar', city: 'Playa del Carmen', country: 'Mexico' },

  // === Spain ===
  { id: 'sips', name: 'Sips', city: 'Barcelona', country: 'Spain' },
  { id: 'paradiso', name: 'Paradiso', city: 'Barcelona', country: 'Spain' },
  { id: 'dr-stravinsky', name: 'Dr. Stravinsky', city: 'Barcelona', country: 'Spain' },
  { id: 'boadas', name: 'Boadas', city: 'Barcelona', country: 'Spain' },
  { id: 'foco', name: 'Foco', city: 'Barcelona', country: 'Spain' },
  { id: 'salmon-guru', name: 'Salmon Guru', city: 'Madrid', country: 'Spain' },
  { id: 'angelita', name: 'Angelita', city: 'Madrid', country: 'Spain' },

  // === UK ===
  { id: 'tayer-elementary', name: 'Tayēr + Elementary', city: 'London', country: 'UK' },
  { id: 'connaught-bar', name: 'Connaught Bar', city: 'London', country: 'UK' },
  { id: 'satans-whiskers', name: "Satan's Whiskers", city: 'London', country: 'UK' },
  { id: 'scarfes-bar', name: 'Scarfes Bar', city: 'London', country: 'UK' },
  { id: 'a-bar-with-shapes-for-a-name', name: 'A Bar with Shapes For a Name', city: 'London', country: 'UK' },
  { id: 'kwant-mayfair', name: 'Kwãnt Mayfair', city: 'London', country: 'UK' },
  { id: 'three-sheets-soho', name: 'Three Sheets Soho', city: 'London', country: 'UK' },
  { id: 'panda-sons', name: 'Panda & Sons', city: 'Edinburgh', country: 'UK' },

  // === Italy ===
  { id: 'moebius-milano', name: 'Moebius Milano', city: 'Milan', country: 'Italy' },
  { id: '1930', name: '1930', city: 'Milan', country: 'Italy' },
  { id: 'locale-firenze', name: 'Locale Firenze', city: 'Florence', country: 'Italy' },
  { id: 'gucci-giardino', name: 'Gucci Giardino', city: 'Florence', country: 'Italy' },
  { id: 'drink-kong', name: 'Drink Kong', city: 'Rome', country: 'Italy' },
  { id: 'freni-e-frizioni', name: 'Freni e Frizioni', city: 'Rome', country: 'Italy' },
  { id: 'jerry-thomas-speakeasy', name: 'Jerry Thomas Speakeasy', city: 'Rome', country: 'Italy' },
  { id: 'lantiquario', name: "L'Antiquario", city: 'Naples', country: 'Italy' },

  // === Greece ===
  { id: 'line', name: 'Line', city: 'Athens', country: 'Greece' },
  { id: 'baba-au-rum', name: 'Baba au Rum', city: 'Athens', country: 'Greece' },
  { id: 'the-bar-in-front-of-the-bar', name: 'The Bar in Front of the Bar', city: 'Athens', country: 'Greece' },
  { id: 'barro-negro', name: 'Barro Negro', city: 'Athens', country: 'Greece' },

  // === Singapore ===
  { id: 'jigger-pony', name: 'Jigger & Pony', city: 'Singapore', country: 'Singapore' },
  { id: 'nutmeg-clove', name: 'Nutmeg & Clove', city: 'Singapore', country: 'Singapore' },
  { id: 'native', name: 'Native', city: 'Singapore', country: 'Singapore' },

  // === Argentina ===
  { id: 'tres-monos', name: 'Tres Monos', city: 'Buenos Aires', country: 'Argentina' },
  { id: 'cochinchina', name: 'CoChinChina', city: 'Buenos Aires', country: 'Argentina' },
  { id: 'victor-audio-bar', name: 'Victor Audio Bar', city: 'Buenos Aires', country: 'Argentina' },
  { id: 'floreria-atlantico', name: 'Florería Atlántico', city: 'Buenos Aires', country: 'Argentina' },

  // === Colombia ===
  { id: 'alquimico', name: 'Alquímico', city: 'Cartagena', country: 'Colombia' },
  { id: 'la-sala-de-laura', name: 'La Sala de Laura', city: 'Bogotá', country: 'Colombia' },
  { id: 'mamba-negra', name: 'Mamba Negra', city: 'Medellín', country: 'Colombia' },
  { id: 'bar-carmen', name: 'Bar Carmen', city: 'Medellín', country: 'Colombia' },

  // === Peru ===
  { id: 'lady-bee', name: 'Lady Bee', city: 'Lima', country: 'Peru' },
  { id: 'sastreria-martinez', name: 'Sastrería Martinez', city: 'Lima', country: 'Peru' },

  // === Brazil ===
  { id: 'tan-tan', name: 'Tan Tan', city: 'São Paulo', country: 'Brazil' },
  { id: 'eximia', name: 'Exímia', city: 'São Paulo', country: 'Brazil' },

  // === Norway ===
  { id: 'himkok', name: 'Himkok', city: 'Oslo', country: 'Norway' },
  { id: 'svanen', name: 'Svanen', city: 'Oslo', country: 'Norway' },

  // === Sweden ===
  { id: 'roda-huset', name: 'Röda Huset', city: 'Stockholm', country: 'Sweden' },
  { id: 'tjoget', name: 'Tjoget', city: 'Stockholm', country: 'Sweden' },

  // === Denmark ===
  { id: 'bird', name: 'Bird', city: 'Copenhagen', country: 'Denmark' },

  // === Germany ===
  { id: 'wax-on', name: 'Wax On', city: 'Berlin', country: 'Germany' },

  // === France ===
  { id: 'bar-nouveau', name: 'Bar Nouveau', city: 'Paris', country: 'France' },
  { id: 'the-cambridge-public-house', name: 'The Cambridge Public House', city: 'Paris', country: 'France' },
  { id: 'danico', name: 'Danico', city: 'Paris', country: 'France' },

  // === Slovakia ===
  { id: 'mirror-bar', name: 'Mirror Bar', city: 'Bratislava', country: 'Slovakia' },

  // === Albania ===
  { id: 'nouvelle-vague', name: 'Nouvelle Vague', city: 'Tirana', country: 'Albania' },

  // === Thailand ===
  { id: 'bar-us', name: 'Bar Us', city: 'Bangkok', country: 'Thailand' },
  { id: 'bkk-social-club', name: 'BKK Social Club', city: 'Bangkok', country: 'Thailand' },
  { id: 'dry-wave-cocktail-studio', name: 'Dry Wave Cocktail Studio', city: 'Bangkok', country: 'Thailand' },
  { id: 'opium', name: 'Opium', city: 'Bangkok', country: 'Thailand' },

  // === South Korea ===
  { id: 'zest', name: 'Zest', city: 'Seoul', country: 'South Korea' },
  { id: 'bar-cham', name: 'Bar Cham', city: 'Seoul', country: 'South Korea' },

  // === Japan ===
  { id: 'bar-benfiddich', name: 'Bar Benfiddich', city: 'Tokyo', country: 'Japan' },
  { id: 'virtu', name: 'Virtù', city: 'Tokyo', country: 'Japan' },
  { id: 'the-bellwood', name: 'The Bellwood', city: 'Tokyo', country: 'Japan' },
  { id: 'the-sg-club', name: 'The SG Club', city: 'Tokyo', country: 'Japan' },
  { id: 'bar-trench', name: 'Bar Trench', city: 'Tokyo', country: 'Japan' },

  // === China ===
  { id: 'hope-sesame', name: 'Hope & Sesame', city: 'Guangzhou', country: 'China' },

  // === Taiwan ===
  { id: 'vender', name: 'Vender', city: 'Taichung', country: 'Taiwan' },

  // === Sri Lanka ===
  { id: 'smoke-bitters', name: 'Smoke & Bitters', city: 'Hiriketiya', country: 'Sri Lanka' },

  // === India ===
  { id: 'lair', name: 'Lair', city: 'New Delhi', country: 'India' },

  // === Australia ===
  { id: 'caretakers-cottage', name: "Caretaker's Cottage", city: 'Melbourne', country: 'Australia' },
  { id: 'byrdi', name: 'Byrdi', city: 'Melbourne', country: 'Australia' },
  { id: 'maybe-sammy', name: 'Maybe Sammy', city: 'Sydney', country: 'Australia' },

  // === UAE ===
  { id: 'mimi-kakushi', name: 'Mimi Kakushi', city: 'Dubai', country: 'UAE' },
  { id: 'lpm-dubai', name: 'LPM Dubai', city: 'Dubai', country: 'UAE' },

  // === Kenya ===
  { id: 'hero-bar', name: 'Hero Bar', city: 'Nairobi', country: 'Kenya' },

  // === USA — New York ===
  { id: 'superbueno', name: 'Superbueno', city: 'New York', state: 'NY', country: 'USA' },
  { id: 'sip-guzzle', name: 'Sip & Guzzle', city: 'New York', state: 'NY', country: 'USA' },
  { id: 'double-chicken-please', name: 'Double Chicken Please', city: 'New York', state: 'NY', country: 'USA' },
  { id: 'overstory', name: 'Overstory', city: 'New York', state: 'NY', country: 'USA' },
  { id: 'schmuck', name: 'Schmuck', city: 'New York', state: 'NY', country: 'USA' },
  { id: 'attaboy', name: 'Attaboy', city: 'New York', state: 'NY', country: 'USA' },
  { id: 'martinys', name: "Martiny's", city: 'New York', state: 'NY', country: 'USA' },
  { id: 'employees-only', name: 'Employees Only', city: 'New York', state: 'NY', country: 'USA' },
  { id: 'bar-snack', name: 'Bar Snack', city: 'New York', state: 'NY', country: 'USA' },
  { id: 'clemente-bar', name: 'Clemente Bar', city: 'New York', state: 'NY', country: 'USA' },
  { id: 'angels-share', name: "Angel's Share", city: 'New York', state: 'NY', country: 'USA' },
  { id: 'bar-madonna', name: 'Bar Madonna', city: 'New York', state: 'NY', country: 'USA' },
  { id: 'maison-premiere', name: 'Maison Premiere', city: 'New York', state: 'NY', country: 'USA' },
  { id: 'katana-kitten', name: 'Katana Kitten', city: 'New York', state: 'NY', country: 'USA' },
  { id: 'dante', name: 'Dante', city: 'New York', state: 'NY', country: 'USA' },
  { id: 'seed-library', name: 'Seed Library', city: 'New York', state: 'NY', country: 'USA' },
  { id: 'the-portrait-bar', name: 'The Portrait Bar', city: 'New York', state: 'NY', country: 'USA' },
  { id: 'shinjis', name: "Shinji's", city: 'New York', state: 'NY', country: 'USA' },

  // === USA — Louisiana ===
  { id: 'jewel-of-the-south', name: 'Jewel of the South', city: 'New Orleans', state: 'LA', country: 'USA' },
  { id: 'cure', name: 'Cure', city: 'New Orleans', state: 'LA', country: 'USA' },

  // === USA — Illinois ===
  { id: 'kumiko', name: 'Kumiko', city: 'Chicago', state: 'IL', country: 'USA' },
  { id: 'best-intentions', name: 'Best Intentions', city: 'Chicago', state: 'IL', country: 'USA' },
  { id: 'gus-sip-dip', name: "Gus' Sip & Dip", city: 'Chicago', state: 'IL', country: 'USA' },
  { id: 'bisous', name: 'Bisous', city: 'Chicago', state: 'IL', country: 'USA' },
  { id: 'meadowlark', name: 'Meadowlark', city: 'Chicago', state: 'IL', country: 'USA' },
  { id: 'nine-bar', name: 'Nine Bar', city: 'Chicago', state: 'IL', country: 'USA' },
  { id: 'queen-mary', name: 'Queen Mary', city: 'Chicago', state: 'IL', country: 'USA' },

  // === USA — California ===
  { id: 'true-laurel', name: 'True Laurel', city: 'San Francisco', state: 'CA', country: 'USA' },
  { id: 'pacific-cocktail-haven', name: 'Pacific Cocktail Haven', city: 'San Francisco', state: 'CA', country: 'USA' },
  { id: 'trick-dog', name: 'Trick Dog', city: 'San Francisco', state: 'CA', country: 'USA' },
  { id: 'mirate', name: 'Mírate', city: 'Los Angeles', state: 'CA', country: 'USA' },
  { id: 'daisy-margarita-bar', name: 'Daisy Margarita Bar', city: 'Los Angeles', state: 'CA', country: 'USA' },
  { id: 'vandell', name: 'Vandell', city: 'Los Angeles', state: 'CA', country: 'USA' },
  { id: 'thunderbolt', name: 'Thunderbolt', city: 'Los Angeles', state: 'CA', country: 'USA' },
  { id: 'realm-of-52-remedies', name: 'Realm of 52 Remedies', city: 'San Diego', state: 'CA', country: 'USA' },

  // === USA — DC ===
  { id: 'press-club', name: 'Press Club', city: 'Washington DC', state: 'DC', country: 'USA' },
  { id: 'service-bar', name: 'Service Bar', city: 'Washington DC', state: 'DC', country: 'USA' },
  { id: 'silver-lyan', name: 'Silver Lyan', city: 'Washington DC', state: 'DC', country: 'USA' },
  { id: 'allegory', name: 'Allegory', city: 'Washington DC', state: 'DC', country: 'USA' },

  // === USA — Florida ===
  { id: 'cafe-la-trova', name: 'Café La Trova', city: 'Miami', state: 'FL', country: 'USA' },
  { id: 'viceversa', name: 'Viceversa', city: 'Miami', state: 'FL', country: 'USA' },
  { id: 'bar-kaiju', name: 'Bar Kaiju', city: 'Miami', state: 'FL', country: 'USA' },

  // === USA — Texas ===
  { id: 'bandista', name: 'Bandista', city: 'Houston', state: 'TX', country: 'USA' },
  { id: 'julep', name: 'Julep', city: 'Houston', state: 'TX', country: 'USA' },
  { id: 'nickel-city', name: 'Nickel City', city: 'Austin', state: 'TX', country: 'USA' },

  // === USA — Other states ===
  { id: 'scotch-lodge', name: 'Scotch Lodge', city: 'Portland', state: 'OR', country: 'USA' },
  { id: 'yacht-club', name: 'Yacht Club', city: 'Denver', state: 'CO', country: 'USA' },
  { id: 'bar-leather-apron', name: 'Bar Leather Apron', city: 'Honolulu', state: 'HI', country: 'USA' },
  { id: 'father-forgive-me', name: 'Father Forgive Me', city: 'Detroit', state: 'MI', country: 'USA' },
  { id: 'ticonderoga-club', name: 'Ticonderoga Club', city: 'Atlanta', state: 'GA', country: 'USA' },
  { id: 'the-wig-shop', name: 'The Wig Shop', city: 'Boston', state: 'MA', country: 'USA' },
  { id: 'hecate-bar', name: 'Hecate Bar', city: 'Boston', state: 'MA', country: 'USA' },
  { id: 'roquette', name: 'Roquette', city: 'Seattle', state: 'WA', country: 'USA' },

  // === Canada ===
  { id: 'bar-pompette', name: 'Bar Pompette', city: 'Toronto', country: 'Canada' },
  { id: 'library-bar', name: 'Library Bar', city: 'Toronto', country: 'Canada' },
  { id: 'mother', name: 'Mother', city: 'Toronto', country: 'Canada' },
  { id: 'civil-works', name: 'Civil Works', city: 'Toronto', country: 'Canada' },
  { id: 'civil-liberties', name: 'Civil Liberties', city: 'Toronto', country: 'Canada' },
  { id: 'cry-baby-gallery', name: 'Cry Baby Gallery', city: 'Toronto', country: 'Canada' },
  { id: 'suite-115', name: 'Suite 115', city: 'Toronto', country: 'Canada' },
  { id: 'no-vacancy', name: 'No Vacancy', city: 'Toronto', country: 'Canada' },
  { id: 'slice-of-life', name: 'Slice Of Life', city: 'Toronto', country: 'Canada' },
  { id: 'bar-mordecai', name: 'Bar Mordecai', city: 'Toronto', country: 'Canada' },
  { id: 'the-keefer-bar', name: 'The Keefer Bar', city: 'Vancouver', country: 'Canada' },
  { id: 'june-on-cambie', name: 'June on Cambie', city: 'Vancouver', country: 'Canada' },
  { id: 'prophecy', name: 'Prophecy', city: 'Vancouver', country: 'Canada' },
  { id: 'botanist-bar', name: 'Botanist Bar', city: 'Vancouver', country: 'Canada' },
  { id: 'bagheera', name: 'Bagheera', city: 'Vancouver', country: 'Canada' },
  { id: 'meo', name: 'Meo', city: 'Vancouver', country: 'Canada' },
  { id: 'laowai', name: 'Laowai', city: 'Vancouver', country: 'Canada' },
  { id: 'mount-pleasant-vintage-provisions', name: 'Mount Pleasant Vintage & Provisions', city: 'Vancouver', country: 'Canada' },
  { id: 'cloakroom', name: 'Cloakroom', city: 'Montreal', country: 'Canada' },
  { id: 'atwater-cocktail-club', name: 'Atwater Cocktail Club', city: 'Montreal', country: 'Canada' },
  { id: 'bar-bello', name: 'Bar Bello', city: 'Montreal', country: 'Canada' },
  { id: 'the-coldroom', name: 'The Coldroom', city: 'Montreal', country: 'Canada' },
  { id: 'humboldt-bar', name: 'Humboldt Bar', city: 'Victoria', country: 'Canada' },
  { id: 'citrus-cane', name: 'Citrus & Cane', city: 'Victoria', country: 'Canada' },
  { id: 'proof', name: 'Proof', city: 'Calgary', country: 'Canada' },
  { id: 'missys', name: "Missy's", city: 'Calgary', country: 'Canada' },
  { id: 'shelter', name: 'Shelter', city: 'Calgary', country: 'Canada' },

  // === Puerto Rico ===
  { id: 'la-factoria', name: 'La Factoría', city: 'San Juan', country: 'Puerto Rico' },
  { id: 'identidad', name: 'Identidad', city: 'San Juan', country: 'Puerto Rico' },

  // === Cayman Islands ===
  { id: 'library-by-the-sea', name: 'Library by the Sea', city: 'Grand Cayman', country: 'Cayman Islands' },
  { id: 'door-no-4', name: 'Door No.4', city: 'Grand Cayman', country: 'Cayman Islands' },

  // === Bahamas ===
  { id: 'bon-vivants', name: 'Bon Vivants', city: 'Nassau', country: 'Bahamas' },

  // ============================================================
  // World 2022-2024 historical additions (42 bars)
  // ============================================================

  // === Australia ===
  { id: 'above-board', name: 'Above Board', city: 'Melbourne', country: 'Australia' },
  { id: 'cantina-ok', name: 'Cantina OK!', city: 'Sydney', country: 'Australia' },

  // === Brazil ===
  { id: 'subastor', name: 'SubAstor', city: 'São Paulo', country: 'Brazil' },

  // === Cyprus ===
  { id: 'lost-found', name: 'Lost & Found', city: 'Nicosia', country: 'Cyprus' },

  // === Denmark ===
  { id: 'ruby', name: 'Ruby', city: 'Copenhagen', country: 'Denmark' },

  // === France ===
  { id: 'little-red-door', name: 'Little Red Door', city: 'Paris', country: 'France' },

  // === Germany ===
  { id: 'velvet', name: 'Velvet', city: 'Berlin', country: 'Germany' },

  // === Greece ===
  { id: 'the-clumsies', name: 'The Clumsies', city: 'Athens', country: 'Greece' },

  // === Hong Kong ===
  { id: 'darkside', name: 'Darkside', city: 'Hong Kong', country: 'Hong Kong' },
  { id: 'penicillin', name: 'Penicillin', city: 'Hong Kong', country: 'Hong Kong' },

  // === India ===
  { id: 'sidecar', name: 'Sidecar', city: 'New Delhi', country: 'India' },

  // === Italy ===
  { id: 'camparino-in-galleria', name: 'Camparino in Galleria', city: 'Milan', country: 'Italy' },

  // === Japan ===
  { id: 'high-five', name: 'High Five', city: 'Tokyo', country: 'Japan' },

  // === Malaysia ===
  { id: 'penrose', name: 'Penrose', city: 'Kuala Lumpur', country: 'Malaysia' },

  // === Mexico ===
  { id: 'hanky-panky', name: 'Hanky Panky', city: 'Mexico City', country: 'Mexico' },
  { id: 'rayo', name: 'Rayo', city: 'Mexico City', country: 'Mexico' },

  // === Peru ===
  { id: 'carnaval', name: 'Carnaval', city: 'Lima', country: 'Peru' },

  // === Portugal ===
  { id: 'red-frog', name: 'Red Frog', city: 'Lisbon', country: 'Portugal' },

  // === Singapore ===
  { id: '28-hongkong-street', name: '28 HongKong Street', city: 'Singapore', country: 'Singapore' },
  { id: 'analogue-initiative', name: 'Analogue Initiative', city: 'Singapore', country: 'Singapore' },
  { id: 'atlas', name: 'Atlas', city: 'Singapore', country: 'Singapore' },
  { id: 'cat-bite-club', name: 'Cat Bite Club', city: 'Singapore', country: 'Singapore' },
  { id: 'manhattan', name: 'Manhattan', city: 'Singapore', country: 'Singapore' },
  { id: 'night-hawk', name: 'Night Hawk', city: 'Singapore', country: 'Singapore' },
  { id: 'sago-house', name: 'Sago House', city: 'Singapore', country: 'Singapore' },

  // === South Africa ===
  { id: 'sin-tax', name: 'Sin + Tax', city: 'Johannesburg', country: 'South Africa' },

  // === Spain ===
  { id: 'two-schmucks', name: 'Two Schmucks', city: 'Barcelona', country: 'Spain' },

  // === Sweden ===
  { id: 'lucys-flower-shop', name: "Lucy's Flower Shop", city: 'Stockholm', country: 'Sweden' },

  // === Thailand ===
  { id: 'mahaniyom-cocktail-bar', name: 'Mahaniyom Cocktail Bar', city: 'Bangkok', country: 'Thailand' },
  { id: 'tropic-city', name: 'Tropic City', city: 'Bangkok', country: 'Thailand' },
  { id: 'vesper', name: 'Vesper', city: 'Bangkok', country: 'Thailand' },

  // === UAE ===
  { id: 'bulgari-bar', name: 'Bulgari Bar', city: 'Dubai', country: 'UAE' },
  { id: 'ergo', name: 'Ergo', city: 'Dubai', country: 'UAE' },
  { id: 'galaxy-bar', name: 'Galaxy Bar', city: 'Dubai', country: 'UAE' },
  { id: 'zuma', name: 'Zuma', city: 'Dubai', country: 'UAE' },

  // === UK ===
  { id: 'amaro', name: 'Amaro', city: 'London', country: 'UK' },
  { id: 'artesian', name: 'Artesian', city: 'London', country: 'UK' },
  { id: 'donovan-bar', name: 'Donovan Bar', city: 'London', country: 'UK' },
  { id: 'lyaness', name: 'Lyaness', city: 'London', country: 'UK' },
  { id: 'schofields', name: "Schofield's", city: 'Manchester', country: 'UK' },
  { id: 'swift', name: 'Swift', city: 'London', country: 'UK' },
  { id: 'viajante87', name: 'Viajante87', city: 'London', country: 'UK' },

  // ============================================================
  // NA 2022-2025 historical additions (28 bars)
  // ============================================================

  // === Canada ===
  { id: 'bar-kismet', name: 'Bar Kismet', city: 'Halifax', country: 'Canada' },
  { id: 'bar-raval', name: 'Bar Raval', city: 'Toronto', country: 'Canada' },
  { id: 'el-pequeno-bar', name: 'El Pequeño Bar', city: 'Montreal', country: 'Canada' },

  // === Cuba ===
  { id: 'el-floridita', name: 'El Floridita', city: 'Havana', country: 'Cuba' },

  // === Mexico ===
  { id: 'bijou-drinkery-room', name: 'Bijou Drinkery Room', city: 'Mexico City', country: 'Mexico' },
  { id: 'brujas', name: 'Brujas', city: 'Mexico City', country: 'Mexico' },
  { id: 'sabina-sabe', name: 'Sabina Sabe', city: 'Oaxaca', country: 'Mexico' },

  // === USA ===
  { id: 'abv', name: 'ABV', city: 'San Francisco', state: 'CA', country: 'USA' },
  { id: 'amor-y-amargo', name: 'Amor y Amargo', city: 'New York', state: 'NY', country: 'USA' },
  { id: 'bitter-twisted', name: 'Bitter & Twisted', city: 'Phoenix', state: 'AZ', country: 'USA' },
  { id: 'broken-shaker', name: 'Broken Shaker', city: 'Miami', state: 'FL', country: 'USA' },
  { id: 'century-grand', name: 'Century Grand', city: 'Phoenix', state: 'AZ', country: 'USA' },
  { id: 'clover-club', name: 'Clover Club', city: 'New York', state: 'NY', country: 'USA' },
  { id: 'dear-irving', name: 'Dear Irving', city: 'New York', state: 'NY', country: 'USA' },
  { id: 'death-co-denver', name: 'Death & Co (Denver)', city: 'Denver', state: 'CO', country: 'USA' },
  { id: 'death-co-los-angeles', name: 'Death & Co (Los Angeles)', city: 'Los Angeles', state: 'CA', country: 'USA' },
  { id: 'friends-and-family', name: 'Friends and Family', city: 'Oakland', state: 'CA', country: 'USA' },
  { id: 'genever', name: 'Genever', city: 'Los Angeles', state: 'CA', country: 'USA' },
  { id: 'herbs-rye', name: 'Herbs & Rye', city: 'Las Vegas', state: 'NV', country: 'USA' },
  { id: 'mace', name: 'Mace', city: 'New York', state: 'NY', country: 'USA' },
  { id: 'miladys', name: "Milady's", city: 'New York', state: 'NY', country: 'USA' },
  { id: 'milk-room', name: 'Milk Room', city: 'Chicago', state: 'IL', country: 'USA' },
  { id: 'platform-18', name: 'Platform 18', city: 'Phoenix', state: 'AZ', country: 'USA' },
  { id: 'raised-by-wolves', name: 'Raised by Wolves', city: 'San Diego', state: 'CA', country: 'USA' },
  { id: 'sweet-liberty', name: 'Sweet Liberty', city: 'Miami', state: 'FL', country: 'USA' },
  { id: 'teardrop-lounge', name: 'Teardrop Lounge', city: 'Portland', state: 'OR', country: 'USA' },
  { id: 'the-dead-rabbit', name: 'The Dead Rabbit', city: 'New York', state: 'NY', country: 'USA' },
  { id: 'youngblood', name: 'Youngblood', city: 'San Diego', state: 'CA', country: 'USA' },
];

// Lookup helper — used throughout the app
export const BARS_BY_ID: Map<string, Bar> = new Map(BARS.map((b) => [b.id, b]));
