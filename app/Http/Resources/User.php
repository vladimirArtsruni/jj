<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class User extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [

            'full_name' => $this->full_name,
            'email' => html_entity_decode($this->email),
            'phone' => $this->phone,
            'fax' => $this->fax,
            'bar_id' => $this->bar_id,
            'address' => $this->address,
            'company' => $this->company,
            'status' => $this->status,
        ];
    }
}
