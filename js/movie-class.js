function Movie(id, title, release_date, vote_average, genre_ids, overview, poster_path, original_language) {
    Object.defineProperty(this, "id", {  
        value: id,
        configurable: false,
        enumerable:false,
        writable:false
    });
    Object.defineProperty(this, "title", {  
        value: title,
        configurable: false,
        enumerable:false,
        writable:false
    });
    Object.defineProperty(this, "release_date", {  
        value: release_date,
        configurable: false,
        enumerable:false,
        writable:false
    });
    Object.defineProperty(this, "vote_average", {  
        value: vote_average,
        configurable: false,
        enumerable:false,
        writable:false
    });
    Object.defineProperty(this, "genre_ids", {  
        value: genre_ids,
        configurable: false,
        enumerable:false,
        writable:false
    });
    Object.defineProperty(this, "overview", {  
        value: overview,
        configurable: false,
        enumerable:false,
        writable:false
    });
    Object.defineProperty(this, "poster_path", {  
        value: poster_path,
        configurable: false,
        enumerable:false,
        writable:false
    });
    Object.defineProperty(this, "original_language", {  
        value: original_language,
        configurable: false,
        enumerable:false,
        writable:false
    });
}