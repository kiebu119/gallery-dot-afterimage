# GALLERY DOT — AFTER IMAGE LP
## 実装用 優先度順 ToDo リスト＋コーディング指示書

---

## 前提情報

### ペルソナ（4名）
| # | 名前 | 年齢 | タイプ | LP上の最重要セクション |
|---|------|------|--------|----------------------|
| 01 | 小林結衣 | 28 | Primary：アート初心者×SNS×特典 | ヒーロー・特典・予約フォーム |
| 02 | 中村健一 | 35 | Primary：未来のコレクター×コンセプト重視 | コンセプト・アーティスト・年表 |
| 03 | 山口美紀 | 43 | Secondary：既存コレクター×子連れ | FAQ・バリアフリー・アーティスト |
| 04 | 佐藤雅人 | 42 | Secondary：企業案件×ネットワーキング | 年表・イベント・問い合わせ |

### 最終ゴール
- **主CV**: 来場予約（QRチェックイン前提）
- **副CV**: LINE登録
- **KPI**: 予約2,000件 / 来場率≥70% / メルマガ同意≥60%

### デザイン方針（v5確定）
- Esther Schipper + Te Whare Taonga 的な「静かな緊張感」
- 明暗交互レイアウト（Dark↔Light）
- 超細身フォント（Playfair Display italic + Shippori Mincho 300）
- 深いバーガンディ系アクセント（#6E2838〜#8C3048）
- テキストは透明度で階層化（.2〜.6）
- 128px セクション間余白

---

## ファイル構成

```
gallery-dot-lp/
├── index.html          ← メインHTML（全10セクション）
├── style.css           ← CSS（レスポンシブ含む）
├── script.js           ← JS（フォームバリデーション・FAQ・ナビ等）
└── img/
    ├── logo.svg        ← ギャラリーロゴ
    ├── logo.png        ← フォールバック
    ├── Orihara.jpg     ← 折原柚衣 作品（ヒーロー背景兼用）
    ├── NORI.jpg        ← NORI 作品
    ├── saeki.jpg       ← 佐伯凛 作品
    ├── Hanna.jpg       ← Hanna K. 作品
    ├── Sakai_Naoto.jpg ← 境直斗 作品
    ├── Cup.jpg         ← マグカップ特典
    └── Gallery_Dot.jpg ← ギャラリー内観/外観
```

---

## 優先度順 ToDo リスト

### 🔴 P0：CVに直結（最優先）

#### 1. 予約フォーム — バリデーション付き実装
- **影響**: CVの核。全ペルソナ共通。
- **実装指示**:
  - 項目: 氏名/メール/電話/来場日(select)/時間帯30分枠(select)/同伴人数(select 0-2)/トーク参加希望(checkbox)/LINE同意(checkbox)/規約同意(checkbox,required)
  - 来場日: 2026/1/10〜1/26、火曜除外、`<select>`で生成（JS）
  - バリデーション: 氏名=空チェック、メール=正規表現、電話=10-15桁数字ハイフン、日付・時間=空チェック、規約=チェック必須
  - エラー表示: 各入力直下に赤文字（color: rgba(140,56,72,.6)）、入力枠にborder-color変更
  - リアルタイムクリア: input/changeイベントでエラー解除
  - 送信成功: モーダル表示（予約番号ランダム生成 GD-2026-XXXX）
  - フォーム背景: #FFFFFF、入力背景: #F5F5F6、border: .5px solid rgba(0,0,0,.04)
  - submitボタン: background #6E2838、color rgba(255,255,255,.85)、font-size 9px、letter-spacing .3em、padding 18px

#### 2. CTA配置 — ヒーロー＋最終CTA
- **影響**: 予約導線の入口と出口。P01（結衣）が最初に目にする。
- **実装指示**:
  - ヒーロー: テキストリンク型「来場予約する」→ `<a href="#reservation">`、font-size 9px、letter-spacing .3em、border-bottom .5px solid rgba(216,213,208,.15)
  - 最終CTA: 同じテキストリンク型。上に28px幅のdivider（background: rgba(140,56,72,.2)）
  - スムーススクロール: `scroll-behavior: smooth` + JSフォールバック

#### 3. LINE登録ボタン
- **影響**: 副CV。リード獲得。
- **実装指示**:
  - ヒーロー下部に `btn-s`（border .5px solid rgba(216,213,208,.12)、color opacity .4）
  - href: 仮リンク `#`（URL未提供のため）
  - 予約フォーム内にもチェックボックスで同意取得

---

