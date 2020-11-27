// Lista de comics
var comics = document.getElementById('comics')
var gif = document.createElement('img')
gif.setAttribute('src','../img/cargando.gif')
$(gif).appendTo($(comics));
    // Request
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://gateway.marvel.com/v1/public/comics?limit=100&ts=1&apikey=d5f0ec320ffcc74de9fab755f40f2435&hash=62987e393881a80e5efb57b71bfce7bc", true);
xhr.onload = function() {
    $(gif).hide();
    const comics_d = JSON.parse(this.responseText);
    var i = 0;
    comics_d.data.results.forEach(r => {
        var k = 0;
        const ul = document.createElement('ul');
        const li_portada = document.createElement('img');
        const li_titulo = document.createElement('li');
        const li_descripcion = document.createElement('li');
        
        li_portada.setAttribute('src', r.thumbnail.path + '/detail.jpg');
        li_titulo.innerHTML = r.title;
        // Descripcion
        let str2 = r.description;
        if (str2 != null) {
            var mas = '';
            for (var j = 0; j < str2.length; j++) {
                mas = mas.concat(str2[j]);
                if (j == 19) var menos = li_descripcion.innerHTML = mas
            }          
            const boton = document.createElement('button');
            boton.textContent = 'ver más';
            boton.addEventListener('click',function(){
                if(boton.textContent == 'ver más'){
                    li_descripcion.innerHTML = mas;
                    boton.textContent = 'ver menos';
                } else {
                    li_descripcion.innerHTML = menos;
                    boton.textContent = 'ver más';
                }
            })
            ul.appendChild(li_portada);
            ul.appendChild(li_titulo);
            ul.appendChild(li_descripcion);
            ul.appendChild(boton);
            comics.appendChild(ul);
        } else {
            ul.appendChild(li_portada);
            ul.appendChild(li_titulo);
            ul.appendChild(li_descripcion);
            comics.appendChild(ul);
        }
        i++;
        if (i == comics_d.data.results.length)
            paginationC('#comics');
    });
}
xhr.send();

// Lista de personajes
var personajes = document.getElementById('personajes')
    // Request
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://gateway.marvel.com/v1/public/characters?limit=100&ts=1&apikey=d5f0ec320ffcc74de9fab755f40f2435&hash=62987e393881a80e5efb57b71bfce7bc", true);
xhr.onload = function() {
    const comics_d = JSON.parse(this.responseText);
    var i = 0;
    comics_d.data.results.forEach(r => {
        const ul = document.createElement('ul');
        const li_portada = document.createElement('img');
        const li_nombre = document.createElement('li');
        li_portada.setAttribute('src', r.thumbnail.path + '/detail.jpg');
        li_nombre.innerHTML = r.name;
        ul.appendChild(li_portada);
        ul.appendChild(li_nombre);
        personajes.appendChild(ul);
        i++;
        if (i == comics_d.data.results.length)
            paginationP('#personajes');
    });

}
xhr.send();

function paginationC(x) {
    // Paginacion
    var items = $(x).children()
    var numItems = items.length;
    var perPage = 10;

    $(x).html(items.slice(0, 10));
    // Now setup the pagination using the `.pagination-page` div.
    $("#paginatorC").pagination({
        items: numItems,
        itemsOnPage: perPage,
        cssStyle: "light-theme",
        // This is the actual page changing functionality.
        onPageClick: function(pageNumber) {
            // We need to show and hide `tr`s appropriately.
            var showFrom = perPage * (pageNumber - 1);
            var showTo = showFrom + perPage;

            // We'll first hide everything...
            $(x).html(items.slice(showFrom, showTo));
        }
    });
}


function paginationP(x) {
    // Paginacion
    var items = $(x).children()
    var numItems = items.length;
    var perPage = 10;

    $(x).html(items.slice(0, 10));
    // Now setup the pagination using the `.pagination-page` div.
    $("#paginatorP").pagination({
        items: numItems,
        itemsOnPage: perPage,
        cssStyle: "light-theme",
        // This is the actual page changing functionality.
        onPageClick: function(pageNumber) {
            // We need to show and hide `tr`s appropriately.
            var showFrom = perPage * (pageNumber - 1);
            var showTo = showFrom + perPage;

            // We'll first hide everything...
            $(x).html(items.slice(showFrom, showTo));
        }
    });
}