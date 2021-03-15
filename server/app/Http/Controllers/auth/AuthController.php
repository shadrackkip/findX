<?php
namespace App\Http\Controllers\auth;
use App\Http\Controllers\Controller;
use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Validator;

class AuthController extends BaseController
{

    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:25',
            'email' => 'required|unique:users|email|max:25',
            'password' => 'required|min:8|max:18',
            'password_confirmation' => 'required|same:password',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] =  $user->createToken('MyApp')->plainTextToken;
        $success['name'] =  $user->name;
        $success['email'] = $user->email;


        return $this->sendResponse($success, 'User register successfully.');

    }

    /**
     * Login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $user = Auth::user();
            $success['token'] =  $user->createToken('MyApp')->plainTextToken;
            $success['name'] =  $user->name;
            $success['email'] = $user->email;

            return $this->sendResponse($success, 'User login successfully.');
        }
        else{
            return $this->sendError('Please check your credentials and try again.', ['error'=>'Please check your credentials and try again']);
        }
    }
}