### 🟠 P1：信頼性・コンテンツ品質

#### 4. アーティストセクション — 横スクロールカルーセル
- **影響**: P02（健一）・P03（美紀）のコンバージョンに直結。
- **実装指示**:
  - `display:flex; overflow-x:auto; scroll-snap-type:x mandatory;`
  - カード幅: `flex: 0 0 260px`、gap: 16px、padding: 0 32px
  - 画像: `aspect-ratio:3/4; object-fit:cover; opacity:.9`
  - テキストはカード外（画像の下）。名前=Georgia italic 14px、作品=10px opacity .22
  - クレジット: 7.5px opacity .12 — `© Artist / Courtesy of Gallery Dot`
  - scrollbar非表示: `-webkit-scrollbar{display:none}; scrollbar-width:none`

#### 5. コンセプトセクション
- **影響**: P02（健一）が最も重視。世界観の伝達。
- **実装指示**:
  - 引用文: Georgia italic 19px、line-height 2、color opacity .6
  - 本文: 12px、line-height 2.5、color opacity .4
  - ギャラリー画像: margin-top 64px、幅100%、opacity .92

#### 6. イベントスケジュール
- **影響**: P02（健一）・P04（雅人）のイベント参加判断。
- **実装指示**:
  - 5件のイベント。各 padding 32px 0、border-bottom .5px solid rgba(0,0,0,.05)
  - 日付: Helvetica 8px letter-spacing .15em color magenta opacity .4
  - タイトル: Georgia italic 15px opacity .65
  - 説明: 11px opacity .3
  - メタ: 7.5px opacity .2

#### 7. 年表（History）
- **影響**: P04（雅人）の信頼性判断。企業案件獲得。
- **実装指示**:
  - タイムライン: padding-left 36px、左線 .5px opacity .07
  - ドット: 4px、border .5px solid magenta opacity .3
  - 年: Georgia italic 18px opacity .2
  - テキスト: 11px opacity .28
  - 受賞: Helvetica 7.5px color aqua opacity .4
  - 主要年のみ6項目に絞る（2016, 2018, 2021, 2023, 2024, 2025）

---

### 🟡 P2：UX・情報設計

#### 8. ナビゲーション — 固定ヘッダー
- **実装指示**:
  - `position:fixed; top:0; z-index:1000`
  - スクロール時: `background:rgba(17,18,22,.88); backdrop-filter:blur(20px)`
  - ロゴ: Helvetica 9px letter-spacing .45em opacity .6
  - 右側: 「Menu」テキスト（SP）/ リンク一覧（PC 768px+）
  - モバイルメニュー: フルスクリーンオーバーレイ、Georgia italic 見出し

#### 9. FAQ — アコーディオン
- **影響**: P03（美紀）の不安解消。子連れ・撮影ルール。
- **実装指示**:
  - 5項目。クリックで開閉。max-height: 0 → 300px transition .4s
  - 質問: 13px opacity .55、アイコン: + / − 切替
  - 回答: 11.5px opacity .35 line-height 2.2
  - JS: toggleクラス `.open` で制御

#### 10. 来場特典 — タブ式在庫インジケーター
- **実装指示**:
  - マグカップ画像 → タイトル（Georgia italic 17px）→ 条件3行 → タブ式在庫
  - タブ: Week 1 / Week 2 / Week 3 切替（JSでコンテンツ切替）
  - 各週7日分（火曜は「—」表示）のグリッド
  - 色分け: 残30+→green(.6)、残15-29→amber(.6)、残14以下→red(.6)
  - ダミーデータ（JS生成）

#### 11. アクセス — Google Maps + 情報
- **実装指示**:
  - Google Maps iframe（grayscale filter）、aspect-ratio 16/9
  - 住所/アクセス/営業時間/連絡先: dt(7px .25em .15)/dd(11.5px .32)
  - バリアフリー: border-left 1px aqua opacity .25、背景 aqua opacity .03

#### 12. 規約・個人情報
- **実装指示**:
  - ダークセクション。各2行に圧縮。
  - font-size 10px、opacity .18
  - 「規約全文 →」テキストリンク

#### 13. フェードインアニメーション
- **実装指示**:
  - `.fade-in { opacity:0; transform:translateY(20px); transition: .7s }`
  - IntersectionObserver: threshold .1、rootMargin '0px 0px -40px 0px'
  - 連続要素は60msずつ遅延

---

### 🟢 P3：デザイン品質・ポリッシュ

