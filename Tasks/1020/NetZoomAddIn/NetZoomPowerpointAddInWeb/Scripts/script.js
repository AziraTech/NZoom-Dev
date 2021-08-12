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

    $('ul.sub-tabs li').click(function () {
        var tab_id = $(this).attr('data-tab');

        $('ul.sub-tabs li').removeClass('current');
        $('.prop-tab-content').removeClass('current');

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


let properties = [
    {
        id: 'tree-item-1',
        propertyGroups: [
            {
                groupName: "Property group 1",
                properties: [
                    {
                        label: 'Proerty 1',
                        value: '102'
                    },
                    {
                        label: 'Proerty 2',
                        value: '12'
                    },
                    {
                        label: 'Proerty 3',
                        value: '2012'
                    },
                    {
                        label: 'Proerty 4',
                        value: '1021'
                    },
                    {
                        label: 'Proerty 5',
                        value: '485'
                    },
                ]
            },
            {
                groupName: "Property group 2",
                properties: [
                    {
                        label: 'Proerty 1',
                        value: '102'
                    },
                    {
                        label: 'Proerty 2',
                        value: '12'
                    },
                ]
            },
            {
                groupName: "Property group 3",
                properties: [
                    {
                        label: 'Proerty 1',
                        value: '102'
                    },
                    {
                        label: 'Proerty 3',
                        value: '12'
                    },
                    {
                        label: 'Proerty 4',
                        value: '178'
                    },
                ]
            },
        ]

    },
    {
        id: 'tree-item-2',
        propertyGroups: [
            {
                groupName: "Property group 1",
                properties: [
                    {
                        label: 'Proerty 1',
                        value: '102'
                    },
                    {
                        label: 'Proerty 2',
                        value: '12'
                    },
                    {
                        label: 'Proerty 3',
                        value: '2012'
                    },
                    {
                        label: 'Proerty 4',
                        value: '1021'
                    },
                ]
            },
            {
                groupName: "Property group 2",
                properties: [
                    {
                        label: 'Proerty 1',
                        value: '102'
                    },
                    {
                        label: 'Proerty 2',
                        value: '12'
                    },
                ]
            },
            {
                groupName: "Property group 3",
                properties: [
                    {
                        label: 'Proerty 1',
                        value: '102'
                    },
                    {
                        label: 'Proerty 3',
                        value: '12'
                    },

                ]
            },
        ]

    },
    {
        id: 'tree-item-3',
        propertyGroups: [
            {
                groupName: "Property group 1",
                properties: [
                    {
                        label: 'Proerty 2',
                        value: '12'
                    },
                    {
                        label: 'Proerty 3',
                        value: '2012'
                    },
                    {
                        label: 'Proerty 4',
                        value: '1021'
                    },
                ]
            },
            {
                groupName: "Property group 2",
                properties: [
                    {
                        label: 'Proerty 1',
                        value: '102'
                    },
                    {
                        label: 'Proerty 2',
                        value: '12'
                    },
                    {
                        label: 'Proerty 2',
                        value: '12'
                    },
                    {
                        label: 'Proerty 3',
                        value: '2012'
                    },
                ]
            },
            {
                groupName: "Property group 3",
                properties: [
                    {
                        label: 'Proerty 1',
                        value: '102'
                    },
                    {
                        label: 'Proerty 3',
                        value: '12'
                    },

                ]
            },
        ]

    },
];


$('.item-select').on('click', function (e) {
    if ($(this).hasClass('item-selected')) {
        $('.item-select').removeClass('item-selected');

    }
    else {
        $('.item-select').removeClass('item-selected');
        $(this).addClass('item-selected');
        let id = $(this).attr('id');
        if (id !== '' && id !== undefined) {
            $('.tree-prop').addClass('property-show');
            $('.tree-prop').removeClass('property-hidden');
            $('#no-property-to-show').css('display', 'none');
            //findPropertyGroupById(id);
        }
        else {
            $('.tree-prop').removeClass('property-show');
            $('.tree-prop').addClass('property-hidden');
            $('#no-property-to-show').css('display', 'block');
        }

    }
    e.stopPropagation();
});

//function findPropertyGroupById(id) {
//    let property = properties.filter(function (ele) {
//        return ele.id === id;
//    });
//    let propertiesContainer = document.getElementById('propertiesContainer');
//    propertiesContainer.innerHTML = '';
//    let ul = document.createElement('ul');
//    property[0].propertyGroups.forEach(element => {
//        console.log(element);

//        let properyCategoryLi = document.createElement('li');
//        properyCategoryLi.classList.add('property-category');
//        properyCategoryLi.classList.add('w100');

//        let propertyCategoryClick = document.createElement('a');
//        propertyCategoryClick.classList.add('property-category-click');
//        propertyCategoryClick.innerHTML = element.groupName;
//        propertyCategoryClick.onclick = (e) => {
//            console.log(e.target.parentElement);
//            e.target.parentElement.classList.toggle('property-category-open');
//            e.stopPropagation();
//        }
//        propertyCategoryUl = document.createElement('ul');
//        propertyCategoryUl.classList.add('w100');

//        element.properties.forEach(prop => {
//            let li = document.createElement('li');
//            let div = document.createElement('div');
//            div.classList.add('property-group');
//            div.classList.add('w100');

//            let label = document.createElement('label');
//            label.innerHTML = prop.label;
//            label.classList.add('w50');

//            let input = document.createElement('input');
//            input.type = 'type';
//            input.value = prop.value;
//            input.title = prop.label;
//            input.classList.add('w50');
//            input.disabled = true;

//            div.appendChild(label);
//            div.appendChild(input);
//            li.appendChild(div);

//            propertyCategoryUl.appendChild(li);
//        });
//        properyCategoryLi.appendChild(propertyCategoryClick);
//        properyCategoryLi.appendChild(propertyCategoryUl);

//        ul.appendChild(properyCategoryLi);
//    })
//    propertiesContainer.appendChild(ul);
//}


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