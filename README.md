# ブロック崩しゲーム (TypeScript + React + Storybook)

React 18とTypeScriptで構築されたブロック崩しゲームです。機能別のモジュラーアーキテクチャを採用しています。

## デモプレイ
https://yunbow.github.io/react-game-breakout/demo/

## 主要機能
### 操作方法
- **← →キー**: パドルを移動
- **スペースキー**: ゲーム開始
- **Pキー**: ポーズ/再開
- **マウス**: パドルを移動（ゲーム中）
- **タッチ**: パドルを移動、ゲーム開始

## ゲームルール
1. パドルでボールを跳ね返してブロックを破壊
2. 全ブロック破壊でクリア
3. ボールを落とすと残機-1
4. 残機0でゲームオーバー
5. ブロック破壊で10点獲得

### ゲーム要素
- 多段階ブロック（1〜3の耐久値、色で判別）
- ボール物理演算（反射、衝突判定）
- パドル操作（キーボード、マウス、タッチ）
- スコアシステム
- ライフシステム（残機3）
- ポーズ機能

## 技術スタック
- **React 18** - UIライブラリ
- **TypeScript** - プログラミング言語
- **Storybook 7** - コンポーネント開発・ドキュメント
- **CSS Modules** - スタイリング
- **Vite** - ビルドツール

## プロジェクト構造

```
src/
├── features/                     # 機能別モジュール
│   └── breakout-game/             # ブロック崩しゲーム機能
│       ├── components/            # 機能専用コンポーネント
│       │   ├── GameControls/      # ゲーム操作UI
│       │   └── GameRenderer/      # ゲーム描画ロジック
│       ├── BreakoutGameApp/       # 機能ルートコンポーネント
│       ├── useGameLoop.ts         # ゲームループフック
│       ├── useGameControls.ts     # 入力制御フック
│       ├── types.ts               # 機能固有の型定義
│       └── gameLogic.ts           # ゲームロジック
├── components/                   # 共通UIコンポーネント
│   ├── Button/                   # 操作ボタン
│   ├── Canvas/                   # ゲーム描画キャンバス
│   └── Text/                     # テキスト表示
├── stories/                      # Storybook用ストーリー
├── Config.ts                     # ゲーム設定値
├── App.tsx                       # メインアプリ
└── main.tsx                      # エントリーポイント
```

## スクリプト

```bash
# セットアップ
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview

# Storybook起動
npm run storybook

# Storybook ビルド
npm run build-storybook
```

## ライセンス

MIT License