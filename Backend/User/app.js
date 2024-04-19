const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./UserSchema');

const app = express();
const PORT = 3003;
const DB_URI = 'mongodb+srv://Ronak:GMAMR@cluster0.jxxzuw1.mongodb.net/first?retryWrites=true&w=majority';

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    try {
        const users = await User.find();
        console.log("GET all user");
        res.json(users);
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }
        console.log("GET user by ID");
        res.json(user);
    } catch (err) {
        console.error('Error fetching user by ID:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.delete('/:id', async (req, res) => {
    try {
        const deleteduser = await User.findByIdAndDelete(req.params.id);
        if (!deleteduser) {
            return res.status(404).json({ error: 'user not found' });
        }
        console.log("DELETE user by ID");
        res.json(deleteduser);
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.put('/:id', async (req, res) => {
    try {
        const updateduser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updateduser) {
            return res.status(404).json({ error: 'user not found' });
        }
        console.log("UPDATE user by ID");
        res.json(updateduser);
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Server error' });
    }
});


app.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const newuser = new User({
            _id: new mongoose.Types.ObjectId(),
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            loginPassword:req.body.loginPassword
        });
        await newuser.save();
        console.log("CREATE new user");
        res.status(200).json(newuser);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Server error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
