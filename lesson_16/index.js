const config = {
    giphy: {
        api_key: 'xWN5FetwcKhYyWXKJyEjl1Fm1ADLAftr',
        url: 'https://api.giphy.com/v1/gifs',
    }
}

// SEARCH -------------------------------------------------

function fetchTrending() {
    document.getElementById('box-gallery').innerHTML = ''
    fetch(`${config.giphy.url}/trending?api_key=${config.giphy.api_key}`)
        .then((response) => response.json())
        .then((list) => {
            list.data.forEach((item) => {
                creatHtmlGallery(item)
            })
        })
}

function fetchSearch(query, limit) {
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

    const query = event.target.value
    fetchSearch(query)
})
document.getElementById('search').addEventListener('keyup', function (event) {
    // Проверяем, была ли нажата клавиша Enter (код 13)
    if (event.key === 'Enter') {
        const query = event.target.value;
        fetchSearch(query);
    }
});
document.getElementById('limitSelect').addEventListener('change', function (event) {
    const query = document.getElementById('search').value;
    const limit = event.target.value;
    fetchSearch(query, limit);
});