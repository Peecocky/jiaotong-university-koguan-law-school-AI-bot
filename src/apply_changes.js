const fs = require('fs');
let src = fs.readFileSync('src/moot_orig_backup.jsx', 'utf8');

// ─────────────────────────────────────────────────────────────
// 1. Replace GUIDE_ITEMS with nameEn/orgEn added
// ─────────────────────────────────────────────────────────────
const guideStart = src.indexOf('const GUIDE_ITEMS = [');
const guideEnd = src.indexOf('];', guideStart) + 2;

const NEW_GUIDE = `const GUIDE_ITEMS = [
  { type: "\u79d1\u521b\u7c7b", scope: "\u56fd\u9645\u7ea7", name: "\u4e2d\u56fd\u56fd\u9645\u5927\u5b66\u751f\u521b\u65b0\u5927\u8d5b", nameEn: "China International College Students Innovation Competition", org: "\u6559\u80b2\u90e8\u7b49 12 \u4e2a\u90e8\u95e8\u4f1a\u540c\u7701\u7ea7\u4eba\u6c11\u653f\u5e9c", orgEn: "MoE + 11 Ministries", freq: "\u4e00\u5e74\u4e00\u5c4a" },
  { type: "\u79d1\u521b\u7c7b", scope: "\u56fd\u5bb6\u7ea7", name: "\u201c\u6311\u6218\u676f\u201d\u5168\u56fd\u5927\u5b66\u751f\u8bfe\u5916\u5b66\u672f\u79d1\u6280\u4f5c\u54c1\u7ade\u8d5b", nameEn: "Challenge Cup National Student Academic Science & Technology Works Competition", org: "\u5171\u9752\u56e2\u4e2d\u592e\u3001\u4e2d\u56fd\u79d1\u534f\u3001\u6559\u80b2\u90e8\u3001\u4e2d\u56fd\u793e\u4f1a\u79d1\u5b66\u9662\u3001\u5168\u56fd\u5b66\u8054", orgEn: "Communist Youth League Central, CAST, MoE", freq: "\u4e24\u5e74\u4e00\u5c4a" },
  { type: "\u79d1\u521b\u7c7b", scope: "\u56fd\u5bb6\u7ea7", name: "\u201c\u6311\u6218\u676f\u201d\u4e2d\u56fd\u5927\u5b66\u751f\u521b\u4e1a\u8ba1\u5212\u7ade\u8d5b", nameEn: "Challenge Cup China Student Entrepreneurship Competition", org: "\u5171\u9752\u56e2\u4e2d\u592e\u3001\u4e2d\u56fd\u79d1\u534f\u3001\u6559\u80b2\u90e8\u3001\u5168\u56fd\u5b66\u8054", orgEn: "Communist Youth League Central, CAST, MoE", freq: "\u4e00\u5e74\u4e00\u5c4a" },
  { type: "\u5b66\u79d1\u7c7b", scope: "\u56fd\u9645\u7ea7", name: "\u6770\u8d5b\u666e\uff08JESSUP\uff09\u56fd\u9645\u6cd5\u6a21\u62df\u6cd5\u5ead\u5927\u8d5b", nameEn: "Philip C. Jessup International Law Moot Court Competition", org: "\u7f8e\u56fd\u56fd\u9645\u6cd5\u5b66\u751f\u8054\u5408\u4f1a\uff08ILSA\uff09\u3001\u7f8e\u56fd\u56fd\u9645\u6cd5\u5b66\u4f1a\uff08ASIL\uff09", orgEn: "ILSA / ASIL", freq: "\u4e00\u5e74\u4e00\u5c4a", teamId: 9 },
  { type: "\u5b66\u79d1\u7c7b", scope: "\u56fd\u9645\u7ea7", name: "Willem C. Vis \u6a21\u62df\u56fd\u9645\u5546\u4e8b\u4ef2\u88c1\u8fa9\u8bba\u8d5b", nameEn: "Willem C. Vis International Commercial Arbitration Moot", org: "\u8054\u5408\u56fd\u56fd\u9645\u8d38\u6613\u6cd5\u59d4\u5458\u4f1a\uff08UNCITRAL\uff09", orgEn: "UNCITRAL", freq: "\u4e00\u5e74\u4e00\u5c4a", teamId: 1 },
  { type: "\u5b66\u79d1\u7c7b", scope: "\u56fd\u9645\u7ea7", name: "\u6a21\u62df\u56fd\u9645\u6295\u8d44\u4ef2\u88c1\u7ade\u8d5b\uff08FDI Moot\uff09", nameEn: "FDI International Investment Arbitration Moot", org: "\u56fd\u9645\u6cd5\u5f8b\u7814\u7a76\u4e2d\u5fc3\uff08CILS\uff09", orgEn: "CILS / SCIA", freq: "\u4e00\u5e74\u4e00\u5c4a", teamId: 3 },
  { type: "\u5b66\u79d1\u7c7b", scope: "\u56fd\u9645\u7ea7", name: "\u56fd\u9645\u5211\u4e8b\u6cd5\u9662\uff08ICC\uff09\u6a21\u62df\u6cd5\u5ead\u6bd4\u8d5b\uff08\u542b\u4e2d\u82f1\u6587\uff09", nameEn: "ICC Moot Court Competition (Chinese & English)", org: "\u56fd\u9645\u5f8b\u5e08\u534f\u4f1a\uff08IBA\uff09\u3001\u56fd\u9645\u5211\u4e8b\u6cd5\u9662\uff08ICC\uff09\u3001\u4e2d\u56fd\u56fd\u9645\u5211\u6cd5\u9752\u5e74\u5b66\u8005\u8054\u76df", orgEn: "IBA / ICC", freq: "\u4e00\u5e74\u4e00\u5c4a", teamId: 6 },
  { type: "\u5b66\u79d1\u7c7b", scope: "\u56fd\u9645\u7ea7", name: "\u7ea2\u5341\u5b57\u56fd\u9645\u4eba\u9053\u6cd5\u6a21\u62df\u6cd5\u5ead\uff08IHL\uff09\u7ade\u8d5b", nameEn: "International Humanitarian Law Moot Court Competition (IHL)", org: "\u7ea2\u5341\u5b57\u56fd\u9645\u59d4\u5458\u4f1a\uff08ICRC\uff09\u3001\u4e2d\u56fd\u7ea2\u5341\u5b57\u4f1a\u603b\u4f1a", orgEn: "ICRC / China Red Cross Society", freq: "\u4e00\u5e74\u4e00\u5c4a", teamId: 7 },
  { type: "\u5b66\u79d1\u7c7b", scope: "\u56fd\u9645\u7ea7", name: "\u6cd5\u5170\u514b\u798f\u56fd\u9645\u6295\u8d44\u6a21\u62df\u4ef2\u88c1\u5ead", nameEn: "Frankfurt Investment Arbitration Moot Court", org: "\u5fb7\u56fd\u9a6c\u514b\u65af\u00b7\u666e\u6717\u514b\u6cd5\u5f8b\u53f2\u4e0e\u6cd5\u7406\u8bba\u7814\u7a76\u6240", orgEn: "Max Planck Institute (Germany)", freq: "\u4e00\u5e74\u4e00\u5c4a", teamId: 13 },
  { type: "\u5b66\u79d1\u7c7b", scope: "\u56fd\u9645\u7ea7", name: "\u56fd\u9645\u822a\u7a7a\u6cd5\u6a21\u62df\u6cd5\u5ead\u7ade\u8d5b\uff08IALMC\uff09", nameEn: "International Air Law Moot Court Competition (IALMC)", org: "\u8377\u5170\u83b1\u987f\u5927\u5b66\u822a\u7a7a\u6cd5\u4e0e\u7a7a\u95f4\u6cd5\u56fd\u9645\u7814\u7a76\u4e2d\u5fc3\uff08IIASL\uff09", orgEn: "Leiden University IIASL", freq: "\u4e00\u5e74\u4e00\u5c4a", teamId: 10 },
  { type: "\u5b66\u79d1\u7c7b", scope: "\u56fd\u9645\u7ea7", name: "\u666e\u83b1\u65af\u4f20\u5a92\u6cd5\u56fd\u9645\u6a21\u62df\u6cd5\u5ead\u7ade\u8d5b", nameEn: "Price Media Law Moot Court Competition", org: "\u82f1\u56fd\u725b\u6d25\u5927\u5b66", orgEn: "University of Oxford", freq: "\u4e00\u5e74\u4e00\u5c4a" },
  { type: "\u5b66\u79d1\u7c7b", scope: "\u56fd\u9645\u7ea7", name: "\u66fc\u5f17\u96f7\u5fb7\u00b7\u62c9\u514b\u65af\u56fd\u9645\u7a7a\u95f4\u6cd5\u6a21\u62df\u6cd5\u5ead\u7ade\u8d5b", nameEn: "Manfred Lachs Space Law Moot Court Competition", org: "\u56fd\u9645\u7a7a\u95f4\u6cd5\u5b66\u4f1a\uff08IISL\uff09", orgEn: "IISL", freq: "\u4e00\u5e74\u4e00\u5c4a", teamId: 5 },
  { type: "\u5b66\u79d1\u7c7b", scope: "\u56fd\u9645\u7ea7", name: "ICC \u56fd\u9645\u5546\u4e8b\u8c03\u89e3\u6bd4\u8d5b", nameEn: "ICC International Commercial Mediation Competition", org: "\u56fd\u9645\u5546\u4f1a\uff08ICC\uff09", orgEn: "ICC", freq: "\u4e00\u5e74\u4e00\u5c4a" },
  { type: "\u5b66\u79d1\u7c7b", scope: "\u56fd\u9645\u7ea7", name: "\u56fd\u9645\u4f53\u80b2\u6a21\u62df\u4ef2\u88c1\u7ade\u8d5b\uff08SAM\uff09", nameEn: "Sports Arbitration Moot (SAM)", org: "\u56fd\u9645\u8db3\u8054\uff08FIFA\uff09\u3001\u745e\u58eb\u4ef2\u88c1\u5b66\u9662", orgEn: "FIFA / Swiss Arbitration Academy", freq: "\u4e00\u5e74\u4e00\u5c4a", teamId: 11 },
  { type: "\u5b66\u79d1\u7c7b", scope: "\u56fd\u5bb6\u7ea7", name: "\u201c\u5317\u5916\u2014\u4e07\u6167\u8fbe\u676f\u201d\u56fd\u9645\u77e5\u8bc6\u4ea7\u6743\u6a21\u62df\u6cd5\u5ead\u5927\u8d5b", nameEn: "BFSU-Wanhuida Cup International IP Moot Court Competition", org: "\u6700\u9ad8\u4eba\u6c11\u6cd5\u9662\u77e5\u8bc6\u4ea7\u6743\u6cd5\u5ead\u3001\u5317\u4eac\u5916\u56fd\u8bed\u5927\u5b66\u6cd5\u5b66\u9662\u3001\u4e07\u6167\u8fbe\u77e5\u8bc6\u4ea7\u6743\u4ee3\u7406\u6709\u9650\u516c\u53f8", orgEn: "SPC IP Tribunal / BFSU / Wanhuida", freq: "\u4e00\u5e74\u4e00\u5c4a" },
  { type: "\u5b66\u79d1\u7c7b", scope: "\u56fd\u5bb6\u7ea7", name: "\u4e2d\u56fd WTO \u6a21\u62df\u6cd5\u5ead\u8fa9\u8bba\u8d5b", nameEn: "China WTO Moot Court Competition", org: "\u5546\u52a1\u90e8\u3001\u4e2d\u56fd\u653f\u6cd5\u5927\u5b66\u3001\u897f\u5357\u653f\u6cd5\u5927\u5b66", orgEn: "MOFCOM / CUPL / SWUPL", freq: "\u4e00\u5e74\u4e00\u5c4a", teamId: 8 },
  { type: "\u5b66\u79d1\u7c7b", scope: "\u56fd\u5bb6\u7ea7", name: "\u4e2d\u56fd\u56fd\u9645\u6d77\u6d0b\u6cd5\u6a21\u62df\u6cd5\u5ead\u7ade\u8d5b", nameEn: "International Law of the Sea Moot Court Competition (ILOSMCC)", org: "\u4e2d\u56fd\u6d77\u6d0b\u6cd5\u5b66\u4f1a\u3001\u6b66\u6c49\u5927\u5b66", orgEn: "Chinese Society of Intl Law of Sea / WHU", freq: "\u4e00\u5e74\u4e00\u5c4a", teamId: 4 },
  { type: "\u5b66\u79d1\u7c7b", scope: "\u56fd\u5bb6\u7ea7", name: "\u201c\u7406\u5f8b\u676f\u201d\u5168\u56fd\u9ad8\u6821\u6a21\u62df\u6cd5\u5ead\u7ade\u8d5b", nameEn: "Lee & Li Cup National University Moot Court Competition", org: "\u7406\u5f8b\u676f\u6a21\u62df\u6cd5\u5ead\u6bd4\u8d5b\u7ec4\u59d4\u4f1a\u3001\u6e05\u534e\u5927\u5b66", orgEn: "Lee & Li Cup Organizing Committee / THU", freq: "\u4e00\u5e74\u4e00\u5c4a" },
  { type: "\u5b66\u79d1\u7c7b", scope: "\u56fd\u5bb6\u7ea7", name: "\u5168\u56fd\u5927\u5b66\u751f\u6a21\u62df\u6cd5\u5ead\u7ade\u8d5b", nameEn: "National University Moot Court Competition", org: "\u6559\u80b2\u90e8\u56fd\u5bb6\u7ea7\u5b9e\u9a8c\u6559\u5b66\u793a\u8303\u4e2d\u5fc3\u6cd5\u5b66\u7ec4\u8054\u5e2d\u4f1a", orgEn: "MoE National Experimental Teaching Center (Law)", freq: "\u4e00\u5e74\u4e00\u5c4a" },
  { type: "\u5176\u4ed6", scope: "\u56fd\u5bb6\u7ea7", name: "\u5168\u56fd\u5927\u5b66\u751f\u804c\u4e1a\u89c4\u5212\u5927\u8d5b", nameEn: "National University Career Planning Competition", org: "\u6559\u80b2\u90e8", orgEn: "Ministry of Education", freq: "\u4e00\u5e74\u4e00\u5c4a" },
];`;

