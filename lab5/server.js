const mongoose = require('./database');
const User = require('./models/User');

(async () => {
  try {
    // Create a new user
    const newUser = await User.create({
      name: 'Alice',
      age: 25,
      city: 'New York',
    });
    console.log('User created:', newUser);

    // Retrieve all users
    const users = await User.find();
    console.log('Users:', users);

    // Update a user
    await User.updateOne({ name: 'Alice' }, { age: 26 });
    console.log('User updated.');

    // Delete a user
    await User.deleteOne({ name: 'Alice' });
    console.log('User deleted.');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
})();
