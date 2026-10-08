import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const response = await axios.get(`${API_URL}/posts/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const postData = await request.json();
    const response = await axios.put(`${API_URL}/posts/${id}`, postData);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    await axios.delete(`${API_URL}/posts/${id}`);
    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
