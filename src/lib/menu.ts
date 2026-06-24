/**
 * Mega-menu data.
 *
 * Structure: categories → tiles. Each category becomes ONE COLUMN in the
 * unified mega-panel — same pattern as cloudflare.com (Compute / Storage /
 * AI / Security columns, all visible at once).
 *
 * Hovering any of the top-nav triggers opens the same shared panel; the
 * triggers themselves still link to their category's landing page when clicked.
 *
 * Adding a tile is purely additive — edit this file, the menu updates everywhere.
 */

export interface MenuTile {
  title: string;
  description: string;
  href: string;
}

export interface MenuCategory {
  label: string;       // top-nav label AND column heading in the panel
  href: string;        // landing page when the label itself is clicked
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
    label: 'Cloudflare',
    href: '/cloudflare',
    tiles: [
      { title: 'Tunnel & WARP',     description: 'Replace your VPN with identity-aware access', href: '/services/cloudflare-zero-trust#tunnel' },
      { title: 'Access (ZTNA)',     description: 'Per-app authorization with any IdP',          href: '/services/cloudflare-zero-trust#access' },
      { title: 'Gateway',           description: 'DNS & HTTP filtering as a service',           href: '/services/cloudflare-zero-trust#gateway' },
      { title: 'Email Security',    description: 'Cloudflare Area 1 in front of M365',          href: '/services/cloudflare-zero-trust#email' },
      { title: 'DNS & DDoS',        description: 'Authoritative DNS, attack mitigation',        href: '/cloudflare#dns' },
      { title: 'Pages & Workers',   description: 'Static sites & serverless at the edge',       href: '/cloudflare#workers' },
    ],
  },
  {
    label: 'Network and Infrastructure',
    href: '/services/network-design',
    tiles: [
      { title: 'UniFi Network',      description: 'Business-grade switching, APs, gateways',  href: '/services/network-design#unifi' },
      { title: 'UniFi Protect',      description: 'Surveillance cameras & NVR management',    href: '/services/network-design#protect' },
      { title: 'UniFi Access',       description: 'Door access control & entry management',   href: '/services/network-design#access' },
      { title: 'Wi-Fi Design',       description: 'Site survey, coverage, capacity',         href: '/services/network-design#wifi' },
      { title: 'Firewall & Routing', description: 'Edge security & multi-WAN failover',       href: '/services/network-design#firewall' },
      { title: 'Cabling & Site-to-Site', description: 'Structured cabling, VPN, SD-WAN',      href: '/services/network-design#cabling' },
    ],
  },
  {
    label: 'IT & Cloud',
    href: '/services/managed-it',
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
 * Simple links shown alongside the mega-menu triggers in the top nav.
 */
export const simpleNavLinks = [
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/about',        label: 'About' },
  { href: '/team',         label: 'Our Team' },
  { href: '/blog',         label: 'Insights' },
];
