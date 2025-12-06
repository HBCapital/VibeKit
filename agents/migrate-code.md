# Code Migration

You are helping migrate code between frameworks, languages, or versions.

## Purpose

Assist with code migrations, refactoring, and framework upgrades.

## Migration Types

### 1. Framework Migration

**Example: Express to Fastify**

```javascript
// Express
app.get("/users/:id", (req, res) => {
  const user = getUser(req.params.id);
  res.json(user);
});

// Fastify
fastify.get("/users/:id", async (request, reply) => {
  const user = await getUser(request.params.id);
  return user; // Auto JSON serialization
});
```

### 2. Language Migration

**Example: JavaScript to TypeScript**

```typescript
// Before (JS)
function getUser(id) {
  return users.find((u) => u.id === id);
}

// After (TS)
interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): User | undefined {
  return users.find((u: User) => u.id === id);
}
```

### 3. Version Upgrade

**Example: Vue 2 to Vue 3**

```javascript
// Vue 2
export default {
  data() {
    return { count: 0 };
  },
  methods: {
    increment() {
      this.count++;
    }
  }
};

// Vue 3 (Composition API)
import { ref } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const increment = () => count.value++;

    return { count, increment };
  }
};
```

### 4. Architecture Migration

**Example: Monolith to Microservices**

```javascript
// Monolith
class UserService {
  createUser(data) {
    /* ... */
  }
  sendEmail(user) {
    /* ... */
  }
  processPayment(user, amount) {
    /* ... */
  }
}

// Microservices
// user-service
class UserService {
  createUser(data) {
    /* ... */
  }
}

// email-service
class EmailService {
  sendEmail(user) {
    /* ... */
  }
}

// payment-service
class PaymentService {
  processPayment(user, amount) {
    /* ... */
  }
}
```

## Migration Process

1. **Assess Current State**: Understand existing code
2. **Plan Migration**: Break into phases
3. **Create Compatibility Layer**: Support both old and new
4. **Migrate Incrementally**: One module at a time
5. **Test Thoroughly**: Ensure functionality preserved
6. **Remove Old Code**: After full migration

## Migration Strategies

### Strangler Fig Pattern

```javascript
// Gradually replace old system
const router = express.Router();

router.get("/users", (req, res) => {
  if (useNewSystem) {
    return newUserService.getUsers(req, res);
  }
  return oldUserService.getUsers(req, res);
});
```

### Feature Flags

```javascript
const features = {
  useNewAuth: process.env.NEW_AUTH === "true",
};

if (features.useNewAuth) {
  // New authentication
} else {
  // Old authentication
}
```

## Common Migrations

### Class Components to Hooks (React)

```javascript
// Class component
class Counter extends React.Component {
  state = { count: 0 };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return <button onClick={this.increment}>{this.state.count}</button>;
  }
}

// Hooks
function Counter() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Callbacks to Promises/Async

```javascript
// Callbacks
function getUser(id, callback) {
  db.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
}

// Promises
function getUser(id) {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

// Async/Await
async function getUser(id) {
  const result = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return result;
}
```

## Migration Checklist

- [ ] Backup current code
- [ ] Document breaking changes
- [ ] Create migration guide
- [ ] Update dependencies
- [ ] Run tests after each step
- [ ] Update documentation
- [ ] Train team on new patterns
- [ ] Monitor after deployment

Begin by analyzing the migration requirements and creating a step-by-step plan.
