// Register Route
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash password before saving
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user
      user = new User({ name, email, password: hashedPassword });
  
      // Save user to the database
      await user.save();
  
      // Send success response
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  module.exports = router;
  