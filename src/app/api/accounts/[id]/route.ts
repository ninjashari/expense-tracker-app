import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import Account from '@/models/Account';
import { connectToDatabase } from '@/lib/db';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    await connectToDatabase();
    const account = await Account.findOne({
      _id: id,
      userId: session.user.id,
    });

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    return NextResponse.json(account);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch account' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  context: RouteContext
) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const data = await request.json();
    await connectToDatabase();

    const account = await Account.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      data,
      { new: true }
    );

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    return NextResponse.json(account);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update account' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: RouteContext
) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    await connectToDatabase();
    const account = await Account.findOneAndDelete({
      _id: id,
      userId: session.user.id,
    });

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Account deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete account' }, { status: 500 });
  }
} 