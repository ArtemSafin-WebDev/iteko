<?
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
    die();
}

return [
    'css' => [
        "./build/css/styles.min.css",
    ],
    'js' => [
        "./build/assets/js/ie11CustomProperties.js",
        "./build/js/app.js",
        "./build/assets/js/jquery.form.min.js",
        "./build/assets/js/backend.js",
        /*"https://api-maps.yandex.ru/2.1/?apikey=0e89b5e9-04ad-4f20-a1a5-c6102dbb6ad8
&lang=ru_RU",
        "./build/assets/js/map.js",*/
    ],
    'rel' => [
        'jquery3'
    ]
];