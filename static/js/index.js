let a, b, skip_num = 0;
let limit = 1000 || parseInt((window.innerHeight - 120) / 44);
const buguoheng = "https://buguoheng.com";
const getMyDate = (date = new Date()) => (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()).toString();
const readPath = '/php/read.php';
const createPath = '/php/create.php';

const HttpGet = (str, CallBack, standard) => {
    let xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let json;
            try {
                json = JSON.parse(xmlhttp.responseText);
                // console.log(json);
                CallBack(json);
            } catch (e) {
                CallBack(xmlhttp.responseText);
                console.log(xmlhttp.responseText + '\n' + e)
            } finally {
                // if (totop != undefined) { totop(); }
            }
        }
    }
    if (standard == true)
        xmlhttp.open("GET", str, true);
    else
        xmlhttp.open("GET", buguoheng + (str || readPath) + (str.indexOf('limit') > 0 ? '' : (str.indexOf('?') < 0 ? '?' : '&') + 'limit=' + limit), true);
    xmlhttp.send();
}
const func_query = (json) => {
    try {
        document.getElementById("a_top").innerHTML = a || 'fantasy';
        document.getElementById("a").value = a || 'fantasy';
        if (a != '' && a != undefined) {
            let str = '/&nbsp;<a onclick="query(\'' + a + '\');">' + a.substring(0, 5) + '</a>&nbsp;';
            let str_as = document.getElementById("as").innerHTML;
            document.getElementById("as").innerHTML = str_as.substring(0, str_as.indexOf(str) >= 0 ? str_as.indexOf(str) : 999);
            document.getElementById("as").innerHTML += str;
        } else {
            document.getElementById("as").innerHTML = '<a onclick="query()" style="margin-left:-15px;">&nbsp;&nbsp;&nbsp;</a><a class="float-right text-dark">' + getMyDate() + '</a></div>';
        }
        callBack2(json);
        document.getElementById("input_query").value = '';
        hide_id_edit();
    } catch (e) {
        console.log('error:' + e)
    }
}

const callBack2 = (json) => {
    let div_query = document.getElementById("div_query");
    div_query.innerHTML = '';
    let div, a, b;
    for (j in json) {
        div = document.createElement("div");
        a = document.createElement("a");
        a.innerHTML = json[j]['a'] || '';
        a.onclick = function() { query(this.innerHTML); }
        let ahtml = a.innerHTML;
        b = document.createElement("a");
        b.onclick = function() { query(ahtml); }
        b.innerHTML = (json[j]['b'] == null || json[j]['b'] == '' ? '' : json[j]['b'] + ' - ');
        a.style = b.innerHTML != '' ? "font-size:60%" : "";
        div.className = "style-1";
        // div.id = json[j]['_id']['$oid'];
        div.appendChild(b);
        div.appendChild(a);
        div_query.appendChild(div);
    }
}

const query2 = str => {
    $('#collapsea').collapse('hide');
    a = str || '';
    let url = (a == '' ? '' : readPath + '?a=' + a);
    if (typeof str == 'object') {
        url = readPath + '?id=' + localStorage.getItem('id') || '';
    }
    var callBack = json => func_query(json);
    HttpGet(url, callBack);
}
const query = str => {
    skip_num = 1;
    $('#collapsea').collapse('hide');
    a = str || '';
    let url = (a == '' ? '' : readPath + '?a=' + a);
    if (typeof str == 'object') {
        url = readPath + '?id=' + localStorage.getItem('id') || '';
    }
    window.location.hash = url;
    if (a == '' && typeof str != 'object') { window.history.replaceState(null, null, buguoheng); }
}
const skip = num => {
    if (num == '0') { num = 1; }
    skip_num = (parseInt(num)) ? num - 1 : skip_num + 1;
    let url = (a == '' ? readPath : readPath + '?a=' + a);
    let skip = '&skip=' + skip_num;
    if (url.indexOf('?') < 0) {
        skip = '?skip=' + skip_num;
    }
    window.location.hash = url + skip;
}
const query_onhashchange = () => {
    a = decodeURI(location.href).split('a=')[1] || '';
    HttpGet(location.hash.slice(1), json => func_query(json));
}
$(document).ready(function() {
    loginCallback();
    window.history.replaceState(null, null, (decodeURI(location.href).split('a=')[1] == null) ? '' : "/#" + location.hash.slice(1));
    query_onhashchange();
    window.addEventListener('hashchange', query_onhashchange, false);
});
const create = obj => {
    $('#collapseb').collapse('hide');
    a = document.getElementById("a").value;
    b = document.getElementById("b").value;
    if (a == '') { alert("please type a object") }
    let url = createPath + '?a=' + a + '&b=' + JSON.stringify(typeof b == "string" ? b.split(",") : []);
    url = createPath + '?a=' + a + '&b=' + b;
    let callBack = create_id => {
        if (create_id.length == 24) {
            localStorage.id += (',' + create_id);
            query(a);
            query2(a);
            if (a == 'id') {
                $('#exampleModalLong').modal('show');
                $(".modal-body")[0].innerHTML = create_id;
            }
        } else {
            console.log('not right id,' + create_id)
        }
    }
    HttpGet(url, callBack);
}
const show_id_edit = () => {
    if (document.getElementById('addid').style.display == 'block') { hide_id_edit(); } else {
        tobottom();
        document.getElementById('addid').style.display = 'block';
        // document.getElementById('af').value = localStorage.id;
        // setTimeout(function () { order_id(); }, 2000);
    }
}
const hide_id_edit = () => { document.getElementById('addid').style.display = 'none'; }
const update_id = () => {
    localStorage.setItem(new Date().toLocaleString(), localStorage.id);
    localStorage.id = document.getElementById('af').value;
    query([]);
}
const query_id = () => {
    document.body.innerHTML = "<button class='btn btn-primary' onclick='location.replace(location.href)'>刷新</a>";
    for (i in localStorage) { if (i > '2019' && i < '2030' || i == "id") { document.body.innerHTML += "<h6>" + i + "</h6><p>" + localStorage[i] + "</p>"; } }
    document.body.innerHTML += "<br />";
}
const order_id = () => {
    let ids = localStorage.getItem("id").split(',');
    let new_ids = "";
    for (let i = 0; i < ids.length; i++) { if (ids[i].toString().length == 24) { new_ids += ids[i] + ','; } }
    document.getElementById('af').value = new_ids.substr(0, new_ids.length - 1);
}
document.getElementById("input_query").addEventListener("keyup", event => { if (event.keyCode == 13) { query(document.getElementById("input_query").value) } })
document.getElementsByClassName("create")[0].addEventListener("keyup", event => { if (event.keyCode == 13) { create() } })
document.getElementsByClassName("create")[1].addEventListener("keyup", event => { if (event.keyCode == 13) { create() } })
document.getElementsByClassName("create")[1].addEventListener("keydown", event => { if (event.keyCode == 13) { event.preventDefault(); } })
document.getElementById("div_card").style.minHeight = window.innerHeight - 90 + 'px';

