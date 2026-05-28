# 风水罗盘 App MVP

这是一个手机端优先的 React + Tailwind CSS 风水罗盘原型，包含：

- 传统风水罗盘界面
- “孙大师风水”专属启动封页
- 4 位密码进入，默认密码 `8888`
- 成功进入次数通过 `localStorage` 保存
- DeviceOrientation 手机方向读取
- 不支持传感器时的手动拖动模拟模式
- 房间照片上传与预览
- 房间类型选择
- 风水信息录入
- 基于规则库的评分与建议报告
- 230 条第一版规则，覆盖八宅派、峦头派、五行基础
- 预留 AI 图像识别接入点，后续可把识别到的床、门、窗、镜子、沙发、灶台等对象传给规则引擎

## 运行方式

当前机器没有 npm/yarn，因此项目采用免安装依赖的浏览器脚本版本。

```bash
python3 -m http.server 5173
```

然后打开：

```text
http://localhost:5173
```

## 后续接入 AI 的位置

规则库与分析逻辑在：

```text
src/data/fengshui_rules.json
src/data/fengshui_sources.md
src/services/analyzeFengShui.ts
```

专属首页组件在：

```text
src/pages/MasterLogin.tsx
src/pages/MasterLogin.jsx
```

当前免构建原型运行 `MasterLogin.jsx`。首页主视觉使用：

```text
src/assets/sun-master-cover.png
```

后续可以把 OpenAI Vision API 的识别结果转换成 `detectedObjects`，再传给 `analyzeFengShui(input)`：

```js
const result = await analyzeFengShui({
  roomType: "卧室",
  compassDirection: "北",
  detectedObjects: [
    { object: "bed", position: "west", facing: "north", relation: "facing_known" },
    { object: "mirror", position: "east", facing: "west", relation: "facing_bed" }
  ],
  userInputs: {
    hasMirrorFacingBed: true,
    bedHeadAgainstWall: true,
    sofaAgainstWall: false,
    doorFacingToilet: false,
    stoveNearSink: false,
    beamAboveBed: false,
    roomIsBright: true,
    roomIsCluttered: false
  }
});
```
