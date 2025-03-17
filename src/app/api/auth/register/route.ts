import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const { firstName, lastName, username, password, defaultCurrency } = await req.json();

    // Validate input
    if (!firstName || !lastName || !username || !password || !defaultCurrency) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { message: 'Username already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      username,
      password,
      defaultCurrency,
    });

    return NextResponse.json(
      { 
        message: 'User registered successfully',
        userId: user._id.toString()
      },
      { status: 201 }
    );
  } catch (error: Error | unknown) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Error registering user' },
      { status: 500 }
    );
  }
} 