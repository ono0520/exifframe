# exifframe

exifframe.net のサイト一式。

## 構成
- `public/` … サーバー（ロリポップの `/exifframe.net/`）に置く公開ファイル一式

## サーバーへの反映
GitHubの Actions →「ロリポップに反映」→ Run workflow。最初は dry_run にチェックを入れたまま実行して差分を確認し、問題なければ外して main から実行する。サーバーにしかないファイルは消さない。
必要なSecrets（Settings → Secrets and variables → Actions）: `FTP_SERVER` / `FTP_USERNAME` / `FTP_PASSWORD`（SENDAIPLUSと同じ値）
