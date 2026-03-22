import { useState, useRef, useEffect, useCallback } from "react";

// ─────────────────────────────────────────────────────────────
// REAL COMPETITION DATA (from official recruitment files)
// ─────────────────────────────────────────────────────────────
const TEAMS = [
  {
    id: 1,
    name: "Willem C. Vis Moot",
    subtitle: "国际商事仲裁模拟法庭",
    tag: "CISG · 国际仲裁",
    icon: "⚖️",
    accent: "#F0C040",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
    bg: "linear-gradient(160deg,#1c0f00,#3d2500,#5c3a00)",
    introduction: `Willem C. Vis 国际商事仲裁模拟仲裁庭比赛（Vis Moot）是全球规模最大的国际商事仲裁模拟法庭比赛，自 1994 年起每年春季在奥地利维也纳举办，吸引来自世界各地的 300 余支高校队伍参赛。

2003 年起，赛事设立东方赛场 Willem C. Vis (East) Moot，于香港举办。在中国赛区，还衍生出 CIETAC Cup（贸仲杯）、Shanghai Moot 等相关赛事。

赛事案件争议围绕一份虚构的国际货物销售合同展开，该合同适用《联合国国际货物销售合同公约》（CISG）。赛事内容紧密结合国际商事仲裁的最新实践发展，具有较强的实务导向和现实指引意义，比赛全程以英文进行。`,
    achievements: `Willem C. Vis Moot / "贸仲杯"
2018年  "贸仲杯"暨 Vis Moot 中国选拔赛    二等奖
2020年  "贸仲杯"国际商事仲裁模拟仲裁庭    三等奖
2021年  "贸仲杯"国际商事仲裁模拟仲裁庭    三等奖
2024年  "贸仲杯"国际商事仲裁模拟仲裁庭    全国冠军 🏆
2025年  "贸仲杯"国际商事仲裁模拟仲裁庭    二等奖

Moot Shanghai / 其他商事仲裁
2022年  Moot Shanghai 国际商事模拟仲裁庭    全球十六强、中国第四
2025年  Moot Shanghai 国际商事模拟仲裁庭    冠军 🏆

国际商事合同通则（PICC）国际模拟仲裁比赛
2025年  全球四强 🏆

亚太国际商事仲裁模拟仲裁庭辩论赛
2025年  亚军`,
    requirements: `• 具备英文表达与法律分析能力，能进行模拟陈述
• 对国际商事仲裁及相关法律问题有兴趣
• 能投入充足时间参与系统备赛
• 凯原法学院在读本科生或研究生均可报名
• 选拔方式：全英文面试（含模拟陈述）
• 提交书面材料有助于考察（非强制）`,
    application: `报名截止：5 月 18 日 20:00 前
报名材料：个人中英文简历
邮件主题：姓名–年级–赛事意向
简历内容：照片、微信号、外语水平、个人经历
报名成功后将进入赛事选拔微信群
面试时间：初定 5 月 25–26 日

📧 vismoot@sjtu.edu.cn`,
    schedule: `9月–次年1月    法律研究、书状撰写
次年1月–2月   口头辩论集中备赛
春季（3–4月）  维也纳 / 香港正式比赛
贸仲杯          每年秋季国内举行
Moot Shanghai  每年春季上海举行`,
  },
  {
    id: 2,
    name: "中华硕博模拟法庭",
    subtitle: "全国研究生英文模拟法庭竞赛",
    tag: "国内 · 研究生",
    icon: "🏛️",
    accent: "#60A5FA",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
    bg: "linear-gradient(160deg,#000d2e,#001a5c,#003080)",
    introduction: `"中华法学硕博英才全国研究生模拟法庭竞赛"由中国政法大学研究生院发起，与共青团中国政法大学委员会共同主办，旨在贯彻习近平新时代中国特色社会主义法治思想，开阔法学研究生的学科视野，培养团队精神与创新意识，提高法学研究生的创新实践能力。

竞赛面向全国法学硕士、博士研究生，是高水平英文模拟法庭竞赛，向全国各法学院发出参赛邀请函，吸引来自各顶尖高校的代表队参赛。`,
    achievements: `中华法学硕博英才全国研究生模拟法庭竞赛
2018年  受邀参赛，完成全程国内选拔赛

暂无更多公开历史成绩记录`,
    requirements: `• 法学功底扎实，熟悉诉讼法，学习能力强
• 法学院在读研究生（硕士、博士）
• 高年级本科生在部分年度亦可参赛
• 具备英语书面与口头表达基础
• 良好的团队合作意识与抗压能力`,
    application: `招募截止：10 月 28 日 12:00 前
报名方式：发送简历至报名邮箱
邮件正文：注明参加模拟法庭的经历（如有）
赛队组成：每队不多于 6 名队员 + 1 名领队
上场人数：控方或辩方各自单场不超过 4 人

📧 mooting@lawschool.edu.cn`,
    schedule: `10月 28日  报名截止
11月 13日  赛题发放（约）
11月 23日  13:00 前报到
11月 23日  14:30 开幕式
11月 24日  初赛
11月 25日  上午复赛 / 下午半决赛
11月 26日  08:30 决赛暨颁奖典礼`,
  },
  {
    id: 3,
    name: "FDI 模拟国际仲裁",
    subtitle: "国际投资仲裁模拟法庭",
    tag: "ISDS · BIT",
    icon: "💼",
    accent: "#34D399",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
    bg: "linear-gradient(160deg,#04150d,#0a3020,#0d4a30)",
    introduction: `2021 模拟国际投资仲裁（FDI Moot）与 Philip C. Jessup 国际法模拟法庭辩论赛及 Willem C. Vis 国际商事模拟仲裁庭比赛并称为全球三大模拟法庭竞赛。

赛事分为全球赛和区域/国家赛，共用一套赛题。参赛队伍需通过区域/国家赛获得进入全球赛的资格。国内赛"深圳杯"由深圳国际仲裁院主办，金诚同达律师事务所协办，是中国赛队获得全球赛入场券的唯一渠道。

该项赛事吸引了北京大学、清华大学、中国政法大学、对外经贸大学、复旦大学、厦门大学、华东政法大学等众多知名高校参与。`,
    achievements: `FDI Moot（模拟国际投资仲裁）
2021年  FDI Moot Shenzhen    一等奖 🏆
2022年  FDI Moot Shenzhen    全国一等奖 🏆
2023年  China National Round of FDI Moot    全国十二强
2023年  模拟国际投资仲裁深圳杯    全国十六强
2025年  FDI Moot Shenzhen    一等奖 🏆`,
    requirements: `• 上海交通大学在读本科生或研究生
• 具有良好的英语听说读写能力
• 具有充足的备赛时间投入
• 不要求过往具有模拟法庭竞赛经验
• 面试着重考察候选人的英语听说能力`,
    application: `报名截止：每年 4 月 13 日 24:00
报名方式：发送个人简历至报名邮箱
邮件主题：学院–姓名–年级
邮件正文：注明"志愿一、志愿二"
（欢迎同时报名多项比赛并在正文注明）

📧 fdi.moot@sjtu.edu.cn`,
    schedule: `4月        报名截止，简历筛选
4月中旬    通知面试（线上）
4月–10月   备赛期（书状撰写 + 口头训练）
秋季       深圳杯（国内赛）正式比赛
通过国内赛  晋级全球赛`,
  },
  {
    id: 4,
    name: "国际海洋法模拟法庭",
    subtitle: "ILOSMCC 中国国际海洋法竞赛",
    tag: "UNCLOS · ITLOS",
    icon: "🌊",
    accent: "#38BDF8",
    image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=900&q=80",
    bg: "linear-gradient(160deg,#001428,#002855,#003d7a)",
    introduction: `国际海洋法模拟法庭（ILOSMCC）由中国海洋法学会和武汉大学中国边界与海洋研究院主办，是中国首创的国际性全程英文模拟法庭竞赛，也是世界上首个国际海洋法模拟法庭竞赛，是目前国际上同领域竞赛中规格最高、参赛规模最大的赛事。

评委阵容强大：国际海洋法法庭唯一的中国籍法官高之国先生历任法官评审团队主席，评委包括 ITLOS 法官、外交部、国家海洋局专家及国内外高校顶尖学者。`,
    achievements: `中国国际海洋法模拟法庭竞赛（ILOSMCC / LOS-MCC）
2018年  全国三等奖三个，最佳辩手奖
2019年  全国一等奖 🏆
2021年  全国三等奖
2022年  全国季军 / 全国一等奖 🏆
2025年  全国二等奖`,
    requirements: `• 上海交通大学在读本科生或研究生
• 具有良好的英语听说读写能力
• 具有充足的备赛时间
• 不要求过往具有模拟法庭竞赛经验
• 面试通过简历筛选，着重考察英语听说`,
    application: `报名截止：4 月 15 日 24:00
报名方式：发送个人简历至报名邮箱
邮件主题：学院–姓名–年级
如有其他证明能力的材料，一并发送

📧 ilosmcc@sjtu.edu.cn`,
    schedule: `4月        报名截止，简历筛选
4月中旬    线上面试通知
4月–10月   备赛期（书状撰写 + 口头训练）
10月 22–23日  武汉大学正式比赛（以当年公告为准）`,
  },
  {
    id: 5,
    name: "空间法模拟法庭",
    subtitle: "Manfred Lachs Space Law Moot",
    tag: "空间法 · ICJ 级别",
    icon: "🚀",
    accent: "#C084FC",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=80",
    bg: "linear-gradient(160deg,#060015,#120030,#200050)",
    introduction: `曼弗雷德·拉克斯（Manfred Lachs）国际空间法模拟法庭竞赛是国际空间法学会（IISL）1992 年创办的年度性、世界级模拟法庭大赛，因每年全球总决赛由联合国国际法院三位现任大法官亲自出庭审理，成为当今世界最高级别、最具影响力的模拟法庭大赛之一。

中国空间法学会自 2003 年开始组织国内高校学生参加竞赛并组织全国选拔赛，2022 年共有来自 30 所高校的 48 支队伍进入口头轮次，竞争激烈。`,
    achievements: `曼弗雷德·拉克斯国际空间法模拟法庭竞赛（Manfred Lachs Space Law Moot Court）
2022年  中国赛区一等奖 🏆
2022年  亚太赛区八强`,
    requirements: `① 良好的英语阅读、写作及口语能力
② 良好的逻辑分析和文献检索能力
③ 优秀的团队精神和抗压能力
④ 足够的时间投入（备赛周期较长）
⑤ 不要求有过往参加相关竞赛的经历
⑥ 本学期选修外层空间法课程（LAW6873）者优先
   （本科生可通过本硕互选系统选课）`,
    application: `报名截止：9 月 26 日 20:00
报名邮件主题：姓名–年级–空间法选拔
报名材料：
  ① 中文简历（限 1 页，含英语成绩）
  ② 笔试题回答（≥500词）
  ③ 其他书面材料（可选）

📧 space.law@sjtu.edu.cn`,
    schedule: `9月 26日    报名截止
10月 31日   完成报名工作
11月 16日   提交电子版书状
12月 9–10日 北京口头辩论（暂定）
次年4月     全球总决赛`,
  },
  {
    id: 6,
    name: "ICCMCC 国际刑事法",
    subtitle: "国际刑事法院模拟法庭",
    tag: "ICC · 罗马规约",
    icon: "⚔️",
    accent: "#F87171",
    image: "https://images.unsplash.com/photo-1589216532372-1c2a367900d9?auto=format&fit=crop&w=900&q=80",
    bg: "linear-gradient(160deg,#1c0000,#3d0000,#5c0000)",
    introduction: `国际刑事法院模拟法庭比赛（ICCMCC）是一个根据国际刑法以及国际刑事法院的实体和程序规则进行的模拟法庭比赛。国际刑事法院在其六个官方语言（英语、法语、中文、西班牙语、俄语、阿拉伯语）中分别推广此竞赛，至今已成功以英语、西班牙语、俄语和中文分别举行比赛。

赛队共同准备英文赛和中文赛（赛题基本一致），备赛期间不区分中文赛与英文赛的队员，选拔包括全英文笔试与全英文面试。`,
    achievements: `国际刑事法院（ICC）模拟法庭竞赛（中文 / 英文，含隆安杯）
2019年  中文赛    全国一等奖 🏆
2020年            全国二等奖
2021年  中文赛    全国一等奖 🏆
2022年  英文赛    全国第四 / 一等奖 🏆
2023年  中文赛    全国一等奖 🏆
2024年  中文赛    全国一等奖 🏆（晋级海牙）、最佳检方律师奖
2025年  中文赛    全国一等奖 🏆、亚军
2025年  "隆安杯"中国高校 ICC 英文模拟法庭    三等奖`,
    requirements: `• 凯原法学院在读本科生、研一/研二硕士生
• 足量的时间投入度
• 优秀的团队合作精神
• 基本的英语阅读、写作、口语能力
• 良好的文献检索和逻辑分析能力`,
    application: `报名截止：9 月 22 日 24:00
书状提交：9 月 27 日 12:00
面试时间：9 月 28 日（邮件另行通知）
报名材料：个人中英文简历（含微信号、外语水平）
邮件主题：姓名–年级

📧 icc.moot@sjtu.edu.cn`,
    schedule: `9月 22日    报名截止
9月 27日    全英文书状提交
9月 28日    面试
2024年10月–2025年4月  备赛期
春季        国际赛（含海牙国际赛）`,
  },
  {
    id: 7,
    name: "IHL 国际人道法",
    subtitle: "红十字国际人道法模拟法庭",
    tag: "ICRC · 日内瓦公约",
    icon: "🕊️",
    accent: "#86EFAC",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=900&q=80",
    bg: "linear-gradient(160deg,#081800,#143000,#1e4800)",
    introduction: `红十字国际人道法（IHL）模拟法庭比赛由红十字国际委员会（ICRC）、中国红十字总会（ICSC）主办，赛题由红十字国际委员会的法律专家拟定，法官由来自不同国家和地区的国际法及国际人道法专家组成。

每个赛队需针对案例提交书面诉状并进行法庭辩论，各队将分别以控方和辩方的身份进行比赛。该赛事迄今已成功举办十三届，每年有 30 多所国内知名高校参加，大陆赛区前三名将由红十字会资助参加亚太地区高校间红十字国际人道法模拟法庭竞赛。`,
    achievements: `国际人道法（IHL）模拟法庭竞赛（含红十字）
2019年  全国一等奖 🏆
2020年  国内选拔赛二等奖
2022年  全国一等奖 🏆
2023年  全国一等奖 🏆
2024年  全国一等奖 🏆
2025年  二等奖`,
    requirements: `• 凯原法学院在读本科生或研究生
• 良好的英语阅读、写作及口语能力
• 良好的逻辑分析和文献检索能力
• 优秀的团队精神
• 足够的时间投入
• 不要求提供除全英文书状以外的书面材料
  （但提交有助于全面考察）`,
    application: `报名截止：5 月 13 日（周三）20:00
报名方式：发送个人中英文简历至邮箱
邮件主题：姓名–年级
面试准备材料将在报名成功后以邮件发送

线上宣讲会：5 月 12 日（周二）20:00–22:00
ZOOM 会议室：646 1623 8936  密码：252964

📧 ihl.moot@sjtu.edu.cn`,
    schedule: `5月 12日    线上宣讲会
5月 13日    报名截止
5月 24日    书状提交截止
5月 27日    面试（邮件通知具体时间）
秋季–次年3月  备赛期
春季        亚太地区国际赛`,
  },
  {
    id: 8,
    name: "WTO 模拟法庭",
    subtitle: "中国WTO模拟法庭辩论赛",
    tag: "GATT · 争端解决",
    icon: "🌐",
    accent: "#93C5FD",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    bg: "linear-gradient(160deg,#001030,#002060,#003090)",
    introduction: `"中国 WTO 模拟法庭辩论赛"（China WTO Moot Court Competition）由中华人民共和国商务部、中国政法大学和西南政法大学共同主办，是我国目前唯一由国家部委参与主办的高校模拟法庭辩论比赛。

赛事模拟世界贸易组织（WTO）争端解决机制下的专家组程序，以英文为比赛官方语言，评委由商务部司局级领导、各知名高校国际经济法教授、涉外律所高级合伙人等共同组成。`,
    achievements: `中国 WTO 模拟法庭竞赛（China WTO Moot Court Competition）
2022年  全国二等奖
2024年  全国冠军 🏆`,
    requirements: `• 凯原法学院全体本科生、硕士生均可报名
• 包括并鼓励已录取的新生提前参与
• 对英文模拟法庭、国际经贸争端有兴趣
• 具有相应的法学知识储备
• 代表参赛选手须为在读中国国籍本科生或硕士研究生
• 博士研究生不得参赛（按赛制要求）
• 非法学专业有相应法学知识者亦可报名`,
    application: `报名截止：9 月 8 日 24:00
报名材料：中英文简历 + 200字以内中文个人陈述
  （至少包括英语水平及24秋季学期简要计划）
邮件主题：姓名–年级–专业
报名后等待后续笔面试通知

📧 wto.moot@sjtu.edu.cn`,
    schedule: `9月初       加入招募群（尽早报名以获充分备赛时间）
9月 8日     报名截止
9–10月     笔试、面试
秋季–次年4月  备赛期
次年4–5月   全国比赛`,
  },
  {
    id: 9,
    name: "Jessup 模拟法庭",
    subtitle: "Philip C. Jessup 国际法庭",
    tag: "全球最大 · 国际公法",
    icon: "🏅",
    accent: "#FCD34D",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=900&q=80",
    bg: "linear-gradient(160deg,#180e00,#352000,#503000)",
    introduction: `Jessup 国际法模拟法庭大赛创建于 1960 年，是世界上规模最大、历史最悠久的模拟法庭赛事，被誉为"国际法学界的奥林匹克竞赛"。2024 年，全球来自 100 个司法管辖区的 674 支队伍注册参赛，规模达历届之最。

中国大陆赛区于 2003 年首次举办，2024 年第 22 届大赛于中国人民大学举行，共有 65 所大学参赛，蝉联历史规模最大的全国性比赛。比赛以英文进行，分为书面诉答（memorial）和口头辩论（oral）两个环节，各赛区优胜者（中国大陆赛区通常前 8–9 名）将于每年 4 月前往美国华盛顿参加国际赛。`,
    achievements: `Jessup（Philip C. Jessup）国际法模拟法庭比赛
2018年  全国选拔赛    全国一等奖（含最佳辩手奖）🏆
2019年  全国选拔赛    全国总分第一（最终全国亚军）、全球 50 强
2020年  国内选拔赛    二等奖
2021年  国际赛    一等奖 🏆
2022年  国际赛    全球第 47 名、全国一等奖、全国第二名、最佳辩手奖
2024年  全国选拔赛    全国二等奖
2025年  中国赛区一等奖（晋级国际赛）🏆`,
    requirements: `① 对 Jessup 感兴趣，能长久维持热情
② 愿意投入大量时间备赛，勤勉踏实，责任感强
③ 具备快速学习、深入思考能力，逻辑清晰
④ 具有团队合作精神
⑤ 抗压能力强，心态稳定，不畏困难
优先考虑修读过国际法课程、有英文模拟法庭经验的同学，
但非硬性要求；英语能力以面试表现为主要参照。`,
    application: `报名截止：4 月 26 日 23:59
报名方式：提交个人中文简历至邮箱
邮件命名：姓名+年级
笔试题发布：4 月 27 日
答卷截止：5 月 12 日 23:59
面试：5 月中下旬（线下为主，外地同学可线上）

联系负责人微信：sebastian_xu41
📧 jessup@sjtu.edu.cn`,
    schedule: `9月初        赛题发布（ILSA 官方）
9月–次年1月  法律研究、书状撰写
次年1–2月    口头辩论备赛
2月           中国大陆赛区选拔赛
4月           美国华盛顿国际赛`,
  },
  {
    id: 10,
    name: "国际航空法模拟法庭",
    subtitle: "莱顿-塞林国际航空法竞赛",
    tag: "ICAO · 芝加哥公约",
    icon: "✈️",
    accent: "#7DD3FC",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80",
    bg: "linear-gradient(160deg,#001428,#003060,#004080)",
    introduction: `"莱顿-塞林"国际航空法模拟法庭竞赛是国际航空法领域最具影响力的国际模拟法庭赛事，由联合国专门机构国际民用航空组织建议设立，荷兰莱顿大学航空法与空间法国际研究中心主办，是目前唯一的世界级航空法模拟法庭竞赛，已走过十六届。

历届国际赛由参赛国轮流承办，足迹遍及中国、印度、阿联酋、土耳其、罗马尼亚、印尼、马耳他、韩国、荷兰、墨西哥和希腊等地。每年主办方构思一起虚拟国际航空争端，要求选手依据《国际民用航空公约》及相关条约，分别为申诉方与答辩方撰写书状并进行口头辩论。`,
    achievements: `"莱顿-塞林"国际航空法模拟法庭竞赛
2024年  中国赛区二等奖、优秀口头答辩奖`,
    requirements: `① 上海交通大学全日制在读本科生、硕士研究生（专业不限）
② 具备一定的英语听、说、读、写基础
③ 具备一定的法律检索能力
④ 对国际法、航空法有一定兴趣
   修读国际公法、经济法学、环境法学等课程者优先
⑤ 有责任感、团队合作精神，抗压沟通能力强`,
    application: `报名截止：10 月 20 日 24:00
邮件主题：年级（本/硕）–姓名–航空法模拟法庭选拔
材料一：中文个人简历（含姓名、学院、年级、英文水平等）
材料二：争议焦点归纳（英文，不超过一张 A4 纸）
        加入交流 QQ 群获取 2025 年赛题

📧 aviation.law@sjtu.edu.cn`,
    schedule: `10月 20日   报名截止
报名后      通过者接到面试邮件通知（两轮选拔）
次年2月     国内选拔赛（晋级资格赛）
2026年      第十七届国际赛（纳米比亚，须通过国内赛）`,
  },
  {
    id: 11,
    name: "国际体育仲裁竞赛",
    subtitle: "Sports Arbitration Moot (SAM)",
    tag: "FIFA · CAS · 体育法",
    icon: "🏆",
    accent: "#FB923C",
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=900&q=80",
    bg: "linear-gradient(160deg,#1c0500,#3d0f00,#601800)",
    introduction: `国际体育仲裁竞赛（Sports Arbitration Moot, SAM）由国际足联（FIFA）、瑞士仲裁学院与瑞士纳沙泰尔大学主办，是全球体育仲裁领域的权威赛事。

自 2022 年首届赛事以来，SAM 迅速在国际舞台上崭露头角，吸引了法国巴黎第二大学、奥地利维也纳大学、英国伦敦玛丽女王大学、瑞士苏黎世大学、北京大学、中国政法大学、武汉大学等顶尖院校参与。

所有参赛队伍免费获得 Jus Mundi 法律研究平台使用权及国际体育法专门培训。晋级 16 强的队伍将获主办方出具邀请函，赴欧洲参加线下比赛，并可结识顶尖国际仲裁律师、学者与仲裁员。`,
    achievements: `国际体育模拟仲裁竞赛（SAM）
2024年  全球总决赛八强 🏆
        循环赛第一
        最佳辩方奖
        最佳法律研究奖`,
    requirements: `① 我校在读法学专业本科生、法学/法律硕士、博士研究生
② 有较好的英文法律检索与英文写作能力
   或优秀的英文口头表达与反应能力
③ 吃苦耐劳、踏实勤奋，有较强团队协作意识
④ 能确保赛事期间（11月–次年5月）有充分训练时间
⑤ 不要求体育仲裁知识储备，但有相关经验者优先
⑥ 特别欢迎对体育（尤其足球）有热情的同学
⑦ 未参与过 SAM 的同学方可报名`,
    application: `报名截止：10 月 30 日 17:00
报名材料：
  ① 个人简历
  ② 英文动机信（不超过 450 词）
邮件主题：姓名+年级+专业
注：竞赛期间（2024.11–2025.5）尽量不参与实习，
    且不得同时参加其他模拟法庭竞赛

📧 sam.moot@sjtu.edu.cn`,
    schedule: `10月 30日   报名截止
11月       面试（邮件另行通知）
2024.11–2025.5  备赛期（书状撰写 + 口头训练）
春季       线上赛阶段
晋级 16强   赴欧洲线下总决赛`,
  },
  {
    id: 12,
    name: "法兴社 · 金法槌杯",
    subtitle: "SocGen 金融法 & 法兴社模拟法庭",
    tag: "国内 · 实战型",
    icon: "💹",
    accent: "#4ADE80",
    image: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=900&q=80",
    bg: "linear-gradient(160deg,#001a0d,#003322,#004830)",
    introduction: `法兴社是凯原法学院内部社团，主要职能是组织法学院同学参与上海市各法学院校举办的模拟法庭活动，包括：复旦大学法援杯案例分析邀请赛、青法会模拟法庭比赛、上海大学"金法槌杯"模拟法庭大赛（华东地区）、立信会计金融学院法之梦杯等。

"金法槌杯"由上海大学法学院律舟法律援助社组织，十年来打造了集"体验真实庭审、流程完备"三大特色于一身的实战型模拟法庭。同学们将亲身撰写各类法律文书，于庭上展开默契合作与激烈交锋。

法兴社成员还作为各类市内比赛的队员储备，并在学院内部定期举办小型模拟法庭及培训沙龙。`,
    achievements: `"金法槌杯"模拟法庭大赛
2018年  最佳起诉书奖、最佳公诉组
2020年  研究生组最佳辩护组奖
2021年  获奖
2025年  一等奖 🏆

"法之梦"华东高校模拟法庭大赛
2018年  最佳起诉书状奖、优秀组织奖
2019年  最佳辩护词奖
2020年  最佳答辩书奖

上海市大学生模拟法庭竞赛 / "日盈杯"
2018年  三等奖
2019年  三等奖、最佳辩护词奖
2021年  "日盈杯"二等奖、辩方书状一等奖
2023年  市级奖项

"金陵杯"华东地区高校模拟法庭竞赛
2021年  亚军

"华政杯"知识产权模拟法庭竞赛
2022年  全国二等奖
2023年  全国冠军 🏆

INTA 国际商标协会模拟法庭
2018年  口头辩论第三名、文书第二名（Second Best Brief）

亚太地区企业并购模拟竞赛
2018年  最佳并购方案奖（最高等级）、最佳书状奖
2019年  一等奖 🏆`,
    requirements: `• 对模拟法庭比赛感兴趣
• 具有优秀法学素养（或在培养中）
• 有积极报名参加比赛的意向
• 愿意承担组织统筹工作者特别欢迎
• 面向大一、大二本科生为主`,
    application: `报名截止：5 月 3 日 24:00
报名方式：将简历发送至报名邮箱
面向对象：本科大一、大二有意向的同学
加入法兴社后可参与院内培训沙龙、赛前训练

📧 faxingshe@sjtu.edu.cn`,
    schedule: `5月 3日     报名截止
加入后      参与法兴社内部培训与沙龙
每年秋季    "金法槌杯"华东地区选拔
春季        复旦法援杯、青法会等各类邀请赛`,
  },
];

