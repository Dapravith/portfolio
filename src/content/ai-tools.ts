import type { AiPractice, AiTool } from './schema';

// Tools and descriptions supplied by the owner; they describe uses, not
// measured proficiency. Icon sources: public/ai-tools/README.md.
export const aiTools: AiTool[] = [
  {
    name: 'Claude Code',
    icon: '/ai-tools/claude-code.svg',
    description: { en: 'Agentic coding, debugging, refactoring and testing.', km: 'សរសេរកូដ កែបញ្ហា កែលម្អកូដ និងធ្វើតេស្តដោយមានជំនួយពី AI។' },
    uses: ['coding', 'debugging', 'review'],
  },
  {
    name: 'Cursor',
    icon: '/ai-tools/cursor.svg',
    description: { en: 'AI-assisted code editing and development.', km: 'កែសម្រួលកូដ និងអភិវឌ្ឍកម្មវិធីដោយមានជំនួយពី AI។' },
    uses: ['coding'],
  },
  {
    name: 'ChatGPT',
    icon: '/ai-tools/openai.svg',
    description: { en: 'Research, requirements analysis, architecture and problem-solving.', km: 'ស្រាវជ្រាវ វិភាគតម្រូវការ រៀបចំស្ថាបត្យកម្ម និងដោះស្រាយបញ្ហា។' },
    uses: ['research', 'debugging'],
  },
  {
    name: 'OpenAI Codex',
    icon: '/ai-tools/openai.svg',
    description: { en: 'Code implementation, review and engineering automation.', km: 'អនុវត្ត និងពិនិត្យកូដ ព្រមទាំងធ្វើស្វ័យប្រវត្តិកម្មការងារវិស្វកម្ម។' },
    uses: ['coding', 'review', 'automation'],
  },
  {
    name: 'Hermes AI Agent',
    icon: '/ai-tools/hermes.svg',
    description: { en: 'Agent orchestration, workflow automation and experimentation.', km: 'រៀបចំការងារ AI agents ធ្វើស្វ័យប្រវត្តិកម្ម និងពិសោធន៍។' },
    uses: ['automation'],
  },
  {
    name: 'Google Gemini',
    icon: '/ai-tools/gemini.svg',
    description: { en: 'Research, problem-solving and development assistance.', km: 'ជួយស្រាវជ្រាវ ដោះស្រាយបញ្ហា និងអភិវឌ្ឍកម្មវិធី។' },
    uses: ['research'],
  },
  {
    name: 'Google Antigravity',
    icon: '/ai-tools/antigravity.svg',
    description: { en: 'Agent-assisted development and experimentation.', km: 'អភិវឌ្ឍកម្មវិធី និងពិសោធន៍ដោយមានជំនួយពី AI agents។' },
    uses: ['coding'],
  },
  {
    name: 'MCP Servers',
    icon: '/ai-tools/mcp.svg',
    description: { en: 'Connecting AI assistants to tools, data and services.', km: 'ភ្ជាប់ជំនួយការ AI ទៅឧបករណ៍ ទិន្នន័យ និងសេវាកម្ម។' },
    uses: ['automation'],
  },
];

// Where AI helps at each stage, and what stays with the engineer. Expands the
// owner's statement: "AI accelerates my workflow. I remain responsible for
// architecture, engineering decisions, security, testing, and final validation."
export const aiPractice: AiPractice[] = [
  {
    use: 'coding',
    ai: { en: 'Drafts implementations, refactors and tests from a described change.', km: 'រៀបចំកូដ ការកែលម្អកូដ និងតេស្តពីការផ្លាស់ប្តូរដែលបានពិពណ៌នា។' },
    me: { en: 'The design, the interfaces, and whether a change is accepted.', km: 'ការរចនា ចំណុចប្រទាក់ និងការសម្រេចថាការផ្លាស់ប្តូរត្រូវទទួលយកឬអត់។' },
  },
  {
    use: 'research',
    ai: { en: 'Summarises documentation and compares approaches.', km: 'សង្ខេបឯកសារ និងប្រៀបធៀបវិធីសាស្ត្រ។' },
    me: { en: 'Checking claims against the official docs and choosing what fits the requirements.', km: 'ផ្ទៀងផ្ទាត់ព័ត៌មានជាមួយឯកសារផ្លូវការ និងជ្រើសរើសអ្វីដែលសមនឹងតម្រូវការ។' },
  },
  {
    use: 'debugging',
    ai: { en: 'Proposes hypotheses and reads logs and stack traces quickly.', km: 'ផ្តល់សម្មតិកម្ម និងអាន log និង stack trace បានលឿន។' },
    me: { en: 'Reproducing the problem and confirming the root cause before a fix ships.', km: 'បង្កើតបញ្ហាឡើងវិញ និងបញ្ជាក់មូលហេតុពិតមុនពេលដាក់ការជួសជុល។' },
  },
  {
    use: 'review',
    ai: { en: 'A second reader for diffs: edge cases, naming, missing tests.', km: 'អ្នកអានទីពីរសម្រាប់ diff៖ ករណីពិសេស ការដាក់ឈ្មោះ និងតេស្តដែលខ្វះ។' },
    me: { en: 'Security, behaviour and the final approval.', km: 'សុវត្ថិភាព ឥរិយាបថ និងការអនុម័តចុងក្រោយ។' },
  },
  {
    use: 'automation',
    ai: { en: 'Agents run repetitive multi-step tasks; MCP servers connect them to tools.', km: 'Agents ដំណើរការការងារច្រើនជំហានដដែលៗ ហើយ MCP servers ភ្ជាប់វាទៅឧបករណ៍។' },
    me: { en: 'What an agent may touch, and verifying what it produced.', km: 'កំណត់ថា agent អាចប៉ះពាល់អ្វីខ្លះ និងផ្ទៀងផ្ទាត់លទ្ធផលរបស់វា។' },
  },
];
