const form = document.querySelector("#passwordForm");
const input = document.querySelector("#passwordInput");
const errorMessage = document.querySelector("#errorMessage");
const loginCard = document.querySelector(".login-card");
const loginScreen = document.querySelector("#loginScreen");
const homeScreen = document.querySelector("#homeScreen");
const monthlyScreen = document.querySelector("#monthlyScreen");
const reportScreen = document.querySelector("#reportScreen");
const togglePassword = document.querySelector("#togglePassword");
const backButton = document.querySelector("#backButton");
const backToHomeButton = document.querySelector("#backToHomeButton");
const backToMonthlyButton = document.querySelector("#backToMonthlyButton");
const openMonthlyButton = document.querySelector("#openMonthlyButton");
const openReportButton = document.querySelector("#openReportButton");
const fillDemoButton = document.querySelector("#fillDemoButton");
const exportBackupButton = document.querySelector("#exportBackupButton");
const importBackupButton = document.querySelector("#importBackupButton");
const backupFileInput = document.querySelector("#backupFileInput");
const modeLabel = document.querySelector("#modeLabel");
const dailyForm = document.querySelector("#dailyForm");
const businessDate = document.querySelector("#businessDate");
const moneyInputs = document.querySelectorAll(".money-input");
const saveMessage = document.querySelector("#saveMessage");
const totalRevenue = document.querySelector("#totalRevenue");
const totalIncome = document.querySelector("#totalIncome");
const netAmount = document.querySelector("#netAmount");
const monthlyForm = document.querySelector("#monthlyForm");
const reportMonth = document.querySelector("#reportMonth");
const monthlyMoneyInputs = document.querySelectorAll(".monthly-money-input");
const monthlySaveMessage = document.querySelector("#monthlySaveMessage");
const monthlyTotalExpense = document.querySelector("#monthlyTotalExpense");
const reportTabs = document.querySelectorAll("[data-chart-mode]");
const toggleChartButton = document.querySelector("#toggleChartButton");
const revenueChart = document.querySelector("#revenueChart");
const chartModeLabel = document.querySelector("#chartModeLabel");
const chartTotal = document.querySelector("#chartTotal");
const reportIncome = document.querySelector("#reportIncome");
const reportExpense = document.querySelector("#reportExpense");
const reportBalance = document.querySelector("#reportBalance");
const reportTableBody = document.querySelector("#reportTableBody");
const weeklyCompareBody = document.querySelector("#weeklyCompareBody");
const tablePeriodLabel = document.querySelector("#tablePeriodLabel");
const exportExcelButton = document.querySelector("#exportExcelButton");

const passwordMap = {
  main: "0310",
  demo: "0000",
};
const moneyFormatter = new Intl.NumberFormat("zh-CN", {
  style: "currency",
  currency: "CNY",
});
let chartMode = "week";
let activeDataMode = "main";
let dailyStorageKey = "yoMienDailyRecords";
let monthlyStorageKey = "yoMienMonthlyRecords";

const setDataMode = (mode) => {
  activeDataMode = mode;
  dailyStorageKey = mode === "demo" ? "yoMienDemoDailyRecords" : "yoMienDailyRecords";
  monthlyStorageKey = mode === "demo" ? "yoMienDemoMonthlyRecords" : "yoMienMonthlyRecords";
  modeLabel.textContent = mode === "demo" ? "演示端" : "正式端";
};

businessDate.valueAsDate = new Date();
reportMonth.value = new Date().toISOString().slice(0, 7);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const password = input.value.trim();

  if (password === passwordMap.main || password === passwordMap.demo) {
    setDataMode(password === passwordMap.demo ? "demo" : "main");
    errorMessage.textContent = "";
    loginScreen.hidden = true;
    homeScreen.hidden = false;
    loadDailyForm();
    loadMonthlyForm();
    renderReport();
    return;
  }

  errorMessage.textContent = "密码不正确，请重新输入";
  loginCard.classList.remove("shake");
  window.requestAnimationFrame(() => loginCard.classList.add("shake"));
  input.select();
});

togglePassword.addEventListener("click", () => {
  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";
  togglePassword.setAttribute("aria-label", isPassword ? "隐藏密码" : "显示密码");
});

backButton.addEventListener("click", () => {
  homeScreen.hidden = true;
  loginScreen.hidden = false;
  input.focus();
});