src = src.slice(0, guideStart) + NEW_GUIDE + src.slice(guideEnd);
console.log('1. GUIDE_ITEMS updated');

// ─────────────────────────────────────────────────────────────
// 2. Language helpers + TEAM_EN_CONTENT
// ─────────────────────────────────────────────────────────────
const DISPLAY_MARKER = '// System prompt is configured on the Dify server side.';
const insertPos = src.indexOf(DISPLAY_MARKER);
if (insertPos < 0) { console.error('DISPLAY_MARKER not found'); process.exit(1); }

const LANG_INSERT = `// \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// LANGUAGE HELPERS
// \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const TAG_EN = {
  "\u56fd\u9645": "International",
  "\u56fd\u5185": "Domestic",
  "\u56fd\u5185/\u56fd\u9645": "Intl & Domestic"
};
const ORG_TAG_EN = {
  "\u4e2d\u56fd\u6d77\u6d0b\u6cd5\u5b66\u4f1a": "Chinese Society of Intl Law of Sea",
  "ICRC / \u4e2d\u56fd\u7ea2\u5341\u5b57\u603b\u4f1a": "ICRC / China Red Cross",
  "\u5546\u52a1\u90e8 / \u4e2d\u56fd\u653f\u6cd5\u5927\u5b66": "MOFCOM / CUPL",
  "\u4e2d\u56fd\u653f\u6cd5\u5927\u5b66": "CUPL",
  "CILS / \u6df1\u5733\u56fd\u9645\u4ef2\u88c1\u9662": "CILS / SCIA",
  "\u5fb7\u56fd\u9a6c\u514b\u65af\u00b7\u666e\u6717\u514b\u7814\u7a76\u6240": "Max Planck Institute (Germany)",
};

const TEAM_EN_CONTENT = {
  9: {
    introduction: "The Philip C. Jessup International Law Moot Court Competition, founded in 1960, is the world's largest and oldest moot court competition, often called the Olympics of international law. In 2024, 674 teams from 100 jurisdictions registered globally. The China Mainland region has held annual competitions since 2003; the 2024 edition hosted 65 universities at Renmin University of China, the largest national round in history. Conducted entirely in English, comprising memorial (written) and oral rounds. Top teams from the China regional round (usually 8-9) advance to the Washington D.C. international round each April.",
    achievements: "Philip C. Jessup International Law Moot Court Competition\\n2018  National Round  First Prize (incl. Best Oralist)\\n2019  National Round  National Overall First (Final Runner-up), Global Top 50\\n2020  Domestic Round  Second Prize\\n2021  International Round  First Prize\\n2022  International Round  Global 47th, National First Prize, Best Oralist\\n2024  National Round  Second Prize\\n2025  China Region First Prize (Advanced to International)",
    requirements: "Genuine passion for Jessup; able to sustain long-term motivation. Willing to invest substantial time; diligent and responsible. Strong analytical thinking and clear logical reasoning. Good teamwork and resilience under pressure. Priority given to students with international law coursework or prior moot experience, though not required; English proficiency assessed primarily through interview.",
    application: "Deadline: April 26, 23:59. Submit Chinese CV to email. Email subject: Name + Year. Written test released: April 27. Written submission deadline: May 12, 23:59. Interview: mid-to-late May. Contact WeChat: sebastian_xu41. Email: jessup@sjtu.edu.cn",
    schedule: "September: Case released (ILSA official). Sep-January: Legal research and memorial writing. January-February: Oral argument preparation. February: China Mainland regional round. April: Washington D.C. international round.",
  },
  1: {
    introduction: "The Willem C. Vis International Commercial Arbitration Moot is the world's largest international commercial arbitration moot court competition, held annually in Vienna, Austria each spring since 1994, attracting 300+ university teams worldwide. Since 2003 an Eastern counterpart, the Vis (East) Moot, has been held in Hong Kong. In China, related competitions include the CIETAC Cup and Moot Shanghai. Cases revolve around a fictitious international sales contract governed by the CISG. All proceedings are conducted in English.",
    achievements: "Willem C. Vis Moot / CIETAC Cup\\n2018 CIETAC Cup Second Prize\\n2020 CIETAC Cup Third Prize | 2021 CIETAC Cup Third Prize\\n2024 CIETAC Cup National Champion | 2025 CIETAC Cup Second Prize\\n\\nMoot Shanghai\\n2022 Moot Shanghai Global Top 16, 4th in China\\n2025 Moot Shanghai Champion\\n\\nUNIDROIT PICC Moot 2025 Global Top 4\\nAsia-Pacific Commercial Arbitration Moot 2025 Runner-up",
    requirements: "Proficient English communication and legal analysis; able to perform oral pleadings. Interest in international commercial arbitration. Sufficient time commitment for systematic preparation. Open to all undergraduate and graduate students at Koguan School of Law. Selection: full-English interview including simulated oral pleading.",
    application: "Deadline: May 18, 20:00. Materials: CV in Chinese and English. Email subject: Name - Year - Competition preference. Interview: tentatively May 25-26. Email: vismoot@sjtu.edu.cn",
    schedule: "Sep-January: Legal research and memorial writing. January-February: Oral argument intensive preparation. Spring (Mar-Apr): Vienna or Hong Kong competition. CIETAC Cup: Autumn domestic round. Moot Shanghai: Spring Shanghai round.",
  },
  3: {
    introduction: "The FDI Moot (Foreign Direct Investment International Arbitration Moot) is ranked alongside the Jessup and Vis Moot as one of the world's three major moot court competitions. Chinese teams must compete in the Shenzhen Cup, organized by the Shenzhen Court of International Arbitration, to qualify for the global round. Notable participating institutions include Peking University, Tsinghua University, CUPL, UIBE, Fudan University, Xiamen University, and ECUPL.\\n\\nNote: FDI Moot and the Frankfurt Investment Arbitration Moot Court are contested by the same SJTU team.",
    achievements: "FDI Moot\\n2021 FDI Moot Shenzhen First Prize\\n2022 FDI Moot Shenzhen National First Prize\\n2023 China National Round National Top 12\\n2023 FDI Moot Shenzhen Cup National Top 16\\n2025 FDI Moot Shenzhen First Prize",
    requirements: "Undergraduate or graduate student at Shanghai Jiao Tong University. Strong English listening, speaking, reading, and writing skills. Sufficient time commitment. No prior moot court experience required. Interview focuses on English oral communication.",
    application: "Deadline: April 13, 24:00 (annually). Send CV to registration email. Email subject: School - Name - Year. Body: indicate first or second choice competition preference. Email: fdi.moot@sjtu.edu.cn",
    schedule: "April: Deadline, CV screening, online interview notification. April-October: Preparation (memorial writing plus oral training). Autumn: Shenzhen Cup domestic round. After domestic: Advance to global round.",
  },
  13: {
    introduction: "Note: The Frankfurt Investment Arbitration Moot Court and the FDI Moot (Shenzhen Cup) are contested by the same SJTU team.\\n\\nThe Frankfurt Investment Arbitration Moot Court (Frankfurt IAM) is organized by the Max Planck Institute for Legal History and Legal Theory in Frankfurt, Germany. Teams argue as both claimant and respondent based on ISDS principles, bilateral investment treaties, and related international investment law. All proceedings are in English.",
    achievements: "Frankfurt Investment Arbitration Moot Court\\n(Same team as FDI Moot - please refer to the FDI Moot page for combined results)",
    requirements: "Same team and recruitment process as FDI Moot. Undergraduate or graduate student at Shanghai Jiao Tong University. Strong English skills. Sufficient time commitment. No prior moot court experience required. For full application details, see the FDI Moot team page.",
    application: "Same registration process as FDI Moot. Deadline: April 13, 24:00 (annually). Email: fdi.moot@sjtu.edu.cn",
    schedule: "Competition schedule unified with FDI Moot team. Autumn: Frankfurt international round. Exact dates per annual official announcement.",
  },
  6: {
    introduction: "The ICC Moot Court Competition (ICCMCC) simulates proceedings before the International Criminal Court, based on international criminal law and ICC rules of procedure and evidence. The ICC promotes the competition in all six official languages. The SJTU team prepares for both Chinese and English rounds simultaneously (same case). Selection includes a full-English written test and interview.",
    achievements: "ICC Moot Court Competition (Chinese and English)\\n2019 Chinese Round National First Prize\\n2020 National Second Prize\\n2021 Chinese Round National First Prize\\n2022 English Round National 4th / First Prize\\n2023 Chinese Round National First Prize\\n2024 Chinese Round National First Prize (advanced to The Hague), Best Prosecution Award\\n2025 Chinese Round National First Prize, Runner-up\\n2025 Long'an Cup ICC English Moot Third Prize",
    requirements: "Undergraduate or Master's students (1st/2nd year) at Koguan School of Law. Strong time commitment; excellent teamwork. Basic English reading, writing, and oral skills. Strong research and analytical abilities.",
    application: "Registration deadline: September 22, 24:00. Brief submission deadline: September 27, 12:00. Interview: September 28. Materials: CV in Chinese and English (incl. WeChat ID, language level). Email subject: Name - Year. Email: icc.moot@sjtu.edu.cn",
    schedule: "Sep 22: Registration deadline. Sep 27: Full-English brief submission. Sep 28: Interview. Oct-Apr: Preparation period. Spring: International round (incl. The Hague).",
  },
  7: {
    introduction: "The International Humanitarian Law (IHL) Moot Court Competition is organized by the ICRC and the China Red Cross Society. The case is drafted by ICRC legal experts; judges are IHL specialists from multiple countries. Each team submits written memorials and argues as both prosecution and defense. The competition has been held for thirteen editions, with 30+ leading Chinese universities participating annually. Top three mainland teams are sponsored by the Red Cross to attend the Asia-Pacific IHL Moot.",
    achievements: "IHL Moot Court Competition\\n2019 National First Prize\\n2020 Domestic Selection Second Prize\\n2022 National First Prize\\n2023 National First Prize\\n2024 National First Prize\\n2025 Second Prize",
    requirements: "Undergraduate or graduate student at Koguan School of Law. Strong English reading, writing, and oral communication skills. Good analytical and research abilities; excellent teamwork. Sufficient time commitment.",
    application: "Deadline: May 13, 20:00. Send Chinese and English CV to email. Email subject: Name - Year. Online info session: May 12, 20:00-22:00. Zoom: 646 1623 8936 (PW: 252964). Email: ihl.moot@sjtu.edu.cn",
    schedule: "May 12: Online info session. May 13: Registration deadline. May 24: Memorial submission deadline. May 27: Interview. Autumn-Mar: Preparation period. Spring: Asia-Pacific international round.",
  },
  10: {
    introduction: "The Leiden-Sarin International Air Law Moot Court Competition is the most influential international moot court competition in aviation law. Established at the recommendation of ICAO, it is hosted by the IIASL at Leiden University, Netherlands, the only global aviation law moot, now in its sixteenth edition. The international round rotates among participating countries. Teams argue for both applicant and respondent based on the Chicago Convention and related treaties.",
    achievements: "Leiden-Sarin International Air Law Moot Court Competition\\n2024 China Region Second Prize, Outstanding Oral Argument Award",
    requirements: "Full-time undergraduate or Master's student at SJTU (any major). Basic English listening, speaking, reading, and writing ability. Basic legal research skills. Interest in international law and aviation law. Responsible, collaborative, with strong communication and resilience.",
    application: "Deadline: October 20, 24:00. Email subject: Year (UG/Master) - Name - Aviation Law Moot Selection. Material 1: Chinese CV. Material 2: Issues summary (English, max one A4 page). Email: aviation.law@sjtu.edu.cn",
    schedule: "Oct 20: Registration deadline. After applying: Selected candidates notified for interview. Next February: Domestic qualification round. 2026: 17th International Round (Namibia; must qualify domestically).",
  },
  5: {
    introduction: "The Manfred Lachs Space Law Moot Court Competition, established by the IISL in 1992, is an annual global competition. The Global Final is heard by three sitting judges of the International Court of Justice. The Chinese Society of Space Law has organized Chinese teams since 2003; in 2022, 48 teams from 30 universities competed in the oral rounds.",
    achievements: "Manfred Lachs Space Law Moot Court Competition\\n2022 China Region First Prize\\n2022 Asia-Pacific Region Top 8",
    requirements: "Good English reading, writing, and oral skills. Strong logical analysis and research abilities. Excellent teamwork and resilience. Adequate time commitment. No prior competition experience required. Priority for students enrolled in Outer Space Law (LAW6873) this semester.",
    application: "Deadline: September 26, 20:00. Email subject: Name - Year - Space Law Selection. Materials: Chinese CV (1 page, incl. English score) plus Written exercise (at least 500 words). Email: space.law@sjtu.edu.cn",
    schedule: "Sep 26: Registration deadline. Oct 31: Registration finalized. Nov 16: Electronic brief submission. Dec 9-10: Beijing oral round (TBC). Next April: Global Final.",
  },
  11: {
    introduction: "The Sports Arbitration Moot (SAM), organized by FIFA, the Swiss Arbitration Academy, and the University of Neuchatel, is the leading international competition in sports arbitration. Since its inaugural 2022 edition SAM has attracted top institutions including Universite Paris II, University of Vienna, QMUL, Peking University, and Wuhan University. All teams receive free access to the Jus Mundi legal research platform. Teams reaching the Top 16 travel to Europe for the in-person final.",
    achievements: "Sports Arbitration Moot (SAM)\\n2024 Global Final Top 8\\n     Round-robin Stage First\\n     Best Respondent Award | Best Legal Research Award",
    requirements: "Law (LLB/LLM/PhD) students at SJTU. Strong English legal research and writing ability, or excellent English oral advocacy skills. Hardworking, diligent, strong team collaboration. Available for full training during competition period (Nov - next May). Only first-time SAM participants may apply.",
    application: "Deadline: October 30, 17:00. Materials: CV plus English motivation letter (max 450 words). Email subject: Name + Year + Major. Note: no concurrent participation in other moots. Email: sam.moot@sjtu.edu.cn",
    schedule: "Oct 30: Registration deadline. November: Interview. Nov-May: Preparation (memorial plus oral training). Spring: Online round. Top 16: In-person final in Europe.",
  },
  8: {
    introduction: "The China WTO Moot Court Competition is jointly organized by MOFCOM, CUPL, and Southwest University of Political Science and Law. It is China's only moot court competition co-organized by a national ministry. The competition simulates the WTO dispute settlement panel process, conducted entirely in English. Judges include MOFCOM bureau-level officials, international economic law professors, and senior partners from international law firms.",
    achievements: "China WTO Moot Court Competition\\n2022 National Second Prize\\n2024 National Champion",
    requirements: "All undergraduate and Master's students at Koguan School of Law may apply, including incoming students. Interest in English moot court and international trade disputes. Competing representatives must be current Chinese-national undergraduate or Master's students. PhD students may not compete per competition rules.",
    application: "Deadline: September 8, 24:00. Materials: Chinese and English CV plus Personal statement. Email subject: Name - Year - Major. Email: wto.moot@sjtu.edu.cn",
    schedule: "Early September: Join recruitment group. Sep 8: Registration deadline. Sep-Oct: Selection rounds. Autumn-April: Preparation period. April-May: National competition.",
  },
  4: {
    introduction: "The China International Law of the Sea Moot Court Competition (ILOSMCC) is organized by the Chinese Society of International Law of the Sea and the Center for Boundary and Ocean Studies at Wuhan University. It is China's first international all-English moot court competition and the world's first international law of the sea moot. The judging panel has historically included Judge Gao Zhiguo, the only Chinese judge ever to serve on ITLOS, alongside ITLOS judges and leading international scholars.",
    achievements: "International Law of the Sea Moot Court Competition (ILOSMCC)\\n2018 National Third Prize (x3), Best Oralist Award\\n2019 National First Prize\\n2021 National Third Prize\\n2022 National Runner-up / National First Prize\\n2025 National Second Prize",
    requirements: "Undergraduate or graduate student at Shanghai Jiao Tong University. Strong English listening, speaking, reading, and writing skills. Sufficient time commitment. No prior moot court experience required.",
    application: "Deadline: April 15, 24:00. Send CV to registration email. Email subject: School - Name - Year. Email: ilosmcc@sjtu.edu.cn",
    schedule: "April: Registration deadline, CV screening. Mid-April: Online interview notification. April-October: Preparation (memorial writing plus oral training). Oct 22-23: Official competition at Wuhan University.",
  },
  2: {
    introduction: "The China Law Graduate Elite National Graduate Moot Court Competition is organized by the Graduate School of China University of Political Science and Law. It aims to advance legal graduate education, broaden academic horizons, and cultivate teamwork and innovation. The competition is open to all law Master's and PhD students nationwide and invites representative teams from top law schools across China.",
    achievements: "China Law Graduate Elite National Graduate Moot Court Competition\\n2018 Invited participation; completed full domestic selection round",
    requirements: "Solid legal foundation; familiarity with procedural law; strong learning ability. Current law graduate student (Master's or PhD) at Koguan School of Law. Basic English written and oral communication skills. Good teamwork and resilience.",
    application: "Deadline: October 28, 12:00. Send CV to registration email. Body: note any prior moot court experience. Team: max 6 members plus 1 team leader.",
    schedule: "Oct 28: Registration deadline. Nov 13 approx: Case release. Nov 23-26: Competition (check-in, opening, prelims, quarters, semis, final).",
  },
};

`;