// keyboard type 'enter' to open input_query,need auto remove EventListener
let i = 0;
let enter_keycode = [69, 78, 84, 69, 82];
const quick_open = event => {
    if (event.keyCode == enter_keycode[i]) {
        if (i++ == 4) {
            $('#collapseb').collapse('show');
            $('#a').focus();
            i = 0;
        }
    } else { i = 0; }
};
document.addEventListener('keyup', quick_open, true);

// show README.md
$('#exampleModalLong').on('show.bs.modal', function() {
    let readme = document.createElement("div");
    $(readme).load("README.md", function() {
        let converter = new showdown.Converter();
        $(".modal-body")[0].innerHTML = converter.makeHtml($(readme)[0].innerHTML);
    });
})
const rmcollapseb = () => $('#collapseb').collapse('hide');
$('#collapseb').on('show.bs.collapse', function() {
    document.getElementById("a").focus()
    document.getElementById('collapseb').addEventListener('click', e => { e.stopPropagation(); });
    document.addEventListener('click', rmcollapseb, false);
})
$('#collapseb').on('hidden.bs.collapse', function() {
    document.getElementById('collapseb').removeEventListener('click', e => { e.stopPropagation(); });
    document.removeEventListener('click', rmcollapseb, false);
})
const rmcollapsea = () => { $('#collapsea').collapse('hide') };
$('#collapsea').on('show.bs.collapse', function() {
    document.getElementById("a").focus()
    document.getElementById('collapsea').addEventListener('click', e => { e.stopPropagation(); });
    document.addEventListener('click', rmcollapsea, false);
})
$('#collapsea').on('hidden.bs.collapse', function() {
    document.getElementById('collapsea').removeEventListener('click', e => { e.stopPropagation(); });
    document.removeEventListener('click', rmcollapsea, false);
})

//change page position
const totop = () => $('body,html').animate({ scrollTop: '0px' });
const tobottom = () => $('body,html').animate({ scrollTop: $(".footer").offset().top });

// div_skip add button, need auto
// document.getElementById('div_skip').innerHTML = '<button class="btn btn-light btn-sm" onclick = "skip(0)" > 1</button> <button class="btn btn-light btn-sm" onclick="skip(1)">2</button> <button class="btn btn-light btn-sm" onclick="skip(2)">3</button> <button class="btn btn-light btn-sm" onclick="skip(3)">4</button> <button class="btn btn-light btn-sm" onclick="skip(4)">5</button> <button class="btn btn-light btn-sm" onclick="skip(5)">6</button> <button class="btn btn-light btn-sm" onclick="skip(6)">7</button> <button class="btn btn-light btn-sm" onclick="skip(7)">8</button> <input class="btn btn-sm border" border-radius="5px" type="text" id="skip" size="2"> <button class="btn btn-light btn-sm" onclick="skip(document.getElementById("skip").value)">skip</button>' + document.getElementById('div_skip').innerHTML;

const login = () => {
    window.location.href = 'https://oauth.buguoheng.com/oauth/render/github';
}
const loginCallback = () => {
    if (getQueryVariable('code')) {
        let callBack = json => { if (json != null && json.data != null && json.data.username != null) alert("hello " + json.data.username) }
        let url = "https://oauth.buguoheng.com/oauth/callback/github?";
        HttpGet(url + window.location.search.substring(1), callBack, true);
    }
}
const getQueryVariable = (variable) => {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}