openMonthlyButton.addEventListener("click", () => {
  homeScreen.hidden = true;
  monthlyScreen.hidden = false;
});

backToHomeButton.addEventListener("click", () => {
  monthlyScreen.hidden = true;
  homeScreen.hidden = false;
});

openReportButton.addEventListener("click", () => {
  monthlyScreen.hidden = true;
  reportScreen.hidden = false;
  renderReport();
});

backToMonthlyButton.addEventListener("click", () => {
  reportScreen.hidden = true;
  monthlyScreen.hidden = false;
});

const getMoney = (id) => Number(document.querySelector(`#${id}`).value || 0);
const moneyText = (value) => moneyFormatter.format(value);

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const readStore = (key) => JSON.parse(localStorage.getItem(key) || "{}");
const writeStore = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const emptyRevenue = () => ({ lunch: 0, dinner: 0, delivery: 0 });
const addRevenue = (total, record) => ({
  lunch: total.lunch + Number(record.lunchRevenue || 0),
  dinner: total.dinner + Number(record.dinnerRevenue || 0),
  delivery: total.delivery + Number(record.deliveryRevenue || 0),
});
const formatDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const parseDateKey = (value) => {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};
const getWeekStart = (date) => {
  const start = new Date(date);
  const day = start.getDay() || 7;
  start.setDate(start.getDate() - day + 1);
  start.setHours(0, 0, 0, 0);
  return start;
};
const addDays = (date, days) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};
const getDailyRecord = (date) => readStore(dailyStorageKey)[date];
const getMonthlyRecord = (month) => readStore(monthlyStorageKey)[month];

const getDailyFormRecord = () => ({
  date: businessDate.value,
  lunchRevenue: getMoney("lunchRevenue"),
  dinnerRevenue: getMoney("dinnerRevenue"),
  deliveryRevenue: getMoney("deliveryRevenue"),
  cashIncome: getMoney("cashIncome"),
  posIncome: getMoney("posIncome"),
  foodExpense: getMoney("foodExpense"),
});

const getMonthlyFormRecord = () => ({
  month: reportMonth.value,
  salaryExpense: getMoney("salaryExpense"),
  taxExpense: getMoney("taxExpense"),
  rentExpense: getMoney("rentExpense"),
  materialFoodExpense: getMoney("materialFoodExpense"),
});

const fillInput = (id, value) => {
  document.querySelector(`#${id}`).value = value || "";
};

const loadDailyForm = () => {
  const record = getDailyRecord(businessDate.value);
  fillInput("lunchRevenue", record?.lunchRevenue);
  fillInput("dinnerRevenue", record?.dinnerRevenue);
  fillInput("deliveryRevenue", record?.deliveryRevenue);
  fillInput("cashIncome", record?.cashIncome);
  fillInput("posIncome", record?.posIncome);
  fillInput("foodExpense", record?.foodExpense);
  saveMessage.textContent = record ? "已载入当天保存记录" : "";
  updateSummary();
};

const loadMonthlyForm = () => {
  const record = getMonthlyRecord(reportMonth.value);
  fillInput("salaryExpense", record?.salaryExpense);
  fillInput("taxExpense", record?.taxExpense);
  fillInput("rentExpense", record?.rentExpense);
  fillInput("materialFoodExpense", record?.materialFoodExpense);
  monthlySaveMessage.textContent = record ? "已载入本月保存记录" : "";
  updateMonthlySummary();
};

const saveDailyRecord = () => {
  const records = readStore(dailyStorageKey);
  const record = getDailyFormRecord();
  records[record.date] = record;
  writeStore(dailyStorageKey, records);
};

const saveMonthlyRecord = () => {
  const records = readStore(monthlyStorageKey);
  const record = getMonthlyFormRecord();
  records[record.month] = record;
  writeStore(monthlyStorageKey, records);
};

