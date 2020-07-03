<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/parser', 'IndexController@index');
Route::get('/makesMakers', 'AppController@getMakes');
Route::get('/makesModels', 'AppController@getModels');
Route::post('/getResult', 'AppController@getResult');


Route::get('/manheim', 'ManheimController@index');