const TABS = [
  { key: "introduction" },
  { key: "achievements" },
  { key: "requirements" },
  { key: "application" },
  { key: "schedule" },
];

const QUICK_QUESTIONS = {
  zh: [
    "Jessup 和 Vis Moot 有什么区别？",
    "大一学生适合报名哪些赛队？",
    "哪些比赛明确写了不要求过往模拟法庭经验？",
    "国际商事仲裁方向有哪些比赛？",
  ],
  en: [
    "What is the difference between Jessup and Vis Moot?",
    "Which teams are suitable for first-year students?",
    "Which competitions do not require prior moot court experience?",
    "Which teams focus on international commercial arbitration?",
  ],
};

const HERO_ASSETS = {
  campus: "/sjtu-law/hero-campus.jpg",
  logo: "/sjtu-law/logo.png",
  footer: "/sjtu-law/hero-campus.jpg",
};

const AI_WELCOME_MESSAGE = {
  zh:
    "你好，我是凯原法学院竞赛问答智能体。\n\n" +
    "我可以基于学院 12 支模拟法庭赛队的公开资料，帮你快速了解：\n" +
    "• 赛事方向与区别\n" +
    "• 报名要求与选拔方式\n" +
    "• 新手适合报哪些赛队\n" +
    "• 历年参赛成绩与能力要求\n\n" +
    "你可以直接问具体赛队，也可以先点下面的快捷问题。",
  en:
    "Hello. I am the Koguan School of Law moot court assistant.\n\n" +
    "I can help you quickly understand the public information of all 12 moot court teams, including:\n" +
    "• competition focus and differences\n" +
    "• application requirements and selection process\n" +
    "• suitable teams for beginners\n" +
    "• past results and capability expectations\n\n" +
    "You can ask about a specific team or start with one of the quick prompts below.",
};