const fillDemoData = () => {
  const baseDate = businessDate.value ? parseDateKey(businessDate.value) : new Date();
  const weekStart = getWeekStart(baseDate);
  const dailyRecords = readStore(dailyStorageKey);
  const samples = [
    [980, 1780, 440, 1600, 1600, 520],
    [1260, 2200, 640, 2100, 2000, 680],
    [1180, 2050, 570, 1800, 2000, 610],
    [1580, 2920, 700, 2500, 2700, 820],
    [1940, 4050, 910, 3200, 3700, 1100],
    [2360, 5280, 1160, 4100, 4700, 1380],
    [2140, 4400, 1060, 3600, 4000, 1260],
  ];

  samples.forEach(([lunch, dinner, delivery, cash, pos, food], index) => {
    const date = formatDateKey(addDays(weekStart, index));
    dailyRecords[date] = {
      date,
      lunchRevenue: lunch,
      dinnerRevenue: dinner,
      deliveryRevenue: delivery,
      cashIncome: cash,
      posIncome: pos,
      foodExpense: food,
    };
  });
  writeStore(dailyStorageKey, dailyRecords);

  const monthlyRecords = readStore(monthlyStorageKey);
  monthlyRecords[reportMonth.value] = {
    month: reportMonth.value,
    salaryExpense: 21000,
    taxExpense: 5200,
    rentExpense: 16000,
    materialFoodExpense: 8600,
  };
  writeStore(monthlyStorageKey, monthlyRecords);

  loadDailyForm();
  loadMonthlyForm();
  renderReport();
  saveMessage.textContent = "已填入本周演示数据，可以查看统计报表";
};

const getRecordsBetween = (start, end) => {
  const records = readStore(dailyStorageKey);
  return Object.values(records).filter((record) => {
    const date = parseDateKey(record.date);
    return date >= start && date <= end;
  });
};

const summarizeRecords = (records) =>
  records.reduce(
    (sum, record) => ({
      lunch: sum.lunch + Number(record.lunchRevenue || 0),
      dinner: sum.dinner + Number(record.dinnerRevenue || 0),
      delivery: sum.delivery + Number(record.deliveryRevenue || 0),
      cash: sum.cash + Number(record.cashIncome || 0),
      pos: sum.pos + Number(record.posIncome || 0),
      food: sum.food + Number(record.foodExpense || 0),
    }),
    { lunch: 0, dinner: 0, delivery: 0, cash: 0, pos: 0, food: 0 },
  );

const updateSummary = () => {
  const revenue =
    getMoney("lunchRevenue") + getMoney("dinnerRevenue") + getMoney("deliveryRevenue");
  const income = getMoney("cashIncome") + getMoney("posIncome");
  const net = revenue - getMoney("foodExpense");

  totalRevenue.textContent = moneyFormatter.format(revenue);
  totalIncome.textContent = moneyFormatter.format(income);
  netAmount.textContent = moneyFormatter.format(net);
};

moneyInputs.forEach((field) => {
  field.addEventListener("input", () => {
    saveMessage.textContent = "";
    updateSummary();
  });
});

businessDate.addEventListener("change", loadDailyForm);

dailyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  updateSummary();
  saveDailyRecord();
  saveMessage.textContent = "已保存今日营业记录，报表已更新";
  if (!reportScreen.hidden) {
    renderReport();
  }
});

const updateMonthlySummary = () => {
  const total =
    getMoney("salaryExpense") +
    getMoney("taxExpense") +
    getMoney("rentExpense") +
    getMoney("materialFoodExpense");
  monthlyTotalExpense.textContent = moneyFormatter.format(total);
};

monthlyMoneyInputs.forEach((field) => {
  field.addEventListener("input", () => {
    monthlySaveMessage.textContent = "";
    updateMonthlySummary();
  });
});

reportMonth.addEventListener("change", () => {
  loadMonthlyForm();
  if (!reportScreen.hidden) {
    renderReport();
  }
});

monthlyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  updateMonthlySummary();
  saveMonthlyRecord();
  monthlySaveMessage.textContent = "已保存本月支出记录，报表已更新";
  if (!reportScreen.hidden) {
    renderReport();
  }
});

const buildWeekReport = () => {
  const baseDate = businessDate.value ? parseDateKey(businessDate.value) : new Date();
  const weekStart = getWeekStart(baseDate);
  const previousWeekStart = addDays(weekStart, -7);
  const labels = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
  const chart = labels.map((label, index) => {
    const dateKey = formatDateKey(addDays(weekStart, index));
    const record = getDailyRecord(dateKey);
    return {
      label,
      lunch: Number(record?.lunchRevenue || 0),
      dinner: Number(record?.dinnerRevenue || 0),
      delivery: Number(record?.deliveryRevenue || 0),
    };
  });
  const previousRecords = getRecordsBetween(previousWeekStart, addDays(previousWeekStart, 6));
  const previousSum = previousRecords.reduce(addRevenue, emptyRevenue());
  const weekRecords = getRecordsBetween(weekStart, addDays(weekStart, 6));
  const sum = summarizeRecords(weekRecords);
  const revenue = sum.lunch + sum.dinner + sum.delivery;
  const income = sum.cash + sum.pos;

  return {
    label: "本周营业额明细",
    period: "按周",
    chart,
    previousWeek: previousSum,
    rows: [
      ["营业额", revenue, 0],
      ["现金收入", sum.cash, 0],
      ["POS 机收入", sum.pos, 0],
      ["食材支出", 0, sum.food],
    ],
    reportIncome: income,
    reportExpense: sum.food,
    empty: weekRecords.length === 0,
  };
};

