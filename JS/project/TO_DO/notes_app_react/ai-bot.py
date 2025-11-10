from openai import OpenAI
# from a1 import api_key
client = OpenAI(api_key = "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")


response = client.responses.create(
    model="gpt-5",
    input=" hi.. how to make this code of yours to access you through api . but i want to give you input through terminal... give me only one best code instead of multiple codes .. cause in terminal its hard and if i can access you  or use you in a pp thrugh html and js and csss than give me the code but only one code" ) 
  

# print(a)
print(response.output_text)