src = src.slice(0, insertPos) + LANG_INSERT + src.slice(insertPos);
console.log('2. Language helpers + TEAM_EN_CONTENT inserted');

// ─────────────────────────────────────────────────────────────
// 3. GUIDE_ITEMS rendering
// ─────────────────────────────────────────────────────────────
src = src.replace(
  '<p style={{ fontSize: 15, fontWeight: 600, color: "#111111", lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</p>',
  '<p style={{ fontSize: 15, fontWeight: 600, color: "#111111", lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis" }}>{lang === "en" && item.nameEn ? item.nameEn : item.name}</p>'
);
src = src.replace(
  '<p style={{ fontSize: 10.5, color: "rgba(28,28,40,0.38)", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.org}</p>',
  '<p style={{ fontSize: 10.5, color: "rgba(28,28,40,0.38)", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{lang === "en" && item.orgEn ? item.orgEn : item.org}</p>'
);
console.log('3. Guide item rendering updated');

// ─────────────────────────────────────────────────────────────
// 4. TeamCard: add lang prop
// ─────────────────────────────────────────────────────────────
src = src.replace(
  'function TeamCard({ team, onClick, index, registerRef, highlighted, ui }) {',
  'function TeamCard({ team, onClick, index, registerRef, highlighted, ui, lang }) {'
);

