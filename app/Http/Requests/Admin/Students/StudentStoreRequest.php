<?php

namespace App\Http\Requests\Admin\Students;

use Illuminate\Foundation\Http\FormRequest;

class StudentStoreRequest extends FormRequest
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
            'vague_id' => [
                'required',
                'integer',
                'exists:vagues,id',
             ],
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:255'],

        ];
    }

    public function messages(): array
    {
        return [
            'vague_id.required' => 'Veuillez sélectionner une vague',
            'name.required' => 'Veuillez saisir un nom',
            'phone.required' => 'Veuillez saisir un téléphone',
            'name.max' => 'Le nom doit faire moins de 255 caractères',
            'phone.max' => 'Le téléphone doit faire moins de 255 caractères',

        ];
    }
}
