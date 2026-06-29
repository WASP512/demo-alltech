/**
 * Security Gap Assessment questionnaire.
 *
 * A self-serve set of yes/no security questions, grouped by domain. Each question
 * declares its `ideal` answer — the response that represents good security posture.
 * Most are "good if yes"; a few are "risk if yes" (ideal: 'no'), e.g. a flat shared
 * Wi-Fi into the internal network, or unmanaged BYOD access.
 *
 * Scoring (see scoreAssessment): a question earns a point only when the answer
 * matches `ideal`. "Not sure" and the opposite answer both score 0. 100% = every
 * question answered at the ideal posture.
 *
 * Wording is freely editable here; the wizard, scoring, and email all derive from
 * this single source.
 */

export type Answer = 'yes' | 'no' | 'unsure';

export interface Question {
  id: string;
  text: string;
  ideal: 'yes' | 'no';
}

export interface AssessmentDomain {
  id: string;
  label: string;
  /** One-line framing shown under the domain heading in the wizard. */
  blurb: string;
  questions: Question[];
}

export const domains: AssessmentDomain[] = [
  {
    id: 'backup',
    label: 'Backup & Recovery',
    blurb: 'Can you reliably get your data and systems back after a failure or attack?',
    questions: [
      { id: 'bk_confident', text: 'Are you confident you have good, reliable backups?', ideal: 'yes' },
      { id: 'bk_frequency', text: 'Is your backup frequency sufficient for your tolerance for data loss?', ideal: 'yes' },
      { id: 'bk_321', text: 'Do your backups follow the 3-2-1 rule (3 copies, 2 media/systems, 1 offsite) and include an immutable copy?', ideal: 'yes' },
      { id: 'bk_restore', text: 'Have you recently tested a restore of critical data or systems?', ideal: 'yes' },
      { id: 'bk_tech', text: 'Have you evaluated current technology to see if there is a better way to store and recover critical data?', ideal: 'yes' },
      { id: 'bk_config', text: 'Do you back up device and configuration data for critical systems and network devices — not just the data?', ideal: 'yes' },
      { id: 'bk_sparing', text: 'Do you have a sparing plan for critical technical components your business depends on?', ideal: 'yes' },
    ],
  },
  {
    id: 'patching',
    label: 'Patching & Vulnerabilities',
    blurb: 'Are your systems current and free of known weaknesses?',
    questions: [
      { id: 'pv_patched', text: 'Are all your systems (internal and external) patched with the most recent vendor security updates?', ideal: 'yes' },
      { id: 'pv_vulns', text: 'Are you confident there are no risky configurations, unpatched systems, or end-of-life devices exposing you?', ideal: 'yes' },
    ],
  },
  {
    id: 'firewall',
    label: 'Firewall',
    blurb: 'Is your network edge actively inspecting and controlling traffic?',
    questions: [
      { id: 'fw_modern', text: 'Do you have a modern firewall with threat detection and response protecting your network and systems?', ideal: 'yes' },
      { id: 'fw_policy', text: 'Are your firewall policies user- and application-aware, rather than just simple IP-address and port rules?', ideal: 'yes' },
    ],
  },
  {
    id: 'wireless',
    label: 'Wireless',
    blurb: 'Does your Wi-Fi keep guests and untrusted devices off your internal network?',
    questions: [
      { id: 'wl_shared', text: 'Do you use a shared Wi-Fi SSID and password that allows access to your internal network?', ideal: 'no' },
    ],
  },
  {
    id: 'identity',
    label: 'Identity & Access',
    blurb: 'Is access to your systems protected against stolen or guessed credentials?',
    questions: [
      { id: 'ia_password', text: 'Do you enforce a password policy to protect users and systems from unauthorized access?', ideal: 'yes' },
      { id: 'ia_2fa', text: 'Do your critical systems require 2FA / multi-factor authentication?', ideal: 'yes' },
    ],
  },
  {
    id: 'endpoint',
    label: 'Endpoint Protection',
    blurb: 'Can your devices stop modern threats like ransomware — not just known viruses?',
    questions: [
      { id: 'ep_edr', text: 'Do your systems run modern endpoint protection (behavioral EDR with AI/monitoring, not just antivirus) able to defeat known and unknown threats?', ideal: 'yes' },
    ],
  },
  {
    id: 'email',
    label: 'Email Security',
    blurb: 'Is malicious email stopped before it reaches your people?',
    questions: [
      { id: 'em_filter', text: 'Do you have an email filtering service that screens for both spam and malicious phishing email?', ideal: 'yes' },
    ],
  },
  {
    id: 'awareness',
    label: 'Security Awareness',
    blurb: 'Are your people trained to recognize and resist attacks?',
    questions: [
      { id: 'aw_training', text: 'Do you require phishing and/or security-awareness training for all employees, building a culture of cyber awareness?', ideal: 'yes' },
    ],
  },
  {
    id: 'monitoring',
    label: 'Monitoring & Response',
    blurb: 'Can you see threats and contain them quickly?',
    questions: [
      { id: 'mr_logs', text: 'Do you routinely review security logs for threat investigation?', ideal: 'yes' },
      { id: 'mr_isolate', text: 'Can you isolate an infected device or system in near real-time when a threat is detected?', ideal: 'yes' },
    ],
  },
  {
    id: 'segmentation',
    label: 'Segmentation & Zero Trust',
    blurb: 'Are risky devices and critical systems walled off from everyone else?',
    questions: [
      { id: 'zt_iot', text: 'Are devices that cannot be patched (or IoT/OT devices) segmented away from your users?', ideal: 'yes' },
      { id: 'zt_least', text: 'Are users segmented from critical systems using least-privilege and zero-trust principles?', ideal: 'yes' },
    ],
  },
  {
    id: 'remote',
    label: 'Remote Access',
    blurb: 'Do remote and traveling staff connect securely?',
    questions: [
      { id: 'ra_vpn', text: 'Do remote or traveling employees use a VPN or zero-trust access solution to reach your network and critical systems?', ideal: 'yes' },
    ],
  },
  {
    id: 'byod',
    label: 'Device Trust (BYOD)',
    blurb: 'Are unmanaged personal devices kept away from company resources?',
    questions: [
      { id: 'by_unmanaged', text: 'Do you allow access from non-company-owned devices that may have limited protections or a possible unknown infection?', ideal: 'no' },
    ],
  },
];

