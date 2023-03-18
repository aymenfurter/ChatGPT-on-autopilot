FROM ubuntu:latest

# Update package lists and install dependencies
RUN apt-get update && apt-get install -y \
    python3 python3-pip
#    ruby ruby-dev \
#    nodejs npm \
#    openjdk-8-jdk-headless \
#    gcc g++ make gdb \
#    php apache2 mysql-server \
#    postgresql sqlite3 \
#    curl git && \
#    curl -O https://storage.googleapis.com/golang/go1.17.5.linux-amd64.tar.gz && \
#    tar -xvf go1.17.5.linux-amd64.tar.gz && \
#    mv go /usr/local && \
#    echo "export PATH=$PATH:/usr/local/go/bin" >> ~/.bashrc && \
#    . ~/.bashrc && \
#    go get -u github.com/gin-gonic/gin && \
#    go get -u github.com/golang/protobuf/protoc-gen-go && \
#    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy application files
COPY . .

RUN pip3 install -r /app/requirements.txt

# Expose port 5000
EXPOSE 5000

# Start application
CMD ["python3", "app.py"]
