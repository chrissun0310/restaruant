const plan = [
  {
    title: "第 1 周",
    focus: ["发音", "数字 0-100", "问候", "自我介绍", "国家和语言"],
    days: [
      day("26 个字母和变音", ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "ä", "ö", "ü", "ß"], "先学会德语 26 个字母、ä ö ü 和 ß 的读法", "Hallo, ich heiße Chris.", "把 26 个字母完整读 5 遍，再写自己的名字并拼读。"),
      day("问候和礼貌", ["Guten Morgen", "Guten Tag", "Danke", "Bitte", "Entschuldigung"], "正式/非正式问候", "Guten Tag, wie heißen Sie?", "写一段初次见面小对话。"),
      day("自我介绍", ["Name", "heißen", "kommen", "wohnen", "lernen"], "ich 动词变位", "Ich komme aus China und wohne in Dubai.", "写 5 句自我介绍。"),
      day("国家和语言", ["China", "Deutschland", "Englisch", "Deutsch", "Chinesisch"], "sprechen 的变位", "Ich spreche Chinesisch und Englisch.", "写你会说的语言。"),
      day("职业", ["Student", "Lehrer", "Arzt", "Ingenieur", "Verkäufer"], "sein 的用法", "Ich bin Student. Meine Mutter ist Lehrerin.", "写 3 个职业句子。"),
      day("数字 0-100", ["eins", "zwei", "zehn", "zwanzig", "hundert"], "电话号码表达", "Meine Telefonnummer ist null fünf fünf.", "写你的电话号码读法。"),
      day("第 1 周复习", ["ich", "Sie", "woher", "wo", "wie"], "W-Fragen", "Woher kommen Sie? Ich komme aus China.", "完成一篇完整自我介绍。")
    ]
  },
  {
    title: "第 2 周",
    focus: ["家庭", "星期", "时间", "日常活动", "兴趣爱好"],
    days: [
      day("家庭成员", ["Mutter", "Vater", "Bruder", "Schwester", "Familie"], "haben 的用法", "Ich habe einen Bruder und eine Schwester.", "介绍你的家庭。"),
      day("星期和月份", ["Montag", "Dienstag", "Januar", "Mai", "heute"], "am + 星期", "Am Montag habe ich Deutschkurs.", "写本周安排。"),
      day("时间表达", ["Uhr", "halb", "Viertel", "morgen", "Abend"], "um + 时间", "Ich stehe um sieben Uhr auf.", "写 5 个时间句子。"),
      day("日常活动", ["aufstehen", "arbeiten", "lernen", "essen", "schlafen"], "可分动词", "Ich stehe früh auf und lerne Deutsch.", "写一天的作息。"),
      day("兴趣爱好", ["lesen", "kochen", "Musik", "Sport", "gern"], "gern / nicht gern", "Ich lese gern. Ich koche nicht gern.", "写 5 个喜好。"),
      day("朋友和约见", ["Freund", "treffen", "Kino", "Zeit", "morgen"], "Ja/Nein 问句", "Hast du morgen Zeit?", "写一条约朋友的短信。"),
      day("第 2 周复习", ["haben", "gern", "am", "um", "aufstehen"], "动词第二位", "Am Abend lerne ich Deutsch.", "写一篇日常生活短文。")
    ]
  },
  {
    title: "第 3 周",
    focus: ["食物", "餐厅", "超市", "价格", "衣服颜色"],
    days: [
      day("食物", ["Brot", "Reis", "Fisch", "Gemüse", "Obst"], "der/die/das 入门", "Ich esse gern Reis und Gemüse.", "写你喜欢吃什么。"),
      day("饮料", ["Wasser", "Kaffee", "Tee", "Milch", "Saft"], "möchten", "Ich möchte einen Kaffee, bitte.", "写 3 个点饮料句子。"),
      day("餐厅点餐", ["Speisekarte", "Rechnung", "bitte", "nehmen", "bezahlen"], "Akkusativ 入门", "Ich nehme eine Suppe.", "写一段点餐对话。"),
      day("超市购物", ["Flasche", "Kilo", "Packung", "kaufen", "brauchen"], "ein/eine", "Ich brauche eine Flasche Wasser.", "写购物清单。"),
      day("价格", ["Euro", "Cent", "kosten", "teuer", "billig"], "Was kostet ...?", "Was kostet das? Das kostet zehn Euro.", "写 5 个价格问答。"),
      day("衣服颜色", ["Jacke", "Hose", "Schuhe", "rot", "schwarz"], "kein/keine", "Ich habe keine schwarze Jacke.", "描述你今天穿什么。"),
      day("第 3 周复习", ["möchte", "nehme", "kostet", "teuer", "kaufen"], "餐厅+购物综合", "Ich möchte bezahlen.", "写一条买东西短信。")
    ]
  },
  {
    title: "第 4 周",
    focus: ["城市地点", "交通", "问路", "电话", "预约"],
    days: [
      day("城市地点", ["Bahnhof", "Apotheke", "Schule", "Bank", "Supermarkt"], "wo / wohin", "Wo ist der Bahnhof?", "写 5 个地点问句。"),
      day("问路", ["links", "rechts", "geradeaus", "Straße", "Platz"], "命令式 Sie", "Gehen Sie geradeaus und dann links.", "写一段问路对话。"),
      day("交通", ["Bus", "Bahn", "Taxi", "Auto", "fahren"], "mit + 交通", "Ich fahre mit dem Bus.", "写你怎么去上课。"),
      day("电话用语", ["anrufen", "Telefon", "Nummer", "sprechen", "Moment"], "können", "Können Sie bitte langsam sprechen?", "写 4 个电话句子。"),
      day("预约", ["Termin", "heute", "morgen", "frei", "passen"], "müssen", "Ich muss einen Termin machen.", "写一条预约短信。"),
      day("地址", ["Adresse", "Hausnummer", "Postleitzahl", "wohnen", "suchen"], "介词 in/an", "Ich wohne in der Nähe vom Bahnhof.", "写你的地址表达。"),
      day("第 4 周复习", ["wo", "links", "Bus", "Termin", "Adresse"], "W-Fragen 综合", "Wann haben Sie Zeit?", "做一组问路和预约口语。")
    ]
  },
  {
    title: "第 5 周",
    focus: ["住房", "家具", "身体", "看医生", "天气"],
    days: [
      day("房间", ["Wohnung", "Zimmer", "Küche", "Bad", "Balkon"], "mein/meine", "Meine Wohnung hat zwei Zimmer.", "介绍你的房子。"),
      day("家具", ["Tisch", "Stuhl", "Bett", "Schrank", "Lampe"], "形容词基础", "Das Zimmer ist klein, aber schön.", "描述一个房间。"),
      day("身体", ["Kopf", "Bauch", "Hand", "Fuß", "Rücken"], "haben + 疼痛", "Ich habe Kopfschmerzen.", "写 5 个身体不舒服句子。"),
      day("看医生", ["Arzt", "krank", "Termin", "Rezept", "Tablette"], "brauchen", "Ich brauche einen Termin beim Arzt.", "写一条请假/看医生短信。"),
      day("天气", ["warm", "kalt", "sonnig", "regnen", "Wind"], "es ist ...", "Heute ist es warm und sonnig.", "写 5 天天气句子。"),
      day("过去表达", ["gelernt", "gemacht", "gekauft", "gegessen", "getrunken"], "Perfekt 入门", "Ich habe heute Deutsch gelernt.", "写今天做了什么。"),
      day("第 5 周复习", ["Wohnung", "krank", "Wetter", "habe", "brauche"], "haben 综合", "Ich habe Bauchschmerzen und brauche Hilfe.", "写一封简单说明邮件。")
    ]
  },
  {
    title: "第 6 周",
    focus: ["听力题", "阅读题", "短信写作", "口语自介", "错题复习"],
    days: [
      day("听力抓关键词", ["Name", "Zeit", "Ort", "Preis", "Nummer"], "听力关键词", "Der Termin ist am Montag um zehn Uhr.", "听一段 A1 对话后写关键词。"),
      day("阅读广告", ["Anzeige", "geöffnet", "geschlossen", "Angebot", "Adresse"], "读公告信息", "Die Apotheke ist heute geschlossen.", "写 3 个广告信息句。"),
      day("短信写作", ["Liebe", "leider", "kommen", "treffen", "Grüße"], "邮件格式", "Liebe Anna, ich kann heute nicht kommen.", "写一条不能赴约短信。"),
      day("口语自介", ["Name", "Alter", "Land", "Wohnort", "Hobby"], "自我介绍顺序", "Mein Name ist Chris. Ich bin ... Jahre alt.", "录音练习自我介绍。"),
      day("拼写和号码", ["buchstabieren", "A wie Anton", "Telefon", "null", "acht"], "拼写名字", "Können Sie das bitte buchstabieren?", "练习拼写姓名和电话。"),
      day("提问卡片", ["Kaffee", "Familie", "Beruf", "Freizeit", "Deutsch"], "提问和回答", "Trinken Sie gern Kaffee?", "写 10 个口语问句。"),
      day("第 6 周复习", ["hören", "lesen", "schreiben", "sprechen", "prüfen"], "考试流程", "Ich lerne für die A1-Prüfung.", "做一套小模拟。")
    ]
  },
  {
    title: "第 7 周",
    focus: ["模拟考试", "动词变位", "冠词", "Akkusativ", "高频问题"],
    days: [
      day("模拟听力", ["Bahnhof", "Uhr", "Euro", "morgen", "Telefon"], "听力选择题", "Der Zug fährt um acht Uhr.", "做 15 分钟听力题。"),
      day("模拟阅读", ["E-Mail", "Formular", "Anzeige", "richtig", "falsch"], "判断对错", "Bitte füllen Sie das Formular aus.", "做 15 分钟阅读题。"),
      day("写作模板", ["krank", "Termin", "morgen", "leider", "danke"], "短信三段式", "Ich bin krank. Können wir morgen treffen?", "背 2 个写作模板。"),
      day("口语第一部分", ["Name", "Alter", "Land", "Sprache", "Beruf"], "自我介绍", "Ich komme aus China und arbeite als ...", "完整说 3 遍自我介绍。"),
      day("口语第二部分", ["fragen", "antworten", "bitte", "gern", "natürlich"], "提问卡", "Haben Sie am Samstag Zeit?", "做 10 轮问答。"),
      day("语法错题", ["sein", "haben", "möchten", "können", "müssen"], "动词变位复习", "Ich möchte Deutsch lernen.", "整理 10 个错句。"),
      day("第 7 周复习", ["der", "die", "das", "ein", "keine"], "冠词和第四格", "Ich kaufe einen Kaffee und eine Tasche.", "做一套完整模拟。")
    ]
  },
  {
    title: "第 8 周",
    focus: ["完整模拟", "听力冲刺", "写作模板", "口语流程", "轻复习"],
    days: [
      day("完整模拟 1", ["Prüfung", "Teil", "Antwort", "Frage", "Zeit"], "考试时间控制", "Ich bin bereit für die Prüfung.", "完成一套模拟题。"),
      day("听力冲刺", ["wann", "wo", "wer", "wie viel", "welche"], "抓问题词", "Wie viel kostet die Fahrkarte?", "集中练听力错题。"),
      day("阅读冲刺", ["geöffnet", "Termin", "Abfahrt", "Ankunft", "Eingang"], "扫描信息", "Der Kurs beginnt um neun Uhr.", "集中练阅读错题。"),
      day("写作冲刺", ["Liebe", "Hallo", "leider", "können", "Viele Grüße"], "模板替换", "Können wir am Freitag treffen?", "写 3 条短信。"),
      day("口语冲刺", ["bitte", "noch einmal", "langsam", "danke", "gern"], "考场常用句", "Können Sie das bitte wiederholen?", "完整练口语流程。"),
      day("错题复习", ["Fehler", "richtig", "wiederholen", "merken", "fertig"], "最后查漏", "Ich wiederhole heute meine Fehler.", "只复习错题和模板。"),
      day("轻复习", ["ruhig", "bereit", "einfach", "gut", "morgen"], "轻量复盘", "Morgen mache ich die A1-Prüfung.", "读一遍所有自我介绍。")
    ]
  }
];

