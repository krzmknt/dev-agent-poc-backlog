# Moltbot 調査レポート

調査日: 2025-02-06

## 概要

**Moltbot** (現 **OpenClaw**) は、Cloudflare が開発したパーソナルAIアシスタントで、複数のチャットプラットフォームに接続できるゲートウェイアーキテクチャを持つ。

### 名前の変遷
- Clawdbot → Moltbot → **OpenClaw**

## 主要リポジトリ

### 1. cloudflare/moltworker
- **URL**: https://github.com/cloudflare/moltworker
- **概要**: OpenClaw を Cloudflare Workers (Sandbox) 上で動作させるプロジェクト
- **スター数**: 7,874 ⭐
- **言語**: TypeScript
- **ライセンス**: Apache 2.0

#### 主な機能
- **Control UI**: Webベースのチャットインターフェース
- **マルチチャンネル対応**: Telegram, Discord, Slack
- **デバイスペアリング**: 明示的な承認が必要なセキュアなDM認証
- **永続的な会話**: セッション間でのチャット履歴とコンテキストの保持
- **エージェントランタイム**: ワークスペースとスキルによる拡張可能なAI機能

#### 技術スタック
- Cloudflare Workers + Sandbox
- Hono (Webフレームワーク)
- React 19
- Vite
- Cloudflare Puppeteer (ブラウザ操作)
- Jose (JWT処理)

#### 必要要件
- Workers Paid プラン ($5/月)
- Anthropic API キー (Claude用)

#### オプション機能
- Cloudflare Access (認証)
- Browser Rendering (ブラウザナビゲーション)
- AI Gateway (APIルーティング/分析)
- R2 Storage (永続化)

---

### 2. krzmknt/moltbot-cfn-launcher
- **URL**: https://github.com/krzmknt/moltbot-cfn-launcher
- **概要**: AWS EC2 上に Moltbot をワンコマンドでデプロイするツール

#### 主な特徴
- 🚀 CloudFormation によるワンライナーデプロイ
- 🔒 インバウンドポートゼロ (Session Manager のみ)
- 💰 約$14/月 (t4g.small + EBS)
- 🤖 Discord 統合対応
- 📦 S3 への自動バックアップ
- 📊 CloudWatch によるログ・監視

#### アーキテクチャ
```
VPC
└── Public Subnet
    └── EC2 (Moltbot on systemd)
        ├── Discord Bot
        ├── Claude API
        └── Web Dashboard

External Services:
├── Secrets Manager
├── S3 (Backup)
└── CloudWatch (Logs)
```

#### インスタンスオプション
| タイプ | vCPU | RAM | 用途 |
|--------|------|-----|------|
| t4g.micro | 2 | 1GB | テスト |
| t4g.small | 2 | 2GB | 推奨 |
| t4g.medium | 2 | 4GB | 標準 |
| t4g.large | 2 | 8GB | マルチエージェント |

#### セキュリティレベル
- **Normal**: 基本セキュリティ (SSM, 暗号化EBS, ポートなし)
- **High**: + VPC Flow Logs, CloudTrail
- **Highest**: + Private Subnet, NAT Gateway, VPC Endpoints, GuardDuty

---

## 比較: Cloudflare vs AWS デプロイ

| 項目 | cloudflare/moltworker | krzmknt/moltbot-cfn-launcher |
|------|----------------------|------------------------------|
| プラットフォーム | Cloudflare Workers | AWS EC2 |
| 月額コスト | $5~ | $14~ |
| デプロイ方法 | npm deploy | CloudFormation |
| スケール | サーバーレス | インスタンスベース |
| 永続化 | R2 (オプション) | EBS + S3 バックアップ |
| 管理負担 | 低 | 中 |

---

## 関連リンク
- [OpenClaw 公式](https://github.com/openclaw/openclaw)
- [Cloudflare Blog](https://blog.cloudflare.com/moltworker-self-hosted-ai-agent/)
- [Moltbot ドキュメント](https://docs.molt.bot)
