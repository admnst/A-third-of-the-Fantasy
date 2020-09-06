<!DOCTYPE html>
<html lang="zn">

<head>
    <meta charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="static/css/bootstrap.min.css">
    <title>三分幻想</title>
</head>

<body class="container-lg">
    <div class="pos-f-t fixed-top bg-white container-lg" id="accordion">
        <nav class="navbar navbar-light bg-white" style="padding:0.1rem 1rem 0.1rem 1rem">
            <a class="navbar-brand text-primary text-truncate col-5" data-toggle="collapse" href="#collapsea" role="button" aria-expanded="false" aria-controls="collapsea" id="a_top" style="margin-left:-16px;"></a>
            <div class="form-inline my-0" style="margin-right:-15px;">
                <span onclick="query('','personal')" class="btn-light btn-sm"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg></span>
                <span onclick="query()" class="btn-light btn-sm"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg></span>
                <span onclick="query(a,'refresh')" class="btn-light btn-sm"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-refresh-cw">
                        <polyline points="23 4 23 10 17 10"></polyline>
                        <polyline points="1 20 1 14 7 14"></polyline>
                        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                    </svg></span>
                <button class="btn btn-sm border" data-toggle="collapse" data-target="#collapseb" aria-expanded="false" aria-controls="collapseb">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-feather">
                        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                        <line x1="16" y1="8" x2="2" y2="22"></line>
                        <line x1="17.5" y1="15" x2="9" y2="15"></line>
                    </svg>
                </button>
            </div>
        </nav>
        <div class="collapse text-right" data-parent="#accordion" id="collapseb">
            <div class="form-group">
                <input type="text" class="create form-control" id="a" placeholder="fantasy">
            </div>
            <br>
            <div class="form-group">
                <textarea class="create form-control" id="b" rows="3"></textarea>
            </div>
            <button class="btn btn-primary" onclick="create()">create</button>
        </div>
        <div class="collapse text-right" data-parent="#accordion" id="collapsea">
            <div class="form-group">
                <input type="text" class="form-control" id="input_query" placeholder="fantasy">
            </div>
            <br>
            <button class="btn btn-primary" onclick="query(document.getElementById('input_query').value||'fantasy','force')">query</button>
        </div>
    </div>
    <div style="margin-top:45px" id="div_card">
        <div class="card bg-light">
            <div class="card-header text-primary" id="as"></div>
            <div class="card-body" id="div_query" style="margin-top:-15px;"></div>
        </div>
        <div class="card-footer text-muted text-right" style="height:32px;margin-top:-3px;padding:0" id="div_skip">
            <a class="btn btn-sm text-primary" href="http://www.beian.miit.gov.cn" style="font-size:6px;margin-right:4px;margin-bottom: -4px;">豫ICP备18001086号</a>
            <button class="btn btn-light btn-sm" onclick="show_id_edit()">more</button>
            <button class="btn btn-light btn-sm" data-toggle="modal" data-target="#exampleModalLong">about</button>
            <a class="btn btn-sm" href="https://www.ted.com"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="16" viewBox="-17.49 -3.308 71.607 26.572">
                    <path d="M-17.49 3.772h6.893v19.41h8.64V3.772h6.91v-7.08H-17.49v7.08zM5.869 23.264h22.464v-7.066H14.448v-2.686l13.885.011V6.487H14.448V3.788l13.885-.009v-7.086H5.869v26.571zM42.413-3.308H29.195v26.489H40.85c9.051 0 13.267-5.173 13.267-13.311-.001-6.687-3.053-13.178-11.704-13.178zm-2 19.732h-3.359V3.392h2.778c5.779 0 6.289 4.696 6.289 6.368 0 2.489-.728 6.664-5.708 6.664z" fill="#ed1c24" /></svg></a>
            <a class="btn btn-sm" href="https://github.com/bghuan/fantasy">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                    </path>
                </svg></a>
        </div>
    </div>
    <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-body"></div>
            </div>
        </div>
    </div>
    <div style="display:none;" id="addid" class="text-right">
        <!-- <textarea class="form-control" name="" id="af" cols="10" rows="10" placeholder=""></textarea>
        <button class="btn btn-primary" onclick="query_id()">查看历史id</button>
        <button class="btn btn-primary" onclick="update_id()">保存并更新个人拥有id</button> -->
        <a class="btn btn-primary btn-sm" href="static/android/fantasy.apk">app下载</a>
        <a class="btn btn-primary btn-sm" href="static/html/fangyuan.html">左手画圆右手画方</a>
        <a class="btn btn-primary btn-sm" href="static/html/rtc/index.html">视频通话</a>
        <button class="btn btn-primary btn-sm" onclick="login()">GitHub登录</button>
        <a class="btn btn-primary btn-sm" href="static/html/socket.html">Websocket</a>
    </div>
    <script src="static/js/bootstrap.min.js?d"></script>
    <script src="static/js/index.js?ff"></script>
    <?php
    include 'php/config.php';
    $cmd = new MongoDB\Driver\Command([
        'aggregate' => $db_document,
        'pipeline' => [
            ['$match' => ['a' => ['$exists' => true], 'b' => ['$exists' => true, '$nin' =>  [null, '', [], [''], [[]]]]]],
            ['$group' => ['_id' => '$b', 'a' =>  ['$first' => '$a'], 'id_temp' => ['$first' => '$_id']]],
            ['$sort' => ['id_temp' => -1]],
            ['$project' => ['_id' => '$id_temp', 'a' => '$a', 'b' => '$_id']]
        ],
        'cursor' => new stdClass,
    ]);
    try {
        $json = json_encode($manager->executeCommand($db_name, $cmd)->toArray());
        // echo gzencode($json);
        echo '<script>let json = ' . $json . ';queryCallBack(json);isPhp=true;</script>';
    } catch (MongoDB\Driver\Exception $e) {
        echo $e->getMessage(), "\n";
    }
    ?>
    <style>
        .form-control:focus {
            box-shadow: none;
        }

        /* BootStrap5 at 2020-08-09 at fixed-top container margin-left error */
        /* overflow: overlay is deprecated according to MDN (https://developer.mozilla.org/en-US/docs/Web/CSS/overflow#Values) */

        body {
            overflow-y: scroll;
        }

    </style>
</body>

</html>