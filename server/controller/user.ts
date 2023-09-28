import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getCollection } from "../services/db.service";
import { User } from "../types/types";

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  try {
    const users = await getCollection("users");

    const user = users.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password, name, email, birthdate } = req.body;

  try {
    const users = await getCollection("users");

    // Check if the user already exists
    const existingUser = await users.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser: User = {
      email,
      favoriteTags: [],
      likesArticlesIds: [],
      name,
      userId: new ObjectId().toString(),
      username,
      password: hashedPassword,
    };

    await users.insertOne(newUser);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const { username, password } = req.body;

  try {
    const users = await getCollection("users");

    // Find the user by username
    const user = (await users.findOne({ username })) as unknown as User;

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user.userId }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export { getUser, signUp, login };
