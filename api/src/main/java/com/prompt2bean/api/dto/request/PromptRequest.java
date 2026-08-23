package com.prompt2bean.api.dto.request;

import jakarta.validation.constraints.NotBlank;

public record PromptRequest(
        @NotBlank(message = "Prompt is required.")
        String prompt
) {
}
