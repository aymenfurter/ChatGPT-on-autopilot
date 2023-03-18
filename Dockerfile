FROM ubuntu:latest

RUN apt-get update && \
    apt-get install -y \
        python3 python3-pip \
        ruby ruby-dev \
        nodejs npm \
        openjdk-8-jdk-headless \
        gcc g++ make gdb \
        php apache2 mysql-server \
        postgresql sqlite3 \
        go gin protobuf \
        swiftlang && \
    pip3 install Flask Django && \
    gem install sinatra && \
    npm install -g express-generator && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

EXPOSE 5000

CMD ["python3", "app.py"]