function day(theme, vocab, grammar, sentence, writing) {
  return { theme, vocab, grammar, sentence, writing };
}

const wordNotes = {
  "A B C": ["啊 贝 策", "字母 A B C"],
  A: ["啊", "字母 A"],
  B: ["贝", "字母 B"],
  C: ["策", "字母 C"],
  D: ["得", "字母 D"],
  E: ["诶", "字母 E"],
  F: ["艾夫", "字母 F"],
  G: ["给", "字母 G"],
  H: ["哈", "字母 H"],
  I: ["伊", "字母 I"],
  J: ["约特", "字母 J"],
  K: ["卡", "字母 K"],
  L: ["艾尔", "字母 L"],
  M: ["艾姆", "字母 M"],
  N: ["艾恩", "字母 N"],
  O: ["欧", "字母 O"],
  P: ["佩", "字母 P"],
  Q: ["库", "字母 Q"],
  R: ["艾尔", "字母 R"],
  S: ["艾斯", "字母 S"],
  T: ["忒", "字母 T"],
  U: ["乌", "字母 U"],
  V: ["福", "字母 V"],
  W: ["维", "字母 W"],
  X: ["伊克斯", "字母 X"],
  Y: ["于普西隆", "字母 Y"],
  Z: ["策特", "字母 Z"],
  "ä": ["诶", "变音字母 ä"],
  "ö": ["呃", "变音字母 ö"],
  "ü": ["玉", "变音字母 ü"],
  "ä ö ü": ["诶 呃 玉", "德语变音字母"],
  "ß": ["艾斯 策特", "德语特殊字母"],
  Hallo: ["哈喽", "你好"],
  "Tschüss": ["去斯", "再见"],
  "Guten Morgen": ["古藤 莫根", "早上好"],
  "Guten Tag": ["古藤 塔克", "你好/日安"],
  Danke: ["当克", "谢谢"],
  Bitte: ["比特", "请/不客气"],
  Entschuldigung: ["恩特舒迪贡", "对不起/打扰一下"],
  Name: ["那么", "名字"],
  "heißen": ["海森", "叫做"],
  kommen: ["考门", "来"],
  wohnen: ["沃嫩", "居住"],
  lernen: ["莱尔嫩", "学习"],
  China: ["希纳", "中国"],
  Deutschland: ["多伊奇兰特", "德国"],
  Englisch: ["英格利施", "英语"],
  Deutsch: ["多伊奇", "德语/德国的"],
  Chinesisch: ["希内西施", "中文"],
  Student: ["施图登特", "学生"],
  Lehrer: ["莱勒", "老师"],
  Arzt: ["阿尔茨特", "医生"],
  Ingenieur: ["因热尼厄尔", "工程师"],
  "Verkäufer": ["费尔 koy 佛", "销售员"],
  eins: ["艾因斯", "一"],
  zwei: ["茨外", "二"],
  zehn: ["岑", "十"],
  zwanzig: ["茨万齐希", "二十"],
  hundert: ["洪德特", "一百"],
  ich: ["伊希", "我"],
  Sie: ["兹", "您/他们"],
  woher: ["沃黑尔", "从哪里"],
  wo: ["沃", "哪里"],
  wie: ["维", "怎样/如何"],
  Mutter: ["穆特", "妈妈"],
  Vater: ["法特", "爸爸"],
  Bruder: ["布鲁德", "兄弟"],
  Schwester: ["施韦斯特", "姐妹"],
  Familie: ["法米利耶", "家庭"],
  Montag: ["蒙塔克", "星期一"],
  Dienstag: ["丁斯塔克", "星期二"],
  Januar: ["亚努阿尔", "一月"],
  Mai: ["麦", "五月"],
  heute: ["霍伊特", "今天"],
  Uhr: ["乌尔", "点钟"],
  halb: ["哈尔布", "半"],
  Viertel: ["菲尔特尔", "一刻钟"],
  morgen: ["莫根", "明天/早晨"],
  Abend: ["阿本特", "晚上"],
  aufstehen: ["奥夫施特恩", "起床"],
  arbeiten: ["阿拜腾", "工作"],
  essen: ["艾森", "吃"],
  schlafen: ["施拉芬", "睡觉"],
  lesen: ["莱森", "阅读"],
  kochen: ["科亨", "做饭"],
  Musik: ["穆 zik", "音乐"],
  Sport: ["施波特", "运动"],
  gern: ["盖恩", "喜欢"],
  Freund: ["弗罗因特", "朋友"],
  treffen: ["特雷芬", "见面"],
  Kino: ["基诺", "电影院"],
  Zeit: ["蔡特", "时间"],
  haben: ["哈本", "有"],
  am: ["阿姆", "在某天"],
  um: ["乌姆", "在某时"],
  Brot: ["布罗特", "面包"],
  Reis: ["赖斯", "米饭"],
  Fisch: ["菲施", "鱼"],
  "Gemüse": ["格缪泽", "蔬菜"],
  Obst: ["奥布斯特", "水果"],
  Wasser: ["瓦瑟", "水"],
  Kaffee: ["卡费", "咖啡"],
  Tee: ["忒", "茶"],
  Milch: ["米尔希", "牛奶"],
  Saft: ["扎夫特", "果汁"],
  Speisekarte: ["施派泽卡特", "菜单"],
  Rechnung: ["雷希农", "账单"],
  nehmen: ["内门", "拿/要"],
  bezahlen: ["贝察伦", "付款"],
  Flasche: ["弗拉舍", "瓶"],
  Kilo: ["基洛", "公斤"],
  Packung: ["帕孔", "包"],
  kaufen: ["考芬", "买"],
  brauchen: ["布劳亨", "需要"],
  Euro: ["欧罗", "欧元"],
  Cent: ["岑特", "分"],
  kosten: ["科斯腾", "花费"],
  teuer: ["托伊尔", "贵"],
  billig: ["比利希", "便宜"],
  Jacke: ["雅克", "夹克"],
  Hose: ["霍泽", "裤子"],
  Schuhe: ["舒厄", "鞋"],
  rot: ["罗特", "红色"],
  schwarz: ["施瓦茨", "黑色"],
  Bahnhof: ["班霍夫", "火车站"],
  Apotheke: ["阿波特克", "药店"],
  Schule: ["舒勒", "学校"],
  Bank: ["邦克", "银行"],
  Supermarkt: ["祖帕马克特", "超市"],
  links: ["林克斯", "左边"],
  rechts: ["雷希茨", "右边"],
  geradeaus: ["格拉德奥斯", "直走"],
  "Straße": ["施特拉瑟", "街道"],
  Platz: ["普拉茨", "广场"],
  Bus: ["布斯", "公交车"],
  Bahn: ["巴恩", "火车/轨道交通"],
  Taxi: ["塔克西", "出租车"],
  Auto: ["奥托", "汽车"],
  fahren: ["法伦", "乘坐/开车"],
  anrufen: ["安鲁芬", "打电话"],
  Telefon: ["特勒丰", "电话"],
  Nummer: ["努默", "号码"],
  sprechen: ["施普雷亨", "说"],
  Moment: ["莫门特", "片刻"],
  Termin: ["特尔民", "预约"],
  frei: ["弗赖", "有空/免费的"],
  passen: ["帕森", "合适"],
  Adresse: ["阿德雷瑟", "地址"],
  Hausnummer: ["豪斯努默", "门牌号"],
  Postleitzahl: ["波斯特莱特察尔", "邮编"],
  suchen: ["祖亨", "寻找"],
  Wohnung: ["沃农", "公寓/住房"],
  Zimmer: ["齐默", "房间"],
  "Küche": ["屈赫", "厨房"],
  Bad: ["巴特", "浴室"],
  Balkon: ["巴尔孔", "阳台"],
  Tisch: ["提施", "桌子"],
  Stuhl: ["施图尔", "椅子"],
  Bett: ["贝特", "床"],
  Schrank: ["施朗克", "柜子"],
  Lampe: ["兰佩", "灯"],
  Kopf: ["科普夫", "头"],
  Bauch: ["包赫", "肚子"],
  Hand: ["汉特", "手"],
  Fuß: ["富斯", "脚"],
  "Rücken": ["吕肯", "背"],
  krank: ["克朗克", "生病"],
  Rezept: ["雷策普特", "处方"],
  Tablette: ["塔布莱特", "药片"],
  warm: ["瓦姆", "暖和"],
  kalt: ["卡尔特", "冷"],
  sonnig: ["佐尼希", "晴朗"],
  regnen: ["雷格嫩", "下雨"],
  Wind: ["文特", "风"],
  gelernt: ["格莱尔恩特", "学过了"],
  gemacht: ["格马赫特", "做过了"],
  gekauft: ["格考夫特", "买过了"],
  gegessen: ["格艾森", "吃过了"],
  getrunken: ["格特рун肯", "喝过了"],
  Wetter: ["韦特", "天气"],
  Preis: ["普赖斯", "价格"],
  Ort: ["奥特", "地点"],
  Anzeige: ["安 tsai 格", "广告/通知"],
  "geöffnet": ["格厄夫内特", "开门"],
  geschlossen: ["格施洛森", "关门"],
  Angebot: ["安格博特", "优惠/提供"],
  Liebe: ["利贝", "亲爱的"],
  leider: ["莱德", "遗憾地"],
  "Grüße": ["格吕瑟", "问候"],
  Alter: ["阿尔特", "年龄"],
  Land: ["兰特", "国家"],
  Wohnort: ["沃恩奥特", "居住地"],
  Hobby: ["霍比", "爱好"],
  buchstabieren: ["布赫施塔比伦", "拼写"],
  null: ["努尔", "零"],
  acht: ["阿赫特", "八"],
  Beruf: ["贝鲁夫", "职业"],
  Freizeit: ["弗赖蔡特", "空闲时间"],
  "hören": ["赫伦", "听"],
  schreiben: ["施赖本", "写"],
  "prüfen": ["普吕芬", "考试/检查"],
  Formular: ["福尔穆拉尔", "表格"],
  richtig: ["里希提希", "正确"],
  falsch: ["法尔施", "错误"],
  danke: ["当克", "谢谢"],
  Sprache: ["施普拉赫", "语言"],
  fragen: ["弗拉根", "提问"],
  antworten: ["安特沃滕", "回答"],
  "natürlich": ["纳图利希", "当然"],
  sein: ["宰因", "是"],
  "möchten": ["默希腾", "想要"],
  "können": ["克嫩", "能够"],
  "müssen": ["米森", "必须"],
  der: ["德尔", "阳性冠词"],
  die: ["迪", "阴性/复数冠词"],
  das: ["达斯", "中性冠词"],
  ein: ["艾因", "一个"],
  keine: ["凯内", "没有"],
  "Prüfung": ["普吕丰", "考试"],
  Teil: ["泰尔", "部分"],
  Antwort: ["安特沃特", "答案"],
  Frage: ["弗拉格", "问题"],
  wann: ["万", "什么时候"],
  wer: ["维尔", "谁"],
  welche: ["韦尔赫", "哪个"],
  Abfahrt: ["阿普法特", "出发"],
  Ankunft: ["安昆夫特", "到达"],
  Eingang: ["艾因冈", "入口"],
  nochmal: ["诺赫马尔", "再一次"],
  langsam: ["朗 zam", "慢慢地"],
  Fehler: ["费勒", "错误"],
  wiederholen: ["维德霍伦", "重复"],
  merken: ["梅肯", "记住"],
  fertig: ["费尔提希", "完成"],
  ruhig: ["鲁伊希", "平静的"],
  bereit: ["贝赖特", "准备好的"],
  einfach: ["艾因法赫", "简单"],
  gut: ["古特", "好"],
  bin: ["宾", "是"],
  ist: ["伊斯特", "是"],
  und: ["乌ント", "和"],
  aus: ["奥斯", "来自"],
  in: ["因", "在"],
  einen: ["艾嫩", "一个"],
  eine: ["艾讷", "一个"],
  meine: ["麦讷", "我的"],
  Mein: ["麦因", "我的"],
  Meine: ["麦讷", "我的"],
  Telefonnummer: ["特勒丰努默", "电话号码"],
  fünf: ["芬夫", "五"],
  Kurs: ["库尔斯", "课程"],
  Zug: ["楚克", "火车"],
  Fahrkarte: ["法尔卡特", "车票"],
  Jahre: ["亚勒", "年/岁"],
  alt: ["阿尔特", "岁"],
  kann: ["坎", "能够"],
  nicht: ["尼希特", "不"],
  das: ["达斯", "这个/那"],
  bitte: ["比特", "请"],
  heute: ["霍伊特", "今天"],
  vom: ["福姆", "从/的"],
  beim: ["拜姆", "在……那里"],
  als: ["阿尔斯", "作为"],
  Samstag: ["扎姆斯塔克", "星期六"],
  Freitag: ["弗赖塔克", "星期五"],
  Morgen: ["莫根", "明天/早晨"],
  "A1-Prüfung": ["阿一 普吕丰", "A1 考试"],
  Anna: ["安娜", "人名 Anna"],
  Bauchschmerzen: ["包赫施梅尔岑", "肚子疼"],
  Chris: ["克里斯", "人名 Chris"],
  Deutschkurs: ["多伊奇库尔斯", "德语课"],
  Dubai: ["杜拜", "迪拜"],
  Gehen: ["格恩", "请走/走"],
  Guten: ["古藤", "好的/用于问候"],
  Hast: ["哈斯特", "你有"],
  Hilfe: ["希尔费", "帮助"],
  Kopfschmerzen: ["科普夫施梅尔岑", "头疼"],
  Lehrerin: ["莱勒林", "女老师"],
  "Nähe": ["内厄", "附近"],
  Suppe: ["祖佩", "汤"],
  Tag: ["塔克", "天/日"],
  Tasche: ["塔舍", "包"],
  Trinken: ["特林肯", "喝"],
  Was: ["瓦斯", "什么"],
  aber: ["阿伯", "但是"],
  arbeite: ["阿拜特", "我工作"],
  auf: ["奥夫", "起来/在……上"],
  beginnt: ["贝金特", "开始"],
  brauche: ["布劳赫", "我需要"],
  dann: ["丹", "然后"],
  dem: ["德姆", "给/在该名词前"],
  du: ["杜", "你"],
  es: ["艾斯", "它"],
  esse: ["艾瑟", "我吃"],
  fahre: ["法勒", "我乘坐/开"],
  "früh": ["弗吕", "早"],
  "fährt": ["费尔特", "行驶/出发"],
  "füllen": ["菲伦", "填写"],
  "für": ["菲尔", "为了"],
  habe: ["哈贝", "我有"],
  hat: ["哈特", "有"],
  "heiße": ["海瑟", "我叫"],
  kaufe: ["考费", "我买"],
  klein: ["克莱因", "小"],
  koche: ["科赫", "我做饭"],
  komme: ["考么", "我来/来自"],
  kostet: ["科斯特特", "花费"],
  lerne: ["莱尔讷", "我学习"],
  lese: ["莱泽", "我阅读"],
  mache: ["马赫", "我做"],
  machen: ["马亨", "做"],
  mit: ["米特", "和/乘坐"],
  muss: ["穆斯", "必须"],
  "möchte": ["默希特", "想要"],
  nehme: ["内默", "我要/拿"],
  neun: ["诺因", "九"],
  schwarze: ["施瓦茨厄", "黑色的"],
  "schön": ["舍恩", "漂亮"],
  sieben: ["吉本", "七"],
  spreche: ["施普雷赫", "我说"],
  stehe: ["施特厄", "我站/起"],
  viel: ["菲尔", "多少/很多"],
  wiederhole: ["维德霍勒", "我重复"],
  wir: ["维尔", "我们"],
  wohne: ["沃讷", "我居住"]
};

