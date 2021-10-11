const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { findOne } = require("../models/User");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    login: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You must be logged in.");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
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
      if (context.user) {
        const bookSave = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooksL: book } },
          { new: true }
        );
        return bookSave;
      }
    },
  },
};
