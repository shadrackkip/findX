<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Listing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;

class PhotosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        if($request->has('images')){
          $images =  $request->file('images');
          $path_1 = "uploads/photos/listings/resized";
          $path_2 = "uploads/photos/listings/original";
          $product=json_decode($request->product);
          $imageArr = array();

          foreach ($images as $key => $image) {
            $rules = [
                'images' => 'image|mimes:jpeg,bmp,png|size:2048' //2MB Max Size
            ];
              $v = Validator::make($images, $rules);
                if ($v->fails()) {
                    return response()->json([
                        'error'=>true,
                        'errors'=>$v->errors(),
                        'images'=>$images
                    ]);
                }

            $fileName = time().'.' .$image->getClientOriginalExtension();
            $destinationPath_1 = $path_1;
            $destinationPath_2 = $path_2;
            array_push($imageArr,$fileName);

            $img = Image::make($image);

            $img->insert(public_path('/img/logo.png'), 'bottom-right', 10, 10)->save($destinationPath_1.'/'.$fileName);
            $img->fit('300', '300')->save($destinationPath_1.'/'.$fileName);
            $move = $image->move($destinationPath_2, $fileName);
          }
          $listing = Listing::findOrFail($product->id);
          $listing->photos=$imageArr;
          $listing->save();
          return response()->json([
              'images'=>$images,
              'success'=>true
          ]);

        }


    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
