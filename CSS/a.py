from openai import OpenAI
# from a1 import api_key
client = OpenAI(api_key = "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")


response = client.responses.create(
    model="gpt-5",
    input=" hi" ) 
  

# print(a)
print(response.output_text)
