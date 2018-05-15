import { Mongo } from 'meteor/mongo';

export const Users = new Mongo.Collection('users')

Meteor.publish('users', function usersPublication() {
  return Users.find();
})
