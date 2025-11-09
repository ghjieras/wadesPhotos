<!-- .claude/commands/performance-test.md -->

請對以下目標執行效能測試並提供改善建議：$ARGUMENTS

## 第一階段：效能測試執行

### 1. 確認測試目標
- 如果 $ARGUMENTS 是檔案路徑：測試該檔案
- 如果 $ARGUMENTS 是 "all" 或空白：測試整個應用
- 如果 $ARGUMENTS 是 URL：測試該端點
- 如果 $ARGUMENTS 是函數名稱：測試該函數

### 2. 執行效能測試
根據專案類型自動選擇工具：
- **Node.js/JavaScript**: 
  - 使用 `node --prof` 或專案中的效能測試腳本
  - 檢查 package.json 中的 performance 或 benchmark 命令
- **Python**: 
  - 使用 `python -m cProfile` 或 `pytest-benchmark`
  - 檢查是否有 performance_test.py
- **Go**: 
  - 使用 `go test -bench` 和 `go test -cpuprofile`
- **Java**: 
  - 使用 JMH 或專案中的 benchmark 工具
- **Web 應用**: 
  - 使用 Lighthouse 或 WebPageTest
  - 分析 Network、Rendering、JavaScript 效能

### 3. 收集效能指標
記錄以下數據：
- **執行時間**：平均、最小、最大、中位數
- **記憶體使用**：峰值、平均、記憶體洩漏跡象
- **CPU 使用率**：平均 CPU 佔用
- **I/O 操作**：磁碟讀寫、網路請求
- **資料庫查詢**：查詢次數、執行時間
- **吞吐量**：每秒請求數 (RPS)
- **延遲**：P50, P95, P99 延遲

## 第二階段：效能分析

### 4. 識別效能瓶頸
分析並找出：
- **慢函數**：執行時間超過 100ms 的函數
- **頻繁呼叫**：被呼叫次數過多的函數
- **記憶體問題**：記憶體佔用過高或洩漏
- **阻塞操作**：同步 I/O、阻塞的網路請求
- **N+1 查詢**：資料庫查詢效率問題
- **大物件**：過大的資料結構或回應

### 5. 與基準比較
- 檢查是否有歷史效能數據
- 與業界標準比較
- 識別效能退化

## 第三階段：改善建議

### 6. 提供具體改善方案
根據發現的問題，提供以下類型的建議：

#### A. 程式碼層級優化
- 演算法優化（降低時間複雜度）
- 資料結構選擇（使用更高效的結構）
- 快取策略（記憶體快取、Redis）
- 懶載入（延遲執行非必要操作）
- 批次處理（減少 I/O 次數）

#### B. 資料庫優化
- 索引建議
- 查詢優化
- 連線池配置
- N+1 查詢解決方案
- 資料庫快取策略

#### C. 架構層級優化
- 非同步處理（使用 async/await、Promise）
- 平行處理（多執行緒、Worker）
- 負載平衡
- CDN 使用
- 微服務拆分

#### D. 前端效能優化（如適用）
- 程式碼分割（Code Splitting）
- 圖片優化和懶載入
- 減少 Bundle 大小
- Service Worker 快取
- 關鍵渲染路徑優化

### 7. 產出報告格式