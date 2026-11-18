# Moonplay Planet

月動星球潮玩商城概念官網，使用 React、TypeScript、Redux Toolkit 和 Vite。首頁內容依照提供的官網整理文檔編排，概念商品圖取自該文檔的視覺稿。

## 開始

```bash
npm install
npm run dev
```

正式打包使用 `npm run build`。

## 結構

- `src/App.tsx`：首頁編排及頁面內搜尋、分類狀態。
- `src/components`：可重用的品牌、導覽、標題及提示抽屜。
- `src/features/site`：跨區域共用的語言及抽屜狀態。
- `src/features/catalog`：概念商品資料與型別。
- `src/i18n`：繁體中文、韓文、英文內容。
- `src/utils/locale.ts`：語言辨識與儲存。
- `src/styles`：設計 token、基礎樣式和頁面樣式。

## 內容狀態

商品、會員、個人店鋪及訂閱服務目前為概念展示。正式上線前，應接入後端商品資料、真實庫存、身份系統與服務條款，再開放購買或收集訂閱資料。設計稿中的商品價格不作為正式售價。
