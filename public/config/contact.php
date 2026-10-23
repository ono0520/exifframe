<?php
declare(strict_types=1);
if (!defined('EXIF_CONTACT_BOOTSTRAP')) {
    http_response_code(404);
    exit;
}

return [
    // ロリポップ側で、このメールアドレスを作成してから公開してください。
    'recipient' => 'info@exifframe.net',
    'from' => 'info@exifframe.net',
    'site_name' => 'ExifFrame',
    'auto_reply' => true,
    'minimum_send_interval' => 30,
    'maximum_sends_per_hour' => 10,
];
