const querystring = require('querystring');

exports.handler = async (event, context) => {
  const path = event.path.replace('/.netlify/functions/api', '');
  const method = event.httpMethod;

  // Enable CORS
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (method === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  // GET /auth/me - Check if user is authenticated
  if (method === 'GET' && path === '/auth/me') {
    const cookies = event.headers.cookie || '';
    const sessionId = cookies.split('session=')[1]?.split(';')[0];
    
    if (sessionId) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ authenticated: true, user: { id: sessionId } })
      };
    } else {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ authenticated: false })
      };
    }
  }

  // POST /auth/login - Handle login
  if (method === 'POST' && path === '/auth/login') {
    try {
      const body = JSON.parse(event.body || '{}');
      const { username, password } = body;

      if (username && password) {
        const sessionId = Math.random().toString(36).substring(7);
        return {
          statusCode: 200,
          headers: {
            ...headers,
            'Set-Cookie': `session=${sessionId}; Path=/; HttpOnly`
          },
          body: JSON.stringify({ success: true, message: 'Login successful', user: { username } })
        };
      } else {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ success: false, message: 'Invalid credentials' })
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: false, message: 'Server error' })
      };
    }
  }

  return {
    statusCode: 404,
    headers,
    body: JSON.stringify({ message: 'Not found' })
  };
};