const sentenceTranslations = {
  "Hallo, ich heiße Chris.": "你好，我叫 Chris。",
  "Guten Tag, wie heißen Sie?": "您好，您叫什么名字？",
  "Ich komme aus China und wohne in Dubai.": "我来自中国，住在迪拜。",
  "Ich spreche Chinesisch und Englisch.": "我说中文和英语。",
  "Ich bin Student. Meine Mutter ist Lehrerin.": "我是学生。我的妈妈是老师。",
  "Meine Telefonnummer ist null fünf fünf.": "我的电话号码是 055。",
  "Woher kommen Sie? Ich komme aus China.": "您来自哪里？我来自中国。",
  "Ich habe einen Bruder und eine Schwester.": "我有一个兄弟和一个姐妹。",
  "Am Montag habe ich Deutschkurs.": "星期一我有德语课。",
  "Ich stehe um sieben Uhr auf.": "我七点起床。",
  "Ich stehe früh auf und lerne Deutsch.": "我早起并学习德语。",
  "Ich lese gern. Ich koche nicht gern.": "我喜欢阅读。我不喜欢做饭。",
  "Hast du morgen Zeit?": "你明天有时间吗？",
  "Am Abend lerne ich Deutsch.": "晚上我学习德语。",
  "Ich esse gern Reis und Gemüse.": "我喜欢吃米饭和蔬菜。",
  "Ich möchte einen Kaffee, bitte.": "我想要一杯咖啡，谢谢。",
  "Ich nehme eine Suppe.": "我要一份汤。",
  "Ich brauche eine Flasche Wasser.": "我需要一瓶水。",
  "Was kostet das? Das kostet zehn Euro.": "这个多少钱？这个十欧元。",
  "Ich habe keine schwarze Jacke.": "我没有黑色夹克。",
  "Ich möchte bezahlen.": "我想付款。",
  "Wo ist der Bahnhof?": "火车站在哪里？",
  "Gehen Sie geradeaus und dann links.": "请直走，然后向左。",
  "Ich fahre mit dem Bus.": "我坐公交车。",
  "Können Sie bitte langsam sprechen?": "您可以说慢一点吗？",
  "Ich muss einen Termin machen.": "我必须预约。",
  "Ich wohne in der Nähe vom Bahnhof.": "我住在火车站附近。",
  "Wann haben Sie Zeit?": "您什么时候有时间？",
  "Meine Wohnung hat zwei Zimmer.": "我的公寓有两个房间。",
  "Das Zimmer ist klein, aber schön.": "这个房间小，但是漂亮。",
  "Ich habe Kopfschmerzen.": "我头疼。",
  "Ich brauche einen Termin beim Arzt.": "我需要一个医生预约。",
  "Heute ist es warm und sonnig.": "今天天气暖和并且晴朗。",
  "Ich habe heute Deutsch gelernt.": "我今天学了德语。",
  "Ich habe Bauchschmerzen und brauche Hilfe.": "我肚子疼，需要帮助。",
  "Der Termin ist am Montag um zehn Uhr.": "预约在星期一十点。",
  "Die Apotheke ist heute geschlossen.": "药店今天关门。",
  "Liebe Anna, ich kann heute nicht kommen.": "亲爱的 Anna，我今天不能来。",
  "Mein Name ist Chris. Ich bin ... Jahre alt.": "我的名字是 Chris。我……岁。",
  "Können Sie das bitte buchstabieren?": "您可以把这个拼写一下吗？",
  "Trinken Sie gern Kaffee?": "您喜欢喝咖啡吗？",
  "Ich lerne für die A1-Prüfung.": "我正在为 A1 考试学习。",
  "Der Zug fährt um acht Uhr.": "火车八点出发。",
  "Bitte füllen Sie das Formular aus.": "请填写这个表格。",
  "Ich bin krank. Können wir morgen treffen?": "我生病了。我们可以明天见面吗？",
  "Ich komme aus China und arbeite als ...": "我来自中国，职业是……",
  "Haben Sie am Samstag Zeit?": "您星期六有时间吗？",
  "Ich möchte Deutsch lernen.": "我想学习德语。",
  "Ich kaufe einen Kaffee und eine Tasche.": "我买一杯咖啡和一个包。",
  "Ich bin bereit für die Prüfung.": "我为考试准备好了。",
  "Wie viel kostet die Fahrkarte?": "车票多少钱？",
  "Der Kurs beginnt um neun Uhr.": "课程九点开始。",
  "Können wir am Freitag treffen?": "我们可以星期五见面吗？",
  "Können Sie das bitte wiederholen?": "您可以重复一下吗？",
  "Ich wiederhole heute meine Fehler.": "我今天复习我的错误。",
  "Morgen mache ich die A1-Prüfung.": "明天我参加 A1 考试。"
};

