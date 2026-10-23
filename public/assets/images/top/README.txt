TOPページ用の作例写真フォルダです。

1. JPEG、PNG、WebP形式の写真をこのフォルダへ入れてください。
2. assets/js/top-photos.js の TOP_PAGE_PHOTOS 配列へファイル名と表示情報を追加してください。
3. ページを開くたびに、登録した写真から1枚がランダムで選ばれます。

例:
{ src: 'assets/images/top/photo-01.jpg', alt: '海辺の作例写真', title: 'Shot on α7 IV · SONY', detail: '35mm · f/2.0 · ISO 100', fit: 'cover', position: 'center' }

表示調整:
- fit: 'cover'  写真枠いっぱいに表示します。縦横比によって一部がトリミングされます。
- fit: 'contain' 写真全体を枠内へ収めます。
- position: 'center' または '50% 30%' などで、cover時の中心位置を調整できます。

推奨:
- 長辺1600〜2400px程度
- WebPまたは品質80〜90程度のJPEG
- ファイル名には半角英数字、ハイフン、アンダースコアを使用
