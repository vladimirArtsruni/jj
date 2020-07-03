<?php


namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use JsonMachine\JsonMachine;
use App\Helpers\Helper;

class AppController extends Controller
{

    public function getMakes(Request $request)
    {
        $query = '';

        foreach ($request->get('type') as $value) {
            $query .= '&vehicleType=' . $value;
        }

        $checkPath = md5(substr($query, 1)) . '.json';


        $makerJson = File::exists(public_path($checkPath));

        if ($makerJson) {
            return response()->json(Helper::parse($checkPath));
        }

        shell_exec("node pup.js --query=\"$query\" --mode=maker &");

        return response()->json(Helper::parse($checkPath));


    }

    public function getModels(Request $request)
    {
        $query = 'inventory=';

        foreach ($request->get('models') as $value) {
            $query .= '&make=' . $value;
        }

        $checkPath = md5($query) . '.json';
        $modelJson = File::exists(public_path($checkPath));

        if ($modelJson) {
            return response()->json(Helper::parse($checkPath));
        }

        shell_exec("node pup.js --query=\"$query\" --mode=model   &");
        return response()->json(Helper::parse($checkPath));


    }

    public function getResult(Request $request)
    {


        $query = http_build_query($request->all());
        $query = preg_replace('/%5B[0-9]+%5D/simU', '', $query);

        shell_exec("node pup.js --query=\"$query\" --mode=result   &");



        include base_path()."/resources/vendor/phpQuery/phpQuery/phpQuery.php";

        $html = File::get(public_path(md5($query).'.html'));
        \phpQuery::newDocumentHTML($html);
        $result=pq('.next')->prev();
        $numPage=pq($result)->eq(0)->html();
        $numVehicle=pq('#totalVehicleCount')->find('.add-all-to-workbook btn-secondary')->empty()->end()->text();
        $num=pq('#totalVehicleCount')->text();

        $match=pq('.vehicleResultRow');
        $items = [];
        foreach($match as $item){
            $item_data=[];


            //PRICE
            $price=pq($item)->find('.pricing')->html();
            $item_data['price']=$price;
            if($item_data['price']){

                if(mb_substr_count($item_data['price'],"$")>1){

                    $start=strripos($item_data['price'],"$");

                    $item_data['price']=substr_replace($item_data['price'],' - $',$start,1);
                }
            }
            //PRICE MMR
            $item_data['price_mmr']=pq($item)->find('.span13-24')->find(':contains("MMR")')->next()->text();



            //Ð£Ð´Ð°Ð»ÐµÐ½Ð¸Ðµ Ð±Ð»Ð¾ÐºÐ¾Ð²
            pq($item)->find('.wbBuy')->remove();
            pq($item)->find('.btnWrap')->remove();
            pq($item)->find('.actionItem')->remove();
            pq($item)->find('.wbEventLink')->remove();
            pq($item)->find('.wbBid')->parent()->remove();



            //LINK
            $link=pq($item)->find('h3 .visitedLink')->attr('href');
            $id_start=strpos($link, 'vehicleUniqueId=');
            $id_start+=16;
            $id=substr($link,$id_start);
            $id=substr($id, 0, -4);
            $id=base64_encode($id);
            $link='/'.app()->getLocale().'/manheim/item/'.$id;
            $item_data['link']=$link;

            //TITLE
            $title_car=pq($item)->find(".visitedLink")->text();
            $item_data['title']=$title_car;

            //PHOTO
            $src=pq($item)->find('a[title="Click to view Vehicle Detail"]')->children()->attr('src');
            $main_photo=strtok($src,'?');
            $main_photo=str_replace('/small','',$main_photo);
            $item_data['main_photo']=$main_photo;


            //VIN
            $vin=pq($item)->find('.span10-16')->find('p')->text();
            $item_data['vin']=$vin;

            //DATE && AUCTION
            $date_auction=pq($item)->find('.span6-16')->find('.mui-text-right')->text();
            $item_data['date_auction']=$date_auction;


            //COLOR
            $item_data['color']=pq($item)->find('.mui-text-center')->text();


            //ADDIT.INFO
            $item_data['add_info']=pq($item)->find('.span2-3.wbYmm')->text();

            //ODOMETR
            $item_data['odometr']=pq($item)->find('.span2-3.wbYmm')->find(':contains("Odometer")')->next()->text();

            //Engine
            $item_data['engine']=pq($item)->find('.span2-3.wbYmm')->find(':contains("Odometer")')->next()->next()->text();

            //LOCATIOn
            $location=pq($item)->find('.span6-24')->find("p");
            $item_data['pickup']= pq($item)->find('.span6-24')->find(':contains("Pickup")')->next()->text();
            $item_data['facilitation']= pq($item)->find('.span6-24')->find(':contains("Facilitation")')->next()->text();
            $item_data['seller']= pq($item)->find('.span6-24')->find(':contains("Seller")')->next()->text();


            //CR
            $cr=pq($item)->find('.cr');
            $rate_cr="";
            if($cr->length()>0){
                $status_cr=substr($cr->text(),0,2);
                if($status_cr=='CR'){
                    $rate_cr=substr($cr->text(),2);
                }else{
                    $rate_cr='Not Specified';
                }
            }else{
                $status_cr='';
            }
            $item_data['cr']=$status_cr;
            $item_data['cr_rate']=$rate_cr;




            //TRIM
            foreach($item_data as $key=>$value){
                $item_data[$key]=trim($value);
            }


            $items[]=$item_data;
        }
        //PAGINATION
        $pagination=pq('.sorting-pagination-container-top')->find('.mui-pagination');
        $pagination->find('script')->remove();
        $pagination=str_replace('icon-arrow-left','fa fa-chevron-left',$pagination);
        $pagination=str_replace('icon-arrow-right','fa fa-chevron-right',$pagination);

        return response()->json(['inventories'=>$items, 'pagination'=>$pagination,'total_veh_found'=>$num]);



    }


}
