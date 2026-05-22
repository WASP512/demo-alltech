/**
 * Single source of truth for business info.
 * Used in: footer, contact page, JSON-LD schema, sitemap location pages,
 * and the OpenGraph defaults.
 *
 * Update here, propagates everywhere.
 */

export const site = {
  name: "AllTech",
  legalName: "AllTech",
  tagline: "IT, cybersecurity, and network infrastructure for Cache Valley & beyond.",
  description:
    "AllTech is a Cache Valley-based managed IT and cybersecurity provider serving businesses across northern Utah and southern Idaho. Cloudflare partner, UniFi specialist, Datto RMM, Darktrace.",
  url: "https://askalltech.com",

  // NAP — used in LocalBusiness schema, footer, contact page
  phone: "(435) 557-3232",
  phoneE164: "+14355573232",
  email: "help@askalltech.com",
  address: {
    street: "865 West Center Street, Bldg F",
    city: "Hyde Park",
    region: "UT",
    postalCode: "84318",
    country: "US",
  },
  geo: { latitude: 41.7977, longitude: -111.8222 }, // Hyde Park, UT

  hours: [
    // ISO weekday format for schema.org/OpeningHoursSpecification
    { days: ["Monday","Tuesday","Wednesday","Thursday","Friday"], open: "08:00", close: "17:00" },
  ],

  social: {
    // fill in when ready
    // facebook: "https://facebook.com/askalltech",
    // linkedin: "https://linkedin.com/company/askalltech",
  },

  // Service area — every city is its own LocalBusiness::areaServed entry and
  // gets a dedicated /locations/<slug> page for local SEO.
  serviceArea: [
    { city: "Logan",         region: "UT", slug: "logan" },
    { city: "Hyde Park",     region: "UT", slug: "hyde-park" },
    { city: "North Logan",   region: "UT", slug: "north-logan" },
    { city: "Smithfield",    region: "UT", slug: "smithfield" },
    { city: "Richmond",      region: "UT", slug: "richmond" },
    { city: "Providence",    region: "UT", slug: "providence" },
    { city: "Wellsville",    region: "UT", slug: "wellsville" },
    { city: "Tremonton",     region: "UT", slug: "tremonton" },
    { city: "Brigham City",  region: "UT", slug: "brigham-city" },
    { city: "Willard",       region: "UT", slug: "willard" },
    { city: "Preston",       region: "ID", slug: "preston-id" },
  ],
} as const;

// Top-level service catalogue. Each entry maps to /services/<slug>.
export const services = [
  {
    slug: "managed-it",
    name: "Managed IT",
    short: "Help desk, monitoring, patching, vendor management — your outsourced IT department.",
    icon: "wrench",
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity",
    short: "Endpoint security, email security, incident response, SOC monitoring, and pen testing.",
    icon: "shield",
  },
  {
    slug: "cloudflare-zero-trust",
    name: "Cloudflare Zero Trust",
    short:
      "As a Cloudflare Partner we design, deploy, and manage Zero Trust networks — tunnels, WARP, Gateway, Access — for multi-site organizations.",
    icon: "cloudflare",
    featured: true,
  },
  {
    slug: "network-design",
    name: "Network Design & UniFi",
    short: "Business-grade Wi-Fi, switching, firewalls. Ubiquiti UniFi specialists.",
    icon: "network",
  },
  {
    slug: "voip",
    name: "VoIP Phone Service",
    short: "High-quality cloud phone systems with porting, IVR, and mobile apps.",
    icon: "phone",
  },
  {
    slug: "cloud-microsoft-365",
    name: "Microsoft 365 & Cloud",
    short: "M365 tenant setup, migration, Intune, Entra ID, and ongoing administration.",
    icon: "cloud",
  },
] as const;

export type ServiceSlug = typeof services[number]["slug"];