function noteForWord(word) {
  return wordNotes[word] || wordNotes[word.toLowerCase()] || ["跟音频读", "请结合音频记忆"];
}

function sentencePronunciation(sentence) {
  return sentence
    .replace(/[?.!,]/g, "")
    .split(/\s+/)
    .map((part) => {
      const note = wordNotes[part] || wordNotes[part.toLowerCase()];
      return note ? note[0] : part;
    })
    .join(" ");
}

const chefTraining = [
  {
    title: "厨房基础",
    words: [
      ["die Küche", "迪 屈赫", "厨房"],
      ["der Herd", "德尔 赫尔特", "炉灶"],
      ["der Topf", "德尔 托普夫", "锅"],
      ["die Pfanne", "迪 普法讷", "平底锅"],
      ["das Messer", "达斯 梅瑟", "刀"],
      ["das Brett", "达斯 布雷特", "砧板"]
    ],
    phrases: [
      ["Wo ist das Messer?", "沃 伊斯特 达斯 梅瑟", "刀在哪里？"],
      ["Ich brauche einen Topf.", "伊希 布劳赫 艾嫩 托普夫", "我需要一个锅。"]
    ]
  },
  {
    title: "拉面菜单",
    words: [
      ["die Ramen", "迪 拉门", "拉面"],
      ["die Nudeln", "迪 努德伦", "面条"],
      ["die Brühe", "迪 布吕厄", "汤底/高汤"],
      ["die Misobrühe", "迪 米索布吕厄", "味噌汤底"],
      ["die Sojasoße", "迪 佐亚佐瑟", "酱油"],
      ["scharf", "沙尔夫", "辣"]
    ],
    phrases: [
      ["Welche Ramen möchten Sie?", "韦尔赫 拉门 默希腾 兹", "您想要哪种拉面？"],
      ["Die Brühe ist sehr heiß.", "迪 布吕厄 伊斯特 泽尔 海斯", "汤很烫。"]
    ]
  },
  {
    title: "配料",
    words: [
      ["das Ei", "达斯 艾", "鸡蛋"],
      ["das Fleisch", "达斯 弗莱施", "肉"],
      ["das Hähnchen", "达斯 亨兴", "鸡肉"],
      ["der Tofu", "德尔 豆腐", "豆腐"],
      ["der Mais", "德尔 麦斯", "玉米"],
      ["die Frühlingszwiebeln", "迪 弗吕林斯茨维贝伦", "葱"]
    ],
    phrases: [
      ["Mit Ei oder ohne Ei?", "米特 艾 奥德 奥讷 艾", "要鸡蛋还是不要鸡蛋？"],
      ["Bitte mehr Frühlingszwiebeln.", "比特 梅尔 弗吕林斯茨维贝伦", "请多加葱。"]
    ]
  },
  {
    title: "备餐动作",
    words: [
      ["schneiden", "施奈登", "切"],
      ["kochen", "科亨", "煮"],
      ["braten", "布拉腾", "煎/炒"],
      ["würzen", "维尔岑", "调味"],
      ["probieren", "普罗比伦", "尝"],
      ["vorbereiten", "福尔贝赖腾", "准备"]
    ],
    phrases: [
      ["Bitte die Nudeln kochen.", "比特 迪 努德伦 科亨", "请煮面。"],
      ["Ich bereite die Brühe vor.", "伊希 贝赖特 迪 布吕厄 福尔", "我准备汤底。"]
    ]
  },
  {
    title: "出餐沟通",
    words: [
      ["die Bestellung", "迪 贝施特隆", "订单"],
      ["fertig", "费尔提希", "完成"],
      ["sofort", "佐福特", "马上"],
      ["zum Mitnehmen", "楚姆 米特内门", "外带"],
      ["hier essen", "希尔 艾森", "堂食"],
      ["der Tisch", "德尔 提施", "桌子"]
    ],
    phrases: [
      ["Bestellung für Tisch zwei ist fertig.", "贝施特隆 菲尔 提施 茨外 伊斯特 费尔提希", "二号桌的订单好了。"],
      ["Ist das zum Mitnehmen?", "伊斯特 达斯 楚姆 米特内门", "这是外带吗？"]
    ]
  },
  {
    title: "客人口味",
    words: [
      ["mild", "米尔特", "微辣/温和"],
      ["scharf", "沙尔夫", "辣"],
      ["sehr scharf", "泽尔 沙尔夫", "很辣"],
      ["salzig", "扎尔齐希", "咸"],
      ["weniger Salz", "维尼格 扎尔茨", "少盐"],
      ["extra Soße", "艾克斯特拉 佐瑟", "加酱"]
    ],
    phrases: [
      ["Möchten Sie es scharf?", "默希腾 兹 艾斯 沙尔夫", "您要辣的吗？"],
      ["Bitte weniger Salz.", "比特 维尼格 扎尔茨", "请少盐。"]
    ]
  },
  {
    title: "过敏和禁忌",
    words: [
      ["die Allergie", "迪 阿勒基", "过敏"],
      ["Erdnüsse", "艾尔德尼瑟", "花生"],
      ["Sesam", "泽zam", "芝麻"],
      ["Gluten", "格鲁滕", "麸质"],
      ["vegetarisch", "维格塔里施", "素食"],
      ["ohne Fleisch", "奥讷 弗莱施", "不要肉"]
    ],
    phrases: [
      ["Haben Sie eine Allergie?", "哈本 兹 艾讷 阿勒基", "您有过敏吗？"],
      ["Das Gericht enthält Sesam.", "达斯 格里希特 恩特海尔特 泽zam", "这道菜含芝麻。"]
    ]
  },
  {
    title: "同事协作",
    words: [
      ["schnell", "施内尔", "快"],
      ["langsam", "朗zam", "慢"],
      ["sauber", "早伯", "干净"],
      ["spülen", "施皮伦", "洗/冲洗"],
      ["aufräumen", "奥夫罗伊门", "收拾"],
      ["Pause", "包泽", "休息"]
    ],
    phrases: [
      ["Kannst du bitte helfen?", "坎斯特 杜 比特 黑尔芬", "你能帮忙吗？"],
      ["Ich mache jetzt Pause.", "伊希 马赫 耶茨特 包泽", "我现在休息。"]
    ]
  },
  {
    title: "Yomien 午餐菜单",
    words: [
      ["die Mittagskarte", "迪 米塔克斯卡特", "午餐菜单"],
      ["Mo-Fr", "蒙塔克 bis 弗赖塔克", "周一到周五"],
      ["von 11 bis 16 Uhr", "丰 艾尔夫 bis 泽希岑 乌尔", "从 11 点到 16 点"],
      ["die Speisekarte", "迪 施派泽卡特", "菜单"],
      ["inklusive MwSt.", "因克鲁西弗 额姆韦斯特", "含税"],
      ["der Preis", "德尔 普赖斯", "价格"]
    ],
    phrases: [
      ["Die Mittagskarte gilt von Montag bis Freitag.", "迪 米塔克斯卡特 gilt 丰 蒙塔克 bis 弗赖塔克", "午餐菜单周一到周五有效。"],
      ["Alle Preise sind in Euro inklusive MwSt.", "阿勒 普赖泽 辛特 因 欧罗 因克鲁西弗 额姆韦斯特", "所有价格为欧元并含税。"]
    ]
  },
  {
    title: "La Mien 手工面",
    words: [
      ["La Mien", "拉 米恩", "拉面/手工面"],
      ["fliegende Nudeln", "弗利根德 努德伦", "飞面/手工甩面"],
      ["Weizenmehl", "外岑梅尔", "小麦粉"],
      ["à la minute", "阿 拉 米纽特", "现做"],
      ["Pakchoi", "帕克崔", "小白菜"],
      ["Koriander", "科里安德", "香菜"]
    ],
    phrases: [
      ["La Mien sind frische Nudeln aus Weizenmehl.", "拉 米恩 辛特 弗里舍 努德伦 奥斯 外岑梅尔", "La Mien 是小麦粉做的新鲜面条。"],
      ["Die Nudeln werden à la minute gemacht.", "迪 努德伦 韦尔登 阿 拉 米纽特 格马赫特", "面条是现做的。"]
    ]
  },
  {
    title: "La Mien 选项",
    words: [
      ["mit Gemüse", "米特 格缪泽", "配蔬菜"],
      ["mit Huhn", "米特 胡恩", "配鸡肉"],
      ["mit Rind", "米特 林特", "配牛肉"],
      ["mit Ente", "米特 恩特", "配鸭肉"],
      ["mit Meeresfrüchten", "米特 梅雷斯弗吕希滕", "配海鲜"],
      ["Kokos-Curry", "科科斯 咖喱", "椰奶咖喱"]
    ],
    phrases: [
      ["Möchten Sie La Mien mit Huhn oder mit Rind?", "默希腾 兹 拉米恩 米特 胡恩 奥德 米特 林特", "您要鸡肉拉面还是牛肉拉面？"],
      ["La Mien in Kokos-Curry ist etwas scharf.", "拉米恩 因 科科斯咖喱 伊斯特 艾特瓦斯 沙尔夫", "椰奶咖喱拉面有一点辣。"]
    ]
  },
  {
    title: "Pho 越南汤粉",
    words: [
      ["Pho", "佛", "越南河粉"],
      ["Reisbandnudelsuppe", "赖斯班特努德尔祖佩", "宽米粉汤"],
      ["Sojasprossen", "佐亚施普罗森", "豆芽"],
      ["Limette", "利梅特", "青柠"],
      ["Einlage nach Wahl", "艾因拉格 纳赫 瓦尔", "配料自选"],
      ["Hühnersuppe", "胡纳祖佩", "鸡汤"]
    ],
    phrases: [
      ["Pho wird mit Sojasprossen, Koriander und Limette serviert.", "佛 韦尔特 米特 佐亚施普罗森 科里安德 乌ント 利梅特 泽维尔特", "Pho 配豆芽、香菜和青柠。"],
      ["Alle Pho-Suppen sind auf Wunsch vegan möglich.", "阿勒 佛祖彭 辛特 奥夫 文施 维根 默克利希", "所有 Pho 汤可按要求做成纯素。"]
    ]
  },
  {
    title: "Udon 和云吞汤",
    words: [
      ["Udon-Nudelsuppe", "乌冬 努德尔祖佩", "乌冬汤面"],
      ["Wantansuppe", "万坦祖佩", "云吞汤"],
      ["10 Stück Wantan", "岑 施蒂克 万坦", "10 个云吞"],
      ["Schrimpsnudeln", "施林普斯努德伦", "虾面"],
      ["Hong Kong Style", "洪孔 施泰尔", "港式"],
      ["extra Kräuter", "艾克斯特拉 克罗伊特", "加香草"]
    ],
    phrases: [
      ["Die Wantansuppe ist nach Hong Kong Style.", "迪 万坦祖佩 伊斯特 纳赫 洪孔施泰尔", "云吞汤是港式的。"],
      ["Extra Kräuter kosten einen Aufpreis.", "艾克斯特拉 克罗伊特 科斯滕 艾嫩 奥夫普赖斯", "额外香草需要加价。"]
    ]
  },
  {
    title: "主菜口味",
    words: [
      ["Chili-Huhn", "奇利 胡恩", "辣鸡肉"],
      ["Chili-Beef", "奇利 比夫", "辣牛肉"],
      ["Thaibasilikum", "泰 巴西利库姆", "泰国罗勒"],
      ["Ingwer", "英瓦", "姜"],
      ["Zitronengras", "齐特罗嫩格拉斯", "香茅"],
      ["Fischsauce", "菲施佐瑟", "鱼露"]
    ],
    phrases: [
      ["Dieses Gericht ist mit Chili und Thaibasilikum.", "迪泽斯 格里希特 伊斯特 米特 奇利 乌ント 泰巴西利库姆", "这道菜有辣椒和泰国罗勒。"],
      ["Das Huhn mit Zitronengras enthält Fischsauce.", "达斯 胡恩 米特 齐特罗嫩格拉斯 恩特海尔特 菲施佐瑟", "香茅鸡肉含鱼露。"]
    ]
  },
  {
    title: "Bulgogi 和 Teriyaki",
    words: [
      ["Bulgogi", "布尔戈吉", "韩式烤肉"],
      ["koreanisches Rindfleisch", "科瑞阿尼舍斯 林特弗莱施", "韩式牛肉"],
      ["koreanisches Hühnerfleisch", "科瑞阿尼舍斯 胡纳弗莱施", "韩式鸡肉"],
      ["Black Pepper Beef", "布莱克 佩帕 比夫", "黑椒牛肉"],
      ["Kimchi Beef", "金奇 比夫", "泡菜牛肉"],
      ["Teriyakisauce", "特里亚基佐瑟", "照烧酱"]
    ],
    phrases: [
      ["Bulgogi ist koreanisch mariniertes Fleisch.", "布尔戈吉 伊斯特 科瑞阿尼施 玛丽尼尔特斯 弗莱施", "Bulgogi 是韩式腌肉。"],
      ["Lachs mit Teriyakisauce enthält Fisch.", "拉赫斯 米特 特里亚基佐瑟 恩特海尔特 菲施", "照烧三文鱼含鱼。"]
    ]
  },
  {
    title: "素食和豆腐菜",
    words: [
      ["vegetarisch", "维格塔里施", "素食"],
      ["vegan", "维根", "纯素"],
      ["Chili-Tofu", "奇利 豆腐", "辣豆腐"],
      ["Teriyaki-Tofu", "特里亚基 豆腐", "照烧豆腐"],
      ["Chili-Melanzani", "奇利 梅兰扎尼", "辣茄子"],
      ["Kräuterseitling", "克罗伊特泽特林", "杏鲍菇"]
    ],
    phrases: [
      ["Dieses Gericht ist vegetarisch.", "迪泽斯 格里希特 伊斯特 维格塔里施", "这道菜是素食。"],
      ["Auf Wunsch können wir es vegan machen.", "奥夫 文施 克嫩 维尔 艾斯 维根 马亨", "按要求我们可以做成纯素。"]
    ]
  },
  {
    title: "炒面和炒乌冬",
    words: [
      ["gebratene Nudeln", "格布拉腾讷 努德伦", "炒面"],
      ["hausgemachte Nudeln", "豪斯格马赫特 努德伦", "自制面条"],
      ["gebratene Udon", "格布拉腾讷 乌冬", "炒乌冬"],
      ["mit Garnelen", "米特 加内伦", "配虾"],
      ["mit Meeresfrüchten", "米特 梅雷斯弗吕希滕", "配海鲜"],
      ["fried noodles", "弗赖德 努德尔斯", "英文：炒面"]
    ],
    phrases: [
      ["Die gebratenen Nudeln gibt es mit Huhn, Rind oder Ente.", "迪 格布拉腾嫩 努德伦 吉布特 艾斯 米特 胡恩 林特 奥德 恩特", "炒面可以配鸡肉、牛肉或鸭肉。"],
      ["Gebratene Udon mit Meeresfrüchten ist beliebt.", "格布拉腾讷 乌冬 米特 梅雷斯弗吕希滕 伊斯特 贝利普特", "海鲜炒乌冬很受欢迎。"]
    ]
  },
  {
    title: "Gyoza 煎饺",
    words: [
      ["Gyoza", "吉奥扎", "煎饺"],
      ["gegrillte Teigtaschen", "格格里尔特 泰克塔申", "煎/烤饺子"],
      ["Füllungen", "菲隆根", "馅料"],
      ["Soja-Sesam-Sauce", "佐亚 泽zam 佐瑟", "酱油芝麻酱"],
      ["Schweinefleisch", "施外讷弗莱施", "猪肉"],
      ["Shiitake", "施塔克", "香菇"]
    ],
    phrases: [
      ["Gyoza gibt es vegetarisch, mit Schwein, Huhn oder Garnelen.", "吉奥扎 吉布特 艾斯 维格塔里施 米特 施外因 胡恩 奥德 加内伦", "煎饺有素食、猪肉、鸡肉或虾。"],
      ["Möchten Sie 6 Stück oder 10 Stück?", "默希腾 兹 泽克斯 施蒂克 奥德 岑 施蒂克", "您要 6 个还是 10 个？"]
    ]
  },
  {
    title: "Kokos-Curry 和 Poké Bowl",
    words: [
      ["Kokos-Curry mit Reis", "科科斯咖喱 米特 赖斯", "椰奶咖喱饭"],
      ["Poké Bowl", "波克 碗", "波奇饭碗"],
      ["Sushi-Reis", "苏施赖斯", "寿司米饭"],
      ["Avocado", "阿沃卡多", "牛油果"],
      ["Rucola", "鲁科拉", "芝麻菜"],
      ["Gurken", "古尔肯", "黄瓜"]
    ],
    phrases: [
      ["Alle Poké Bowls werden mit Sushi-Reis serviert.", "阿勒 波克 碗 韦尔登 米特 苏施赖斯 泽维尔特", "所有 Poké Bowl 都配寿司米饭。"],
      ["Kokos-Curry gibt es mit Gemüse, Huhn oder Garnelen.", "科科斯咖喱 吉布特 艾斯 米特 格缪泽 胡恩 奥德 加内伦", "椰奶咖喱可配蔬菜、鸡肉或虾。"]
    ]
  },
  {
    title: "沙拉和加料",
    words: [
      ["Salat-Schalen", "扎拉特 沙伦", "沙拉碗"],
      ["Soja-Sesam-Dressing", "佐亚 泽zam 德雷辛", "酱油芝麻沙拉汁"],
      ["Thai-Dressing", "泰 德雷辛", "泰式沙拉汁"],
      ["Beilage", "拜拉格", "配菜/加料"],
      ["Gemüse statt Reis", "格缪泽 施塔特 赖斯", "蔬菜代替米饭"],
      ["Nudel statt Reis", "努德尔 施塔特 赖斯", "面代替米饭"]
    ],
    phrases: [
      ["Möchten Sie Reis oder Nudeln als Beilage?", "默希腾 兹 赖斯 奥德 努德伦 阿尔斯 拜拉格", "您想要米饭还是面作为配菜？"],
      ["Extra Sauce kostet einen Euro.", "艾克斯特拉 佐瑟 科斯特 艾嫩 欧罗", "额外酱汁一欧元。"]
    ]
  },
  {
    title: "饮料和茶",
    words: [
      ["Leitungswasser", "莱通斯瓦瑟", "自来水"],
      ["prickelnd", "普里克伦特", "气泡的"],
      ["still", "施蒂尔", "无气泡的"],
      ["Apfelsaft naturtrüb", "阿普费尔扎夫特 纳图尔特吕布", "浑浊苹果汁"],
      ["Grüner Tee", "格吕纳 忒", "绿茶"],
      ["Ingwer Tee", "英瓦 忒", "姜茶"]
    ],
    phrases: [
      ["Möchten Sie Wasser prickelnd oder still?", "默希腾 兹 瓦瑟 普里克伦特 奥德 施蒂尔", "您要气泡水还是无气泡水？"],
      ["Wir haben grünen Tee und Ingwer Tee.", "维尔 哈本 格吕嫩 忒 乌ント 英瓦 忒", "我们有绿茶和姜茶。"]
    ]
  },
  {
    title: "过敏原代码",
    words: [
      ["A Gluten", "阿 格鲁滕", "A：含麸质谷物"],
      ["B Krebstiere", "贝 克雷布斯蒂勒", "B：甲壳类"],
      ["C Ei", "策 艾", "C：鸡蛋"],
      ["D Fisch", "德 菲施", "D：鱼"],
      ["F Soja", "艾夫 佐亚", "F：大豆"],
      ["N Sesam", "恩 泽zam", "N：芝麻"]
    ],
    phrases: [
      ["Dieses Gericht enthält Gluten, Soja und Sesam.", "迪泽斯 格里希特 恩特海尔特 格鲁滕 佐亚 乌ント 泽zam", "这道菜含麸质、大豆和芝麻。"],
      ["Haben Sie Allergien oder Unverträglichkeiten?", "哈本 兹 阿勒基恩 奥德 乌恩费尔特雷格利希凯腾", "您有过敏或不耐受吗？"]
    ]
  }
];