const oldTagPill = `}}>{team.tag}</div>
        {team.orgTag && (
          <div style={{
            padding: "4px 10px", borderRadius: 100,
            background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.22)",
            fontSize: 9.5, fontWeight: 500, color: "rgba(255,255,255,0.85)",
            letterSpacing: "0.06em",
            fontFamily: "'Space Mono', monospace"
          }}>{team.orgTag}</div>`;
if (!src.includes(oldTagPill)) console.error('oldTagPill NOT FOUND');
src = src.replace(oldTagPill,
  `}}>{lang === "en" ? (TAG_EN[team.tag] || team.tag) : team.tag}</div>
        {team.orgTag && (
          <div style={{
            padding: "4px 10px", borderRadius: 100,
            background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.22)",
            fontSize: 9.5, fontWeight: 500, color: "rgba(255,255,255,0.85)",
            letterSpacing: "0.06em",
            fontFamily: "'Space Mono', monospace"
          }}>{lang === "en" ? (ORG_TAG_EN[team.orgTag] || team.orgTag) : team.orgTag}</div>`
);

const oldCardText = `        <p style={{
          fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
          color: team.accent, marginBottom: 6, fontWeight: 600, opacity: 0.9,
          fontFamily: "'Instrument Sans', sans-serif"
        }}>{team.subtitle}</p>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 20, fontWeight: 600, lineHeight: 1.2, color: "#FFFFFF"
        }}>{team.name}</h3>`;