const UI_TEXT = {
  zh: {
    tabLabels: {
      introduction: "赛事介绍",
      achievements: "参赛成绩",
      requirements: "能力要求",
      application: "报名信息",
      schedule: "赛事日程",
    },
    buttons: {
      official: "官网",
      english: "English",
      chinese: "中文",
      details: "查看详情 →",
      located: "已定位",
      teamIntro: "赛队介绍",
      viewTeams: "📋 全部赛队",
      close: "关闭",
      back: "返回队伍目录",
      minimize: "最小化",
      expand: "展开",
      sendPlaceholder: "例如：Jessup 的报名要求是什么？",
    },
    hero: {
      university: "Shanghai Jiao Tong University",
      title: "模拟法庭联赛中心",
      motto1: "正谊明道",
      motto2: "尚法辅德",
      subtitle: "Koguan School of Law Moot Court Program",
      welcomeTitle: "Welcome",
      welcomeText: "欢迎来到上海交通大学凯原法学院模拟法庭联赛中心。在这里，你可以快速浏览学院赛队、比赛方向、招募信息与赛事介绍。",
      stats: [
        { n: "12", label: "赛队" },
        { n: "3", label: "顶级国际赛事" },
        { n: "100+", label: "参赛国家/地区" },
      ],
    },
    guide: {
      title: "完整赛事目录",
      note: "已有赛队介绍的赛事支持直接跳转。点击目录中的对应条目，会自动定位到下方赛队并打开详情。",
      columns: ["类型", "级别", "竞赛名称 / 主办单位", "频次"],
      footnote: "数据来源：上海交通大学学生竞赛目录",
    },
    directory: {
      title: "模拟法庭队伍目录",
    },
    overlay: {
      sidebar: [
        { label: "竞赛语言", value: "英文为主" },
        { label: "队伍规模", value: "3–6 人" },
        { label: "招募周期", value: "秋季为主" },
      ],
      school: "上海交通大学凯原法学院",
      dialogLabel: "竞赛详情",
    },
    ai: {
      title: "竞赛问答智能体",
      status: "知识库检索 · 12 支赛队 · 在线",
      tags: ["赛事对比", "报名要求", "成绩查询"],
      recommends: "推荐提问",
      emptyAnswer: "这次没有检索到可展示的答案。你可以改问具体赛队、报名要求、能力要求或参赛成绩。",
      errorAdvice: "建议先试试“全部赛队”，或直接问某一支赛队的报名要求、比赛方向与成绩。",
      allTeamsReplyPrefix: "凯原法学院目前共有 12 支模拟法庭赛队：",
      allTeamsReplySuffix: "如果你愿意，我可以继续按“适合新手”“仲裁方向”或“国际公法方向”帮你缩小范围。",
    },
    footer: {
      parallaxTitle: "校园与学院",
      parallaxText: "从凯原法学楼到学院赛队，模拟法庭训练在这里延展为一整套国际化法律竞赛体系。",
      school: "上海交通大学凯原法学院",
      schoolEn: "KOGUAN SCHOOL OF LAW, SHANGHAI JIAO TONG UNIVERSITY",
      copyright: "版权所有 上海交通大学凯原法学院 © 2009 All Rights Reserved",
      address: "地址：上海市徐汇区华山路1954号廖凯原法学楼",
      postcode: "邮编：200030",
      icp: "沪ICP备：12004267",
      police: "沪公网安备：31009102000045",
    },
  },
  en: {
    tabLabels: {
      introduction: "Overview",
      achievements: "Results",
      requirements: "Requirements",
      application: "Application",
      schedule: "Schedule",
    },
    buttons: {
      official: "Official Site",
      english: "English",
      chinese: "中文",
      details: "View details →",
      located: "Located",
      teamIntro: "Team Intro",
      viewTeams: "📋 All Teams",
      close: "Close",
      back: "Back to directory",
      minimize: "Minimize",
      expand: "Expand",
      sendPlaceholder: "Example: What are the Jessup application requirements?",
    },
    hero: {
      university: "Shanghai Jiao Tong University",
      title: "Moot Court Center",
      motto1: "Rectitude and Truth",
      motto2: "Law and Virtue",
      subtitle: "Koguan School of Law Moot Court Program",
      welcomeTitle: "Welcome",
      welcomeText: "Welcome to the Moot Court Center of Koguan School of Law, Shanghai Jiao Tong University. Here you can quickly browse teams, competition tracks, recruitment information, and core introductions.",
      stats: [
        { n: "12", label: "Teams" },
        { n: "3", label: "Top global moots" },
        { n: "100+", label: "Countries/regions" },
      ],
    },
    guide: {
      title: "Competition Directory",
      note: "Items already covered by the team directory can be clicked to jump to the corresponding team card and open its detail view.",
      columns: ["Type", "Level", "Competition / Organizer", "Frequency"],
      footnote: "Source: SJTU student competition directory",
    },
    directory: {
      title: "Moot Court Teams",
    },
    overlay: {
      sidebar: [
        { label: "Language", value: "Mainly English" },
        { label: "Team Size", value: "3–6 members" },
        { label: "Recruitment", value: "Mostly autumn" },
      ],
      school: "Koguan School of Law, SJTU",
      dialogLabel: "Competition detail",
    },
    ai: {
      title: "Moot Court Assistant",
      status: "Knowledge base · 12 teams · online",
      tags: ["Compare moots", "Application", "Results"],
      recommends: "Suggested prompts",
      emptyAnswer: "No displayable answer was found this time. Try asking about a specific team, application criteria, requirements, or competition results.",
      errorAdvice: "Try “All Teams” first, or ask directly about one team’s application requirements, competition focus, or results.",
      allTeamsReplyPrefix: "Koguan School of Law currently has 12 moot court teams:",
      allTeamsReplySuffix: "If you want, I can further narrow them down by beginner-friendly options, arbitration tracks, or public international law.",
    },
    footer: {
      parallaxTitle: "Campus and School",
      parallaxText: "From Koguan Law Building to every team, moot court training here grows into a complete international legal competition system.",
      school: "Koguan School of Law",
      schoolEn: "KOGUAN SCHOOL OF LAW, SHANGHAI JIAO TONG UNIVERSITY",
      copyright: "Copyright © 2009 Koguan School of Law, Shanghai Jiao Tong University",
      address: "Address: Liao Kaiyuan Law Building, 1954 Huashan Road, Xuhui District, Shanghai",
      postcode: "Postcode: 200030",
      icp: "ICP: 12004267",
      police: "Public Security: 31009102000045",
    },
  },
};

