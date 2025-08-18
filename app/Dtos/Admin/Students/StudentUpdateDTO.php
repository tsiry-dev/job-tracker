<?php

namespace App\Dtos\Admin\Students;

class StudentUpdateDTO
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        public readonly int $vague_id,
        public readonly string $name,
        public readonly string $phone,
        public readonly bool $status,
        public readonly string $created_at,
    ){}

    public static function fromArray(array $data): self
    {
        return new self(
            $data['vague_id'],
            $data['name'],
            $data['phone'],
            $data['status'],
            $data['created_at'],
        );
    }
}
