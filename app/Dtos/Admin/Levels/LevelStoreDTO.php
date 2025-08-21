<?php

namespace App\Dtos\Admin\Levels;

class LevelStoreDTO
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        public readonly string $name,
        public readonly ?string $description,
    ){}

    public static function fromArray(array $data): self
    {
        return new self(
            $data['name'],
            $data['description'],
        );
    }
}