const GUIDE_TYPE_LABEL = {
  zh: { "科创类": "科创类", "学科类": "学科类", "其他": "其他" },
  en: { "科创类": "Innovation", "学科类": "Academic", "其他": "Other" },
};

const GUIDE_SCOPE_LABEL = {
  zh: { "国际级": "国际级", "国家级": "国家级" },
  en: { "国际级": "Global", "国家级": "National" },
};

const GUIDE_ITEMS = [
  { type: "科创类", scope: "国际级", name: "中国国际大学生创新大赛", org: "教育部等 12 个部门会同省级人民政府", freq: "一年一届" },
  { type: "科创类", scope: "国家级", name: "“挑战杯”全国大学生课外学术科技作品竞赛", org: "共青团中央、中国科协、教育部、中国社会科学院、全国学联", freq: "两年一届" },
  { type: "科创类", scope: "国家级", name: "“挑战杯”中国大学生创业计划竞赛", org: "共青团中央、中国科协、教育部、全国学联", freq: "一年一届" },
  { type: "学科类", scope: "国际级", name: "杰赛普（JESSUP）国际法模拟法庭大赛", org: "美国国际法学生联合会（ILSA）、美国国际法学会（ASIL）", freq: "一年一届", teamId: 9 },
  { type: "学科类", scope: "国际级", name: "Willem C. Vis 模拟国际商事仲裁辩论赛", org: "联合国国际贸易法委员会（UNCITRAL）", freq: "一年一届", teamId: 1 },
  { type: "学科类", scope: "国际级", name: "模拟国际投资仲裁竞赛（FDI Moot）", org: "国际法律研究中心（CILS）", freq: "一年一届", teamId: 3 },
  { type: "学科类", scope: "国际级", name: "国际刑事法院（ICC）模拟法庭比赛（含中英文）", org: "国际律师协会（IBA）、国际刑事法院（ICC）、中国国际刑法青年学者联盟", freq: "一年一届", teamId: 6 },
  { type: "学科类", scope: "国际级", name: "红十字国际人道法模拟法庭（IHL）竞赛", org: "红十字国际委员会（ICRC）、中国红十字会总会", freq: "一年一届", teamId: 7 },
  { type: "学科类", scope: "国际级", name: "法兰克福国际投资模拟仲裁庭", org: "德国马克斯·普朗克法律史与法理论研究所", freq: "一年一届" },
  { type: "学科类", scope: "国际级", name: "国际航空法模拟法庭竞赛（IALMC）", org: "荷兰莱顿大学航空法与空间法国际研究中心（IIASL）", freq: "一年一届", teamId: 10 },
  { type: "学科类", scope: "国际级", name: "普莱斯传媒法国际模拟法庭竞赛", org: "英国牛津大学", freq: "一年一届" },
  { type: "学科类", scope: "国际级", name: "曼弗雷德·拉克斯国际空间法模拟法庭竞赛", org: "国际空间法学会（IISL）", freq: "一年一届", teamId: 5 },
  { type: "学科类", scope: "国际级", name: "ICC 国际商事调解比赛", org: "国际商会（ICC）", freq: "一年一届" },
  { type: "学科类", scope: "国际级", name: "国际体育模拟仲裁竞赛（SAM）", org: "国际足联（FIFA）、瑞士仲裁学院", freq: "一年一届", teamId: 11 },
  { type: "学科类", scope: "国家级", name: "“北外—万慧达杯”国际知识产权模拟法庭大赛", org: "最高人民法院知识产权法庭、北京外国语大学法学院、万慧达知识产权代理有限公司", freq: "一年一届" },
  { type: "学科类", scope: "国家级", name: "中国 WTO 模拟法庭辩论赛", org: "商务部、中国政法大学、西南政法大学", freq: "一年一届", teamId: 8 },
  { type: "学科类", scope: "国家级", name: "中国国际海洋法模拟法庭竞赛", org: "中国海洋法学会、武汉大学", freq: "一年一届", teamId: 4 },
  { type: "学科类", scope: "国家级", name: "“理律杯”全国高校模拟法庭竞赛", org: "理律杯模拟法庭比赛组委会、清华大学", freq: "一年一届" },
  { type: "学科类", scope: "国家级", name: "全国大学生模拟法庭竞赛", org: "教育部国家级实验教学示范中心法学组联席会", freq: "一年一届" },
  { type: "其他", scope: "国家级", name: "全国大学生职业规划大赛", org: "教育部", freq: "一年一届" },
];

const TEAM_MAP = new Map(TEAMS.map((team) => [team.id, team]));

// System prompt is configured on the Dify server side.

// ─────────────────────────────────────────────────────────────
// TEAM CARD
// ─────────────────────────────────────────────────────────────
function TeamCard({ team, onClick, index, registerRef, highlighted, ui }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  const setCardRef = useCallback((node) => {
    cardRef.current = node;
    registerRef?.(team.id, node);
  }, [registerRef, team.id]);

  const handleClick = () => {
    const rect = cardRef.current?.getBoundingClientRect();
    onClick(team, rect);
  };

  return (
    <div
      ref={setCardRef}
      role="button" tabIndex={0}
      aria-label={`${team.name} — ${ui.buttons.details.replace(" →", "")}`}
      onClick={handleClick}
      onKeyDown={e => (e.key === "Enter" || e.key === " ") && handleClick()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", height: 248, borderRadius: 16,
        overflow: "hidden", cursor: "pointer",
        border: `1px solid ${hovered ? team.accent + "55" : "rgba(255,255,255,0.08)"}`,
        transform: hovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "transform 0.38s cubic-bezier(.34,1.56,.64,1), border-color 0.25s, box-shadow 0.3s",
        boxShadow: highlighted
          ? `0 0 0 2px rgba(122,39,53,0.9), 0 18px 44px rgba(20,28,40,0.16)`
          : hovered
          ? `0 24px 48px rgba(0,0,0,0.15), 0 0 0 1px ${team.accent}40`
          : "0 2px 16px rgba(0,0,0,0.08)",
        animationDelay: `${index * 0.035}s`,
        animationName: "cardIn", animationDuration: "0.5s",
        animationFillMode: "both", animationTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
        scrollMarginTop: 96
      }}
    >
      {/* Photo background */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${team.image})`,
        backgroundSize: "cover", backgroundPosition: "center",
        transform: hovered ? "scale(1.06)" : "scale(1)",
        transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
        filter: hovered ? "brightness(0.85)" : "brightness(0.65) saturate(0.9)"
      }} />
      {/* Gradient overlays */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(to top, ${team.bg.match(/#[0-9a-f]{6}/gi)?.[0] || "#000"}EE 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.1) 100%)`
      }} />
      {/* Top tag */}
      <div style={{
        position: "absolute", top: 14, left: 14,
        padding: "4px 10px", borderRadius: 100,
        background: `${team.accent}22`, backdropFilter: "blur(8px)",
        border: `1px solid ${team.accent}40`,
        fontSize: 9.5, fontWeight: 600, color: team.accent,
        letterSpacing: "0.12em", textTransform: "uppercase",
        fontFamily: "'Space Mono', monospace"
      }}>{team.tag}</div>
      {highlighted && (
        <div style={{
          position: "absolute", top: 14, right: 14,
          padding: "5px 10px",
          borderRadius: 100,
          background: "rgba(122,39,53,0.82)",
          border: "1px solid rgba(255,255,255,0.18)",
          color: "#FFFFFF",
          fontSize: 10,
          letterSpacing: "0.08em",
          fontFamily: "'Space Mono', monospace"
        }}>
          {ui.buttons.located}
        </div>
      )}
      {/* Bottom content */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 18px 18px",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 0.32s ease"
      }}>
        <div style={{
          width: hovered ? 48 : 28, height: 2, borderRadius: 1, marginBottom: 10,
          background: `linear-gradient(to right, ${team.accent}, transparent)`,
          transition: "width 0.35s ease"
        }} />
        <p style={{
          fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
          color: team.accent, marginBottom: 6, fontWeight: 600, opacity: 0.9,
          fontFamily: "'Instrument Sans', sans-serif"
        }}>{team.subtitle}</p>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 20, fontWeight: 600, lineHeight: 1.2, color: "#FFFFFF"
        }}>{team.name}</h3>
      </div>
      {/* Hover pill */}
      <div style={{
        position: "absolute", bottom: 18, right: 16,
        opacity: hovered ? 1 : 0,
        transform: hovered ? "translateY(0)" : "translateY(6px)",
        transition: "all 0.28s ease"
      }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          padding: "5px 12px", borderRadius: 100,
          background: "rgba(255,255,255,0.16)", backdropFilter: "blur(12px)",
          fontSize: 10.5, fontWeight: 600, color: "#fff",
          border: "1px solid rgba(255,255,255,0.22)",
          fontFamily: "'Instrument Sans', sans-serif"
        }}>{ui.buttons.details}</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FULLSCREEN OVERLAY