#### 14. レスポンシブ（PC 768px+）
- **実装指示**:
  - `@media (min-width: 768px)` でPC対応
  - コンセプト/特典/アクセス/フォーム: 2カラムグリッド
  - ナビ: ハンバーガー → リンク一覧表示
  - ヒーロータイトル: font-size 72px
  - max-width: 1200px、padding: 0 60px
  - アーティストカード: flex 0 0 340px

#### 15. ヒーロー背景ビジュアル
- **実装指示**:
  - 折原柚衣作品（Orihara.jpg）を背景に
  - opacity .22、filter contrast(1.1)
  - グラデーションオーバーレイ: 上部→透明→下部#111216（5段階）
  - `background-size:cover; background-position: center 25%`

#### 16. 明暗交互レイアウト
- **実装指示**:
  - Dark: #111216
  - Light: #F5F5F6
  - Mist: #EEEEF0（特典・フォームセクション用）
  - 順序: Nav(dark)→Hero(dark)→Concept(light)→Artists(dark)→Benefit(mist)→Access(dark)→Schedule(light)→History(dark)→FAQ(light)→Terms(dark)→Form(mist)→FinalCTA(light)→Footer(dark)

#### 17. フォント読み込み
- **実装指示**:
  - Google Fonts: `Playfair+Display:ital,wght@0,300;0,400;1,300;1,400`
  - Google Fonts: `Shippori+Mincho:wght@300;400`
  - Google Fonts: `Outfit:wght@200;300;400`
  - `<link rel="preconnect">` 付き
  - フォールバック: Georgia / 'Hiragino Mincho Pro' / Helvetica

#### 18. モーダル（予約完了）
- **実装指示**:
  - フルスクリーンオーバーレイ opacity .92
  - 中央カード: max-width 420px、padding 40px、text-align center
  - チェックマーク → 「Reservation Complete」 → 予約番号 → 閉じるボタン
  - body overflow hidden

---

## 除外リスト

| 項目 | 除外理由 |
|------|----------|
| Google Apps Script連携（フォーム送信） | バックエンド未定。フロントのみでモーダル表示。後から差し替え可能な設計にする |
| GA4/タグマネージャー設置 | 未確認事項。コード上にコメントで挿入箇所を明記しておく |
| 実際のLINE/SNSリンク | URL未提供。href="#" で仮設置。コメントで差し替え箇所を明記 |
| OGP画像の生成 | メインビジュアル確定後に差し替え。meta tagのみ仮設置 |
| QRコード生成 | 実運用はバックエンド連携。モーダルにはテキスト表示のみ |
| PWA対応/Service Worker | 課題範囲外。LPとしての完成度を優先 |

---

## カラートークン一覧

```css
/* Backgrounds */
--bg-dark:    #111216;
--bg-light:   #F5F5F6;
--bg-mist:    #EEEEF0;
--bg-card:    #1A1B20;
--bg-form:    #FFFFFF;

/* Text (Dark sections) */
--text-d-1:   rgba(216,213,208,.9);    /* 見出し */
--text-d-2:   rgba(216,213,208,.6);    /* 小見出し */
--text-d-3:   rgba(216,213,208,.38);   /* 本文 */
--text-d-4:   rgba(216,213,208,.22);   /* サブ */
--text-d-5:   rgba(216,213,208,.12);   /* クレジット */

/* Text (Light sections) */
--text-l-1:   rgba(13,14,16,.8);       /* 見出し */
--text-l-2:   rgba(13,14,16,.6);       /* 小見出し */
--text-l-3:   rgba(13,14,16,.4);       /* 本文 */
--text-l-4:   rgba(13,14,16,.25);      /* サブ */
--text-l-5:   rgba(13,14,16,.12);      /* クレジット */

/* Accent */
--accent:     #8C3048;
--accent-btn: #6E2838;
--accent-text:rgba(140,56,72,.45);
--aqua:       rgba(58,167,201,.4);

/* Borders */
--border-d:   rgba(216,213,208,.07);
--border-l:   rgba(13,14,16,.06);
```

---

## フォントトークン一覧

```css
/* Display — 見出し・タイトル */
--f-display:  'Playfair Display', Georgia, serif;
/* weight: 300-400, style: italic */

/* Japanese — 本文・日本語見出し */
--f-jp:       'Shippori Mincho', 'Hiragino Mincho Pro', serif;
/* weight: 300-400 */

/* Sans — ラベル・UI・ナビ */
--f-sans:     'Outfit', 'Helvetica Neue', Helvetica, Arial, sans-serif;
/* weight: 200-400 */
```
