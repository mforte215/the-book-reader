const {User} = require('../models');
const {signToken, AuthenticationError} = require('../utils/auth');
const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        user: async (parent, {username}) => {
            return User.findOne({username});
        }
    },
    Mutation: {
        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password});
            const token = signToken(user);
            return {token, user};
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});
            if (!user) {
                throw AuthenticationError;
            }

            const isCorrectPW = await user.isCorrectPassword(password);

            if (!isCorrectPW) {
                throw AuthenticationError;
            }
            const token = signToken(user);
            return {token, user};
        },
        saveBook: async (parent, {authors, description, title, bookId, image, link}, context) => {

            //get the users saved books, the user will come from the context
            if (context.user) {
                const newBook = {
                    authors: authors,
                    description: description,
                    title: title,
                    bookId: bookId,
                    image: image,
                    link: link
                }
                await User.findOneAndUpdate(
                    {username: context.user.username},
                    {$addToSet: {savedBooks: newBook}}
                );
                return User;
            }
            throw AuthenticationError;
        }
    }
};

module.exports = resolvers;
