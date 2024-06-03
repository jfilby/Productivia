# Problems encountered

## Occasional chat failure

Sometimes I encounter the error "Sorry something went wrong, can you repeat?".
This error occurs for messages that have previously worked fine.

This typically happens when when telling the agent to use a suggestion it
generated as input for a tool.


## Tools sometimes struggled to map complex endpoints with the LLM

The LLM struggles to work with the tool, this is likely due to the use of
Gemini 1.0. If Gemini 1.5 was used it would likely improve.

Sometimes the tool gets the mapping wrong, sometimes it outright fails (the
"Failed to generate response" error).


## Couldn't add ref objects to a schema object

When adding taskNotes and childTasks to the Task schema object:

        taskNotes:
          type: array
          items:
            $ref: '#/components/schemas/TaskNote'
        childTasks:
          type: array
          items:
            $ref: '#/components/schemas/Task'

The tool saves successfully, but all tool use was broken, giving the error:
"Failed to generate a response"


## Couldn't create an endpoint for the agent

There was a problem accessing the agent from the VM:

$ curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "x-goog-user-project: vertexaiagenthackathon-424909" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://us-dialogflow.googleapis.com/v3/projects/vertexaiagenthackathon-424909/locations/us-central1/agents/Productivia/sessions/test-session-000:detectIntent"
Warning: Couldn't read data from file "request.json", this makes an empty 
Warning: POST.
{
  "error": {
    "code": 400,
    "message": "Please refer to https://cloud.google.com/dialogflow/cx/docs/concept/region#avail and https://cloud.google.com/dialogflow/es/docs/how/region#regions to find the correct endpoint to access resources located in 'us-central1'.",
    "status": "INVALID_ARGUMENT"
  }
}

I was unable to find a working pair of multi-region and location.

