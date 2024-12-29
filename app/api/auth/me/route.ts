import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import dbConnect from '@/lib/db'
import User from '@/models/User'

export async function GET() {
  await dbConnect()

  const cookieStore =await cookies()
  const token = cookieStore.get('token')

  if (!token) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
  }

  try {
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET as string) as { id: string }
    const user = await User.findById(decoded.id).select('-password')

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Get current user error:', error)
    return NextResponse.json({ message: 'An error occurred while fetching user data' }, { status: 500 })
  }
}

