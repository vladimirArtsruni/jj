<?php

namespace App;

use Nesk\Puphpeteer\Puppeteer;
use Nesk\Rialto\Data\JsFunction;
use Nesk\Puphpeteer\Resources\ElementHandle;
use Symfony\Component\Process\Process;
use PHPUnit\Framework\ExpectationFailedException;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Arr;


class PuppeteerService
{

    protected $puppeteer;
    protected $browser;
    protected $page;
    protected $authUrl = "https://api.manheim.com/auth/authorization.oauth2?adaptor=manheim_customer&client_id=qdp6ewmug522t9umyxyqydnx&response_type=code&scope=openid&redirect_uri=https://members.manheim.com/gateway/callback&back_uri=https://www.manheim.com/members/mymanheim/?classic=true";
    protected $username_selector = 'user_username';
    protected $password_selector = 'user_password';
    protected $CTA_SELECTOR = '#submit';
    protected $u_login = 'garyrechi';
    protected $u_password = 'Solon!2015';

    public function __construct()
    {
        $this->puppeteer = new Puppeteer;
        $this->browser = $this->puppeteer->launch();
        $this->page = $this->browser->newPage();

        $cookies = File::get(public_path('cookie.txt'));
        $cookies = json_decode($cookies, true);
        $this->page->setCookie(...$cookies);

        if (!$this->checkAuth()) {

             $this->auth();
        }


    }

    public function checkAuth()
    {
        $page = $this->page;
        $response = $page->goto('https://profiles-ui.manheim.com/profile');

        if ($response->url() !== 'https://profiles-ui.manheim.com/profile') {
            return false;
        }
        return true;
    }


    public function getResult($query)
    {
        $page = $this->page;
        $page->goto('https://www.manheim.com/members/powersearch/searchSubmit.do?' . $query);
        $data = $page->evaluate(JsFunction::createWithBody('return document.body.outerHTML'));
        $this->browser->close();
        return $data;

    }

    public function auth()
    {
        $page = $this->page;
        $page->goto($this->authUrl);
        $email = $page->querySelector('[id="' . $this->username_selector . '"]');
        $email->type($this->u_login);

        $password = $page->querySelector('[id="' . $this->password_selector . '"]');
        $password->type($this->u_password);

        $page->querySelector('[id="submit"]')->click();

        $page->waitForNavigation();
        $cookies = $page->cookies();

        File::put('cookie.json', json_encode($cookies));

        $page->screenshot(['path' => 'example.png']);
        $this->browser->close();

    }


    public function getMakes($query)
    {
        $page = $this->page;
        $page->goto('https://www.manheim.com/members/powersearch/getMakes.do?' . $query);
        $page->screenshot(['path' => '12.png']);

        $data = $page->evaluate(JsFunction::createWithBody('return document.body.innerText'));
        $this->browser->close();


        return $data;
    }

    public function getModels($query)
    {
        $page = $this->page;
        $page->goto('https://www.manheim.com/members/powersearch/getModels.do?' . $query);
        $page->screenshot(['path' => '13.png']);

        $data = $page->evaluate(JsFunction::createWithBody('return document.body.innerText'));
        $this->browser->close();


        return $data;
    }
}