if (!src.includes(oldCardText)) console.error('oldCardText NOT FOUND');
src = src.replace(oldCardText,
  `        {lang !== "en" && (
          <p style={{
            fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
            color: team.accent, marginBottom: 6, fontWeight: 600, opacity: 0.9,
            fontFamily: "'Instrument Sans', sans-serif"
          }}>{team.subtitle}</p>
        )}
        <h3 style={{
          fontFamily: lang === "en" ? "'Instrument Sans', sans-serif" : "'Cormorant Garamond', serif",
          fontSize: lang === "en" ? 16 : 20, fontWeight: 600, lineHeight: 1.25, color: "#FFFFFF"
        }}>{lang === "en" ? team.subtitle : team.name}</h3>`
);
console.log('4. TeamCard updated');

// ─────────────────────────────────────────────────────────────
// 5. TeamDetailOverlay
// ─────────────────────────────────────────────────────────────
src = src.replace(
  'function TeamDetailOverlay({ team, originRect, onClose, ui }) {',
  'function TeamDetailOverlay({ team, originRect, onClose, ui, lang }) {'
);

const oldContent = `  const content = {
    introduction: team.introduction, achievements: team.achievements,
    requirements: team.requirements, application: team.application, schedule: team.schedule,
  };`;
if (!src.includes(oldContent)) console.error('oldContent NOT FOUND');
src = src.replace(oldContent,
  `  const enContent = TEAM_EN_CONTENT[team.id] || {};
  const content = {
    introduction: lang === "en" ? (enContent.introduction || team.introduction) : team.introduction,
    achievements: lang === "en" ? (enContent.achievements || team.achievements) : team.achievements,
    requirements: lang === "en" ? (enContent.requirements || team.requirements) : team.requirements,
    application: lang === "en" ? (enContent.application || team.application) : team.application,
    schedule: lang === "en" ? (enContent.schedule || team.schedule) : team.schedule,
  };`
);

