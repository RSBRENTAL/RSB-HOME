<?php

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

/*
 |---------------------------------------------------------------
 | OFFICIAL OPENING HOURS
 |---------------------------------------------------------------
 */
$morningOpens = '10:30';
$morningCloses = '13:30';
$afternoonOpens = '16:30';
$afternoonCloses = '20:00';
$timezone = new DateTimeZone('Europe/Madrid');
$now = new DateTimeImmutable('now', $timezone);
$today = $now->format('Y-m-d');
$morningOpenAt = new DateTimeImmutable($today . ' ' . $morningOpens, $timezone);
$morningCloseAt = new DateTimeImmutable($today . ' ' . $morningCloses, $timezone);
$afternoonOpenAt = new DateTimeImmutable($today . ' ' . $afternoonOpens, $timezone);
$afternoonCloseAt = new DateTimeImmutable($today . ' ' . $afternoonCloses, $timezone);
$isOpen = ($now >= $morningOpenAt && $now < $morningCloseAt)
    || ($now >= $afternoonOpenAt && $now < $afternoonCloseAt);

$allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
$dailyHours = $morningOpens . '–' . $morningCloses . ' and ' . $afternoonOpens . '–' . $afternoonCloses;
$openingHoursSpecification = [
    [
        '@type' => 'OpeningHoursSpecification',
        'dayOfWeek' => $allDays,
        'opens' => $morningOpens,
        'closes' => $morningCloses,
    ],
    [
        '@type' => 'OpeningHoursSpecification',
        'dayOfWeek' => $allDays,
        'opens' => $afternoonOpens,
        'closes' => $afternoonCloses,
    ],
];

$payload = [
    'ok' => true,
    'is_open' => $isOpen,
    'timezone' => $timezone->getName(),
    'current_time' => $now->format(DATE_ATOM),
    'daily' => $dailyHours,
    'morning' => $morningOpens . '–' . $morningCloses,
    'afternoon' => $afternoonOpens . '–' . $afternoonCloses,
    'morning_opens' => $morningOpens,
    'morning_closes' => $morningCloses,
    'afternoon_opens' => $afternoonOpens,
    'afternoon_closes' => $afternoonCloses,
    'openingHoursSpecification' => $openingHoursSpecification,
];

echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
