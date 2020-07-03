<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\File;
use simple_html_dom;
use App\User;

class parser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:parser';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {

        $client = new Client();

        $letters = config('letters');
        $letters2 = config('letters2');
        $a = [];
        foreach ($letters as $letter) {
            foreach ($letters2 as $letter2) {
                try {
                    $resp = $client->get('https://ecf.dcd.uscourts.gov/cgi-bin/attysrch.pl?lastname=' . $letter . '&firstname=' . $letter2);

                    $result = $resp->getBody()->getContents();
//                    $result = File::get(resource_path('/parser/test.blade.php'));

                    $this->parser($result, $letter.$letter2);

                } catch (\Exception $exception) {
                }
            }
        }

    }

    public function parser($content, $combination)
    {
        $html = new simple_html_dom();
        $html->load($content);
        $tr = $html->find('h4 tr');
        $collection = collect($tr);

        $chunks = $collection->chunk(15);

        $array = [];

        $x = 0;
        $y = 0;
        foreach ($chunks as $tr) {

            foreach ($tr as $key => $t) {

                if ($key == (string)$y) {
                    if (isset($t->children[1])) {
                        $array[$x]['full_name'] = $t->children[1]->plaintext;
                    }
                }
                if ($key == (string)($y + 1)) {
                    if (isset($t->children[1])) {
                        $array[$x]['company'] = $t->children[1]->plaintext;
                    }
                }
                if ($key == (string)($y + 3)) {
                    if (isset($t->children[1])) {
                        $array[$x]['address'] = $t->children[1]->plaintext;
                    }
                }
                if ($key == (string)($y + 4)) {
                    if (isset($t->children[1])) {
                        $array[$x]['address'] = $array[$x]['address'] . ' ' . $t->children[1]->plaintext;
                    }
                }

                if ($key == (string)($y + 6)) {
                    if (isset($t->children[1])) {
                        $array[$x]['email'] = '';
                        $email = explode('Email: ', $t->children[1]->plaintext);
                        if (isset($email[1])) {
                            $array[$x]['email'] = $email[1];
                        }
                    }
                }
                if ($key == (string)($y + 7)) {
                    if (isset($t->children[1])) {
                        $array[$x]['phone'] = '';
                        $phone = explode('Phone: ', $t->children[1]->plaintext);
                        if (isset($phone[1])) {
                            $array[$x]['phone'] = $phone[1];
                        }
                    }
                }

                if ($key == (string)($y + 8)) {
                    if (isset($t->children[1])) {
                        $array[$x]['fax'] = '';
                        $fax = explode('Fax: ', $t->children[1]->plaintext);
                        if (isset($fax[1])) {
                            $array[$x]['fax'] = $fax[1];
                        }
                    }
                }
                if ($key == (string)($y + 9)) {
                    if (isset($t->children[1])) {
                        $array[$x]['status'] = '';
                        $status = explode('Membership Status: ', $t->children[1]->plaintext);
                        if (isset($status[1])) {
                            $array[$x]['status'] = $status[1];
                        }
                    }
                }
                if ($key == (string)($y + 10)) {
                    if (isset($t->children[1])) {
                        $array[$x]['bar_id'] = '';
                        $bar_id = explode('Bar ID: ', $t->children[1]->plaintext);
                        if (isset($bar_id[1])) {
                            $array[$x]['bar_id'] = $bar_id[1];
                        }
                    }
                }
                $array[$x]['combination'] = $combination;

            }
            User::create($array[$x]);
            $y += 15;
            $x++;
        }
    }
}
