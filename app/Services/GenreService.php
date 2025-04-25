<?php

namespace App\Services;

use App\Models\Genre;

class GenreService
{ 
    public function store(array $data){
        return Genre::create($data);
    } 

    public function update(array $data, Genre $genre){
        return $genre->update($data);
    }

    public function destroy(Genre $genre){
        return $genre->delete();
    }

    public function findAll(){
        return Genre::latest()->get();
    }

}