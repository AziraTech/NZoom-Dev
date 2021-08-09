$(document).ready(function () {

    $('ul.tabs li').click(function () {
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
    });

    $('ul.sub-tabs li').click(function () {
        var tab_id = $(this).attr('data-tab');

        $('ul.sub-tabs li').removeClass('current');
        $('.sub-tab-content').removeClass('current');

        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
    });
});

$('.folder-click').on('click', function (e) {
    $(this).parent().toggleClass('folder-open');
    e.stopPropagation();
});


$('.property-category-click').on('click', function (e) {
    $(this).parent().toggleClass('property-category-open');
    e.stopPropagation();
});


$('.item-select').on('click', function (e) {
    if ($(this).hasClass('item-selected')) {
        $('.item-select').removeClass('item-selected');
    }
    else {
        $('.item-select').removeClass('item-selected');
        $(this).addClass('item-selected');
    }
    e.stopPropagation();
});

$('.drop-btn').on('click', function (e) {
    e.preventDefault();
});
let options = [
    { value: 'One', text: 'One' },
    { value: 'Two', text: 'Two' },
    { value: 'Three', text: 'Three' },
    { value: 'Four', text: 'Four' },
    { value: 'Five', text: 'Five' },
];

for (let i = 0; i < options.length; i++) {
    let opt = document.createElement('option');
    opt.value = options[i].value;
    opt.innerHTML = options[i].text;
    $('#data-list-select').append(opt);
}

$('.play-btn').click(function () {
    let searchValue = $('#data-list-text').val();
    if (searchValue !== '') {
        options.push({ value: searchValue, text: searchValue });
        let opt = document.createElement('option');
        opt.value = searchValue;
        opt.innerHTML = searchValue;
        $('#data-list-select').append(opt);
        $('#data-list-text').val('');
    }
});
//$('select.data-list-input').focus(function () {
//    $(this).siblings('input.data-list-input').focus();
//});
$('select.data-list-input').change(function () {
    $(this).siblings('input.data-list-input').val($(this).val());
});
$('input.data-list-input').change(function () {
    $(this).siblings('select.data-list-input').val('');
});

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    let user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}