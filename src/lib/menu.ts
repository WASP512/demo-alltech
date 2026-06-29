/**
 * Mega-menu data.
 *
 * Structure: categories → tiles. Each category becomes ONE COLUMN in the
 * unified mega-panel — same pattern as cloudflare.com (Compute / Storage /
 * AI / Security columns, all visible at once).
 *
 * Hovering the "Services" trigger opens the shared panel; each category
 * heading still links to its landing page when clicked.
 *
 * `sublabel` shows a small line under the heading (e.g. "Powered by Cloudflare").
 * `vendors` shows a "We install" line at the foot of the column — the related
 * vendors/products we deploy for that category.
 *
 * Adding a tile is purely additive — edit this file, the menu updates everywhere.
 */

export interface MenuTile {
  title: string;
  description: string;
  href: string;
}

export interface MenuCategory {
  label: string;        // top-nav label AND column heading in the panel
  sublabel?: string;    // small line under the heading
  href: string;         // landing page when the label itself is clicked
  vendors?: string;     // "We install …" line at the foot of the column
  tiles: MenuTile[];
}

export const menuCategories: MenuCategory[] = [
  {
    label: 'Cybersecurity',
    href: '/services/cybersecurity',
    tiles: [
      { title: 'Endpoint Security',   description: 'EDR & XDR for workstations and servers',     href: '/services/cybersecurity#endpoint' },
      { title: 'Email Security',      description: 'Stop phishing, BEC, malware before delivery', href: '/services/cybersecurity#email' },
      { title: 'Network Detection (NDR)', description: 'AI anomaly-based network threat detection',  href: '/services/cybersecurity#ndr' },
      { title: 'Managed SOC',         description: '24/7 monitoring & response',                  href: '/services/cybersecurity#soc' },
      { title: 'Penetration Testing', description: 'External, internal, web-app testing',         href: '/services/cybersecurity#pentest' },
      { title: 'Incident Response',   description: 'Active intrusion containment & forensics',    href: '/services/cybersecurity#ir' },
    ],
  },
  {
    label: 'SASE Solutions',
    sublabel: 'Powered by Cloudflare',
    href: '/cloudflare',
    vendors: 'Cloudflare',
    tiles: [
      { title: 'Tunnel & WARP',     description: 'Replace your VPN with identity-aware access', href: '/services/cloudflare-zero-trust#tunnel' },
      { title: 'Access (ZTNA)',     description: 'Per-app authorization with any IdP',          href: '/services/cloudflare-zero-trust#access' },
      { title: 'Gateway',           description: 'DNS & HTTP filtering as a service',           href: '/services/cloudflare-zero-trust#gateway' },
      { title: 'Email Security',    description: 'Cloud email security in front of M365',       href: '/services/cloudflare-zero-trust#email' },
      { title: 'DNS & DDoS',        description: 'Authoritative DNS, attack mitigation',        href: '/cloudflare#dns' },
    ],
  },
  {
    label: 'Network',
    href: '/services/network-design#unifi',
    vendors: 'Ubiquiti UniFi',
    tiles: [
      { title: 'Switching & Gateways', description: 'Business-grade switches & routers',  href: '/services/network-design#unifi' },
      { title: 'Wi-Fi Design',         description: 'Site survey, coverage, capacity',    href: '/services/network-design#wifi' },
      { title: 'Firewall & Routing',   description: 'Edge security & multi-WAN failover', href: '/services/network-design#firewall' },
      { title: 'Structured Cabling',   description: 'Low-voltage cabling done right',     href: '/services/network-design#cabling' },
      { title: 'Site-to-Site & SD-WAN', description: 'Secure multi-site connectivity',    href: '/services/network-design#cabling' },
    ],
  },
  {
    label: 'Cameras',
    sublabel: 'UniFi Protect',
    href: '/services/network-design#protect',
    vendors: 'Ubiquiti UniFi Protect',
    tiles: [
      { title: 'IP Security Cameras', description: 'Indoor & outdoor surveillance',   href: '/services/network-design#protect' },
      { title: 'NVR & Storage',       description: 'On-site recording & retention',   href: '/services/network-design#protect' },
      { title: 'Remote Monitoring',   description: 'View any site from anywhere',     href: '/services/network-design#protect' },
      { title: 'AI Detection',        description: 'Person & vehicle smart alerts',   href: '/services/network-design#protect' },
    ],
  },
  {
    label: 'Door Access',
    sublabel: 'UniFi Access',
    href: '/services/network-design#access',
    vendors: 'Ubiquiti UniFi Access',
    tiles: [
      { title: 'Door Controllers',   description: 'Networked entry hardware',          href: '/services/network-design#access' },
      { title: 'Mobile & Card Entry', description: 'Phone, NFC & key-card unlock',     href: '/services/network-design#access' },
      { title: 'Visitor Management', description: 'Guest passes & access logs',        href: '/services/network-design#access' },
    ],
  },
  {
    label: 'IT & Cloud',
    href: '/services/managed-it',
    vendors: 'Microsoft 365, Datto',
    tiles: [
      { title: 'Help Desk',             description: 'Local engineers, fast response',         href: '/services/managed-it#helpdesk' },
      { title: 'Remote Monitoring',     description: 'Datto RMM, patching, automation',        href: '/services/managed-it#rmm' },
      { title: 'Vendor Management',     description: 'One number for all your tech vendors',   href: '/services/managed-it#vendors' },
      { title: 'Microsoft 365',         description: 'Tenant design, licensing, migration',    href: '/services/cloud-microsoft-365#m365' },
      { title: 'Entra ID & Intune',     description: 'Identity & device management',           href: '/services/cloud-microsoft-365#intune' },
    ],
  },
];

/**
 * Simple links shown alongside the mega-menu trigger in the top nav.
 */
export const simpleNavLinks = [
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/about',        label: 'About' },
  { href: '/team',         label: 'Our Team' },
  { href: '/blog',         label: 'Insights' },
];
