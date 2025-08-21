<?php

namespace App\Http\Requests\Admin\Levels;

use App\Dtos\Admin\Levels\LevelStoreDTO;
use Illuminate\Foundation\Http\FormRequest;

class LevelStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:20'],
            'description' => ['nullable', 'string', 'max:30'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Le nom est obligatoire',
            'name.string' => 'Le nom doit être une chaîne de caractères',
            'name.max' => 'Le nom doit faire moins de 20 caractères',
            'description.string' => 'La description doit être une chaîne de caractères',
            'description.max' => 'La description doit faire moins de 30 caractères',
        ];
    }

    public function toDTO(): LevelStoreDTO
    {
       return LevelStoreDTO::fromArray($this->validated());
    }
}
