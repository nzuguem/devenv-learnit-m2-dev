# graphql-client-python

A GraphQL client written with [gql](https://gql.readthedocs.io/), for the `graphql-js` servers.
It creates a message, reads it back by its id, then lists all the messages.

It is a single-file script: its dependencies are declared at the top of `main.py`
([PEP 723](https://peps.python.org/pep-0723/)), and uv installs them in its cache, so there is no
project or virtual environment to set up. It is the Python counterpart of `../graphql-java/Main.java` (JBang).

## Run it

1. Start a server, for example Yoga (port 4000):

   ```bash
   cd ../graphql-js && npm run yoga
   ```

2. Run the client:

   ```bash
   uv run main.py
   ```

To target another server, set `GRAPHQL_URL`, for example Apollo (port 4003):

```bash
GRAPHQL_URL=http://localhost:4003/ uv run main.py
```

## What it shows

- **Variables** (`$id`, `$input`): the values are never concatenated into the query.
- **Fragments**: `MessageFields` is reused by every operation.
- **Interfaces**: `getMessage` and `getMessages` return `Channel`, so the `Message` fields are
  selected with an inline fragment (`... on Message`).