function chefLessonFor() {
  return chefTraining[(state.week * 7 + state.day) % chefTraining.length];
}

const todayKey = new Date().toISOString().slice(0, 10);
const saved = JSON.parse(localStorage.getItem("a1-daily-app") || "{}");
let state = {
  week: saved.week ?? 0,
  day: saved.day ?? 0,
  phrase: saved.phrase ?? 0
};

const weekTitle = document.querySelector("#weekTitle");
const weekFocus = document.querySelector("#weekFocus");
const dayStrip = document.querySelector("#dayStrip");
const dayTheme = document.querySelector("#dayTheme");
const dailyLesson = document.querySelector("#dailyLesson");
const progressText = document.querySelector("#progressText");
const progressLabel = document.querySelector("#progressLabel");
const progressBar = document.querySelector("#progressBar");
const phraseText = document.querySelector("#phraseText");
const voiceStatus = document.querySelector("#voiceStatus");
const fileModeWarning = document.querySelector("#fileModeWarning");
let germanVoice = null;
let playbackTimer = null;
let playbackRun = 0;
let currentAudio = null;

function save() {
  localStorage.setItem("a1-daily-app", JSON.stringify({ ...state, date: todayKey }));
}

function videoUrl(lesson) {
  const query = encodeURIComponent(`Deutsch A1 ${lesson.theme} 中文`);
  return `https://www.youtube.com/results?search_query=${query}`;
}

