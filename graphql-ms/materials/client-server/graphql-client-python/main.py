# /// script
# requires-python = ">=3.14"
# dependencies = ["gql[aiohttp]>=4,<5"]
# ///
"""GraphQL client for the graphql-js servers (Yoga by default).

Run it with `uv run main.py`: uv reads the dependencies above (PEP 723).
"""

import asyncio
import os
import sys

from gql import Client, gql
from gql.transport.aiohttp import AIOHTTPTransport
from gql.transport.exceptions import TransportConnectionFailed, TransportQueryError

GRAPHQL_URL = os.environ.get("GRAPHQL_URL", "http://localhost:4000/graphql")

# A fragment avoids repeating the same selection in every operation
MESSAGE_FIELDS = """
fragment MessageFields on Message {
  id
  content
  author
}
"""

# `getMessage` and `getMessages` return the `Channel` interface: the Message fields are
# selected with an inline fragment (`... on Message`)
GET_MESSAGE = gql(
    MESSAGE_FIELDS
    + """
query GetMessage($id: ID!) {
  getMessage(id: $id) {
    ... on Message { ...MessageFields }
  }
}
"""
)

GET_MESSAGES = gql(
    MESSAGE_FIELDS
    + """
query GetMessages {
  getMessages {
    ... on Message { ...MessageFields }
  }
}
"""
)

CREATE_MESSAGE = gql(
    MESSAGE_FIELDS
    + """
mutation CreateMessage($input: MessageInput) {
  createMessage(input: $input) { ...MessageFields }
}
"""
)


async def main() -> None:
    transport = AIOHTTPTransport(url=GRAPHQL_URL)
    async with Client(transport=transport) as session:
        # The values are sent as variables, never concatenated into the query
        created = await session.execute(
            CREATE_MESSAGE,
            variable_values={"input": {"content": "Hello from Python", "author": "gql"}},
        )
        message_id = created["createMessage"]["id"]
        print("Created:", created["createMessage"])

        fetched = await session.execute(GET_MESSAGE, variable_values={"id": message_id})
        print("Fetched:", fetched["getMessage"])

        listed = await session.execute(GET_MESSAGES)
        print("All messages:")
        for message in listed["getMessages"]:
            print("  -", message)


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except TransportConnectionFailed:
        sys.exit(f"Cannot reach {GRAPHQL_URL}: start a server first (e.g. `npm run yoga` in ../graphql-js)")
    except TransportQueryError as error:
        sys.exit(f"GraphQL errors returned by the server: {error.errors}")