const buildMonthReport = () => {
  const monthValue = reportMonth.value || new Date().toISOString().slice(0, 7);
  const [year, month] = monthValue.split("-").map(Number);
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const weekStarts = [];
  let cursor = getWeekStart(firstDay);

  while (cursor <= lastDay) {
    weekStarts.push(new Date(cursor));
    cursor = addDays(cursor, 7);
  }

  const dailyRecords = getRecordsBetween(firstDay, lastDay);
  const chart = weekStarts.map((start, index) => {
    const end = addDays(start, 6);
    const records = getRecordsBetween(start, end);
    const sum = records.reduce(addRevenue, emptyRevenue());
    return { label: `第${index + 1}周`, ...sum };
  });
  const previousIndex = Math.max(0, chart.length - 2);
  const previousWeek = chart[previousIndex] || emptyRevenue();
  const sum = summarizeRecords(dailyRecords);
  const monthRecord = getMonthlyRecord(monthValue) || {};
  const revenue = sum.lunch + sum.dinner + sum.delivery;
  const income = sum.cash + sum.pos;
  const monthlyExpense =
    Number(monthRecord.salaryExpense || 0) +
    Number(monthRecord.taxExpense || 0) +
    Number(monthRecord.rentExpense || 0) +
    Number(monthRecord.materialFoodExpense || 0);

  return {
    label: "本月每周营业额",
    period: "按月",
    chart,
    previousWeek,
    rows: [
      ["营业额", revenue, 0],
      ["现金收入", sum.cash, 0],
      ["POS 机收入", sum.pos, 0],
      ["食材支出", 0, sum.food],
      ["工资总支出", 0, Number(monthRecord.salaryExpense || 0)],
      ["税支出", 0, Number(monthRecord.taxExpense || 0)],
      ["租金支出", 0, Number(monthRecord.rentExpense || 0)],
      ["耗材食材支出", 0, Number(monthRecord.materialFoodExpense || 0)],
      ["本月总支出", 0, sum.food + monthlyExpense],
    ],
    reportIncome: income,
    reportExpense: sum.food + monthlyExpense,
    empty: dailyRecords.length === 0,
  };
};

const getReportData = () => (chartMode === "week" ? buildWeekReport() : buildMonthReport());

