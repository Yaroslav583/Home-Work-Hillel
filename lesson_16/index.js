const config = {
    giphy: {
        api_key: 'xWN5FetwcKhYyWXKJyEjl1Fm1ADLAftr',
        url: 'https://api.giphy.com/v1/gifs',
    }
}

// SEARCH -------------------------------------------------

function fetchGallery() {
    const query = document.getElementById('search').value;
    if (query) {
        fetchSearch(query);
        return;
    }
    fetchTrending();
}


function fetchTrending() {
    const limit = getLimit();
    document.getElementById('box-gallery').innerHTML = '';
    fetch(`${config.giphy.url}/trending?api_key=${config.giphy.api_key}&limit=${limit}`)
        .then((response) => response.json())
        .then((list) => {
            list.data.forEach((item) => {
                creatHtmlGallery(item)
            })
        })

}

function fetchSearch(query) {
    const limit = getLimit();
    document.getElementById('box-gallery').innerHTML = ''
    fetch(`${config.giphy.url}/search?q=${encodeURIComponent(query)}&api_key=${config.giphy.api_key}&limit=${limit}`)
        .then((response) => response.json())
        .then((list) => {
            list.data.forEach((item) => {
                creatHtmlGallery(item)
            })
        })
}


// CREAT HTML--------------------------------------------

function creatHtmlGallery(item) {
    let div = document.createElement('div');
    div.id = `gallery-item-${item.id}`;
    div.classList.add('col-auto', 'my-2', 'img-thumbnail');
    div.addEventListener('click', function () {
        window.location.href = item.url;
    });
    div.innerHTML = `<img src="${item.images.fixed_height.url}" alt="${item.title}" loading="lazy">`;
    document.getElementById('box-gallery').append(div)
}

//LISTENER----------------------------------------

window.addEventListener('load', function (event) {
    fetchTrending();
});

document.getElementById('search').addEventListener('blur', function (event) {
    fetchGallery();
});

document.getElementById('search').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        fetchGallery();
    }
});

document.getElementById('limitSelect').addEventListener('change', function (event) {
    fetchGallery();
});


// Create Limit -------------------------------------------------


function getLimit() {
    const limit = document.getElementById('limitSelect').value;
    return limit ? limit : 10;
}