<?php
declare(strict_types=1);
if (!defined('EXIF_CONTACT_BOOTSTRAP')) {
    http_response_code(404);
    exit;
}

// Shared across sessions; no raw IP addresses or submitted message content stored.
// One bounded file per site, outside the document root, protected by an exclusive lock.
function reserveContactSend(array $config): bool
{
    $directory = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR)
        . DIRECTORY_SEPARATOR . 'exifframe-' . substr(hash('sha256', __DIR__), 0, 24);
    if (!is_dir($directory) && !@mkdir($directory, 0700) && !is_dir($directory)) {
        return false;
    }
    $handle = @fopen($directory . '/contact-limits.json', 'c+');
    if (!$handle) {
        return false;
    }
    if (!flock($handle, LOCK_EX)) {
        fclose($handle);
        return false;
    }
    try {
        $raw = stream_get_contents($handle);
        $records = $raw === '' ? [] : json_decode($raw, true);
        if (!is_array($records)) {
            return false;
        }
        $now = time();
        foreach ($records as $key => $times) {
            $records[$key] = array_values(array_filter((array)$times, static function ($time) use ($now) {
                return is_int($time) && $time > $now - 3600;
            }));
            if (!$records[$key]) {
                unset($records[$key]);
            }
        }
        // Do not trust caller-supplied X-Forwarded-For headers.
        $key = hash('sha256', __DIR__ . '|' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
        $times = $records[$key] ?? [];
        if (count($times) >= max(1, (int)($config['maximum_sends_per_hour'] ?? 10))
            || ($times && $now - max($times) < max(1, (int)$config['minimum_send_interval']))
            || (!isset($records[$key]) && count($records) >= 10000)) {
            return false;
        }
        $times[] = $now;
        $records[$key] = $times;
        $json = json_encode($records);
        rewind($handle);
        return $json !== false && ftruncate($handle, 0)
            && fwrite($handle, $json) === strlen($json) && fflush($handle);
    } finally {
        flock($handle, LOCK_UN);
        fclose($handle);
    }
}
