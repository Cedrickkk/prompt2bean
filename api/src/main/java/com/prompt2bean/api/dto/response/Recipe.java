package com.prompt2bean.api.dto.response;

import java.util.List;

public record Recipe(
        String title,
        String description,
        int servings,
        int prepTimeMinutes,
        int cookTimeMinutes,
        List<Ingredient> ingredients,
        List<String> steps,
        List<String> tags
) {
    record Ingredient(
            String name,
            String quantity,
            String unit
    ) {
    }
}
