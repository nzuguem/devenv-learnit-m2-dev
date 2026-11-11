import { reviews } from "./datasource";

const calculateAverage = (nums: number[]) => {
    if (nums.length === 0) return null;
    return nums.reduce((a, b) => a + b, 0) / nums.length;
};

export const resolvers = {
    Query: {
        reviewsForProduct: (_, { productId }) => {
            return reviews.filter(r => r.productId === productId);
        },

        reviewsByUser: (_: undefined, { userId }) => {
            return reviews.filter(r => r.authorId === userId);
        },
    },

    Mutation: {
        createReview: (_: undefined, { input }) => {
            const newReview = {
                id: `r${reviews.length + 1}`,
                ...input,
                createdAt: new Date().toISOString().split('T')[0],
            };
            reviews.push(newReview);
            return newReview;
        },
    },

    Review: {
        __resolveReference: (reference) => {
            return reviews.find(r => r.id === reference.id);
        },

        // Return User reference for the gateway to resolve
        author: (review) => {
            return { __typename: 'User', id: review.authorId };
        },

        // Return Product reference for the gateway to resolve
        product: (review) => {
            return { __typename: 'Product', id: review.productId };
        },
    },

    User: {
        // Resolve reviews for a User entity reference
        reviews: (user) => {
            return reviews.filter(r => r.authorId === user.id);
        },

        // Calculate average rating given by this user
        averageRatingGiven: (user) => {
            const userReviews = reviews.filter(r => r.authorId === user.id);
            return calculateAverage(userReviews.map(r => r.rating));
        },
    },

    Product: {
        // Resolve reviews for a Product entity reference
        reviews: (product) => {
            return reviews.filter(r => r.productId === product.id);
        },

        // Calculate average rating for this product
        averageRating: (product) => {
            const productReviews = reviews.filter(r => r.productId === product.id);
            return calculateAverage(productReviews.map(r => r.rating));
        },

        // Count total reviews for this product
        reviewCount: (product) => {
            return reviews.filter(r => r.productId === product.id).length;
        },
    },
};