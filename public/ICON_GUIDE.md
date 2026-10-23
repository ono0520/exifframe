# アイコン画像の保管・差し替え・追加

## 使われているファイル

| 用途 | ファイル |
| --- | --- |
| サイト左上 | `assets/images/brand/site-icon.svg` |
| 写真用・赤 | `assets/images/brand/exif-red.svg` |
| 写真用・白／黒文字 | `assets/images/brand/exif-white.svg` |
| 写真用・黒／白文字 | `assets/images/brand/exif-black.svg` |
| 写真用・青／白文字 | `assets/images/brand/exif-blue.svg` |
| 選択肢の登録 | `assets/js/brand-icons.js` |
| 選択画面の処理 | `assets/js/icon-picker.js` |
| 表示サイズ・デザイン | `assets/css/brand.css` |

配信用SVGは画像を内部に埋め込んだ自己完結型です。外形以外を透明にするクリップを含みます。
`assets/images/brand/sources/` は制作元のPNGです。背景の確認模様を含むため、サイトや写真への表示には上表のSVGを使用してください。

## 同じアイコンを差し替える

上表と同じ名前の自己完結型SVGに置き換えると、ページ側を編集せずに反映できます。
反映されない場合はブラウザのキャッシュを更新してください。
外部画像・フォントを参照するSVGは避け、文字はアウトライン化してください。

写真用にPNGやWebPを使う場合は、透明背景の正方形画像をbrandフォルダに置き、
`assets/js/brand-icons.js` の該当する `src` を `../images/brand/新しい名前.png` へ変更します。
表示名は `label` に各言語で記載します。画像には文字も含めて書き出してください。

サイト用をPNGへ変える場合は、HTML/PHP内と `tools/generate-locales.mjs` 内の
`assets/images/brand/site-icon.svg` を新しいパスへ置き換えてください。
`../` など各ページからの相対パスは維持します。

## 写真用アイコンを追加する

1. 正方形・透明背景のPNG/WebP、または自己完結型SVGを `assets/images/brand/` へ保存。
2. `assets/js/brand-icons.js` の配列の最後に、カンマで区切って次のような項目を追加。

```js
{ id: 'custom-gold', src: '../images/brand/exif-gold.png',
  label: { ja:'金', en:'Gold', ko:'금색', es:'Dorado', 'zh-cn':'金色', 'pt-br':'Dourado' } }
```

3. 画像とJSをアップロード。6言語のページで選択肢に自動追加されます。
4. 一枚の写真に追加し、表示、色、保存した写真への描画を確認してください。

`id` は重複しない英数字にします。`src` はこのJSファイルからの相対パスです。
登録するファイルは同じサイト内に置いてください。通常は512px程度の画像で十分です。
既定アイコンと別に「自分の画像を追加」も利用できます（PNG/JPEG/WebP、2MBまで）。

## 画像取り込み時の通知について

今回削除したのは「大きな画像は端末負荷を抑える解像度へ自動調整しました。」の通知のみです。
従来の長辺上限（スマホ2560px／PC4096px）と、縮小時のJPEG変換処理は維持しています。
この処理はプレビュー専用ではなく出力元の画像にも適用されます。元画像と同じ画素数・画質を保証する変更ではありません。
非対応形式や読み込み失敗など、操作に必要なエラー表示は残しています。
