# LytVector

LytVector is a simple vector database for storing and searching vectors. It provides a REST API for adding vectors, retrieving vectors by ID, and performing similarity searches.

## Features

- Add vectors with metadata
- Retrieve vectors by ID
- Perform similarity searches with configurable thresholds and top-K results
- Caching for efficient repeated queries
- Dockerized for easy deployment

## Clone the repository:
```
git clone https://github.com/IndGeek/lyt-vector.git
cd lyt-vector
```

### Copy the enviroment variables
```
cp .env.example .env
```

## Running the Project
### 1. Running node locally
```
npm install

npm run build

node dist/index.js
```

### 2. Using Docker
```
docker-compose up --build
```

## API Endpoints

- **Add Vector**: `POST /add`
    - **Request Body**: 
      ```json
      { 
        "content": "your content", 
        "metadata": { "key": "value" } 
      }
      ```
    - **Response**:
      ```json
      { "id": "vector-id" }
      ```

- **Get Vector by ID**: `GET /vector/:id`
    - **Response**:
      ```json
      { 
        "id": "vector-id", 
        "vector": [number, ...] 
      }
      ```

- **Search Vectors**: `POST /search`
    - **Request Body**:
      ```json
      { 
        "query": "your query", 
        "threshold": 0.5, 
        "topK": 5 
      }
      ```
    - **Response**:
      ```json
      [
        { 
          "id": "vector-id", 
          "score": 0.9, 
          "metadata": { "key": "value" } 
        },
        ...
      ]
      ```