const oldHero = `            <p style={{
              fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase",
              color: team.accent, marginBottom: 10, opacity: 0.9, fontWeight: 700,
              fontFamily: "'Space Mono', monospace"
            }}>{team.subtitle}</p>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(32px,5vw,68px)", fontWeight: 400,
              lineHeight: 1.0, color: "#FFFFFF", letterSpacing: "-0.01em"
            }}>{team.name}</h1>`;
if (!src.includes(oldHero)) console.error('oldHero NOT FOUND');
src = src.replace(oldHero,
  `            {lang !== "en" && (
              <p style={{
                fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase",
                color: team.accent, marginBottom: 10, opacity: 0.9, fontWeight: 700,
                fontFamily: "'Space Mono', monospace"
              }}>{team.subtitle}</p>
            )}
            <h1 style={{
              fontFamily: lang === "en" ? "'Instrument Sans', sans-serif" : "'Cormorant Garamond', serif",
              fontSize: lang === "en" ? "clamp(26px,4vw,52px)" : "clamp(32px,5vw,68px)",
              fontWeight: lang === "en" ? 500 : 400,
              lineHeight: 1.1, color: "#FFFFFF", letterSpacing: "-0.01em"
            }}>{lang === "en" ? team.subtitle : team.name}</h1>`
);

