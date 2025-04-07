<?php
$questions = [
  [
    "flag" => "https://flagcdn.com/w320/kh.png",
    "options" => ["Peru", "Sudan", "Cambodia", "Brunei"],
    "answer" => "Cambodia"
  ],
  [
    "flag" => "https://flagcdn.com/w320/br.png",
    "options" => ["Brazil", "Mexico", "Portugal", "Italy"],
    "answer" => "Brazil"
  ],
  [
    "flag" => "https://flagcdn.com/w320/ca.png",
    "options" => ["Switzerland", "Canada", "Austria", "Denmark"],
    "answer" => "Canada"
  ],
  [
    "flag" => "https://flagcdn.com/w320/jp.png",
    "options" => ["South Korea", "China", "Japan", "Vietnam"],
    "answer" => "Japan"
  ],
  [
    "flag" => "https://flagcdn.com/w320/ng.png",
    "options" => ["Nigeria", "Ghana", "Ivory Coast", "Kenya"],
    "answer" => "Nigeria"
  ]
];

header('Content-Type: application/json');
echo json_encode($questions);
?>