// ─────────────────────────────────────────────────────────────
function TeamDetailOverlay({ team, originRect, onClose, ui }) {
  const [activeTab, setActiveTab] = useState("introduction");
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);
  useEffect(() => { const id = requestAnimationFrame(() => setOpen(true)); return () => cancelAnimationFrame(id); }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setTimeout(onClose, 420);
  }, [onClose]);

  useEffect(() => {
    const h = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [handleClose]);

  // Scroll content to top on tab change
  useEffect(() => { contentRef.current?.scrollTo({ top: 0, behavior: "smooth" }); }, [activeTab]);

  const vw = window.innerWidth, vh = window.innerHeight;
  const pT = originRect ? (originRect.top / vh * 100).toFixed(2) : 40;
  const pB = originRect ? ((vh - originRect.bottom) / vh * 100).toFixed(2) : 40;
  const pL = originRect ? (originRect.left / vw * 100).toFixed(2) : 40;
  const pR = originRect ? ((vw - originRect.right) / vw * 100).toFixed(2) : 40;

  const content = {
    introduction: team.introduction, achievements: team.achievements,
    requirements: team.requirements, application: team.application, schedule: team.schedule,
  };

  return (
    <div
      role="dialog" aria-modal="true" aria-label={ui.overlay.dialogLabel}
      style={{
        position: "fixed", inset: 0, zIndex: 800,
        clipPath: open ? "inset(0% 0% 0% 0% round 0px)" : `inset(${pT}% ${pR}% ${pB}% ${pL}% round 16px)`,
        transition: open
          ? "clip-path 0.5s cubic-bezier(0.16,1,0.3,1)"
          : "clip-path 0.36s cubic-bezier(0.55,0,1,0.45)",
        display: "flex", flexDirection: "column", overflowY: "hidden"
      }}
    >
      {/* Layered bg */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "#0A1220" }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: `url(${team.image})`, backgroundSize: "cover", backgroundPosition: "center top",
        opacity: 0.12, filter: "blur(2px)" }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: `radial-gradient(circle at 1px 1px, ${team.accent}10 1px, transparent 0)`,
        backgroundSize: "44px 44px" }} />

      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", height: "100vh" }}>
        {/* ── TOP BAR ── */}
        <div style={{
          flexShrink: 0, padding: "0 clamp(20px,4vw,52px)",
          height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "rgba(10,18,32,0.9)", backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${team.accent}18`
        }}>
          <button onClick={handleClose} aria-label={ui.buttons.back}
            style={{
              display: "flex", alignItems: "center", gap: 8, background: "none",
              border: "none", cursor: "pointer", color: "rgba(236,242,255,0.5)",
              fontFamily: "'Instrument Sans', sans-serif", padding: "6px 0", transition: "color 0.2s"
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#ECF2FF"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(236,242,255,0.5)"}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            <span style={{ fontSize: 13, fontWeight: 500 }}>{ui.buttons.back}</span>
          </button>

          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "5px 14px 5px 10px", borderRadius: 100,
            background: `${team.accent}14`, border: `1px solid ${team.accent}28`
          }}>
            <span style={{ fontSize: 16 }}>{team.icon}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: team.accent, fontFamily: "'Space Mono', monospace" }}>{team.tag}</span>
          </div>

          <button onClick={handleClose} aria-label={ui.buttons.close}
            style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(236,242,255,0.45)", transition: "all 0.2s"
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#ECF2FF"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(236,242,255,0.45)"; }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* ── HERO BANNER ── */}
        <div style={{
          flexShrink: 0, position: "relative",
          height: "clamp(180px,32vh,280px)", overflow: "hidden"
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${team.image})`,
            backgroundSize: "cover", backgroundPosition: "center",
            filter: "brightness(0.55) saturate(0.85)",
            animationName: open ? "heroZoom" : "none",
            animationDuration: "0.7s", animationTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
            animationFillMode: "both", animationDelay: "0.15s"
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(10,18,32,0.1) 0%, rgba(10,18,32,0.0) 40%, rgba(10,18,32,0.95) 100%)"
          }} />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "0 clamp(20px,4vw,52px) clamp(20px,3vh,36px)",
            animationName: open ? "heroIn" : "none",
            animationDuration: "0.6s", animationTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
            animationFillMode: "both", animationDelay: "0.2s"
          }}>
            <p style={{
              fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase",
              color: team.accent, marginBottom: 10, opacity: 0.9, fontWeight: 700,
              fontFamily: "'Space Mono', monospace"
            }}>{team.subtitle}</p>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(32px,5vw,68px)", fontWeight: 400,
              lineHeight: 1.0, color: "#FFFFFF", letterSpacing: "-0.01em"
            }}>{team.name}</h1>
          </div>
        </div>

        {/* ── TABS ── */}
        <div style={{
          flexShrink: 0,
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(10,18,32,0.95)", backdropFilter: "blur(16px)"
        }}>
          <div style={{
            maxWidth: 1200, margin: "0 auto",
            padding: "0 clamp(20px,4vw,52px)",
            display: "flex", overflowX: "auto", gap: 0
          }}>
            {TABS.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: "14px 22px", background: "none", border: "none",
                  cursor: "pointer", fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: 13, fontWeight: activeTab === tab.key ? 600 : 400,
                  color: activeTab === tab.key ? team.accent : "rgba(236,242,255,0.38)",
                  borderBottom: `2px solid ${activeTab === tab.key ? team.accent : "transparent"}`,
                  marginBottom: -1, transition: "all 0.2s", whiteSpace: "nowrap"
                }}
              >{ui.tabLabels[tab.key]}</button>
            ))}
          </div>
        </div>

        {/* ── CONTENT AREA ── */}
        <div ref={contentRef} style={{ flex: 1, overflowY: "auto" }}>
          <div
            key={activeTab}
            style={{
              maxWidth: 1200, margin: "0 auto",
              padding: "clamp(28px,4vh,52px) clamp(20px,4vw,52px) 80px",
              display: "grid",
              gridTemplateColumns: "1fr clamp(220px,28%,320px)",
              gap: "clamp(28px,4vw,64px)",
              animationName: "contentFadeUp", animationDuration: "0.35s",
              animationTimingFunction: "cubic-bezier(0.16,1,0.3,1)", animationFillMode: "both"
            }}
          >
            {/* Main */}
            <div>
              <p style={{
                fontSize: "clamp(14.5px,1.4vw,17px)", lineHeight: 2.0,
                color: "rgba(220,232,255,0.82)", fontWeight: 300,
                whiteSpace: "pre-line", fontFamily: "'Instrument Sans', sans-serif"
              }}>{content[activeTab]}</p>
            </div>
            {/* Sidebar */}
            <aside>
              <div style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(16px)",
                border: `1px solid ${team.accent}20`,
                borderRadius: 16, overflow: "hidden"
              }}>
                {/* Sidebar header */}
                <div style={{
                  padding: "20px 22px",
                  background: `linear-gradient(135deg, ${team.accent}10, transparent)`,
                  borderBottom: `1px solid ${team.accent}15`
                }}>
                  <div style={{ fontSize: 36, marginBottom: 12, filter: `drop-shadow(0 0 16px ${team.accent}55)` }}>{team.icon}</div>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 20, fontWeight: 500, color: "#ECF2FF", marginBottom: 4, lineHeight: 1.2
                  }}>{team.name}</h3>
                  <p style={{
                    fontSize: 9.5, letterSpacing: "0.2em", textTransform: "uppercase",
                    color: team.accent, opacity: 0.8, fontFamily: "'Space Mono', monospace", fontWeight: 600
                  }}>{team.tag}</p>
                </div>
                {/* Sidebar stats */}
                <div style={{ padding: "18px 22px" }}>
                  {ui.overlay.sidebar.map(item => (
                    <div key={item.label} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <p style={{ fontSize: 9.5, color: "rgba(220,232,255,0.28)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4, fontFamily: "'Space Mono', monospace" }}>{item.label}</p>
                      <p style={{ fontSize: 14, color: "rgba(220,232,255,0.78)", fontFamily: "'Instrument Sans', sans-serif" }}>{item.value}</p>
                    </div>
                  ))}
                  <p style={{ fontSize: 10, color: "rgba(220,232,255,0.22)", textAlign: "center", marginTop: 4, fontFamily: "'Instrument Sans', sans-serif" }}>{ui.overlay.school}</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// AI WINDOW
// ─────────────────────────────────────────────────────────────
function WinBtn({ children, onClick, label }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} aria-label={label}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        width: 26, height: 26, borderRadius: "50%",
        background: h ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.04)",
        border: "1px solid rgba(0,0,0,0.08)", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: h ? "rgba(28,28,40,0.8)" : "rgba(28,28,40,0.35)", transition: "all 0.18s"
      }}>{children}</button>
  );
}

function QuickBtn({ children, onClick, color }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        padding: "4px 11px", borderRadius: 100,
        background: h ? `${color}1a` : `${color}0a`,
        border: `1px solid ${color}28`,
        color: h ? color : `${color}BB`,
        fontSize: 10.5, cursor: "pointer",
        fontFamily: "'Instrument Sans', sans-serif", transition: "all 0.18s", whiteSpace: "nowrap"
      }}>{children}</button>
  );
}

