import { products } from "./datasource";

export const resolvers = {
    Query: {
        product: (_, { id }) => products.find(p => p.id === id),
        products: (_, { category, limit = 10, offset = 0 }) => {
            let result = products;

            if (category) {
                result = result.filter(p => p.category === category);
            }

            // Apply pagination
            return result.slice(offset, offset + limit);
        },
    },

    Product: {
        // Resolve the reference when the gateway needs to fetch a Product
        __resolveReference: (reference) => {
            return products.find(p => p.id === reference.id);
        },

        // The gateway will resolve the full User from the Users subgraph
        seller: (product) => {
            // Return just the key fields - the gateway handles the rest
            return { __typename: 'User', id: product.sellerId };
        },
    },

    User: {
        // When the gateway asks for products for a User reference,
        products: (user) => {
            return products.filter(p => p.sellerId === user.id);
        },
    },
};