const renderReport = () => {
  const data = getReportData();
  const getChartTotal = (item) => item.lunch + item.dinner + item.delivery;
  const seriesKeys = ["lunch", "dinner", "delivery"];
  const seriesLabels = { lunch: "中午", dinner: "晚上", delivery: "外卖" };
  const maxValue = Math.max(...data.chart.flatMap((item) => seriesKeys.map((key) => item[key])));
  const minValue = Math.min(...data.chart.flatMap((item) => seriesKeys.map((key) => item[key])));
  const total = data.chart.reduce((sum, item) => sum + getChartTotal(item), 0);
  const income = data.reportIncome;
  const expense = data.reportExpense;
  const currentWeek =
    chartMode === "week"
      ? data.chart.reduce(
          (sum, item) => ({
            lunch: sum.lunch + item.lunch,
            dinner: sum.dinner + item.dinner,
            delivery: sum.delivery + item.delivery,
          }),
          { lunch: 0, dinner: 0, delivery: 0 },
        )
      : data.chart[data.chart.length - 1];
  const currentCompare = {
    lunch: currentWeek.lunch,
    dinner: currentWeek.dinner,
    delivery: currentWeek.delivery,
  };
  const compareRows = [
    ["中午", currentCompare.lunch, data.previousWeek.lunch],
    ["晚上", currentCompare.dinner, data.previousWeek.dinner],
    ["外卖", currentCompare.delivery, data.previousWeek.delivery],
    [
      "合计",
      currentCompare.lunch + currentCompare.dinner + currentCompare.delivery,
      data.previousWeek.lunch + data.previousWeek.dinner + data.previousWeek.delivery,
    ],
  ];

  const width = 360;
  const height = 220;
  const padding = { top: 18, right: 18, bottom: 34, left: 42 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const range = Math.max(1, maxValue - minValue);
  const xFor = (index) =>
    padding.left + (data.chart.length === 1 ? plotWidth / 2 : (plotWidth / (data.chart.length - 1)) * index);
  const yFor = (value) => padding.top + plotHeight - ((value - minValue) / range) * plotHeight;
  const pathFor = (key) =>
    data.chart
      .map((item, index) => `${index === 0 ? "M" : "L"} ${xFor(index).toFixed(1)} ${yFor(item[key]).toFixed(1)}`)
      .join(" ");
  const pointsFor = (key) =>
    data.chart
      .map(
        (item, index) =>
          `<circle class="chart-point ${key}" cx="${xFor(index).toFixed(1)}" cy="${yFor(item[key]).toFixed(1)}" r="4">
            <title>${escapeHtml(item.label)} ${seriesLabels[key]} ${moneyText(item[key])}</title>
          </circle>`,
      )
      .join("");
  const labelNodes = data.chart
    .map(
      (item, index) =>
        `<text x="${xFor(index).toFixed(1)}" y="${height - 12}" text-anchor="middle">${escapeHtml(item.label)}</text>`,
    )
    .join("");
  const yLabels = [maxValue, Math.round((maxValue + minValue) / 2), minValue]
    .map(
      (value) =>
        `<text x="8" y="${yFor(value).toFixed(1)}" dominant-baseline="middle">${Math.round(value / 1000)}k</text>`,
    )
    .join("");

  revenueChart.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(data.label)}曲线图">
      <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${padding.top + plotHeight}" stroke="rgba(248,241,229,.18)" />
      <line x1="${padding.left}" y1="${padding.top + plotHeight}" x2="${width - padding.right}" y2="${padding.top + plotHeight}" stroke="rgba(248,241,229,.18)" />
      ${seriesKeys.map((key) => `<path class="chart-line ${key}" d="${pathFor(key)}"></path>`).join("")}
      ${seriesKeys.map((key) => pointsFor(key)).join("")}
      ${labelNodes}
      ${yLabels}
    </svg>
  `;

  weeklyCompareBody.innerHTML = compareRows
    .map(([name, current, previous]) => {
      const diff = current - previous;
      const diffClass = diff >= 0 ? "positive" : "negative";
      const sign = diff >= 0 ? "+" : "";
      return `
        <tr>
          <td>${name}</td>
          <td>${moneyFormatter.format(current)}</td>
          <td>${moneyFormatter.format(previous)}</td>
          <td class="${diffClass}">${sign}${moneyFormatter.format(diff)}</td>
        </tr>
      `;
    })
    .join("");

  reportTableBody.innerHTML = data.rows
    .map(
      ([name, incomeValue, expenseValue]) => `
        <tr>
          <td>${name}</td>
          <td>${incomeValue ? moneyFormatter.format(incomeValue) : "-"}</td>
          <td>${expenseValue ? moneyFormatter.format(expenseValue) : "-"}</td>
        </tr>
      `,
    )
    .join("");

  chartModeLabel.textContent = data.label;
  tablePeriodLabel.textContent = data.period;
  chartTotal.textContent = moneyFormatter.format(total);
  reportIncome.textContent = moneyFormatter.format(income);
  reportExpense.textContent = moneyFormatter.format(expense);
  reportBalance.textContent = moneyFormatter.format(income - expense);
  reportTabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.chartMode === chartMode));
};

const buildExcelTable = () => {
  const data = getReportData();
  const dailyRows = [
    ["日期", businessDate.value || ""],
    ["中午营业额", getMoney("lunchRevenue")],
    ["晚上营业额", getMoney("dinnerRevenue")],
    ["外卖营业额", getMoney("deliveryRevenue")],
    ["现金收入", getMoney("cashIncome")],
    ["POS 机收入", getMoney("posIncome")],
    ["食材支出", getMoney("foodExpense")],
  ];
  const monthlyRows = [
    ["月份", reportMonth.value || ""],
    ["工资总支出", getMoney("salaryExpense")],
    ["税支出", getMoney("taxExpense")],
    ["租金支出", getMoney("rentExpense")],
    ["耗材食材支出", getMoney("materialFoodExpense")],
    [
      "本月总支出",
      getMoney("salaryExpense") +
        getMoney("taxExpense") +
        getMoney("rentExpense") +
        getMoney("materialFoodExpense"),
    ],
  ];
  const chartRows = data.chart.map((item) => [
    item.label,
    item.lunch,
    item.dinner,
    item.delivery,
    item.lunch + item.dinner + item.delivery,
  ]);

  return `
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: Arial, "Microsoft YaHei", sans-serif; }
          h1 { color: #e60012; }
          table { border-collapse: collapse; margin-bottom: 20px; }
          th { background: #e60012; color: #fff; }
          th, td { border: 1px solid #999; padding: 8px 10px; }
          td.number { mso-number-format:"0.00"; }
        </style>
      </head>
      <body>
        <h1>YO MIEN 有面营业报表</h1>
        <h2>每日营业录入</h2>
        <table>${dailyRows.map(([name, value]) => `<tr><th>${escapeHtml(name)}</th><td>${escapeHtml(value)}</td></tr>`).join("")}</table>
        <h2>月度支出</h2>
        <table>${monthlyRows.map(([name, value]) => `<tr><th>${escapeHtml(name)}</th><td>${escapeHtml(value)}</td></tr>`).join("")}</table>
        <h2>${escapeHtml(data.label)}</h2>
        <table>
          <tr><th>周期</th><th>中午</th><th>晚上</th><th>外卖</th><th>合计</th></tr>
          ${chartRows
            .map(
              (row) =>
                `<tr>${row
                  .map((cell, index) => `<td class="${index ? "number" : ""}">${escapeHtml(cell)}</td>`)
                  .join("")}</tr>`,
            )
            .join("")}
        </table>
        <h2>收入支出表</h2>
        <table>
          <tr><th>项目</th><th>收入</th><th>支出</th></tr>
          ${data.rows
            .map(
              ([name, incomeValue, expenseValue]) =>
                `<tr><td>${escapeHtml(name)}</td><td class="number">${incomeValue}</td><td class="number">${expenseValue}</td></tr>`,
            )
            .join("")}
        </table>
      </body>
    </html>
  `;
};

const exportExcel = () => {
  const blob = new Blob([buildExcelTable()], { type: "application/vnd.ms-excel;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `YO-MIEN-${chartMode === "week" ? "weekly" : "monthly"}-report.xls`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const exportBackup = () => {
  const backup = {
    app: "YO MIEN 有面",
    version: 1,
    mode: activeDataMode,
    exportedAt: new Date().toISOString(),
    dailyRecords: readStore(dailyStorageKey),
    monthlyRecords: readStore(monthlyStorageKey),
  };
  const date = new Date().toISOString().slice(0, 10);
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json;charset=utf-8" });
  downloadBlob(blob, `YO-MIEN-${activeDataMode}-backup-${date}.json`);
  saveMessage.textContent = "已导出备份文件";
};

const refreshAfterImport = () => {
  loadDailyForm();
  loadMonthlyForm();
  renderReport();
};

const importBackup = async (file) => {
  if (!file) return;

  try {
    const text = await file.text();
    const backup = JSON.parse(text);

    if (!backup.dailyRecords || !backup.monthlyRecords) {
      throw new Error("Invalid backup file");
    }

    writeStore(dailyStorageKey, backup.dailyRecords);
    writeStore(monthlyStorageKey, backup.monthlyRecords);
    refreshAfterImport();
    saveMessage.textContent = "已导入备份，数据已恢复";
  } catch {
    saveMessage.textContent = "导入失败，请选择正确的备份文件";
  } finally {
    backupFileInput.value = "";
  }
};

reportTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    chartMode = tab.dataset.chartMode;
    renderReport();
  });
});

fillDemoButton.addEventListener("click", fillDemoData);
exportBackupButton.addEventListener("click", exportBackup);
importBackupButton.addEventListener("click", () => backupFileInput.click());
backupFileInput.addEventListener("change", () => importBackup(backupFileInput.files[0]));

toggleChartButton.addEventListener("click", () => {
  chartMode = chartMode === "week" ? "month" : "week";
  renderReport();
});

exportExcelButton.addEventListener("click", exportExcel);

loadDailyForm();
loadMonthlyForm();
renderReport();