const oldTopBar = `              <span style={{ fontSize: 12, fontWeight: 600, color: team.accent, fontFamily: "'Space Mono', monospace" }}>{team.tag}</span>
            </div>
            {team.orgTag && (
              <div style={{
                padding: "5px 12px", borderRadius: 100,
                background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)",
                fontSize: 11, color: "rgba(236,242,255,0.65)", fontFamily: "'Space Mono', monospace"
              }}>{team.orgTag}</div>
            )}`;
if (!src.includes(oldTopBar)) console.error('oldTopBar NOT FOUND');
src = src.replace(oldTopBar,
  `              <span style={{ fontSize: 12, fontWeight: 600, color: team.accent, fontFamily: "'Space Mono', monospace" }}>{lang === "en" ? (TAG_EN[team.tag] || team.tag) : team.tag}</span>
            </div>
            {team.orgTag && (
              <div style={{
                padding: "5px 12px", borderRadius: 100,
                background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)",
                fontSize: 11, color: "rgba(236,242,255,0.65)", fontFamily: "'Space Mono', monospace"
              }}>{lang === "en" ? (ORG_TAG_EN[team.orgTag] || team.orgTag) : team.orgTag}</div>
            )}`
);

const oldSidebar = `                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 20, fontWeight: 500, color: "#ECF2FF", marginBottom: 4, lineHeight: 1.2
                  }}>{team.name}</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 2 }}>
                    <span style={{
                      padding: "3px 9px", borderRadius: 100,
                      background: \`\${team.accent}18\`, border: \`1px solid \${team.accent}30\`,
                      fontSize: 9.5, color: team.accent, fontFamily: "'Space Mono', monospace", fontWeight: 600
                    }}>{team.tag}</span>
                    {team.orgTag && (
                      <span style={{
                        padding: "3px 9px", borderRadius: 100,
                        background: "rgba(255,255,255,0.06)", border: "1px solid rgba(236,242,255,0.14)",
                        fontSize: 9.5, color: "rgba(236,242,255,0.55)", fontFamily: "'Space Mono', monospace"
                      }}>{team.orgTag}</span>
                    )}
                  </div>`;
if (!src.includes(oldSidebar)) console.error('oldSidebar NOT FOUND');
src = src.replace(oldSidebar,
  `                  <h3 style={{
                    fontFamily: lang === "en" ? "'Instrument Sans', sans-serif" : "'Cormorant Garamond', serif",
                    fontSize: lang === "en" ? 16 : 20, fontWeight: 500, color: "#ECF2FF", marginBottom: 4, lineHeight: 1.3
                  }}>{lang === "en" ? team.subtitle : team.name}</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 2 }}>
                    <span style={{
                      padding: "3px 9px", borderRadius: 100,
                      background: \`\${team.accent}18\`, border: \`1px solid \${team.accent}30\`,
                      fontSize: 9.5, color: team.accent, fontFamily: "'Space Mono', monospace", fontWeight: 600
                    }}>{lang === "en" ? (TAG_EN[team.tag] || team.tag) : team.tag}</span>
                    {team.orgTag && (
                      <span style={{
                        padding: "3px 9px", borderRadius: 100,
                        background: "rgba(255,255,255,0.06)", border: "1px solid rgba(236,242,255,0.14)",
                        fontSize: 9.5, color: "rgba(236,242,255,0.55)", fontFamily: "'Space Mono', monospace"
                      }}>{lang === "en" ? (ORG_TAG_EN[team.orgTag] || team.orgTag) : team.orgTag}</span>
                    )}
                  </div>`
);
console.log('5. TeamDetailOverlay updated');

