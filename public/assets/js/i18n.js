(() => {
  'use strict';
  const localeCodes = ['en', 'ko', 'es', 'zh-cn', 'pt-br'];
  const pathSegments = location.pathname.split('/').filter(Boolean).map(value => value.toLowerCase());
  // Live Server may serve the project below an extra folder such as
  // /photo-exifframe-beta-v2-v36/en/. Detect the locale anywhere in the path.
  const locale = pathSegments.find(segment => localeCodes.includes(segment)) || 'ja';
  const htmlLang = { ja: 'ja', en: 'en', ko: 'ko', es: 'es', 'zh-cn': 'zh-Hans', 'pt-br': 'pt-BR' }[locale];
  document.documentElement.lang = htmlLang;

  const words = {
    en: {
      '写真編集':'Photo editor','写真を追加':'Add photos','共有':'Share','写真を保存':'Save photos','一括ダウンロード':'Download all','写真一覧':'Photos','連動対象を全選択':'Select all linked','連動':'Linked','削除':'Delete','元サイズ':'Original','この写真を個別設定にする':'Edit separately','個別設定中':'Individual settings','詳細設定':'Settings','編集中のデザインを連動できます':'Apply one design to linked photos','写真を追加してください':'Add a photo','写真を追加すると設定を編集できます。':'Add a photo to start editing.','この写真は連動中です。':'This photo is linked.','この写真だけ個別設定にする':'Edit this photo separately','個別設定を編集中です。':'Editing individual settings.','変更はほかの写真へ反映されません。':'Changes will not affect other photos.','連動設定に戻す':'Return to linked settings','この設定を連動写真へ反映':'Apply to linked photos','フレーム・アイコン':'Frame & icon','文字・配置':'Text & layout','撮影情報':'Photo details','ハッシュタグ':'Hashtags','フレーム':'Frame','あり':'On','なし':'Off','フレーム色':'Frame color','黒':'Black','白':'White','文字色':'Text color','フォント':'Font','太字':'Bold','横書き':'Horizontal','縦書き':'Vertical','配置位置：':'Position:','文字左右位置：':'Text alignment:','左揃え':'Left','中央揃え':'Center','右揃え':'Right','上':'Top','下':'Bottom','上下':'Both','カメラ名':'Camera','メーカー名':'Maker','レンズ名':'Lens','F値':'Aperture','シャッタースピード':'Shutter speed','ISO感度':'ISO','焦点距離':'Focal length','保存する写真を選択':'Choose photos to save','共有する写真を選択':'Choose photos to share','全て選択':'Select all','キャンセル':'Cancel','選択した写真を保存':'Save selected','選択した写真を共有':'Share selected','前の写真':'Previous photo','次の写真':'Next photo','メニューを開く':'Open menu','写真を編集する':'Edit photos','初めての方へ':'Getting started','使い方':'Guide','よくある質問':'FAQ','このサイトについて':'About','お問い合わせ':'Contact','利用規約':'Terms','プライバシーポリシー':'Privacy','メニュー':'Menu','閉じる':'Close'
    },
    ko: {
      '写真編集':'사진 편집','写真を追加':'사진 추가','共有':'공유','写真を保存':'사진 저장','一括ダウンロード':'모두 다운로드','写真一覧':'사진 목록','連動対象を全選択':'연동 사진 모두 선택','連動':'연동','削除':'삭제','元サイズ':'원본 크기','この写真を個別設定にする':'이 사진만 개별 설정','個別設定中':'개별 설정 중','詳細設定':'상세 설정','編集中のデザインを連動できます':'연동 사진에 같은 디자인 적용','写真を追加してください':'사진을 추가해 주세요','写真を追加すると設定を編集できます。':'사진을 추가하면 설정을 편집할 수 있습니다.','この写真は連動中です。':'이 사진은 연동 중입니다.','この写真だけ個別設定にする':'이 사진만 개별 설정','個別設定を編集中です。':'개별 설정을 편집 중입니다.','変更はほかの写真へ反映されません。':'변경 사항은 다른 사진에 적용되지 않습니다.','連動設定に戻す':'연동 설정으로 돌아가기','この設定を連動写真へ反映':'연동 사진에 적용','フレーム・アイコン':'프레임 · 아이콘','文字・配置':'텍스트 · 배치','撮影情報':'촬영 정보','ハッシュタグ':'해시태그','フレーム':'프레임','あり':'사용','なし':'사용 안 함','フレーム色':'프레임 색상','黒':'검정','白':'흰색','文字色':'글자 색상','フォント':'글꼴','太字':'굵게','横書き':'가로쓰기','縦書き':'세로쓰기','配置位置：':'배치 위치:','文字左右位置：':'텍스트 정렬:','左揃え':'왼쪽','中央揃え':'가운데','右揃え':'오른쪽','上':'위','下':'아래','上下':'위아래','カメラ名':'카메라','メーカー名':'제조사','レンズ名':'렌즈','F値':'조리개','シャッタースピード':'셔터 속도','ISO感度':'ISO','焦点距離':'초점 거리','保存する写真を選択':'저장할 사진 선택','共有する写真を選択':'공유할 사진 선택','全て選択':'모두 선택','キャンセル':'취소','前の写真':'이전 사진','次の写真':'다음 사진','メニューを開く':'메뉴 열기','写真を編集する':'사진 편집','初めての方へ':'처음 사용하기','使い方':'사용법','よくある質問':'자주 묻는 질문','このサイトについて':'사이트 소개','お問い合わせ':'문의','利用規約':'이용약관','プライバシーポリシー':'개인정보 처리방침','メニュー':'메뉴','閉じる':'닫기'
    },
    es: {
      '写真編集':'Editor de fotos','写真を追加':'Añadir fotos','共有':'Compartir','写真を保存':'Guardar fotos','一括ダウンロード':'Descargar todo','写真一覧':'Fotos','連動対象を全選択':'Seleccionar todas las vinculadas','連動':'Vincular','削除':'Eliminar','元サイズ':'Original','この写真を個別設定にする':'Editar por separado','個別設定中':'Ajustes individuales','詳細設定':'Ajustes','編集中のデザインを連動できます':'Aplica el diseño a las fotos vinculadas','写真を追加してください':'Añade una foto','写真を追加すると設定を編集できます。':'Añade una foto para empezar a editar.','この写真は連動中です。':'Esta foto está vinculada.','この写真だけ個別設定にする':'Editar esta foto por separado','個別設定を編集中です。':'Editando ajustes individuales.','変更はほかの写真へ反映されません。':'Los cambios no afectarán a otras fotos.','連動設定に戻す':'Volver a ajustes vinculados','この設定を連動写真へ反映':'Aplicar a fotos vinculadas','フレーム・アイコン':'Marco e icono','文字・配置':'Texto y diseño','撮影情報':'Datos de la foto','ハッシュタグ':'Etiquetas','フレーム':'Marco','あり':'Sí','なし':'No','フレーム色':'Color del marco','黒':'Negro','白':'Blanco','文字色':'Color del texto','フォント':'Fuente','太字':'Negrita','横書き':'Horizontal','縦書き':'Vertical','配置位置：':'Posición:','文字左右位置：':'Alineación:','左揃え':'Izquierda','中央揃え':'Centro','右揃え':'Derecha','上':'Arriba','下':'Abajo','上下':'Ambos','カメラ名':'Cámara','メーカー名':'Fabricante','レンズ名':'Objetivo','F値':'Apertura','シャッタースピード':'Velocidad','ISO感度':'ISO','焦点距離':'Distancia focal','保存する写真を選択':'Elige fotos para guardar','共有する写真を選択':'Elige fotos para compartir','全て選択':'Seleccionar todo','キャンセル':'Cancelar','前の写真':'Foto anterior','次の写真':'Foto siguiente','メニューを開く':'Abrir menú','写真を編集する':'Editar fotos','初めての方へ':'Primeros pasos','使い方':'Guía','よくある質問':'Preguntas frecuentes','このサイトについて':'Acerca de','お問い合わせ':'Contacto','利用規約':'Términos','プライバシーポリシー':'Privacidad','メニュー':'Menú','閉じる':'Cerrar'
    },
    'zh-cn': {
      '写真編集':'照片编辑','写真を追加':'添加照片','共有':'分享','写真を保存':'保存照片','一括ダウンロード':'全部下载','写真一覧':'照片列表','連動対象を全選択':'选择全部联动照片','連動':'联动','削除':'删除','元サイズ':'原始尺寸','この写真を個別設定にする':'单独编辑此照片','個別設定中':'正在单独设置','詳細設定':'详细设置','編集中のデザインを連動できます':'将设计应用到联动照片','写真を追加してください':'请添加照片','写真を追加すると設定を編集できます。':'添加照片后即可编辑设置。','この写真は連動中です。':'此照片正在联动。','この写真だけ個別設定にする':'单独设置此照片','個別設定を編集中です。':'正在编辑单独设置。','変更はほかの写真へ反映されません。':'更改不会应用到其他照片。','連動設定に戻す':'恢复联动设置','この設定を連動写真へ反映':'应用到联动照片','フレーム・アイコン':'相框与图标','文字・配置':'文字与布局','撮影情報':'拍摄信息','ハッシュタグ':'话题标签','フレーム':'相框','あり':'开启','なし':'关闭','フレーム色':'相框颜色','黒':'黑色','白':'白色','文字色':'文字颜色','フォント':'字体','太字':'粗体','横書き':'横排','縦書き':'竖排','配置位置：':'位置：','文字左右位置：':'文字对齐：','左揃え':'左对齐','中央揃え':'居中','右揃え':'右对齐','上':'上方','下':'下方','上下':'上下','カメラ名':'相机','メーカー名':'制造商','レンズ名':'镜头','F値':'光圈','シャッタースピード':'快门速度','ISO感度':'ISO','焦点距離':'焦距','保存する写真を選択':'选择要保存的照片','共有する写真を選択':'选择要分享的照片','全て選択':'全选','キャンセル':'取消','前の写真':'上一张','次の写真':'下一张','メニューを開く':'打开菜单','写真を編集する':'编辑照片','初めての方へ':'入门','使い方':'使用指南','よくある質問':'常见问题','このサイトについて':'关于本站','お問い合わせ':'联系我们','利用規約':'使用条款','プライバシーポリシー':'隐私政策','メニュー':'菜单','閉じる':'关闭'
    },
    'pt-br': {
      '写真編集':'Editor de fotos','写真を追加':'Adicionar fotos','共有':'Compartilhar','写真を保存':'Salvar fotos','一括ダウンロード':'Baixar tudo','写真一覧':'Fotos','連動対象を全選択':'Selecionar todas vinculadas','連動':'Vincular','削除':'Excluir','元サイズ':'Original','この写真を個別設定にする':'Editar separadamente','個別設定中':'Configuração individual','詳細設定':'Configurações','編集中のデザインを連動できます':'Aplique o design às fotos vinculadas','写真を追加してください':'Adicione uma foto','写真を追加すると設定を編集できます。':'Adicione uma foto para começar a editar.','この写真は連動中です。':'Esta foto está vinculada.','この写真だけ個別設定にする':'Editar esta foto separadamente','個別設定を編集中です。':'Editando configuração individual.','変更はほかの写真へ反映されません。':'As alterações não afetarão outras fotos.','連動設定に戻す':'Voltar à configuração vinculada','この設定を連動写真へ反映':'Aplicar às fotos vinculadas','フレーム・アイコン':'Moldura e ícone','文字・配置':'Texto e layout','撮影情報':'Dados da foto','ハッシュタグ':'Hashtags','フレーム':'Moldura','あり':'Sim','なし':'Não','フレーム色':'Cor da moldura','黒':'Preto','白':'Branco','文字色':'Cor do texto','フォント':'Fonte','太字':'Negrito','横書き':'Horizontal','縦書き':'Vertical','配置位置：':'Posição:','文字左右位置：':'Alinhamento:','左揃え':'Esquerda','中央揃え':'Centro','右揃え':'Direita','上':'Acima','下':'Abaixo','上下':'Ambos','カメラ名':'Câmera','メーカー名':'Fabricante','レンズ名':'Lente','F値':'Abertura','シャッタースピード':'Velocidade','ISO感度':'ISO','焦点距離':'Distância focal','保存する写真を選択':'Escolha as fotos para salvar','共有する写真を選択':'Escolha as fotos para compartilhar','全て選択':'Selecionar tudo','キャンセル':'Cancelar','前の写真':'Foto anterior','次の写真':'Próxima foto','メニューを開く':'Abrir menu','写真を編集する':'Editar fotos','初めての方へ':'Primeiros passos','使い方':'Guia','よくある質問':'Perguntas frequentes','このサイトについて':'Sobre','お問い合わせ':'Contato','利用規約':'Termos','プライバシーポリシー':'Privacidade','メニュー':'Menu','閉じる':'Fechar'
    }
  };

  const settingsWords = {
    en:{'＋ 写真を追加':'＋ Add photos','0枚':'0 photos','選択した写真を削除':'Delete selected photos','フレーム（枠線・余白）設定：':'Frame and margin:','フレームあり':'Frame on','フレームなし':'Frame off','フレームカラー：':'Frame color:','ホワイト':'White','ブラック':'Black','アイコン':'Icon','機種名の横に表示できます':'Shown next to the camera name','＋ アイコンを追加':'＋ Add icon','PNG・JPEG・WebP（2MBまで）':'PNG, JPEG or WebP (up to 2 MB)','▼ アイコン位置・サイズを調整する':'▼ Adjust icon position and size','アイコンサイズ調整：':'Icon size:','左右位置：':'Horizontal position:','上下位置：':'Vertical position:','数値ボタンで微調整':'Fine-tune with the buttons','フォント選択：':'Font:','作品風：明朝体（おすすめ）':'Serif (recommended)','手書き風：教科書体':'Handwritten','ゴシック体（読みやすい）':'Sans serif','等幅（撮影情報向け）':'Monospace','丸ゴシック（やわらかい印象）':'Rounded sans serif','太字にする':'Bold','フレームなし時の文字色：':'Text color without frame:','灰':'Gray','文字方向：':'Text direction:','文字上下位置：':'Vertical text position:','上下両方':'Top and bottom','下部のみ':'Bottom only','上部のみ':'Top only','縦書きでは、右上・右下・左上・左下から配置を選べます。':'For vertical text, choose upper/lower left or right.','文字位置の微調整：':'Fine text positioning:','スマホ：1本指で移動し、表示された領域内で離すと配置位置へ吸着／2本指で文字サイズ変更／ダブルタップでリセット':'Phone: drag with one finger and release in a target to snap / pinch to resize / double-tap to reset','大きさ':'Size','左右':'Horizontal','文字位置を中央値に戻す':'Reset text position','詳細な文字色設定':'Detailed text colors','冒頭文字の色：':'Prefix color:','自動':'Auto','灰色':'Gray','機種名の色：':'Camera name color:','メーカー名の色：':'Maker color:','その他設定の色：':'Other details color:','機種':'Device','機種名：':'Camera model:','メーカー：':'Maker:','冒頭文字を表示':'Show prefix','撮影条件':'Exposure details','レンズモデル：':'Lens model:','F値：':'Aperture:','焦点距離：':'Focal length:','自動生成ハッシュタグ':'Generated hashtags','ハッシュタグをコピー':'Copy hashtags','写真に保存':'Save photos','ZIPでまとめて保存':'Save as ZIP','写真を選択':'Select photos','保存する写真を選んでください。':'Select the photos you want to save.','すべて選択':'Select all','選択した写真を削除しますか？':'Delete the selected photos?','右上':'Upper right','右下':'Lower right','左上':'Upper left','左下':'Lower left','さらに左':'Farther left','さらに右':'Farther right'},
    ko:{'＋ 写真を追加':'＋ 사진 추가','0枚':'0장','選択した写真を削除':'선택한 사진 삭제','フレーム（枠線・余白）設定：':'프레임과 여백:','フレームあり':'프레임 사용','フレームなし':'프레임 없음','フレームカラー：':'프레임 색상:','ホワイト':'흰색','ブラック':'검정','アイコン':'아이콘','機種名の横に表示できます':'카메라 이름 옆에 표시','＋ アイコンを追加':'＋ 아이콘 추가','PNG・JPEG・WebP（2MBまで）':'PNG, JPEG, WebP(최대 2MB)','▼ アイコン位置・サイズを調整する':'▼ 아이콘 위치와 크기 조정','アイコンサイズ調整：':'아이콘 크기:','左右位置：':'가로 위치:','上下位置：':'세로 위치:','数値ボタンで微調整':'버튼으로 미세 조정','フォント選択：':'글꼴:','作品風：明朝体（おすすめ）':'명조체(추천)','手書き風：教科書体':'손글씨체','ゴシック体（読みやすい）':'고딕체','等幅（撮影情報向け）':'고정폭 글꼴','丸ゴシック（やわらかい印象）':'둥근 고딕체','太字にする':'굵게','フレームなし時の文字色：':'프레임이 없을 때 글자 색상:','灰':'회색','文字方向：':'글자 방향:','文字上下位置：':'글자 상하 위치:','上下両方':'위아래 모두','下部のみ':'아래만','上部のみ':'위만','縦書きでは、右上・右下・左上・左下から配置を選べます。':'세로쓰기에서는 오른쪽/왼쪽 위아래 위치를 선택할 수 있습니다.','文字位置の微調整：':'글자 위치 미세 조정:','スマホ：1本指で移動し、表示された領域内で離すと配置位置へ吸着／2本指で文字サイズ変更／ダブルタップでリセット':'스마트폰: 한 손가락으로 이동 후 영역에서 놓으면 맞춤 / 두 손가락으로 크기 변경 / 두 번 탭해 초기화','大きさ':'크기','左右':'좌우','文字位置を中央値に戻す':'글자 위치 초기화','詳細な文字色設定':'세부 글자 색상','冒頭文字の色：':'접두어 색상:','自動':'자동','灰色':'회색','機種名の色：':'카메라 이름 색상:','メーカー名の色：':'제조사 색상:','その他設定の色：':'기타 정보 색상:','機種':'기기','機種名：':'카메라 모델:','メーカー：':'제조사:','冒頭文字を表示':'접두어 표시','撮影条件':'촬영 조건','レンズモデル：':'렌즈 모델:','F値：':'조리개:','焦点距離：':'초점 거리:','自動生成ハッシュタグ':'자동 생성 해시태그','ハッシュタグをコピー':'해시태그 복사','写真に保存':'사진 저장','ZIPでまとめて保存':'ZIP으로 저장','写真を選択':'사진 선택','保存する写真を選んでください。':'저장할 사진을 선택해 주세요.','すべて選択':'모두 선택','選択した写真を削除しますか？':'선택한 사진을 삭제할까요?','右上':'오른쪽 위','右下':'오른쪽 아래','左上':'왼쪽 위','左下':'왼쪽 아래','さらに左':'더 왼쪽','さらに右':'더 오른쪽'},
    es:{'＋ 写真を追加':'＋ Añadir fotos','0枚':'0 fotos','選択した写真を削除':'Eliminar fotos seleccionadas','フレーム（枠線・余白）設定：':'Marco y margen:','フレームあり':'Con marco','フレームなし':'Sin marco','フレームカラー：':'Color del marco:','ホワイト':'Blanco','ブラック':'Negro','アイコン':'Icono','機種名の横に表示できます':'Se muestra junto al nombre de la cámara','＋ アイコンを追加':'＋ Añadir icono','PNG・JPEG・WebP（2MBまで）':'PNG, JPEG o WebP (máx. 2 MB)','▼ アイコン位置・サイズを調整する':'▼ Ajustar posición y tamaño del icono','アイコンサイズ調整：':'Tamaño del icono:','左右位置：':'Posición horizontal:','上下位置：':'Posición vertical:','数値ボタンで微調整':'Ajuste preciso con los botones','フォント選択：':'Fuente:','作品風：明朝体（おすすめ）':'Serif (recomendada)','手書き風：教科書体':'Manuscrita','ゴシック体（読みやすい）':'Sans serif','等幅（撮影情報向け）':'Monoespaciada','丸ゴシック（やわらかい印象）':'Sans serif redondeada','太字にする':'Negrita','フレームなし時の文字色：':'Color sin marco:','灰':'Gris','文字方向：':'Dirección del texto:','文字上下位置：':'Posición vertical:','上下両方':'Arriba y abajo','下部のみ':'Solo abajo','上部のみ':'Solo arriba','縦書きでは、右上・右下・左上・左下から配置を選べます。':'En vertical, elige una esquina superior o inferior.','文字位置の微調整：':'Ajuste preciso del texto:','スマホ：1本指で移動し、表示された領域内で離すと配置位置へ吸着／2本指で文字サイズ変更／ダブルタップでリセット':'Móvil: arrastra con un dedo y suelta en una zona / pellizca para cambiar tamaño / doble toque para restablecer','大きさ':'Tamaño','左右':'Horizontal','文字位置を中央値に戻す':'Restablecer posición','詳細な文字色設定':'Colores detallados','冒頭文字の色：':'Color del prefijo:','自動':'Automático','灰色':'Gris','機種名の色：':'Color de cámara:','メーカー名の色：':'Color del fabricante:','その他設定の色：':'Color de otros datos:','機種':'Dispositivo','機種名：':'Modelo de cámara:','メーカー：':'Fabricante:','冒頭文字を表示':'Mostrar prefijo','撮影条件':'Datos de exposición','レンズモデル：':'Modelo de objetivo:','F値：':'Apertura:','焦点距離：':'Distancia focal:','自動生成ハッシュタグ':'Etiquetas generadas','ハッシュタグをコピー':'Copiar etiquetas','写真に保存':'Guardar fotos','ZIPでまとめて保存':'Guardar como ZIP','写真を選択':'Seleccionar fotos','保存する写真を選んでください。':'Selecciona las fotos que quieres guardar.','すべて選択':'Seleccionar todo','選択した写真を削除しますか？':'¿Eliminar las fotos seleccionadas?','右上':'Arriba derecha','右下':'Abajo derecha','左上':'Arriba izquierda','左下':'Abajo izquierda','さらに左':'Más a la izquierda','さらに右':'Más a la derecha'},
    'zh-cn':{'＋ 写真を追加':'＋ 添加照片','0枚':'0张','選択した写真を削除':'删除所选照片','フレーム（枠線・余白）設定：':'相框与边距：','フレームあり':'使用相框','フレームなし':'无相框','フレームカラー：':'相框颜色：','ホワイト':'白色','ブラック':'黑色','アイコン':'图标','機種名の横に表示できます':'显示在相机名称旁边','＋ アイコンを追加':'＋ 添加图标','PNG・JPEG・WebP（2MBまで）':'PNG、JPEG、WebP（最大2MB）','▼ アイコン位置・サイズを調整する':'▼ 调整图标位置和大小','アイコンサイズ調整：':'图标大小：','左右位置：':'水平位置：','上下位置：':'垂直位置：','数値ボタンで微調整':'使用按钮微调','フォント選択：':'字体：','作品風：明朝体（おすすめ）':'衬线字体（推荐）','手書き風：教科書体':'手写字体','ゴシック体（読みやすい）':'无衬线字体','等幅（撮影情報向け）':'等宽字体','丸ゴシック（やわらかい印象）':'圆体','太字にする':'粗体','フレームなし時の文字色：':'无相框时的文字颜色：','灰':'灰色','文字方向：':'文字方向：','文字上下位置：':'垂直位置：','上下両方':'上下均显示','下部のみ':'仅下方','上部のみ':'仅上方','縦書きでは、右上・右下・左上・左下から配置を選べます。':'竖排时可选择左上、左下、右上或右下。','文字位置の微調整：':'文字位置微调：','スマホ：1本指で移動し、表示された領域内で離すと配置位置へ吸着／2本指で文字サイズ変更／ダブルタップでリセット':'手机：单指拖动并在目标区域松开 / 双指调整大小 / 双击重置','大きさ':'大小','左右':'水平','文字位置を中央値に戻す':'重置文字位置','詳細な文字色設定':'详细文字颜色','冒頭文字の色：':'前缀颜色：','自動':'自动','灰色':'灰色','機種名の色：':'相机名称颜色：','メーカー名の色：':'制造商颜色：','その他設定の色：':'其他信息颜色：','機種':'设备','機種名：':'相机型号：','メーカー：':'制造商：','冒頭文字を表示':'显示前缀','撮影条件':'曝光信息','レンズモデル：':'镜头型号：','F値：':'光圈：','焦点距離：':'焦距：','自動生成ハッシュタグ':'自动生成话题标签','ハッシュタグをコピー':'复制话题标签','写真に保存':'保存照片','ZIPでまとめて保存':'保存为ZIP','写真を選択':'选择照片','保存する写真を選んでください。':'请选择要保存的照片。','すべて選択':'全选','選択した写真を削除しますか？':'删除所选照片吗？','右上':'右上','右下':'右下','左上':'左上','左下':'左下','さらに左':'更靠左','さらに右':'更靠右'},
    'pt-br':{'＋ 写真を追加':'＋ Adicionar fotos','0枚':'0 fotos','選択した写真を削除':'Excluir fotos selecionadas','フレーム（枠線・余白）設定：':'Moldura e margem:','フレームあり':'Com moldura','フレームなし':'Sem moldura','フレームカラー：':'Cor da moldura:','ホワイト':'Branco','ブラック':'Preto','アイコン':'Ícone','機種名の横に表示できます':'Exibido ao lado do nome da câmera','＋ アイコンを追加':'＋ Adicionar ícone','PNG・JPEG・WebP（2MBまで）':'PNG, JPEG ou WebP (até 2 MB)','▼ アイコン位置・サイズを調整する':'▼ Ajustar posição e tamanho do ícone','アイコンサイズ調整：':'Tamanho do ícone:','左右位置：':'Posição horizontal:','上下位置：':'Posição vertical:','数値ボタンで微調整':'Ajuste fino com os botões','フォント選択：':'Fonte:','作品風：明朝体（おすすめ）':'Serifada (recomendada)','手書き風：教科書体':'Manuscrita','ゴシック体（読みやすい）':'Sem serifa','等幅（撮影情報向け）':'Monoespaçada','丸ゴシック（やわらかい印象）':'Sem serifa arredondada','太字にする':'Negrito','フレームなし時の文字色：':'Cor sem moldura:','灰':'Cinza','文字方向：':'Direção do texto:','文字上下位置：':'Posição vertical:','上下両方':'Em cima e embaixo','下部のみ':'Somente embaixo','上部のみ':'Somente em cima','縦書きでは、右上・右下・左上・左下から配置を選べます。':'No texto vertical, escolha um canto superior ou inferior.','文字位置の微調整：':'Ajuste fino do texto:','スマホ：1本指で移動し、表示された領域内で離すと配置位置へ吸着／2本指で文字サイズ変更／ダブルタップでリセット':'Celular: arraste com um dedo e solte na área / faça pinça para redimensionar / toque duas vezes para redefinir','大きさ':'Tamanho','左右':'Horizontal','文字位置を中央値に戻す':'Redefinir posição','詳細な文字色設定':'Cores detalhadas','冒頭文字の色：':'Cor do prefixo:','自動':'Automático','灰色':'Cinza','機種名の色：':'Cor da câmera:','メーカー名の色：':'Cor do fabricante:','その他設定の色：':'Cor dos outros dados:','機種':'Dispositivo','機種名：':'Modelo da câmera:','メーカー：':'Fabricante:','冒頭文字を表示':'Mostrar prefixo','撮影条件':'Dados de exposição','レンズモデル：':'Modelo da lente:','F値：':'Abertura:','焦点距離：':'Distância focal:','自動生成ハッシュタグ':'Hashtags geradas','ハッシュタグをコピー':'Copiar hashtags','写真に保存':'Salvar fotos','ZIPでまとめて保存':'Salvar como ZIP','写真を選択':'Selecionar fotos','保存する写真を選んでください。':'Selecione as fotos que deseja salvar.','すべて選択':'Selecionar tudo','選択した写真を削除しますか？':'Excluir as fotos selecionadas?','右上':'Superior direito','右下':'Inferior direito','左上':'Superior esquerdo','左下':'Inferior esquerdo','さらに左':'Mais à esquerda','さらに右':'Mais à direita'}
  };
  const shortWords = {
    en:{'変更':'Change','機種名':'Camera name','選択した写真を保存':'Save selected photos'},
    ko:{'変更':'변경','機種名':'카메라 이름','選択した写真を保存':'선택한 사진 저장'},
    es:{'変更':'Cambiar','機種名':'Nombre de cámara','選択した写真を保存':'Guardar fotos seleccionadas'},
    'zh-cn':{'変更':'更改','機種名':'相机名称','選択した写真を保存':'保存所选照片'},
    'pt-br':{'変更':'Alterar','機種名':'Nome da câmera','選択した写真を保存':'Salvar fotos selecionadas'}
  };
  const statusWords = {
    en:{'選択したアイコン':'Selected icon','－ 連動停止中':'— Linking paused','削除対象を全選択':'Select all to delete','🗑 削除する写真を選択':'🗑 Select photos to delete','連動編集中':'Editing linked','個別編集中':'Editing individually','－ 反映なし':'— Not applied','連動中':'Linked','個別設定':'Individual','スマートフォンでは写真を最大20枚まで追加できます。':'You can add up to 20 photos on a phone.','大きな画像は端末負荷を抑える解像度へ自動調整しました。':'Large images were resized to reduce device load.','写真一覧を縮小':'Collapse photo list','写真一覧を広げる':'Expand photo list','画像が読み込まれていません。':'No image has been loaded.','保存したい写真を選んでください。':'Choose the photos to save.','共有したい写真を選んでください。':'Choose the photos to share.','画像を準備しています…':'Preparing images…'},
    ko:{'選択したアイコン':'선택한 아이콘','－ 連動停止中':'— 연동 일시 중지','削除対象を全選択':'삭제할 사진 모두 선택','🗑 削除する写真を選択':'🗑 삭제할 사진 선택','連動編集中':'연동 편집 중','個別編集中':'개별 편집 중','－ 反映なし':'— 적용 안 함','連動中':'연동 중','個別設定':'개별 설정','スマートフォンでは写真を最大20枚まで追加できます。':'스마트폰에서는 최대 20장까지 추가할 수 있습니다.','大きな画像は端末負荷を抑える解像度へ自動調整しました。':'기기 부하를 줄이도록 큰 이미지의 해상도를 조정했습니다.','写真一覧を縮小':'사진 목록 접기','写真一覧を広げる':'사진 목록 펼치기','画像が読み込まれていません。':'불러온 이미지가 없습니다.','保存したい写真を選んでください。':'저장할 사진을 선택해 주세요.','共有したい写真を選んでください。':'공유할 사진을 선택해 주세요.','画像を準備しています…':'이미지 준비 중…'},
    es:{'選択したアイコン':'Icono seleccionado','－ 連動停止中':'— Vinculación pausada','削除対象を全選択':'Seleccionar todas para eliminar','🗑 削除する写真を選択':'🗑 Elegir fotos para eliminar','連動編集中':'Edición vinculada','個別編集中':'Edición individual','－ 反映なし':'— Sin aplicar','連動中':'Vinculada','個別設定':'Individual','スマートフォンでは写真を最大20枚まで追加できます。':'En el móvil puedes añadir hasta 20 fotos.','大きな画像は端末負荷を抑える解像度へ自動調整しました。':'Las imágenes grandes se ajustaron para reducir la carga del dispositivo.','写真一覧を縮小':'Contraer lista','写真一覧を広げる':'Ampliar lista','画像が読み込まれていません。':'No se ha cargado ninguna imagen.','保存したい写真を選んでください。':'Elige las fotos que quieres guardar.','共有したい写真を選んでください。':'Elige las fotos que quieres compartir.','画像を準備しています…':'Preparando imágenes…'},
    'zh-cn':{'選択したアイコン':'已选图标','－ 連動停止中':'— 已暂停联动','削除対象を全選択':'全选要删除的照片','🗑 削除する写真を選択':'🗑 选择要删除的照片','連動編集中':'正在联动编辑','個別編集中':'正在单独编辑','－ 反映なし':'— 不应用','連動中':'联动中','個別設定':'单独设置','スマートフォンでは写真を最大20枚まで追加できます。':'手机端最多可添加20张照片。','大きな画像は端末負荷を抑える解像度へ自動調整しました。':'大图片已自动调整分辨率以减轻设备负担。','写真一覧を縮小':'收起照片列表','写真一覧を広げる':'展开照片列表','画像が読み込まれていません。':'尚未加载图片。','保存したい写真を選んでください。':'请选择要保存的照片。','共有したい写真を選んでください。':'请选择要分享的照片。','画像を準備しています…':'正在准备图片…'},
    'pt-br':{'選択したアイコン':'Ícone selecionado','－ 連動停止中':'— Vinculação pausada','削除対象を全選択':'Selecionar todas para excluir','🗑 削除する写真を選択':'🗑 Escolher fotos para excluir','連動編集中':'Edição vinculada','個別編集中':'Edição individual','－ 反映なし':'— Não aplicar','連動中':'Vinculada','個別設定':'Individual','スマートフォンでは写真を最大20枚まで追加できます。':'No celular, você pode adicionar até 20 fotos.','大きな画像は端末負荷を抑える解像度へ自動調整しました。':'Imagens grandes foram ajustadas para reduzir a carga do aparelho.','写真一覧を縮小':'Recolher lista','写真一覧を広げる':'Expandir lista','画像が読み込まれていません。':'Nenhuma imagem foi carregada.','保存したい写真を選んでください。':'Escolha as fotos que deseja salvar.','共有したい写真を選んでください。':'Escolha as fotos que deseja compartilhar.','画像を準備しています…':'Preparando imagens…'}
  };
  const dictionary = {...(words[locale] || {}), ...(settingsWords[locale] || {}), ...(shortWords[locale] || {}), ...(statusWords[locale] || {})};
  const translatePatterns = value => {
    const patterns = {
      en:[[/^(\d+)枚$/, '$1 photos'],[/^(\d+) \/ 20枚$/, '$1 / 20 photos'],[/^(\d+) \/ (\d+) 枚目$/, '$1 / $2'],[/^選択した(\d+)枚を削除$/, 'Delete $1 selected photos'],[/^選択した(\d*)枚を保存$/, 'Save $1 selected photos'],[/^選択した(\d*)枚を共有$/, 'Share $1 selected photos']],
      ko:[[/^(\d+)枚$/, '$1장'],[/^(\d+) \/ 20枚$/, '$1 / 20장'],[/^(\d+) \/ (\d+) 枚目$/, '$1 / $2'],[/^選択した(\d+)枚を削除$/, '선택한 $1장 삭제'],[/^選択した(\d*)枚を保存$/, '선택한 $1장 저장'],[/^選択した(\d*)枚を共有$/, '선택한 $1장 공유']],
      es:[[/^(\d+)枚$/, '$1 fotos'],[/^(\d+) \/ 20枚$/, '$1 / 20 fotos'],[/^(\d+) \/ (\d+) 枚目$/, '$1 / $2'],[/^選択した(\d+)枚を削除$/, 'Eliminar $1 fotos seleccionadas'],[/^選択した(\d*)枚を保存$/, 'Guardar $1 fotos'],[/^選択した(\d*)枚を共有$/, 'Compartir $1 fotos']],
      'zh-cn':[[/^(\d+)枚$/, '$1张'],[/^(\d+) \/ 20枚$/, '$1 / 20张'],[/^(\d+) \/ (\d+) 枚目$/, '$1 / $2'],[/^選択した(\d+)枚を削除$/, '删除所选$1张照片'],[/^選択した(\d*)枚を保存$/, '保存所选$1张'],[/^選択した(\d*)枚を共有$/, '分享所选$1张']],
      'pt-br':[[/^(\d+)枚$/, '$1 fotos'],[/^(\d+) \/ 20枚$/, '$1 / 20 fotos'],[/^(\d+) \/ (\d+) 枚目$/, '$1 / $2'],[/^選択した(\d+)枚を削除$/, 'Excluir $1 fotos selecionadas'],[/^選択した(\d*)枚を保存$/, 'Salvar $1 fotos'],[/^選択した(\d*)枚を共有$/, 'Compartilhar $1 fotos']]
    }[locale] || [];
    for (const [pattern,replacement] of patterns) if (pattern.test(value)) return value.replace(pattern,replacement);
    return value;
  };
  const translate = value => dictionary[value] || translatePatterns(value);
  const translateNode = root => {
    if (locale === 'ja') return;
    if (root.nodeType === Node.TEXT_NODE) {
      const raw = root.nodeValue;
      const trimmed = raw.trim();
      const translated = trimmed ? translate(trimmed) : trimmed;
      if (trimmed && translated !== trimmed) root.nodeValue = raw.replace(trimmed, translated);
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return;
    if (root.nodeType === Node.ELEMENT_NODE) {
      ['aria-label', 'title', 'placeholder'].forEach(attr => {
        const value = root.getAttribute(attr);
        if (value) root.setAttribute(attr, translate(value));
      });
    }
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) translateNode(walker.currentNode);
  };

  const localizedPath = target => {
    const parts = location.pathname.split('/').filter(Boolean);
    const localeIndex = parts.findIndex(part => localeCodes.includes(part.toLowerCase()));
    const requestedPage = parts.at(-1)?.includes('.') ? parts.at(-1) : 'index.html';
    const page = requestedPage === 'contact.html' ? 'contact.html' : requestedPage;
    const baseParts = localeIndex >= 0
      ? parts.slice(0, localeIndex)
      : parts.slice(0, page === 'index.html' && !parts.at(-1)?.includes('.') ? parts.length : -1);
    const route = [...baseParts];
    if (target !== 'ja') route.push(target);
    if (page !== 'index.html') route.push(page);
    return `/${route.join('/')}${page === 'index.html' && route.length ? '/' : ''}`;
  };

  const readPreference = () => { try { return localStorage.getItem('exifframe-language'); } catch { return null; } };
  const savePreference = value => { try { localStorage.setItem('exifframe-language', value); } catch { /* Navigation still works without storage. */ } };
  const languageHref = code => {
    const params = new URLSearchParams(location.search || '');
    params.set('lang', code); // Explicit choice still works if browser storage is blocked.
    return localizedPath(code) + '?' + params.toString() + (location.hash || '');
  };
  const addLanguageMenu = () => {
    const drawer = document.querySelector('.hamburger-menu-drawer') || document.querySelector('.mobile-menu');
    const desktop = document.querySelector('.site-header');
    [drawer, desktop].forEach((host, index) => {
      if (!host || host.querySelector('.language-picker')) return;
      const picker = document.createElement('div');
      picker.className = index === 1 ? 'language-picker language-picker-desktop' : 'language-picker';
      picker.setAttribute('translate', 'no');
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'language-trigger'; button.textContent = 'Language';
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-controls', `language-options-${index}`);
      const options = document.createElement('div');
      options.id = `language-options-${index}`; options.className = 'language-options'; options.hidden = true;
      const close = () => { options.hidden = true; button.setAttribute('aria-expanded', 'false'); };
      button.onclick = () => { options.hidden = !options.hidden; button.setAttribute('aria-expanded', String(!options.hidden)); };
      [['ja','日本語'],['en','English'],['ko','한국어'],['es','Español'],['zh-cn','简体中文'],['pt-br','Português (Brasil)']].forEach(([code,label]) => {
        const link = document.createElement('a');
        link.href = languageHref(code);
        link.lang = { 'zh-cn':'zh-Hans', 'pt-br':'pt-BR' }[code] || code;
        link.textContent = label;
        if (code === locale) link.setAttribute('aria-current', 'true');
        link.onclick = () => savePreference(code);
        options.append(link);
      });
      picker.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !options.hidden) { event.stopPropagation(); close(); button.focus(); }
      });
      document.addEventListener('click', event => { if (!picker.contains(event.target)) close(); });
      picker.append(button, options); host.append(picker);
    });
  };

  const autoLanguage = () => {
    const explicit = new URLSearchParams(location.search || '').get('lang');
    if (['ja', ...localeCodes].includes(explicit) && explicit === locale) savePreference(explicit);
    if (locale !== 'ja' || explicit === 'ja') return false;
    // Only redirect pages with translated counterparts. Never redirect a PHP form submission.
    const page = location.pathname.split('/').filter(Boolean).at(-1) || '';
    if (page.includes('.') && !['index.html','start.html','guide.html','faq.html','about.html','terms.html','privacy.html','contact.html'].includes(page)) return false;
    const saved = readPreference();
    const languages = navigator.languages?.length ? navigator.languages : [navigator.language || ''];
    const mapped = languages.map(tag => {
      const primary = tag.toLowerCase().split(/[-_]/)[0];
      return {ja:'ja',en:'en',ko:'ko',es:'es',zh:'zh-cn',pt:'pt-br'}[primary];
    }).find(Boolean);
    const target = ['ja', ...localeCodes].includes(saved) ? saved : mapped || 'en';
    if (target === 'ja') return false;
    const params = new URLSearchParams(location.search || '');
    params.delete('lang');
    const query = params.toString();
    location.replace(localizedPath(target) + (query ? '?' + query : '') + (location.hash || ''));
    return true;
  };

  document.addEventListener('DOMContentLoaded', () => {
    if (autoLanguage()) return;
    translateNode(document.body); addLanguageMenu();
    if (locale !== 'ja') new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(translateNode))).observe(document.body,{childList:true,subtree:true});
  });
  const mobileCopy = {
    '比率': ['Ratio','비율','Formato','比例','Formato'],
    '保存': ['Save','저장','Guardar','保存','Salvar'],
    '個別': ['Solo','개별','Individual','单独','Individual'],
    '個別設定に切り替える': ['Edit this photo separately','이 사진을 개별 설정으로 전환','Editar esta foto por separado','单独编辑此照片','Editar esta foto separadamente'],
    '写真を選んで保存・共有': ['Select photos, then save or share','사진을 선택한 후 저장 또는 공유','Selecciona fotos y guarda o comparte','选择照片后保存或分享','Selecione as fotos e salve ou compartilhe'],
    'この写真の個別設定を解除し、現在の連動設定を適用しますか？': ['Replace this photo’s individual settings with the linked settings?','이 사진의 개별 설정을 현재 연동 설정으로 바꿀까요?','¿Reemplazar los ajustes individuales por los vinculados?','要用联动设置替换此照片的单独设置吗？','Substituir os ajustes individuais pelos vinculados?'],
    'この写真を連動設定に戻しますか？': ['Link this photo again?','이 사진을 다시 연동할까요?','¿Volver a vincular esta foto?','要重新联动此照片吗？','Vincular esta foto novamente?'],
    'この写真の設定を、現在連動中の写真へ反映しますか？': ['Apply these settings to all linked photos?','이 설정을 모든 연동 사진에 적용할까요?','¿Aplicar estos ajustes a todas las fotos vinculadas?','要将此设置应用到所有联动照片吗？','Aplicar estes ajustes a todas as fotos vinculadas?'],
    'この写真を個別設定にしました。': ['This photo now has individual settings.','이 사진을 개별 설정으로 전환했습니다.','Esta foto tiene ajustes individuales.','已将此照片切换为单独设置。','Esta foto agora tem ajustes individuais.'],
    '連動設定に戻しました。': ['Linked settings restored.','연동 설정으로 돌아갔습니다.','Ajustes vinculados restaurados.','已恢复联动设置。','Ajustes vinculados restaurados.'],
    'この写真の設定を連動写真へ反映しました。': ['Settings applied to linked photos.','연동 사진에 설정을 적용했습니다.','Ajustes aplicados a las fotos vinculadas.','已将设置应用到联动照片。','Ajustes aplicados às fotos vinculadas.'],
    'iPhoneでは次の共有画面で「画像を保存」を選ぶと写真アプリへ保存できます。': ['On iPhone, choose Save Image in the share sheet to save to Photos.','iPhone에서는 공유 화면에서 이미지 저장을 선택하면 사진 앱에 저장됩니다.','En iPhone, elige Guardar imagen en el menú de compartir para guardar en Fotos.','在iPhone分享菜单中选择存储图像，即可保存到照片应用。','No iPhone, escolha Salvar Imagem no menu de compartilhamento para salvar no app Fotos.'],
    'InstagramやTikTokが対応している場合、端末の共有先に表示されます。': ['Instagram or TikTok may appear in your device’s share options if supported.','지원되는 경우 기기 공유 목록에 Instagram이나 TikTok이 표시됩니다.','Instagram o TikTok pueden aparecer entre las opciones compatibles del dispositivo.','如果设备支持，Instagram或TikTok会显示在分享选项中。','Instagram ou TikTok podem aparecer nas opções compatíveis de compartilhamento.'],
    '共有画面で「画像を保存」を選んでください。': ['Choose Save Image in the share sheet.','공유 화면에서 이미지 저장을 선택하세요.','Elige Guardar imagen en el menú de compartir.','请在分享菜单中选择存储图像。','Escolha Salvar Imagem no menu de compartilhamento.'],
    'このブラウザでは共有機能を利用できません。': ['Sharing is unavailable in this browser.','이 브라우저에서는 공유를 사용할 수 없습니다.','No se puede compartir en este navegador.','此浏览器无法使用分享功能。','O compartilhamento não está disponível neste navegador.'],
    'この端末では複数画像を一度に共有できません。1枚ずつ選択してください。': ['This device cannot share multiple images at once. Select one photo.','이 기기는 여러 이미지를 한 번에 공유할 수 없습니다. 한 장씩 선택하세요.','Este dispositivo no puede compartir varias imágenes a la vez. Elige una foto.','此设备无法一次分享多张图片，请每次选择一张。','Este aparelho não compartilha várias imagens de uma vez. Selecione uma foto.'],
    'この端末では画像ファイルを共有できません。': ['This device cannot share image files.','이 기기는 이미지 파일을 공유할 수 없습니다.','Este dispositivo no puede compartir archivos de imagen.','此设备无法分享图片文件。','Este aparelho não pode compartilhar arquivos de imagem.'],
    '写真を保存しました。': ['Photo saved.','사진을 저장했습니다.','Foto guardada.','照片已保存。','Foto salva.'],
    '共有を開始できませんでした。': ['Could not start sharing.','공유를 시작하지 못했습니다.','No se pudo iniciar el envío.','无法开始分享。','Não foi possível iniciar o compartilhamento.'],
    '写真を保存できませんでした。': ['Could not save the photo.','사진을 저장하지 못했습니다.','No se pudo guardar la foto.','无法保存照片。','Não foi possível salvar a foto.']
  };
  const copyIndex = ['en','ko','es','zh-cn','pt-br'].indexOf(locale);
  if (copyIndex >= 0) for (const [key, values] of Object.entries(mobileCopy)) dictionary[key] = values[copyIndex];
  // Thumbnail copy is deliberately shorter than full settings labels.
  const filmstripLabels = {
    ja: ['編集中', '個別編集中', '連動', '個別', '— 停止', '写真一覧'],
    en: ['Editing', 'Editing · solo', 'Linked', 'Solo', '— Paused', 'Photos'],
    ko: ['편집 중', '개별 편집', '연동', '개별', '— 중지', '사진 목록'],
    es: ['Editando', 'Edición · solo', 'Vinculada', 'Individual', '— Pausa', 'Fotos'],
    'zh-cn': ['编辑中', '单独编辑', '联动', '单独', '— 暂停', '照片列表'],
    'pt-br': ['Editando', 'Edição · solo', 'Vinculada', 'Individual', '— Pausa', 'Fotos']
  }[locale];
  const filmstripKeys = ['editing', 'editingSolo', 'linked', 'solo', 'paused', 'photos'];
  const filmstripLabel = key => filmstripLabels[filmstripKeys.indexOf(key)] || key;
  // Also cover legacy dynamically inserted labels, including delete mode.
  Object.assign(dictionary, {
    '編集中': filmstripLabel('editing'),
    '連動編集中': filmstripLabel('editing'),
    '個別編集中': filmstripLabel('editingSolo')
  });
  window.ExifI18n = { locale, translate, localizedPath, filmstripLabel };
})();
