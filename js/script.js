document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const closeButton = document.getElementById('close-button');
    const modalBody = document.getElementById('modal-body');
    const albumList = document.getElementById('card-container');

    closeButton.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    function openModal(content) {
        modalBody.innerHTML = content;
        modal.style.display = "block";
    }

    function fetchAlbums() {
        // Placeholder for fetching albums from IndexedDB or local storage
        let albums = [
            {name: "Viagem", photos: ["quadrado.jpg", "quadrado2.png", "retangulo.jpg"]},
            // {name: "Aniversário", photos: ["foto4.jpg", "foto5.jpg"]},
        ];

        albums.forEach(album => {
            let albumCard = document.createElement('div');
            albumCard.className = 'card';

            albumName = document.createElement('h1')
            albumName.className = 'title'
            albumName.innerText = album.name

            albumCard.appendChild(albumName)

            album.photos.slice(0, 4).forEach(photo => {
                let img = document.createElement('img');
                img.className = 'mold-quadrado'
                img.src = `images/${photo}`;
                albumCard.appendChild(img);
            });

            albumEditButtom = document.createElement('button')
            albumEditButtom.className = 'edit-button'            
            albumEditButtom.innerText = 'Edit'
            albumEditButtom.onclick = () => openModal('Editar Album');

            albumCard.appendChild(albumEditButtom)
            
            albumList.appendChild(albumCard);
        });

        // Card to create new album
        let newAlbumCard = document.createElement('div');
        newAlbumCard.className = 'album-card new-album';
        newAlbumCard.innerHTML = '+';
        newAlbumCard.onclick = () => openModal('Criar Novo Album');
        albumList.appendChild(newAlbumCard);
    }

    fetchAlbums();
});


let db;
const request = window.indexedDB.open('gerenciadorFotosDB', 1);

request.onerror = function(event) {
    console.error('IndexedDB error:', event.target.errorCode);
};

request.onsuccess = function(event) {
    db = event.target.result;
    fetchAlbums();
};

request.onupgradeneeded = function(event) {
    db = event.target.result;
    let albumStore = db.createObjectStore('albuns', { keyPath: 'id', autoIncrement: true });
    albumStore.createIndex('name', 'name', { unique: false });
    albumStore.createIndex('date', 'date', { unique: false });
    albumStore.createIndex('location', 'location', { unique: false });
    albumStore.createIndex('tags', 'tags', { unique: false });

    let photoStore = db.createObjectStore('fotos', { keyPath: 'id', autoIncrement: true });
    photoStore.createIndex('albumId', 'albumId', { unique: false });
    photoStore.createIndex('description', 'description', { unique: false });
    photoStore.createIndex('date', 'date', { unique: false });
    photoStore.createIndex('location', 'location', { unique: false });
};

// Continue with other functions to interact with IndexedDB (add, edit, delete albums and photos)
