<?php

namespace App\Http\Requests\Admin\Vagues;

use Doctrine\Inflector\Rules\French\Rules;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class VagueCreateRequest extends FormRequest
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
            'horaires' => ['required',
                Rule::in(['Matin', 'Midi'])
             ],
            'hour' => ['required'],
            'name' => [''],
            'level_id' => [
                 'required',
                 'integer',
                 'exists:levels,id'
                 ,
            ],
            'start_date' => ['required', 'date', 'after:today'],
            'end_date' => [
                'after:start_date',
                'nullable',
                function ($attribute, $end, $fail) {
                    $start = request()->input('start_date');
                    if (!$start) {
                        // Pas de start_date, on skip cette validation ici
                        return;
                    }
                    $startDate = \Carbon\Carbon::parse($start);
                    $endDate = \Carbon\Carbon::parse($end);
                    $diffInMonths = $startDate->diffInMonths($endDate);

                    if ($diffInMonths < 5) {
                        $fail("La date de fin doit être au moins 5 mois après la date de début.");
                    }
               },
            ],

        ];
    }

    public function messages(): array
    {
        return [
            'horaires.required' => 'Le horaire est requis.',
            'horaires.in' => 'Le horaire doit être Matin ou Midi.',
            'hour' => 'L\'heure est requis.',
            'end_date.after' => 'La date de fin doit être après la date de début.',
            'level_id.required' => 'Le niveau est requis.',
            'start_date.required' => 'La date de début est requise.',
            'end_date.required' => 'La date de fin est requise.',
            'start_date.after' => 'La date de début doit être après aujourd\'hui.',

        ];
    }
}
