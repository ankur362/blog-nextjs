import { NextResponse } from 'next/server';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export async function GET(request, { params }) {
  try {
    const response = await axios.get(`${API_URL}/posts/${params.id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
}

export async function PUT(request, { params }) {
  try {
    const postData = await request.json();
    const response = await axios.put(`${API_URL}/posts/${params.id}`, postData);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await axios.delete(`${API_URL}/posts/${params.id}`);
    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}