// ─────────────────────────────────────────────────────────────
// 6. Call sites
// ─────────────────────────────────────────────────────────────
src = src.replace(
  `                  onClick={handleTeamClick}
                  registerRef={registerTeamCardRef}
                  highlighted={activeJumpTeamId === team.id}
                  ui={ui}
                />`,
  `                  onClick={handleTeamClick}
                  registerRef={registerTeamCardRef}
                  highlighted={activeJumpTeamId === team.id}
                  ui={ui}
                  lang={lang}
                />`
);
src = src.replace(
  `          team={selectedTeam} originRect={originRect}
          onClose={() => { setSelectedTeam(null); setOriginRect(null); }}
          ui={ui}
        />`,
  `          team={selectedTeam} originRect={originRect}
          onClose={() => { setSelectedTeam(null); setOriginRect(null); }}
          ui={ui}
          lang={lang}
        />`
);
console.log('6. Call sites updated');

// ─────────────────────────────────────────────────────────────
// 7. AITutorWindow
// ─────────────────────────────────────────────────────────────
src = src.replace(
  'function AITutorWindow({ messages, input, setInput, onSend, onClose, onMinimize, isMinimized, loading, onShowTeams, pos, onMouseDown, messagesEndRef, ui, quickQuestions }) {',
  'function AITutorWindow({ messages, input, setInput, onSend, onClose, onMinimize, isMinimized, loading, onShowTeams, pos, onMouseDown, messagesEndRef, ui, quickQuestions, aiOnline, lang }) {'
);

const oldStatus = `            <p style={{ fontSize: 10, color: "rgba(122,39,53,0.76)", display: "flex", alignItems: "center", gap: 4, fontFamily: "'Space Mono', monospace", marginTop: 2 }}>
              <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#4ADE80", boxShadow: "0 0 6px #4ADE80" }} />
              {ui.ai.status}
            </p>`;
if (!src.includes(oldStatus)) console.error('oldStatus NOT FOUND');
src = src.replace(oldStatus,
  `            <p style={{ fontSize: 10, color: "rgba(122,39,53,0.76)", display: "flex", alignItems: "center", gap: 4, fontFamily: "'Space Mono', monospace", marginTop: 2 }}>
              <span style={{
                display: "inline-block", width: 6, height: 6, borderRadius: "50%",
                background: aiOnline === true ? "#4ADE80" : aiOnline === false ? "#F87171" : "#FBBF24",
                boxShadow: \`0 0 6px \${aiOnline === true ? "#4ADE80" : aiOnline === false ? "#F87171" : "#FBBF24"}\`
              }} />
              {aiOnline === true ? (lang === "en" ? "Online" : "\u5728\u7ebf") : aiOnline === false ? (lang === "en" ? "Offline" : "\u4e0d\u5728\u7ebf") : (lang === "en" ? "Checking..." : "\u68c0\u6d4b\u4e2d...")}
            </p>`
);

const oldTags = `      {!isMinimized && <>
        <div style={{
          padding: "10px 12px 8px",
          display: "flex",
          gap: 6,
          flexWrap: "wrap",
          background: "linear-gradient(180deg, rgba(255,255,255,0.45), rgba(255,255,255,0))"
        }}>
          {ui.ai.tags.map((tag) => (
            <span key={tag} style={{
              fontSize: 10.5,
              padding: "4px 8px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.8)",
              border: "1px solid rgba(122,39,53,0.14)",
              color: "rgba(28,28,40,0.62)",
              fontFamily: "'Instrument Sans', sans-serif"
            }}>{tag}</span>
          ))}
        </div>

        {/* Messages */}`;
if (!src.includes(oldTags)) console.error('oldTags NOT FOUND');
src = src.replace(oldTags,
  `      {!isMinimized && <>
        {/* Messages */}`
);
console.log('7. AITutorWindow updated');

// ─────────────────────────────────────────────────────────────
// 8. aiOnline state + useEffect + handleSend
// ─────────────────────────────────────────────────────────────
src = src.replace(
  `  const [aiOpen,       setAiOpen]       = useState(false);
  const [aiMin,        setAiMin]        = useState(false);`,
  `  const [aiOpen,       setAiOpen]       = useState(false);
  const [aiMin,        setAiMin]        = useState(false);
  const [aiOnline,     setAiOnline]     = useState(null);`
);

src = src.replace(
  '  const handleWelcomeScroll = useCallback',
  `  useEffect(() => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 4000);
    fetch("/api/dify/chat-messages", { method: "HEAD", signal: ctrl.signal })
      .then(() => setAiOnline(true))
      .catch(() => setAiOnline(false))
      .finally(() => clearTimeout(timer));
    return () => { ctrl.abort(); clearTimeout(timer); };
  }, []);

  const handleWelcomeScroll = useCallback`
);

src = src.replace(
  `      if (!fullAnswer) {
        setMessages(prev => prev.map(m =>
          m._id === placeholderIdx
            ? { ...m, content: ui.ai.emptyAnswer }
            : m
        ));
      }
    } catch (err) {`,
  `      if (!fullAnswer) {
        setMessages(prev => prev.map(m =>
          m._id === placeholderIdx
            ? { ...m, content: ui.ai.emptyAnswer }
            : m
        ));
      }
      setAiOnline(true);
    } catch (err) {
      setAiOnline(false);`
);
console.log('8. aiOnline state + effects + handleSend updated');

// ─────────────────────────────────────────────────────────────
// 9. AITutorWindow call site
// ─────────────────────────────────────────────────────────────
src = src.replace(
  `          messagesEndRef={messagesEnd}
          ui={ui}
          quickQuestions={quickQuestions}
        />`,
  `          messagesEndRef={messagesEnd}
          ui={ui}
          quickQuestions={quickQuestions}
          aiOnline={aiOnline}
          lang={lang}
        />`
);
console.log('9. AITutorWindow call site updated');

// Write result
fs.writeFileSync('src/MootCourtModule.jsx', src, 'utf8');
console.log('\nAll changes applied successfully!');
