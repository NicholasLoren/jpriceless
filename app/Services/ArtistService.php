<?php

namespace App\Services;
use App\Models\Artist;
class ArtistService
{ 
    public function store(array $data){
        return Artist::create($data);
    } 

    public function update(array $data, Artist $artist){
        return $artist->update($data);
    }

    public function destroy(Artist $artist){
        return $artist->delete();
    }

    public function findAll(){
        return Artist::latest()->get();
    }

}