import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/list')) {
    console.log(new Date().toLocaleString());
    console.log(request.headers.get('sec-ch-ua-platform'));
    return NextResponse.next();
  }
  if (request.nextUrl.pathname.startsWith('/write')) {
    const session = await getToken({ req: request });
    console.log('세션', session);
    if (session == null) {
      return NextResponse.redirect(new URL('/api/auth/signin', request.url));
    }
  }
  request.cookies.get('쿠키이름'); //출력
  request.cookies.has('쿠키이름'); //존재확인
  request.cookies.delete('쿠키이름'); //삭제

  const response = NextResponse.next();
  response.cookies.set({
    name: 'mode',
    value: 'dark',
    maxAge: 3600,
    httpOnly: true,
  });
  return response; //쿠키생성
}
