// Builds the chatbot's grounding text from the site's own source files, so the bot
// stays in sync whenever a case study or section is edited.
import about from '../data/about-jordan.md?raw';
import aiLoanReview from '../pages/case-study/ai-loan-review.astro?raw';
import orderManagement from '../pages/case-study/order-management.astro?raw';
import aiChatbot from '../pages/case-study/ai-chatbot.astro?raw';
import additionalProjects from '../pages/additional-projects.astro?raw';
import philosophy from '../components/Philosophy.astro?raw';
import fitCheck from '../components/FitCheck.astro?raw';
import experience from '../components/Experience.astro?raw';

const ENTITIES: Record<string, string> = {
  '&amp;': '&', '&mdash;': '—', '&ndash;': '–', '&rarr;': '→', '&larr;': '←',
  '&nbsp;': ' ', '&quot;': '"', '&#39;': "'", '&apos;': "'", '&lt;': '<', '&gt;': '>',
};

// Strip an .astro file down to readable text: keep frontmatter data, drop markup.
function astroToText(source: string): string {
  return source
    .replace(/^---[\s\S]*?---/, (fm) =>
      fm.replace(/^---|---$/g, '').replace(/^import .*$/gm, '').replace(/icon:\s*`[^`]*`,?/g, ''))
    .replace(/<(script|style|svg)[\s\S]*?<\/\1>/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, (e) => ENTITIES[e] ?? ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n+/g, '\n')
    .trim();
}

const sections: [string, string][] = [
  ['Experience, with "the real story" behind each role (homepage section)', astroToText(experience)],
  ['Case study: AI-Powered Loan Review Platform (/case-study/ai-loan-review)', astroToText(aiLoanReview)],
  ['Case study: Multi-Tenant Order Management Platform (/case-study/order-management)', astroToText(orderManagement)],
  ['Case study: Invisible AI — Mortgage Prequalification (/case-study/ai-chatbot)', astroToText(aiChatbot)],
  ['Additional projects (/additional-projects)', astroToText(additionalProjects)],
  ['Design philosophy (homepage section)', astroToText(philosophy)],
  ['Fit check (homepage section)', astroToText(fitCheck)],
];

export const KNOWLEDGE = [
  `<document title="About Jordan">\n${about.trim()}\n</document>`,
  ...sections.map(([title, text]) => `<document title="${title}">\n${text}\n</document>`),
].join('\n\n');