function AITutorWindow({ messages, input, setInput, onSend, onClose, onMinimize, isMinimized, loading, onShowTeams, pos, onMouseDown, messagesEndRef, ui, quickQuestions }) {
  const inputRef = useRef(null);
  useEffect(() => { if (!isMinimized) inputRef.current?.focus(); }, [isMinimized]);

  return (
    <div role="dialog" aria-label={ui.ai.title}
      style={{
        position: "fixed", bottom: 26, right: 26,
        width: isMinimized ? 280 : 390,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        zIndex: 1000,
        background: "rgba(255,250,250,0.96)", backdropFilter: "blur(28px)",
        border: "1px solid rgba(122,39,53,0.18)", borderRadius: 20,
        boxShadow: "0 36px 90px rgba(28,28,40,0.16), 0 0 0 1px rgba(122,39,53,0.08)",
        overflow: "hidden",
        animationName: "panelSlide", animationDuration: "0.42s",
        animationTimingFunction: "cubic-bezier(0.16,1,0.3,1)", animationFillMode: "both",
        transition: "width 0.32s cubic-bezier(0.16,1,0.3,1)"
      }}
    >
      {/* Header */}
      <div onMouseDown={onMouseDown}
        style={{
          padding: "13px 14px 12px",
          borderBottom: isMinimized ? "none" : "1px solid rgba(0,0,0,0.06)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "linear-gradient(135deg, rgba(122,39,53,0.14), rgba(255,255,255,0.6) 48%, rgba(82,105,168,0.08) 100%)",
          cursor: "grab", userSelect: "none"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 12,
            background: "linear-gradient(135deg, #8A1B2A, #5D1822)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35), 0 10px 24px rgba(122,39,53,0.2)"
          }}>⚖️</div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#1C1C28", lineHeight: 1.2, fontFamily: "'Instrument Sans', sans-serif" }}>{ui.ai.title}</p>
            <p style={{ fontSize: 10, color: "rgba(122,39,53,0.76)", display: "flex", alignItems: "center", gap: 4, fontFamily: "'Space Mono', monospace", marginTop: 2 }}>
              <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#4ADE80", boxShadow: "0 0 6px #4ADE80" }} />
              {ui.ai.status}
            </p>
          </div>
        </div>
        <div className="no-drag" style={{ display: "flex", gap: 4 }}>
          <WinBtn onClick={onMinimize} label={isMinimized ? ui.buttons.expand : ui.buttons.minimize}>
            {isMinimized
              ? <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              : <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/></svg>}
          </WinBtn>
          <WinBtn onClick={onClose} label={ui.buttons.close}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </WinBtn>
        </div>
      </div>

      {!isMinimized && <>
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

        {/* Messages */}
        <div style={{ height: 272, overflowY: "auto", padding: "8px 12px 6px", display: "flex", flexDirection: "column", gap: 10 }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              animationName: "fadeIn", animationDuration: "0.22s", animationFillMode: "both"
            }}>
              <div style={{
                maxWidth: "88%", padding: "8px 12px",
                borderRadius: msg.role === "user" ? "13px 13px 4px 13px" : "13px 13px 13px 4px",
                background: msg.role === "user"
                  ? "linear-gradient(135deg, #8A1B2A, #5D1822)"
                  : "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(247,243,235,0.9))",
                border: msg.role === "assistant" ? "1px solid rgba(122,39,53,0.12)" : "none",
                fontSize: 12, lineHeight: 1.7,
                color: msg.role === "user" ? "#FFFFFF" : "rgba(28,28,40,0.82)",
                fontWeight: msg.role === "user" ? 600 : 400,
                whiteSpace: "pre-wrap", wordBreak: "break-word",
                fontFamily: "'Instrument Sans', sans-serif",
                boxShadow: msg.role === "assistant" ? "0 8px 24px rgba(28,28,40,0.04)" : "0 10px 22px rgba(122,39,53,0.18)"
              }}>{msg.content}</div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", gap: 5, padding: "5px 10px" }}>
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width: 7, height: 7, borderRadius: "50%", background: "#8A1B2A",
                  animationName: "dotPulse", animationDuration: "1.4s",
                  animationDelay: `${i * 0.2}s`, animationIterationCount: "infinite"
                }} />
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick btns */}
        <div className="no-drag" style={{
          padding: "10px 12px 8px",
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          borderTop: "1px solid rgba(0,0,0,0.04)",
          background: "rgba(255,255,255,0.42)"
        }}>
          <div style={{
            width: "100%",
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(28,28,40,0.38)",
            fontFamily: "'Space Mono', monospace",
            marginBottom: 2
          }}>{ui.ai.recommends}</div>
          {quickQuestions.map((q, i) => (
            <QuickBtn key={i} onClick={() => onSend(q)} color="rgba(160,120,20,0.9)">{q}</QuickBtn>
          ))}
          <QuickBtn onClick={onShowTeams} color="rgba(60,100,180,0.9)">{ui.buttons.viewTeams}</QuickBtn>
        </div>

        {/* Input */}
        <div className="no-drag" style={{
          padding: "8px 12px 13px", borderTop: "1px solid rgba(0,0,0,0.06)",
          display: "flex", gap: 7, alignItems: "center"
        }}>
          <input
            ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && !loading && onSend()}
            placeholder={ui.buttons.sendPlaceholder}
            aria-label={ui.buttons.sendPlaceholder}
            style={{
              flex: 1, background: "rgba(255,255,255,0.8)",
              border: "1px solid rgba(122,39,53,0.14)", borderRadius: 12,
              padding: "10px 12px", fontSize: 12, color: "#1C1C28",
              fontFamily: "'Instrument Sans', sans-serif", outline: "none", transition: "border-color 0.2s, box-shadow 0.2s"
            }}
            onFocus={e => { e.target.style.borderColor = "rgba(122,39,53,0.4)"; e.target.style.boxShadow = "0 0 0 4px rgba(122,39,53,0.08)"; }}
            onBlur={e => { e.target.style.borderColor = "rgba(122,39,53,0.14)"; e.target.style.boxShadow = "none"; }}
          />
          <button onClick={() => onSend()} disabled={!input.trim() || loading}
            style={{
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              background: input.trim() && !loading ? "linear-gradient(135deg, #8A1B2A, #5D1822)" : "rgba(0,0,0,0.04)",
              border: "none", cursor: input.trim() && !loading ? "pointer" : "default",
              display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.18s"
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke={input.trim() && !loading ? "#FFFFFF" : "rgba(0,0,0,0.2)"} strokeWidth="2.5">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
          </button>
        </div>
      </>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DIFY API CONFIG
// ─────────────────────────────────────────────────────────────
// Route all Dify requests through the Vercel serverless proxy.
const DIFY_BASE = "/api/dify";

function createDifyUserId() {
  return `moot-court-${Math.random().toString(36).slice(2, 10)}`;
}

// ─────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────
export default function MootCourtModule() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Instrument+Sans:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const [selectedTeam, setSelectedTeam] = useState(null);
  const [originRect,   setOriginRect]   = useState(null);
  const [dirOpen,      setDirOpen]      = useState(true);
  const [guideOpen,    setGuideOpen]    = useState(false);
  const [lang,         setLang]         = useState("zh");
  const [activeJumpTeamId, setActiveJumpTeamId] = useState(null);
  const [aiOpen,       setAiOpen]       = useState(false);
  const [aiMin,        setAiMin]        = useState(false);
  const [messages,     setMessages]     = useState([{
    role: "assistant",
    content: AI_WELCOME_MESSAGE.zh
  }]);
  const [input,   setInput]   = useState("");
  const [loading, setLoading] = useState(false);
  const [aiPos,   setAiPos]   = useState({ x: 0, y: 0 });

  const isDragging     = useRef(false);
  const dragStart      = useRef({ x: 0, y: 0 });
  const messagesEnd    = useRef(null);
  const teamDirectoryRef = useRef(null);
  const teamCardRefs   = useRef(new Map());
  const jumpTimerRef   = useRef(null);
  const conversationId = useRef("");   // persists the Dify conversation session
  const difyUserId     = useRef(createDifyUserId());
  const ui             = UI_TEXT[lang];
  const quickQuestions = QUICK_QUESTIONS[lang];

  useEffect(() => { messagesEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  useEffect(() => () => window.clearTimeout(jumpTimerRef.current), []);
  useEffect(() => {
    setMessages((prev) => (
      prev.length === 1 && prev[0].role === "assistant"
        ? [{ role: "assistant", content: AI_WELCOME_MESSAGE[lang] }]
        : prev
    ));
  }, [lang]);

  const registerTeamCardRef = useCallback((teamId, node) => {
    if (node) teamCardRefs.current.set(teamId, node);
    else teamCardRefs.current.delete(teamId);
  }, []);

  const pulseTeamCard = useCallback((teamId) => {
    setActiveJumpTeamId(teamId);
    window.clearTimeout(jumpTimerRef.current);
    jumpTimerRef.current = window.setTimeout(() => setActiveJumpTeamId(null), 2200);
  }, []);

  const handleMouseDown = useCallback((e) => {
    if (e.target.closest(".no-drag")) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX - aiPos.x, y: e.clientY - aiPos.y };
    e.preventDefault();
  }, [aiPos]);

  useEffect(() => {
    const move = (e) => { if (isDragging.current) setAiPos({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y }); };
    const up   = ()  => { isDragging.current = false; };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
  }, []);

  const handleTeamClick = useCallback((team, rect) => {
    setOriginRect(rect);
    setSelectedTeam(team);
  }, []);

  const focusTeamCard = useCallback((teamId, attempt = 0) => {
    const node = teamCardRefs.current.get(teamId);
    const team = TEAM_MAP.get(teamId);
    if (!node || !team) {
      if (attempt < 8) {
        window.setTimeout(() => focusTeamCard(teamId, attempt + 1), 80);
      }
      return;
    }

    node.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => {
      handleTeamClick(team, node.getBoundingClientRect());
    }, 340);
  }, [handleTeamClick]);

  const handleGuideItemClick = useCallback((item) => {
    if (!item.teamId) return;
    setDirOpen(true);
    pulseTeamCard(item.teamId);
    teamDirectoryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => focusTeamCard(item.teamId), dirOpen ? 80 : 220);
  }, [dirOpen, focusTeamCard, pulseTeamCard]);

  // ── Dify streaming chat send ──────────────────────────────
  const handleSend = useCallback(async (msg) => {
    const text = (msg || input).trim();
    if (!text || loading) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setLoading(true);

    // Add a placeholder assistant message we'll stream into
    const placeholderIdx = Date.now();
    setMessages(prev => [...prev, { role: "assistant", content: "", _id: placeholderIdx }]);

    try {
      const res = await fetch(`${DIFY_BASE}/chat-messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: text,
          inputs: {},
          response_mode: "streaming",
          conversation_id: conversationId.current,
          user: difyUserId.current,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errText.slice(0, 200)}`);
      }

      const reader  = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer    = "";
      let fullAnswer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        // SSE: split on double newline OR single newline for each data: line
        const parts = buffer.split("\n");
        buffer = parts.pop(); // keep last incomplete chunk

        for (const part of parts) {
          const line = part.trim();
          if (!line.startsWith("data:") && !line.startsWith("data: ")) continue;
          const raw = line.replace(/^data:\s*/, "").trim();
          if (!raw || raw === "[DONE]") continue;

          try {
            const parsed = JSON.parse(raw);

            // Persist conversation_id for multi-turn
            if (parsed.conversation_id) {
              conversationId.current = parsed.conversation_id;
            }

            if ((parsed.event === "message" || parsed.event === "agent_message") && parsed.answer) {
              fullAnswer += parsed.answer;
              const snapshot = fullAnswer;
              setMessages(prev => prev.map(m =>
                m._id === placeholderIdx ? { ...m, content: snapshot } : m
              ));
            }

            if (parsed.event === "error") {
              throw new Error(parsed.message || "Dify stream error");
            }
          } catch (parseErr) {
            if (parseErr.message && !parseErr.message.includes("JSON")) {
              // Re-throw non-parse errors (like our intentional throw above)
              throw parseErr;
            }
            // skip malformed SSE lines
          }
        }
      }

      // If stream ended with no content at all
      if (!fullAnswer) {
        setMessages(prev => prev.map(m =>
          m._id === placeholderIdx
            ? { ...m, content: ui.ai.emptyAnswer }
            : m
        ));
      }
    } catch (err) {
      console.error("Dify chat error:", err);
      setMessages(prev => prev.map(m =>
        m._id === placeholderIdx
          ? { ...m, content: `${lang === "zh" ? "连接出错" : "Connection error"}：${err.message || (lang === "zh" ? "网络异常，请稍后重试" : "network issue, please try again later")}\n\n${ui.ai.errorAdvice}` }
          : m
      ));
    } finally {
      setLoading(false);
    }
  }, [input, loading, ui, lang]);

  const handleShowTeams = useCallback(() => {
    const list = TEAMS.map((t, i) => `${i + 1}. ${t.name} — ${t.tag}`).join("\n");
    setMessages(prev => [...prev, { role: "assistant", content: `${ui.ai.allTeamsReplyPrefix}\n\n${list}\n\n${ui.ai.allTeamsReplySuffix}` }]);
  }, [ui]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #FAF1F1 0%, #F7ECEC 50%, #F2E7E7 100%)",
      fontFamily: "'Instrument Sans', sans-serif",
      color: "#1C1C28", position: "relative", overflowX: "hidden"
    }}>
      {/* Fine dot grid */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(122,39,53,0.045) 1px, transparent 0)",
        backgroundSize: "42px 42px"
      }} />
      {/* Ambient orbs */}
      <div style={{
        position: "fixed", top: "-20%", right: "-12%", width: 800, height: 800,
        background: "radial-gradient(circle, rgba(94,124,162,0.10) 0%, transparent 60%)",
        pointerEvents: "none", zIndex: 0
      }} />
      <div style={{
        position: "fixed", bottom: "-18%", left: "-8%", width: 700, height: 700,
        background: "radial-gradient(circle, rgba(122,39,53,0.08) 0%, transparent 60%)",
        pointerEvents: "none", zIndex: 0
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1400, margin: "0 auto", padding: "0 clamp(20px,4vw,40px)" }}>

        {/* ── HEADER ── */}
        <header style={{ padding: "clamp(20px,4vh,36px) 0 clamp(30px,5vh,48px)" }}>
          <div style={{
            position: "relative",
            minHeight: "clamp(560px, 74vh, 780px)",
            borderRadius: 30,
            overflow: "hidden",
            boxShadow: "0 28px 80px rgba(15,23,42,0.18)"
          }}>
            <div style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${HERO_ASSETS.campus})`,
              backgroundSize: "cover",
              backgroundPosition: "center 32%",
              transform: "scale(1.02)"
            }} />
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(7,18,34,0.42) 0%, rgba(12,20,31,0.24) 24%, rgba(10,17,28,0.36) 54%, rgba(8,14,24,0.72) 100%)"
            }} />
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, rgba(0,0,0,0.20), transparent 26%, transparent 74%, rgba(0,0,0,0.20))"
            }} />

            <div style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              minHeight: "clamp(560px, 74vh, 780px)",
              padding: "clamp(22px,3vw,34px)"
            }}>
              <div style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 16,
                flexWrap: "wrap"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  minWidth: 0
                }}>
                  <img
                    src={HERO_ASSETS.logo}
                    alt={ui.footer.school}
                    style={{
                      width: "min(100%, 360px)",
                      maxWidth: 360,
                      height: "auto",
                      display: "block"
                    }}
                  />
                </div>

                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  flexWrap: "wrap",
                  justifyContent: "flex-end"
                }}>
                  <a
                    href="https://law.sjtu.edu.cn/"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      padding: "8px 14px",
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      color: "rgba(255,255,255,0.92)",
                      fontSize: 12,
                      letterSpacing: "0.06em",
                      backdropFilter: "blur(10px)",
                      textDecoration: "none"
                    }}
                  >
                    {ui.buttons.official}
                  </a>
                  <button
                    onClick={() => setLang((prev) => prev === "zh" ? "en" : "zh")}
                    style={{
                      padding: "8px 14px",
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      color: "rgba(255,255,255,0.92)",
                      fontSize: 12,
                      letterSpacing: "0.06em",
                      backdropFilter: "blur(10px)",
                      cursor: "pointer"
                    }}
                  >
                    {lang === "zh" ? ui.buttons.english : ui.buttons.chinese}
                  </button>
                </div>
              </div>

              <div style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center"
              }}>
                <div style={{ maxWidth: 900 }}>
                  <p style={{
                    fontSize: "clamp(11px,1vw,13px)",
                    letterSpacing: "0.34em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.75)",
                    marginBottom: 18,
                    fontFamily: "'Space Mono', monospace"
                  }}>
                    {ui.hero.university}
                  </p>
                  <h1 style={{
                    fontFamily: "'Microsoft YaHei', 'PingFang SC', sans-serif",
                    fontSize: "clamp(44px, 7.4vw, 86px)",
                    fontWeight: 300,
                    lineHeight: 1.06,
                    color: "#FFFFFF",
                    letterSpacing: "0.08em",
                    textShadow: "0 8px 30px rgba(0,0,0,0.28)"
                  }}>
                    {ui.hero.title}
                  </h1>
                  <div style={{
                    marginTop: 26,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 18,
                    flexWrap: "wrap"
                  }}>
                    {[ui.hero.motto1, ui.hero.motto2].map((label, idx) => (
                      <div key={label} style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 18,
                        color: "rgba(255,255,255,0.96)"
                      }}>
                        <span style={{
                          fontFamily: "'Microsoft YaHei', 'PingFang SC', sans-serif",
                          fontSize: "clamp(18px,2vw,28px)",
                          fontWeight: 300,
                          letterSpacing: "0.34em"
                        }}>
                          {label}
                        </span>
                        {idx === 0 && <span style={{ width: 1, height: 28, background: "rgba(255,255,255,0.42)" }} />}
                      </div>
                    ))}
                  </div>
                  <p style={{
                    marginTop: 14,
                    color: "rgba(255,255,255,0.78)",
                    fontSize: "clamp(14px,1.4vw,18px)",
                    fontFamily: "'Cormorant Garamond', serif",
                    letterSpacing: "0.01em"
                  }}>
                    {ui.hero.subtitle}
                  </p>
                </div>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1.45fr) minmax(300px, 0.9fr)",
                gap: 18,
                alignItems: "end"
              }}>
                <div style={{
                  padding: "18px clamp(18px,2vw,24px)",
                  borderRadius: 22,
                  background: "rgba(10,17,28,0.34)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  backdropFilter: "blur(12px)"
                }}>
                  <p style={{
                    fontSize: 12,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.64)",
                    fontFamily: "'Space Mono', monospace",
                    marginBottom: 8
                  }}>
                    {ui.hero.welcomeTitle}
                  </p>
                  <p style={{
                    fontSize: "clamp(13px,1.3vw,16px)",
                    lineHeight: 1.9,
                    color: "rgba(255,255,255,0.92)"
                  }}>
                    {ui.hero.welcomeText}
                  </p>
                </div>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  gap: 12
                }}>
                  {ui.hero.stats.map((s) => (
                    <div key={s.n} style={{
                      padding: "18px 12px",
                      borderRadius: 20,
                      textAlign: "center",
                      background: "rgba(255,255,255,0.10)",
                      border: "1px solid rgba(255,255,255,0.14)",
                      backdropFilter: "blur(12px)"
                    }}>
                      <p style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(24px,2.4vw,36px)",
                        color: "#FFFFFF",
                        lineHeight: 1
                      }}>
                        {s.n}
                      </p>
                      <p style={{
                        marginTop: 8,
                        fontSize: 11,
                        color: "rgba(255,255,255,0.72)",
                        letterSpacing: "0.08em"
                      }}>
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>


        {/* ── COMPETITION DIRECTORY ── */}
        <div style={{ marginBottom: 28 }}>
          <button
            onClick={() => setGuideOpen(v => !v)} aria-expanded={guideOpen}
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "15px 22px",
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(122,39,53,0.14)",
              borderRadius: 13, cursor: "pointer", color: "#1C1C28",
              marginBottom: guideOpen ? 20 : 0,
              backdropFilter: "blur(12px)", transition: "all 0.28s"
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.85)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.7)"}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 8, height: 8, borderRadius: "50%", background: "#7A2735",
                boxShadow: "0 0 12px rgba(122,39,53,0.45)"
              }} />
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 20, fontWeight: 500, letterSpacing: "0.01em"
              }}>{ui.guide.title}</span>
              <span style={{
                fontSize: 10.5, padding: "2px 11px", borderRadius: 100,
                background: "rgba(122,39,53,0.08)", color: "#7A2735",
                border: "1px solid rgba(122,39,53,0.15)",
                fontFamily: "'Space Mono', monospace"
              }}>{GUIDE_ITEMS.length}</span>
            </div>
            <div style={{ transform: guideOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.28s", opacity: 0.5 }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </div>
          </button>

          {guideOpen && (
            <div style={{
              background: "rgba(255,255,255,0.75)", backdropFilter: "blur(16px)",
              border: "1px solid rgba(122,39,53,0.1)", borderRadius: 16,
              overflow: "hidden",
              animationName: "cardIn", animationDuration: "0.4s",
              animationTimingFunction: "cubic-bezier(0.16,1,0.3,1)", animationFillMode: "both"
            }}>
              <div style={{
                padding: "14px 24px 10px",
                borderBottom: "1px solid rgba(0,0,0,0.04)",
                background: "linear-gradient(180deg, rgba(122,39,53,0.04), transparent)"
              }}>
                <p style={{ fontSize: 12.5, color: "rgba(28,28,40,0.6)", lineHeight: 1.7 }}>
                  {ui.guide.note}
                </p>
              </div>
              {/* Table header */}
              <div style={{
                padding: "14px 24px",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                display: "grid",
                gridTemplateColumns: "56px 56px 1fr auto",
                gap: 12, alignItems: "center",
                background: "rgba(0,0,0,0.02)"
              }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(28,28,40,0.4)", letterSpacing: "0.1em", fontFamily: "'Space Mono', monospace" }}>{ui.guide.columns[0]}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(28,28,40,0.4)", letterSpacing: "0.1em", fontFamily: "'Space Mono', monospace" }}>{ui.guide.columns[1]}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(28,28,40,0.4)", letterSpacing: "0.1em", fontFamily: "'Space Mono', monospace" }}>{ui.guide.columns[2]}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(28,28,40,0.4)", letterSpacing: "0.1em", fontFamily: "'Space Mono', monospace" }}>{ui.guide.columns[3]}</span>
              </div>
              {/* Items */}
              {GUIDE_ITEMS.map((item, idx) => (
                <div key={idx} style={{
                  padding: "11px 24px",
                  borderBottom: "1px solid rgba(0,0,0,0.03)",
                  display: "grid",
                  gridTemplateColumns: "56px 56px 1fr auto",
                  gap: 12, alignItems: "center",
                  background: idx % 2 === 0 ? "transparent" : "rgba(0,0,0,0.012)",
                  transition: "background 0.15s",
                  cursor: item.teamId ? "pointer" : "default",
                  boxShadow: item.teamId ? "inset 3px 0 0 rgba(122,39,53,0.18)" : "none"
                }}
                  role={item.teamId ? "button" : undefined}
                  tabIndex={item.teamId ? 0 : undefined}
                  aria-label={item.teamId ? `${item.name} — ${ui.buttons.teamIntro}` : undefined}
                  onClick={() => handleGuideItemClick(item)}
                  onKeyDown={(e) => {
                    if (item.teamId && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      handleGuideItemClick(item);
                    }
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = item.teamId ? "rgba(122,39,53,0.045)" : "rgba(108,92,231,0.03)"}
                  onMouseLeave={e => e.currentTarget.style.background = idx % 2 === 0 ? "transparent" : "rgba(0,0,0,0.012)"}
                >
                  <span style={{
                    fontSize: 10, padding: "2px 6px", borderRadius: 100, textAlign: "center",
                    background: item.type === "科创类" ? "rgba(234,88,12,0.08)" : item.type === "学科类" ? "rgba(108,92,231,0.08)" : "rgba(100,116,139,0.08)",
                    color: item.type === "科创类" ? "#EA580C" : item.type === "学科类" ? "#6C5CE7" : "#64748B",
                    fontWeight: 600, whiteSpace: "nowrap", fontFamily: "'Space Mono', monospace"
                  }}>{GUIDE_TYPE_LABEL[lang][item.type] || item.type}</span>
                  <span style={{
                    fontSize: 10, padding: "2px 6px", borderRadius: 100, textAlign: "center",
                    background: item.scope === "国际级" ? "rgba(37,99,235,0.08)" : "rgba(22,163,74,0.08)",
                    color: item.scope === "国际级" ? "#2563EB" : "#16A34A",
                    fontWeight: 600, whiteSpace: "nowrap", fontFamily: "'Space Mono', monospace"
                  }}>{GUIDE_SCOPE_LABEL[lang][item.scope] || item.scope}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                      <p style={{ fontSize: 13, fontWeight: 500, color: "#1C1C28", lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</p>
                      {item.teamId && (
                        <span style={{
                          flexShrink: 0,
                          padding: "2px 8px",
                          borderRadius: 100,
                          background: "rgba(122,39,53,0.08)",
                          border: "1px solid rgba(122,39,53,0.14)",
                          color: "#7A2735",
                          fontSize: 10.5,
                          fontFamily: "'Space Mono', monospace"
                        }}>
                          {ui.buttons.teamIntro}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: 10.5, color: "rgba(28,28,40,0.38)", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.org}</p>
                  </div>
                  <span style={{ fontSize: 10, color: "rgba(28,28,40,0.35)", fontFamily: "'Space Mono', monospace", whiteSpace: "nowrap" }}>{item.freq}</span>
                </div>
              ))}
              <div style={{ padding: "12px 24px", textAlign: "center" }}>
                <p style={{ fontSize: 10, color: "rgba(28,28,40,0.3)", fontFamily: "'Space Mono', monospace" }}>{ui.guide.footnote}</p>
              </div>
            </div>
          )}
        </div>

        {/* ── DIRECTORY HEADER ── */}
        <div ref={teamDirectoryRef} style={{ marginBottom: 20 }}>
          <button
            onClick={() => setDirOpen(v => !v)} aria-expanded={dirOpen}
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "15px 22px",
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(122,39,53,0.14)",
              borderRadius: 13, cursor: "pointer", color: "#1C1C28",
              marginBottom: dirOpen ? 20 : 0,
              backdropFilter: "blur(12px)", transition: "all 0.28s"
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.85)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.7)"}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 8, height: 8, borderRadius: "50%", background: "#7A2735",
                boxShadow: "0 0 12px rgba(122,39,53,0.45)"
              }} />
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 20, fontWeight: 500, letterSpacing: "0.01em"
              }}>{ui.directory.title}</span>
              <span style={{
                fontSize: 10.5, padding: "2px 11px", borderRadius: 100,
                background: "rgba(122,39,53,0.08)", color: "#7A2735",
                border: "1px solid rgba(122,39,53,0.15)",
                fontFamily: "'Space Mono', monospace"
              }}>{TEAMS.length}</span>
            </div>
            <div style={{ transform: dirOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.28s", opacity: 0.5 }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </div>
          </button>

          {dirOpen && (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
              gap: 16
            }}>
              {TEAMS.map((team, idx) => (
                <TeamCard
                  key={team.id}
                  team={team}
                  index={idx}
                  onClick={handleTeamClick}
                  registerRef={registerTeamCardRef}
                  highlighted={activeJumpTeamId === team.id}
                  ui={ui}
                />
              ))}
            </div>
          )}
        </div>

        <footer style={{ margin: "22px 0 120px" }}>
          <section style={{
            height: "clamp(260px, 40vh, 420px)",
            borderRadius: "28px 28px 0 0",
            overflow: "hidden",
            backgroundImage: `linear-gradient(rgba(10,16,24,0.28), rgba(10,16,24,0.48)), url(${HERO_ASSETS.footer})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundAttachment: "fixed",
            display: "flex",
            alignItems: "end",
            padding: "clamp(24px,3vw,36px)"
          }}>
            <div style={{
              maxWidth: 620,
              background: "rgba(122,39,53,0.72)",
              color: "#FFFFFF",
              padding: "20px 24px",
              borderRadius: 22,
              backdropFilter: "blur(8px)"
            }}>
              <p style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.72, marginBottom: 8 }}>
                {ui.footer.parallaxTitle}
              </p>
              <p style={{ fontSize: "clamp(14px,1.4vw,17px)", lineHeight: 1.9 }}>
                {ui.footer.parallaxText}
              </p>
            </div>
          </section>
          <section style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "0 0 28px 28px",
            background: "linear-gradient(180deg, #24181B 0%, #1D1315 100%)",
            color: "#D8D2D2",
            padding: "0 clamp(24px,3vw,32px) clamp(28px,3vw,34px)"
          }}>
            <div style={{
              width: "min(100%, 900px)",
              marginTop: -1,
              padding: "24px 28px 26px",
              clipPath: "polygon(0 0, 100% 0, 91% 100%, 0 100%)",
              background: "#8A1B2A",
              color: "#FFFFFF"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <img src={HERO_ASSETS.logo} alt={ui.footer.school} style={{ width: "min(100%, 420px)", height: "auto", display: "block" }} />
              </div>
            </div>
            <div style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0 8px, transparent 8px 24px), repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0 34px, transparent 34px 72px)",
              pointerEvents: "none"
            }} />
            <div style={{
              position: "relative",
              zIndex: 1,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
              marginTop: 28
            }}>
              <p style={{ fontSize: "clamp(14px,1.3vw,16px)", lineHeight: 1.9 }}>{ui.footer.copyright}</p>
              <p style={{ fontSize: "clamp(14px,1.3vw,16px)", lineHeight: 1.9 }}>{ui.footer.address}</p>
              <p style={{ fontSize: "clamp(14px,1.3vw,16px)", lineHeight: 1.9 }}>{ui.footer.postcode}</p>
              <p style={{ fontSize: "clamp(14px,1.3vw,16px)", lineHeight: 1.9 }}>{ui.footer.icp}</p>
              <p style={{ fontSize: "clamp(14px,1.3vw,16px)", lineHeight: 1.9 }}>{ui.footer.police}</p>
            </div>
          </section>
        </footer>
      </div>

      {/* ── FULL-SCREEN OVERLAY ── */}
      {selectedTeam && (
        <TeamDetailOverlay
          team={selectedTeam} originRect={originRect}
          onClose={() => { setSelectedTeam(null); setOriginRect(null); }}
          ui={ui}
        />
      )}

      {/* ── AI FAB ── */}
      {!aiOpen && (
        <button onClick={() => setAiOpen(true)} aria-label={ui.ai.title}
          style={{
            position: "fixed", bottom: 26, right: 26,
            width: 58, height: 58, borderRadius: "50%",
            background: "linear-gradient(135deg,#7A2735,#4B1823)",
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 28px rgba(122,39,53,0.3)",
            zIndex: 999, transition: "transform 0.22s, box-shadow 0.22s"
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(122,39,53,0.42)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(122,39,53,0.3)"; }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
      )}

      {/* ── AI WINDOW ── */}
      {aiOpen && (
        <AITutorWindow
          messages={messages} input={input} setInput={setInput}
          onSend={handleSend}
          onClose={() => { setAiOpen(false); setAiMin(false); }}
          onMinimize={() => setAiMin(v => !v)} isMinimized={aiMin}
          loading={loading} onShowTeams={handleShowTeams}
          pos={aiPos} onMouseDown={handleMouseDown}
          messagesEndRef={messagesEnd}
          ui={ui}
          quickQuestions={quickQuestions}
        />
      )}

      {/* ── GLOBAL CSS ── */}
      <style>{`
        @keyframes cardIn {
          from { opacity:0; transform:translateY(22px) scale(0.97); }
          to   { opacity:1; transform:translateY(0)    scale(1);    }
        }
        @keyframes panelSlide {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes heroZoom {
          from { transform:scale(1.06); }
          to   { transform:scale(1);    }
        }
        @keyframes heroIn {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes contentFadeUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes dotPulse {
          0%,80%,100% { opacity:.2; transform:scale(.7); }
          40%          { opacity:1; transform:scale(1);   }
        }
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:3px; height:3px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(122,39,53,.24); border-radius:2px; }
        button { font-family:'Instrument Sans',sans-serif; }
        input::placeholder { color:rgba(28,28,40,.28); }
      `}</style>
    </div>
  );
}
