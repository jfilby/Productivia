## Inspiration

The inspiration was to build something like existing task systems, such as Google Keep and Todoist, but integrated with an AI agent.

## What it does

This is an AI agent that allows the user to interact with a task management system.

## How we built it

1. I built a task management tool with Next.js + PostgreSQL, deployed to a GCP VM instance.
2. I created an AI agent using the Vertex AI agent builder.
3. I defined and saved the API for the tool using the OpenAPI spec in YAML.
4. I tested the AI agent using the built-in conversation UI.

## Challenges we ran into

1. The tool's REST API needed to be a domain with HTTPS. With only an HTTP IP a REJECTED_BAD_REQUEST error was given.
2. Suggestions from the LLM couldn't be used as input for the tool, a "Sorry something went wrong, can you repeat?" error was given.
3. The tool didn't always work seamlessly or as expected. I suspect that this is due to the use of Gemini 1.0, and that 1.5 would give a more seamless experience.

## Accomplishments that we're proud of

A functional agent built with Vertex AI Agent Builder.

## What we learned

The Vertex AI Agent Builder makes it much faster to develop agents, but there's room for improvement.

## What's next for Productivia

I'd like to see the agent run with Gemini 1.5.

