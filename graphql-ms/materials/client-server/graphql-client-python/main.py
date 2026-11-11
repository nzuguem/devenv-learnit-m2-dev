from gql import Client, gql
from gql.transport.aiohttp import AIOHTTPTransport

def main():
  transport = AIOHTTPTransport(url="http://localhost:4000/graphql")
  client = Client(transport=transport)

  query = gql(
    """
        query {
          getMessage(id: "1") {
            id
            author
          }
        }
    """
  )
  result = client.execute(query)
  print(result)


if __name__ == "__main__":
    main()
