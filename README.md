# 長期社會生態核心觀測｜阿里山站

使用 **Vite + React** 建立的前端專案，採用靜態方式部署。  
目前正式上線網址如下：

- https://ltsertw-alishan.org/
- https://ltsertwalishan.org/

---

## 專案介紹

本專案為「長期社會生態核心觀測（LTSER）」**阿里山站**之前端網站，  
主要提供觀測站相關資訊呈現、資料介接與使用者互動介面。

- 前端框架：React  
- 建置工具：Vite  
- 部署方式：靜態部署  

---

## 環境需求

在開始之前，請確認你的開發環境已安裝以下工具：

- Node.js >= 18（建議使用 LTS 版本）
- npm / yarn / pnpm 任一套件管理工具

---

## 套件安裝

在專案根目錄執行：

```bash
npm install
```

---

## 建立環境變數

請在專案根目錄建立以下檔案：

- .env.development

```bash
VITE_API_BASE_URL=YOUR_API_BASE_URL
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID

```

---

## 專案啟動

```bash
npm run dev
```

預設開發網址：http://localhost:5173
