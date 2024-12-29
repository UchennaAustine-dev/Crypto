import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import jwt from 'jsonwebtoken'

export async function POST(request: Request) {
  await dbConnect()

  try {
    const { email, password } = await request.json()

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
    })

    const response = NextResponse.json({ message: 'Logged in successfully' })
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ message: 'An error occurred during login' }, { status: 500 })
  }
}