function practiceUrl(lesson) {
  const query = encodeURIComponent(`Goethe A1 ${lesson.theme} Übungen`);
  return `https://www.google.com/search?q=${query}`;
}

function findGermanVoice() {
  if (!("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((voice) => voice.lang === "de-DE") ||
    voices.find((voice) => voice.lang.toLowerCase().startsWith("de")) ||
    null
  );
}

function refreshVoiceStatus() {
  fileModeWarning.hidden = window.location.protocol !== "file:";
  germanVoice = findGermanVoice();
  if (!("speechSynthesis" in window)) {
    voiceStatus.textContent = "无语音支持";
    voiceStatus.className = "voice-status warn";
    return;
  }
  if (germanVoice) {
    voiceStatus.textContent = `德语语音包：${germanVoice.name}`;
    voiceStatus.className = "voice-status ready";
    return;
  }
  voiceStatus.textContent = "使用浏览器默认德语";
  voiceStatus.className = "voice-status warn";
}

function speakOnce(text, onEnd, runId) {
  refreshVoiceStatus();
  if (!("speechSynthesis" in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE";
  if (germanVoice) utterance.voice = germanVoice;
  utterance.rate = 0.58;
  utterance.pitch = 1;
  utterance.onend = () => {
    if (runId === playbackRun) onEnd();
  };
  utterance.onerror = () => {
    if (runId === playbackRun) {
      voiceStatus.textContent = "语音被浏览器拦截，请再点一次";
      voiceStatus.className = "voice-status warn";
      onEnd();
    }
  };
  window.speechSynthesis.resume();
  window.speechSynthesis.speak(utterance);
}

function onlineAudioUrl(text) {
  return `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=de&q=${encodeURIComponent(text)}`;
}

function audioItemsFor(kind) {
  const lesson = plan[state.week].days[state.day];
  const chef = chefLessonFor();
  if (kind === "words") return lesson.vocab;
  if (kind === "sentence") return [lesson.sentence];
  if (kind === "chefWords") return chef.words.map(([de]) => de);
  if (kind === "chefPhrases") return chef.phrases.map(([de]) => de);
  return [];
}

function delayFor(kind) {
  return kind === "sentence" || kind === "chefPhrases" ? 3000 : 2200;
}

function playAudio(kind) {
  const items = audioItemsFor(kind);
  if (!items.length) return;
  playbackRun += 1;
  const runId = playbackRun;
  window.clearTimeout(playbackTimer);
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  window.speechSynthesis.cancel();
  let index = 0;

  function playNext() {
    if (runId !== playbackRun) return;
    if (index >= items.length) {
      voiceStatus.textContent = "播放完成";
      voiceStatus.className = "voice-status ready";
      return;
    }
    voiceStatus.textContent = `跟读时间：${index + 1}/${items.length}`;
    voiceStatus.className = "voice-status ready";
    speakOnce(items[index], () => {
      index += 1;
      playbackTimer = window.setTimeout(playNext, delayFor(kind));
    }, runId);
  }

  playNext();
}

function playText(text) {
  playbackRun += 1;
  const runId = playbackRun;
  window.clearTimeout(playbackTimer);
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  window.speechSynthesis.cancel();
  voiceStatus.textContent = `播放：${text}`;
  voiceStatus.className = "voice-status ready";

  currentAudio = new Audio(onlineAudioUrl(text));
  currentAudio.onended = () => {
    if (runId === playbackRun) voiceStatus.textContent = "播放完成";
  };
  currentAudio.onerror = () => {
    if (runId !== playbackRun) return;
    voiceStatus.textContent = "在线音频失败，尝试语音包";
    voiceStatus.className = "voice-status warn";
    speakOnce(text, () => {
      if (runId !== playbackRun) return;
      voiceStatus.textContent = "播放完成";
      voiceStatus.className = "voice-status ready";
    }, runId);
  };

  const result = currentAudio.play();
  if (result && typeof result.catch === "function") {
    result.catch(() => currentAudio.onerror());
  }
}

function stopAudio() {
  playbackRun += 1;
  window.clearTimeout(playbackTimer);
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  window.speechSynthesis.cancel();
  voiceStatus.textContent = "已停止";
  voiceStatus.className = "voice-status warn";
}

function render() {
  const week = plan[state.week];
  const lesson = week.days[state.day];
  const chef = chefLessonFor();

  weekTitle.textContent = week.title;
  dayTheme.textContent = `第 ${state.day + 1} 天：${lesson.theme}`;
  weekFocus.innerHTML = week.focus.map((item) => `<span>${item}</span>`).join("");
  phraseText.textContent = lesson.sentence;

  dayStrip.innerHTML = week.days
    .map((_, index) => `<button class="day-chip ${index === state.day ? "active" : ""}" data-day="${index}">D${index + 1}</button>`)
    .join("");

  dailyLesson.innerHTML = `
    <article class="lesson-block">
      <header>
        <h3>单词</h3>
      </header>
      <ul class="vocab-list">
        ${lesson.vocab
          .map((word) => {
            const [sound, meaning] = noteForWord(word);
            return `
              <li class="vocab-item">
                <strong>${word}</strong>
                <span>${sound}</span>
                <em>${meaning}</em>
                <button class="inline-play" data-say="${word}" aria-label="播放 ${word}">播放</button>
              </li>
            `;
          })
          .join("")}
      </ul>
      <p class="pronounce-note">使用浏览器里的德语语音包播放，不跳转外部网站。</p>
    </article>
    <article class="lesson-block">
      <header>
        <h3>语法</h3>
      </header>
      <p>${lesson.grammar}</p>
    </article>
    <article class="lesson-block chef-block">
      <header>
        <h3>餐厅参考用语：${chef.title}</h3>
      </header>
      <ul class="vocab-list">
        ${chef.words
          .map(([de, sound, zh]) => `
            <li class="vocab-item">
              <strong>${de}</strong>
              <span>${sound}</span>
              <em>${zh}</em>
              <button class="inline-play" data-say="${de}" aria-label="播放 ${de}">播放</button>
            </li>
          `)
          .join("")}
      </ul>
      <div class="phrase-list">
        ${chef.phrases
          .map(([de, sound, zh]) => `
            <div class="sentence-note">
              <strong>${de}</strong>
              <span>${sound}</span>
              <em>${zh}</em>
              <button class="inline-play" data-say="${de}" aria-label="播放 ${de}">播放</button>
            </div>
          `)
          .join("")}
      </div>
    </article>
    <article class="lesson-block">
      <header>
        <h3>听力/口语句子</h3>
      </header>
      <div class="sentence-note">
        <strong>${lesson.sentence}</strong>
        <span>${sentencePronunciation(lesson.sentence)}</span>
        <em>${sentenceTranslations[lesson.sentence] || "请结合今天主题理解句子。"}</em>
        <button class="inline-play" data-say="${lesson.sentence}" aria-label="播放句子">播放</button>
      </div>
      <p class="pronounce-note">先听德语语音包，再跟读 5 遍。</p>
    </article>
    <article class="lesson-block">
      <header>
        <h3>视频和练习</h3>
      </header>
      <div class="media-row">
        <a class="media-link" href="${videoUrl(lesson)}">视频课</a>
        <a class="media-link" href="${practiceUrl(lesson)}">练习题</a>
      </div>
    </article>
  `;

  const dayNumber = state.week * 7 + state.day + 1;
  const totalDays = plan.length * 7;
  const percent = Math.round((dayNumber / totalDays) * 100);
  progressText.textContent = `第 ${dayNumber}/${totalDays} 天`;
  progressBar.style.width = `${percent}%`;
  progressLabel.textContent = lesson.theme;
  refreshVoiceStatus();
  save();
}

function setWeek(nextWeek) {
  state.week = Math.max(0, Math.min(plan.length - 1, nextWeek));
  state.day = 0;
  state.phrase = 0;
  render();
}

dayStrip.addEventListener("click", (event) => {
  const dayButton = event.target.closest("[data-day]");
  if (!dayButton) return;
  state.day = Number(dayButton.dataset.day);
  state.phrase = 0;
  render();
});

dailyLesson.addEventListener("click", (event) => {
  const sayButton = event.target.closest("[data-say]");
  if (sayButton) {
    playText(sayButton.dataset.say);
    return;
  }
  const playButton = event.target.closest("[data-play]");
  if (!playButton) return;
  playAudio(playButton.dataset.play);
});

document.querySelector("#prevWeek").addEventListener("click", () => setWeek(state.week - 1));
document.querySelector("#nextWeek").addEventListener("click", () => setWeek(state.week + 1));
document.querySelector("#newPhrase").addEventListener("click", () => playAudio("sentence"));
document.querySelector("#stopAudio").addEventListener("click", stopAudio);

if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = refreshVoiceStatus;
}

render();
