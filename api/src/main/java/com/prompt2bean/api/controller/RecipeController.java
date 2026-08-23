package com.prompt2bean.api.controller;

import com.prompt2bean.api.advisor.SimpleLoggerAdvisor;
import com.prompt2bean.api.dto.request.PromptRequest;
import com.prompt2bean.api.dto.response.Recipe;
import jakarta.validation.Valid;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.converter.BeanOutputConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.util.Map;

@RestController
@RequestMapping("/recipes")
public class RecipeController {

    private final ChatClient chatClient;
    private final PromptTemplate promptTemplate;

    RecipeController(
            ChatClient.Builder builder,
            @Value("classpath:prompts/recipe-prompt.st") Resource recipePrompt) {
        this.chatClient = builder
                .defaultAdvisors(new SimpleLoggerAdvisor())
                .build();
        this.promptTemplate = new PromptTemplate(recipePrompt);
    }

    @PostMapping(value = "/ask", produces = MediaType.TEXT_PLAIN_VALUE)
    public Flux<String> ask(@Valid @RequestBody PromptRequest request) {
        var converter = new BeanOutputConverter<>(Recipe.class);

        String renderedPrompt = promptTemplate.render(Map.of(
                "prompt", request.prompt(),
                "format", converter.getFormat()
        ));

        return chatClient.prompt()
                .user(renderedPrompt)
                .stream()
                .content();
    }

}
