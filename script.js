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

const demoPassword = "0310";
const moneyFormatter = new Intl.NumberFormat("zh-CN", {
  style: "currency",
  currency: "CNY",
});
let chartMode = "week";

const reportData = {
  week: {
    label: "本周营业额明细",
    period: "按周",
    chart: [
      { label: "周一", lunch: 980, dinner: 1780, delivery: 440 },
      { label: "周二", lunch: 1260, dinner: 2200, delivery: 640 },
      { label: "周三", lunch: 1180, dinner: 2050, delivery: 570 },
      { label: "周四", lunch: 1580, dinner: 2920, delivery: 700 },
      { label: "周五", lunch: 1940, dinner: 4050, delivery: 910 },
      { label: "周六", lunch: 2360, dinner: 5280, delivery: 1160 },
      { label: "周日", lunch: 2140, dinner: 4400, delivery: 1060 },
    ],
    previousWeek: { lunch: 10200, dinner: 20780, delivery: 5420 },
    rows: [
      ["营业额", 39600, 0],
      ["外卖平台", 6800, 0],
      ["食材", 0, 9200],
      ["工资", 0, 4800],
      ["税费", 0, 1200],
    ],
  },
  month: {
    label: "本月每周营业额",
    period: "按月",
    chart: [
      { label: "第1周", lunch: 8200, dinner: 16300, delivery: 4100 },
      { label: "第2周", lunch: 9500, dinner: 18100, delivery: 4800 },
      { label: "第3周", lunch: 10100, dinner: 19500, delivery: 5500 },
      { label: "第4周", lunch: 11440, dinner: 22530, delivery: 5230 },
    ],
    previousWeek: { lunch: 10100, dinner: 19500, delivery: 5500 },
    rows: [
      ["营业额", 135300, 0],
      ["外卖平台", 22600, 0],
      ["食材", 0, 36800],
      ["工资", 0, 21000],
      ["税费", 0, 5200],
      ["租金", 0, 16000],
    ],
  },
};

businessDate.valueAsDate = new Date();
reportMonth.value = new Date().toISOString().slice(0, 7);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (input.value.trim() === demoPassword) {
    errorMessage.textContent = "";
    loginScreen.hidden = true;
    homeScreen.hidden = false;
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

dailyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  updateSummary();
  saveMessage.textContent = "已保存今日营业记录";
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

monthlyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  updateMonthlySummary();
  monthlySaveMessage.textContent = "已保存本月支出记录";
});

const renderReport = () => {
  const data = reportData[chartMode];
  const getChartTotal = (item) => item.lunch + item.dinner + item.delivery;
  const seriesKeys = ["lunch", "dinner", "delivery"];
  const seriesLabels = { lunch: "中午", dinner: "晚上", delivery: "外卖" };
  const maxValue = Math.max(...data.chart.flatMap((item) => seriesKeys.map((key) => item[key])));
  const minValue = Math.min(...data.chart.flatMap((item) => seriesKeys.map((key) => item[key])));
  const total = data.chart.reduce((sum, item) => sum + getChartTotal(item), 0);
  const income = data.rows.reduce((sum, item) => sum + item[1], 0);
  const expense = data.rows.reduce((sum, item) => sum + item[2], 0);
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
  const data = reportData[chartMode];
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

reportTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    chartMode = tab.dataset.chartMode;
    renderReport();
  });
});

toggleChartButton.addEventListener("click", () => {
  chartMode = chartMode === "week" ? "month" : "week";
  renderReport();
});

exportExcelButton.addEventListener("click", exportExcel);

renderReport();
