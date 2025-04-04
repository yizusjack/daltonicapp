<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use App\Enums\TiposDaltonismoEnum;
use Illuminate\Foundation\Http\FormRequest;

class StoreGuiaContribucionRequest extends FormRequest
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
            'resultados' => 'required|array',
            'resultados.*' => 'array:id,valor',
            'resultados.*.id' => 'required|exists:imagenes,id',
            'resultados.*.valor' => 'required|numeric',
            'tipo_daltonismo' => ['required', Rule::in(TiposDaltonismoEnum::names())],
        ];
    }
}