export const allQuestions: Question[] = domains.flatMap((d) => d.questions);

export interface DomainScore {
  id: string;
  label: string;
  ideal: number;
  total: number;
  percent: number;
}

export interface AssessmentScore {
  overallPercent: number;
  idealCount: number;
  totalCount: number;
  domains: DomainScore[];
  /** Domains scoring below the attention threshold, weakest first. */
  weakDomains: DomainScore[];
}

/** Domains at or below this percent are flagged as "areas to improve". */
export const ATTENTION_THRESHOLD = 70;

/**
 * Score a set of answers. A question counts only when the answer equals its
 * `ideal`; missing answers and "not sure" score 0.
 */
export function scoreAssessment(answers: Record<string, Answer>): AssessmentScore {
  const domainScores: DomainScore[] = domains.map((d) => {
    const total = d.questions.length;
    const ideal = d.questions.reduce(
      (n, q) => (answers[q.id] === q.ideal ? n + 1 : n),
      0,
    );
    return {
      id: d.id,
      label: d.label,
      ideal,
      total,
      percent: total === 0 ? 0 : Math.round((ideal / total) * 100),
    };
  });

  const idealCount = domainScores.reduce((n, d) => n + d.ideal, 0);
  const totalCount = domainScores.reduce((n, d) => n + d.total, 0);
  const overallPercent = totalCount === 0 ? 0 : Math.round((idealCount / totalCount) * 100);

  const weakDomains = domainScores
    .filter((d) => d.percent <= ATTENTION_THRESHOLD)
    .sort((a, b) => a.percent - b.percent);

  return { overallPercent, idealCount, totalCount, domains: domainScores, weakDomains };
}
