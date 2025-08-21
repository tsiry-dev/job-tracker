<?php

namespace App\Dtos\Admin\Students;

class StudentStoreDTO
{
      public function __construct(
        public readonly int $vague_id,
        public readonly string $name,
        public readonly string $phone,
    ){}

    public static function fromArray(array $data): self
    {
        return new self(
            $data['vague_id'],
            $data['name'],
            $data['phone'],
        );
    }
}
