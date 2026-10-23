/*
 * TOPページへ表示する写真をここへ登録してください。
 * src: assets/images/top 内のファイルパス
 * ExifFrameで書き出した完成写真をそのまま登録できます。
 * 横長・縦長は自動判定され、トリミングせず全体を表示します。
 * position: 通常は省略可。表示位置を変える場合のみ指定します。
 * 自動切替時間はミリ秒で指定します（6000 = 6秒）。
 */
window.TOP_PAGE_PHOTO_INTERVAL = 6000;

window.TOP_PAGE_PHOTOS = [
    { src: 'assets/images/top/photo_01.jpg', alt: '雲の中を飛行する飛行機を撮影したExifFrameの作例写真' },
    { src: 'assets/images/top/photo_02.jpg', alt: '花の咲く路地を歩く子どもを撮影した縦位置のExifFrame作例写真' },
    { src: 'assets/images/top/photo_03.jpg', alt: '街角の赤い郵便ポストを撮影した縦位置のExifFrame作例写真' },
    { src: 'assets/images/top/photo_04.jpg', alt: '緑のシダを撮影したExifFrameの作例写真' }
];
