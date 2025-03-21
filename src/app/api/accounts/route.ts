import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import Account from '@/models/Account';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const accounts = await Account.find({ userId: session.user.id });
    
    return NextResponse.json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch accounts' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      console.log("No user ID in session:", session); // For debugging
      return NextResponse.json({ error: 'Unauthorized - No user ID' }, { status: 401 });
    }

    const data = await request.json();
    const account = await Account.create({
      ...data,
      userId: session.user.id
    });

    return NextResponse.json(account, { status: 201 });
  } catch (error) {
    console.error('Error creating account:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create account' },
      { status: 500 }
    );
  }
} 