<?php

namespace App\Dtos\Admin\Levels;

use Illuminate\Http\Request;

class LevelDestroyDTO
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        public readonly int $id,
    ){}

    public static function fromRequest(Request $request): self
    {
        return new self((int) $request->id);
    }
}
