from openai import OpenAI

# Initialize the client with your API key
client = OpenAI(api_key = "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")
print("Chat with OpenAI. Type 'exit' to quit.")

while True:
    user_input = input("You> ").strip()
    if user_input.lower() == "exit":
        print("Goodbye!")
        break

    # Send user input to OpenAI
    response = client.responses.create(
        model="gpt-5",
        input=user_input
    )

    # Print the assistant's reply
    print("Assistant>", response.output_text)
