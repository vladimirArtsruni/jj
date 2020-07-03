<?php

namespace App\Helpers;

class Helper
{

    public static function parse($path)
    {
        $stream = fopen(public_path($path), 'r');

        $listener = new \JsonStreamingParser\Listener\InMemoryListener();
        try {
            $parser = new \JsonStreamingParser\Parser($stream, $listener);
            $parser->parse();
            fclose($stream);
        } catch (Exception $e) {
            fclose($stream);
            throw $e;
        }

        return $listener->getJson();
    }

}
