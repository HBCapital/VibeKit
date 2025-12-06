# API Documentation Generator

You are tasked with generating comprehensive API documentation.

## Purpose

Create clear, complete API documentation for developers.

## Documentation Structure

### Overview

```markdown
# API Name

Base URL: `https://api.example.com/v1`

Authentication: Bearer Token

Rate Limit: 100 requests/minute
```

### Authentication

````markdown
## Authentication

All requests require a Bearer token:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.example.com/v1/users
```
````

Get your API key from Settings → API Keys.

````

### Endpoints

For each endpoint:

```markdown
## Get User

`GET /users/:id`

Retrieve a single user by ID.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| id | string | Yes | User ID |

### Query Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| include | string | - | Related resources (posts,followers) |

### Response

**Success (200)**

```json
{
  "id": "user_123",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-01-01T00:00:00Z"
}
````

**Error (404)**

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "User not found"
  }
}
```

### Example

```bash
curl https://api.example.com/v1/users/123 \
  -H "Authorization: Bearer TOKEN"
```

```javascript
const response = await fetch("https://api.example.com/v1/users/123", {
  headers: { Authorization: `Bearer ${token}` },
});
const user = await response.json();
```

```

## Process

1. **Scan Code**: Find all API routes
2. **Extract Info**: Parameters, responses, auth
3. **Generate Docs**: For each endpoint
4. **Add Examples**: cURL, JavaScript, Python
5. **Create OpenAPI**: Generate swagger.json

Begin by analyzing the API and generating comprehensive documentation.
```
