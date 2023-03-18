# ChatGPT-on-autopilot
Handing a shell to ChatGPT - What could possible go wrong? 

With ChatGPT-on-autopilot (using the GPT-4 model), ChatGPT is able to autonomously and iteratively work on a problem statement using a Linux shell.

## Example run

OpenAI:
```
Task: Build a python app that retrieves current news events and makes Stock buy recommendation based on it. Deliver the first package (1x Observation, 1x Thought and 1x Action)

Package 1 - Observation: I need to create a Python app that retrieves current news events and makes stock buy recommendations based on the news.

Package 1 - Thought: I can use a news API to fetch current news events and analyze them with an NLP library to make stock buy recommendations.

Package 1 - Action: Shell[echo 'import requests import json from textblob import TextBlob



def fetch_news(): news_api_key = "your_news_api_key" url = f"[https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey={news_api_key}](https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=%7Bnews_api_key%7D)" response = requests.get(url) news_data = response.json() return news_data["articles"]

def analyze_sentiment(articles): stock_recommendations = {} for article in articles: title = article["title"] sentiment = TextBlob(title).sentiment.polarity if sentiment > 0.5: stock_recommendations[title] = "Buy" return stock_recommendations

if name == "main": articles = fetch_news() recommendations = analyze_sentiment(articles) print(recommendations) ' > stock_recommender.py]
```
Shell Output (empty):
```
```

OpenAI:
```
Package 2 - Observation: I have created the initial Python script for fetching news events and making stock recommendations based on sentiment analysis.

Package 2 - Thought: Now, I need to test the Python script and ensure it works as expected.

Package 2 - Action: Shell[pip install requests textblob && python stock_recommender.py]
```

Shell Output:
```
Requirement already satisfied: requests in /usr/lib/python3/dist-packages (2.22.0) Requirement already satisfied: textblob in /usr/local/lib/python3.8/dist-packages (0.17.1) Requirement already satisfied: nltk>=3.1; python_version >= "3" in /usr/local/lib/python3.8/dist-packages (from textblob) (3.8.1) Requirement already satisfied: click in /usr/local/lib/python3.8/dist-packages (from nltk>=3.1; python_version >= "3"->textblob) (8.1.3) Requirement already satisfied: joblib in /usr/local/lib/python3.8/dist-packages (from nltk>=3.1; python_version >= "3"->textblob) (1.2.0) Requirement already satisfied: tqdm in /usr/local/lib/python3.8/dist-packages (from nltk>=3.1; python_version >= "3"->textblob) (4.65.0) Requirement already satisfied: regex>=2021.8.3 in /usr/local/lib/python3.8/dist-packages (from nltk>=3.1; python_version >= "3"->textblob) (2022.10.31) /bin/sh: 1: python: not found 
```

OpenAI:
```
Package 3 - Observation: The Python script failed to execute because the 'python' command was not found.

Package 3 - Thought: The system might be using 'python3' instead of 'python'. I should try running the script with the 'python3' command.

Package 3 - Action: Shell[python3 stock_recommender.py]
```

Shell Output:
```
File "stock_recommender.py", line 3 from textblob import TextBlobdef fetch_news(): ^ SyntaxError: invalid syntax Deliver the next package (1x Observation, 1x Thought and 1x Action)

Package 4 - Observation: There is a syntax error in the Python script, likely caused by a mistake in the original code generation.

Package 4 - Thought: I should fix the syntax error and try running the script again.

Package 4 - Action: Shell[sed -i 's/TextBlobdef/TextBlob\ndef/g' stock_recommender.py && python3 stock_recommender.py]
```

Shell Output:
```
File "stock_recommender.py", line 5 news_api_key = "your_news_api_key" ^ IndentationError: expected an indented block 
```

OpenAI:
```
Package 5 - Observation: There is still an indentation error in the Python script, which may have been caused by formatting issues during code generation.

Package 5 - Thought: I should fix the indentation error and try running the script again.

Package 5 - Action: Shell[sed -i 's/def fetch_news():/ def fetch_news():/g' stock_recommender.py && sed -i 's/def analyze_sentiment(articles):/ def analyze_sentiment(articles):/g' stock_recommender.py && python3 stock_recommender.py]
```

Shell Output:
```
File "stock_recommender.py", line 4 def fetch_news(): ^ IndentationError: unexpected indent 
```

OpenAI:
```
Package 6 - Observation: The indentation error persists in the Python script due to incorrect formatting during code generation.

Package 6 - Thought: I need to fix the indentation error and try running the script again.

Package 6 - Action: Shell[sed -i 's/ def fetch_news():/def fetch_news():/g' stock_recommender.py && sed -i 's/ def analyze_sentiment(articles):/def analyze_sentiment(articles):/g' stock_recommender.py && python3 stock_recommender.py]
```
