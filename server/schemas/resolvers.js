const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { findOne } = require("../models/User");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user._id) {
        return User.findOne({ _id: context.user._id }).select("-__v -password");
      }
      throw new AuthenticationError("You must be logged in.");
    },
  },

  Mutation: {
    addUser: async function (parent, { username, email, password }) {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found.");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Password is incorrect");
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, args, context) => {
      console.log(context.user);
      if (context.user) {
        const book = { ...args };
        console.log(book);
        const bookSave = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: book } },
          { new: true }
        );
        return bookSave;
      }
      throw new AuthenticationError("You are not logged in");
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const bookRemove = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return bookRemoves;
      }
    },
  },
};

module.exports = resolvers;
