<?php

namespace App\Dtos\Admin\Vagues;

class VagueCreateDTO
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        public readonly string $name,
        public readonly string $level_id,
        public readonly string $start_date,
        public readonly ?string $end_date,
    )
    {}

    public static function fromArray(array $data): self
    {

        $name = '';

        if (isset($data['horaires']) && isset($data['hour'])) {
            $name = $data['start_date'] . ' ' . $data['horaires'] . ' ' . $data['hour'];
        }

        return new self(
            $name,
            $data['level_id'],
            $data['start_date'],
            $data['end_date'] ?? null,
        );
    }
}
